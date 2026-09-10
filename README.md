# Soft Canvas Design

Absolutely. I reviewed the reference as a **senior UI/UX engineer** and would treat it as a strong direction for a premium, modern digital-product website.

The visual language is essentially **soft neo-minimalism + subtle glassmorphism + editorial product design**: large rounded surfaces, generous whitespace, soft shadows, muted backgrounds, bold typography, high-quality imagery, and very controlled accent colors.

Below is a design system you can hand directly to a **UI designer, frontend engineer, Figma designer, Cursor, Lovable, v0, or another AI coding tool**.

---

# Professional Website Design System

### Reference-inspired design system

## 1. Design Philosophy

The website should communicate:

* **Premium**
* **Modern**
* **Minimal**
* **Trustworthy**
* **Technologically advanced**
* **Playful but professional**
* **High-end editorial**
* **Easy to navigate**

The design should **not** feel like a generic SaaS dashboard or typical e-commerce template.

### Core principle

> **Let the content breathe. Use fewer elements, but make every element intentional.**

The reference achieves this through:

* Large visual surfaces
* Very rounded containers
* Soft contrast
* Minimal borders
* Strong typography
* Carefully positioned imagery
* Small floating elements
* Asymmetric layouts
* One strong CTA color
* Consistent spacing

---

# 2. Visual Direction

### Design style

**Soft Neo-Minimalism**

Combined with:

* Glassmorphism
* Editorial layouts
* Modern e-commerce aesthetics
* Soft 3D imagery
* Floating UI
* Large rounded cards
* Subtle gradients
* Minimal interfaces

Avoid:

* Excessive gradients
* Heavy drop shadows
* Excessive borders
* Sharp rectangular cards
* Too many colors
* Dense information
* Generic Bootstrap-style components

---

# 3. Color System

The reference uses an almost white/grey canvas with dark typography and a vibrant lime CTA.

## Primary palette

| Token         | Color     | Usage                         |
| ------------- | --------- | ----------------------------- |
| `primary-50`  | `#F7FFE3` | Very light accent backgrounds |
| `primary-100` | `#EEFFC0` | Highlight backgrounds         |
| `primary-200` | `#E5FF91` | Secondary accent              |
| `primary-300` | `#D8FF5A` | Hover/soft CTA                |
| `primary-400` | `#C9F83D` | Main accent                   |
| `primary-500` | `#B9F52F` | Primary CTA                   |
| `primary-600` | `#A6DD20` | CTA hover                     |
| `primary-700` | `#82B617` | Active state                  |

### Primary CTA

```css
--color-primary: #B9F52F;
```

The reference's CTA should feel **energetic without becoming neon**.

---

# 4. Neutral Colors

### Background

```css
--background: #EEF1EE;
```

Alternative:

```css
--background-soft: #F3F5F1;
```

### Surface

```css
--surface: #F9FAF8;
```

### Elevated surface

```css
--surface-elevated: #FFFFFF;
```

### Text

```css
--text-primary: #101313;
--text-secondary: #565C5B;
--text-tertiary: #858B89;
```

### Dark surface

```css
--dark: #101414;
--dark-soft: #171C1B;
```

---

# 5. Semantic Color Tokens

Instead of hardcoding colors throughout the application:

```css
:root {
  --color-background: #EEF1EE;

  --color-surface: #F9FAF8;
  --color-surface-elevated: #FFFFFF;

  --color-text-primary: #101313;
  --color-text-secondary: #565C5B;
  --color-text-muted: #858B89;

  --color-primary: #B9F52F;
  --color-primary-hover: #A6DD20;

  --color-border: rgba(16, 19, 19, 0.08);

  --color-success: #35A853;
  --color-warning: #F2A900;
  --color-error: #E5484D;
  --color-info: #3B82F6;
}
```

---

# 6. Typography

The typography is extremely important to reproducing the feel of the reference.

## Recommended font

### Primary

**Inter**

or

### Alternative

**Manrope**

For a more editorial/premium appearance:

**Plus Jakarta Sans**

### Recommended combination

```text
Headings → Manrope
Body → Inter
```

---

# 7. Typography Scale

Use a fluid type system.

### Display

