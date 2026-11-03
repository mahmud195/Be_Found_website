<?php
/**
 * Native WordPress editing tools for non-technical content editors.
 *
 * @package BeFound
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

function befound_register_content_types() {
	$common_args = array(
		'public'        => false,
		'show_ui'       => true,
		'show_in_menu'  => 'befound-content',
		'show_in_rest'  => true,
		'hierarchical'  => false,
		'menu_position' => 30,
		'supports'      => array( 'title', 'page-attributes', 'thumbnail' ),
	);

	register_post_type(
		'befound_service',
		array_merge(
			$common_args,
			array(
				'labels' => array(
					'name'          => 'Services',
					'singular_name' => 'Service',
					'add_new_item'  => 'Add New Service',
					'edit_item'     => 'Edit Service',
				),
			)
		)
	);

	register_post_type(
		'befound_project',
		array_merge(
			$common_args,
			array(
				'labels' => array(
					'name'          => 'Projects',
					'singular_name' => 'Project',
					'add_new_item'  => 'Add New Project',
					'edit_item'     => 'Edit Project',
				),
			)
		)
	);

	register_post_type(
		'befound_partner',
		array_merge(
			$common_args,
			array(
				'labels' => array(
					'name'          => 'Partners',
					'singular_name' => 'Partner',
					'add_new_item'  => 'Add New Partner',
					'edit_item'     => 'Edit Partner',
				),
			)
		)
	);
}
add_action( 'init', 'befound_register_content_types' );

function befound_admin_menu() {
	add_menu_page(
		'BeFound Content',
		'BeFound Content',
		'edit_pages',
		'befound-content',
		'befound_render_settings_page',
		'dashicons-admin-customizer',
		26
	);

	add_submenu_page(
		'befound-content',
		'Site Settings',
		'Site Settings',
		'edit_pages',
		'befound-content',
		'befound_render_settings_page'
	);
}
add_action( 'admin_menu', 'befound_admin_menu' );

function befound_admin_enqueue( $hook ) {
	$screen = get_current_screen();
	if ( ! $screen ) {
		return;
	}

	$is_befound_screen = 'toplevel_page_befound-content' === $hook || in_array( $screen->post_type, array( 'befound_service', 'befound_project', 'befound_partner' ), true );
	if ( ! $is_befound_screen ) {
		return;
	}

	wp_enqueue_media();
	wp_enqueue_script(
		'befound-admin',
		get_theme_file_uri( 'assets/js/admin.js' ),
		array( 'jquery' ),
		befound_asset_version( 'assets/js/admin.js' ),
		true
	);
	wp_enqueue_style(
		'befound-admin',
		get_theme_file_uri( 'assets/css/admin.css' ),
		array(),
		befound_asset_version( 'assets/css/admin.css' )
	);
}
add_action( 'admin_enqueue_scripts', 'befound_admin_enqueue' );

function befound_get_settings() {
	$defaults = array(
		'meta_title'               => '',
		'meta_description'         => '',
		'og_image'                 => '',
		'gtm_id'                   => 'GTM-N7RRLQC2',
		'ga_id'                    => '',
		'google_site_verification' => '',
		'bing_site_verification'   => '',
		'clarity_id'               => '',
		'enable_language_switcher' => '0',
		'default_language'         => 'en',
		'hero_video'               => '',
		'hero_tagline'             => '',
		'about_title'              => '',
		'about_background_image'   => '',
		'about_pattern_image'      => '',
		'about_left_paragraphs'    => '',
		'about_right_paragraphs'   => '',
		'services_title'           => '',
		'services_intro'           => '',
		'projects_title'           => '',
		'projects_intro'           => '',
		'partners_title'           => '',
		'contact_title'            => '',
		'contact_intro'            => '',
		'contact_email_label'      => '',
		'contact_email'            => '',
		'contact_phone_label'      => '',
		'contact_phone_lines'      => '',
		'contact_whatsapp_number'  => '',
		'contact_studio_label'     => '',
		'contact_studio_lines'     => '',
		'contact_jeddah_label'     => '',
		'contact_jeddah_address'   => '',
		'contact_jeddah_map_url'   => '',
		'contact_cairo_label'      => '',
		'contact_cairo_address'    => '',
		'contact_cairo_map_url'    => '',
		'contact_image'            => '',
		'footer_creative_label'    => '',
		'footer_aoc_url'           => '',
		'footer_logo_black'        => '',
		'footer_logo_arabic_black' => '',
		'footer_aoc_icon'          => '',
		'footer_aoc_logo'          => '',
		'footer_linkedin_url'      => '',
		'footer_instagram_url'     => '',
		'footer_facebook_url'      => '',
		'footer_whatsapp_url'      => '',
	);

	$settings = get_option( 'befound_settings', array() );
	return wp_parse_args( is_array( $settings ) ? $settings : array(), $defaults );
}

function befound_sanitize_settings( $input ) {
	$current = befound_get_settings();
	$input   = is_array( $input ) ? $input : array();

	$text_fields = array(
		'meta_title',
		'gtm_id',
		'ga_id',
		'google_site_verification',
		'bing_site_verification',
		'clarity_id',
		'hero_tagline',
		'about_title',
		'services_title',
		'services_intro',
		'projects_title',
		'projects_intro',
		'partners_title',
		'contact_title',
		'contact_email_label',
		'contact_phone_label',
		'contact_whatsapp_number',
		'contact_studio_label',
		'contact_jeddah_label',
		'contact_jeddah_address',
		'contact_cairo_label',
		'contact_cairo_address',
		'footer_creative_label',
	);

	foreach ( $text_fields as $field ) {
		$current[ $field ] = sanitize_text_field( $input[ $field ] ?? '' );
	}
	$current['gtm_id'] = befound_sanitize_gtm_id( $input['gtm_id'] ?? '' );

	$textarea_fields = array(
		'meta_description',
		'about_left_paragraphs',
		'about_right_paragraphs',
		'contact_intro',
		'contact_phone_lines',
		'contact_studio_lines',
	);

	foreach ( $textarea_fields as $field ) {
		$current[ $field ] = sanitize_textarea_field( $input[ $field ] ?? '' );
	}

	$url_fields = array( 'contact_jeddah_map_url', 'contact_cairo_map_url', 'footer_aoc_url', 'footer_linkedin_url', 'footer_instagram_url', 'footer_facebook_url', 'footer_whatsapp_url' );
	foreach ( $url_fields as $field ) {
		$current[ $field ] = esc_url_raw( $input[ $field ] ?? '' );
	}

	$current['contact_email']            = sanitize_email( $input['contact_email'] ?? '' );
	$current['enable_language_switcher'] = ! empty( $input['enable_language_switcher'] ) ? '1' : '0';
	$current['default_language']         = in_array( $input['default_language'] ?? 'en', array( 'en', 'ar' ), true ) ? $input['default_language'] : 'en';

	$media_fields = array(
		'og_image',
		'hero_video',
		'about_background_image',
		'about_pattern_image',
		'contact_image',
		'footer_logo_black',
		'footer_logo_arabic_black',
		'footer_aoc_icon',
		'footer_aoc_logo',
	);

	foreach ( $media_fields as $field ) {
		$current[ $field ] = befound_sanitize_media_value( $input[ $field ] ?? '' );
	}

	return $current;
}

function befound_sanitize_media_value( $value ) {
	if ( is_numeric( $value ) ) {
		return (string) absint( $value );
	}

	return sanitize_text_field( (string) $value );
}

function befound_sanitize_gtm_id( $value ) {
	$value = strtoupper( sanitize_text_field( (string) $value ) );
	return preg_match( '/^GTM-[A-Z0-9]+$/', $value ) ? $value : '';
}

function befound_apply_tracking_defaults_once() {
	if ( get_option( 'befound_gtm_default_applied' ) ) {
		return;
	}

	$settings = get_option( 'befound_settings', array() );
	$settings = is_array( $settings ) ? $settings : array();

	if ( empty( $settings['gtm_id'] ) ) {
		$settings['gtm_id'] = 'GTM-N7RRLQC2';
		update_option( 'befound_settings', wp_parse_args( $settings, befound_get_settings() ) );
	}

	update_option( 'befound_gtm_default_applied', '1' );
}
add_action( 'init', 'befound_apply_tracking_defaults_once', 35 );

function befound_apply_contact_details_update_once() {
	$update_version = '20260907_whatsapp_contact_actions';
	if ( $update_version === get_option( 'befound_contact_details_update' ) ) {
		return;
	}

	$defaults = befound_default_content();
	$contact  = $defaults['contact'];
	$settings = get_option( 'befound_settings', array() );
	$settings = is_array( $settings ) ? $settings : array();

	if ( empty( $settings['contact_phone_label'] ) ) {
		$settings['contact_phone_label'] = $contact['phone_label'];
	}

	if ( empty( $settings['contact_phone_lines'] ) ) {
		$settings['contact_phone_lines'] = implode( "\n", $contact['phone_lines'] );
	}

	if ( empty( $settings['contact_whatsapp_number'] ) ) {
		$settings['contact_whatsapp_number'] = $contact['whatsapp_number'];
	}

	if ( empty( $settings['footer_whatsapp_url'] ) ) {
		$settings['footer_whatsapp_url'] = befound_whatsapp_url( $contact['whatsapp_number'] );
	}

	$settings['contact_jeddah_label']   = empty( $settings['contact_jeddah_label'] ) ? $contact['locations'][0]['label'] : $settings['contact_jeddah_label'];
	$settings['contact_jeddah_address'] = empty( $settings['contact_jeddah_address'] ) ? $contact['locations'][0]['address'] : $settings['contact_jeddah_address'];
	$settings['contact_jeddah_map_url'] = empty( $settings['contact_jeddah_map_url'] ) ? $contact['locations'][0]['map_url'] : $settings['contact_jeddah_map_url'];
	$settings['contact_cairo_label']    = empty( $settings['contact_cairo_label'] ) ? $contact['locations'][1]['label'] : $settings['contact_cairo_label'];
	$settings['contact_cairo_address']  = empty( $settings['contact_cairo_address'] ) ? $contact['locations'][1]['address'] : $settings['contact_cairo_address'];
	$settings['contact_cairo_map_url']  = empty( $settings['contact_cairo_map_url'] ) ? $contact['locations'][1]['map_url'] : $settings['contact_cairo_map_url'];

	if ( empty( $settings['contact_studio_label'] ) || 'Studio' === $settings['contact_studio_label'] ) {
		$settings['contact_studio_label'] = $contact['studio_label'];
	}

	$old_studio_lines = "19 Street 207 - Degla Maadi\nCairo, Egypt";
	$stored_studio_lines = str_replace( "\r\n", "\n", (string) ( $settings['contact_studio_lines'] ?? '' ) );
	if ( empty( $settings['contact_studio_lines'] ) || $old_studio_lines === $stored_studio_lines || false !== strpos( $stored_studio_lines, 'مليباري' ) ) {
		$settings['contact_studio_lines'] = implode( "\n", $contact['studio_lines'] );
	}

	update_option( 'befound_settings', wp_parse_args( $settings, befound_get_settings() ) );
	update_option( 'befound_contact_details_update', $update_version );
}
add_action( 'init', 'befound_apply_contact_details_update_once', 36 );

function befound_settings_field( $settings, $key, $label, $type = 'text', $description = '' ) {
	$value = $settings[ $key ] ?? '';
	?>
	<div class="befound-admin-field">
		<label for="befound-<?php echo esc_attr( $key ); ?>"><?php echo esc_html( $label ); ?></label>
		<?php if ( 'textarea' === $type ) : ?>
			<textarea id="befound-<?php echo esc_attr( $key ); ?>" name="befound_settings[<?php echo esc_attr( $key ); ?>]" rows="5"><?php echo esc_textarea( $value ); ?></textarea>
		<?php else : ?>
			<input id="befound-<?php echo esc_attr( $key ); ?>" type="<?php echo esc_attr( $type ); ?>" name="befound_settings[<?php echo esc_attr( $key ); ?>]" value="<?php echo esc_attr( $value ); ?>">
		<?php endif; ?>
		<?php if ( $description ) : ?>
			<p><?php echo esc_html( $description ); ?></p>
		<?php endif; ?>
	</div>
	<?php
}

function befound_media_field( $settings, $key, $label, $description = '' ) {
	$value = $settings[ $key ] ?? '';
	$url   = befound_theme_asset_url( $value );
	?>
	<div class="befound-admin-field befound-media-field">
		<label for="befound-<?php echo esc_attr( $key ); ?>"><?php echo esc_html( $label ); ?></label>
		<input id="befound-<?php echo esc_attr( $key ); ?>" type="text" name="befound_settings[<?php echo esc_attr( $key ); ?>]" value="<?php echo esc_attr( $value ); ?>" data-befound-media-value>
		<div class="befound-media-actions">
			<button type="button" class="button" data-befound-media-select>Select Media</button>
			<button type="button" class="button" data-befound-media-clear>Clear</button>
		</div>
		<div class="befound-media-preview" data-befound-media-preview>
			<?php if ( $url ) : ?>
				<img src="<?php echo esc_url( $url ); ?>" alt="">
			<?php endif; ?>
		</div>
		<?php if ( $description ) : ?>
			<p><?php echo esc_html( $description ); ?></p>
		<?php endif; ?>
	</div>
	<?php
}

function befound_render_settings_page() {
	if ( ! current_user_can( 'edit_pages' ) ) {
		wp_die( esc_html__( 'You do not have permission to edit this content.', 'befound' ) );
	}

	if ( isset( $_POST['befound_settings_nonce'] ) && wp_verify_nonce( sanitize_text_field( wp_unslash( $_POST['befound_settings_nonce'] ) ), 'befound_save_settings' ) ) {
		update_option( 'befound_settings', befound_sanitize_settings( wp_unslash( $_POST['befound_settings'] ?? array() ) ) );
		echo '<div class="notice notice-success is-dismissible"><p>BeFound settings saved.</p></div>';
	}

	$settings = befound_get_settings();
	?>
	<div class="wrap befound-admin-page">
		<h1>BeFound Content</h1>
		<p class="description">Edit the fixed website sections here. Projects, Services, and Partners are managed from the menu items under BeFound Content.</p>

		<form method="post">
			<?php wp_nonce_field( 'befound_save_settings', 'befound_settings_nonce' ); ?>

			<div class="befound-admin-grid">
				<section class="befound-admin-card">
					<h2>Hero Section</h2>
					<?php befound_media_field( $settings, 'hero_video', 'Hero Video', 'Upload/select an MP4 video, or leave empty to use the migrated theme video.' ); ?>
					<?php befound_settings_field( $settings, 'hero_tagline', 'Hero Tagline' ); ?>
				</section>

				<section class="befound-admin-card">
					<h2>About Section</h2>
					<?php befound_settings_field( $settings, 'about_title', 'Title' ); ?>
					<?php befound_media_field( $settings, 'about_background_image', 'Background Image' ); ?>
					<?php befound_media_field( $settings, 'about_pattern_image', 'Typography Pattern Image' ); ?>
					<?php befound_settings_field( $settings, 'about_left_paragraphs', 'Left Paragraphs', 'textarea', 'One paragraph per line.' ); ?>
					<?php befound_settings_field( $settings, 'about_right_paragraphs', 'Right Paragraphs', 'textarea', 'One paragraph per line.' ); ?>
				</section>

				<section class="befound-admin-card">
					<h2>Section Headings</h2>
					<?php befound_settings_field( $settings, 'services_title', 'Services Title' ); ?>
					<?php befound_settings_field( $settings, 'services_intro', 'Services Intro' ); ?>
					<?php befound_settings_field( $settings, 'projects_title', 'Projects Title' ); ?>
					<?php befound_settings_field( $settings, 'projects_intro', 'Projects Intro' ); ?>
					<?php befound_settings_field( $settings, 'partners_title', 'Partners Title' ); ?>
				</section>

				<section class="befound-admin-card">
					<h2>Contact Section</h2>
					<?php befound_settings_field( $settings, 'contact_title', 'Title' ); ?>
					<?php befound_settings_field( $settings, 'contact_intro', 'Intro', 'textarea' ); ?>
					<?php befound_settings_field( $settings, 'contact_email_label', 'Email Label' ); ?>
					<?php befound_settings_field( $settings, 'contact_email', 'Email Address', 'email' ); ?>
					<?php befound_settings_field( $settings, 'contact_phone_label', 'Phone Label' ); ?>
					<?php befound_settings_field( $settings, 'contact_phone_lines', 'Phone Numbers', 'textarea', 'One phone number per line.' ); ?>
					<?php befound_settings_field( $settings, 'contact_whatsapp_number', 'Main WhatsApp Number' ); ?>
					<?php befound_settings_field( $settings, 'contact_studio_label', 'Address Label' ); ?>
					<?php befound_settings_field( $settings, 'contact_jeddah_label', 'Jeddah Office Label' ); ?>
					<?php befound_settings_field( $settings, 'contact_jeddah_address', 'Jeddah Address' ); ?>
					<?php befound_settings_field( $settings, 'contact_jeddah_map_url', 'Jeddah Google Maps URL', 'url' ); ?>
					<?php befound_settings_field( $settings, 'contact_cairo_label', 'Cairo Office Label' ); ?>
					<?php befound_settings_field( $settings, 'contact_cairo_address', 'Cairo Address' ); ?>
					<?php befound_settings_field( $settings, 'contact_cairo_map_url', 'Cairo Google Maps URL', 'url' ); ?>
					<?php befound_settings_field( $settings, 'contact_studio_lines', 'Legacy Address Lines', 'textarea', 'Fallback only. The frontend uses the office fields above.' ); ?>
					<?php befound_media_field( $settings, 'contact_image', 'Contact Image' ); ?>
				</section>

				<section class="befound-admin-card">
					<h2>Footer</h2>
					<?php befound_media_field( $settings, 'footer_logo_black', 'English Logo' ); ?>
					<?php befound_media_field( $settings, 'footer_logo_arabic_black', 'Arabic Logo' ); ?>
					<?php befound_settings_field( $settings, 'footer_creative_label', 'Creative Partner Label' ); ?>
					<?php befound_media_field( $settings, 'footer_aoc_icon', 'AOC Icon' ); ?>
					<?php befound_media_field( $settings, 'footer_aoc_logo', 'AOC Logo' ); ?>
					<?php befound_settings_field( $settings, 'footer_aoc_url', 'AOC URL', 'url' ); ?>
					<?php befound_settings_field( $settings, 'footer_linkedin_url', 'LinkedIn URL', 'url' ); ?>
					<?php befound_settings_field( $settings, 'footer_instagram_url', 'Instagram URL', 'url' ); ?>
					<?php befound_settings_field( $settings, 'footer_facebook_url', 'Facebook URL', 'url' ); ?>
					<?php befound_settings_field( $settings, 'footer_whatsapp_url', 'WhatsApp URL', 'url' ); ?>
				</section>

				<section class="befound-admin-card">
					<h2>SEO / Tracking</h2>
					<?php befound_settings_field( $settings, 'meta_title', 'Meta Title' ); ?>
					<?php befound_settings_field( $settings, 'meta_description', 'Meta Description', 'textarea' ); ?>
					<?php befound_media_field( $settings, 'og_image', 'Open Graph Image' ); ?>
					<?php befound_settings_field( $settings, 'gtm_id', 'Google Tag Manager ID' ); ?>
					<?php befound_settings_field( $settings, 'ga_id', 'Google Analytics ID' ); ?>
					<?php befound_settings_field( $settings, 'google_site_verification', 'Google Search Console Verification' ); ?>
					<?php befound_settings_field( $settings, 'bing_site_verification', 'Bing Verification' ); ?>
					<?php befound_settings_field( $settings, 'clarity_id', 'Microsoft Clarity ID' ); ?>
				</section>

				<section class="befound-admin-card">
					<h2>Language Readiness</h2>
					<label class="befound-checkbox">
						<input type="checkbox" name="befound_settings[enable_language_switcher]" value="1" <?php checked( '1', $settings['enable_language_switcher'] ); ?>>
						Enable language switcher after Arabic copy is ready
					</label>
					<div class="befound-admin-field">
						<label for="befound-default-language">Default Language</label>
						<select id="befound-default-language" name="befound_settings[default_language]">
							<option value="en" <?php selected( 'en', $settings['default_language'] ); ?>>English</option>
							<option value="ar" <?php selected( 'ar', $settings['default_language'] ); ?>>Arabic</option>
						</select>
						<p>The current repo did not include Arabic copy, so keep this disabled until translations are reviewed.</p>
					</div>
				</section>
			</div>

			<?php submit_button( 'Save BeFound Content' ); ?>
		</form>
	</div>
	<?php
}

function befound_add_meta_boxes() {
	add_meta_box( 'befound_service_details', 'Service Details', 'befound_render_service_meta_box', 'befound_service', 'normal', 'high' );
	add_meta_box( 'befound_project_details', 'Project Details', 'befound_render_project_meta_box', 'befound_project', 'normal', 'high' );
	add_meta_box( 'befound_partner_details', 'Partner Details', 'befound_render_partner_meta_box', 'befound_partner', 'normal', 'high' );
}
add_action( 'add_meta_boxes', 'befound_add_meta_boxes' );

function befound_meta_value( $post_id, $key, $default = '' ) {
	$value = get_post_meta( $post_id, $key, true );
	return '' === $value ? $default : $value;
}

function befound_post_media_field( $post_id, $key, $label, $description = '' ) {
	$value = befound_meta_value( $post_id, $key );
	$url   = befound_theme_asset_url( $value );
	?>
	<div class="befound-admin-field befound-media-field">
		<label><?php echo esc_html( $label ); ?></label>
		<input type="text" name="<?php echo esc_attr( $key ); ?>" value="<?php echo esc_attr( $value ); ?>" data-befound-media-value>
		<div class="befound-media-actions">
			<button type="button" class="button" data-befound-media-select>Select Media</button>
			<button type="button" class="button" data-befound-media-clear>Clear</button>
		</div>
		<div class="befound-media-preview" data-befound-media-preview>
			<?php if ( $url ) : ?>
				<img src="<?php echo esc_url( $url ); ?>" alt="">
			<?php endif; ?>
		</div>
		<?php if ( $description ) : ?>
			<p><?php echo esc_html( $description ); ?></p>
		<?php endif; ?>
	</div>
	<?php
}

function befound_render_service_meta_box( $post ) {
	wp_nonce_field( 'befound_save_post_meta', 'befound_post_meta_nonce' );
	befound_post_media_field( $post->ID, '_befound_image', 'Service Image' );
	?>
	<div class="befound-admin-field">
		<label>Description</label>
		<textarea name="_befound_description" rows="8"><?php echo esc_textarea( befound_meta_value( $post->ID, '_befound_description' ) ); ?></textarea>
		<p>Separate paragraphs with a blank line.</p>
	</div>
	<div class="befound-admin-field">
		<label>Accent Color</label>
		<input type="text" name="_befound_accent" value="<?php echo esc_attr( befound_meta_value( $post->ID, '_befound_accent', '#E6F0F0' ) ); ?>">
	</div>
	<div class="befound-admin-field">
		<label>Overlay RGB</label>
		<input type="text" name="_befound_overlay_rgb" value="<?php echo esc_attr( befound_meta_value( $post->ID, '_befound_overlay_rgb', '200, 210, 210' ) ); ?>">
	</div>
	<?php
}

function befound_render_project_meta_box( $post ) {
	wp_nonce_field( 'befound_save_post_meta', 'befound_post_meta_nonce' );
	befound_post_media_field( $post->ID, '_befound_image', 'Main Image' );
	?>
	<div class="befound-admin-field">
		<label>Location</label>
		<input type="text" name="_befound_location" value="<?php echo esc_attr( befound_meta_value( $post->ID, '_befound_location' ) ); ?>">
	</div>
	<div class="befound-admin-field">
		<label>Short Description</label>
		<textarea name="_befound_description" rows="3"><?php echo esc_textarea( befound_meta_value( $post->ID, '_befound_description' ) ); ?></textarea>
	</div>
	<div class="befound-admin-field">
		<label>Full Description</label>
		<textarea name="_befound_full_description" rows="6"><?php echo esc_textarea( befound_meta_value( $post->ID, '_befound_full_description' ) ); ?></textarea>
	</div>
	<div class="befound-admin-field befound-gallery-field">
		<label>Gallery Images</label>
		<input type="text" name="_befound_gallery" value="<?php echo esc_attr( befound_meta_value( $post->ID, '_befound_gallery' ) ); ?>" data-befound-gallery-value>
		<div class="befound-media-actions">
			<button type="button" class="button" data-befound-gallery-select>Select Gallery</button>
			<button type="button" class="button" data-befound-gallery-clear>Clear</button>
		</div>
		<p>Stores attachment IDs or migrated asset paths, separated by commas.</p>
	</div>
	<?php
}

function befound_render_partner_meta_box( $post ) {
	wp_nonce_field( 'befound_save_post_meta', 'befound_post_meta_nonce' );
	befound_post_media_field( $post->ID, '_befound_image', 'Portrait Image' );
	?>
	<div class="befound-admin-field">
		<label>Role</label>
		<textarea name="_befound_role" rows="3"><?php echo esc_textarea( befound_meta_value( $post->ID, '_befound_role' ) ); ?></textarea>
	</div>
	<div class="befound-admin-field">
		<label>Bio Paragraphs</label>
		<textarea name="_befound_bio" rows="8"><?php echo esc_textarea( befound_meta_value( $post->ID, '_befound_bio' ) ); ?></textarea>
		<p>One paragraph per line.</p>
	</div>
	<?php
}

function befound_save_post_meta( $post_id ) {
	if ( ! isset( $_POST['befound_post_meta_nonce'] ) || ! wp_verify_nonce( sanitize_text_field( wp_unslash( $_POST['befound_post_meta_nonce'] ) ), 'befound_save_post_meta' ) ) {
		return;
	}

	if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) {
		return;
	}

	if ( ! current_user_can( 'edit_post', $post_id ) ) {
		return;
	}

	$post_type = get_post_type( $post_id );

	$fields = array( '_befound_image' => 'media' );

	if ( 'befound_service' === $post_type ) {
		$fields += array(
			'_befound_description' => 'textarea',
			'_befound_accent'      => 'text',
			'_befound_overlay_rgb' => 'text',
		);
	} elseif ( 'befound_project' === $post_type ) {
		$fields += array(
			'_befound_location'         => 'text',
			'_befound_description'      => 'textarea',
			'_befound_full_description' => 'textarea',
			'_befound_gallery'          => 'gallery',
		);
	} elseif ( 'befound_partner' === $post_type ) {
		$fields += array(
			'_befound_role' => 'textarea',
			'_befound_bio'  => 'textarea',
		);
	}

	foreach ( $fields as $key => $type ) {
		$value = wp_unslash( $_POST[ $key ] ?? '' );
		if ( 'textarea' === $type ) {
			$value = sanitize_textarea_field( $value );
		} elseif ( 'gallery' === $type ) {
			$value = implode( ',', array_map( 'befound_sanitize_media_value', array_filter( array_map( 'trim', explode( ',', (string) $value ) ) ) ) );
		} else {
			$value = befound_sanitize_media_value( $value );
		}
		update_post_meta( $post_id, $key, $value );
	}
}
add_action( 'save_post', 'befound_save_post_meta' );

function befound_seed_editable_content() {
	befound_register_content_types();

	if ( get_option( 'befound_seeded_editable_content' ) ) {
		befound_create_home_page();
		return;
	}

	$content  = befound_default_content();
	$settings = array(
		'meta_title'               => $content['meta']['title'],
		'meta_description'         => $content['meta']['description'],
		'og_image'                 => $content['meta']['og_image'],
		'hero_video'               => $content['hero']['video'],
		'hero_tagline'             => $content['hero']['tagline'],
		'about_title'              => $content['about']['title'],
		'about_background_image'   => $content['about']['background_image'],
		'about_pattern_image'      => $content['about']['pattern_image'],
		'about_left_paragraphs'    => implode( "\n", $content['about']['left_paragraphs'] ),
		'about_right_paragraphs'   => implode( "\n", $content['about']['right_paragraphs'] ),
		'services_title'           => $content['services']['title'],
		'services_intro'           => $content['services']['intro'],
		'projects_title'           => $content['projects']['title'],
		'projects_intro'           => $content['projects']['intro'],
		'partners_title'           => $content['partners']['title'],
		'contact_title'            => $content['contact']['title'],
		'contact_intro'            => $content['contact']['intro'],
		'contact_email_label'      => $content['contact']['email_label'],
		'contact_email'            => $content['contact']['email'],
		'contact_phone_label'      => $content['contact']['phone_label'],
		'contact_phone_lines'      => implode( "\n", $content['contact']['phone_lines'] ),
		'contact_whatsapp_number'  => $content['contact']['whatsapp_number'],
		'contact_studio_label'     => $content['contact']['studio_label'],
		'contact_studio_lines'     => implode( "\n", $content['contact']['studio_lines'] ),
		'contact_jeddah_label'     => $content['contact']['locations'][0]['label'],
		'contact_jeddah_address'   => $content['contact']['locations'][0]['address'],
		'contact_jeddah_map_url'   => $content['contact']['locations'][0]['map_url'],
		'contact_cairo_label'      => $content['contact']['locations'][1]['label'],
		'contact_cairo_address'    => $content['contact']['locations'][1]['address'],
		'contact_cairo_map_url'    => $content['contact']['locations'][1]['map_url'],
		'contact_image'            => $content['contact']['image'],
		'footer_creative_label'    => $content['footer']['creative_label'],
		'footer_aoc_url'           => $content['footer']['aoc_url'],
		'footer_logo_black'        => $content['footer']['logo_black'],
		'footer_logo_arabic_black' => $content['footer']['logo_arabic_black'],
		'footer_aoc_icon'          => $content['footer']['aoc_icon'],
		'footer_aoc_logo'          => $content['footer']['aoc_logo'],
		'footer_linkedin_url'      => $content['footer']['socials'][0]['url'],
		'footer_instagram_url'     => $content['footer']['socials'][1]['url'],
		'footer_facebook_url'      => $content['footer']['socials'][2]['url'],
		'footer_whatsapp_url'      => $content['footer']['socials'][3]['url'],
	);
	update_option( 'befound_settings', wp_parse_args( $settings, befound_get_settings() ) );

	befound_seed_posts( 'befound_service', $content['services']['items'] );
	befound_seed_posts( 'befound_project', $content['projects']['items'] );
	befound_seed_posts( 'befound_partner', $content['partners']['items'] );

	update_option( 'befound_seeded_editable_content', '1' );
	befound_create_home_page();
}
add_action( 'after_switch_theme', 'befound_seed_editable_content' );

function befound_seed_posts( $post_type, $items ) {
	foreach ( $items as $index => $item ) {
		$existing = get_posts(
			array(
				'post_type'      => $post_type,
				'title'          => $item['title'] ?? $item['name'] ?? '',
				'post_status'    => 'any',
				'posts_per_page' => 1,
				'fields'         => 'ids',
			)
		);
		if ( $existing ) {
			continue;
		}

		$post_id = wp_insert_post(
			array(
				'post_type'   => $post_type,
				'post_title'  => $item['title'] ?? $item['name'] ?? '',
				'post_status' => 'publish',
				'menu_order'  => $index,
			)
		);

		if ( is_wp_error( $post_id ) || ! $post_id ) {
			continue;
		}

		if ( ! empty( $item['image'] ) ) {
			update_post_meta( $post_id, '_befound_image', $item['image'] );
		}

		if ( 'befound_service' === $post_type ) {
			update_post_meta( $post_id, '_befound_description', $item['description'] ?? '' );
			update_post_meta( $post_id, '_befound_accent', $item['accent'] ?? '#E6F0F0' );
			update_post_meta( $post_id, '_befound_overlay_rgb', $item['overlay_rgb'] ?? '200, 210, 210' );
		} elseif ( 'befound_project' === $post_type ) {
			update_post_meta( $post_id, '_befound_location', $item['location'] ?? '' );
			update_post_meta( $post_id, '_befound_description', $item['description'] ?? '' );
			update_post_meta( $post_id, '_befound_full_description', $item['full_description'] ?? '' );
			$gallery = array();
			foreach ( $item['gallery'] ?? array() as $gallery_item ) {
				$gallery[] = $gallery_item;
			}
			update_post_meta( $post_id, '_befound_gallery', implode( ',', $gallery ) );
		} elseif ( 'befound_partner' === $post_type ) {
			update_post_meta( $post_id, '_befound_role', $item['role'] ?? '' );
			update_post_meta( $post_id, '_befound_bio', implode( "\n", $item['bio'] ?? array() ) );
		}
	}
}

function befound_imported_default_asset_path( $value ) {
	if ( ! is_numeric( $value ) ) {
		return '';
	}

	$source_asset = get_post_meta( (int) $value, '_befound_source_asset', true );
	if ( ! is_string( $source_asset ) || '' === $source_asset ) {
		return '';
	}

	$source_asset = ltrim( $source_asset, '/' );
	$source_file  = get_theme_file_path( 'assets/' . $source_asset );

	return file_exists( $source_file ) ? $source_asset : '';
}

function befound_normalize_imported_media_value( $value ) {
	$source_asset = befound_imported_default_asset_path( $value );
	return $source_asset ? $source_asset : $value;
}

function befound_normalize_imported_gallery_value( $value ) {
	$items = array_filter( array_map( 'trim', explode( ',', (string) $value ) ) );
	if ( empty( $items ) ) {
		return $value;
	}

	$changed = false;
	$items   = array_map(
		function ( $item ) use ( &$changed ) {
			$normalized = befound_normalize_imported_media_value( $item );
			if ( $normalized !== $item ) {
				$changed = true;
			}

			return $normalized;
		},
		$items
	);

	return $changed ? implode( ',', $items ) : $value;
}

function befound_normalize_imported_default_media_once() {
	$migration_version = '20260602_theme_asset_paths';
	if ( $migration_version === get_option( 'befound_media_reference_migration' ) ) {
		return;
	}

	$settings     = befound_get_settings();
	$media_fields = array(
		'og_image',
		'hero_video',
		'about_background_image',
		'about_pattern_image',
		'contact_image',
		'footer_logo_black',
		'footer_logo_arabic_black',
		'footer_aoc_icon',
		'footer_aoc_logo',
	);
	$settings_changed = false;

	foreach ( $media_fields as $field ) {
		$normalized = befound_normalize_imported_media_value( $settings[ $field ] ?? '' );
		if ( $normalized !== ( $settings[ $field ] ?? '' ) ) {
			$settings[ $field ] = $normalized;
			$settings_changed   = true;
		}
	}

	if ( $settings_changed ) {
		update_option( 'befound_settings', $settings );
	}

	$post_types = array( 'befound_service', 'befound_project', 'befound_partner' );
	foreach ( $post_types as $post_type ) {
		$posts = get_posts(
			array(
				'post_type'      => $post_type,
				'post_status'    => 'any',
				'posts_per_page' => -1,
			)
		);

		foreach ( $posts as $post ) {
			$image      = get_post_meta( $post->ID, '_befound_image', true );
			$normalized = befound_normalize_imported_media_value( $image );
			if ( $normalized !== $image ) {
				update_post_meta( $post->ID, '_befound_image', $normalized );
			}

			if ( 'befound_project' === $post_type ) {
				$gallery            = get_post_meta( $post->ID, '_befound_gallery', true );
				$normalized_gallery = befound_normalize_imported_gallery_value( $gallery );
				if ( $normalized_gallery !== $gallery ) {
					update_post_meta( $post->ID, '_befound_gallery', $normalized_gallery );
				}
			}

			$thumbnail_id = get_post_thumbnail_id( $post );
			if ( $thumbnail_id && befound_imported_default_asset_path( $thumbnail_id ) ) {
				delete_post_thumbnail( $post->ID );
			}
		}
	}

	update_option( 'befound_media_reference_migration', $migration_version );
}
add_action( 'init', 'befound_normalize_imported_default_media_once', 45 );

function befound_import_existing_content_assets() {
	$post_types = array( 'befound_service', 'befound_project', 'befound_partner' );

	foreach ( $post_types as $post_type ) {
		$posts = get_posts(
			array(
				'post_type'      => $post_type,
				'post_status'    => 'any',
				'posts_per_page' => -1,
			)
		);

		foreach ( $posts as $post ) {
			$image = get_post_meta( $post->ID, '_befound_image', true );
			$image_id = befound_import_theme_asset_to_media( $image );
			if ( $image_id ) {
				update_post_meta( $post->ID, '_befound_image', $image_id );
				set_post_thumbnail( $post->ID, $image_id );
			}

			if ( 'befound_project' === $post_type ) {
				$gallery = array_filter( array_map( 'trim', explode( ',', (string) get_post_meta( $post->ID, '_befound_gallery', true ) ) ) );
				$updated_gallery = array();
				foreach ( $gallery as $gallery_item ) {
					$updated_gallery[] = befound_import_theme_asset_to_media( $gallery_item ) ?: $gallery_item;
				}
				if ( $updated_gallery ) {
					update_post_meta( $post->ID, '_befound_gallery', implode( ',', $updated_gallery ) );
				}
			}
		}
	}
}

function befound_import_theme_asset_to_media( $asset_path ) {
	if ( empty( $asset_path ) || is_numeric( $asset_path ) ) {
		return is_numeric( $asset_path ) ? (int) $asset_path : 0;
	}

	$asset_path = ltrim( (string) $asset_path, '/' );
	if ( 0 !== strpos( $asset_path, 'images/' ) && 0 !== strpos( $asset_path, 'logos/' ) && 0 !== strpos( $asset_path, 'videos/' ) ) {
		return 0;
	}

	$existing = get_posts(
		array(
			'post_type'      => 'attachment',
			'post_status'    => 'inherit',
			'posts_per_page' => 1,
			'fields'         => 'ids',
			'meta_key'       => '_befound_source_asset',
			'meta_value'     => $asset_path,
		)
	);

	if ( $existing ) {
		return (int) $existing[0];
	}

	$source = get_theme_file_path( 'assets/' . $asset_path );
	if ( ! file_exists( $source ) || ! is_readable( $source ) ) {
		return 0;
	}

	$upload_dir = wp_upload_dir();
	if ( ! empty( $upload_dir['error'] ) ) {
		return 0;
	}

	$filename        = wp_unique_filename( $upload_dir['path'], basename( $source ) );
	$destination     = trailingslashit( $upload_dir['path'] ) . $filename;
	$destination_url = trailingslashit( $upload_dir['url'] ) . $filename;

	if ( ! copy( $source, $destination ) ) {
		return 0;
	}

	$filetype = wp_check_filetype( $filename, null );
	$attachment_id = wp_insert_attachment(
		array(
			'guid'           => $destination_url,
			'post_mime_type' => $filetype['type'],
			'post_title'     => preg_replace( '/\.[^.]+$/', '', $filename ),
			'post_content'   => '',
			'post_status'    => 'inherit',
		),
		$destination
	);

	if ( is_wp_error( $attachment_id ) || ! $attachment_id ) {
		return 0;
	}

	update_post_meta( $attachment_id, '_befound_source_asset', $asset_path );

	if ( 0 === strpos( (string) $filetype['type'], 'image/' ) ) {
		require_once ABSPATH . 'wp-admin/includes/image.php';
		$metadata = wp_generate_attachment_metadata( $attachment_id, $destination );
		wp_update_attachment_metadata( $attachment_id, $metadata );
	}

	return (int) $attachment_id;
}

function befound_create_home_page() {
	$page_id = (int) get_option( 'befound_home_page_id' );
	if ( $page_id && 'page' === get_post_type( $page_id ) ) {
		befound_maybe_upgrade_home_page_to_blocks( $page_id );
		update_option( 'show_on_front', 'page' );
		update_option( 'page_on_front', $page_id );
		return;
	}

	$page_id = wp_insert_post(
		array(
			'post_type'    => 'page',
			'post_status'  => 'publish',
			'post_title'   => 'Home',
			'post_content' => function_exists( 'befound_home_blocks_content' ) ? befound_home_blocks_content() : '',
		)
	);

	if ( is_wp_error( $page_id ) || ! $page_id ) {
		return;
	}

	update_option( 'befound_home_page_id', (int) $page_id );
	update_option( 'show_on_front', 'page' );
	update_option( 'page_on_front', (int) $page_id );
}

function befound_maybe_upgrade_home_page_to_blocks( $page_id ) {
	if ( ! function_exists( 'befound_home_blocks_content' ) || ! function_exists( 'befound_is_legacy_home_content' ) ) {
		return;
	}

	$post_content = (string) get_post_field( 'post_content', $page_id );
	if ( befound_is_befound_blocks_page( $post_content ) ) {
		return;
	}

	if ( '' !== trim( $post_content ) && ! befound_is_legacy_home_content( $post_content ) ) {
		return;
	}

	wp_update_post(
		array(
			'ID'           => $page_id,
			'post_content' => befound_home_blocks_content(),
		)
	);
}

function befound_ensure_home_page_setup() {
	if ( ! get_option( 'befound_home_page_id' ) && 'befound' !== get_option( 'stylesheet' ) ) {
		return;
	}

	befound_create_home_page();
}
add_action( 'init', 'befound_ensure_home_page_setup', 30 );
