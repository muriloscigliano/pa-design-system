<script setup lang="ts">
defineProps<{
  title?: string
  description?: string
}>()
</script>

<template>
  <div class="pa-section-container">
    <div v-if="title || description || $slots.header" class="pa-section-container-header">
      <slot name="header">
        <div class="pa-section-container-header-content">
          <h2 v-if="title" class="pa-section-container-title">{{ title }}</h2>
          <p v-if="description" class="pa-section-container-description">{{ description }}</p>
        </div>
        <div v-if="$slots.actions" class="pa-section-container-actions">
          <slot name="actions" />
        </div>
      </slot>
    </div>
    <div class="pa-section-container-content">
      <slot />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.pa-section-container {
  background-color: var(--pa-section-container-background, var(--pa-color-surface-container-background));
  border: var(--pa-Border-width-50, 1px) solid var(--pa-section-container-border, var(--pa-color-surface-container-border));
  border-radius: var(--pa-section-container-border-radius, var(--pa-Border-radius-100, 8px));
  padding: var(--pa-section-container-padding-y) var(--pa-section-container-padding-x);
  width: 100%;
}

.pa-section-container-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: var(--pa-spacing-16, 16px);
  padding-bottom: var(--pa-section-container-spacing-header, var(--pa-spacing-16, 16px));
  border-bottom: var(--pa-Border-width-50, 1px) solid var(--pa-section-container-header-border, var(--pa-color-surface-base-divider));
  margin-bottom: var(--pa-section-container-spacing-content, var(--pa-spacing-24, 24px));
}

.pa-section-container-header-content {
  flex: 1;
}

.pa-section-container-title {
  margin: 0 0 var(--pa-spacing-4, 4px) 0;
  font-family: var(--pa-font-family-roboto, Roboto, sans-serif);
  font-size: var(--pa-font-size-500, 24px);
  font-weight: var(--pa-font-weight-700, 700);
  color: var(--pa-color-surface-container-text, var(--pa-gray-900, #212529));
}

.pa-section-container-description {
  margin: 0;
  font-family: var(--pa-font-family-roboto, Roboto, sans-serif);
  font-size: var(--pa-font-size-200, 16px);
  font-weight: var(--pa-font-weight-400, 400);
  color: var(--pa-gray-500, #adb5bd);
}

.pa-section-container-actions {
  display: flex;
  gap: var(--pa-spacing-8, 8px);
  flex-shrink: 0;
}

.pa-section-container-content {
  width: 100%;
}
</style>

