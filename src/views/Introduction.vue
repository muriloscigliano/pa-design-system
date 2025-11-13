<template>
  <div class="component-section">
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
</style>