```text
Desktop: 72px
Tablet: 56px
Mobile: 42px

Weight: 600–700
Line height: 0.95–1.05
Letter spacing: -0.04em
```

### H1

```text
Desktop: 56px
Tablet: 48px
Mobile: 38px

Weight: 650
Line height: 1.0
Letter spacing: -0.035em
```

### H2

```text
Desktop: 44px
Tablet: 38px
Mobile: 32px

Weight: 600
Line height: 1.05
Letter spacing: -0.03em
```

### H3

```text
Desktop: 32px
Mobile: 26px
```

### H4

```text
24px
```

### Body Large

```text
18px
line-height: 1.6
```

### Body

```text
16px
line-height: 1.55
```

### Small

```text
14px
line-height: 1.45
```

### Caption

```text
12px
line-height: 1.4
```

---

# 8. Typography Rules

Headlines should generally be:

* Short
* Bold
* Large
* Highly readable
* Slightly tight

Example:

```text
Build.
Ship.
Grow.
```

rather than:

```text
Our company provides innovative solutions
for modern businesses around the world.
```

Use typography as a **visual element**, not just information.

---

# 9. Spacing System

Use an 8px base system.

```text
4px
8px
12px
16px
20px
24px
32px
40px
48px
64px
80px
96px
120px
160px
```

### Common spacing

| Element       |   Spacing |
| ------------- | --------: |
| Icon → text   |    8–12px |
| Input padding |   14–18px |
| Card padding  |   24–32px |
| Large card    |   32–48px |
| Section       |  96–140px |
| Hero          | 120–180px |
| Navbar        |   16–24px |

---

# 10. Border Radius System

This is one of the most important characteristics of the reference.

Use **large rounded corners everywhere**.

```css
--radius-xs: 8px;
--radius-sm: 12px;
--radius-md: 16px;
--radius-lg: 24px;
--radius-xl: 32px;
--radius-2xl: 40px;
--radius-pill: 9999px;
```

### Recommended usage

Buttons:

```text
999px
```

Small cards:

```text
20–24px
```

Large cards:

```text
28–32px
```

Hero container:

```text
32–40px
```

---

# 11. Container System

Desktop:

```text
max-width: 1440px
```

Large desktop:

```text
max-width: 1520px
```

Tablet:

```text
max-width: 1200px
```

Mobile:

```text
width: calc(100% - 32px)
```

Recommended desktop page padding:

```text
24px–48px
```

The website should feel like a **large floating canvas**, rather than content sitting directly against the browser edge.

---

# 12. Global Layout

Use a layout similar to:

```text
┌─────────────────────────────────────────────┐
│                 PAGE CANVAS                 │
│                                             │
│   ┌─────────────────────────────────────┐   │
│   │             NAVIGATION              │   │
│   └─────────────────────────────────────┘   │
│                                             │
│   ┌─────────────────────────────────────┐   │
│   │                                     │   │
│   │               HERO                  │   │
│   │                                     │   │
│   └─────────────────────────────────────┘   │
│                                             │
│   ┌────────────┐ ┌────────────┐ ┌────────┐  │
│   │   CARD     │ │   CARD     │ │ CARD   │  │
│   └────────────┘ └────────────┘ └────────┘  │
│                                             │
└─────────────────────────────────────────────┘
```

---

# 13. Navigation

The navigation should be **floating**, rather than a traditional full-width navbar.

### Desktop

```text
┌──────────────────────────────────────────────┐
│ LOGO   Products  Solutions  About    ● CTA  │
└──────────────────────────────────────────────┘
```

Recommended:

```text
height: 64–72px
border-radius: 999px
padding: 8px 12px
background: rgba(255,255,255,.75)
backdrop-filter: blur(20px)
```

### Navigation shadow

Very subtle:

```css
box-shadow:
0 8px 30px rgba(20, 25, 25, 0.06);
```

---

# 14. Logo

Logo should be positioned on the left.

Recommended:

```text
Logo icon + wordmark
```

The logo should be:

* Simple
* Geometric
* Black/dark
* Highly recognizable
* No excessive detail

---

# 15. Hero Section

The hero should be the visual centerpiece.

### Structure

