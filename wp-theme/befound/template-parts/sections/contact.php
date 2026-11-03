<?php
/**
 * Contact section.
 *
 * @package BeFound
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$content = $args['content'] ?? befound_site_content();
$contact = $content['contact'];
?>
<section
	id="contact"
	class="md:min-h-screen bg-[#25282A] px-5 sm:px-8 py-10 md:py-32 border-t border-[#E6F0F0]/5"
	data-reveal-scope
	data-reveal-threshold="0.2"
>
	<div class="max-w-6xl mx-auto">
		<div class="grid md:grid-cols-2 gap-10 md:gap-20">
			<div>
				<div
					class="w-10 h-px bg-[#E6F0F0]/30 mb-4 md:hidden transition-opacity duration-1000 opacity-0"
					data-reveal
				></div>
				<h2
					class="text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-[#E6F0F0] font-light leading-tight mb-8 md:mb-12 transition-all duration-1000 opacity-0 translate-y-16"
					data-reveal
				>
					<?php echo esc_html( $contact['title'] ); ?>
				</h2>
				<p
					class="text-[#E6F0F0]/60 text-base md:text-lg leading-relaxed font-light tracking-wide mb-10 md:mb-16 transition-all duration-1000 delay-150 opacity-0 translate-y-12"
					data-reveal
				>
					<?php echo esc_html( $contact['intro'] ); ?>
				</p>

				<div class="space-y-6 md:space-y-8">
					<div
						class="flex items-start space-x-4 transition-all duration-1000 delay-300 opacity-0 translate-y-10"
						data-reveal
					>
						<?php echo befound_icon( 'mail', 'w-5 h-5 text-[#E6F0F0] mt-1 flex-shrink-0' ); ?>
						<div>
							<p class="text-[#E6F0F0] font-light mb-1"><?php echo esc_html( $contact['email_label'] ); ?></p>
							<a
								href="<?php echo esc_url( 'mailto:' . $contact['email'] ); ?>"
								class="text-[#E6F0F0]/60 hover:text-[#E6F0F0] transition-colors duration-300"
							>
								<?php echo esc_html( $contact['email'] ); ?>
							</a>
						</div>
					</div>

					<div
						class="flex items-start space-x-4 transition-all duration-1000 delay-500 opacity-0 translate-y-10"
						data-reveal
					>
						<?php echo befound_icon( 'phone', 'w-5 h-5 text-[#E6F0F0] mt-1 flex-shrink-0' ); ?>
						<div>
							<p class="text-[#E6F0F0] font-light mb-1"><?php echo esc_html( $contact['phone_label'] ); ?></p>
							<p class="text-[#E6F0F0]/60">
								<?php foreach ( $contact['phone_lines'] as $line_index => $phone ) : ?>
									<?php
									$tel_url      = befound_tel_url( $phone );
									$whatsapp_url = befound_whatsapp_url( $phone );
									?>
									<span class="befound-contact-phone" data-contact-phone>
										<a
											href="<?php echo esc_url( $tel_url ); ?>"
											class="hover:text-[#E6F0F0] transition-colors duration-300"
											data-contact-phone-trigger
											aria-haspopup="true"
											aria-expanded="false"
										><?php echo esc_html( $phone ); ?></a>
										<span class="befound-contact-phone-menu" data-contact-phone-menu>
											<a href="<?php echo esc_url( $tel_url ); ?>">
												<?php esc_html_e( 'Call', 'befound' ); ?>
											</a>
											<a
												href="<?php echo esc_url( $whatsapp_url ); ?>"
												target="_blank"
												rel="noopener noreferrer"
											>
												<?php esc_html_e( 'WhatsApp', 'befound' ); ?>
											</a>
										</span>
									</span><?php echo $line_index < count( $contact['phone_lines'] ) - 1 ? '<br>' : ''; ?>
								<?php endforeach; ?>
							</p>
						</div>
					</div>

					<div
						class="flex items-start space-x-4 transition-all duration-1000 delay-700 opacity-0 translate-y-10"
						data-reveal
					>
						<div class="w-full">
							<h3
								class="text-[#E6F0F0] font-light mb-5"
								style="font-family: 'Gambarino', serif"
							>
								<?php echo esc_html( $contact['studio_label'] ); ?>
							</h3>
							<div class="space-y-5">
								<?php foreach ( $contact['locations'] as $location ) : ?>
									<?php
									$address = $location['address'] ?? '';
									if ( '' === trim( $address ) ) {
										continue;
									}
									$map_url = ! empty( $location['map_url'] ) ? $location['map_url'] : befound_google_maps_search_url( $address );
									?>
									<a
										href="<?php echo esc_url( $map_url ); ?>"
										target="_blank"
										rel="noopener noreferrer"
										class="group flex items-start space-x-4"
										aria-label="<?php echo esc_attr( sprintf( 'Open %s in Google Maps', $location['label'] ?? $address ) ); ?>"
									>
										<?php echo befound_icon( 'map-pin', 'w-5 h-5 text-[#E6F0F0] mt-1 flex-shrink-0 group-hover:text-white transition-colors duration-300' ); ?>
										<span>
											<span class="block text-[#E6F0F0] font-light mb-1 group-hover:text-white transition-colors duration-300">
												<?php echo esc_html( $location['label'] ?? '' ); ?>
											</span>
											<span class="block text-[#E6F0F0]/60 font-light leading-relaxed group-hover:text-[#E6F0F0] transition-colors duration-300">
												<?php echo esc_html( $address ); ?>
											</span>
										</span>
									</a>
								<?php endforeach; ?>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div
				class="transition-all duration-1000 delay-300 opacity-0 translate-y-16"
				data-reveal
			>
				<div class="aspect-[4/3] md:aspect-[4/5] bg-[#E6F0F0]/5 rounded-sm overflow-hidden border border-[#E6F0F0]/10">
					<img
						src="<?php echo esc_url( befound_theme_asset_url( $contact['image'] ) ); ?>"
						alt="<?php echo esc_attr( $contact['image_alt'] ); ?>"
						loading="lazy"
						class="w-full h-full object-cover opacity-60 grayscale hover:grayscale-0 transition-all duration-1000"
					>
				</div>
			</div>
		</div>
	</div>
</section>
