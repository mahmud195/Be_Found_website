<?php
/**
 * About section.
 *
 * @package BeFound
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$content = $args['content'] ?? befound_site_content();
$about   = $content['about'];
?>
<section
	id="about"
	class="relative md:min-h-screen flex flex-col items-center justify-center overflow-hidden"
	data-reveal-scope
	data-reveal-threshold="0.15"
>
	<div class="absolute inset-0 z-0">
		<img
			src="<?php echo esc_url( befound_theme_asset_url( $about['background_image'] ) ); ?>"
			alt="<?php echo esc_attr__( 'About background', 'befound' ); ?>"
			loading="lazy"
			class="w-full h-full object-cover"
		>
		<div class="absolute inset-0 bg-black/40"></div>
	</div>

	<div
		class="relative z-10 w-full max-w-6xl mx-auto px-5 sm:px-8 py-8 md:py-16 transition-all duration-1000 opacity-0 translate-y-16"
		data-reveal
	>
		<div class="flex flex-col items-center mb-5 md:mb-20">
			<div class="relative flex items-center justify-center w-full max-w-4xl">
				<img
					src="<?php echo esc_url( befound_theme_asset_url( $about['pattern_image'] ) ); ?>"
					alt="<?php echo esc_attr__( 'About us typography pattern', 'befound' ); ?>"
					loading="lazy"
					class="w-full h-auto max-h-[180px] sm:max-h-[400px] md:max-h-[550px] object-contain"
				>
				<h2
					class="absolute text-center text-3xl sm:text-5xl md:text-6xl lg:text-7xl text-[#E6F0F0] font-light tracking-wider"
					style="font-family: 'Gambarino', serif"
				>
					<?php echo esc_html( $about['title'] ); ?>
				</h2>
			</div>
		</div>

		<div class="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-6 md:gap-y-8 max-w-5xl mx-auto">
			<div
				class="flex flex-col gap-6 transition-all duration-1000 delay-300 opacity-0 translate-y-10"
				data-reveal
			>
				<?php foreach ( $about['left_paragraphs'] as $index => $paragraph ) : ?>
					<p
						class="text-[#E6F0F0]/90 text-sm md:text-base leading-relaxed text-justify <?php echo $index > 0 ? 'hidden md:block' : ''; ?>"
						style="font-family: 'Gambetta', serif; font-weight: <?php echo 1 === $index ? '400' : '300'; ?>"
						<?php echo $index > 0 ? 'data-about-extra-left' : ''; ?>
					>
						<?php echo esc_html( $paragraph ); ?>
					</p>
				<?php endforeach; ?>
			</div>

			<div
				class="flex-col gap-6 transition-all duration-1000 delay-500 md:flex opacity-0 translate-y-10 hidden"
				data-reveal
				data-about-right
			>
				<?php foreach ( $about['right_paragraphs'] as $index => $paragraph ) : ?>
					<p
						class="text-[#E6F0F0]/90 text-sm md:text-base leading-relaxed text-justify"
						style="font-family: 'Gambetta', serif; font-weight: <?php echo 0 === $index ? '400' : '300'; ?>"
					>
						<?php echo esc_html( $paragraph ); ?>
					</p>
				<?php endforeach; ?>
			</div>
		</div>

		<div class="flex justify-center mt-6 md:hidden">
			<button
				type="button"
				class="px-6 py-2 border border-[#E6F0F0]/30 text-[#E6F0F0]/80 text-xs tracking-[0.2em] uppercase hover:bg-[#E6F0F0]/10 transition-colors"
				style="font-family: 'Gambetta', serif"
				data-about-toggle
				data-read-more="<?php echo esc_attr( $about['read_more'] ); ?>"
				data-read-less="<?php echo esc_attr( $about['read_less'] ); ?>"
			>
				<?php echo esc_html( $about['read_more'] ); ?>
			</button>
		</div>
	</div>
</section>
