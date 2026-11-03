<?php
/**
 * Navbar section.
 *
 * @package BeFound
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$content = $args['content'] ?? befound_site_content();
$nav     = $content['nav'];
?>
<nav
	class="fixed top-0 left-0 right-0 z-50 transition-all duration-700 bg-transparent py-6"
	data-befound-nav
>
	<div class="max-w-7xl mx-auto px-4 md:px-8 relative flex items-center justify-between lg:justify-center min-h-[48px]">
		<button
			type="button"
			class="lg:hidden text-white hover:text-white/80 transition-colors z-[60]"
			aria-label="Open Menu"
			data-mobile-menu-open
		>
			<?php echo befound_icon( 'menu', 'w-7 h-7' ); ?>
		</button>

		<div class="flex-1 lg:flex-none flex justify-center lg:absolute lg:left-8 items-center z-[55]">
			<a href="#" class="flex items-center space-x-4 group">
				<img
					src="<?php echo esc_url( befound_theme_asset_url( $nav['logo'] ) ); ?>"
					alt="<?php echo esc_attr__( 'BeFound Logo', 'befound' ); ?>"
					class="h-10 md:h-14 w-auto transition-transform duration-500 group-hover:scale-105"
				>
			</a>
		</div>

		<div class="lg:hidden w-[28px]"></div>

		<div class="hidden lg:flex items-center space-x-12">
			<?php foreach ( $nav['items'] as $item ) : ?>
				<?php $is_active = 'home' === $item['id']; ?>
				<a
					href="#<?php echo esc_attr( $item['id'] ); ?>"
					class="text-xs tracking-[0.2em] uppercase transition-all duration-500 relative group <?php echo $is_active ? 'text-[#E6F0F0] scale-125 font-semibold' : 'text-[#E6F0F0]/60 font-light hover:text-[#E6F0F0]'; ?>"
					data-nav-link
					data-section="<?php echo esc_attr( $item['id'] ); ?>"
				>
					<?php echo esc_html( $item['label'] ); ?>
					<span
						class="absolute -bottom-1 left-0 h-px bg-[#E6F0F0] transition-all duration-500 <?php echo $is_active ? 'w-full' : 'w-0 group-hover:w-full'; ?>"
						data-nav-underline
					></span>
				</a>
			<?php endforeach; ?>
		</div>

		<div class="absolute right-8 hidden lg:block">
			<a
				href="#contact"
				class="px-6 py-2 border transition-all duration-700 text-xs tracking-[0.2em] uppercase border-[#E6F0F0]/10 text-[#E6F0F0] font-light hover:bg-[#E6F0F0] hover:text-[#25282A]"
				data-nav-contact
				data-section="contact"
			>
				<?php echo esc_html( $nav['contact_label'] ); ?>
			</a>
		</div>
	</div>
</nav>

<div
	class="fixed inset-0 z-[100] bg-[#25282A] flex flex-col items-center justify-center transition-all duration-500 lg:hidden opacity-0 pointer-events-none"
	data-mobile-menu
>
	<button
		type="button"
		class="absolute top-8 right-8 text-white hover:text-white/80 transition-colors p-2"
		aria-label="Close Menu"
		data-mobile-menu-close
	>
		<?php echo befound_icon( 'x', 'w-8 h-8' ); ?>
	</button>

	<div class="flex flex-col items-center space-y-8">
		<?php foreach ( array_merge( $nav['items'], array( array( 'id' => 'contact', 'label' => $nav['contact_label'] ) ) ) as $item ) : ?>
			<?php $is_active = 'home' === $item['id']; ?>
			<a
				href="#<?php echo esc_attr( $item['id'] ); ?>"
				class="text-2xl tracking-[0.2em] uppercase transition-all duration-300 <?php echo $is_active ? 'text-[#E6F0F0] font-semibold' : 'text-[#E6F0F0]/70 font-light hover:text-[#E6F0F0]'; ?>"
				style="font-family: 'Gambetta', serif"
				data-mobile-nav-link
				data-section="<?php echo esc_attr( $item['id'] ); ?>"
			>
				<?php echo esc_html( $item['label'] ); ?>
			</a>
		<?php endforeach; ?>
	</div>
</div>
