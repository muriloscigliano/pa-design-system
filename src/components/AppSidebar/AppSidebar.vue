<script setup lang="ts">
import { useRoute } from 'vue-router'
import { navigation } from '../../config/navigation'
import logoSvg from '../../assets/pa-desing-system-logo.svg'

const route = useRoute()

const getRoutePath = (id: string): string => {
  if (['introduction', 'installation', 'theming'].includes(id)) {
    return `/${id}`
  }
  return `/components/${id}`
}

const isActive = (id: string): boolean => {
  return route.name === id || route.path === getRoutePath(id)
}
</script>

<template>
  <aside class="sidebar">
    <div class="sidebar-logo">
      <router-link to="/" class="logo-link">
        <div class="logo-circle">
          <img :src="logoSvg" alt="PA Design System Logo" class="logo-image" />
        </div>
      </router-link>
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
            :class="{ 'is-active': isActive(item.id) }"
          >
            <router-link :to="getRoutePath(item.id)" class="nav-link">
              {{ item.label }}
            </router-link>
          </li>
        </ul>
      </div>
    </nav>
  </aside>
</template>

<style lang="scss" scoped>
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
  white-space: nowrap;
}

.nav-link {
  color: var(--pa-color-surface-container-text, #212529);
  text-decoration: none;
  cursor: pointer;
  transition: color var(--pa-transition-duration-default, 200ms) var(--pa-transition-easing-default, ease);
  display: block;
  
  &:hover {
    color: var(--pa-color-surface-container-text-hover, #495057);
  }
}

.nav-item.is-active .nav-link {
  color: var(--pa-color-surface-container-text-active, #212529);
  font-weight: 600;
}

.logo-link {
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
}

[data-theme="dark"] .nav-link {
  color: #eaecef;
  
  &:hover {
    color: #cfd4d9;
  }
}

[data-theme="dark"] .nav-item.is-active .nav-link {
  color: #cfd4d9;
}
</style>

