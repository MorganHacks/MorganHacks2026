# Design System Specification: The Kinetic Editorial

## 1. Overview & Creative North Star
**Creative North Star: "The Precision Architect"**

This design system rejects the "utilitarian-box" aesthetic typical of logistics software. Instead, it adopts a **High-End Editorial** approach to data. We treat transit routes like gallery captions and logistics timelines like architectural blueprints. 

By utilizing intentional asymmetry, sweeping horizontal breathing room, and a "No-Line" philosophy, we move away from "software" and toward an "experience." The goal is to make the user feel like a high-level conductor rather than a data entry clerk. We break the grid by allowing map elements to bleed into surfaces and using extreme typographic contrast to guide the eye without the need for heavy-handed containers.

---

### 2. Colors & Surface Philosophy
Our palette is anchored in authoritative depth. The reliability of `primary` (#002046) provides the "weight," while the `secondary` and `tertiary` greens provide the "signal."

#### The "No-Line" Rule
**Strict Mandate:** Designers are prohibited from using 1px solid borders to define sections or containers. 
*   **Definition through Shift:** Separate the sidebar from the main stage using a shift from `surface` (#f9f9fd) to `surface-container-low` (#f3f3f7). 
*   **The "Glass & Gradient" Rule:** Use `surface_tint` at 8% opacity with a `backdrop-blur` of 20px for floating navigation bars. For primary CTAs, apply a subtle linear gradient from `primary` (#002046) to `primary_container` (#1b365d) at a 135-degree angle to add "soul" and depth.

#### Surface Hierarchy & Nesting
Treat the UI as physical layers of vellum. 
1.  **Base:** `surface` (The floor)
2.  **Sectioning:** `surface-container-low` (The stage)
3.  **Interactive Elements:** `surface-container-lowest` (The spotlighted card)
*Example:* A route card (`surface-container-lowest`) should sit on a map overlay (`surface-container-low`), creating a natural lift without a single stroke of a pen.

---

### 3. Typography: The Editorial Voice
We use **Inter** not as a default, but as a precision instrument. The hierarchy is designed to create an immediate "information scent."

*   **Display & Headline:** Use `display-md` for high-level logistics KPIs. These should feel like headlines in a premium financial journal—massive, confident, and spaced with `0.5` (0.1rem) letter spacing to feel "tight."
*   **The Title/Body Duo:** Pair `title-lg` for route destinations with `body-sm` for secondary metadata (e.g., ETA, VIN numbers). 
*   **The Label System:** `label-md` and `label-sm` must always be in All Caps with a 5% letter-spacing increase when used in `on_surface_variant` (#44474e) to denote technical specifications or status headers.

---

### 4. Elevation & Depth: Tonal Layering
Traditional drop shadows are too "web 2.0." We use **Ambient Shadows** and **Tonal Lifts**.

*   **The Layering Principle:** To "lift" a route card, don't reach for an effect; reach for the color palette. A `surface-container-highest` (#e2e2e6) element placed on a `surface` background provides all the hierarchy needed.
*   **Shadow Construction:** If a floating action button or map modal requires a shadow, use: `y: 8px, blur: 24px, color: rgba(0, 32, 70, 0.06)`. This tints the shadow with our `primary` navy, making it feel like part of the environment.
*   **The "Ghost Border" Fallback:** If accessibility requires a container boundary, use `outline_variant` (#c4c6cf) at **15% opacity**. It should be felt, not seen.

---

### 5. Components & Signature Patterns

#### Route Cards
*   **Structure:** No dividers. Use `Spacing 4` (0.9rem) between the Origin and Destination.
*   **Visual Soul:** Use a vertical "Track" icon using `primary_fixed` (#d6e3ff) with a `0.25rem` (DEFAULT) roundedness to connect the dots.
*   **Surface:** Use `surface-container-lowest` (#ffffff).

#### Timelines & Map Navigation
*   **The "Vanish" List:** Timelines should not have a solid vertical line. Use a dashed line with `outline_variant` at 40% opacity. 
*   **Status Badges:** Use `secondary_container` (#8df5e4) with `on_secondary_container` (#007165) text for "Active" states. These must use the `full` (9999px) roundedness scale to contrast against the architectural `lg` (0.5rem) corners of the cards.

#### Buttons & Inputs
*   **Primary Button:** `primary` (#002046) fill, `on_primary` text. Use `xl` (0.75rem) corner radius for a modern, approachable feel.
*   **Input Fields:** Avoid boxes. Use a `surface-container-high` (#e7e8eb) background with a bottom-only "focus" bar of `primary` (#002046) at 2px thickness.

#### Map-Style Navigation Overlays
*   Use Glassmorphism. A container with `surface` at 70% opacity and `backdrop-filter: blur(12px)`. This allows the map's colors to bleed through, maintaining the user's "sense of place."

---

### 6. Do’s and Don’ts

**Do:**
*   **Do** use `Spacing 12` (2.75rem) and `Spacing 16` (3.5rem) to separate major functional areas. Logistics apps are often cluttered; we fight this with "aggressive" white space.
*   **Do** use `tertiary` (#002805) for "Success/Delivered" states to provide a distinct visual "check" against the `secondary` teal "In-Progress" states.
*   **Do** use `title-sm` for interactive labels to ensure they are distinct from static `body-md` descriptions.

**Don’t:**
*   **Don’t** use 1px dividers. Use a `0.3rem` gap or a subtle shift to `surface-container-low`.
*   **Don’t** use pure black (#000000) for text. Always use `on_surface` (#191c1e) to maintain the premium navy-tinted look.
*   **Don’t** use the `none` or `sm` roundedness for cards. The minimum for a container should be `lg` (0.5rem) to maintain the "Precision Architect" softness.