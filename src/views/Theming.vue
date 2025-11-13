<script setup lang="ts">
import { CodeBlock } from '../components'

const themingCode = `import { setTheme, getTheme } from './utils/theme'

// Set theme
setTheme('dark') // or 'light'

// Get current theme
const currentTheme = getTheme()`
</script>

<template>
  <div class="component-section">
    <h2 class="component-name">Theming</h2>
    <p class="component-description">
      The PA Design System supports both light and dark themes through a comprehensive token system. Themes can be switched dynamically.
    </p>
    <div class="component-usage">
      <h3 class="section-title">Theme Usage</h3>
      <CodeBlock 
        :code="themingCode" 
        copy-key="theming"
        :show-line-numbers="true"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
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

.component-usage {
  display: flex;
  flex-direction: column;
  gap: var(--pa-spacing-16, 16px);
}
</style>

