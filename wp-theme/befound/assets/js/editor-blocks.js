(function (blocks, element, components, blockEditor) {
  'use strict';

  const el = element.createElement;
  const registerBlockType = blocks.registerBlockType;
  const TextControl = components.TextControl;
  const TextareaControl = components.TextareaControl;
  const Button = components.Button;
  const PanelBody = components.PanelBody;
  const Notice = components.Notice;
  const InspectorControls = blockEditor.InspectorControls;
  const MediaUpload = blockEditor.MediaUpload;
  const MediaUploadCheck = blockEditor.MediaUploadCheck;
  const defaults = window.BeFoundEditorDefaults || {};

  const sections = {
    hero: {
      title: 'BeFound Hero',
      icon: 'format-video',
      defaults: () => ({
        tagline: defaults.hero?.tagline || '',
        video: defaults.hero?.video || '',
      }),
      fields: [
        { key: 'tagline', label: 'Tagline', type: 'text' },
        { key: 'video', label: 'Hero Video', type: 'media', mediaType: 'video' },
      ],
    },
    about: {
      title: 'BeFound About',
      icon: 'info',
      defaults: () => ({
        title: defaults.about?.title || '',
        backgroundImage: defaults.about?.background_image || '',
        patternImage: defaults.about?.pattern_image || '',
        leftParagraphs: (defaults.about?.left_paragraphs || []).join('\n'),
        rightParagraphs: (defaults.about?.right_paragraphs || []).join('\n'),
      }),
      fields: [
        { key: 'title', label: 'Title', type: 'text' },
        { key: 'backgroundImage', label: 'Background Image', type: 'media', mediaType: 'image' },
        { key: 'patternImage', label: 'Typography Pattern Image', type: 'media', mediaType: 'image' },
        { key: 'leftParagraphs', label: 'Left Paragraphs', type: 'textarea' },
        { key: 'rightParagraphs', label: 'Right Paragraphs', type: 'textarea' },
      ],
    },
    services: {
      title: 'BeFound Services',
      icon: 'screenoptions',
      defaults: () => ({
        title: defaults.services?.title || '',
        intro: defaults.services?.intro || '',
      }),
      fields: [
        { key: 'title', label: 'Title', type: 'text' },
        { key: 'intro', label: 'Intro', type: 'textarea' },
      ],
      note: 'Service cards, images, colors, and order are edited from BeFound Content > Services. The frontend keeps the original carousel design.',
    },
    projects: {
      title: 'BeFound Projects',
      icon: 'images-alt2',
      defaults: () => ({
        title: defaults.projects?.title || '',
        intro: defaults.projects?.intro || '',
      }),
      fields: [
        { key: 'title', label: 'Title', type: 'text' },
        { key: 'intro', label: 'Intro', type: 'textarea' },
      ],
      note: 'Project cards, main images, galleries, and order are edited from BeFound Content > Projects. The frontend keeps the original slider, modal, and image text positions.',
    },
    partners: {
      title: 'BeFound Partners',
      icon: 'groups',
      defaults: () => ({
        title: defaults.partners?.title || '',
      }),
      fields: [
        { key: 'title', label: 'Title', type: 'text' },
      ],
      note: 'Partner profile content and portrait images are edited from BeFound Content > Partners.',
    },
    contact: {
      title: 'BeFound Contact',
      icon: 'email',
      defaults: () => ({
        title: defaults.contact?.title || '',
        intro: defaults.contact?.intro || '',
        emailLabel: defaults.contact?.email_label || '',
        email: defaults.contact?.email || '',
        phoneLabel: defaults.contact?.phone_label || '',
        phoneLines: (defaults.contact?.phone_lines || []).join('\n'),
        whatsappNumber: defaults.contact?.whatsapp_number || '',
        studioLabel: defaults.contact?.studio_label || '',
        studioLines: (defaults.contact?.studio_lines || []).join('\n'),
        jeddahLabel: defaults.contact?.locations?.[0]?.label || '',
        jeddahAddress: defaults.contact?.locations?.[0]?.address || '',
        jeddahMapUrl: defaults.contact?.locations?.[0]?.map_url || '',
        cairoLabel: defaults.contact?.locations?.[1]?.label || '',
        cairoAddress: defaults.contact?.locations?.[1]?.address || '',
        cairoMapUrl: defaults.contact?.locations?.[1]?.map_url || '',
        image: defaults.contact?.image || '',
      }),
      fields: [
        { key: 'title', label: 'Title', type: 'text' },
        { key: 'intro', label: 'Intro', type: 'textarea' },
        { key: 'emailLabel', label: 'Email Label', type: 'text' },
        { key: 'email', label: 'Email Address', type: 'text' },
        { key: 'phoneLabel', label: 'Phone Label', type: 'text' },
        { key: 'phoneLines', label: 'Phone Numbers', type: 'textarea' },
        { key: 'whatsappNumber', label: 'Main WhatsApp Number', type: 'text' },
        { key: 'studioLabel', label: 'Address Label', type: 'text' },
        { key: 'jeddahLabel', label: 'Jeddah Office Label', type: 'text' },
        { key: 'jeddahAddress', label: 'Jeddah Address', type: 'text' },
        { key: 'jeddahMapUrl', label: 'Jeddah Google Maps URL', type: 'text' },
        { key: 'cairoLabel', label: 'Cairo Office Label', type: 'text' },
        { key: 'cairoAddress', label: 'Cairo Address', type: 'text' },
        { key: 'cairoMapUrl', label: 'Cairo Google Maps URL', type: 'text' },
        { key: 'studioLines', label: 'Legacy Address Lines', type: 'textarea' },
        { key: 'image', label: 'Contact Image', type: 'media', mediaType: 'image' },
      ],
    },
  };

  const getValue = (attributes, sectionDefaults, key) => attributes[key] || sectionDefaults[key] || '';

  const setField = (props, key, value) => {
    props.setAttributes({ [key]: value });
  };

  const mediaField = (props, field, sectionDefaults) => {
    const value = getValue(props.attributes, sectionDefaults, field.key);

    return el('div', { className: 'befound-editor-field', key: field.key },
      el('label', { style: { display: 'block', marginBottom: '6px', fontWeight: 600 } }, field.label),
      el(TextControl, {
        value,
        onChange: (nextValue) => setField(props, field.key, nextValue),
        help: 'Use the media picker or keep the migrated theme asset path.',
      }),
      el(MediaUploadCheck, {},
        el(MediaUpload, {
          allowedTypes: [field.mediaType],
          onSelect: (media) => setField(props, field.key, media.id ? String(media.id) : (media.url || '')),
          render: ({ open }) => el(Button, { variant: 'secondary', onClick: open }, 'Select Media'),
        })
      )
    );
  };

  const fieldControl = (props, field, sectionDefaults) => {
    const value = getValue(props.attributes, sectionDefaults, field.key);

    if (field.type === 'media') {
      return mediaField(props, field, sectionDefaults);
    }

    if (field.type === 'textarea') {
      return el(TextareaControl, {
        key: field.key,
        label: field.label,
        value,
        rows: 5,
        onChange: (nextValue) => setField(props, field.key, nextValue),
      });
    }

    return el(TextControl, {
      key: field.key,
      label: field.label,
      value,
      onChange: (nextValue) => setField(props, field.key, nextValue),
    });
  };

  const sectionPreview = (config, props, sectionDefaults) => {
    const heading = getValue(props.attributes, sectionDefaults, 'title') ||
      getValue(props.attributes, sectionDefaults, 'tagline') ||
      config.title;

    return el('div', {
      className: 'befound-editor-block',
      style: {
        background: '#25282A',
        color: '#E6F0F0',
        border: '1px solid rgba(230,240,240,0.22)',
        padding: '24px',
        fontFamily: 'serif',
      },
    },
      el('div', { style: { fontSize: '12px', letterSpacing: '0.2em', textTransform: 'uppercase', opacity: 0.55, marginBottom: '8px' } }, config.title),
      el('strong', { style: { display: 'block', fontSize: '22px', fontWeight: 300, marginBottom: '12px' } }, heading),
      config.note ? el(Notice, { status: 'info', isDismissible: false }, config.note) : null,
      el('p', { style: { margin: '12px 0 0', opacity: 0.65 } }, 'This block renders with the original BeFound frontend template and CSS. Reorder blocks here to reorder homepage sections without changing the design.')
    );
  };

  Object.keys(sections).forEach((section) => {
    const config = sections[section];

    registerBlockType(`befound/${section}`, {
      title: config.title,
      icon: config.icon,
      category: 'befound',
      supports: {
        html: false,
        align: false,
        color: false,
        spacing: false,
        typography: false,
      },
      attributes: Object.keys(config.defaults()).reduce((carry, key) => {
        carry[key] = { type: 'string', default: '' };
        return carry;
      }, {}),
      edit: (props) => {
        const sectionDefaults = config.defaults();

        return [
          el(InspectorControls, { key: 'inspector' },
            el(PanelBody, { title: 'Section Content', initialOpen: true },
              config.fields.map((field) => fieldControl(props, field, sectionDefaults))
            )
          ),
          sectionPreview(config, props, sectionDefaults),
        ];
      },
      save: () => null,
    });
  });
})(window.wp.blocks, window.wp.element, window.wp.components, window.wp.blockEditor);
