<?php
/**
 * Hero section.
 *
 * @package BeFound
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$content = $args['content'] ?? befound_site_content();
$hero    = $content['hero'];
?>
<section id="home" class="relative w-full overflow-hidden bg-[#25282A]">
	<video
		autoplay
		muted
		loop
		playsinline
		class="w-full h-auto opacity-80 animate-hero-fade"
	>
		<source src="<?php echo esc_url( befound_theme_asset_url( $hero['video'] ) ); ?>" type="video/mp4">
	</video>

	<div class="absolute inset-0 bg-gradient-to-b from-[#25282A]/20 via-transparent to-[#25282A]"></div>

	<div class="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-hero-tagline w-full px-4 flex justify-center">
		<p
			class="text-[#E6F0F0] text-xs sm:text-sm tracking-[0.2em] sm:tracking-[0.4em] opacity-80 whitespace-nowrap"
			style="font-family: 'Gambetta', serif; font-weight: 300; font-style: italic"
		>
			<?php echo esc_html( $hero['tagline'] ); ?>
		</p>
	</div>
</section>
