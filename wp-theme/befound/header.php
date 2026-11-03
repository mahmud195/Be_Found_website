<?php
/**
 * Theme header.
 *
 * @package BeFound
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$befound_content  = befound_site_content();
$befound_language = $befound_content['language']['default'] ?? 'en';
?>
<!doctype html>
<html <?php language_attributes(); ?> data-befound-language="<?php echo esc_attr( $befound_language ); ?>">
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<link rel="icon" type="image/png" href="<?php echo esc_url( get_theme_file_uri( 'assets/favicon.png' ) ); ?>">
	<?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>
