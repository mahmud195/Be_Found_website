(function ($) {
  'use strict';

  const renderPreview = ($field, value) => {
    const $preview = $field.find('[data-befound-media-preview]');
    if (!$preview.length) return;
    if (!value) {
      $preview.empty();
      return;
    }
    if (/^\d+$/.test(value) && wp.media.attachment) {
      const attachment = wp.media.attachment(parseInt(value, 10));
      attachment.fetch().then(() => {
        const url = attachment.get('url');
        $preview.html(url ? `<img src="${url}" alt="">` : '');
      });
      return;
    }
    $preview.html(`<span>${value}</span>`);
  };

  $(document).on('click', '[data-befound-media-select]', function () {
    const $field = $(this).closest('.befound-media-field');
    const $input = $field.find('[data-befound-media-value]');
    const frame = wp.media({
      title: 'Select Media',
      button: { text: 'Use this media' },
      multiple: false
    });

    frame.on('select', function () {
      const attachment = frame.state().get('selection').first().toJSON();
      $input.val(attachment.id).trigger('change');
      const previewUrl = attachment.sizes && attachment.sizes.thumbnail ? attachment.sizes.thumbnail.url : attachment.url;
      $field.find('[data-befound-media-preview]').html(`<img src="${previewUrl}" alt="">`);
    });

    frame.open();
  });

  $(document).on('click', '[data-befound-media-clear]', function () {
    const $field = $(this).closest('.befound-media-field');
    $field.find('[data-befound-media-value]').val('').trigger('change');
    $field.find('[data-befound-media-preview]').empty();
  });

  $(document).on('change', '[data-befound-media-value]', function () {
    renderPreview($(this).closest('.befound-media-field'), $(this).val());
  });

  $(document).on('click', '[data-befound-gallery-select]', function () {
    const $field = $(this).closest('.befound-gallery-field');
    const $input = $field.find('[data-befound-gallery-value]');
    const frame = wp.media({
      title: 'Select Gallery Images',
      button: { text: 'Use gallery' },
      multiple: true
    });

    frame.on('select', function () {
      const ids = [];
      frame.state().get('selection').each(function (attachment) {
        ids.push(attachment.id);
      });
      $input.val(ids.join(','));
    });

    frame.open();
  });

  $(document).on('click', '[data-befound-gallery-clear]', function () {
    $(this).closest('.befound-gallery-field').find('[data-befound-gallery-value]').val('');
  });
})(jQuery);
