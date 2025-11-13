<script setup lang="ts">
import { ref, nextTick, onMounted, computed } from 'vue'
import { setTheme, getTheme } from './utils/theme'
import logoSvg from './assets/pa-desing-system-logo.svg'
import {
  PaButton,
  PaInput,
  PaCheckbox,
  PaRadio,
  PaRadioButtonGroup,
  PaToggleSwitch,
  PaSelect,
  PaTextarea,
  PaAutocomplete,
  PaTimePicker,
  PaFileUploader,
  PaForm,
  PaCard,
  PaHeader,
  PaListItem,
  PaPageLayout,
  PaContentSeparator,
  PaContainer,
  PaFormContainer,
  PaSectionContainer,
  PaDropdown,
  PaSegmentedControl,
  PaToggleSegmentation,
  PaToggleChip,
  PaKebabMenu,
  PaTabs,
  PaBreadcrumbs,
  PaStepper,
  PaDrawer,
  PaModal,
  PaTooltip,
  PaBadge,
  PaInlineMessage,
  PaLoading,
  PaEmptyState,
  PaProgress,
  PaTable,
  PaAccordion,
  PaPagination,
  PaSlider,
  PaRangeSlider
} from './components'

const currentTheme = ref<'light' | 'dark'>(getTheme())
const searchQuery = ref('')
const activeComponent = ref('introduction')
const activeExampleGroup = ref<string>('')
const showCode = ref<Record<string, boolean>>({})
const activeHierarchyTab = ref('primary')
const activeMultipleCTAsTab = ref('primary-secondary')

// Reactive values for components that use v-model
const componentValues = ref<Record<string, any>>({
  painput: '',
  patextarea: '',
  patimepicker: '',
  pasegmentedcontrol: 'Option 1',
  paslider: 50,
  parangeslider: [20, 80]
})

const navigation = {
  'get-started': {
    title: 'Get Started',
    items: [
      { label: 'Introduction', id: 'introduction' },
      { label: 'Installation', id: 'installation' },
      { label: 'Theming', id: 'theming' }
    ]
  },
  'buttons': {
    title: 'Buttons',
    items: [
      { label: 'PaButton', id: 'pabutton' }
    ]
  },
  'form-inputs': {
    title: 'Form Inputs',
    items: [
      { label: 'PaInput', id: 'painput' },
      { label: 'PaCheckbox', id: 'pacheckbox' },
      { label: 'PaRadio', id: 'paradio' },
      { label: 'PaRadioButtonGroup', id: 'paradiobuttongroup' },
      { label: 'PaToggleSwitch', id: 'patoggleswitch' },
      { label: 'PaSelect', id: 'paselect' },
      { label: 'PaTextarea', id: 'patextarea' },
      { label: 'PaAutocomplete', id: 'paautocomplete' },
      { label: 'PaTimePicker', id: 'patimepicker' },
      { label: 'PaFileUploader', id: 'pafileuploader' },
      { label: 'PaForm', id: 'paform' }
    ]
  },
  'layout': {
    title: 'Layout',
    items: [
      { label: 'PaCard', id: 'pacard' },
      { label: 'PaHeader', id: 'paheader' },
      { label: 'PaListItem', id: 'palistitem' },
      { label: 'PaPageLayout', id: 'papagelayout' },
      { label: 'PaContentSeparator', id: 'pacontentseparator' },
      { label: 'PaContainer', id: 'pacontainer' },
      { label: 'PaFormContainer', id: 'paformcontainer' },
      { label: 'PaSectionContainer', id: 'pasectioncontainer' }
    ]
  },
  'navigation': {
    title: 'Navigation',
    items: [
      { label: 'PaDropdown', id: 'padropdown' },
      { label: 'PaSegmentedControl', id: 'pasegmentedcontrol' },
      { label: 'PaToggleSegmentation', id: 'patogglesegmentation' },
      { label: 'PaToggleChip', id: 'patogglechip' },
      { label: 'PaKebabMenu', id: 'pakebabmenu' },
      { label: 'PaTabs', id: 'patabs' },
      { label: 'PaBreadcrumbs', id: 'pabreadcrumbs' },
      { label: 'PaStepper', id: 'pastepper' },
      { label: 'PaDrawer', id: 'padrawer' }
    ]
  },
  'feedback': {
    title: 'Feedback',
    items: [
      { label: 'PaModal', id: 'pamodal' },
      { label: 'PaTooltip', id: 'patooltip' },
      { label: 'PaBadge', id: 'pabadge' },
      { label: 'PaInlineMessage', id: 'painlinemessage' },
      { label: 'PaLoading', id: 'paloading' },
      { label: 'PaEmptyState', id: 'paemptystate' },
      { label: 'PaProgress', id: 'paprogress' }
    ]
  },
  'data-display': {
    title: 'Data Display',
    items: [
      { label: 'PaTable', id: 'patable' },
      { label: 'PaAccordion', id: 'paaccordion' },
      { label: 'PaPagination', id: 'papagination' },
      { label: 'PaSlider', id: 'paslider' },
      { label: 'PaRangeSlider', id: 'parangeslider' }
    ]
  }
}

const handleSearch = () => {
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase().trim()
    const allComponents = Object.values(navigation).flatMap(section => section.items)
    const found = allComponents.find(item => 
      item.label.toLowerCase().includes(query)
    )
    if (found) {
      activeComponent.value = found.id
    }
  }
}

const handleSearchKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Enter') {
    handleSearch()
  }
}

const activeSection = computed(() => {
  for (const section of Object.values(navigation)) {
    if (section.items.some(item => item.id === activeComponent.value)) {
      return section.title
    }
  }
  return 'Components'
})

const activeComponentData = computed(() => {
  const allComponents = Object.values(navigation).flatMap(section => section.items)
  return allComponents.find(item => item.id === activeComponent.value)
})

const getComponent = (componentId: string) => {
  const componentMap: Record<string, any> = {
    'pabutton': PaButton,
    'painput': PaInput,
    'pacheckbox': PaCheckbox,
    'paradio': PaRadio,
    'paradiobuttongroup': PaRadioButtonGroup,
    'patoggleswitch': PaToggleSwitch,
    'paselect': PaSelect,
    'patextarea': PaTextarea,
    'paautocomplete': PaAutocomplete,
    'patimepicker': PaTimePicker,
    'pafileuploader': PaFileUploader,
    'paform': PaForm,
    'pacard': PaCard,
    'paheader': PaHeader,
    'palistitem': PaListItem,
    'papagelayout': PaPageLayout,
    'pacontentseparator': PaContentSeparator,
    'pacontainer': PaContainer,
    'paformcontainer': PaFormContainer,
    'pasectioncontainer': PaSectionContainer,
    'padropdown': PaDropdown,
    'pasegmentedcontrol': PaSegmentedControl,
    'patogglesegmentation': PaToggleSegmentation,
    'patogglechip': PaToggleChip,
    'pakebabmenu': PaKebabMenu,
    'patabs': PaTabs,
    'pabreadcrumbs': PaBreadcrumbs,
    'pastepper': PaStepper,
    'padrawer': PaDrawer,
    'pamodal': PaModal,
    'patooltip': PaTooltip,
    'pabadge': PaBadge,
    'painlinemessage': PaInlineMessage,
    'paloading': PaLoading,
    'paemptystate': PaEmptyState,
    'paprogress': PaProgress,
    'patable': PaTable,
    'paaccordion': PaAccordion,
    'papagination': PaPagination,
    'paslider': PaSlider,
    'parangeslider': PaRangeSlider
  }
  return componentMap[componentId] || null
}

const getComponentProps = (componentId: string): Record<string, any> => {
  const baseProps: Record<string, Record<string, any>> = {
    'pabutton': { variant: 'primary', size: 'md' },
    'painput': { placeholder: 'Enter text...' },
    'pacheckbox': { label: 'Checkbox label' },
    'paradio': { label: 'Radio option', name: 'radio-demo', value: 'option1' },
    'paradiobuttongroup': { options: [{ label: 'Option 1', value: '1' }, { label: 'Option 2', value: '2' }] },
    'patoggleswitch': { label: 'Toggle switch' },
    'paselect': { options: [{ label: 'Option 1', value: '1' }], placeholder: 'Select...' },
    'patextarea': { placeholder: 'Enter text...' },
    'paautocomplete': { placeholder: 'Type to search...', options: ['Option 1', 'Option 2'] },
    'pafileuploader': {},
    'paform': {},
    'pacard': {},
    'paheader': {},
    'palistitem': { title: 'List Item', description: 'Item description' },
    'papagelayout': {},
    'pacontentseparator': {},
    'pacontainer': {},
    'paformcontainer': {},
    'pasectioncontainer': { title: 'Section Title' },
    'padropdown': { trigger: 'Dropdown' },
    'pasegmentedcontrol': { options: ['Option 1', 'Option 2'] },
    'patogglesegmentation': { options: ['Option 1', 'Option 2'] },
    'patogglechip': { label: 'Chip' },
    'pakebabmenu': {},
    'patabs': { tabs: [{ label: 'Tab 1', value: '1' }, { label: 'Tab 2', value: '2' }] },
    'pabreadcrumbs': { items: [{ label: 'Home' }, { label: 'Page' }] },
    'pastepper': { steps: [{ title: 'Step 1' }, { title: 'Step 2' }], current: 0 },
    'padrawer': { visible: false },
    'pamodal': { visible: false },
    'patooltip': { content: 'Tooltip content' },
    'pabadge': { variant: 'default' },
    'painlinemessage': { variant: 'info', message: 'This is an inline message' },
    'paloading': {},
    'paemptystate': { title: 'No data', description: 'There is no data to display' },
    'paprogress': { percentage: 50 },
    'patable': { data: [], columns: [] },
    'paaccordion': { items: [{ title: 'Item 1', content: 'Content 1' }] },
    'papagination': { total: 100, pageSize: 10, current: 1 },
    'paslider': { min: 0, max: 100 },
    'parangeslider': { min: 0, max: 100 }
  }
  
  return baseProps[componentId] || {}
}

