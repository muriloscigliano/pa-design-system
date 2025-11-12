# PA Design System

A comprehensive, token-driven Vue 3 component library built with TypeScript and SCSS. This design system provides a complete set of reusable UI components following a 3-tier token architecture for maximum flexibility and theme adaptability.

## Features

- **42+ Components**: Complete set of form inputs, navigation, feedback, layout, and data display components
- **Token-Driven Architecture**: 3-tier token system (Base/Core, Semantic, Component) for consistent styling
- **Theme Support**: Built-in light and dark theme support
- **TypeScript**: Full TypeScript support with proper type definitions
- **SCSS Support**: SCSS utilities and mixins for easier token consumption
- **Vue 3 Composition API**: Modern Vue 3 with `<script setup>` syntax
- **Accessible**: Components built with accessibility in mind
- **Customizable**: All styling through design tokens, no hardcoded values

## Installation

```bash
npm install
```

## Development

```bash
# Install dependencies
npm install

# Build tokens (runs automatically before dev)
npm run build:tokens

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
pa-design-system/
├── src/
│   ├── components/          # All Vue components
│   │   ├── PaButton/
│   │   ├── PaInput/
│   │   └── ...
│   ├── tokens/             # Design token system
│   │   ├── tier1-core/     # Base/Core tokens (primitives)
│   │   ├── tier2-semantic/ # Semantic tokens (theme-aware)
│   │   ├── tier3-component/# Component-specific tokens
│   │   ├── build.js        # Style Dictionary build script
│   │   └── index.css       # Generated CSS variables
│   ├── styles/             # SCSS utilities and mixins
│   ├── utils/              # Utility functions (theme, etc.)
│   ├── App.vue             # Component showcase
│   └── main.ts             # Application entry point
├── package.json
└── README.md
```

## Token System

The design system uses a 3-tier token architecture:

### Tier 1 - Base/Core Tokens
Primitive design values (colors, spacing, typography, radii, shadows, etc.)
- Never change across themes
- Examples: `--pa-gray-500`, `--pa-spacing-16`, `--pa-font-size-200`

### Tier 2 - Semantic Tokens
Map base tokens to UI roles (theme-aware)
- Enable theming (light/dark)
- Examples: `--pa-color-action-primary-background-default`, `--pa-color-surface-container-background`

### Tier 3 - Component Tokens
Component-specific tokens that reference semantic tokens
- Examples: `--pa-button-primary-background-default`, `--pa-input-border-default`

All tokens are prefixed with `--pa-` for namespace isolation.

## Usage

### Import Components

```typescript
import { PaButton, PaInput, PaCard } from './components'
```

### Basic Component Usage

```vue
<template>
  <PaButton variant="primary" size="md" @click="handleClick">
    Click Me
  </PaButton>
  
  <PaInput 
    v-model="inputValue" 
    placeholder="Enter text..."
    :error="hasError"
  />
  
  <PaCard variant="outlined">
    <h3>Card Title</h3>
    <p>Card content</p>
  </PaCard>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { PaButton, PaInput, PaCard } from './components'

const inputValue = ref('')
const hasError = ref(false)

const handleClick = () => {
  console.log('Button clicked')
}
</script>
```

### Theming

The design system supports light and dark themes:

```typescript
import { setTheme, getTheme } from './utils/theme'

// Set theme
setTheme('dark') // or 'light'

// Get current theme
const currentTheme = getTheme()
```

The theme is applied via the `data-theme` attribute on the document element.

## Available Components

### Form Components
- **PaButton** - Button with variants (primary, secondary, tertiary, payment-navigation, action)
- **PaInput** - Text input with sizes, states, and icon support
- **PaTextarea** - Multi-line text input with auto-resize and character count
- **PaSelect** - Select dropdown with single/multi-select, search, option groups
- **PaAutocomplete** - Searchable input with suggestions
- **PaCheckbox** - Checkbox input with sizes and states
- **PaRadio** - Radio button input
- **PaRadioButtonGroup** - Group of radio buttons
- **PaToggleSwitch** - Toggle switch component
- **PaTimePicker** - Time selection (12h/24h format)
- **PaFileUploader** - File upload component
- **PaForm** - Form wrapper component

