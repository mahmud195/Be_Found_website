<?php
/**
 * Partners section.
 *
 * @package BeFound
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$content  = $args['content'] ?? befound_site_content();
$partners = $content['partners'];
?>
<section
	id="partners"
	class="md:min-h-screen bg-[#1a1c1d] py-12 md:py-32 overflow-hidden"
	data-reveal-scope
	data-reveal-threshold="0.1"
>
	<div
		class="px-5 sm:px-8 md:px-16 mb-10 md:mb-16 max-w-7xl mx-auto text-center transition-all duration-1000 opacity-0 translate-y-12"
		data-reveal
	>
		<div class="w-10 h-px bg-[#E6F0F0]/30 mx-auto mb-4 md:hidden"></div>
		<h2
			class="text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-[#E6F0F0] font-light"
			style="font-family: 'Gambarino', serif"
		>
			<?php echo esc_html( $partners['title'] ); ?>
		</h2>
	</div>

	<div
		class="flex justify-center px-5 sm:px-8 md:px-16 transition-all duration-1000 delay-200 opacity-0 translate-y-12"
		data-reveal
	>
		<?php foreach ( $partners['items'] as $partner ) : ?>
			<div class="partner-card flex flex-col md:flex-row gap-0 rounded-sm overflow-hidden max-w-5xl md:items-stretch">
				<div
					class="partner-portrait w-full md:w-[40%] overflow-hidden order-1 md:order-2 transition-all duration-1000 delay-[400ms] opacity-0 scale-[1.03]"
					data-reveal
					data-reveal-scale
				>
					<img
						src="<?php echo esc_url( befound_theme_asset_url( $partner['image'] ) ); ?>"
						alt="<?php echo esc_attr( $partner['name'] ); ?>"
						loading="lazy"
						class="w-full h-full object-cover object-top"
					>
				</div>

				<div class="flex flex-col justify-start px-6 py-8 sm:px-8 sm:py-10 md:px-12 md:py-8 bg-[#1a1c1d] order-2 md:order-1 md:w-[60%] md:flex-none">
					<h3
						class="text-base sm:text-lg md:text-xl text-[#E6F0F0] font-bold tracking-wider uppercase mb-3 md:mb-4 transition-all duration-700 delay-300 opacity-0 translate-y-8"
						style="font-family: 'Gambetta', serif"
						data-reveal
					>
						<?php echo esc_html( $partner['name'] ); ?>
					</h3>
					<p
						class="text-[#E6F0F0]/70 text-sm md:text-base lg:text-lg mb-5 md:mb-8 leading-snug transition-all duration-700 delay-[450ms] opacity-0 translate-y-8"
						style="font-family: 'Gambetta', serif; font-style: italic; white-space: pre-line"
						data-reveal
					>
						<?php echo nl2br( esc_html( $partner['role'] ) ); ?>
					</p>
					<div class="space-y-3 md:space-y-4">
						<?php foreach ( $partner['bio'] as $index => $paragraph ) : ?>
							<p
								class="text-[#E6F0F0]/65 text-sm leading-relaxed transition-all duration-700 opacity-0 translate-y-8"
								style="font-family: 'Gambetta', serif; font-weight: 300; text-align: justify; transition-delay: <?php echo esc_attr( 600 + ( $index * 100 ) ); ?>ms"
								data-reveal
							>
								<?php echo esc_html( $paragraph ); ?>
							</p>
						<?php endforeach; ?>
					</div>
				</div>
			</div>
		<?php endforeach; ?>
	</div>
</section>
