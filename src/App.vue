<script setup lang="ts">
import { ref, nextTick, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { setTheme, getTheme } from './utils/theme'
import { AppSidebar } from './components/AppSidebar'
import { AppHeader } from './components/AppHeader'
import { navigation } from './config/navigation'

const currentTheme = ref<'light' | 'dark'>(getTheme())
const route = useRoute()

const activeSection = computed(() => {
  for (const section of Object.values(navigation)) {
    if (section.items.some(item => {
      const routeName = route.name as string
      return item.id === routeName || route.path === `/components/${item.id}` || route.path === `/${item.id}`
    })) {
      return section.title
    }
  }
  return 'Components'
})

const toggleTheme = () => {
  const newTheme = currentTheme.value === 'light' ? 'dark' : 'light'
  setTheme(newTheme)
  currentTheme.value = newTheme
  nextTick(() => {
    document.documentElement.setAttribute('data-theme', newTheme)
  })
}

onMounted(() => {
  const theme = getTheme()
  setTheme(theme)
  currentTheme.value = theme
})
</script>

<template>
  <div class="app-layout">
    <AppSidebar />
    
    <main class="main-content">
      <AppHeader 
        :current-theme="currentTheme"
        @toggle-theme="toggleTheme"
      />
      
      <div class="content-area">
        <div class="content-header">
          <h1 class="content-title">{{ activeSection }}</h1>
        </div>
        <div class="content-body">
          <router-view />
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
  transition: background-color var(--pa-transition-duration-default, 200ms) var(--pa-transition-easing-default, ease);
}

.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: var(--pa-spacing-4, 4px);
  height: calc(100vh - var(--pa-spacing-12, 12px));
  min-width: 0;
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
  min-height: 0;
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
  overflow-y: auto;
  overflow-x: hidden;
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
