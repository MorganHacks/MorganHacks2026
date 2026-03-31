# Design System Specification: The Kinetic Architecture

## 1. Overview & Creative North Star
**Creative North Star: "The Neon Cartographer"**
This design system moves beyond the "glitchy" tropes of cyberpunk to embrace a high-end, architectural interpretation of the future. It treats the screen not as a flat canvas, but as a digital cityscape viewed through a high-tech HUD. By utilizing aggressive technical typography, hard edges (0px border radius), and multi-layered glassmorphism, we create an experience that feels like a precision instrument for builders.

The layout breaks the "bootstrap" mold by embracing **Intentional Asymmetry**. Navigation elements may be vertically oriented or offset, and "Building" cards should use the Spacing Scale to create staggered, rhythmic densities rather than a predictable grid.

---

## 2. Colors & Surface Logic

### The "No-Line" Rule
Traditional 1px solid borders are strictly prohibited for sectioning. Structural definition must be achieved through:
1.  **Background Shifts:** Transitioning from `surface` (#070e1b) to `surface_container_low` (#0c1322).
2.  **Luminous Terminals:** Using the `primary` (#8ff5ff) or `secondary` (#d575ff) tokens as 2px "header accents" at the top of a section rather than a full box.

### Surface Hierarchy & Nesting
We use a "Z-stack" logic to simulate depth within the terminal:
*   **Base Layer:** `surface` (#070e1b) – The deep space foundation.
*   **Section Layer:** `surface_container` (#11192a) – Large content blocks.
*   **Interactive Layer:** `surface_container_high` (#172031) – Hover states and active cards.
*   **Floating Layer:** `surface_bright` (#222c41) – Modals and tooltips, always paired with a `backdrop-blur` of 12px-20px.

### The "Glass & Gradient" Rule
To achieve the "Holographic Overlay" feel, use semi-transparent fills. A primary CTA should not be a flat block; it should be a linear gradient from `primary` (#8ff5ff) to `primary_container` (#00eefc) at a 45-degree angle, giving it a self-illuminated "glow" from within.

---

## 3. Typography
The system utilizes a high-contrast pairing between technical precision and human-centric readability.

*   **Display & Headlines (`Space Grotesk`):** These are your "HUD Elements." Use `display-lg` (3.5rem) for hero sections. The tight tracking and geometric construction evoke a sense of advanced engineering.
*   **Body (`Manrope`):** For technical documentation and track details, `body-md` (0.875rem) provides the necessary legibility against dark backgrounds. 
*   **Labels (`Space Grotesk`):** Use `label-sm` (0.6875rem) in all-caps with 0.1rem letter spacing for "Data Readouts" or metadata, emphasizing the technical nature of the system.

---

## 4. Elevation & Depth

### The Layering Principle
Depth is achieved through "Tonal Stacking." Place a `surface_container_lowest` (#000000) card inside a `surface_container_low` (#0c1322) wrapper. This creates a "sunken" terminal effect that feels integrated into the UI.

### Ambient Shadows
Shadows are rarely used. When necessary for "Floating" modals, use a 32px blur with 10% opacity, tinted with `primary` (#8ff5ff). This simulates a neon light cast rather than a physical shadow.

### The "Ghost Border" Fallback
If visual separation is required in high-density areas, use a **Ghost Border**: 1px width of `outline_variant` (#414857) at 20% opacity. This provides a "wireframe" aesthetic without cluttering the visual field.

---

## 5. Components

### Interactive 'Building' Cards
*   **Structure:** No rounded corners (`DEFAULT: 0px`). 
*   **Styling:** Use `surface_container_low` with a 2px top-border of `tertiary` (#ff6b98) for "Hardware" tracks or `secondary` (#d575ff) for "Software" tracks.
*   **Interaction:** On hover, shift background to `surface_container_highest` and apply a subtle `primary` outer glow (4px blur).

### Futuristic Navigation Bar
*   **Layout:** Fixed to top or left. Use `surface_dim` with a 15% opacity and a heavy `backdrop-blur` (30px).
*   **Details:** Add a 1px "scanning line" at the bottom of the nav bar using `primary_dim` at 30% opacity.

### Buttons (Tactile HUD Style)
*   **Primary:** Background: `primary`; Text: `on_primary`. Shape: Clipped corners (via CSS `clip-path`) rather than rounded.
*   **Secondary:** Ghost style. `outline` border, text `primary`. On hover, fill with `primary_container` at 10% opacity.

### Input Fields
*   **Visuals:** Bottom-border only (2px) using `outline`. 
*   **States:** On focus, the border transitions to `primary` and a small `label-sm` "SYSTEM_READY" appears in the bottom right corner of the input.

---

## 6. Do's and Don'ts

### Do
*   **DO** use the Spacing Scale's larger values (`20`, `24`) to create "dead space" that mimics a vast digital void.
*   **DO** use `tertiary` (#ff6b98) sparingly as a "Warning" or "High-Energy" accent.
*   **DO** align text to a rigid baseline to maintain the "Technical Ledger" feel.

### Don't
*   **DON'T** use border-radius. Every element must be sharp-edged (0px) to maintain the architectural theme.
*   **DON'T** use 100% white. Use `on_surface` (#e2e8fb) for body text to reduce eye strain on deep backgrounds.
*   **DON'T** use standard drop shadows. If it doesn't look like it's emitting light or part of a glass pane, it doesn't belong in this system.