```text
┌────────────────────────────────────────────────┐
│                                                │
│  Eyebrow                                       │
│                                                │
│  BIG HEADLINE                   PRODUCT IMAGE  │
│  BIG HEADLINE                   / 3D OBJECT    │
│                                                │
│  Supporting text                               │
│                                                │
│  [ Primary CTA ] [ Secondary ]                 │
│                                                │
└────────────────────────────────────────────────┘
```

### Hero height

Desktop:

```text
650–750px
```

Mobile:

```text
600–700px
```

---

# 16. Hero Image Treatment

Images should not simply be placed as rectangular images.

Instead:

### Preferred

* Transparent PNG/WebP
* 3D product renders
* Cutout photography
* Floating objects
* Soft gradients
* Very subtle blur
* Layered depth

Example:

```text
       ●

              PRODUCT
          ╭────────────╮
       ●  │            │
          │            │
          ╰────────────╯
                ●
```

Small decorative floating elements can create depth.

---

# 17. Decorative Elements

Use small circles and abstract shapes.

Example:

```text
●
      ●

             PRODUCT

   ●
```

Recommended:

```text
width: 8–20px
border-radius: 50%
```

Colors:

* dark
* grey
* accent
* translucent

Don't overuse them.

---

# 18. Buttons

## Primary Button

```text
Background: #B9F52F
Text: #101313
Radius: 999px
Height: 52–56px
Padding: 8px 10px 8px 20px
```

Example:

```text
┌───────────────────────────┐
│  View Products       ↗    │
└───────────────────────────┘
```

The arrow can sit inside a dark circular element.

### Button anatomy

```text
[ Label ] [ ● ↗ ]
```

This is a strong visual characteristic worth preserving.

---

# 19. Secondary Button

```text
background: transparent
border: 1px solid rgba(16,19,19,.12)
color: #101313
```

Hover:

```text
background: #101313
color: white
```

---

# 20. Icon Buttons

Circular icon buttons:

```text
40×40
48×48
52×52
```

Use for:

* Search
* Cart
* Favorite
* Arrow
* Menu
* Close

Example:

```text
╭────╮
│ ↗  │
╰────╯
```

---

# 21. Cards

Cards are a major component.

### Card characteristics

```text
background: #F9FAF8
border-radius: 28px
padding: 24px
border: 1px solid rgba(255,255,255,.5)
```

Very subtle shadow:

```css
box-shadow:
0 10px 40px rgba(20, 30, 30, 0.04);
```

---

# 22. Card Hierarchy

Create three card levels.

### Level 1 — Base

```text
background: #F9FAF8
```

### Level 2 — Elevated

```text
background: #FFFFFF
box-shadow
```

### Level 3 — Dark

```text
background: #101313
color: white
```

This allows visual hierarchy without needing lots of colors.

---

# 23. Product Cards

For an e-commerce/product website:

```text
┌──────────────────────┐
│              ♡       │
│                      │
│       PRODUCT        │
│        IMAGE         │
│                      │
│                      │
├──────────────────────┤
│ Product name         │
│ Category             │
│                      │
│ ₦25,000       ↗      │
└──────────────────────┘
```

---

# 24. Image Containers

Product imagery should use large soft backgrounds.

Example:

```css
.product-image {
  border-radius: 24px;
  background:
    linear-gradient(
      135deg,
      #F5F7F4,
      #E9EEE9
    );
}
```

Avoid hard rectangular image borders.

---

# 25. Glassmorphism

Use glass effects sparingly.

```css
.glass {
  background: rgba(255,255,255,0.68);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border: 1px solid rgba(255,255,255,0.55);
}
```

Good use cases:

* Navbar
* Floating controls
* Image overlays
* Filters
* Floating cards

Don't use glassmorphism on everything.

---

# 26. Shadows

Shadows should be **soft and almost invisible**.

### Small

```css
0 4px 16px rgba(0,0,0,.04)
```

### Medium

```css
0 12px 32px rgba(0,0,0,.06)
```

### Large

```css
0 24px 60px rgba(0,0,0,.08)
```

Avoid:

```css
0 10px 10px #000;
```

Hard shadows will destroy the aesthetic.

---

# 27. Borders

