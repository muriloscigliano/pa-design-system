# Component Structure Comparison: External Library vs Current Library

## Overview

This document compares the external library (`pacore-payadvantage_ui_components`) structure with the current library (`pa-ui-library`) to identify patterns and ensure compatibility.

## Key Differences

### 1. Vue Version
- **External Library**: Vue 3.5+ (peer dependency)
- **Current Library**: Vue 3 (`vue: ^3.5.13`)
- ✅ **Same Vue version** - Good compatibility

### 2. Component API Pattern
- **External Library**: Options API (`defineComponent`) - Acknowledged as Vue 3 anti-pattern but kept for compatibility
- **Current Library**: Composition API (`<script setup>`) - Modern Vue 3 pattern
- **Note**: External library may migrate to Composition API later

### 3. File Organization

#### External Library
```
src/components/
  ├── PaButton.vue          # Flat files for simple components
  ├── PaButton.scss        # Separate SCSS files
  ├── PaButton.d.ts        # TypeScript definitions
  ├── PaButton.stories.ts  # Storybook stories
  ├── PaButton.test.ts     # Tests
  └── pa-dropdown/         # Subdirectories for complex components
      └── PaDropdown.vue
```

#### Current Library
```
src/components/
  └── PaButton/
      ├── PaButton.vue     # Component with scoped styles
      └── index.ts         # Export file
```

### 4. Styling Approach

#### External Library
- **Bootstrap 5.3+** as base framework (peer dependency)
- Bootstrap classes (`btn`, `form-control`, `custom-select`)
- Separate SCSS files compiled via Rollup pipeline
- Bootstrap variables and mixins
- Custom SCSS overrides in `src/assets/bootstrap/overrides/`
- BEM-like naming (`pa-action-btn`, `pa-action-btn--is-loading`)
- CSS variables for theming (via ThemeManager)
- **No design token system** - Uses Bootstrap variables directly

#### Current Library
- **No Bootstrap dependency** - Custom design system
- BEM naming (`pa-button`, `pa-input-wrapper`)
- Scoped styles in component files
- **Design token system** (`--pa-*` variables)
- **3-tier token architecture** (Tier 1: Core, Tier 2: Semantic, Tier 3: Component)
- Style Dictionary for token compilation

### 5. Props Pattern

#### External Library
```typescript
props: {
  variant: {
    type: String,
    default: 'primary'
  },
  disabled: {
    type: Boolean,
    default: false
  }
}
```

#### Current Library
```typescript
defineProps<{
  variant?: 'primary' | 'secondary' | 'tertiary'
  disabled?: boolean
}>()
```

### 6. v-model Pattern

#### External Library
- Uses `value` prop (legacy Vue 2 pattern, but in Vue 3)
- Emits `input` event
- **Note**: This is a legacy pattern kept for backward compatibility

#### Current Library
- Uses `modelValue` prop (Vue 3 standard pattern)
- Emits `update:modelValue` event
- ✅ **Now supports both** - Added compatibility layer

### 7. Export Pattern

#### External Library
```typescript
// src/index.ts
import PaButton from './components/PaButton.vue'
export { PaButton }
```

#### Current Library
```typescript
// src/components/index.ts
export { PaButton } from './PaButton'
// where PaButton/index.ts exports default
```

## Component API Comparison

### PaButton

#### External Library Props
- `variant`: 'primary' | 'secondary' | etc.
- `size`: 'sm' | 'md' | 'lg'
- `disabled`: boolean
- `block`: boolean (full width)
- `isLoading`: boolean
- `icon`: string
- `iconRight`: boolean
- `shape`: 'square' | 'circle'
- `type`: 'button' | 'submit' | 'reset'
- `preventDefault`: boolean
- `sfSelector`: string (Salesforce selector)

#### Current Library Props
- `variant`: 'primary' | 'secondary' | 'tertiary' | 'link' | 'action'
- `size`: 'sm' | 'md' | 'lg'
- `disabled`: boolean
- `loading`: boolean
- `iconPosition`: 'left' | 'center' | 'right'

### PaInput

