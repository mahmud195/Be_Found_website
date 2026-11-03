<?php
/**
 * Front page template.
 *
 * @package BeFound
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$content = befound_site_content();

get_header();
?>
<div class="overflow-x-hidden bg-[#25282A]" data-befound-root>
	<?php
	get_template_part( 'template-parts/sections/navbar', null, array( 'content' => $content ) );
	?>
	<main>
		<?php
		$post_content = is_page() ? (string) get_post_field( 'post_content', get_queried_object_id() ) : '';
		if ( is_page() && have_posts() && function_exists( 'befound_is_befound_blocks_page' ) && befound_is_befound_blocks_page( $post_content ) ) {
			while ( have_posts() ) {
				the_post();
				the_content();
			}
		} else {
			get_template_part( 'template-parts/sections/hero', null, array( 'content' => $content ) );
			get_template_part( 'template-parts/sections/about', null, array( 'content' => $content ) );
			get_template_part( 'template-parts/sections/services', null, array( 'content' => $content ) );
			get_template_part( 'template-parts/sections/projects', null, array( 'content' => $content ) );
			get_template_part( 'template-parts/sections/partners', null, array( 'content' => $content ) );
			get_template_part( 'template-parts/sections/contact', null, array( 'content' => $content ) );
		}
		?>
	</main>
	<?php
	get_template_part( 'template-parts/sections/site-footer', null, array( 'content' => $content ) );
	get_template_part( 'template-parts/sections/bottom-bar', null, array( 'content' => $content ) );
	?>
</div>
<?php
get_footer();
