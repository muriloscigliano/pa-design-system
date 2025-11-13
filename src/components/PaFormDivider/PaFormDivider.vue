<script setup lang="ts">
defineProps<{
  label?: string
  spacing?: 'sm' | 'md' | 'lg'
}>()
</script>

<template>
  <div
    :class="[
      'pa-form-divider',
      `pa-form-divider--spacing-${spacing || 'md'}`
    ]"
  >
    <hr class="pa-form-divider-line" />
    <span v-if="label" class="pa-form-divider-label">{{ label }}</span>
  </div>
</template>

<style lang="scss" scoped>
.pa-form-divider {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;

  &--spacing-sm {
    margin: var(--pa-form-divider-spacing-sm, var(--pa-spacing-16, 16px)) 0;
  }

  &--spacing-md {
    margin: var(--pa-form-divider-spacing-md, var(--pa-spacing-24, 24px)) 0;
  }

  &--spacing-lg {
    margin: var(--pa-form-divider-spacing-lg, var(--pa-spacing-32, 32px)) 0;
  }

  &-line {
    flex: 1;
    border: none;
    border-top: var(--pa-form-divider-border-width, var(--pa-Border-width-50, 1px)) solid var(--pa-form-divider-border, var(--pa-color-surface-container-border));
    margin: 0;
  }

  &-label {
    padding: 0 var(--pa-spacing-16, 16px);
    font-family: var(--pa-font-family-roboto, Roboto, sans-serif);
    font-size: var(--pa-font-size-100, 14px);
    font-weight: var(--pa-font-weight-500, 500);
    color: var(--pa-form-divider-text, var(--pa-color-surface-container-text-secondary));
    background-color: var(--pa-form-divider-background, var(--pa-color-surface-base-background));
  }
}
</style>