Use borders primarily to define subtle boundaries.

```css
border: 1px solid rgba(16,19,19,.07);
```

Never rely on thick borders.

---

# 28. Grid System

Desktop:

```text
12-column grid
```

Example:

```text
┌───────────────────────────────────────────────┐
│ 1 2 3 4 5 6 7 8 9 10 11 12                  │
└───────────────────────────────────────────────┘
```

Hero:

```text
Text: 5 columns
Image: 7 columns
```

Product grid:

```text
4 columns desktop
3 columns tablet
2 columns mobile
```

---

# 29. Responsive Breakpoints

Use:

```text
xs: 480px
sm: 640px
md: 768px
lg: 1024px
xl: 1280px
2xl: 1536px
```

### Desktop

Large asymmetric layouts.

### Tablet

Reduce:

* typography
* spacing
* card dimensions

### Mobile

Everything becomes stacked.

---

# 30. Mobile Hero

Desktop:

```text
TEXT              IMAGE
```

Mobile:

```text
TEXT

IMAGE

CTA
```

Hero should never feel cramped.

Recommended mobile padding:

```text
24px
```

---

# 31. Mobile Navigation

Desktop navigation should collapse into:

```text
LOGO                         ☰
```

Open menu:

```text
┌──────────────────────┐
│ LOGO             ×   │
│                      │
│ Home                 │
│ Products             │
│ Services             │
│ About                │
│ Contact              │
│                      │
│ [ Get Started ]      │
└──────────────────────┘
```

Use a full-screen or large floating drawer.

---

# 32. Section Design

Every major section should feel like its own visual composition.

Avoid:

```text
Heading
paragraph
heading
paragraph
heading
paragraph
```

Instead use:

```text
        SECTION LABEL

        Large Heading
        ─────────────

  Supporting description

┌─────────┐ ┌─────────┐ ┌─────────┐
│         │ │         │ │         │
│ CARD    │ │ CARD    │ │ CARD    │
└─────────┘ └─────────┘ └─────────┘
```

---

# 33. Section Labels

Small pill:

```text
╭──────────────────╮
│ ✦  Our Services  │
╰──────────────────╯
```

Style:

```text
font-size: 12–14px
font-weight: 500
background: rgba(255,255,255,.7)
border-radius: 999px
padding: 8px 12px
```

---

# 34. Stats

Use oversized numbers.

Example:

```text
5M+
Downloads
```

or:

```text
98%
Customer satisfaction
```

Number:

```text
48–64px
font-weight: 650
```

Description:

```text
14px
color: muted
```

---

# 35. Social Proof

Instead of conventional testimonials:

```text
┌────────────────────────────────────┐
│  👤 👤 👤 👤                       │
│                                    │
│  50K+                              │
│  Happy customers                  │
│                                    │
│  ★ 4.9 rating                     │
└────────────────────────────────────┘
```

Use overlapping avatars.

---

# 36. Avatar System

```text
32px
40px
48px
56px
```

Overlapping:

```text
👤👤👤👤
```

Each avatar:

```css
border: 3px solid #F9FAF8;
```

---

# 37. Search

Search should look like a pill rather than a conventional input.

```text
╭────────────────────────────────────╮
│ 🔍  Search products...              │
╰────────────────────────────────────╯
```

Height:

```text
52–56px
```

Radius:

```text
999px
```

---

# 38. Form Inputs

```text
height: 52px
border-radius: 14–16px
padding: 0 16px
```

Default:

```text
background: #F5F7F4
border: 1px solid transparent
```

Focus:

```text
border: 1px solid #B9F52F
box-shadow: 0 0 0 3px rgba(185,245,47,.15);
```

---

# 39. Footer

Footer should become a large dark rounded surface.

```text
┌─────────────────────────────────────────────┐
│                                             │
│ LOGO                                        │
│                                             │
│ Large CTA                                   │
│                                             │
│ Products   Company   Resources   Social     │
│                                             │
│─────────────────────────────────────────────│
│ © 2026 Company              Privacy Terms   │
└─────────────────────────────────────────────┘
```

Background:

```text
#101313
```

Text:

```text
#FFFFFF
```

Secondary text:

```text
rgba(255,255,255,.55)
```

---

# 40. Motion Design

Animations should feel **smooth and expensive**, not flashy.

### Standard transition

```css
transition:
  transform 300ms cubic-bezier(.2,.8,.2,1),
  opacity 300ms ease,
  background 200ms ease;
```

### Card hover

```text
translateY(-4px)
```

### Image hover

```text
scale(1.03)
```

### Button hover

```text
scale(1.02)
```

---

# 41. Hero Animation

Use subtle floating animation:

```text
Product
   ↑
   ↓
```

Duration:

```text
4–6 seconds
```

Very small movement:

```text
translateY(-8px)
```

Don't make the object bounce aggressively.

---

# 42. Scroll Animation

Recommended:

* Fade up
* Slight translate
* Image scale
* Staggered cards

Example:

```text
opacity: 0 → 1
translateY: 24px → 0
```

Duration:

```text
500–700ms
```

---

# 43. Interaction Principles

Every interactive element should have:

### Default

Normal appearance.

### Hover

Subtle visual feedback.

### Focus

Clear keyboard focus.

### Active

Slightly compressed.

### Disabled

Reduced opacity.

Example:

```text
Default → Hover → Active
  1.0      1.02     .98
```

---

# 44. Accessibility

The premium appearance must not compromise accessibility.

### Minimum requirements

* WCAG AA contrast
* Keyboard navigation
* Visible focus states
* Semantic HTML
* Proper heading hierarchy
* Alt text
* Accessible buttons
* Minimum 44×44px touch targets
* Reduced motion support

Add:

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

# 45. Iconography

Use one consistent icon library.

Recommended:

**Lucide Icons**

Style:

```text
stroke-width: 1.8–2
```

Avoid mixing:

* Font Awesome
* Material icons
* Lucide
* custom SVG

unless absolutely necessary.

---

# 46. Imagery Guidelines

Images should have:

### Product photography

* clean backgrounds
* high resolution
* controlled lighting
* soft shadows

### Lifestyle photography

* natural compositions
* muted colors
* editorial photography

### 3D

* smooth materials
* realistic lighting
* soft shadows
* transparent backgrounds

---

# 47. Background System

The background should have subtle depth.

Possible:

```css
background:
radial-gradient(
  circle at 20% 20%,
  rgba(255,255,255,.8),
  transparent 35%
),
#EEF1EE;
```

But keep gradients extremely subtle.

---

# 48. Design Tokens

A complete token structure:

```ts
const designTokens = {
  colors: {
    background: "#EEF1EE",
    surface: "#F9FAF8",
    white: "#FFFFFF",

    text: {
      primary: "#101313",
      secondary: "#565C5B",
      muted: "#858B89"
    },

    primary: {
      100: "#EEFFC0",
      300: "#D8FF5A",
      500: "#B9F52F",
      600: "#A6DD20"
    },

    dark: "#101313",

    border: "rgba(16,19,19,.08)"
  },

  radius: {
    sm: "12px",
    md: "16px",
    lg: "24px",
    xl: "32px",
    "2xl": "40px",
    pill: "999px"
  },

  spacing: {
    1: "4px",
    2: "8px",
    3: "12px",
    4: "16px",
    5: "20px",
    6: "24px",
    8: "32px",
    10: "40px",
    12: "48px",
    16: "64px",
    20: "80px",
    24: "96px",
    32: "128px"
  }
}
```

---

# 49. Component Architecture

I would structure the design system around reusable components:

```text
/components
│
├── layout
│   ├── Navbar
│   ├── Footer
│   ├── Container
│   └── Section
│
├── ui
│   ├── Button
│   ├── IconButton
│   ├── Badge
│   ├── Pill
│   ├── Input
│   ├── Search
│   ├── Avatar
│   └── Divider
│
├── cards
│   ├── ProductCard
│   ├── FeatureCard
│   ├── TestimonialCard
│   ├── StatCard
│   └── CategoryCard
│
├── hero
│   ├── Hero
│   ├── HeroImage
│   └── FloatingElement
│
└── sections
    ├── Features
    ├── Products
    ├── Testimonials
    ├── Stats
    ├── CTA
    └── Newsletter
```