const getComponentDescription = (componentId: string): string => {
  const descriptions: Record<string, string> = {
    'pabutton': 'A versatile button component with multiple variants and sizes. Button variants follow a clear hierarchy: Primary (highest priority) → Secondary → Tertiary → Payment Navigation → Action (lowest priority). Use Primary for the main call-to-action, Secondary for secondary actions, and Tertiary for less emphasized actions.',
    'painput': 'Text input component with validation states, sizes, and icon support.',
    'pacheckbox': 'Checkbox input component with checked, unchecked, and indeterminate states.',
    'paradio': 'Radio button component for single selection in forms.',
    'paradiobuttongroup': 'Group of radio buttons for managing single selection.',
    'patoggleswitch': 'Toggle switch component for boolean inputs.',
    'paselect': 'Dropdown select component with single and multi-select support.',
    'patextarea': 'Multi-line text input component with resize options.',
    'paautocomplete': 'Input component with autocomplete suggestions.',
    'patimepicker': 'Time picker component for selecting time values.',
    'pafileuploader': 'File upload component with drag and drop support.',
    'paform': 'Form wrapper component for managing form state and validation.',
    'pacard': 'Card component for displaying content in a contained format.',
    'paheader': 'Header component for application navigation and branding.',
    'palistitem': 'List item component for displaying items in lists.',
    'papagelayout': 'Page layout component for structuring page content.',
    'pacontentseparator': 'Separator component for dividing content sections.',
    'pacontainer': 'Container component for wrapping and constraining content.',
    'paformcontainer': 'Form container component for grouping form fields.',
    'pasectioncontainer': 'Section container component with title and actions.',
    'padropdown': 'Dropdown menu component with positioning options.',
    'pasegmentedcontrol': 'Segmented control component for selecting between options.',
    'patogglesegmentation': 'Toggle segmentation component for grouped selections.',
    'patogglechip': 'Toggle chip component for tag-like selections.',
    'pakebabmenu': 'Kebab menu component for action menus.',
    'patabs': 'Tabs component for organizing content into panels.',
    'pabreadcrumbs': 'Breadcrumbs component for navigation hierarchy.',
    'pastepper': 'Stepper component for multi-step processes.',
    'padrawer': 'Drawer component for slide-out panels.',
    'pamodal': 'Modal component for dialog overlays.',
    'patooltip': 'Tooltip component for contextual information.',
    'pabadge': 'Badge component for status indicators and labels.',
    'painlinemessage': 'Inline message component for feedback and alerts.',
    'paloading': 'Loading component for indicating progress.',
    'paemptystate': 'Empty state component for when no content is available.',
    'paprogress': 'Progress component for showing completion status.',
    'patable': 'Table component for displaying tabular data.',
    'paaccordion': 'Accordion component for collapsible content sections.',
    'papagination': 'Pagination component for navigating through pages.',
    'paslider': 'Slider component for selecting numeric values.',
    'parangeslider': 'Range slider component for selecting value ranges.'
  }
  return descriptions[componentId] || 'Component documentation coming soon.'
}

const toggleTheme = () => {
  const newTheme = currentTheme.value === 'light' ? 'dark' : 'light'
  setTheme(newTheme)
  currentTheme.value = newTheme
  // Force re-render to ensure theme is applied
  nextTick(() => {
    document.documentElement.setAttribute('data-theme', newTheme)
  })
}

type ExampleConfig = {
  label: string
  code: string
  render: string
}

const getComponentExamples = (componentId: string): ExampleConfig[] => {
  const examples: Record<string, ExampleConfig[]> = {
    'pabutton': [
      {
        label: 'Hierarchy',
        code: `<!-- Button Variant Hierarchy (Highest to Lowest Priority) -->
<!-- 1. Primary - Main call-to-action, most important action -->
<PaButton variant="primary">Primary</PaButton>

<!-- 2. Secondary - Secondary action, less emphasis -->
<PaButton variant="secondary">Secondary</PaButton>

<!-- 3. Tertiary - Tertiary action, minimal emphasis -->
<PaButton variant="tertiary">Tertiary</PaButton>

<!-- 4. Payment Navigation - Specialized for payment flows -->
<PaButton variant="payment-navigation">Payment Nav</PaButton>

<!-- 5. Action - General action button -->
<PaButton variant="action">Action</PaButton>`,
        render: 'hierarchy'
      },
      {
        label: 'Sizes',
        code: `<PaButton variant="primary" size="sm">Small</PaButton>
<PaButton variant="primary" size="md">Medium</PaButton>
<PaButton variant="primary" size="lg">Large</PaButton>`,
        render: 'sizes'
      },
      {
        label: 'Variants',
        code: `<PaButton variant="primary">Primary</PaButton>
<PaButton variant="secondary">Secondary</PaButton>
<PaButton variant="tertiary">Tertiary</PaButton>
<PaButton variant="payment-navigation">Payment Nav</PaButton>
<PaButton variant="action">Action</PaButton>`,
        render: 'variants'
      },
      {
        label: 'Multiple CTAs',
        code: `<!-- Example: Primary + Secondary -->
<PaButton variant="primary">Save Changes</PaButton>
<PaButton variant="secondary">Cancel</PaButton>

<!-- Example: Primary + Tertiary -->
<PaButton variant="primary">Submit</PaButton>
<PaButton variant="tertiary">Skip</PaButton>

<!-- Example: Three actions -->
<PaButton variant="primary">Confirm</PaButton>
<PaButton variant="secondary">Edit</PaButton>
<PaButton variant="tertiary">Cancel</PaButton>`,
        render: 'multiple-ctas'
      },
      {
        label: 'States',
        code: `<PaButton variant="primary">Default</PaButton>
<PaButton variant="primary" :disabled="true">Disabled</PaButton>`,
        render: 'states'
      }
    ],
    'painput': [
      {
        label: 'Default',
        code: `<PaInput placeholder="Enter text..." />`,
        render: 'default'
      }
    ]
  }
  return examples[componentId] || []
}

const currentExamples = computed(() => {
  return getComponentExamples(activeComponent.value)
})

const selectComponent = (id: string) => {
  activeComponent.value = id
  const examples = getComponentExamples(id)
  if (examples.length > 0) {
    activeExampleGroup.value = examples[0].label
  } else {
    activeExampleGroup.value = ''
  }
}

const currentExample = computed(() => {
  return currentExamples.value.find(ex => ex.label === activeExampleGroup.value)
})

const toggleShowCode = (key: string) => {
  showCode.value[key] = !showCode.value[key]
}

const formatCodeWithLineNumbers = (code: string): string => {
  const lines = code.split('\n')
  const maxDigits = String(lines.length).length
  return lines.map((line, index) => {
    const lineNumber = String(index + 1).padStart(maxDigits, ' ')
    return `${lineNumber}  ${line}`
  }).join('\n')
}

const copyToClipboard = async (text: string, key: string) => {
  try {
    await navigator.clipboard.writeText(text)
    showCode.value[`copied-${key}`] = true
    setTimeout(() => {
      showCode.value[`copied-${key}`] = false
    }, 2000)
  } catch (err) {
    console.error('Failed to copy:', err)
  }
}

const getCodeTextForCopy = (code: string | undefined): string => {
  if (!code) return ''
  return code.trim()
}

const getHierarchyCode = (tab: string): string => {
  const codes: Record<string, string> = {
    'primary': '<PaButton variant="primary">Primary</PaButton>',
    'secondary': '<PaButton variant="secondary">Secondary</PaButton>',
    'tertiary': '<PaButton variant="tertiary">Tertiary</PaButton>',
    'payment-navigation': '<PaButton variant="payment-navigation">Payment Nav</PaButton>',
    'action': '<PaButton variant="action">Action</PaButton>'
  }
  return codes[tab] || ''
}

const getMultipleCTAsCode = (tab: string): string => {
  const codes: Record<string, string> = {
    'primary-secondary': '<PaButton variant="primary">Save Changes</PaButton>\n<PaButton variant="secondary">Cancel</PaButton>',
    'primary-tertiary': '<PaButton variant="primary">Submit</PaButton>\n<PaButton variant="tertiary">Skip</PaButton>',
    'three-actions': '<PaButton variant="primary">Confirm</PaButton>\n<PaButton variant="secondary">Edit</PaButton>\n<PaButton variant="tertiary">Cancel</PaButton>'
  }
  return codes[tab] || ''
}

onMounted(() => {
  // Ensure theme is applied on mount
  const theme = getTheme()
  setTheme(theme)
  currentTheme.value = theme
})
</script>

