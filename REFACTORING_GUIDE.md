# App.vue Refactoring Guide

## New Project Structure

The App.vue file has been refactored into a modular structure for better organization and maintainability.

### Directory Structure

```
src/
├── config/                    # Configuration files
│   ├── navigation.ts          # Navigation structure
│   ├── componentDescriptions.ts # Component descriptions
│   ├── componentExamples.ts   # Component examples
│   └── componentProps.ts      # Default component props
│
├── composables/               # Reusable composition functions
│   ├── useComponentSelection.ts # Component selection logic
│   ├── useCodeCopy.ts         # Code copying functionality
│   └── useComponentRegistry.ts # Component registry mapping
│
├── components/                # Vue components
│   ├── CodeBlock/            # Reusable code block component
│   ├── AppSidebar/           # Sidebar navigation component
│   ├── AppHeader/            # Header with search and theme toggle
│   └── ...                    # Other PA components
│
└── views/                     # Page/view components (to be created)
    ├── Introduction.vue
    ├── Installation.vue
    ├── Theming.vue
    └── ComponentDocs.vue
```

## Benefits

1. **Separation of Concerns**: Data, logic, and UI are separated
2. **Reusability**: Components and composables can be reused
3. **Maintainability**: Easier to find and update specific functionality
4. **Testability**: Each module can be tested independently
5. **Scalability**: Easy to add new components or features

## Usage

### Config Files
- Import navigation: `import { navigation } from './config/navigation'`
- Import descriptions: `import { getComponentDescription } from './config/componentDescriptions'`
- Import examples: `import { getComponentExamples } from './config/componentExamples'`
- Import props: `import { getComponentProps } from './config/componentProps'`

### Composables
- Use component selection: `const { activeComponent, selectComponent } = useComponentSelection()`
- Use code copy: `const { copyToClipboard, toggleShowCode } = useCodeCopy()`
- Use component registry: `const { getComponent } = useComponentRegistry()`

### Components
- Use CodeBlock: `<CodeBlock :code="code" :copy-key="key" @copy="handleCopy" />`
- Use AppSidebar: `<AppSidebar :active-component="activeComponent" @select="handleSelect" />`
- Use AppHeader: `<AppHeader :current-theme="theme" @search="handleSearch" @toggle-theme="handleToggleTheme" />`

## Next Steps

1. Create view components for different sections (Introduction, Installation, etc.)
2. Extract PaButton documentation into its own component
3. Create a DocumentationSection component for reusable documentation blocks
4. Consider using Vue Router if navigation becomes more complex

