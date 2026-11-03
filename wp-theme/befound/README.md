# BeFound WordPress Theme

This is a custom WordPress theme migration of the existing React/Vite BeFound website.

## What Was Migrated

- React sections were converted into PHP template parts: Navbar, Hero, About, Services, Projects, Partners, Contact, visual footer, and bottom bar.
- Tailwind and custom CSS were compiled into `assets/css/befound.css`.
- React stateful behavior was ported to vanilla JavaScript in `assets/js/befound.js`.
- The required assets from `src/assets` were copied into the theme `assets` directory.
- Lucide React icons were converted to inline SVG helpers in `inc/icons.php`.

## Current Source Constraints

- The current React checkout does not include `LanguageContext.tsx`, `translations.ts`, Arabic copy, or a visible language switcher.
- The WordPress theme includes language-readiness fields, but the switcher is disabled by default to preserve the current visible site exactly.
- The current React checkout does not include a contact form UI. The WordPress theme preserves the existing contact info/image layout and does not add a new form.

## Gutenberg Editing

The theme works without paid plugins or page builders. The Home page is editable from `Pages > Home > Edit` using BeFound Gutenberg section blocks:

- BeFound Hero
- BeFound About
- BeFound Services
- BeFound Projects
- BeFound Partners
- BeFound Contact

These blocks are reorderable/removable in Gutenberg, but each block renders through the original PHP template part and compiled React/Tailwind CSS. This preserves the original design, spacing, text-over-image placement, image cropping, overlays, animation classes, and responsive behavior.

The theme also seeds native WordPress records for structured content:

- `BeFound Content > Site Settings` edits fixed sections such as Hero, About, Contact, Footer, SEO, tracking IDs, and language readiness.
- `BeFound Content > Services` lets editors add, edit, delete, reorder, and replace service cards.
- `BeFound Content > Projects` lets editors add, edit, delete, reorder, and manage project gallery data.
- `BeFound Content > Partners` lets editors add, edit, delete, reorder, and replace partner content.

The native editor above does not require ACF, Elementor, Divi, WPBakery, or any paid plugin.

Legacy section shortcodes remain available only as a compatibility fallback:

- `[befound_hero]`
- `[befound_about]`
- `[befound_services]`
- `[befound_projects]`
- `[befound_partners]`
- `[befound_contact]`
- `[befound_main_sections order="hero,about,services,projects,partners,contact"]`

Do not use generic Gutenberg Cover/Columns blocks to rebuild the homepage design. Use the BeFound section blocks so the frontend remains identical to the original React site.

The active editability path is Gutenberg plus the native BeFound Content records. This avoids paid-plugin dependencies and prevents plugin-generated layout CSS from changing the original design.

## Hostinger Upload Note

The theme uses the migrated images and video directly from the theme assets for the default website state. Activation does not automatically import every migrated asset into the Media Library or generate thumbnails, which keeps installation fast on shared hosting.

If an earlier package was activated before this lightweight asset approach, the theme automatically converts old BeFound default imported media IDs back to theme asset paths. This fixes stale project media such as Apartment 1 while preserving any real replacement images selected by an editor.

If a seeded BeFound Content item exists in WordPress Admin but has empty media/text fields, the frontend falls back to the migrated React content for that same item title. This prevents empty project image output such as `src=""` on live installs while still allowing editors to override fields intentionally.

Editors can still replace images from WordPress Admin:

- `Pages > Home > Edit` changes section order by moving the BeFound blocks.
- `BeFound Content > Projects` changes project titles, descriptions, main images, and gallery images.
- `BeFound Content > Services`, `Partners`, and `Site Settings` change the rest of the editable content.
- Contact phone numbers, office addresses, and Google Maps links are edited from `BeFound Content > Site Settings > Contact Section`.

## Analytics and Verification IDs

The Google Tag Manager container `GTM-N7RRLQC2` is configured in `BeFound Content > Site Settings > SEO / Tracking`.

The theme prints the GTM `<script>` in `wp_head()` and the GTM `<noscript>` iframe immediately after `<body>` through `wp_body_open()`.

Add or update real IDs in `BeFound Content > Site Settings > SEO / Tracking`:

- Google Tag Manager ID
- Google Analytics Measurement ID
- Google Search Console verification code
- Bing Webmaster verification code
- Microsoft Clarity ID

Scripts and meta tags are printed only when those fields contain real values.

## Hosting

This is a standard WordPress theme and requires a WordPress hosting environment with PHP and MySQL/MariaDB.

The existing Netlify static setup cannot host this standard WordPress version because WordPress renders pages through server-side PHP and stores content/settings in a database.

Deployment steps:

1. Install WordPress on PHP/MySQL hosting.
2. Copy `wp-theme/befound` into `wp-content/themes/befound`.
3. Activate the `BeFound` theme in WordPress Admin.
4. Do not install Elementor or paid page builders for this theme. Use `Pages > Home > Edit` and `BeFound Content`.
5. Set the homepage to use the front page if the WordPress install is not already showing it.
6. Add real analytics/search verification IDs only when available.
7. Test desktop, tablet, and mobile layouts against the original React build.

## QA Checklist

- Header/nav scroll behavior and active states
- Mobile menu overlay
- Hero video autoplay/muted/loop behavior
- About reveal animation and mobile read-more toggle
- Services infinite carousel, hover text panel, and arrows
- Projects carousel, modal, swipe gallery, dots, fullscreen lightbox, zoom, pan, and keyboard controls
- Partners reveal animations and responsive portrait layout
- Contact section layout, icons, image grayscale hover
- Footer reveal, social links, AOC bottom bar
- Asset URLs, favicon, fonts, video, and image loading
- Console errors
- SEO meta/canonical/Open Graph output
- Gutenberg Home blocks rendering
- Native BeFound Content records rendering