<template>
  <div class="app-layout">
    <aside class="sidebar">
      <div class="sidebar-logo">
        <div class="logo-circle">
          <img :src="logoSvg" alt="PA Design System Logo" class="logo-image" />
        </div>
      </div>
      
      <div class="sidebar-divider"></div>
      
      <nav class="sidebar-nav">
        <div 
          v-for="(section, sectionKey) in navigation" 
          :key="sectionKey" 
          class="nav-section"
        >
          <h3 class="nav-section-title">{{ section.title }}</h3>
          <ul class="nav-list">
            <li 
              v-for="item in section.items" 
              :key="item.id" 
              class="nav-item"
              :class="{ 'is-active': activeComponent === item.id }"
              @click="selectComponent(item.id)"
            >
              {{ item.label }}
            </li>
          </ul>
        </div>
      </nav>
    </aside>
    
    <main class="main-content">
      <header class="main-header">
        <div class="search-container">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search Components"
            class="search-input"
            @keydown="handleSearchKeydown"
          />
          <button class="search-button" @click="handleSearch">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M7 12C9.76142 12 12 9.76142 12 7C12 4.23858 9.76142 2 7 2C4.23858 2 2 4.23858 2 7C2 9.76142 4.23858 12 7 12Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M14 14L10.5 10.5" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </div>
        
        <div class="theme-toggle-container">
          <button 
            class="theme-toggle"
            @click="toggleTheme"
            :aria-label="`Switch to ${currentTheme === 'dark' ? 'light' : 'dark'} mode`"
          >
            <div class="theme-toggle-slider" :class="{ 'is-dark': currentTheme === 'dark' }">
              <svg v-if="currentTheme === 'dark'" width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8 2V4M8 12V14M2 8H4M12 8H14M3.757 3.757L5.172 5.172M10.828 10.828L12.243 12.243M3.757 12.243L5.172 10.828M10.828 5.172L12.243 3.757" stroke="white" stroke-width="1.5" stroke-linecap="round"/>
              </svg>
              <svg v-else width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8 3C5.23858 3 3 5.23858 3 8C3 10.7614 5.23858 13 8 13C10.7614 13 13 10.7614 13 8C13 5.23858 10.7614 3 8 3Z" fill="white"/>
              </svg>
            </div>
            <div class="theme-toggle-icon theme-toggle-icon-light">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8 2V4M8 12V14M2 8H4M12 8H14M3.757 3.757L5.172 5.172M10.828 10.828L12.243 12.243M3.757 12.243L5.172 10.828M10.828 5.172L12.243 3.757" stroke="#6e757c" stroke-width="1.5" stroke-linecap="round"/>
              </svg>
            </div>
            <div class="theme-toggle-icon theme-toggle-icon-dark">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8 3C5.23858 3 3 5.23858 3 8C3 10.7614 5.23858 13 8 13C10.7614 13 13 10.7614 13 8C13 5.23858 10.7614 3 8 3Z" fill="#6e757c"/>
              </svg>
            </div>
          </button>
        </div>
      </header>
      
      <div class="content-area">
        <div class="content-header">
          <h1 class="content-title">{{ activeSection }}</h1>
        </div>
        <div class="content-body">
          <div class="component-docs">
            <!-- Get Started Sections -->
            <div v-if="activeComponent === 'introduction'" class="component-section">
              <h2 class="component-name">Introduction</h2>
              <p class="component-description">
                Welcome to the PA Design System documentation. This comprehensive component library provides a complete set of reusable UI components built with Vue 3, TypeScript, and a token-driven architecture.
              </p>
              <div class="component-examples">
                <h3 class="section-title">Features</h3>
                <div class="example-group">
                  <ul style="list-style: none; padding: 0; margin: 0;">
                    <li style="padding: var(--pa-spacing-8, 8px) 0; color: var(--pa-color-surface-container-text, #cfd4d9);">• 42+ Components covering all UI needs</li>
                    <li style="padding: var(--pa-spacing-8, 8px) 0; color: var(--pa-color-surface-container-text, #cfd4d9);">• Token-driven architecture for consistent styling</li>
                    <li style="padding: var(--pa-spacing-8, 8px) 0; color: var(--pa-color-surface-container-text, #cfd4d9);">• Light and dark theme support</li>
                    <li style="padding: var(--pa-spacing-8, 8px) 0; color: var(--pa-color-surface-container-text, #cfd4d9);">• Full TypeScript support</li>
                    <li style="padding: var(--pa-spacing-8, 8px) 0; color: var(--pa-color-surface-container-text, #cfd4d9);">• Accessible components built with best practices</li>
                  </ul>
                </div>
              </div>
            </div>

            <div v-if="activeComponent === 'installation'" class="component-section">
              <h2 class="component-name">Installation</h2>
              <p class="component-description">
                Get started with the PA Design System by installing the package and importing components.
              </p>
              <div class="component-usage">
                <h3 class="section-title">Installation Steps</h3>
                <pre class="code-block">
                  <button 
                    class="copy-code-button"
                    @click="copyToClipboard('# Install dependencies\nnpm install\n\n# Build tokens (runs automatically before dev)\nnpm run build:tokens\n\n# Start development server\nnpm run dev\n\n# Build for production\nnpm run build', 'installation')"
                    :aria-label="showCode['copied-installation'] ? 'Copied!' : 'Copy code'"
                  >
                    <svg v-if="!showCode['copied-installation']" width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M5.5 3.5H3.5C2.67157 3.5 2 4.17157 2 5V12.5C2 13.3284 2.67157 14 3.5 14H11C11.8284 14 12.5 13.3284 12.5 12.5V10.5M5.5 3.5C5.5 2.67157 6.17157 2 7 2H9.5M5.5 3.5C5.5 4.32843 6.17157 5 7 5H9.5M9.5 5H11C11.8284 5 12.5 5.67157 12.5 6.5V10.5M9.5 5V6.5C9.5 7.32843 10.1716 8 11 8H12.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <svg v-else width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M13.5 4L6 11.5L2.5 8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <span>{{ showCode['copied-installation'] ? 'Copied!' : 'Copy' }}</span>
                  </button>
                  <code># Install dependencies
npm install

# Build tokens (runs automatically before dev)
npm run build:tokens

# Start development server
npm run dev

# Build for production
npm run build</code></pre>
              </div>
            </div>

            <div v-if="activeComponent === 'theming'" class="component-section">
              <h2 class="component-name">Theming</h2>
              <p class="component-description">
                The PA Design System supports both light and dark themes through a comprehensive token system. Themes can be switched dynamically.
              </p>
              <div class="component-usage">
                <h3 class="section-title">Theme Usage</h3>
                <pre class="code-block">
                  <button 
                    class="copy-code-button"
                    @click="copyToClipboard('import { setTheme, getTheme } from \'./utils/theme\'\n\n// Set theme\nsetTheme(\'dark\') // or \'light\'\n\n// Get current theme\nconst currentTheme = getTheme()', 'theming')"
                    :aria-label="showCode['copied-theming'] ? 'Copied!' : 'Copy code'"
                  >
                    <svg v-if="!showCode['copied-theming']" width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M5.5 3.5H3.5C2.67157 3.5 2 4.17157 2 5V12.5C2 13.3284 2.67157 14 3.5 14H11C11.8284 14 12.5 13.3284 12.5 12.5V10.5M5.5 3.5C5.5 2.67157 6.17157 2 7 2H9.5M5.5 3.5C5.5 4.32843 6.17157 5 7 5H9.5M9.5 5H11C11.8284 5 12.5 5.67157 12.5 6.5V10.5M9.5 5V6.5C9.5 7.32843 10.1716 8 11 8H12.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <svg v-else width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M13.5 4L6 11.5L2.5 8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <span>{{ showCode['copied-theming'] ? 'Copied!' : 'Copy' }}</span>
                  </button>
                  <code>import { setTheme, getTheme } from './utils/theme'

// Set theme
setTheme('dark') // or 'light'

