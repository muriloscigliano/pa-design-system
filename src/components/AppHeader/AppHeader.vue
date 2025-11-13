<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { navigation } from '../../config/navigation'

interface Props {
  currentTheme: 'light' | 'dark'
}

defineProps<Props>()

const emit = defineEmits<{
  toggleTheme: []
}>()

const router = useRouter()
const searchQuery = ref('')

const handleSearch = () => {
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase().trim()
    const allComponents = Object.values(navigation).flatMap(section => section.items)
    const found = allComponents.find(item => 
      item.label.toLowerCase().includes(query)
    )
    if (found) {
      if (['introduction', 'installation', 'theming'].includes(found.id)) {
        router.push(`/${found.id}`)
      } else {
        router.push(`/components/${found.id}`)
      }
      searchQuery.value = ''
    }
  }
}

const handleSearchKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Enter') {
    handleSearch()
  }
}

const handleToggleTheme = () => {
  emit('toggleTheme')
}
</script>

<template>
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
        @click="handleToggleTheme"
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
</template>

<style lang="scss" scoped>
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
  background-color: var(--pa-color-surface-base-background, #f7f7f8);
  border: 1px solid var(--pa-color-surface-container-border, #dee2e6);
  border-radius: 500px;
  height: 40px;
  width: 76px;
  padding: var(--pa-spacing-2, 2px);
  display: flex;
  align-items: center;
  position: relative;
  cursor: pointer;
  transition: background-color var(--pa-transition-duration-default, 200ms) var(--pa-transition-easing-default, ease), border-color var(--pa-transition-duration-default, 200ms) var(--pa-transition-easing-default, ease);
}

[data-theme="dark"] .theme-toggle {
  background-color: #0e0e0f;
  border-color: #222529;
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
</style>

