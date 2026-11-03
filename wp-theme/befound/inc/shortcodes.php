<?php
/**
 * Legacy section shortcodes.
 *
 * @package BeFound
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

function befound_render_section_shortcode( $section ) {
	$allowed = array( 'hero', 'about', 'services', 'projects', 'partners', 'contact', 'navbar', 'site-footer', 'bottom-bar' );
	if ( ! in_array( $section, $allowed, true ) ) {
		return '';
	}

	ob_start();
	get_template_part( 'template-parts/sections/' . $section, null, array( 'content' => befound_site_content() ) );
	return ob_get_clean();
}

function befound_register_shortcodes() {
	$sections = array( 'hero', 'about', 'services', 'projects', 'partners', 'contact', 'navbar', 'site-footer', 'bottom-bar' );
	foreach ( $sections as $section ) {
		add_shortcode(
			'befound_' . str_replace( '-', '_', $section ),
			function () use ( $section ) {
				return befound_render_section_shortcode( $section );
			}
		);
	}

	add_shortcode(
		'befound_section',
		function ( $atts ) {
			$atts = shortcode_atts(
				array(
					'name' => '',
				),
				$atts,
				'befound_section'
			);

			return befound_render_section_shortcode( sanitize_key( str_replace( '_', '-', $atts['name'] ) ) );
		}
	);

	add_shortcode(
		'befound_main_sections',
		function ( $atts ) {
			$atts = shortcode_atts(
				array(
					'order' => 'hero,about,services,projects,partners,contact',
				),
				$atts,
				'befound_main_sections'
			);

			$output = '';
			foreach ( array_filter( array_map( 'trim', explode( ',', $atts['order'] ) ) ) as $section ) {
				$output .= befound_render_section_shortcode( sanitize_key( $section ) );
			}

			return $output;
		}
	);
}
add_action( 'init', 'befound_register_shortcodes' );
