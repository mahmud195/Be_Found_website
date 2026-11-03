<?php
/**
 * Services section.
 *
 * @package BeFound
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$content  = $args['content'] ?? befound_site_content();
$services = $content['services'];
// Remove imported FF&E duplicates before building the infinite carousel copies.
$has_ffe = false;
$services['items'] = array_values( array_filter( $services['items'], static function ( $service ) use ( &$has_ffe ) {
	$title = strtolower( preg_replace( '/[^a-zA-Z]/', '', wp_specialchars_decode( $service['title'] ?? '' ) ) );
	if ( 'ffeservices' !== $title ) {
		return true;
	}
	if ( $has_ffe ) {
		return false;
	}
	$has_ffe = true;
	return true;
} ) );
$repeat   = max( 1, (int) ( $services['repeat'] ?? 3 ) );
?>
<section
	id="services"
	class="md:min-h-screen bg-[#25282A] px-6 md:px-8 py-10 md:py-32 overflow-hidden"
	data-reveal-scope
	data-reveal-threshold="0.1"
>
	<div class="max-w-7xl mx-auto">
		<div
			class="mb-8 md:mb-16 transition-all duration-1000 opacity-0 translate-y-16"
			data-reveal
		>
			<div class="w-10 h-px bg-[#E6F0F0]/30 mb-4 md:hidden"></div>
			<h2
				class="text-4xl md:text-6xl text-[#E6F0F0] font-light mb-4"
				style="font-family: 'Gambarino', serif"
			>
				<?php echo esc_html( $services['title'] ); ?>
			</h2>
			<p class="text-[#E6F0F0]/60 text-base md:text-lg font-light tracking-wide">
				<?php echo esc_html( $services['intro'] ); ?>
			</p>
		</div>

		<div
			class="transition-all duration-1000 delay-200 opacity-0 translate-y-16"
			data-reveal
		>
			<div class="relative">
				<div
					class="services-scroll-track flex gap-4"
					data-services-track
					data-repeat-count="<?php echo esc_attr( $repeat ); ?>"
					data-card-gap="<?php echo esc_attr( $services['gap_px'] ?? 16 ); ?>"
				>
					<?php for ( $copy = 0; $copy < $repeat; $copy++ ) : ?>
						<?php foreach ( $services['items'] as $index => $service ) : ?>
							<div class="service-slide flex-shrink-0 flex rounded-sm overflow-hidden">
								<div
									class="service-title-strip relative flex-shrink-0 flex items-center justify-center"
									style="background-color: #1a1c1e"
								>
									<span
										class="whitespace-nowrap text-sm md:text-base font-light tracking-[0.15em] uppercase"
										style="color: <?php echo esc_attr( $service['accent'] ); ?>; writing-mode: vertical-rl; transform: rotate(180deg); font-family: 'Gambetta', serif"
									>
										<?php echo esc_html( $service['title'] ); ?>
									</span>
								</div>

								<div class="service-card flex-1">
									<img
										src="<?php echo esc_url( befound_theme_asset_url( $service['image'] ) ); ?>"
										alt="<?php echo esc_attr( $service['title'] ); ?>"
										loading="lazy"
										class="absolute inset-0 w-full h-full object-cover"
									>

									<div class="card-default-gradient"></div>

									<div class="card-title-overlay">
										<h3
											class="text-xl sm:text-3xl md:text-5xl font-light text-center px-4 sm:px-6 md:px-8 leading-tight"
											style="color: <?php echo esc_attr( $service['accent'] ); ?>; font-family: 'Gambarino', serif; text-shadow: 0 2px 20px rgba(0,0,0,0.5)"
										>
											<?php echo esc_html( $service['title'] ); ?>
										</h3>
									</div>

									<div
										class="card-text-panel"
										style="background: linear-gradient(135deg, rgba(<?php echo esc_attr( $service['overlay_rgb'] ); ?>, 0.85) 0%, rgba(<?php echo esc_attr( $service['overlay_rgb'] ); ?>, 0.65) 100%); backdrop-filter: blur(6px)"
									>
										<h3
											class="text-xl md:text-3xl font-light mb-4 text-white"
											style="font-family: 'Gambarino', serif"
										>
											<?php echo esc_html( $service['title'] ); ?>
										</h3>
										<?php foreach ( preg_split( '/\R{2,}/u', trim( $service['description'] ) ) as $paragraph ) : ?>
											<p class="text-white/90 text-xs md:text-sm font-light leading-relaxed mb-3 last:mb-0">
												<?php echo esc_html( $paragraph ); ?>
											</p>
										<?php endforeach; ?>
									</div>
								</div>
							</div>
						<?php endforeach; ?>
					<?php endfor; ?>
				</div>

				<button
					type="button"
					class="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-black/40 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300 hover:bg-black/70 group"
					aria-label="<?php echo esc_attr__( 'Scroll left', 'befound' ); ?>"
					data-services-prev
				>
					<svg class="w-4 h-4 text-white/70 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true" focusable="false">
						<path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5"></path>
					</svg>
				</button>
				<button
					type="button"
					class="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-black/40 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300 hover:bg-black/70 group"
					aria-label="<?php echo esc_attr__( 'Scroll right', 'befound' ); ?>"
					data-services-next
				>
					<svg class="w-4 h-4 text-white/70 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true" focusable="false">
						<path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5"></path>
					</svg>
				</button>
			</div>
		</div>
	</div>
</section>