### Navigation Components
- **PaTabs** - Tab navigation with icons, badges, and lazy loading
- **PaTab** - Individual tab pane
- **PaBreadcrumbs** - Navigation breadcrumbs
- **PaStepper** - Multi-step form indicator
- **PaDropdown** - Dropdown menu
- **PaDropdownItem** - Dropdown menu item
- **PaKebabMenu** - Kebab menu component

### Feedback Components
- **PaModal** - Modal dialog
- **PaDrawer** - Slide-out panel (left/right/top/bottom)
- **PaTooltip** - Tooltip component
- **PaBadge** - Badge component with variants
- **PaInlineMessage** - Inline message with variants
- **PaLoading** - Loading indicator
- **PaProgress** - Progress bar (linear/circular)
- **PaEmptyState** - Empty state display

### Layout Components
- **PaCard** - Card component with variants
- **PaContainer** - General-purpose container
- **PaFormContainer** - Form-specific container
- **PaSectionContainer** - Section container with header
- **PaHeader** - Header component
- **PaPageLayout** - Page layout wrapper
- **PaListItem** - List item component
- **PaContentSeparator** - Content separator

### Data Display Components
- **PaTable** - Table component
- **PaAccordion** - Accordion component
- **PaPagination** - Pagination component

### Selection Controls
- **PaSegmentedControl** - Segmented control
- **PaToggleSegmentation** - Toggle segmentation
- **PaToggleChip** - Toggle chip component

### Input/Control Components
- **PaSlider** - Single value slider
- **PaRangeSlider** - Range slider

## Component Props Examples

### PaButton
```vue
<PaButton 
  variant="primary"      // primary | secondary | tertiary | payment-navigation | action
  size="md"              // sm | md | lg
  :disabled="false"
  @click="handleClick"
>
  Button Text
</PaButton>
```

### PaInput
```vue
<PaInput
  v-model="value"
  size="md"              // sm | md | lg
  placeholder="Enter text..."
  :error="false"
  :disabled="false"
  icon-left="🔍"
  icon-right="✓"
/>
```

### PaSelect
```vue
<PaSelect
  v-model="selectedValue"
  :options="options"
  placeholder="Select..."
  :multiple="false"
  :searchable="true"
  :clearable="true"
  :loading="false"
/>
```

### PaTabs
```vue
<PaTabs 
  v-model="activeTab" 
  :tabs="tabs"
  type="line"            // line | card
  position="top"         // top | bottom | left | right
>
  <PaTab label="Tab 1" value="tab1">Content 1</PaTab>
  <PaTab label="Tab 2" value="tab2">Content 2</PaTab>
</PaTabs>
```

## Building Tokens

Tokens are built using Style Dictionary. The build script:
1. Compiles Tier 1 tokens (base values)
2. Compiles Tier 2/3 tokens (semantic + component, with references)
3. Combines them into a single `index.css` file
4. Filters out duplicate Tier 1 tokens from Tier 2/3 output

```bash
npm run build:tokens
```

This runs automatically before `npm run dev` via the `predev` script.

## SCSS Utilities

The design system includes SCSS utilities for easier token consumption:

```scss
@import './styles/tokens';

// Use token function
.my-component {
  color: pa-token('color-action-primary-text-default');
  padding: pa-spacing('16');
  font-size: pa-font-size('200');
}

// Use button mixin
.my-button {
  @include pa-button-variant('primary');
  @include pa-button-size('md');
}
```

## Contributing

When adding new components:

1. Create component directory: `src/components/PaComponentName/`
2. Create component file: `PaComponentName.vue`
3. Create index file: `index.ts`
4. Add Tier 3 tokens: `src/tokens/tier3-component/component-name.json`
5. Export from `src/components/index.ts`
6. Update `App.vue` showcase
7. Rebuild tokens: `npm run build:tokens`

## Token Naming Convention

All tokens follow this pattern:
- Prefix: `--pa-`
- Format: `--pa-{category}-{property}-{variant}-{state}`
- Examples:
  - `--pa-button-primary-background-default`
  - `--pa-input-border-error`
  - `--pa-color-action-primary-text-default`

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Vue 3 compatible browsers

## License

[Add your license here]

## Links

- [GitHub Repository](https://github.com/muriloscigliano/pa-design-system)
- [Storybook Documentation](https://storybook.payadvantage.com.au)

