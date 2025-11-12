<script setup lang="ts">
import { ref, nextTick, onMounted } from 'vue'
import { setTheme, getTheme } from './utils/theme'
import { PaButton } from './components'

const currentTheme = ref<'light' | 'dark'>(getTheme())
const searchQuery = ref('')
const activeComponent = ref('pabutton')

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

const navigation = {
  'get-started': {
    title: 'Get starter',
    items: [
      { label: 'Introduction', id: 'introduction' },
      { label: 'Installation', id: 'installation' },
      { label: 'Theming', id: 'theming' }
    ]
  },
  'buttons': {
    title: 'Buttons',
    items: [
      { label: 'PaButton', id: 'pabutton' },
      { label: 'PaActionButton', id: 'paactionbutton' },
      { label: 'PaActionButtonGroup', id: 'paactionbuttongroup' }
    ]
  }
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
          <h1 class="content-title">Buttons</h1>
        </div>
        <div class="content-body">
          <div class="component-docs">
            <div v-if="activeComponent === 'pabutton'" class="component-section">
              <h2 class="component-name">PaButton</h2>
              <p class="component-description">
                A versatile button component with multiple variants and sizes for different use cases.
              </p>
              
              <div class="component-examples">
                <h3 class="section-title">Variants</h3>
                <div class="example-group">
                  <div class="example-item">
                    <label>Primary</label>
                    <PaButton variant="primary">Primary Button</PaButton>
                  </div>
                  <div class="example-item">
                    <label>Secondary</label>
                    <PaButton variant="secondary">Secondary Button</PaButton>
                  </div>
                  <div class="example-item">
                    <label>Tertiary</label>
                    <PaButton variant="tertiary">Tertiary Button</PaButton>
                  </div>
                  <div class="example-item">
                    <label>Payment Navigation</label>
                    <PaButton variant="payment-navigation">Payment Nav</PaButton>
                  </div>
                  <div class="example-item">
                    <label>Action</label>
                    <PaButton variant="action">Action Button</PaButton>
                  </div>
                </div>
                
                <h3 class="section-title">Sizes</h3>
                <div class="example-group">
                  <div class="example-item">
                    <label>Small</label>
                    <PaButton variant="primary" size="sm">Small Button</PaButton>
                  </div>
                  <div class="example-item">
                    <label>Medium (Default)</label>
                    <PaButton variant="primary" size="md">Medium Button</PaButton>
                  </div>
                  <div class="example-item">
                    <label>Large</label>
                    <PaButton variant="primary" size="lg">Large Button</PaButton>
                  </div>
                </div>
                
                <h3 class="section-title">States</h3>
                <div class="example-group">
                  <div class="example-item">
                    <label>Default</label>
                    <PaButton variant="primary">Default</PaButton>
                  </div>
                  <div class="example-item">
                    <label>Disabled</label>
                    <PaButton variant="primary" :disabled="true">Disabled</PaButton>
                  </div>
                </div>
              </div>
              
              <div class="component-props">
                <h3 class="section-title">Props</h3>
                <table class="props-table">
                  <thead>
                    <tr>
                      <th>Prop</th>
                      <th>Type</th>
                      <th>Default</th>
                      <th>Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><code>variant</code></td>
                      <td><code>'primary' | 'secondary' | 'tertiary' | 'payment-navigation' | 'action'</code></td>
                      <td><code>'primary'</code></td>
                      <td>Button style variant</td>
                    </tr>
                    <tr>
                      <td><code>size</code></td>
                      <td><code>'sm' | 'md' | 'lg'</code></td>
                      <td><code>'md'</code></td>
                      <td>Button size</td>
                    </tr>
                    <tr>
                      <td><code>disabled</code></td>
                      <td><code>boolean</code></td>
                      <td><code>false</code></td>
                      <td>Disables the button</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              <div class="component-usage">
                <h3 class="section-title">Usage</h3>
                <pre class="code-block"><code>&lt;PaButton variant="primary" size="md"&gt;
  Click Me
&lt;/PaButton&gt;

&lt;PaButton variant="secondary" :disabled="false"&gt;
  Secondary Action
&lt;/PaButton&gt;</code></pre>
              </div>
            </div>
            
            <div v-if="activeComponent === 'paactionbutton'" class="component-section">
              <h2 class="component-name">PaActionButton</h2>
              <p class="component-description">Coming soon...</p>
            </div>
            
            <div v-if="activeComponent === 'paactionbuttongroup'" class="component-section">
              <h2 class="component-name">PaActionButtonGroup</h2>
              <p class="component-description">Coming soon...</p>
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
  background: linear-gradient(90deg, transparent, #222529, transparent);
  transform: rotate(90deg);
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
