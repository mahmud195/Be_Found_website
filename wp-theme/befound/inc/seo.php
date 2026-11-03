<?php
/**
 * Lightweight SEO and tracking hooks.
 *
 * @package BeFound
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

function befound_document_title( $title ) {
	if ( is_front_page() ) {
		return befound_site_content()['meta']['title'];
	}

	return $title;
}
add_filter( 'pre_get_document_title', 'befound_document_title' );

function befound_front_page_url() {
	return home_url( '/' );
}

function befound_render_head_meta() {
	if ( ! is_front_page() ) {
		return;
	}

	$content     = befound_site_content();
	$meta        = $content['meta'];
	$tracking    = $content['tracking'];
	$title       = $meta['title'];
	$description = $meta['description'];
	$canonical   = befound_front_page_url();
	$og_image    = befound_theme_asset_url( $meta['og_image'] );

	echo "\n" . '<meta name="description" content="' . esc_attr( $description ) . '">' . "\n";
	echo '<link rel="canonical" href="' . esc_url( $canonical ) . '">' . "\n";
	echo '<meta property="og:type" content="website">' . "\n";
	echo '<meta property="og:title" content="' . esc_attr( $title ) . '">' . "\n";
	echo '<meta property="og:description" content="' . esc_attr( $description ) . '">' . "\n";
	echo '<meta property="og:site_name" content="BeFound">' . "\n";
	if ( $og_image ) {
		echo '<meta property="og:image" content="' . esc_url( $og_image ) . '">' . "\n";
	}
	echo '<meta name="twitter:card" content="summary_large_image">' . "\n";
	echo '<meta name="twitter:title" content="' . esc_attr( $title ) . '">' . "\n";
	echo '<meta name="twitter:description" content="' . esc_attr( $description ) . '">' . "\n";

	if ( ! empty( $tracking['google_site_verification'] ) ) {
		echo '<meta name="google-site-verification" content="' . esc_attr( $tracking['google_site_verification'] ) . '">' . "\n";
	}

	if ( ! empty( $tracking['bing_site_verification'] ) ) {
		echo '<meta name="msvalidate.01" content="' . esc_attr( $tracking['bing_site_verification'] ) . '">' . "\n";
	}

	if ( ! empty( $tracking['gtm_id'] ) ) {
		$gtm_id = esc_js( $tracking['gtm_id'] );
		echo "<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','{$gtm_id}');</script>\n";
	}

	if ( ! empty( $tracking['ga_id'] ) ) {
		$ga_id = esc_js( $tracking['ga_id'] );
		echo '<script async src="https://www.googletagmanager.com/gtag/js?id=' . esc_attr( $tracking['ga_id'] ) . '"></script>' . "\n";
		echo "<script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','{$ga_id}');</script>\n";
	}

	if ( ! empty( $tracking['clarity_id'] ) ) {
		$clarity_id = esc_js( $tracking['clarity_id'] );
		echo "<script>(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments);};t=l.createElement(r);t.async=1;t.src='https://www.clarity.ms/tag/'+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,'clarity','script','{$clarity_id}');</script>\n";
	}
}
add_action( 'wp_head', 'befound_render_head_meta', 2 );

function befound_render_body_tracking() {
	$tracking = befound_site_content()['tracking'];
	if ( empty( $tracking['gtm_id'] ) ) {
		return;
	}

	echo '<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=' . esc_attr( $tracking['gtm_id'] ) . '" height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>' . "\n";
}
add_action( 'wp_body_open', 'befound_render_body_tracking' );
