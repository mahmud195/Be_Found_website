<?php
/**
 * Visual site footer.
 *
 * @package BeFound
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$content = $args['content'] ?? befound_site_content();
$footer  = $content['footer'];
?>
<footer
	class="w-full bg-[#E6F0F0] text-[#25282A] py-1.5 px-4 sm:px-8 md:px-12 flex flex-row justify-between items-center min-h-[48px] md:min-h-[56px] transition-all duration-1000 opacity-0 translate-y-4"
	data-footer-reveal
>
	<div class="flex-1 flex justify-start h-full py-0">
		<img
			src="<?php echo esc_url( befound_theme_asset_url( $footer['logo_black'] ) ); ?>"
			alt="<?php echo esc_attr__( 'BeFound Studio', 'befound' ); ?>"
			class="h-7 md:h-10 w-auto object-contain transform scale-100 md:scale-[1.35] origin-left transition-transform duration-300"
		>
	</div>

	<div class="flex space-x-4 md:space-x-12 items-center flex-1 justify-center h-full py-0">
		<?php foreach ( $footer['socials'] as $social ) : ?>
			<?php if ( 'whatsapp-brand' === ( $social['icon'] ?? '' ) ) { continue; } ?>
			<a
				href="<?php echo esc_url( $social['url'] ); ?>"
				target="_blank"
				rel="noopener noreferrer"
				class="hover:opacity-60 transition-opacity duration-300 text-[#25282A] flex items-center justify-center"
				aria-label="<?php echo esc_attr( $social['label'] ); ?>"
			>
				<?php echo befound_icon( $social['icon'], 'w-5 h-5 md:w-6 md:h-6' ); ?>
			</a>
		<?php endforeach; ?>
	</div>

	<div class="flex-1 flex justify-end h-full py-0">
		<img
			src="<?php echo esc_url( befound_theme_asset_url( $footer['logo_arabic_black'] ) ); ?>"
			alt="<?php echo esc_attr__( 'BeFound Arabic logo', 'befound' ); ?>"
			class="h-7 md:h-10 w-auto object-contain transform scale-100 md:scale-[1.35] origin-right transition-transform duration-300"
		>
	</div>
</footer>
