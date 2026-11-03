<?php
/**
 * Theme footer.
 *
 * @package BeFound
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}
$content = befound_site_content();
$whatsapp_url = befound_whatsapp_url( $content['contact']['whatsapp_number'] ?? '+201111048311' );
?>
<a class="befound-whatsapp-float" href="<?php echo esc_url( $whatsapp_url ); ?>" target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp" title="Chat on WhatsApp">
	<?php echo befound_icon( 'whatsapp-brand' ); ?>
</a>
<?php wp_footer(); ?>
</body>
</html>