// Get current theme
const currentTheme = getTheme()</code></pre>
              </div>
            </div>

            <!-- Component Documentation -->
            <div v-if="activeComponentData && activeComponent !== 'introduction' && activeComponent !== 'installation' && activeComponent !== 'theming'" class="component-section">
              <h2 class="component-name">{{ activeComponentData.label }}</h2>
              <p class="component-description">
                {{ getComponentDescription(activeComponentData.id) }}
              </p>
              
              <!-- PaButton: Separate Documentation Sections -->
              <template v-if="activeComponent === 'pabutton'">
                <!-- Sizes Section -->
                <div class="documentation-section">
                  <h3 class="documentation-section-title">Sizes</h3>
                  <p class="documentation-section-description">
                    Buttons are available in three sizes: small, medium, and large. Choose the size that best fits your layout and the importance of the action. Medium is the default size.
                  </p>
                  <div class="example-preview-container">
                    <div class="example-preview">
                      <div class="component-preview" style="display: flex; flex-wrap: wrap; gap: var(--pa-spacing-8, 8px); align-items: center;">
                        <PaButton variant="primary" size="sm">Small</PaButton>
                        <PaButton variant="primary" size="md">Medium</PaButton>
                        <PaButton variant="primary" size="lg">Large</PaButton>
                      </div>
                    </div>
                    <button 
                      class="show-code-button"
                      @click="toggleShowCode('pabutton-sizes')"
                    >
                      {{ showCode['pabutton-sizes'] ? 'Hide code' : 'Show code' }}
                    </button>
                    <div v-if="showCode['pabutton-sizes']" class="code-preview">
                      <pre class="code-block">
                        <button 
                          class="copy-code-button"
                          @click="copyToClipboard(getCodeTextForCopy(getComponentExamples('pabutton').find(e => e.render === 'sizes')?.code), 'pabutton-sizes')"
                          :aria-label="showCode['copied-pabutton-sizes'] ? 'Copied!' : 'Copy code'"
                        >
                          <svg v-if="!showCode['copied-pabutton-sizes']" width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M5.5 3.5H3.5C2.67157 3.5 2 4.17157 2 5V12.5C2 13.3284 2.67157 14 3.5 14H11C11.8284 14 12.5 13.3284 12.5 12.5V10.5M5.5 3.5C5.5 2.67157 6.17157 2 7 2H9.5M5.5 3.5C5.5 4.32843 6.17157 5 7 5H9.5M9.5 5H11C11.8284 5 12.5 5.67157 12.5 6.5V10.5M9.5 5V6.5C9.5 7.32843 10.1716 8 11 8H12.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                          </svg>
                          <svg v-else width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M13.5 4L6 11.5L2.5 8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                          </svg>
                          <span>{{ showCode['copied-pabutton-sizes'] ? 'Copied!' : 'Copy' }}</span>
                        </button>
                        <code>{{ getComponentExamples('pabutton').find(e => e.render === 'sizes')?.code }}</code></pre>
                    </div>
                  </div>
                </div>

                <!-- Variants Section -->
                <div class="documentation-section">
                  <h3 class="documentation-section-title">Variants</h3>
                  <p class="documentation-section-description">
                    Each variant serves a specific purpose in the interface hierarchy. Select the variant that matches the importance and context of the action.
                  </p>
                  <div class="example-preview-container">
                    <div class="example-preview">
                      <div class="component-preview" style="display: flex; flex-wrap: wrap; gap: var(--pa-spacing-8, 8px);">
                        <PaButton variant="primary">Primary</PaButton>
                        <PaButton variant="secondary">Secondary</PaButton>
                        <PaButton variant="tertiary">Tertiary</PaButton>
                        <PaButton variant="payment-navigation">Payment Nav</PaButton>
                        <PaButton variant="action">Action</PaButton>
                      </div>
                    </div>
                    <button 
                      class="show-code-button"
                      @click="toggleShowCode('pabutton-variants')"
                    >
                      {{ showCode['pabutton-variants'] ? 'Hide code' : 'Show code' }}
                    </button>
                    <div v-if="showCode['pabutton-variants']" class="code-preview">
                      <pre class="code-block">
                        <button 
                          class="copy-code-button"
                          @click="copyToClipboard(getCodeTextForCopy(getComponentExamples('pabutton').find(e => e.render === 'variants')?.code), 'pabutton-variants')"
                          :aria-label="showCode['copied-pabutton-variants'] ? 'Copied!' : 'Copy code'"
                        >
                          <svg v-if="!showCode['copied-pabutton-variants']" width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M5.5 3.5H3.5C2.67157 3.5 2 4.17157 2 5V12.5C2 13.3284 2.67157 14 3.5 14H11C11.8284 14 12.5 13.3284 12.5 12.5V10.5M5.5 3.5C5.5 2.67157 6.17157 2 7 2H9.5M5.5 3.5C5.5 4.32843 6.17157 5 7 5H9.5M9.5 5H11C11.8284 5 12.5 5.67157 12.5 6.5V10.5M9.5 5V6.5C9.5 7.32843 10.1716 8 11 8H12.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                          </svg>
                          <svg v-else width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M13.5 4L6 11.5L2.5 8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                          </svg>
                          <span>{{ showCode['copied-pabutton-variants'] ? 'Copied!' : 'Copy' }}</span>
                        </button>
                        <code>{{ getComponentExamples('pabutton').find(e => e.render === 'variants')?.code }}</code></pre>
                    </div>
                  </div>
                </div>

                <!-- Hierarchy Section -->
                <div class="documentation-section">
                  <h3 class="documentation-section-title">Hierarchy</h3>
                  <p class="documentation-section-description">
                    Button variants follow a clear hierarchical order from highest to lowest priority. Use this hierarchy to guide users through your interface and establish clear visual importance.
                  </p>
                  
                  <div class="example-tabs">
                    <button
                      class="example-tab"
                      :class="{ 'is-active': activeHierarchyTab === 'primary' }"
                      @click="activeHierarchyTab = 'primary'"
                    >
                      1. Primary
                    </button>
                    <button
                      class="example-tab"
                      :class="{ 'is-active': activeHierarchyTab === 'secondary' }"
                      @click="activeHierarchyTab = 'secondary'"
                    >
                      2. Secondary
                    </button>
                    <button
                      class="example-tab"
                      :class="{ 'is-active': activeHierarchyTab === 'tertiary' }"
                      @click="activeHierarchyTab = 'tertiary'"
                    >
                      3. Tertiary
                    </button>
                    <button
                      class="example-tab"
                      :class="{ 'is-active': activeHierarchyTab === 'payment-navigation' }"
                      @click="activeHierarchyTab = 'payment-navigation'"
                    >
                      4. Payment Nav
                    </button>
                    <button
                      class="example-tab"
                      :class="{ 'is-active': activeHierarchyTab === 'action' }"
                      @click="activeHierarchyTab = 'action'"
                    >
                      5. Action
                    </button>
                  </div>

                  <div class="example-preview-container">
                    <div class="example-preview">
                      <div class="component-preview" style="display: flex; flex-direction: column; gap: var(--pa-spacing-16, 16px);">
                        <template v-if="activeHierarchyTab === 'primary'">
                          <div style="display: flex; flex-direction: column; gap: var(--pa-spacing-8, 8px);">
                            <div style="display: flex; flex-wrap: wrap; gap: var(--pa-spacing-8, 8px);">
                              <PaButton variant="primary">Primary</PaButton>
                            </div>
                            <p style="margin: 0; font-size: var(--pa-font-size-100, 14px); color: var(--pa-color-surface-container-text-secondary, #6c757d); line-height: 1.5;">
                              The main call-to-action. Use for the most important action users should take (e.g., "Submit", "Save", "Confirm"). Only one Primary button should be visible per section or modal.
                            </p>
                          </div>
                        </template>
                        <template v-else-if="activeHierarchyTab === 'secondary'">
                          <div style="display: flex; flex-direction: column; gap: var(--pa-spacing-8, 8px);">
                            <div style="display: flex; flex-wrap: wrap; gap: var(--pa-spacing-8, 8px);">
                              <PaButton variant="secondary">Secondary</PaButton>
                            </div>
                            <p style="margin: 0; font-size: var(--pa-font-size-100, 14px); color: var(--pa-color-surface-container-text-secondary, #6c757d); line-height: 1.5;">
                              Secondary actions that are important but not the primary focus. Common use cases include "Cancel", "Back", "Edit", or alternative actions to the primary button.
                            </p>
                          </div>
                        </template>
                        <template v-else-if="activeHierarchyTab === 'tertiary'">
                          <div style="display: flex; flex-direction: column; gap: var(--pa-spacing-8, 8px);">
                            <div style="display: flex; flex-wrap: wrap; gap: var(--pa-spacing-8, 8px);">
                              <PaButton variant="tertiary">Tertiary</PaButton>
                            </div>
                            <p style="margin: 0; font-size: var(--pa-font-size-100, 14px); color: var(--pa-color-surface-container-text-secondary, #6c757d); line-height: 1.5;">
                              Less emphasized actions that are optional or supplementary. Use for actions like "Skip", "Learn More", or when you need a third action option.
                            </p>
                          </div>
                        </template>
                        <template v-else-if="activeHierarchyTab === 'payment-navigation'">
                          <div style="display: flex; flex-direction: column; gap: var(--pa-spacing-8, 8px);">
                            <div style="display: flex; flex-wrap: wrap; gap: var(--pa-spacing-8, 8px);">
                              <PaButton variant="payment-navigation">Payment Nav</PaButton>
                            </div>
                            <p style="margin: 0; font-size: var(--pa-font-size-100, 14px); color: var(--pa-color-surface-container-text-secondary, #6c757d); line-height: 1.5;">
                              Specialized variant for payment flows and financial transactions. Use in checkout processes, payment forms, or transaction-related interfaces.
                            </p>
                          </div>
                        </template>
                        <template v-else-if="activeHierarchyTab === 'action'">
                          <div style="display: flex; flex-direction: column; gap: var(--pa-spacing-8, 8px);">
                            <div style="display: flex; flex-wrap: wrap; gap: var(--pa-spacing-8, 8px);">
                              <PaButton variant="action">Action</PaButton>
                            </div>
                            <p style="margin: 0; font-size: var(--pa-font-size-100, 14px); color: var(--pa-color-surface-container-text-secondary, #6c757d); line-height: 1.5;">
                              General-purpose action button for contexts where the specialized variants don't fit. Use for standard actions that don't require specific emphasis.
                            </p>
                          </div>
                        </template>
                      </div>
                    </div>
                    <button 
                      class="show-code-button"
                      @click="toggleShowCode(`pabutton-hierarchy-${activeHierarchyTab}`)"
                    >
                      {{ showCode[`pabutton-hierarchy-${activeHierarchyTab}`] ? 'Hide code' : 'Show code' }}
                    </button>
                    <div v-if="showCode[`pabutton-hierarchy-${activeHierarchyTab}`]" class="code-preview">
                      <pre class="code-block">
                        <button 
                          class="copy-code-button"
                          @click="copyToClipboard(getHierarchyCode(activeHierarchyTab), `pabutton-hierarchy-${activeHierarchyTab}`)"
                          :aria-label="showCode[`copied-pabutton-hierarchy-${activeHierarchyTab}`] ? 'Copied!' : 'Copy code'"
                        >
                          <svg v-if="!showCode[`copied-pabutton-hierarchy-${activeHierarchyTab}`]" width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M5.5 3.5H3.5C2.67157 3.5 2 4.17157 2 5V12.5C2 13.3284 2.67157 14 3.5 14H11C11.8284 14 12.5 13.3284 12.5 12.5V10.5M5.5 3.5C5.5 2.67157 6.17157 2 7 2H9.5M5.5 3.5C5.5 4.32843 6.17157 5 7 5H9.5M9.5 5H11C11.8284 5 12.5 5.67157 12.5 6.5V10.5M9.5 5V6.5C9.5 7.32843 10.1716 8 11 8H12.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                          </svg>
                          <svg v-else width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M13.5 4L6 11.5L2.5 8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                          </svg>
                          <span>{{ showCode[`copied-pabutton-hierarchy-${activeHierarchyTab}`] ? 'Copied!' : 'Copy' }}</span>
                        </button>
                        <code>{{ activeHierarchyTab === 'primary' ? '<PaButton variant="primary">Primary</PaButton>' : activeHierarchyTab === 'secondary' ? '<PaButton variant="secondary">Secondary</PaButton>' : activeHierarchyTab === 'tertiary' ? '<PaButton variant="tertiary">Tertiary</PaButton>' : activeHierarchyTab === 'payment-navigation' ? '<PaButton variant="payment-navigation">Payment Nav</PaButton>' : '<PaButton variant="action">Action</PaButton>' }}</code></pre>
                    </div>
                  </div>
                </div>

                <!-- Multiple CTAs Section -->
                <div class="documentation-section">
                  <h3 class="documentation-section-title">Multiple CTAs</h3>
                  <p class="documentation-section-description">
                    When multiple actions are available, use the variant hierarchy to establish clear visual importance. Follow these patterns for common scenarios.
                  </p>
                  
                  <div class="example-tabs">
                    <button
                      class="example-tab"
                      :class="{ 'is-active': activeMultipleCTAsTab === 'primary-secondary' }"
                      @click="activeMultipleCTAsTab = 'primary-secondary'"
                    >
                      Primary + Secondary
                    </button>
                    <button
                      class="example-tab"
                      :class="{ 'is-active': activeMultipleCTAsTab === 'primary-tertiary' }"
                      @click="activeMultipleCTAsTab = 'primary-tertiary'"
                    >
                      Primary + Tertiary
                    </button>
                    <button
                      class="example-tab"
                      :class="{ 'is-active': activeMultipleCTAsTab === 'three-actions' }"
                      @click="activeMultipleCTAsTab = 'three-actions'"
                    >
                      Three Actions
                    </button>
                  </div>

                  <div class="example-preview-container">
                    <div class="example-preview">
                      <div class="component-preview" style="display: flex; flex-direction: column; gap: var(--pa-spacing-16, 16px);">
                        <template v-if="activeMultipleCTAsTab === 'primary-secondary'">
                          <div style="display: flex; flex-direction: column; gap: var(--pa-spacing-8, 8px);">
                            <div style="display: flex; flex-wrap: wrap; gap: var(--pa-spacing-8, 8px);">
                              <PaButton variant="primary">Save Changes</PaButton>
                              <PaButton variant="secondary">Cancel</PaButton>
                            </div>
                            <p style="margin: 0; font-size: var(--pa-font-size-100, 14px); color: var(--pa-color-surface-container-text-secondary, #6c757d); line-height: 1.5;">
                              Use when you have a main action and a secondary action. The Primary button should be placed on the right (or left in RTL layouts).
                            </p>
                          </div>
                        </template>
                        <template v-else-if="activeMultipleCTAsTab === 'primary-tertiary'">
                          <div style="display: flex; flex-direction: column; gap: var(--pa-spacing-8, 8px);">
                            <div style="display: flex; flex-wrap: wrap; gap: var(--pa-spacing-8, 8px);">
                              <PaButton variant="primary">Submit</PaButton>
                              <PaButton variant="tertiary">Skip</PaButton>
                            </div>
                            <p style="margin: 0; font-size: var(--pa-font-size-100, 14px); color: var(--pa-color-surface-container-text-secondary, #6c757d); line-height: 1.5;">
                              Use when the secondary action is less important or optional. Tertiary provides minimal emphasis while still being accessible.
                            </p>
                          </div>
                        </template>
                        <template v-else-if="activeMultipleCTAsTab === 'three-actions'">
                          <div style="display: flex; flex-direction: column; gap: var(--pa-spacing-8, 8px);">
                            <div style="display: flex; flex-wrap: wrap; gap: var(--pa-spacing-8, 8px);">
                              <PaButton variant="primary">Confirm</PaButton>
                              <PaButton variant="secondary">Edit</PaButton>
                              <PaButton variant="tertiary">Cancel</PaButton>
                            </div>
                            <p style="margin: 0; font-size: var(--pa-font-size-100, 14px); color: var(--pa-color-surface-container-text-secondary, #6c757d); line-height: 1.5;">
                              Use when you need three distinct action levels. Always maintain visual hierarchy: Primary should be most prominent, followed by Secondary, then Tertiary. Limit to maximum 3 buttons per action group.
                            </p>
                          </div>
                        </template>
                      </div>
                    </div>
                    <button 
                      class="show-code-button"
                      @click="toggleShowCode(`pabutton-multiple-ctas-${activeMultipleCTAsTab}`)"
                    >
                      {{ showCode[`pabutton-multiple-ctas-${activeMultipleCTAsTab}`] ? 'Hide code' : 'Show code' }}
                    </button>
                    <div v-if="showCode[`pabutton-multiple-ctas-${activeMultipleCTAsTab}`]" class="code-preview">
                      <pre class="code-block">
                        <button 
                          class="copy-code-button"
                          @click="copyToClipboard(getMultipleCTAsCode(activeMultipleCTAsTab), `pabutton-multiple-ctas-${activeMultipleCTAsTab}`)"
                          :aria-label="showCode[`copied-pabutton-multiple-ctas-${activeMultipleCTAsTab}`] ? 'Copied!' : 'Copy code'"
                        >
                          <svg v-if="!showCode[`copied-pabutton-multiple-ctas-${activeMultipleCTAsTab}`]" width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M5.5 3.5H3.5C2.67157 3.5 2 4.17157 2 5V12.5C2 13.3284 2.67157 14 3.5 14H11C11.8284 14 12.5 13.3284 12.5 12.5V10.5M5.5 3.5C5.5 2.67157 6.17157 2 7 2H9.5M5.5 3.5C5.5 4.32843 6.17157 5 7 5H9.5M9.5 5H11C11.8284 5 12.5 5.67157 12.5 6.5V10.5M9.5 5V6.5C9.5 7.32843 10.1716 8 11 8H12.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                          </svg>
                          <svg v-else width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M13.5 4L6 11.5L2.5 8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                          </svg>
                          <span>{{ showCode[`copied-pabutton-multiple-ctas-${activeMultipleCTAsTab}`] ? 'Copied!' : 'Copy' }}</span>
                        </button>
                        <code>{{ activeMultipleCTAsTab === 'primary-secondary' ? '<PaButton variant="primary">Save Changes</PaButton>\n<PaButton variant="secondary">Cancel</PaButton>' : activeMultipleCTAsTab === 'primary-tertiary' ? '<PaButton variant="primary">Submit</PaButton>\n<PaButton variant="tertiary">Skip</PaButton>' : '<PaButton variant="primary">Confirm</PaButton>\n<PaButton variant="secondary">Edit</PaButton>\n<PaButton variant="tertiary">Cancel</PaButton>' }}</code></pre>
                    </div>
                  </div>
                </div>

                <!-- States Section -->
                <div class="documentation-section">
                  <h3 class="documentation-section-title">States</h3>
                  <p class="documentation-section-description">
                    Buttons support different states to provide feedback and control user interactions. Use the disabled state when an action is not available.
                  </p>
                  <div class="example-preview-container">
                    <div class="example-preview">
                      <div class="component-preview" style="display: flex; flex-wrap: wrap; gap: var(--pa-spacing-8, 8px);">
                        <PaButton variant="primary">Default</PaButton>
                        <PaButton variant="primary" :disabled="true">Disabled</PaButton>
                      </div>
                    </div>
                    <button 
                      class="show-code-button"
                      @click="toggleShowCode('pabutton-states')"
                    >
                      {{ showCode['pabutton-states'] ? 'Hide code' : 'Show code' }}
                    </button>
                    <div v-if="showCode['pabutton-states']" class="code-preview">
                      <pre class="code-block">
                        <button 
                          class="copy-code-button"
                          @click="copyToClipboard(getCodeTextForCopy(getComponentExamples('pabutton').find(e => e.render === 'states')?.code), 'pabutton-states')"
                          :aria-label="showCode['copied-pabutton-states'] ? 'Copied!' : 'Copy code'"
                        >
                          <svg v-if="!showCode['copied-pabutton-states']" width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M5.5 3.5H3.5C2.67157 3.5 2 4.17157 2 5V12.5C2 13.3284 2.67157 14 3.5 14H11C11.8284 14 12.5 13.3284 12.5 12.5V10.5M5.5 3.5C5.5 2.67157 6.17157 2 7 2H9.5M5.5 3.5C5.5 4.32843 6.17157 5 7 5H9.5M9.5 5H11C11.8284 5 12.5 5.67157 12.5 6.5V10.5M9.5 5V6.5C9.5 7.32843 10.1716 8 11 8H12.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                          </svg>
                          <svg v-else width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M13.5 4L6 11.5L2.5 8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                          </svg>
                          <span>{{ showCode['copied-pabutton-states'] ? 'Copied!' : 'Copy' }}</span>
                        </button>
                        <code>{{ getComponentExamples('pabutton').find(e => e.render === 'states')?.code }}</code></pre>
                    </div>
                  </div>
                </div>
              </template>

              <!-- Other Components: Tab-based Examples -->
              <template v-else>
                <!-- Example Groups Tabs -->
                <div v-if="currentExamples.length > 0" class="example-tabs">
                  <button
                    v-for="example in currentExamples"
                    :key="example.label"
                    class="example-tab"
                    :class="{ 'is-active': activeExampleGroup === example.label }"
                    @click="activeExampleGroup = example.label"
                  >
                    {{ example.label }}
                  </button>
                </div>

                <!-- Current Example Display -->
                <div v-if="currentExamples.length > 0 && currentExample" class="component-example-showcase">
                  <div class="example-preview-container">
                    <div class="example-preview">
                      <!-- PaInput Examples -->
                      <template v-if="activeComponent === 'painput'">
                        <div class="component-preview">
                          <PaInput 
                          v-model="componentValues.painput"
                          v-bind="getComponentProps('painput')"
                        />
                      </div>
                    </template>
                    
                    <!-- Other Components (fallback) -->
                    <template v-else>
                      <div class="component-preview">
                        <PaTextarea 
                          v-if="activeComponent === 'patextarea'"
                          v-model="componentValues.patextarea"
                          v-bind="getComponentProps('patextarea')"
                        />
                        <PaTimePicker 
                          v-else-if="activeComponent === 'patimepicker'"
                          v-model="componentValues.patimepicker"
                          v-bind="getComponentProps('patimepicker')"
                        />
                        <PaSegmentedControl 
                          v-else-if="activeComponent === 'pasegmentedcontrol'"
                          v-model="componentValues.pasegmentedcontrol"
                          :options="[{ label: 'Option 1', value: 'Option 1' }, { label: 'Option 2', value: 'Option 2' }]"
                        />
                        <PaSlider 
                          v-else-if="activeComponent === 'paslider'"
                          v-model="componentValues.paslider"
                          v-bind="getComponentProps('paslider')"
                        />
                        <PaRangeSlider 
                          v-else-if="activeComponent === 'parangeslider'"
                          v-model="componentValues.parangeslider"
                          v-bind="getComponentProps('parangeslider')"
                        />
                        <component 
                          v-else-if="getComponent(activeComponentData.id)" 
                          :is="getComponent(activeComponentData.id)"
                          v-bind="getComponentProps(activeComponentData.id)"
                        >
                          <template v-if="activeComponent === 'pabadge'">Badge</template>
                          <template v-else-if="activeComponent === 'painlinemessage'">Message content</template>
                          <template v-else-if="activeComponent === 'patooltip'">
                            <span>Hover me</span>
                          </template>
                          <template v-else-if="activeComponent === 'pacard'">
                            <div style="padding: var(--pa-spacing-16, 16px);">
                              <h3 style="margin: 0 0 var(--pa-spacing-8, 8px) 0; color: var(--pa-color-surface-container-text, #cfd4d9);">Card Title</h3>
                              <p style="margin: 0; color: var(--pa-color-surface-container-text, #cfd4d9);">Card content goes here.</p>
                            </div>
                          </template>
                        </component>
                        <p v-else style="color: var(--pa-color-surface-container-text, #cfd4d9); padding: var(--pa-spacing-16, 16px);">
                          Component preview coming soon.
                        </p>
                      </div>
                    </template>
                  </div>
                  
                  <button 
                    class="show-code-button"
                    @click="toggleShowCode(`${activeComponent}-${activeExampleGroup}`)"
                  >
                    {{ showCode[`${activeComponent}-${activeExampleGroup}`] ? 'Hide code' : 'Show code' }}
                  </button>
                </div>
                
                <div 
                  v-if="showCode[`${activeComponent}-${activeExampleGroup}`]"
                  class="code-preview"
                >
                  <pre class="code-block">
                    <button 
                      class="copy-code-button"
                      @click="copyToClipboard(getCodeTextForCopy(currentExample.code), `${activeComponent}-${activeExampleGroup}`)"
                      :aria-label="showCode[`copied-${activeComponent}-${activeExampleGroup}`] ? 'Copied!' : 'Copy code'"
                    >
                      <svg v-if="!showCode[`copied-${activeComponent}-${activeExampleGroup}`]" width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M5.5 3.5H3.5C2.67157 3.5 2 4.17157 2 5V12.5C2 13.3284 2.67157 14 3.5 14H11C11.8284 14 12.5 13.3284 12.5 12.5V10.5M5.5 3.5C5.5 2.67157 6.17157 2 7 2H9.5M5.5 3.5C5.5 4.32843 6.17157 5 7 5H9.5M9.5 5H11C11.8284 5 12.5 5.67157 12.5 6.5V10.5M9.5 5V6.5C9.5 7.32843 10.1716 8 11 8H12.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>
                      <svg v-else width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M13.5 4L6 11.5L2.5 8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>
                      <span>{{ showCode[`copied-${activeComponent}-${activeExampleGroup}`] ? 'Copied!' : 'Copy' }}</span>
                    </button>
                    <code>{{ formatCodeWithLineNumbers(currentExample.code) }}</code></pre>
                </div>
              </div>
              </template>

              <!-- Fallback for components without examples -->
              <div v-if="currentExamples.length === 0" class="component-example-showcase">
                <div class="example-preview-container">
                  <div class="example-preview">
                    <div class="component-preview">
                      <PaInput 
                        v-if="activeComponent === 'painput'"
                        v-model="componentValues.painput"
                        v-bind="getComponentProps('painput')"
                      />
                      <PaTextarea 
                        v-if="activeComponent === 'patextarea'"
                        v-model="componentValues.patextarea"
                        v-bind="getComponentProps('patextarea')"
                      />
                      <PaTimePicker 
                        v-else-if="activeComponent === 'patimepicker'"
                        v-model="componentValues.patimepicker"
                        v-bind="getComponentProps('patimepicker')"
                      />
                      <PaSegmentedControl 
                        v-else-if="activeComponent === 'pasegmentedcontrol'"
                        v-model="componentValues.pasegmentedcontrol"
                        :options="[{ label: 'Option 1', value: 'Option 1' }, { label: 'Option 2', value: 'Option 2' }]"
                      />
                      <PaSlider 
                        v-else-if="activeComponent === 'paslider'"
                        v-model="componentValues.paslider"
                        v-bind="getComponentProps('paslider')"
                      />
                      <PaRangeSlider 
                        v-else-if="activeComponent === 'parangeslider'"
                        v-model="componentValues.parangeslider"
                        v-bind="getComponentProps('parangeslider')"
                      />
                      <component 
                        v-else-if="getComponent(activeComponentData.id)" 
                        :is="getComponent(activeComponentData.id)"
                        v-bind="getComponentProps(activeComponentData.id)"
                      >
                        <template v-if="activeComponent === 'pabadge'">Badge</template>
                        <template v-else-if="activeComponent === 'painlinemessage'">Message content</template>
                        <template v-else-if="activeComponent === 'patooltip'">
                          <span>Hover me</span>
                        </template>
                        <template v-else-if="activeComponent === 'pacard'">
                          <div style="padding: var(--pa-spacing-16, 16px);">
                            <h3 style="margin: 0 0 var(--pa-spacing-8, 8px) 0; color: var(--pa-color-surface-container-text, #cfd4d9);">Card Title</h3>
                            <p style="margin: 0; color: var(--pa-color-surface-container-text, #cfd4d9);">Card content goes here.</p>
                          </div>
                        </template>
                      </component>
                      <p v-else style="color: var(--pa-color-surface-container-text, #cfd4d9); padding: var(--pa-spacing-16, 16px);">
                        Component preview coming soon.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div class="component-usage">
                <h3 class="section-title">Usage</h3>
                <pre class="code-block">
                  <button 
                    class="copy-code-button"
                    @click="copyToClipboard(`import { ${activeComponentData.label} } from './components'\n\n<${activeComponentData.label} />`, `fallback-${activeComponentData.id}`)"
                    :aria-label="showCode[`copied-fallback-${activeComponentData.id}`] ? 'Copied!' : 'Copy code'"
                  >
                    <svg v-if="!showCode[`copied-fallback-${activeComponentData.id}`]" width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M5.5 3.5H3.5C2.67157 3.5 2 4.17157 2 5V12.5C2 13.3284 2.67157 14 3.5 14H11C11.8284 14 12.5 13.3284 12.5 12.5V10.5M5.5 3.5C5.5 2.67157 6.17157 2 7 2H9.5M5.5 3.5C5.5 4.32843 6.17157 5 7 5H9.5M9.5 5H11C11.8284 5 12.5 5.67157 12.5 6.5V10.5M9.5 5V6.5C9.5 7.32843 10.1716 8 11 8H12.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <svg v-else width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M13.5 4L6 11.5L2.5 8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <span>{{ showCode[`copied-fallback-${activeComponentData.id}`] ? 'Copied!' : 'Copy' }}</span>
                  </button>
                  <code>{{ formatCodeWithLineNumbers(`import { ${activeComponentData.label} } from './components'

<${activeComponentData.label} />`) }}</code></pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
  <div class="version-badge">v2.0</div>
