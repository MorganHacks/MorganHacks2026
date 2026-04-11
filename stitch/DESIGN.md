# Design System Strategy: The Luminescent Void

## 1. Overview & Creative North Star
**Creative North Star: The Luminescent Void**

This design system is built upon the concept of "The Luminescent Void." It moves away from the flat, paper-like surfaces of traditional material design and instead embraces a high-end digital landscape where light is the only structural element. The interface should feel like a high-precision terminal projected into deep space. 

By utilizing intentional asymmetry—such as off-center typography and overlapping glass modules—we break the "template" look. We favor breathing room (generous white space) and massive typographic scales to create an editorial, premium experience that signals authority and innovation for the 2026 hackathon.

---

## 2. Colors
Our palette is rooted in the contrast between absolute darkness and electric energy.

*   **The "No-Line" Rule:** To maintain a premium, seamless feel, 1px solid borders for sectioning are strictly prohibited. Boundaries must be defined through background color shifts. For example, a `surface_container_low` (`#131319`) section should sit directly against a `surface` (`#0e0e13`) background to create a soft, sophisticated transition.
*   **Surface Hierarchy & Nesting:** Treat the UI as a series of physical layers. Use the `surface_container` tiers to create depth. A `surface_container_highest` (`#25252d`) element should be reserved for the most interactive, "closest" elements, while `surface_container_lowest` (`#000000`) should be used to anchor the base of the page.
*   **The "Glass & Gradient" Rule:** Floating elements must use Glassmorphism. Apply semi-transparent `surface_variant` with a heavy `backdrop-blur` (20px+) to create a frosted-tech aesthetic.
*   **Signature Textures:** For primary CTAs and hero highlights, utilize subtle radial gradients transitioning from `primary` (`#81ecff`) to `primary_container` (`#00e3fd`). This creates a "pulse" of light that flat colors cannot replicate.

---

## 3. Typography
The typography system pairs the technical precision of **Space Grotesk** with the humanistic clarity of **Manrope**.

*   **Display & Headline (Space Grotesk):** These are your "Brand Voice" tokens. `display-lg` (3.5rem) should be used for hero statements, often with tight tracking (-2%) to feel like a bold, singular unit of data.
*   **Title & Body (Manrope):** These provide the "Functional Voice." `body-lg` (1rem) is the workhorse for information. By keeping body text in a clean sans-serif, we allow the tech-inspired headlines to pop without exhausting the reader.
*   **Labels:** Use `label-md` with 10% letter-spacing and uppercase styling for a "tactical terminal" feel on small metadata.

---

## 4. Elevation & Depth
Depth in this system is achieved through light and layering, not structural lines.

*   **The Layering Principle:** Stack `surface-container` tiers to indicate importance. A card using `surface_container_low` placed on a `surface` background creates a natural, soft lift.
*   **Ambient Shadows:** When a component must "float" (like a modal), use an extra-diffused shadow. The shadow should not be black; it should be a low-opacity (6%) tint of `primary` to mimic the glow of the screen reflecting off the surface.
*   **The "Ghost Border" Fallback:** If a container requires a boundary for accessibility, use a "Ghost Border." Apply `outline_variant` at 15% opacity. It should be felt, not seen.
*   **Glassmorphism & Depth:** Use backdrop blurs to allow the deep background gradients or ambient light to bleed through. This integrates the layout into the environment rather than making it feel like an overlay.

---

## 5. Components

### Buttons
*   **Primary:** Solid `primary` (`#81ecff`) background with `on_primary` text. Apply a subtle outer glow (0px 0px 15px) using the `primary` color at 30% opacity to simulate a neon light.
*   **Secondary:** Ghost style. Use the "Ghost Border" (`outline_variant` at 20%) with `primary` text. On hover, fill with `primary` at 5% opacity.
*   **Tertiary:** Text-only, utilizing `primary_dim` to indicate lower hierarchy.

### Cards
*   Cards should never have a 100% opaque border. Use `surface_container` shifts. For the 2026 hackathon "tracks," use a `surface_variant` background with a `primary` neon accent bar (2px) at the very top to indicate category.

### Inputs
*   **Text Fields:** Utilize `surface_container_highest` for the input track. The active state should be signaled by a `primary` "Ghost Border" and a subtle cyan glow.
*   **Checkboxes & Radios:** These should feel like "active nodes." When checked, they should use `primary` and emit a small glow.

### Custom Components: The "Pulse Track"
*   For the hackathon schedule or timeline, use a vertical line made of `outline_variant` at 10% opacity, with "nodes" that glow in `primary` when an event is currently happening.

---

## 6. Do's and Don'ts

### Do
*   **Do** use generous spacing. A premium feel is defined by what you *don't* fill. Use 64px+ margins between major sections.
*   **Do** use intentional asymmetry. Place a `display-lg` headline on the left and a small `body-sm` description tucked into the bottom-right of the next grid column.
*   **Do** ensure high contrast. Your `on_background` text must always remain legible against the `surface` tiers.

### Don't
*   **Don't** use pure white (#FFFFFF). Always use `on_surface` (`#f9f5fd`) to maintain the tech-toned atmosphere.
*   **Don't** use standard "Drop Shadows." They feel dated. Use tonal layering or ambient glows instead.
*   **Don't** use 1px solid dividers. If you need to separate content, use a 48px gap or a subtle change in the `surface_container` tier.
*   **Don't** over-round corners. Stick to the `md` (0.375rem) or `lg` (0.5rem) scale to keep the tech-inspired, architectural edge.