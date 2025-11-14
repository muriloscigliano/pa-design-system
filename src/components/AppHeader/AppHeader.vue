<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { navigation } from '../../config/navigation'
import darkModeIcon from '../../assets/dark-mode-icon.svg'
import lightModeIcon from '../../assets/light-mode-icon.svg'

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
          <img v-if="currentTheme === 'dark'" :src="darkModeIcon" alt="Dark mode" width="16" height="16" />
          <img v-else :src="lightModeIcon" alt="Light mode" width="20" height="20" />
        </div>
        <div class="theme-toggle-icon theme-toggle-icon-dark">
          <img :src="darkModeIcon" alt="Dark mode" width="16" height="16" />
        </div>
        <div class="theme-toggle-icon theme-toggle-icon-light">
          <img :src="lightModeIcon" alt="Light mode" width="20" height="20" />
        </div>
      </button>
    </div>
  </header>
</template>

<style lang="scss" scoped>
.main-header {
  background-color: var(--pa-app-header-background);
  border-radius: var(--pa-app-header-border-radius);
  padding: var(--pa-app-header-padding-y) var(--pa-app-header-padding-x);
  height: 139px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-shrink: 0;
  transition: background-color var(--pa-app-header-transition-duration-default) var(--pa-app-header-transition-easing-default);
}

.search-container {
  backdrop-filter: blur(20px);
  background-color: var(--pa-app-header-search-container-background);
  border: var(--pa-border-width-thin) solid var(--pa-app-header-search-container-border);
  border-radius: var(--pa-app-header-search-container-border-radius);
  display: flex;
  gap: var(--pa-app-header-search-container-gap);
  align-items: center;
  padding: var(--pa-app-header-search-container-padding-y) var(--pa-app-header-search-container-padding-x);
  height: 32px;
  width: 300px;
  transition: background-color var(--pa-app-header-transition-duration-default) var(--pa-app-header-transition-easing-default), border-color var(--pa-app-header-transition-duration-default) var(--pa-app-header-transition-easing-default);
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
  font-size: var(--pa-app-header-search-input-font-size);
  line-height: 0.965;
  color: var(--pa-color-surface-container-text);
  padding: var(--pa-app-header-search-input-padding-y) var(--pa-app-header-search-input-padding-x);
  min-width: 0;
  border-radius: var(--pa-app-header-search-container-border-radius);
  text-align: center;
  transition: color var(--pa-app-header-transition-duration-default) var(--pa-app-header-transition-easing-default);
  
  &::placeholder {
    color: var(--pa-color-surface-container-text-secondary);
    text-align: center;
    white-space: nowrap;
    transition: color var(--pa-app-header-transition-duration-default) var(--pa-app-header-transition-easing-default);
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
  border-radius: var(--pa-border-radius-full);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  flex-shrink: 0;
  transition: opacity var(--pa-app-header-transition-duration-default) var(--pa-app-header-transition-easing-default);
  
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
  background-color: var(--pa-app-header-theme-toggle-background);
  border: var(--pa-border-width-thin) solid var(--pa-app-header-theme-toggle-border);
  border-radius: var(--pa-app-header-theme-toggle-border-radius);
  height: 40px;
  width: 76px;
  padding: var(--pa-app-header-theme-toggle-padding);
  display: flex;
  align-items: center;
  position: relative;
  cursor: pointer;
  transition: background-color var(--pa-app-header-transition-duration-default) var(--pa-app-header-transition-easing-default), border-color var(--pa-app-header-transition-duration-default) var(--pa-app-header-transition-easing-default);
}

[data-theme="dark"] .theme-toggle {
  background-color: #0e0e0f;
  border-color: #222529;
}

.theme-toggle-slider {
  width: 36px;
  height: 36px;
  background: linear-gradient(-85.36deg, #c10505 7.68%, #d51e33 92.47%);
  border: var(--pa-border-width-thin) solid #c10505;
  border-radius: var(--pa-app-header-theme-toggle-border-radius);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform var(--pa-app-header-transition-duration-default) var(--pa-app-header-transition-easing-default);
  position: absolute;
  left: var(--pa-app-header-theme-toggle-slider-spacing-left);
  z-index: 2;
  
  &.is-dark {
    transform: translateX(0);
  }
  
  &:not(.is-dark) {
    transform: translateX(36px);
  }
  
  img {
    width: 16px;
    height: 16px;
    display: block;
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
  
  &.theme-toggle-icon-dark {
    left: var(--pa-app-header-theme-toggle-slider-spacing-left);
    
    img {
      width: 16px;
      height: 16px;
    }
  }
  
  &.theme-toggle-icon-light {
    right: var(--pa-app-header-theme-toggle-slider-spacing-right);
    
    img {
      width: 20px;
      height: 20px;
    }
  }
  
  img {
    display: block;
  }
}
</style>

