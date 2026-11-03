<?php
/**
 * BeFound theme bootstrap.
 *
 * @package BeFound
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

require_once get_template_directory() . '/inc/content.php';
require_once get_template_directory() . '/inc/icons.php';
require_once get_template_directory() . '/inc/assets.php';
require_once get_template_directory() . '/inc/seo.php';
require_once get_template_directory() . '/inc/admin.php';
require_once get_template_directory() . '/inc/shortcodes.php';
require_once get_template_directory() . '/inc/blocks.php';

function befound_theme_setup() {
	add_theme_support( 'title-tag' );
	add_theme_support( 'post-thumbnails' );
	add_theme_support( 'html5', array( 'search-form', 'comment-form', 'comment-list', 'gallery', 'caption', 'style', 'script' ) );
}
add_action( 'after_setup_theme', 'befound_theme_setup' );

add_filter( 'show_admin_bar', '__return_false' );
