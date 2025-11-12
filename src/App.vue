<script setup lang="ts">
import { ref, nextTick, onMounted, computed } from 'vue'
import { setTheme, getTheme } from './utils/theme'

const currentTheme = ref<'light' | 'dark'>(getTheme())
const searchQuery = ref('')
const activeComponent = ref('introduction')

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

const getComponentDescription = (componentId: string): string => {
  const descriptions: Record<string, string> = {
    'pabutton': 'A versatile button component with multiple variants and sizes for different use cases.',
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

const selectComponent = (id: string) => {
  activeComponent.value = id
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
          <svg width="45" height="40" viewBox="0 0 45 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.5 0L45 40H0L22.5 0Z" fill="white"/>
          </svg>
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
                <pre class="code-block"><code># Install dependencies
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
                <pre class="code-block"><code>import { setTheme, getTheme } from './utils/theme'

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
              <div class="component-examples">
                <h3 class="section-title">Examples</h3>
                <div class="example-group">
                  <div class="example-item">
                    <p style="color: var(--pa-color-surface-container-text, #cfd4d9);">
                      Component examples and documentation coming soon. Use the component in your project by importing it:
                    </p>
                    <pre class="code-block" style="margin-top: var(--pa-spacing-16, 16px);"><code>import { {{ activeComponentData.label }} } from './components'

&lt;{{ activeComponentData.label }} /&gt;</code></pre>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div class="version-badge">v2.0</div>
        </div>
      </div>
    </main>
  </div>
</template>

<style lang="scss" scoped>
.app-layout {
  display: flex;
  gap: var(--pa-spacing-4, 4px);
  align-items: flex-start;
  padding: var(--pa-spacing-6, 6px);
  background-color: var(--pa-color-surface-base-background, #000000);
  min-height: 100vh;
  width: 100%;
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
  overflow: hidden;
  transition: background-color var(--pa-transition-duration-default, 200ms) var(--pa-transition-easing-default, ease);
}

.sidebar-logo {
  display: flex;
  align-items: center;
  justify-content: center;
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
  
  svg {
    width: 45px;
    height: 40px;
  }
}

.sidebar-divider {
  width: 100%;
  height: 1px;
  background: #000000;
  width: 252px;
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
  color: #6e757c;
  text-transform: uppercase;
  margin: 0;
  white-space: nowrap;
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
    background: linear-gradient(180deg, transparent, #222529, transparent);
  }
}

.nav-item {
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: var(--pa-font-size-200, 16px);
  line-height: normal;
  color: #eaecef;
  white-space: nowrap;
  cursor: pointer;
  transition: color var(--pa-transition-duration-default, 200ms) var(--pa-transition-easing-default, ease);
  
  &:hover {
    color: #cfd4d9;
  }
  
  &.is-active {
    color: #cfd4d9;
    font-weight: 600;
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
  background-color: #0e0e0f;
  border: 1px solid #222529;
  border-radius: 250px;
  display: flex;
  gap: var(--pa-spacing-8, 8px);
  align-items: center;
  padding: var(--pa-spacing-12, 12px) var(--pa-spacing-4, 4px);
  height: 48px;
  width: 300px;
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
  color: #cfd4d9;
  padding: var(--pa-spacing-8, 8px) var(--pa-spacing-18, 18px);
  min-width: 0;
  
  &::placeholder {
    color: #cfd4d9;
    text-align: center;
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
  gap: var(--pa-spacing-10, 10px);
  overflow: hidden;
  position: relative;
  transition: background-color var(--pa-transition-duration-default, 200ms) var(--pa-transition-easing-default, ease);
}

.content-header {
  display: flex;
  flex-direction: column;
  gap: var(--pa-spacing-10, 10px);
  flex: 1;
  min-height: 0;
}

.content-title {
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 36px;
  line-height: normal;
  color: #ffffff;
  text-transform: uppercase;
  white-space: nowrap;
  margin: 0;
}

.content-body {
  display: flex;
  flex-direction: column;
  gap: var(--pa-spacing-10, 10px);
  height: 100%;
  position: relative;
  overflow-y: auto;
  width: 1380px;
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
  color: #ffffff;
  margin: 0;
}

.component-description {
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  font-size: var(--pa-font-size-200, 16px);
  color: #cfd4d9;
  line-height: 1.5;
  margin: 0;
}

.component-examples {
  display: flex;
  flex-direction: column;
  gap: var(--pa-spacing-24, 24px);
}

.section-title {
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: var(--pa-font-size-200, 16px);
  color: #eaecef;
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.example-group {
  display: flex;
  flex-direction: column;
  gap: var(--pa-spacing-16, 16px);
  padding: var(--pa-spacing-24, 24px);
  background-color: #0e0e0f;
  border: 1px solid #222529;
  border-radius: var(--pa-Border-radius-100, 8px);
}

.example-item {
  display: flex;
  flex-direction: column;
  gap: var(--pa-spacing-8, 8px);
  
  label {
    font-family: 'Inter', sans-serif;
    font-weight: 500;
    font-size: var(--pa-font-size-100, 14px);
    color: #6e757c;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
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
  background-color: #0e0e0f;
  border: 1px solid #222529;
  border-radius: var(--pa-Border-radius-100, 8px);
  padding: var(--pa-spacing-24, 24px);
  overflow-x: auto;
  margin: 0;
  
  code {
    font-family: 'Roboto Mono', monospace;
    font-size: var(--pa-font-size-100, 14px);
    color: #cfd4d9;
    line-height: 1.6;
    white-space: pre;
  }
}

.version-badge {
  position: absolute;
  bottom: var(--pa-spacing-36, 36px);
  right: var(--pa-spacing-36, 36px);
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
