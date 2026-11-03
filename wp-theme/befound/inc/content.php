<?php
/**
 * Static fallback content and native content helpers.
 *
 * @package BeFound
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

function befound_theme_asset_url( $path ) {
	if ( empty( $path ) ) {
		return '';
	}

	if ( is_numeric( $path ) ) {
		$source_asset = get_post_meta( (int) $path, '_befound_source_asset', true );
		if ( is_string( $source_asset ) && '' !== $source_asset ) {
			return get_theme_file_uri( 'assets/' . ltrim( $source_asset, '/' ) );
		}

		$url = wp_get_attachment_url( (int) $path );
		return $url ? $url : '';
	}

	if ( is_array( $path ) && ! empty( $path['url'] ) ) {
		return $path['url'];
	}

	$path = (string) $path;

	if ( preg_match( '~^(https?:)?//|^data:|^/~', $path ) ) {
		return $path;
	}

	return get_theme_file_uri( 'assets/' . ltrim( $path, '/' ) );
}

function befound_lines_from_value( $value, $fallback ) {
	if ( is_array( $value ) ) {
		$value = implode( "\n", $value );
	}

	if ( ! is_string( $value ) || '' === trim( $value ) ) {
		return $fallback;
	}

	$lines = preg_split( '/\R+/u', trim( $value ) );
	$lines = array_values( array_filter( array_map( 'trim', $lines ) ) );

	return $lines ? $lines : $fallback;
}

function befound_setting_value( $settings, $key, $fallback = '' ) {
	if ( isset( $settings[ $key ] ) && '' !== $settings[ $key ] && array() !== $settings[ $key ] ) {
		return $settings[ $key ];
	}

	return $fallback;
}

function befound_gallery_from_value( $value, $fallback = array() ) {
	if ( is_array( $value ) ) {
		return $value;
	}

	if ( ! is_string( $value ) || '' === trim( $value ) ) {
		return $fallback;
	}

	return array_values( array_filter( array_map( 'trim', explode( ',', $value ) ) ) );
}

function befound_google_maps_search_url( $query ) {
	return 'https://www.google.com/maps/search/?api=1&query=' . rawurlencode( trim( (string) $query ) );
}

function befound_phone_digits( $phone ) {
	return preg_replace( '/\D+/', '', (string) $phone );
}

function befound_tel_url( $phone ) {
	$phone = preg_replace( '/[^\d+]/', '', (string) $phone );
	return $phone ? 'tel:' . $phone : '';
}

function befound_whatsapp_url( $phone, $message = '' ) {
	$digits = befound_phone_digits( $phone );
	if ( ! $digits ) {
		return '';
	}

	$url = 'https://wa.me/' . $digits;
	if ( '' !== trim( (string) $message ) ) {
		$url .= '?text=' . rawurlencode( trim( (string) $message ) );
	}

	return $url;
}

function befound_item_lookup_key( $value ) {
	return sanitize_title( wp_specialchars_decode( (string) $value ) );
}

function befound_default_item_for_title( $section, $title, $title_key = 'title' ) {
	static $lookups = array();

	$lookup_key = $section . ':' . $title_key;
	if ( ! isset( $lookups[ $lookup_key ] ) ) {
		$content = befound_default_content();
		$items   = $content[ $section ]['items'] ?? array();
		$lookups[ $lookup_key ] = array();

		foreach ( $items as $item ) {
			$key = befound_item_lookup_key( $item[ $title_key ] ?? '' );
			if ( '' !== $key ) {
				$lookups[ $lookup_key ][ $key ] = $item;
			}
		}
	}

	$key = befound_item_lookup_key( $title );
	return $lookups[ $lookup_key ][ $key ] ?? array();
}

function befound_filled_value( $value, $fallback = '' ) {
	return ( isset( $value ) && '' !== $value && array() !== $value ) ? $value : $fallback;
}

function befound_posts_as_services() {
	$posts = get_posts(
		array(
			'post_type'      => 'befound_service',
			'post_status'    => 'publish',
			'posts_per_page' => -1,
			'orderby'        => array(
				'menu_order' => 'ASC',
				'date'       => 'ASC',
			),
		)
	);

	if ( empty( $posts ) ) {
		return array();
	}

	return array_map(
		function ( $post ) {
			$fallback = befound_default_item_for_title( 'services', get_the_title( $post ) );
			$image = get_post_thumbnail_id( $post ) ?: get_post_meta( $post->ID, '_befound_image', true );
			return array(
				'title'       => get_the_title( $post ),
				'description' => befound_filled_value( get_post_meta( $post->ID, '_befound_description', true ), $fallback['description'] ?? '' ),
				'image'       => befound_filled_value( $image, $fallback['image'] ?? '' ),
				'accent'      => befound_filled_value( get_post_meta( $post->ID, '_befound_accent', true ), $fallback['accent'] ?? '#E6F0F0' ),
				'overlay_rgb' => befound_filled_value( get_post_meta( $post->ID, '_befound_overlay_rgb', true ), $fallback['overlay_rgb'] ?? '200, 210, 210' ),
			);
		},
		$posts
	);
}

function befound_posts_as_projects() {
	$posts = get_posts(
		array(
			'post_type'      => 'befound_project',
			'post_status'    => 'publish',
			'posts_per_page' => -1,
			'orderby'        => array(
				'menu_order' => 'ASC',
				'date'       => 'ASC',
			),
		)
	);

	if ( empty( $posts ) ) {
		return array();
	}

	return array_map(
		function ( $post ) {
			$fallback = befound_default_item_for_title( 'projects', get_the_title( $post ) );
			$image   = get_post_thumbnail_id( $post ) ?: get_post_meta( $post->ID, '_befound_image', true );
			$image   = befound_filled_value( $image, $fallback['image'] ?? '' );
			$gallery = befound_gallery_from_value( get_post_meta( $post->ID, '_befound_gallery', true ), $fallback['gallery'] ?? array() );
			if ( empty( $gallery ) && $image ) {
				$gallery = array( $image );
			}

			return array(
				'title'            => get_the_title( $post ),
				'location'         => befound_filled_value( get_post_meta( $post->ID, '_befound_location', true ), $fallback['location'] ?? '' ),
				'description'      => befound_filled_value( get_post_meta( $post->ID, '_befound_description', true ), $fallback['description'] ?? '' ),
				'full_description' => befound_filled_value( get_post_meta( $post->ID, '_befound_full_description', true ), $fallback['full_description'] ?? '' ),
				'image'            => $image,
				'gallery'          => $gallery,
			);
		},
		$posts
	);
}

function befound_posts_as_partners() {
	$posts = get_posts(
		array(
			'post_type'      => 'befound_partner',
			'post_status'    => 'publish',
			'posts_per_page' => -1,
			'orderby'        => array(
				'menu_order' => 'ASC',
				'date'       => 'ASC',
			),
		)
	);

	if ( empty( $posts ) ) {
		return array();
	}

	return array_map(
		function ( $post ) {
			$fallback = befound_default_item_for_title( 'partners', get_the_title( $post ), 'name' );
			$image = get_post_thumbnail_id( $post ) ?: get_post_meta( $post->ID, '_befound_image', true );
			return array(
				'name'  => get_the_title( $post ),
				'role'  => befound_filled_value( get_post_meta( $post->ID, '_befound_role', true ), $fallback['role'] ?? '' ),
				'bio'   => befound_lines_from_value( get_post_meta( $post->ID, '_befound_bio', true ), $fallback['bio'] ?? array() ),
				'image' => befound_filled_value( $image, $fallback['image'] ?? '' ),
			);
		},
		$posts
	);
}

function befound_default_content() {
	return array(
		'meta'     => array(
			'title'       => 'BeFound — Luxury Architecture & Interior Design Studio',
			'description' => 'BeFound creates spaces that transcend the ordinary — landmark architecture, interior design, landscape, and FF&E across continents.',
			'og_image'    => 'images/Main shot.jpg',
		),
		'tracking' => array(
			'gtm_id'                  => 'GTM-N7RRLQC2',
			'ga_id'                   => '',
			'google_site_verification' => '',
			'bing_site_verification'  => '',
			'clarity_id'              => '',
		),
		'language' => array(
			'enable_switcher' => false,
			'default'         => 'en',
			'direction'       => 'ltr',
		),
		'nav'      => array(
			'logo'          => 'logos/Primary_Logo_BF_White.png',
			'items'         => array(
				array( 'id' => 'home', 'label' => 'Home' ),
				array( 'id' => 'about', 'label' => 'About' ),
				array( 'id' => 'services', 'label' => 'Services' ),
				array( 'id' => 'projects', 'label' => 'Projects' ),
				array( 'id' => 'partners', 'label' => 'Partners' ),
			),
			'contact_label' => 'Contact',
		),
		'hero'     => array(
			'video'   => 'videos/BeFound Design Studio Video For Website.mp4',
			'tagline' => 'a self-expression journey',
		),
		'about'    => array(
			'title'            => 'About Us',
			'background_image' => 'images/Main shot.jpg',
			'pattern_image'    => 'images/About us/Typography_Pattern_03_-_BF_White.png',
			'left_paragraphs'  => array(
				'At the heart of BeFound lies the belief that a space is never just a structure; it is a living extension of the soul.',
				'Our philosophy is rooted in Artistic Intentionality, the idea that every architectural line and interior detail should serve a dual purpose: to function flawlessly and to inspire deeply.',
				'We reject the "one-size-fits-all" approach, choosing instead to view each project as a narrative canvas.',
			),
			'right_paragraphs' => array(
				'In a world of constant noise, we strive to design "quiet" environments that invite inhabitants to pause, breathe, and reclaim their peace of mind.',
				'For us, successful design is found at the intersection of human aspiration and artistic exploration, creating harmonious sanctuaries where individuality is celebrated and where you can finally feel a true sense of belonging.',
			),
			'read_more'        => 'Read More',
			'read_less'        => 'Read Less',
		),
		'services' => array(
			'title'       => 'Services',
			'intro'       => 'Explore BeFound wide experience in different architectural services.',
			'repeat'      => 3,
			'gap_px'      => 16,
			'items'       => array(
				array(
					'title'       => 'Architectural Design',
					'description' => "Our architectural approach is defined by the seamless blend of structural innovation and emotional resonance.\n\nWe design forms that transcend functionality, creating the \"canvas\" upon which your life unfolds.\n\nBy merging artistic exploration with meticulous precision, we shape buildings that harmonize with their surroundings, while standing as bold statements of individuality.\n\nFor us, architecture is about more than just shelter; it is about creating a permanent sense of place where you truly belong.",
					'image'       => 'images/services/architecture.jpg',
					'accent'      => '#6BA4B8',
					'overlay_rgb' => '107, 164, 184',
				),
				array(
					'title'       => 'Interior Design',
					'description' => "At BeFound, we view interiors as the art of sculpting atmosphere.\n\nWe move beyond surface-level aesthetics to curate spaces that deeply resonate with your identity.\n\nBy balancing textures, colors, and spatial elements, we transform rooms into intimate sanctuaries of self-expression.\n\nEvery detail is intentionally selected to foster comfort and inspire creativity, ensuring your home is not just a space, but a true reflection of who you are.",
					'image'       => 'images/services/interior.jpg',
					'accent'      => '#E56A54',
					'overlay_rgb' => '229, 106, 84',
				),
				array(
					'title'       => 'Landscape Design',
					'description' => "We design outdoor spaces that harmonize with nature and architecture. Our landscapes foster serenity, seamlessly integrating greenery, water features, and pathways to create vibrant, inviting environments.\n\nEvery landscape we design is a dialogue between built form and the natural world, ensuring spaces that breathe life into their surroundings.",
					'image'       => 'images/services/landscape.jpg',
					'accent'      => '#A2A569',
					'overlay_rgb' => '162, 165, 105',
				),
				array(
					'title'       => 'FF&E Services',
					'description' => "We curate and source bespoke furniture, fixtures, and equipment that complement your space. Our selections prioritize quality, style, and comfort to complete the design vision with cohesive elegance.\n\nEvery piece is chosen with intention, balancing form and function to create interiors that feel both luxurious and lived-in.",
					'image'       => 'images/services/ffe.jpg',
					'accent'      => '#E6F0F0',
					'overlay_rgb' => '200, 210, 210',
				),
			),
		),
		'projects' => array(
			'title' => 'Projects',
			'intro' => 'Explore a curated selection of environments crafted by BeFound.',
			'items' => array(
				array(
					'title'            => 'Villa 1',
					'location'         => 'Riyadh',
					'description'      => 'A private residential villa blending modern elegance with lasting comfort.',
					'full_description' => "A private residential haven that champions modern elegance alongside lasting comfort. This villa features expansive, flowing spaces that blur the boundaries between indoor tranquility and outdoor beauty. The quiet design language allows the inhabitants' personal stories to take center stage.",
					'image'            => 'images/projects/villa1/main.jpg',
					'gallery'          => array( 'images/projects/villa1/main.jpg', 'images/projects/villa1/01.jpg', 'images/projects/villa1/02.jpg' ),
				),
				array(
					'title'            => 'Villa 2',
					'location'         => 'Riyadh',
					'description'      => 'Sleek architectural lines forming a quiet environment for family life.',
					'full_description' => 'Sleek architectural lines define this family residence, forming a quiet and sophisticated environment for daily life. The design philosophy centers on stripping away the unnecessary, leaving behind pure spaces that breathe, inspire, and offer true solace to its residents.',
					'image'            => 'images/projects/villa2/main.jpg',
					'gallery'          => array( 'images/projects/villa2/main.jpg', 'images/projects/villa2/01.jpg', 'images/projects/villa2/02.jpg' ),
				),
				array(
					'title'            => 'Villa 3',
					'location'         => 'CFC - Egypt',
					'description'      => 'A private residential building merging contemporary design with refined living spaces.',
					'full_description' => 'This private residential building exemplifies the harmonious integration of modern design principles with timeless architectural excellence. The space features ambitious structural elements and a thoughtfully planned interior layout, creating environments that celebrate both functional elegance and aesthetic sophistication.',
					'image'            => 'images/projects/villa3/main.jpg',
					'gallery'          => array( 'images/projects/villa3/main.jpg', 'images/projects/villa3/01.jpg', 'images/projects/villa3/02.jpg' ),
				),
				array(
					'title'            => 'LUXURY RESIDENTIAL BUILDING',
					'location'         => 'Riyadh',
					'description'      => 'A contemporary villa where refined materiality meets serene spatial composition.',
					'full_description' => 'A contemporary residential villa that sets a new benchmark for refined living. Every space has been conceived with intention — from the expansive open-plan living areas to the intimate private retreats. Rich materiality and a restrained palette work in harmony to create an atmosphere of understated luxury, where light, form, and texture tell a quiet, compelling story.',
					'image'            => 'images/projects/Villa 4/main.jpg',
					'gallery'          => array( 'images/projects/Villa 4/main.jpg', 'images/projects/Villa 4/01.jpg', 'images/projects/Villa 4/02.jpg', 'images/projects/Villa 4/03.jpg', 'images/projects/Villa 4/04.jpg' ),
				),
				array(
					'title'            => 'Apartment 1',
					'location'         => 'Jeddah',
					'description'      => 'A luxurious residential interior focused on warm tones and distinct atmospheres.',
					'full_description' => 'Located in the heart of the city, this luxurious apartment merges modern aesthetic sensibilities with timeless comforts. Warm tones wrap the interior, creating an inviting atmosphere that celebrates light and shadow. Every element has been meticulously placed to ensure functional elegance while offering a quiet sanctuary from the bustling world outside.',
					'image'            => 'images/projects/abdelkreim/main.jpg',
					'gallery'          => array( 'images/projects/abdelkreim/main.jpg', 'images/projects/abdelkreim/01.jpg', 'images/projects/abdelkreim/02.jpg' ),
				),
				array(
					'title'            => 'Hotel 1',
					'location'         => 'Jeddah',
					'description'      => 'Creating harmonious sanctuaries where individuality is celebrated in hospitality.',
					'full_description' => 'A hospitality experience designed around the concept of a harmonious sanctuary. This hotel project seamlessly blends opulent luxury with intimate, quiet corners that invite guests to pause and breathe. The materials and textures are carefully curated to celebrate both individuality and a shared sense of arrival.',
					'image'            => 'images/projects/hotel/main.jpg',
					'gallery'          => array( 'images/projects/hotel/main.jpg', 'images/projects/hotel/01.jpg', 'images/projects/hotel/02.jpg', 'images/projects/hotel/03.jpg', 'images/projects/hotel/04.jpg' ),
				),
				array(
					'title'            => "Eco Construction's Office",
					'location'         => 'Riyadh',
					'description'      => 'Workspace environments designed to inspire creativity and peace of mind.',
					'full_description' => 'Rethinking the modern workspace, this gallery-style office environment prioritizes creativity, collaboration, and peace of mind. By integrating elements of nature and utilizing a serene color palette, the design minimizes cognitive noise and encourages deep focus and profound inspiration.',
					'image'            => 'images/projects/offices/main.jpg',
					'gallery'          => array( 'images/projects/offices/main.jpg', 'images/projects/offices/01.jpg', 'images/projects/offices/02.jpg' ),
				),
				array(
					'title'            => 'Restaurant 1',
					'location'         => 'Jeddah',
					'description'      => 'A culinary space crafted as a narrative canvas of flavors and design.',
					'full_description' => 'A culinary journey crafted as a rich narrative canvas. The interior of this restaurant balances dynamic energy with refined dining intimacy. Bespoke lighting fixtures and carefully sourced materials create an ambiance that elevates every flavor, turning a simple meal into an evocative, unforgettable event.',
					'image'            => 'images/projects/restaurant/main.jpg',
					'gallery'          => array( 'images/projects/restaurant/main.jpg', 'images/projects/restaurant/01.jpg', 'images/projects/restaurant/02.jpg', 'images/projects/restaurant/03.jpg', 'images/projects/restaurant/04.jpg' ),
				),
			),
		),
		'partners' => array(
			'title' => 'Partners & Associates',
			'items' => array(
				array(
					'name'  => 'ENG. AHMED ABDEL AZEEM',
					'role'  => "Chief Executive Officer\n& Head Of Development",
					'bio'   => array(
						"Eng. Ahmed has contributed to the design and management of a wide range of projects, gaining hands-on experience by navigating the unique challenges of each stage in his professional journey.",
						"He later acquired the role of CEO with a vision to expand the firm's design services and enhance internal performance across all divisions. Within just two years, he successfully positioned the office to deliver its services both within the Kingdom and internationally—further strengthening its leadership in the field of engineering consultancy.",
					),
					'image' => 'images/15.jpg',
				),
			),
		),
		'contact'  => array(
			'title'        => "Let's Create Together",
			'intro'        => "Whether you're envisioning a private residence, a cultural landmark, or a commercial space, we approach every project with the same dedication to craft and vision.",
			'email_label'  => 'Email',
			'email'        => 'info@befound.design',
			'phone_label'  => 'Contact Us',
			'phone_lines'  => array( '+201110005260', '+966560740142' ),
			'whatsapp_number' => '+201111048311',
			'studio_label' => 'Address',
			'studio_lines' => array( 'Malibari Center, Tower A, Sari Street, Jeddah', '19 Street 207 - Degla Maadi' ),
			'locations'    => array(
				array(
					'label'   => 'Jeddah Office',
					'address' => 'Malibari Center, Tower A, Sari Street, Jeddah',
					'map_url' => befound_google_maps_search_url( 'Malibari Center, Tower A, Sari Street, Jeddah' ),
				),
				array(
					'label'   => 'Cairo Office',
					'address' => '19 Street 207 - Degla Maadi',
					'map_url' => befound_google_maps_search_url( '19 Street 207 Degla Maadi Cairo' ),
				),
			),
			'image'        => 'images/pexels-adrien-olichon-1257089-13025277.jpg',
			'image_alt'    => 'Studio space',
		),
		'footer'   => array(
			'logo_black'        => 'logos/Primary_Logo_BF_Black.png',
			'logo_arabic_black' => 'logos/Arabic_Logo_BF_Black.png',
			'aoc_icon'          => 'logos/AOC Icon White - Copy.png',
			'aoc_logo'          => 'logos/AOC Logo White - Copy.png',
			'creative_label'    => 'The Creative Partner Of',
			'aoc_url'           => 'https://alosaimi.sa.com/',
			'socials'           => array(
				array(
					'label' => 'LinkedIn',
					'url'   => 'https://www.linkedin.com/company/befounddesign/',
					'icon'  => 'linkedin-brand',
				),
				array(
					'label' => 'Instagram',
					'url'   => 'https://www.instagram.com/befound.design?igsh=ZWl5cDVrd3lub296&utm_source=qr',
					'icon'  => 'instagram-brand',
				),
				array(
					'label' => 'Facebook',
					'url'   => 'https://www.facebook.com/share/196ncgHVnV/?mibextid=wwXIfr',
					'icon'  => 'facebook-brand',
				),
				array(
					'label' => 'WhatsApp',
					'url'   => befound_whatsapp_url( '+201111048311' ),
					'icon'  => 'whatsapp-brand',
				),
			),
		),
	);
}

function befound_site_content() {
	static $content = null;

	if ( null !== $content ) {
		return $content;
	}

	$content = befound_default_content();
	$settings = function_exists( 'befound_get_settings' ) ? befound_get_settings() : array();

	$content['meta']['title']       = befound_setting_value( $settings, 'meta_title', $content['meta']['title'] );
	$content['meta']['description'] = befound_setting_value( $settings, 'meta_description', $content['meta']['description'] );
	$content['meta']['og_image']    = befound_setting_value( $settings, 'og_image', $content['meta']['og_image'] );

	foreach ( array_keys( $content['tracking'] ) as $tracking_key ) {
		$content['tracking'][ $tracking_key ] = befound_setting_value( $settings, $tracking_key, $content['tracking'][ $tracking_key ] );
	}

	$content['language']['enable_switcher'] = ! empty( $settings['enable_language_switcher'] ) && '1' === (string) $settings['enable_language_switcher'];
	$content['language']['default']         = befound_setting_value( $settings, 'default_language', $content['language']['default'] );

	$content['hero']['tagline'] = befound_setting_value( $settings, 'hero_tagline', $content['hero']['tagline'] );
	$content['hero']['video']   = befound_setting_value( $settings, 'hero_video', $content['hero']['video'] );

	$content['about']['title']            = befound_setting_value( $settings, 'about_title', $content['about']['title'] );
	$content['about']['background_image'] = befound_setting_value( $settings, 'about_background_image', $content['about']['background_image'] );
	$content['about']['pattern_image']    = befound_setting_value( $settings, 'about_pattern_image', $content['about']['pattern_image'] );
	$content['about']['left_paragraphs']  = befound_lines_from_value( befound_setting_value( $settings, 'about_left_paragraphs', '' ), $content['about']['left_paragraphs'] );
	$content['about']['right_paragraphs'] = befound_lines_from_value( befound_setting_value( $settings, 'about_right_paragraphs', '' ), $content['about']['right_paragraphs'] );

	$content['services']['title'] = befound_setting_value( $settings, 'services_title', $content['services']['title'] );
	$content['services']['intro'] = befound_setting_value( $settings, 'services_intro', $content['services']['intro'] );
	$content['projects']['title'] = befound_setting_value( $settings, 'projects_title', $content['projects']['title'] );
	$content['projects']['intro'] = befound_setting_value( $settings, 'projects_intro', $content['projects']['intro'] );
	$content['partners']['title'] = befound_setting_value( $settings, 'partners_title', $content['partners']['title'] );

	$content['contact']['title']        = befound_setting_value( $settings, 'contact_title', $content['contact']['title'] );
	$content['contact']['intro']        = befound_setting_value( $settings, 'contact_intro', $content['contact']['intro'] );
	$content['contact']['email_label']  = befound_setting_value( $settings, 'contact_email_label', $content['contact']['email_label'] );
	$content['contact']['email']        = befound_setting_value( $settings, 'contact_email', $content['contact']['email'] );
	$content['contact']['phone_label']  = befound_setting_value( $settings, 'contact_phone_label', $content['contact']['phone_label'] );
	$content['contact']['phone_lines']  = befound_lines_from_value( befound_setting_value( $settings, 'contact_phone_lines', '' ), $content['contact']['phone_lines'] );
	$content['contact']['whatsapp_number'] = befound_setting_value( $settings, 'contact_whatsapp_number', $content['contact']['whatsapp_number'] );
	$content['contact']['studio_label'] = befound_setting_value( $settings, 'contact_studio_label', $content['contact']['studio_label'] );
	$content['contact']['studio_lines'] = befound_lines_from_value( befound_setting_value( $settings, 'contact_studio_lines', '' ), $content['contact']['studio_lines'] );
	$content['contact']['locations']    = array(
		array(
			'label'   => befound_setting_value( $settings, 'contact_jeddah_label', $content['contact']['locations'][0]['label'] ),
			'address' => befound_setting_value( $settings, 'contact_jeddah_address', $content['contact']['locations'][0]['address'] ),
			'map_url' => befound_setting_value( $settings, 'contact_jeddah_map_url', $content['contact']['locations'][0]['map_url'] ),
		),
		array(
			'label'   => befound_setting_value( $settings, 'contact_cairo_label', $content['contact']['locations'][1]['label'] ),
			'address' => befound_setting_value( $settings, 'contact_cairo_address', $content['contact']['locations'][1]['address'] ),
			'map_url' => befound_setting_value( $settings, 'contact_cairo_map_url', $content['contact']['locations'][1]['map_url'] ),
		),
	);
	$content['contact']['image']        = befound_setting_value( $settings, 'contact_image', $content['contact']['image'] );

	$content['footer']['creative_label'] = befound_setting_value( $settings, 'footer_creative_label', $content['footer']['creative_label'] );
	$content['footer']['aoc_url']        = befound_setting_value( $settings, 'footer_aoc_url', $content['footer']['aoc_url'] );
	$content['footer']['logo_black']     = befound_setting_value( $settings, 'footer_logo_black', $content['footer']['logo_black'] );
	$content['footer']['logo_arabic_black'] = befound_setting_value( $settings, 'footer_logo_arabic_black', $content['footer']['logo_arabic_black'] );
	$content['footer']['aoc_icon']       = befound_setting_value( $settings, 'footer_aoc_icon', $content['footer']['aoc_icon'] );
	$content['footer']['aoc_logo']       = befound_setting_value( $settings, 'footer_aoc_logo', $content['footer']['aoc_logo'] );
	$content['footer']['socials'][0]['url'] = befound_setting_value( $settings, 'footer_linkedin_url', $content['footer']['socials'][0]['url'] );
	$content['footer']['socials'][1]['url'] = befound_setting_value( $settings, 'footer_instagram_url', $content['footer']['socials'][1]['url'] );
	$content['footer']['socials'][2]['url'] = befound_setting_value( $settings, 'footer_facebook_url', $content['footer']['socials'][2]['url'] );
	$content['footer']['socials'][3]['url'] = befound_setting_value( $settings, 'footer_whatsapp_url', befound_whatsapp_url( $content['contact']['whatsapp_number'] ) );

	$service_posts = befound_posts_as_services();
	if ( $service_posts ) {
		$content['services']['items'] = $service_posts;
	}

	$project_posts = befound_posts_as_projects();
	if ( $project_posts ) {
		$content['projects']['items'] = $project_posts;
	}

	$partner_posts = befound_posts_as_partners();
	if ( $partner_posts ) {
		$content['partners']['items'] = $partner_posts;
	}

	return $content;
}
