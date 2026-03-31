# Design System Strategy: The Digital Cartographer

## 1. Overview & Creative North Star
The Creative North Star for this design system is **"The Digital Cartographer."** 

Unlike standard "tech" dashboards that feel cluttered or "neon-heavy," this system treats the UI as a high-fidelity topographical map of data. It is expansive, quiet, and deeply intentional. We are moving away from the "hacker" trope of flickering lights and moving toward the "Architect" aesthetic—where precision, vastness, and structural integrity define the user experience.

To break the "template" look, we utilize **intentional asymmetry**. Hero sections should not be perfectly centered; instead, they should bleed into a sophisticated digital city grid that feels like it extends infinitely beyond the viewport. Overlapping elements—such as a glassmorphic card partially obscuring a map node—create a sense of physical space and depth that flat grids cannot achieve.

---

## 2. Colors & Surface Philosophy
The palette is a study in monochromatic depth, using `background` (#10141a) as our "void" and layering cyan/azure accents for functional data visualization.

### The "No-Line" Rule
Traditional 1px solid borders are strictly prohibited for sectioning. Boundaries must be defined through background color shifts. To separate a main content area from a sidebar, place a `surface-container-low` (#181c22) section against the primary `background` (#10141a). The eye should perceive change through tonal transition, not structural lines.

### Surface Hierarchy & Nesting
Think of the UI as layers of frosted obsidian. 
*   **Base:** `surface` (#10141a)
*   **Secondary Content:** `surface-container-low` (#181c22)
*   **Interactive Cards:** `surface-container` (#1c2026)
*   **Elevated Modals:** `surface-container-highest` (#31353c)

### The "Glass & Gradient" Rule
To elevate the "high-tech" vibe, use Glassmorphism for floating overlays. Apply a 12px to 20px `backdrop-blur` with a 40% opacity fill of `surface-container`. 
*   **Signature Texture:** Use a subtle linear gradient for primary CTAs: `primary` (#3cd7ff) to `primary-container` (#009ebe) at a 135-degree angle. This provides a "machined" satin finish rather than a flat, "toy-like" plastic blue.

---

## 3. Typography
We utilize **Inter** for its mathematical precision and neutral character, allowing the "city grid" layout to remain the focal point.

*   **Display Scale (`display-lg` to `display-sm`):** These are your "Architectural Markers." Use `display-lg` (3.5rem) with `-0.02em` letter-spacing for high-impact hackathon titles.
*   **Headline & Title:** Used for data groupings. `headline-sm` (1.5rem) should always be paired with a `primary` (#3cd7ff) color to denote a "live" section.
*   **Body & Labels:** `body-md` (0.875rem) is the workhorse. For technical metadata, use `label-sm` (0.6875rem) in `on-surface-variant` (#c1c6d7) to mimic the look of blueprint annotations.

**Editorial Tip:** Use "All-Caps" for `label-md` with `0.1em` letter-spacing when labeling map coordinates or status indicators to reinforce the professional cartography aesthetic.

---

## 4. Elevation & Depth
Depth is achieved through **Tonal Layering** and "Atmospheric Perspective" rather than heavy drop shadows.

*   **The Layering Principle:** Place a `surface-container-lowest` card on a `surface-container-low` section. This "negative elevation" creates a recessed, professional look reminiscent of a high-end control panel.
*   **Ambient Shadows:** For floating elements, use a `20px` to `40px` blur radius with only 6% opacity using the `on-primary-fixed` (#001f27) color. This mimics the way light interacts with deep blue glass.
*   **The "Ghost Border" Fallback:** When a border is essential for accessibility, use `outline-variant` (#414754) at **15% opacity**. It should be felt, not seen.
*   **The City Grid Integration:** The digital city grid (the focal point) should sit at the `surface-container-lowest` level, slightly visible beneath the `surface` layer to provide a sense of expansive scale.

---

## 5. Components

### Buttons
*   **Primary:** Gradient fill (`primary` to `primary-container`), `md` (0.375rem) roundedness. No border. Text in `on-primary` (#003642).
*   **Secondary:** Ghost style. `Ghost Border` (15% opacity `outline-variant`) with `secondary` (#a8c9f3) text.
*   **Tertiary:** Text only in `primary`. Use for low-emphasis actions like "Cancel" or "Back."

### Cards & Lists
*   **The No-Divider Rule:** Forbid 1px dividers between list items. Use `spacing-4` (1rem) of vertical whitespace or a subtle background shift to `surface-container-low` on hover to define the item boundary.
*   **Interactive Cards:** Use `surface-container` (#1c2026). On hover, transition the background to `surface-container-high` (#262a31) and apply a subtle `primary` glow to the top-left corner only.

### Input Fields
*   **Style:** `surface-container-lowest` fill. No bottom line.
*   **Focus State:** A 1px "Ghost Border" at 40% opacity using `primary` (#3cd7ff).
*   **Label:** Always floating above the input in `label-sm` using `on-surface-variant`.

### Data Clusters (Custom Component)
For the hackathon vibe, create "Data Clusters"—small groupings of `label-sm` text paired with `px` (1px) azure lines that point toward nodes on the digital map. This anchors the UI elements to the background city grid.

---

## 6. Do's and Don'ts

### Do
*   **Do** use asymmetrical margins (e.g., `spacing-20` on the left, `spacing-12` on the right) for hero layouts to create a bespoke, editorial feel.
*   **Do** lean into the "Deep Tech" blue. If a layout feels too dark, increase the opacity of your `primary` accents rather than introducing white.
*   **Do** use `backdrop-blur` on any element that overlaps the digital city grid.

### Don't
*   **Don't** use "Neon" or "Glow" effects that look like 80s synthwave. The glow must be subtle, professional, and mathematically derived (Ambient Shadows).
*   **Don't** use sharp 90-degree corners. Stick to the `md` (0.375rem) scale to keep the tech feeling "clean" but approachable.
*   **Don't** use standard "Grey" for anything. All neutrals must be tinted with midnight blue (e.g., using `surface-variant` or `outline`).