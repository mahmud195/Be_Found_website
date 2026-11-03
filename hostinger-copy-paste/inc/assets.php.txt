<?php
/**
 * Theme asset loading.
 *
 * @package BeFound
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

function befound_asset_version( $relative_path ) {
	$file = get_theme_file_path( $relative_path );
	return file_exists( $file ) ? (string) filemtime( $file ) : '1.0.0';
}

function befound_enqueue_assets() {
	wp_enqueue_style(
		'befound-theme',
		get_stylesheet_uri(),
		array(),
		befound_asset_version( 'style.css' )
	);

	wp_enqueue_style(
		'befound-main',
		get_theme_file_uri( 'assets/css/befound.css' ),
		array( 'befound-theme' ),
		befound_asset_version( 'assets/css/befound.css' )
	);

	wp_enqueue_style(
		'befound-contact-actions',
		get_theme_file_uri( 'assets/css/contact-actions.css' ),
		array( 'befound-main' ),
		befound_asset_version( 'assets/css/contact-actions.css' )
	);

	wp_enqueue_script(
		'befound-main',
		get_theme_file_uri( 'assets/js/befound.js' ),
		array(),
		befound_asset_version( 'assets/js/befound.js' ),
		true
	);

	wp_localize_script(
		'befound-main',
		'BeFoundTheme',
		array(
			'language' => befound_site_content()['language'],
		)
	);
}
add_action( 'wp_enqueue_scripts', 'befound_enqueue_assets' );
