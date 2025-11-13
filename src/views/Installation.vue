<script setup lang="ts">
import { CodeBlock } from '../components'

const installationCode = `# Install dependencies
npm install

# Build tokens (runs automatically before dev)
npm run build:tokens

# Start development server
npm run dev

# Build for production
npm run build`
</script>

<template>
  <div class="component-section">
    <h2 class="component-name">Installation</h2>
    <p class="component-description">
      Get started with the PA Design System by installing the package and importing components.
    </p>
    <div class="component-usage">
      <h3 class="section-title">Installation Steps</h3>
      <CodeBlock 
        :code="installationCode" 
        copy-key="installation"
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

