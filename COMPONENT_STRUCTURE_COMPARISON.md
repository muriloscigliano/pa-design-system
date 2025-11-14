# Component Structure Comparison: External Library vs Current Library

## Overview

This document compares the external library (`pacore-payadvantage_ui_components`) structure with the current library (`pa-ui-library`) to identify patterns and ensure compatibility.

## Key Differences

### 1. Vue Version
- **External Library**: Vue 2.7 (`vue: ^2.7.16`)
- **Current Library**: Vue 3 (`vue: ^3.5.13`)

### 2. Component API Pattern
- **External Library**: Options API (`defineComponent`)
- **Current Library**: Composition API (`<script setup>`)

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
- Bootstrap classes (`btn`, `form-control`, `custom-select`)
- Separate SCSS files imported via Rollup
- Bootstrap variables and mixins
- No design token system

#### Current Library
- BEM naming (`pa-button`, `pa-input-wrapper`)
- Scoped styles in component files
- Design token system (`--pa-*` variables)
- 3-tier token architecture

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
- Uses `value` prop (Vue 2 pattern)
- Emits `input` event

#### Current Library
- Uses `modelValue` prop (Vue 3 pattern)
- Emits `update:modelValue` event

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

## Implementation Plan

1. ✅ Fix duplicate keys in token files (accordion.json, breadcrumbs.json)
2. Review component APIs and add missing props/features
3. Ensure components work with both systems
4. Document compatibility requirements
5. Test components in both contexts

