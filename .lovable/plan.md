# JustBay Customer MVP — Interactive Demo

## Goal

Build a polished, mobile-first customer marketplace demo for Eastern Nigeria. The experience will emphasize local discovery, trusted sellers, transparent naira pricing, practical delivery information, and a fast shopping journey.

## Visual system

- Apply the supplied JustBay palette: lime `#B8F23A`, warm orange `#FF8A34`, dark `#111513`, soft background `#F1F4EF`, and near-white surfaces `#FAFBF9`.
- Use Manrope for headings and Inter for body text, loaded in the document head.
- Translate all colors into semantic Tailwind tokens, with large rounded surfaces, pill controls, restrained glass effects, subtle shadows, and visible accessible focus states.
- Use responsive editorial compositions: spacious and asymmetric on desktop, compact two-column product grids and fixed bottom navigation on mobile.
- Add restrained motion for product imagery, drawers, favorites, cart feedback, and section entrances, with reduced-motion support.

## Shared marketplace foundation

- Create a responsive floating header with brand, category/deal/store navigation, prominent search, Awka delivery location, wishlist, cart count, and account access.
- Create a mobile header plus five-item bottom navigation: Home, Categories, Search, Cart, and Account.
- Build reusable marketplace elements for product cards, seller cards, ratings, prices, discount labels, verified status, local delivery, deal labels, quantity controls, filters, sorting, empty states, and order progress.
- Add a cohesive local demo catalog spanning phones, electronics, fashion, grocery, beauty, and home products, with Eastern Nigerian sellers and cities.
- Keep demo state in the browser session for cart quantities, wishlist selections, search/filter choices, and checkout progress; no account or order data will be permanently stored.

## Customer pages and flows

### 1. Home
- Search-first opening area with the headline “Everything you need. Right around the corner.” and a generated product collage representing marketplace breadth.
- Shop-by-category scroller, dark flash-sale band with countdown, Popular Near You in Awka, trusted local sellers, promotional deal area, Recently Viewed, trust and delivery benefits, app promotion, newsletter, and dark rounded footer.

### 2. Discovery
- Product listing with category, price, location, rating, verified seller, availability, delivery, and discount filters.
- Search results driven by the search field and example terms.
- Category pages reusing the listing system with category-specific titles and products.
- Desktop filter sidebar and mobile filter/sort drawers.

### 3. Product detail
- Breadcrumbs, responsive image gallery, product information, ratings, naira pricing, discount, verified seller, delivery estimate, quantity, Add to Cart, and Buy Now actions.
- Description, specifications, reviews, trust guarantees, and related products.

### 4. Cart and checkout
- Editable cart with quantity controls, removal, subtotal, sample delivery fee, and total.
- One-page checkout with contact details; Eastern Nigeria-friendly address fields including state, city, area, street, building, landmark, phone, and delivery instructions.
- Demo delivery methods and payment choices for card, bank transfer, and USSD.
- Order confirmation and visual order tracking from confirmation through delivery.

### 5. Customer account
- Demo login, registration, and password recovery screens.
- Account overview, orders, wishlist, saved addresses, notifications, and help/support pages.
- Empty and populated states that make the demo feel complete without implying real account persistence.

## Content and imagery

- Generate one cohesive hero product collage and supporting marketplace imagery; use clean product cutouts, controlled lighting, and soft shadows rather than generic stock photography.
- Use naira pricing, Awka/Onitsha/Enugu/Owerri/Aba locations, landmark-friendly delivery copy, and locally relevant product examples.
- Keep local identity subtle: no flags, decorative cultural motifs, or visual clichés.

## Navigation, metadata, and accessibility

- Create a dedicated route for every major customer page and every destination linked in navigation.
- Give each page a unique JustBay title, description, Open Graph title/description, and social card metadata.
- Use semantic landmarks, one H1 per page, meaningful alt text, keyboard-operable drawers and controls, 44px minimum touch targets, and WCAG AA contrast.
- Provide a branded not-found state and ensure the full experience works at narrow mobile and wide desktop sizes.

## Validation

- Verify all routes and key interactions: search, filtering, sorting, wishlist, add-to-cart, quantity changes, checkout progression, and order tracking.
- Visually inspect the homepage, listing, product, cart, checkout, and account screens at desktop and mobile sizes for clipping, overlap, readability, and navigation behavior.

## Not included in this release

- Live authentication, database persistence, seller/admin portals, real inventory, payments, delivery APIs, geolocation, messaging, or order fulfillment.
- The demo will be structured so these can replace the sample data and browser-session behavior in a later working-marketplace phase.