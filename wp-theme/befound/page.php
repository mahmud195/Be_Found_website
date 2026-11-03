<?php
/**
 * Standard page template.
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
	<?php get_template_part( 'template-parts/sections/navbar', null, array( 'content' => $content ) ); ?>
	<main>
		<?php
		while ( have_posts() ) {
			the_post();
			the_content();
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