---

# 50. Recommended Page Composition

For a professional website following this system:

```text
NAVBAR

        ↓

HERO
Large statement + visual

        ↓

TRUST / SOCIAL PROOF
logos / users / stats

        ↓

FEATURES
3–4 large asymmetric cards

        ↓

PRODUCT / SERVICE SHOWCASE
Large editorial cards

        ↓

HOW IT WORKS
3 simple steps

        ↓

FEATURED CONTENT
Large image + text

        ↓

TESTIMONIALS

        ↓

STATISTICS

        ↓

LARGE CTA

        ↓

FOOTER
```

---

# 51. The Most Important Visual Rules

If you're implementing this design, **these 10 rules should not be broken**:

### 01 — Use large rounded corners

`24–40px`

### 02 — Keep the background soft

Avoid pure `#FFFFFF` everywhere.

### 03 — Use one dominant accent

Lime/green should be reserved for important actions.

### 04 — Use oversized typography

Headlines should command the screen.

### 05 — Give content room

Generous whitespace is part of the design.

### 06 — Use asymmetric layouts

Don't make every section perfectly symmetrical.

### 07 — Images should feel integrated

Don't simply drop rectangular images into cards.

### 08 — Shadows should be barely visible

Depth > obvious shadows.

### 09 — Use pills extensively

Especially:

* CTA buttons
* Tags
* Filters
* Navigation
* Search

### 10 — Prioritize visual hierarchy over information density

The page should be understandable in **3–5 seconds**.

---

# 52. Suggested Figma Structure

If you're building this in Figma, I'd structure the design file like this:

```text
📁 00 — Cover

📁 01 — Foundations
   ├── Colors
   ├── Typography
   ├── Spacing
   ├── Grid
   ├── Radius
   ├── Shadows
   └── Icons

📁 02 — Components
   ├── Buttons
   ├── Inputs
   ├── Navigation
   ├── Cards
   ├── Badges
   ├── Avatars
   └── Modals

📁 03 — Sections
   ├── Hero
   ├── Features
   ├── Products
   ├── Testimonials
   ├── CTA
   └── Footer

📁 04 — Pages
   ├── Home
   ├── About
   ├── Products
   ├── Product Details
   ├── Contact
   └── Dashboard

📁 05 — Responsive
   ├── Desktop
   ├── Tablet
   └── Mobile

📁 06 — Prototype
```

---

# 53. Recommended Tech Implementation

If this is for your usual **Next.js/React stack**, I'd implement it with:

```text
Next.js
React
TypeScript
Tailwind CSS
Lucide React
Framer Motion
```

And establish the design tokens in Tailwind rather than scattering arbitrary values throughout components.

For example:

```tsx
<Button variant="primary">
  Get Started
</Button>
```

rather than:

```tsx
<button className="bg-[#B9F52F] rounded-[27px] px-[23px] ...">
```

The former makes the design system maintainable.

---

# 54. Overall Design Personality

If I had to summarize the reference into a design brief for a UI team:

> **Create a premium, editorial-inspired digital experience built around soft neutral surfaces, oversized typography, generous whitespace, highly rounded containers, subtle glass effects, floating imagery, minimal shadows, and a vibrant lime accent. The interface should feel sophisticated and modern without becoming sterile, with playful floating elements and micro-interactions providing personality.**

### Design keywords

**Premium · Soft · Minimal · Editorial · Futuristic · Organic · Rounded · Clean · Spacious · Interactive**

---

## What I need from you

I **don't need more details to create the design system itself**—the reference gives enough direction.

However, if you want me to take this one step further and create a **production-ready design system specifically for your website**, send me these 5 things:

1. **Website/product name**
2. **What the website does**
3. **Target audience**
4. **Pages you need** — e.g. Home, About, Services, Products, Contact, Dashboard
5. **Your preferred brand colors/logo**, if you already have them

Then I can turn this into a **complete UI/UX specification** including the exact homepage layout, component states, desktop/tablet/mobile behavior, Tailwind design tokens, and a **ready-to-paste prompt for Cursor/Lovable/v0 to implement the website faithfully in Next.js**.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/8fd88820-7662-4802-96fe-246d8de8b322).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
