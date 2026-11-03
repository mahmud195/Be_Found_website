<?php
/**
 * Bottom brand bar.
 *
 * @package BeFound
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$content = $args['content'] ?? befound_site_content();
$footer  = $content['footer'];
?>
<div class="w-full bg-[#1A1C1D] flex flex-wrap items-center justify-start gap-3 py-2 px-4 sm:px-8 md:px-12 min-h-[40px] md:min-h-[48px]">
	<span
		class="text-[#E6F0F0]/50 text-xs md:text-sm whitespace-nowrap"
		style="font-family: 'Gambetta', serif; font-weight: 300"
	>
		<?php echo esc_html( $footer['creative_label'] ); ?>
	</span>
	<a
		href="<?php echo esc_url( $footer['aoc_url'] ); ?>"
		target="_blank"
		rel="noopener noreferrer"
		class="flex items-center gap-3 transition-opacity hover:opacity-80"
	>
		<img
			src="<?php echo esc_url( befound_theme_asset_url( $footer['aoc_icon'] ) ); ?>"
			alt="<?php echo esc_attr__( 'AOC Icon', 'befound' ); ?>"
			class="h-5 md:h-6 w-auto object-contain opacity-70"
		>
		<img
			src="<?php echo esc_url( befound_theme_asset_url( $footer['aoc_logo'] ) ); ?>"
			alt="<?php echo esc_attr__( 'AOC', 'befound' ); ?>"
			class="h-5 md:h-6 w-auto object-contain opacity-70"
		>
	</a>
</div>
