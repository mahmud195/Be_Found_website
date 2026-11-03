<?php
/**
 * Projects section.
 *
 * @package BeFound
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$content  = $args['content'] ?? befound_site_content();
$projects = $content['projects'];
$items    = $projects['items'];
$count    = count( $items );
?>
<section
	id="projects"
	class="md:min-h-screen bg-[#25282A] py-10 md:py-32 overflow-hidden select-none"
	data-reveal-scope
	data-reveal-threshold="0.1"
>
	<div
		class="max-w-6xl mx-auto px-5 sm:px-8 mb-8 md:mb-16 transition-all duration-1000 opacity-0 translate-y-16"
		data-reveal
	>
		<div class="w-10 h-px bg-[#E6F0F0]/30 mb-4 md:hidden"></div>
		<h2
			class="text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-[#E6F0F0] font-light mb-4 md:mb-6"
			style="font-family: 'Gambarino', serif"
		>
			<?php echo esc_html( $projects['title'] ); ?>
		</h2>
		<p
			class="text-[#E6F0F0] text-sm sm:text-base font-semibold mb-3 max-w-3xl"
			style="font-family: 'Gambetta', serif"
		>
			<?php echo esc_html( $projects['intro'] ); ?>
		</p>
	</div>

	<div
		class="relative transition-all duration-1000 delay-300 touch-pan-y opacity-0 translate-y-16"
		data-reveal
		data-projects-slider
		data-projects-count="<?php echo esc_attr( $count ); ?>"
	>
		<div class="relative w-full h-[300px] sm:h-[400px] md:h-[450px] lg:h-[500px] flex items-center justify-center overflow-visible px-4">
			<?php foreach ( $items as $index => $project ) : ?>
				<?php
				$offset = $index;
				$half   = $count / 2;
				if ( $offset > $half ) {
					$offset -= $count;
				}
				$is_center   = 0 === $offset;
				$is_left     = -1 === $offset;
				$is_right    = 1 === $offset;
				$translate_x = 0;
				$scale       = 1;
				$opacity     = 0;
				$z_index     = 0;
				if ( $is_center ) {
					$translate_x = 0;
					$scale       = 1;
					$opacity     = 1;
					$z_index     = 30;
				} elseif ( $is_left ) {
					$translate_x = -108;
					$scale       = 0.75;
					$opacity     = 0.75;
					$z_index     = 20;
				} elseif ( $is_right ) {
					$translate_x = 108;
					$scale       = 0.75;
					$opacity     = 0.75;
					$z_index     = 20;
				} elseif ( $offset < 0 ) {
					$translate_x = -180;
					$scale       = 0.5;
					$z_index     = 10;
				} else {
					$translate_x = 180;
					$scale       = 0.5;
					$z_index     = 10;
				}
				?>
				<div
					class="absolute w-[80%] md:w-[45%] transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
					style="transform: translateX(calc(<?php echo esc_attr( $translate_x ); ?>% + 0px)) scale(<?php echo esc_attr( $scale ); ?>); opacity: <?php echo esc_attr( $opacity ); ?>; z-index: <?php echo esc_attr( $z_index ); ?>; visibility: <?php echo abs( $offset ) <= 2 ? 'visible' : 'hidden'; ?>; cursor: <?php echo abs( $offset ) <= 1 ? 'pointer' : 'default'; ?>"
					data-project-card
					data-index="<?php echo esc_attr( $index ); ?>"
				>
					<div class="relative aspect-[3/2] overflow-hidden rounded-sm group <?php echo $is_center ? 'shadow-2xl' : ''; ?>" data-project-card-frame>
						<img
							src="<?php echo esc_url( befound_theme_asset_url( $project['image'] ) ); ?>"
							alt="<?php echo esc_attr( $project['title'] ); ?>"
							loading="lazy"
							class="w-full h-full object-cover pointer-events-none"
						>
						<div
							class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-700 pointer-events-none <?php echo $is_center ? 'opacity-100' : 'opacity-0'; ?>"
							data-project-overlay
						></div>
						<div
							class="absolute bottom-3 sm:bottom-6 left-3 sm:left-6 right-3 sm:right-6 transition-opacity duration-700 <?php echo $is_center ? 'opacity-100' : 'opacity-0'; ?>"
							style="pointer-events: <?php echo $is_center ? 'auto' : 'none'; ?>"
							data-project-content
						>
							<h3
								class="text-lg sm:text-xl md:text-2xl text-white font-light mb-0 sm:mb-1"
								style="font-family: 'Gambarino', serif"
							>
								<?php echo esc_html( $project['title'] ); ?>
							</h3>
							<?php if ( ! empty( $project['location'] ) ) : ?>
								<p
									class="text-white/60 text-xs md:text-sm font-light mb-2 sm:mb-3"
									style="font-family: 'Gambetta', serif; font-weight: 200"
								>
									<?php echo esc_html( $project['location'] ); ?>
								</p>
							<?php endif; ?>
							<p
								class="hidden sm:block text-white/80 text-xs md:text-sm leading-relaxed mb-3 max-w-lg"
								style="font-family: 'Gambetta', serif; font-weight: 300"
							>
								<?php echo esc_html( $project['description'] ); ?>
							</p>
							<button
								type="button"
								class="inline-flex items-center min-h-[44px] text-white text-xs tracking-widest uppercase underline underline-offset-4 hover:text-white/70 transition-colors pointer-events-auto py-2"
								style="font-family: 'Gambetta', serif"
								data-project-open
								data-index="<?php echo esc_attr( $index ); ?>"
							>
								<?php echo esc_html__( 'Read More...', 'befound' ); ?>
							</button>
						</div>
					</div>
				</div>
			<?php endforeach; ?>
		</div>

		<div class="hidden md:block">
			<button
				type="button"
				class="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 border border-white/30 text-white/70 flex items-center justify-center hover:bg-white/10 transition-colors rounded-full backdrop-blur-sm bg-black/20"
				data-projects-prev
			>
				<?php echo befound_icon( 'chevron-left', 'w-6 h-6' ); ?>
			</button>
			<button
				type="button"
				class="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 border border-white/30 text-white/70 flex items-center justify-center hover:bg-white/10 transition-colors rounded-full backdrop-blur-sm bg-black/20"
				data-projects-next
			>
				<?php echo befound_icon( 'chevron-right', 'w-6 h-6' ); ?>
			</button>
		</div>

		<div class="flex md:hidden justify-center gap-8 mt-6">
			<button
				type="button"
				class="w-10 h-10 border border-white/30 text-white/70 flex items-center justify-center hover:bg-white/10 transition-colors rounded-full"
				data-projects-prev
			>
				<?php echo befound_icon( 'chevron-left', 'w-5 h-5' ); ?>
			</button>
			<button
				type="button"
				class="w-10 h-10 border border-white/30 text-white/70 flex items-center justify-center hover:bg-white/10 transition-colors rounded-full"
				data-projects-next
			>
				<?php echo befound_icon( 'chevron-right', 'w-5 h-5' ); ?>
			</button>
		</div>

		<div class="flex justify-center mt-8 gap-2">
			<?php foreach ( $items as $index => $project ) : ?>
				<button
					type="button"
					class="w-2 h-2 rounded-full transition-all duration-500 <?php echo 0 === $index ? 'bg-white w-6' : 'bg-white/30'; ?>"
					data-project-dot
					data-index="<?php echo esc_attr( $index ); ?>"
					aria-label="<?php echo esc_attr( sprintf( 'Go to project %d', $index + 1 ) ); ?>"
				></button>
			<?php endforeach; ?>
		</div>
	</div>
</section>

<div class="fixed inset-0 z-[100] bg-[#1a1c1d] flex flex-col hidden" style="padding-top: 72px" data-projects-modal>
	<div class="absolute top-0 left-0 right-0 h-[72px] bg-[#1a1c1d]/80 backdrop-blur-md border-b border-white/10 flex items-center justify-end px-6 z-50">
		<button
			type="button"
			class="w-10 h-10 flex items-center justify-center border border-white/30 text-white rounded-full hover:bg-white hover:text-black transition-colors"
			data-projects-close
		>
			<?php echo befound_icon( 'x', 'w-5 h-5' ); ?>
		</button>
	</div>

	<div class="flex-1 overflow-y-auto px-4 sm:px-8 pb-20" style="scrollbar-width: none">
		<div class="max-w-5xl mx-auto">
			<?php foreach ( $items as $project_index => $project ) : ?>
				<?php
				$gallery_urls = array();
				foreach ( $project['gallery'] as $gallery_image ) {
					$gallery_urls[] = befound_theme_asset_url( $gallery_image );
				}
				if ( empty( $gallery_urls ) && ! empty( $project['image'] ) ) {
					$gallery_urls[] = befound_theme_asset_url( $project['image'] );
				}
				?>
				<div
					class="pt-10 md:pt-16"
					data-project-modal-item
					data-index="<?php echo esc_attr( $project_index ); ?>"
				>
					<?php if ( $project_index > 0 ) : ?>
						<div class="w-full flex items-center gap-4 mb-10 md:mb-16">
							<div class="flex-1 h-px bg-white/10"></div>
							<div class="w-1 h-1 rounded-full bg-white/40"></div>
							<div class="flex-1 h-px bg-white/10"></div>
						</div>
					<?php endif; ?>

					<div
						class="rounded-sm overflow-visible mb-10 md:mb-16 p-4 sm:p-8"
						style="background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.12); backdrop-filter: blur(16px)"
					>
						<div class="flex flex-col md:flex-row gap-6 md:gap-10">
							<div class="md:w-[48%] shrink-0">
								<div
									class="relative select-none group"
									data-swipe-gallery
									data-gallery-alt="<?php echo esc_attr( $project['title'] ); ?>"
								>
									<script type="application/json" data-gallery-images><?php echo wp_json_encode( $gallery_urls ); ?></script>
									<div
										class="aspect-[4/3] overflow-hidden cursor-grab active:cursor-grabbing relative rounded-sm"
										data-swipe-stage
									>
										<img
											src="<?php echo esc_url( $gallery_urls[0] ?? '' ); ?>"
											alt="<?php echo esc_attr( $project['title'] . ' 1' ); ?>"
											loading="lazy"
											draggable="false"
											class="absolute inset-0 w-full h-full object-cover hidden"
											style="z-index: 1"
											data-swipe-pending
										>
										<img
											src="<?php echo esc_url( $gallery_urls[0] ?? '' ); ?>"
											alt="<?php echo esc_attr( $project['title'] . ' 1' ); ?>"
											loading="lazy"
											draggable="false"
											class="absolute inset-0 w-full h-full object-cover"
											style="z-index: 2"
											data-swipe-current
										>

										<?php if ( count( $gallery_urls ) > 1 ) : ?>
											<button
												type="button"
												class="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 md:w-9 md:h-9 rounded-full bg-black/40 border border-white/20 flex items-center justify-center text-white hover:bg-black/60 transition-all"
												data-swipe-prev
											>
												<?php echo befound_icon( 'chevron-left', 'w-4 h-4' ); ?>
											</button>
											<button
												type="button"
												class="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 md:w-9 md:h-9 rounded-full bg-black/40 border border-white/20 flex items-center justify-center text-white hover:bg-black/60 transition-all"
												data-swipe-next
											>
												<?php echo befound_icon( 'chevron-right', 'w-4 h-4' ); ?>
											</button>
										<?php endif; ?>

										<button
											type="button"
											class="absolute top-2 right-2 z-10 w-8 h-8 md:w-9 md:h-9 rounded-full bg-black/40 border border-white/20 flex items-center justify-center text-white hover:bg-black/60 transition-all"
											data-swipe-fullscreen
										>
											<?php echo befound_icon( 'maximize-2', 'w-3.5 h-3.5' ); ?>
										</button>
									</div>

									<?php if ( count( $gallery_urls ) > 1 ) : ?>
										<div class="flex justify-center gap-2.5 mt-3" data-swipe-dots>
											<?php foreach ( $gallery_urls as $dot_index => $image_url ) : ?>
												<button
													type="button"
													class="relative w-4 h-4 flex items-center justify-center"
													data-swipe-dot
													data-index="<?php echo esc_attr( $dot_index ); ?>"
												>
													<span class="w-1.5 h-1.5 rounded-full transition-colors duration-300 <?php echo 0 === $dot_index ? 'bg-white' : 'bg-white/30 hover:bg-white/60'; ?>" data-swipe-dot-inner></span>
													<span class="absolute inset-0 rounded-full border border-white/70 transition-opacity duration-300 <?php echo 0 === $dot_index ? '' : 'hidden'; ?>" data-swipe-dot-active></span>
												</button>
											<?php endforeach; ?>
										</div>
									<?php endif; ?>
								</div>
							</div>

							<div class="flex-1 flex flex-col justify-center">
								<h2
									class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white font-light mb-1 md:mb-2 leading-tight"
									style="font-family: 'Gambarino', serif"
								>
									<?php echo esc_html( $project['title'] ); ?>
								</h2>
								<?php if ( ! empty( $project['location'] ) ) : ?>
									<p
										class="text-white/50 text-sm md:text-base mb-4 md:mb-6"
										style="font-family: 'Gambetta', serif; font-weight: 200"
									>
										<?php echo esc_html( $project['location'] ); ?>
									</p>
								<?php endif; ?>
								<div class="w-12 h-px bg-white/25 mb-4 md:mb-6"></div>
								<p
									class="text-white/75 text-sm md:text-base leading-relaxed text-justify"
									style="font-family: 'Gambetta', serif; font-weight: 300"
								>
									<?php echo esc_html( $project['full_description'] ); ?>
								</p>
							</div>
						</div>
					</div>
				</div>
			<?php endforeach; ?>
		</div>
	</div>
</div>
