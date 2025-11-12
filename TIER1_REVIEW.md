# Tier 1 Core Tokens Review

## Currently in Tier 1

### ✅ Colors
- Gray (50-900, white, black)
- Blue (100-700)
- Green (100-600)
- Yellow (100-600)
- Red (100-600)
- Brand colors (in separate files)

### ✅ Spacing
- 0, 4, 8, 10, 12, 16, 18, 24, 32, 36, 48, 56, 64px

### ✅ Typography
- Font family (Roboto)
- Font size (50-900: 10px-48px)
- Font weight (100-900)
- Line height (1.2, 1.5, 1.75)
- Letter spacing (-0.5px, 0px, 0.5px)
- Text transform, decoration, style, align

### ✅ Icons
- Size (100-500: 16px-56px)

### ✅ Borders
- Radius (50-300, none, full)
- Width (0, 50, 75, 100, 300, 100_2)
- Style (solid, dotted, dashed)

### ✅ Effects
- Opacity (0, 25, 50, 60, 75, 100)
- Shadow (sm, md, lg with x/y/blur/spread/color)
- Z-index (0, 100, 200, 300, 400, 500, top, bottom)

### ✅ Interactions
- Transition duration (fast, default, slow)
- Transition easing (default, ease-in, ease-out, ease-in-out, linear)
- Outline width (default, thin, thick)
- Outline offset (default, small, large)
- Cursor (pointer, not-allowed, default, text, grab, grabbing, move, wait)

### ✅ Layout
- Drawer sizes (sm, md, lg)
- Modal sizes (sm, md, lg)
- Container sizes (sm, md, lg, xl, full)

## Potential Missing Tokens

### 1. **Additional Spacing Values** ⚠️
Found hardcoded values that might need tokens:
- `2px` - Used in stepper line (could use spacing.2 or Border.width.50)
- `20px` - Used in select icons (could use icon.size.200 = 24px or add spacing.20)
- `12px` - Already exists as spacing.12 ✅

**Recommendation**: Add `spacing.2` (2px) if needed, or use existing Border.width.50

### 2. **Breakpoints** ❓
For responsive design, common breakpoints:
- Mobile: 320px, 375px, 425px
- Tablet: 768px, 1024px
- Desktop: 1280px, 1440px, 1920px

**Recommendation**: Add if you need responsive design tokens. Otherwise, handle in CSS/media queries.

### 3. **Aspect Ratios** ❓
Common aspect ratios:
- Square: 1:1
- Video: 16:9, 4:3
- Portrait: 3:4, 9:16

**Recommendation**: Add if you have image/avatar components that need aspect ratios.

### 4. **Blur/Backdrop Filter** ❓
For glassmorphism effects:
- blur: 4px, 8px, 12px, 16px

**Recommendation**: Add if you plan to use backdrop-filter effects.

### 5. **Animation Duration** ❓
Separate from transition (though transition covers most needs):
- Similar to transition.duration

**Recommendation**: Not needed if transition.duration covers all use cases.

### 6. **Gap** ❓
For flex/grid gaps (currently using spacing tokens):
- Could be separate, but spacing works fine

**Recommendation**: Keep using spacing tokens for gap.

### 7. **Additional Border Widths** ⚠️
Found `2px` hardcoded in stepper:
- Could add `Border.width.200` = 2px
- Or use existing `Border.width.100` = 2px ✅

**Recommendation**: Use existing Border.width.100

### 8. **Additional Icon Sizes** ⚠️
Found `20px` hardcoded in select:
- Could add `icon.size.150` = 20px
- Or use existing `icon.size.200` = 24px (close enough)

**Recommendation**: Add `icon.size.150` = 20px if precision needed, or use icon.size.200

## Summary

**Critical Missing:**
- None - all essential tokens are present

**Nice to Have:**
1. `spacing.2` (2px) - if you want granular spacing
2. `icon.size.150` (20px) - if you need exact 20px icons
3. Breakpoints - if you need responsive design tokens
4. Aspect ratios - if you have image/avatar components

**Recommendation:**
Your Tier 1 tokens are comprehensive! The only additions to consider:
- `spacing.2` (2px) for very small spacing
- `icon.size.150` (20px) if you need exact 20px icons
- Breakpoints if you want centralized responsive design tokens

Most hardcoded values found can use existing tokens (e.g., `2px` → `Border.width.100`, `20px` → `icon.size.200`).

