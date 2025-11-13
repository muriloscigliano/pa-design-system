<script setup lang="ts">
defineProps<{
  label?: string
  spacing?: 'sm' | 'md' | 'lg'
}>()
</script>

<template>
  <div
    :class="[
      'pa-page-divider',
      `pa-page-divider--spacing-${spacing || 'md'}`
    ]"
  >
    <hr class="pa-page-divider-line" />
    <span v-if="label" class="pa-page-divider-label">{{ label }}</span>
  </div>
</template>

<style lang="scss" scoped>
.pa-page-divider {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;

  &--spacing-sm {
    margin: var(--pa-page-divider-spacing-sm, var(--pa-spacing-24, 24px)) 0;
  }

  &--spacing-md {
    margin: var(--pa-page-divider-spacing-md, var(--pa-spacing-32, 32px)) 0;
  }

  &--spacing-lg {
    margin: var(--pa-page-divider-spacing-lg, var(--pa-spacing-48, 48px)) 0;
  }

  &-line {
    flex: 1;
    border: none;
    border-top: var(--pa-page-divider-border-width, var(--pa-Border-width-50, 1px)) solid var(--pa-page-divider-border, var(--pa-color-surface-container-border));
    margin: 0;
  }

  &-label {
    padding: 0 var(--pa-spacing-16, 16px);
    font-family: var(--pa-font-family-roboto, Roboto, sans-serif);
    font-size: var(--pa-font-size-200, 16px);
    font-weight: var(--pa-font-weight-600, 600);
    color: var(--pa-page-divider-text, var(--pa-color-surface-base-text));
    background-color: var(--pa-page-divider-background, var(--pa-color-surface-base-background));
  }
}
</style>

