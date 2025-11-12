<script setup lang="ts">
import { ref } from 'vue'
import { setTheme, getTheme } from './utils/theme'

const currentTheme = ref<'light' | 'dark'>(getTheme())
const searchQuery = ref('')

const navigation = {
  'get-started': [
    { label: 'Introduction', id: 'introduction' },
    { label: 'Installation', id: 'installation' },
    { label: 'Theming', id: 'theming' }
  ],
  'buttons': [
    { label: 'PaButton', id: 'pabutton' },
    { label: 'PaActionButton', id: 'paactionbutton' },
    { label: 'PaActionButtonGroup', id: 'paactionbuttongroup' }
  ]
}

const toggleTheme = () => {
  const newTheme = currentTheme.value === 'light' ? 'dark' : 'light'
  setTheme(newTheme)
  currentTheme.value = newTheme
}
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
        <div class="nav-section">
          <h3 class="nav-section-title">Get starter</h3>
          <ul class="nav-list">
            <li v-for="item in navigation['get-started']" :key="item.id" class="nav-item">
              {{ item.label }}
            </li>
          </ul>
        </div>
        
        <div class="nav-section">
          <h3 class="nav-section-title">Buttons</h3>
          <ul class="nav-list">
            <li v-for="item in navigation['buttons']" :key="item.id" class="nav-item">
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
          />
          <button class="search-button">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M7 12C9.76142 12 12 9.76142 12 7C12 4.23858 9.76142 2 7 2C4.23858 2 2 4.23858 2 7C2 9.76142 4.23858 12 7 12Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M14 14L10.5 10.5" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </div>
        
        <div class="theme-toggle-container">
          <button 
            class="theme-toggle"
            :class="{ 'is-dark': currentTheme === 'dark' }"
            @click="toggleTheme"
          >
            <div class="theme-toggle-slider" :class="{ 'is-dark': currentTheme === 'dark' }">
              <svg v-if="currentTheme === 'dark'" width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8 2V4M8 12V14M2 8H4M12 8H14M3.757 3.757L5.172 5.172M10.828 10.828L12.243 12.243M3.757 12.243L5.172 10.828M10.828 5.172L12.243 3.757" stroke="white" stroke-width="1.5" stroke-linecap="round"/>
              </svg>
              <svg v-else width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M10 3C6.13401 3 3 6.13401 3 10C3 13.866 6.13401 17 10 17C13.866 17 17 13.866 17 10C17 6.13401 13.866 3 10 3Z" fill="white"/>
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
  align-items: center;
  padding: var(--pa-spacing-6, 6px);
  background-color: #000000;
  min-height: 100vh;
  width: 100%;
}

.sidebar {
  background-color: #151517;
  border-radius: var(--pa-Border-radius-100, 8px);
  padding: var(--pa-spacing-24, 24px);
  width: 300px;
  height: 1105px;
  display: flex;
  flex-direction: column;
  gap: var(--pa-spacing-36, 36px);
  align-items: center;
  flex-shrink: 0;
  overflow: hidden;
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
}

.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: var(--pa-spacing-4, 4px);
  height: 100vh;
  min-width: 0;
}

.main-header {
  background-color: #151517;
  border-radius: var(--pa-Border-radius-100, 8px);
  padding: var(--pa-spacing-8, 8px) var(--pa-spacing-18, 18px);
  height: 139px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-shrink: 0;
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
  padding: var(--pa-spacing-2, 2px);
  display: flex;
  align-items: center;
  position: relative;
  cursor: pointer;
  transition: all var(--pa-transition-duration-default, 200ms) var(--pa-transition-easing-default, ease);
  
  &.is-dark {
    .theme-toggle-slider {
      transform: translateX(0);
    }
  }
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
  transform: translateX(0);
  
  &.is-dark {
    transform: translateX(0);
  }
  
  &:not(.is-dark) {
    transform: translateX(calc(100% + var(--pa-spacing-2, 2px)));
  }
  
  svg {
    width: 16px;
    height: 16px;
  }
}

.content-area {
  flex: 1;
  background-color: #151517;
  border-radius: var(--pa-Border-radius-100, 8px);
  padding: var(--pa-spacing-36, 36px);
  display: flex;
  flex-direction: column;
  gap: var(--pa-spacing-10, 10px);
  overflow: hidden;
  position: relative;
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
  align-items: center;
  justify-content: flex-end;
  position: relative;
}

.version-badge {
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