</template>

<style lang="scss" scoped>
.app-layout {
  display: flex;
  gap: var(--pa-spacing-4, 4px);
  align-items: flex-start;
  padding: var(--pa-spacing-6, 6px);
  background-color: var(--pa-color-surface-base-background, #000000);
  min-height: 100vh;
  // width: 100%;
  transition: background-color var(--pa-transition-duration-default, 200ms) var(--pa-transition-easing-default, ease);
}

.sidebar {
  background-color: var(--pa-color-surface-container-background, #151517);
  border-radius: var(--pa-Border-radius-100, 8px);
  padding: var(--pa-spacing-24, 24px);
  width: 300px;
  height: calc(100vh - var(--pa-spacing-12, 12px));
  display: flex;
  flex-direction: column;
  gap: var(--pa-spacing-36, 36px);
  align-items: center;
  flex-shrink: 0;
  overflow-y: auto;
  overflow-x: hidden;
  transition: background-color var(--pa-transition-duration-default, 200ms) var(--pa-transition-easing-default, ease);
}


.sidebar-logo {
  display: flex;
  align-items: center;
  justify-content: center;
}

.sidebar-divider {
  width: 100%;
  height: 1px;
  background: #000000;
  width: 252px;
}

.logo-circle {
  width: 80px;
  height: 80px;
  border-radius: 55px;
  background: linear-gradient(-85.36deg, #c10505 7.68%, #d51e33 92.47%);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 5px 15px 5px rgba(152, 16, 32, 0.1);
}

.logo-image {
  width: 46px;
  height: 41px;
  object-fit: contain;
}

.sidebar-nav {
  display: flex;
  flex-direction: column;
  gap: var(--pa-spacing-24, 24px);
  width: 100%;
  align-items: flex-start;
  justify-content: flex-end;
}

.nav-section {
  display: flex;
  flex-direction: column;
  gap: var(--pa-spacing-24, 24px);
  width: 100%;
  align-items: flex-start;
  justify-content: flex-end;
}

.nav-section-title {
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: var(--pa-font-size-200, 16px);
  line-height: normal;
  color: var(--pa-color-surface-container-text-secondary, #6c757d);
  text-transform: uppercase;
  margin: 0;
  white-space: nowrap;
  transition: color var(--pa-transition-duration-default, 200ms) var(--pa-transition-easing-default, ease);
}

[data-theme="dark"] .nav-section-title {
  color: #6e757c;
}

.nav-list {
  display: flex;
  flex-direction: column;
  gap: var(--pa-spacing-16, 16px);
  width: 100%;
  margin: 0;
  padding: 0;
  list-style: none;
  position: relative;
  padding-left: var(--pa-spacing-18, 18px);
  
  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 1px;
    background: linear-gradient(180deg, transparent, var(--pa-color-surface-container-border, #dee2e6), transparent);
    transition: background var(--pa-transition-duration-default, 200ms) var(--pa-transition-easing-default, ease);
  }
}

[data-theme="dark"] .nav-list::before {
  background: linear-gradient(180deg, transparent, #222529, transparent);
}

.nav-item {
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: var(--pa-font-size-200, 16px);
  line-height: normal;
  color: var(--pa-color-surface-container-text, #212529);
  white-space: nowrap;
  cursor: pointer;
  transition: color var(--pa-transition-duration-default, 200ms) var(--pa-transition-easing-default, ease);
  
  &:hover {
    color: var(--pa-color-surface-container-text-hover, #495057);
  }
  
  &.is-active {
    color: var(--pa-color-surface-container-text-active, #212529);
    font-weight: 600;
  }
}

[data-theme="dark"] .nav-item {
  color: #eaecef;
  
  &:hover {
    color: #cfd4d9;
  }
  
  &.is-active {
    color: #cfd4d9;
  }
}

.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: var(--pa-spacing-4, 4px);
  height: calc(100vh - var(--pa-spacing-12, 12px));
  min-width: 0;
}

.main-header {
  background-color: var(--pa-color-surface-container-background, #151517);
  border-radius: var(--pa-Border-radius-100, 8px);
  padding: var(--pa-spacing-8, 8px) var(--pa-spacing-18, 18px);
  height: 139px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-shrink: 0;
  transition: background-color var(--pa-transition-duration-default, 200ms) var(--pa-transition-easing-default, ease);
}


.search-container {
  backdrop-filter: blur(20px);
  background-color: var(--pa-color-surface-base-background, #f7f7f8);
  border: 1px solid var(--pa-color-surface-container-border, #dee2e6);
  border-radius: 250px;
  display: flex;
  gap: var(--pa-spacing-8, 8px);
  align-items: center;
  padding: var(--pa-spacing-12, 12px) var(--pa-spacing-6, 6px);
  height: 32px;
  width: 300px;
  transition: background-color var(--pa-transition-duration-default, 200ms) var(--pa-transition-easing-default, ease), border-color var(--pa-transition-duration-default, 200ms) var(--pa-transition-easing-default, ease);
}

[data-theme="dark"] .search-container {
  background-color: #0e0e0f;
  border-color: #222529;
}

.search-input {
  flex: 1;
  background: none;
  border: none;
  outline: none;
  font-family: 'Satoshi', sans-serif;
  font-weight: 500;
  font-size: var(--pa-font-size-200, 16px);
  line-height: 0.965;
  color: var(--pa-color-surface-container-text, #212529);
  padding: var(--pa-spacing-8, 8px) var(--pa-spacing-18, 18px);
  min-width: 0;
  border-radius: 250px;
  text-align: center;
  transition: color var(--pa-transition-duration-default, 200ms) var(--pa-transition-easing-default, ease);
  
  &::placeholder {
    color: var(--pa-color-surface-container-text-secondary, #6c757d);
    text-align: center;
    white-space: nowrap;
    transition: color var(--pa-transition-duration-default, 200ms) var(--pa-transition-easing-default, ease);
  }
  
  &:focus {
    text-align: left;
    
    &::placeholder {
      opacity: 0;
    }
  }
}

[data-theme="dark"] .search-input {
  color: #cfd4d9;
  
  &::placeholder {
    color: #cfd4d9;
  }
}

.search-button {
  width: 42px;
  height: 42px;
  background: linear-gradient(-85.36deg, #c10505 7.68%, #d51e33 92.47%);
  border: none;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  flex-shrink: 0;
  transition: opacity var(--pa-transition-duration-default, 200ms) var(--pa-transition-easing-default, ease);
  
  &:hover {
    opacity: 0.9;
  }
  
  svg {
    width: 16px;
    height: 16px;
  }
}

.theme-toggle-container {
  display: flex;
  align-items: center;
}

.theme-toggle {
  background-color: #0e0e0f;
  border: 1px solid #222529;
  border-radius: 500px;
  height: 40px;
  width: 76px;
  padding: var(--pa-spacing-2, 2px);
  display: flex;
  align-items: center;
  position: relative;
  cursor: pointer;
  transition: all var(--pa-transition-duration-default, 200ms) var(--pa-transition-easing-default, ease);
}

.theme-toggle-slider {
  width: 36px;
  height: 36px;
  background: linear-gradient(-85.36deg, #c10505 7.68%, #d51e33 92.47%);
  border: 1px solid #c10505;
  border-radius: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform var(--pa-transition-duration-default, 200ms) var(--pa-transition-easing-default, ease);
  position: absolute;
  left: var(--pa-spacing-2, 2px);
  z-index: 2;
  
  &.is-dark {
    transform: translateX(0);
  }
  
  &:not(.is-dark) {
    transform: translateX(36px);
  }
  
  svg {
    width: 16px;
    height: 16px;
  }
}

.theme-toggle-icon {
  position: absolute;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
  
  &.theme-toggle-icon-light {
    left: var(--pa-spacing-2, 2px);
  }
  
  &.theme-toggle-icon-dark {
    right: var(--pa-spacing-2, 2px);
  }
  
  svg {
    width: 16px;
    height: 16px;
  }
}

.content-area {
  flex: 1;
  background-color: var(--pa-color-surface-container-background, #151517);
  border-radius: var(--pa-Border-radius-100, 8px);
  padding: var(--pa-spacing-36, 36px);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--pa-spacing-10, 10px);
  overflow-y: auto;
  overflow-x: hidden;
  position: relative;
  transition: background-color var(--pa-transition-duration-default, 200ms) var(--pa-transition-easing-default, ease);
}


.content-header {
  display: flex;
  flex-direction: column;
  gap: var(--pa-spacing-10, 10px);
  flex-shrink: 0;
  margin-bottom: var(--pa-spacing-24, 24px);
  width: 1000px;
}

.content-title {
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 36px;
  line-height: normal;
  color: var(--pa-color-surface-container-text, #212529);
  text-transform: uppercase;
  white-space: nowrap;
  margin: 0;
  transition: color var(--pa-transition-duration-default, 200ms) var(--pa-transition-easing-default, ease);
}

[data-theme="dark"] .content-title {
  color: #ffffff;
}

.content-body {
  display: flex;
  flex-direction: column;
  gap: var(--pa-spacing-10, 10px);
  flex: 1;
  min-height: 0;
  position: relative;
  width: 1000px;
}

.component-docs {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: var(--pa-spacing-24, 24px);
  padding-bottom: var(--pa-spacing-48, 48px);
}

.component-section {
  display: flex;
  flex-direction: column;
  gap: var(--pa-spacing-24, 24px);
}

.component-name {
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: var(--pa-font-size-500, 24px);
  color: var(--pa-color-surface-container-text, #212529);
  margin: 0;
  transition: color var(--pa-transition-duration-default, 200ms) var(--pa-transition-easing-default, ease);
}

[data-theme="dark"] .component-name {
  color: #ffffff;
}

.component-description {
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  font-size: var(--pa-font-size-200, 16px);
  color: var(--pa-color-surface-container-text-secondary, #6c757d);
  line-height: 1.5;
  margin: 0;
  transition: color var(--pa-transition-duration-default, 200ms) var(--pa-transition-easing-default, ease);
}

[data-theme="dark"] .component-description {
  color: #cfd4d9;
}

.component-examples {
  display: flex;
  flex-direction: column;
  gap: var(--pa-spacing-24, 24px);
}

.example-tabs {
  display: flex;
  gap: var(--pa-spacing-8, 8px);
  margin-bottom: var(--pa-spacing-24, 24px);
  border-bottom: 1px solid var(--pa-color-surface-container-border, #dee2e6);
  padding-bottom: var(--pa-spacing-8, 8px);
  transition: border-color var(--pa-transition-duration-default, 200ms) var(--pa-transition-easing-default, ease);
}

[data-theme="dark"] .example-tabs {
  border-bottom-color: #222529;
}

.example-tab {
  background: none;
  border: none;
  padding: var(--pa-spacing-8, 8px) var(--pa-spacing-16, 16px);
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: var(--pa-font-size-200, 16px);
  color: var(--pa-color-surface-container-text-secondary, #6c757d);
  cursor: pointer;
  transition: color var(--pa-transition-duration-default, 200ms) var(--pa-transition-easing-default, ease);
  position: relative;
  
  &:hover {
    color: var(--pa-color-surface-container-text-hover, #495057);
  }
  
  &.is-active {
    color: var(--pa-color-surface-container-text, #212529);
    
    &::after {
      content: '';
      position: absolute;
      bottom: calc(-1 * var(--pa-spacing-8, 8px) - 1px);
      left: 0;
      right: 0;
      height: 2px;
      background: linear-gradient(-85.36deg, #c10505 7.68%, #d51e33 92.47%);
    }
  }
}

[data-theme="dark"] .example-tab {
  color: #6e757c;
  
  &:hover {
    color: #cfd4d9;
  }
  
  &.is-active {
    color: #ffffff;
  }
}

.component-example-showcase {
  display: flex;
  flex-direction: column;
  gap: var(--pa-spacing-16, 16px);
  margin-bottom: var(--pa-spacing-24, 24px);
}

.example-preview-container {
  background-color: var(--pa-color-surface-base-background, #f7f7f8);
  border: 1px solid var(--pa-color-surface-container-border, #e9ecef);
  border-radius: var(--pa-Border-radius-100, 8px);
  padding: var(--pa-spacing-24, 24px);
  position: relative;
  transition: background-color var(--pa-transition-duration-default, 200ms) var(--pa-transition-easing-default, ease), border-color var(--pa-transition-duration-default, 200ms) var(--pa-transition-easing-default, ease);
}

[data-theme="dark"] .example-preview-container {
  background-color: #0e0e0f;
  border-color: #222529;
}

.example-preview {
  min-height: 80px;
  display: flex;
  align-items: center;
}

.show-code-button {
  position: absolute;
  top: var(--pa-spacing-16, 16px);
  right: var(--pa-spacing-16, 16px);
  background: none;
  border: 1px solid var(--pa-color-surface-container-border, #dee2e6);
  border-radius: var(--pa-Border-radius-50, 4px);
  padding: var(--pa-spacing-6, 6px) var(--pa-spacing-12, 12px);
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: var(--pa-font-size-100, 14px);
  color: var(--pa-color-surface-container-text-secondary, #6c757d);
  cursor: pointer;
  transition: all var(--pa-transition-duration-default, 200ms) var(--pa-transition-easing-default, ease);
  
  &:hover {
    background-color: var(--pa-color-surface-container-border, #dee2e6);
    color: var(--pa-color-surface-container-text, #212529);
  }
}

[data-theme="dark"] .show-code-button {
  border-color: #222529;
  color: #cfd4d9;
  
  &:hover {
    background-color: #222529;
    color: #ffffff;
  }
}

.code-preview {
  margin-top: var(--pa-spacing-8, 8px);
}

.section-title {
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: var(--pa-font-size-200, 16px);
  color: var(--pa-color-surface-container-text, #212529);
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  transition: color var(--pa-transition-duration-default, 200ms) var(--pa-transition-easing-default, ease);
}

[data-theme="dark"] .section-title {
  color: #eaecef;
}

.documentation-section {
  margin-top: var(--pa-spacing-32, 32px);
  
  &:first-of-type {
    margin-top: var(--pa-spacing-24, 24px);
  }
}

.documentation-section-title {
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: var(--pa-font-size-300, 20px);
  color: var(--pa-color-surface-container-text, #212529);
  margin: 0 0 var(--pa-spacing-8, 8px) 0;
  transition: color var(--pa-transition-duration-default, 200ms) var(--pa-transition-easing-default, ease);
}

[data-theme="dark"] .documentation-section-title {
  color: #ffffff;
}

.documentation-section-description {
  font-family: 'Inter', sans-serif;
  font-size: var(--pa-font-size-100, 14px);
  color: var(--pa-color-surface-container-text-secondary, #6c757d);
  line-height: 1.6;
  margin: 0 0 var(--pa-spacing-16, 16px) 0;
  transition: color var(--pa-transition-duration-default, 200ms) var(--pa-transition-easing-default, ease);
}

[data-theme="dark"] .documentation-section-description {
  color: #cfd4d9;
}

.component-usage {
  h4 {
    transition: color var(--pa-transition-duration-default, 200ms) var(--pa-transition-easing-default, ease);
  }
  
  p, li {
    transition: color var(--pa-transition-duration-default, 200ms) var(--pa-transition-easing-default, ease);
  }
  
  strong {
    transition: color var(--pa-transition-duration-default, 200ms) var(--pa-transition-easing-default, ease);
  }
  
  ul {
    border-color: var(--pa-color-surface-container-border, #dee2e6);
    transition: border-color var(--pa-transition-duration-default, 200ms) var(--pa-transition-easing-default, ease);
  }
}

[data-theme="dark"] .component-usage {
  h4 {
    color: #eaecef;
  }
  
  p, li {
    color: #cfd4d9;
  }
  
  strong {
    color: #ffffff;
  }
  
  > div:last-child {
    border-top-color: #222529;
  }
}

.example-group {
  display: flex;
  flex-direction: column;
  gap: var(--pa-spacing-16, 16px);
  padding: var(--pa-spacing-24, 24px);
  background-color: var(--pa-color-surface-base-background, #f7f7f8);
  border: 1px solid var(--pa-color-surface-container-border, #dee2e6);
  border-radius: var(--pa-Border-radius-100, 8px);
  transition: background-color var(--pa-transition-duration-default, 200ms) var(--pa-transition-easing-default, ease), border-color var(--pa-transition-duration-default, 200ms) var(--pa-transition-easing-default, ease);
}

[data-theme="dark"] .example-group {
  background-color: #0e0e0f;
  border-color: #222529;
}

.example-item {
  display: flex;
  flex-direction: column;
  gap: var(--pa-spacing-8, 8px);
  
  label {
    font-family: 'Inter', sans-serif;
    font-weight: 500;
    font-size: var(--pa-font-size-100, 14px);
    color: var(--pa-color-surface-container-text-secondary, #6c757d);
    text-transform: uppercase;
    letter-spacing: 0.5px;
    transition: color var(--pa-transition-duration-default, 200ms) var(--pa-transition-easing-default, ease);
  }
}

[data-theme="dark"] .example-item label {
  color: #6e757c;
}

.component-preview {
  display: flex;
  align-items: center;
  min-height: 48px;
  padding: var(--pa-spacing-8, 8px) 0;
}

.component-props {
  display: flex;
  flex-direction: column;
  gap: var(--pa-spacing-16, 16px);
}

.props-table {
  width: 100%;
  border-collapse: collapse;
  font-family: 'Inter', sans-serif;
  font-size: var(--pa-font-size-100, 14px);
  
  thead {
    background-color: #0e0e0f;
    border-bottom: 1px solid #222529;
  }
  
  th {
    padding: var(--pa-spacing-12, 12px) var(--pa-spacing-16, 16px);
    text-align: left;
    font-weight: 600;
    color: #eaecef;
    font-size: var(--pa-font-size-100, 14px);
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
  
  td {
    padding: var(--pa-spacing-12, 12px) var(--pa-spacing-16, 16px);
    color: #cfd4d9;
    border-bottom: 1px solid #222529;
    
    code {
      background-color: #0e0e0f;
      padding: var(--pa-spacing-2, 2px) var(--pa-spacing-8, 8px);
      border-radius: var(--pa-Border-radius-50, 4px);
      font-family: 'Roboto Mono', monospace;
      font-size: var(--pa-font-size-100, 14px);
      color: #eaecef;
    }
  }
  
  tbody tr:last-child td {
    border-bottom: none;
  }
}

.component-usage {
  display: flex;
  flex-direction: column;
  gap: var(--pa-spacing-16, 16px);
}

.code-block {
  background-color: var(--pa-color-surface-base-background, #f7f7f8);
  border: 1px solid var(--pa-color-surface-container-border, #e9ecef);
  border-radius: var(--pa-Border-radius-100, 8px);
  padding: 0;
  overflow-x: auto;
  margin: 0;
  position: relative;
  transition: background-color var(--pa-transition-duration-default, 200ms) var(--pa-transition-easing-default, ease), border-color var(--pa-transition-duration-default, 200ms) var(--pa-transition-easing-default, ease);
  
  &:hover .copy-code-button {
    opacity: 1;
  }
  
  code {
    display: block;
    font-family: 'Roboto Mono', 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
    font-size: var(--pa-font-size-100, 14px);
    line-height: 1.6;
    white-space: pre;
    padding: var(--pa-spacing-24, 24px);
    padding-left: calc(48px + var(--pa-spacing-16, 16px));
    padding-right: calc(var(--pa-spacing-12, 12px) + 80px);
    margin: 0;
    color: var(--pa-color-surface-container-text, #495057);
    transition: color var(--pa-transition-duration-default, 200ms) var(--pa-transition-easing-default, ease);
    background-color: transparent;
    background-image: 
      linear-gradient(
        to right,
        transparent 0,
        transparent 48px,
        var(--pa-color-surface-container-border, #e9ecef) 48px,
        var(--pa-color-surface-container-border, #e9ecef) 49px,
        transparent 49px
      );
    background-clip: padding-box;
    position: relative;
    z-index: 1;
    
    &::selection {
      background-color: rgba(193, 5, 5, 0.2);
    }
  }
  
  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 48px;
    background-color: var(--pa-color-surface-container-background, #ffffff);
    border-right: 1px solid var(--pa-color-surface-container-border, #e9ecef);
    border-radius: var(--pa-Border-radius-100, 8px) 0 0 var(--pa-Border-radius-100, 8px);
    transition: background-color var(--pa-transition-duration-default, 200ms) var(--pa-transition-easing-default, ease), border-color var(--pa-transition-duration-default, 200ms) var(--pa-transition-easing-default, ease);
    z-index: 0;
  }
}

[data-theme="dark"] .code-block {
  background-color: #0e0e0f;
  border-color: #222529;
  
  code {
    color: #cfd4d9;
    background-image: 
      linear-gradient(
        to right,
        transparent 0,
        transparent 48px,
        #222529 48px,
        #222529 49px,
        transparent 49px
      );
  }
  
  &::before {
    background-color: #151517;
    border-color: #222529;
  }
}

.copy-code-button {
  position: absolute;
  top: var(--pa-spacing-12, 12px);
  right: var(--pa-spacing-12, 12px);
  background-color: var(--pa-color-surface-container-background, #ffffff);
  border: 1px solid var(--pa-color-surface-container-border, #e9ecef);
  border-radius: var(--pa-Border-radius-50, 4px);
  padding: var(--pa-spacing-6, 6px) var(--pa-spacing-10, 10px);
  font-family: 'Inter', sans-serif;
  font-size: var(--pa-font-size-100, 14px);
  font-weight: 500;
  color: var(--pa-color-surface-container-text-secondary, #6c757d);
  cursor: pointer;
  opacity: 0;
  transition: all var(--pa-transition-duration-default, 200ms) var(--pa-transition-easing-default, ease);
  z-index: 10;
  display: flex;
  align-items: center;
  gap: var(--pa-spacing-6, 6px);
  
  &:hover {
    background-color: var(--pa-color-surface-container-border, #e9ecef);
    color: var(--pa-color-surface-container-text, #212529);
    border-color: var(--pa-color-surface-container-border, #e9ecef);
  }
  
  &:active {
    transform: scale(0.98);
  }
  
  svg {
    width: 16px;
    height: 16px;
    flex-shrink: 0;
  }
}

[data-theme="dark"] .copy-code-button {
  background-color: #151517;
  border-color: #222529;
  color: #cfd4d9;
  
  &:hover {
    background-color: #222529;
    color: #ffffff;
    border-color: #222529;
  }
}

.version-badge {
  position: absolute;
  bottom: var(--pa-spacing-24, 24px);
  right: var(--pa-spacing-24, 24px);
  background-color: #0e0e0f;
  border: 1px solid #222529;
  border-radius: 100px;
  padding: var(--pa-spacing-10, 10px) var(--pa-spacing-16, 16px);
  font-family: 'Roboto', sans-serif;
  font-weight: 600;
  font-size: var(--pa-font-size-200, 16px);
  line-height: normal;
  color: #cfd4d9;
  white-space: nowrap;
  font-variation-settings: 'wdth' 100;
}
</style>

