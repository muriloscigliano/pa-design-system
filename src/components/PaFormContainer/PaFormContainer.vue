<script setup lang="ts">
defineProps<{
  title?: string
  description?: string
  variant?: 'default' | 'outlined' | 'elevated'
}>()
</script>

<template>
  <div
    :class="[
      'pa-form-container',
      `pa-form-container--${variant || 'default'}`
    ]"
  >
    <div v-if="title || description || $slots.header" class="pa-form-container-header">
      <slot name="header">
        <h2 v-if="title" class="pa-form-container-title">{{ title }}</h2>
        <p v-if="description" class="pa-form-container-description">{{ description }}</p>
      </slot>
    </div>
    <div class="pa-form-container-content">
      <slot />
    </div>
    <div v-if="$slots.footer" class="pa-form-container-footer">
      <slot name="footer" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.pa-form-container {
  background-color: var(--pa-form-container-background, var(--pa-color-surface-container-background));
  border-radius: var(--pa-form-container-border-radius, var(--pa-Border-radius-100, 8px));
  padding: var(--pa-form-container-padding-y) var(--pa-form-container-padding-x);
  width: 100%;

  &--outlined {
    border: var(--pa-Border-width-50, 1px) solid var(--pa-form-container-border, var(--pa-color-surface-container-border));
  }

  &--elevated {
    box-shadow: var(--pa-shadow-md, var(--pa-shadow-md));
  }
}

.pa-form-container-header {
  padding-bottom: var(--pa-form-container-header-padding-bottom);
  border-bottom: var(--pa-Border-width-50, 1px) solid var(--pa-form-container-header-border, var(--pa-color-surface-base-divider));
  margin-bottom: var(--pa-form-container-spacing-section, var(--pa-spacing-32, 32px));
}

.pa-form-container-title {
  margin: 0 0 var(--pa-spacing-8, 8px) 0;
  font-family: var(--pa-font-family-roboto, Roboto, sans-serif);
  font-size: var(--pa-font-size-500, 24px);
  font-weight: var(--pa-font-weight-700, 700);
  color: var(--pa-color-surface-container-text, var(--pa-gray-900, #212529));
}

.pa-form-container-description {
  margin: 0;
  font-family: var(--pa-font-family-roboto, Roboto, sans-serif);
  font-size: var(--pa-font-size-200, 16px);
  font-weight: var(--pa-font-weight-400, 400);
  color: var(--pa-gray-500, #adb5bd);
}

.pa-form-container-content {
  display: flex;
  flex-direction: column;
  gap: var(--pa-form-container-spacing-field, var(--pa-spacing-16, 16px));
}

.pa-form-container-footer {
  margin-top: var(--pa-form-container-spacing-section, var(--pa-spacing-32, 32px));
  padding-top: var(--pa-form-container-spacing-section, var(--pa-spacing-32, 32px));
  border-top: var(--pa-Border-width-50, 1px) solid var(--pa-form-container-header-border, var(--pa-color-surface-base-divider));
  display: flex;
  gap: var(--pa-spacing-8, 8px);
  justify-content: flex-end;
}
</style>

