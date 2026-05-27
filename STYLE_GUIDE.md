# Website Styling and Component Guide

This document outlines the styling, components, and overall design system of the portfolio website. It's intended to guide the recreation of the site in a static context (e.g., using a static site generator like Astro, Next.js, or Eleventy).

## Design Philosophy

The design is minimalist, modern, and content-focused. It uses a dark theme with a warm, parchment-like primary color and a subtle amber accent for highlights. The typography is clean and readable, with a serif font for display text and a sans-serif for body copy. The overall aesthetic aims to be professional and sophisticated, suitable for a portfolio in the AI and data science field.

## Color Palette

The color system is defined in `src/styles.css` using OKLCH color values for better perceptual uniformity.

-   **Background**: `oklch(0.16 0.005 260)` - A very dark, slightly cool gray.
-   **Foreground**: `oklch(0.96 0.005 90)` - An off-white for primary text.
-   **Surface**: `oklch(0.19 0.006 260)` - A slightly lighter dark gray for surfaces like cards.
-   **Primary**: `oklch(0.92 0.04 85)` - A warm, parchment-like off-white. Used for primary buttons and highlights.
-   **Primary Foreground**: `oklch(0.16 0.005 260)` - Text color for elements with a primary background.
-   **Accent**: `oklch(0.78 0.12 65)` - An understated amber/gold color for accents, links, and highlights.
-   **Border**: `oklch(0.27 0.006 260)` - A subtle border color.
-   **Muted Foreground**: `oklch(0.66 0.008 90)` - For secondary or less important text.

## Typography

Fonts are imported from Google Fonts in `src/routes/__root.tsx`.

-   **Display Font**: `Instrument Serif` - Used for main headings (`h1`, `h2`, etc.). It's an elegant serif font that provides a nice contrast to the body text.
-   **Sans-serif Font**: `Inter` - Used for all body text, paragraphs, and UI elements. It's a clean, modern, and highly readable sans-serif.
-   **Monospace Font**: `JetBrains Mono` - Used for code blocks and other monospaced text.

## Layout

The main layout is defined in `src/routes/__root.tsx`. It consists of a `Navbar`, the main content `Outlet`, and a `Footer`. The maximum width of the content is constrained to `max-w-6xl` with horizontal padding.

## Core Components

The website is built with a set of reusable React components. Here's a breakdown of the most important ones:

### `ContourBackground`

-   **File**: `src/components/ContourBackground.tsx`
-   **Description**: This is a key visual element of the site. It generates a subtle, animated topographic-like background using an HTML5 Canvas. It's designed to be ambient and low-cost.
-   **Static Recreation**: This can be recreated using a similar canvas-based animation library or even a static SVG/image as a background for simpler implementations. The core logic involves creating a grid, sampling a noise field (like Perlin or Simplex noise), and drawing contour lines.

### `Navbar`

-   **File**: `src/components/Navbar.tsx`
-   **Description**: A responsive navigation bar that becomes semi-transparent and blurred on scroll. It includes navigation links and a link to a resume. On mobile, it collapses into a hamburger menu.
-   **Styling**: Uses `position: sticky` and `backdrop-blur`. The background color changes based on the `scrolled` state.
-   **Static Recreation**: This is a standard component. The scroll behavior can be implemented with a simple JavaScript event listener.

### `Footer`

-   **File**: `src/components/Footer.tsx`
-   **Description**: A three-column footer with navigation links, social/external links (GitHub, LinkedIn, etc.), and a copyright notice.
-   **Static Recreation**: A straightforward component to replicate with HTML and CSS.

### `SectionLabel`

-   **File**: `src/components/SectionLabel.tsx`
-   **Description**: A horizontal rule with a label, used to delineate sections on a page (e.g., "Projects", "Writing"). It includes an optional number/mono text.
-   **Styling**: Uses Flexbox to align the label and the horizontal line.
-   **Static Recreation**: Simple to recreate with CSS.

### `Reveal`

-   **File**: `src/components/Reveal.tsx`
-   **Description**: A wrapper component that uses `framer-motion` to apply a subtle "fade-in and slide-up" animation to elements as they scroll into view.
-   **Static Recreation**: This effect can be achieved with the Intersection Observer API and CSS animations/transitions. Libraries like `AOS` (Animate On Scroll) can also be used.

### UI Components (`src/components/ui/`)

The project uses **shadcn/ui**, which is a collection of accessible and customizable components built on top of Radix UI and styled with Tailwind CSS. The files in `src/components/ui/` are the individual components like:

-   `button.tsx`
-   `card.tsx`
-   `dialog.tsx`
-   `accordion.tsx`
-   ...and many more.

**Static Recreation**: When rebuilding the site, you can either:
1.  Use a similar component library for your chosen framework (e.g., Material UI, Chakra UI, etc.) and style it to match.
2.  Recreate the necessary components from scratch using HTML and CSS, following the styling provided by the existing components. The class names in the components are descriptive and based on Tailwind CSS, making them easy to interpret. The core styling logic is in `src/styles.css` and the Tailwind configuration.

## Markdown and Content Styling

-   Markdown files for blog posts and projects are located in `src/content/`.
-   The styling for the rendered Markdown is in `src/styles.css` under the `.prose-mdx` class. This includes styling for headings, links, code blocks, blockquotes, etc.
-   The site uses `rehype-highlight` for syntax highlighting (with the `github-dark` theme) and `rehype-katex` for rendering math equations.

**Static Recreation**: When using a static site generator, you'll typically have plugins for Markdown processing. You'll need to configure them to use similar syntax highlighting and math rendering libraries. The CSS for `.prose-mdx` can be copied over directly.

## Summary for Static Re-implementation

1.  **Framework Choice**: Choose a static site generator (e.g., Astro, Next.js with SSG, Eleventy, Hugo).
2.  **Styling**:
    -   Set up Tailwind CSS.
    -   Copy the theme configuration (colors, fonts, etc.) from `src/styles.css` into your Tailwind configuration.
    -   Copy the base styles and any custom CSS classes.
3.  **Component Recreation**:
    -   Recreate the core components (`Navbar`, `Footer`, `SectionLabel`, etc.).
    -   For UI components, either install a library like shadcn/ui if your framework supports it, or build the necessary components manually.
    -   Implement the `Reveal` component's scroll animation using Intersection Observer or a library.
    -   Recreate the `ContourBackground` if desired, or use a static alternative.
4.  **Content**:
    -   Migrate the Markdown files from `src/content/`.
    -   Configure your Markdown processor to handle syntax highlighting and KaTeX for math.
    -   Copy the `.prose-mdx` styles.
5.  **Deployment**: Once the site is rebuilt as a collection of static files, it can be easily deployed to GitHub Pages, Netlify, Vercel, or any other static hosting provider.
