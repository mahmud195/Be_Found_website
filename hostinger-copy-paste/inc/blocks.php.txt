<?php
/**
 * Gutenberg section blocks that render the original React-matched sections.
 *
 * @package BeFound
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

function befound_section_keys() {
	return array( 'hero', 'about', 'services', 'projects', 'partners', 'contact' );
}

function befound_home_blocks_content() {
	return implode(
		"\n",
		array(
			'<!-- wp:befound/hero /-->',
			'<!-- wp:befound/about /-->',
			'<!-- wp:befound/services /-->',
			'<!-- wp:befound/projects /-->',
			'<!-- wp:befound/partners /-->',
			'<!-- wp:befound/contact /-->',
		)
	);
}

function befound_is_befound_blocks_page( $post_content ) {
	return is_string( $post_content ) && false !== strpos( $post_content, '<!-- wp:befound/' );
}

function befound_legacy_home_shortcodes_content() {
	return "[befound_hero]\n[befound_about]\n[befound_services]\n[befound_projects]\n[befound_partners]\n[befound_contact]";
}

function befound_is_legacy_home_content( $post_content ) {
	$normalized = trim( preg_replace( '/\s+/', "\n", (string) $post_content ) );
	$legacy     = trim( preg_replace( '/\s+/', "\n", befound_legacy_home_shortcodes_content() ) );

	return $normalized === $legacy || ( false !== strpos( (string) $post_content, '[befound_' ) && ! befound_is_befound_blocks_page( $post_content ) );
}

function befound_content_with_section_attributes( $section, $attributes ) {
	$content    = befound_site_content();
	$attributes = is_array( $attributes ) ? $attributes : array();

	if ( 'hero' === $section ) {
		$content['hero']['tagline'] = befound_block_attribute_value( $attributes, 'tagline', $content['hero']['tagline'] );
		$content['hero']['video']   = befound_block_attribute_value( $attributes, 'video', $content['hero']['video'] );
	}

	if ( 'about' === $section ) {
		$content['about']['title']            = befound_block_attribute_value( $attributes, 'title', $content['about']['title'] );
		$content['about']['background_image'] = befound_block_attribute_value( $attributes, 'backgroundImage', $content['about']['background_image'] );
		$content['about']['pattern_image']    = befound_block_attribute_value( $attributes, 'patternImage', $content['about']['pattern_image'] );
		$content['about']['left_paragraphs']  = befound_lines_from_value( $attributes['leftParagraphs'] ?? '', $content['about']['left_paragraphs'] );
		$content['about']['right_paragraphs'] = befound_lines_from_value( $attributes['rightParagraphs'] ?? '', $content['about']['right_paragraphs'] );
	}

	if ( 'services' === $section ) {
		$content['services']['title'] = befound_block_attribute_value( $attributes, 'title', $content['services']['title'] );
		$content['services']['intro'] = befound_block_attribute_value( $attributes, 'intro', $content['services']['intro'] );
	}

	if ( 'projects' === $section ) {
		$content['projects']['title'] = befound_block_attribute_value( $attributes, 'title', $content['projects']['title'] );
		$content['projects']['intro'] = befound_block_attribute_value( $attributes, 'intro', $content['projects']['intro'] );
	}

	if ( 'partners' === $section ) {
		$content['partners']['title'] = befound_block_attribute_value( $attributes, 'title', $content['partners']['title'] );
	}

	if ( 'contact' === $section ) {
		$content['contact']['title']        = befound_block_attribute_value( $attributes, 'title', $content['contact']['title'] );
		$content['contact']['intro']        = befound_block_attribute_value( $attributes, 'intro', $content['contact']['intro'] );
		$content['contact']['email_label']  = befound_block_attribute_value( $attributes, 'emailLabel', $content['contact']['email_label'] );
		$content['contact']['email']        = befound_block_attribute_value( $attributes, 'email', $content['contact']['email'] );
		$content['contact']['phone_label']  = befound_block_attribute_value( $attributes, 'phoneLabel', $content['contact']['phone_label'] );
		$content['contact']['phone_lines']  = befound_lines_from_value( $attributes['phoneLines'] ?? '', $content['contact']['phone_lines'] );
		$content['contact']['whatsapp_number'] = befound_block_attribute_value( $attributes, 'whatsappNumber', $content['contact']['whatsapp_number'] );
		$content['contact']['studio_label'] = befound_block_attribute_value( $attributes, 'studioLabel', $content['contact']['studio_label'] );
		$content['contact']['studio_lines'] = befound_lines_from_value( $attributes['studioLines'] ?? '', $content['contact']['studio_lines'] );
		$content['contact']['locations']    = array(
			array(
				'label'   => befound_block_attribute_value( $attributes, 'jeddahLabel', $content['contact']['locations'][0]['label'] ),
				'address' => befound_block_attribute_value( $attributes, 'jeddahAddress', $content['contact']['locations'][0]['address'] ),
				'map_url' => befound_block_attribute_value( $attributes, 'jeddahMapUrl', $content['contact']['locations'][0]['map_url'] ),
			),
			array(
				'label'   => befound_block_attribute_value( $attributes, 'cairoLabel', $content['contact']['locations'][1]['label'] ),
				'address' => befound_block_attribute_value( $attributes, 'cairoAddress', $content['contact']['locations'][1]['address'] ),
				'map_url' => befound_block_attribute_value( $attributes, 'cairoMapUrl', $content['contact']['locations'][1]['map_url'] ),
			),
		);
		$content['contact']['image']        = befound_block_attribute_value( $attributes, 'image', $content['contact']['image'] );
	}

	return $content;
}

function befound_block_attribute_value( $attributes, $key, $fallback ) {
	return isset( $attributes[ $key ] ) && '' !== $attributes[ $key ] ? $attributes[ $key ] : $fallback;
}

function befound_render_section_template( $section, $content ) {
	if ( ! in_array( $section, befound_section_keys(), true ) ) {
		return '';
	}

	ob_start();
	get_template_part( 'template-parts/sections/' . $section, null, array( 'content' => $content ) );
	return ob_get_clean();
}

function befound_render_block_section( $section, $attributes = array() ) {
	return befound_render_section_template( $section, befound_content_with_section_attributes( $section, $attributes ) );
}

function befound_block_attributes_for_section( $section ) {
	$text = array( 'type' => 'string', 'default' => '' );

	$common = array(
		'title' => $text,
		'intro' => $text,
	);

	if ( 'hero' === $section ) {
		return array(
			'tagline' => $text,
			'video'   => $text,
		);
	}

	if ( 'about' === $section ) {
		return array(
			'title'           => $text,
			'backgroundImage' => $text,
			'patternImage'    => $text,
			'leftParagraphs'  => $text,
			'rightParagraphs' => $text,
		);
	}

	if ( 'partners' === $section ) {
		return array( 'title' => $text );
	}

	if ( 'contact' === $section ) {
		return array(
			'title'       => $text,
			'intro'       => $text,
			'emailLabel'  => $text,
			'email'       => $text,
			'phoneLabel'  => $text,
			'phoneLines'  => $text,
			'whatsappNumber' => $text,
			'studioLabel' => $text,
			'studioLines' => $text,
			'jeddahLabel' => $text,
			'jeddahAddress' => $text,
			'jeddahMapUrl' => $text,
			'cairoLabel' => $text,
			'cairoAddress' => $text,
			'cairoMapUrl' => $text,
			'image'       => $text,
		);
	}

	return $common;
}

function befound_register_blocks() {
	wp_register_script(
		'befound-editor-blocks',
		get_theme_file_uri( 'assets/js/editor-blocks.js' ),
		array( 'wp-blocks', 'wp-element', 'wp-components', 'wp-block-editor', 'wp-i18n' ),
		befound_asset_version( 'assets/js/editor-blocks.js' ),
		true
	);
	wp_localize_script( 'befound-editor-blocks', 'BeFoundEditorDefaults', befound_site_content() );

	$sections = befound_section_keys();
	foreach ( $sections as $section ) {
		register_block_type(
			'befound/' . $section,
			array(
				'api_version'     => 2,
				'editor_script'   => 'befound-editor-blocks',
				'attributes'      => befound_block_attributes_for_section( $section ),
				'render_callback' => function ( $attributes ) use ( $section ) {
					return befound_render_block_section( $section, $attributes );
				},
			)
		);
	}
}
add_action( 'init', 'befound_register_blocks' );

function befound_block_categories( $categories ) {
	$categories[] = array(
		'slug'  => 'befound',
		'title' => 'BeFound',
	);

	return $categories;
}
add_filter( 'block_categories_all', 'befound_block_categories' );