#### External Library Props
- `value`: string (v-model)
- `size`: 'sm' | 'md' | 'lg'
- `disabled`: boolean
- `name`: string
- `placeholder`: string
- `type`: string
- `required`: boolean
- `min`: number
- `max`: number
- `maxlength`: number
- `pattern`: string
- `readonly`: boolean
- `sfSelector`: string
- Uses Validation mixin for validation

#### Current Library Props
- `modelValue`: string | number (v-model)
- `disabled`: boolean
- `error`: boolean
- `valid`: boolean
- `placeholder`: string
- `type`: string
- `label`: string
- `optional`: boolean
- `helperText`: string
- `errorMessage`: string
- `validMessage`: string
- `iconLeft`: string
- `iconRight`: string
- `showClear`: boolean
- `rightElement`: 'text' | 'icon' | 'dropdown' | 'checkbox' | 'toggle'

## Compatibility Strategy

### 1. Maintain Current Structure
- Keep `PaComponentName/PaComponentName.vue` + `index.ts` pattern
- Keep token system and BEM naming
- Keep Composition API

### 2. Add Compatibility Features
- Support both `value` and `modelValue` props where needed
- Add `sfSelector` prop support if required
- Ensure component APIs match external library where possible

### 3. Component Features to Adopt
- `block` prop for full-width buttons
- `shape` prop for button shapes (square/circle)
- `preventDefault` prop for button click handling
- Better validation integration patterns
- Loading state improvements

### 4. File Structure (Keep Current)
- Components in `PaComponentName/` directories
- Single `.vue` file with scoped styles
- `index.ts` for exports
- Token files in `tier3-component/`

## Additional Architecture Features

### Theme System (External Library)
- **ThemeManager** class for dynamic theme management
- Supports multiple themes (light/dark)
- Runtime theme switching
- Scoped themes (CSS selector-based)
- CSS variable overrides
- Bootstrap 5 integration with custom variable generation
- Handles iframe scenarios (polling fallback)

**Current Library**: Uses `data-theme` attribute with CSS variables, simpler but effective

### Validation System (External Library)
- **Mixin-based validation** (`src/mixins/Validation.ts`)
- Vue 3 Options API compatible
- Features:
  - Sync and async validation rules
  - HTML5 validation integration
  - Custom validation rules (required, min/max, regex, etc.)
  - Implicit rules from component props
  - Validity state management (valid, isValidating, dirty)
- Components implement `getValueForValidation()` to provide values

**Current Library**: Uses props-based validation (`error`, `valid`, `errorMessage`, `validMessage`)

### Plugin System (External Library)
- **createUiLib()** plugin registers:
  - Icons - FontAwesome + custom SVG icons
  - Validators - Global validation plugin
  - Notifications - Toast notification system
  - Confirm Dialogs - Modal confirmation dialogs

**Current Library**: No plugin system currently

### Build System (External Library)
- **Vite** - Main bundler (ES module output)
- **Rollup** - Separate Sass compilation pipeline
- **TypeScript** - Full type safety with `.d.ts` generation
- Build outputs:
  - `dist/main.js` - Main library bundle
  - `dist/theme-payadvantage.js` - Compiled theme CSS
  - Type definitions in `dist/src/`

**Current Library**: Uses Vite for both JS and CSS, Style Dictionary for tokens

### Notable Patterns (External Library)
- **Options API**: Components use Options API (not Composition API)
- **Mixin Usage**: Validation via mixins (acknowledged as Vue 3 anti-pattern but kept for compatibility)
- **Attribute Filtering**: `filterAttributes` utility for clean attribute passing
- **SF Selector**: Custom `sf-selector` attribute for testing/automation
- **Fake Input Group**: Polyfill for Bootstrap input groups

## Implementation Plan

1. ✅ Fix duplicate keys in token files (accordion.json, breadcrumbs.json)
2. ✅ Review component APIs and add missing props/features
3. ✅ Add compatibility features to PaButton and PaInput
4. ✅ Ensure components work with both systems (dual v-model support)
5. ✅ Document compatibility requirements
6. ⏳ Consider validation system improvements (optional)
7. ⏳ Consider plugin system for icons/notifications (optional)
8. ⏳ Test components in both contexts

