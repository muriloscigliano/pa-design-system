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
    margin: var(--pa-page-divider-spacing-sm) 0;
  }

  &--spacing-md {
    margin: var(--pa-page-divider-spacing-md) 0;
  }

  &--spacing-lg {
    margin: var(--pa-page-divider-spacing-lg) 0;
  }

  &-line {
    flex: 1;
    border: none;
    border-top: var(--pa-page-divider-border-width) solid var(--pa-page-divider-border);
    margin: 0;
  }

  &-label {
    padding: 0 var(--pa-page-divider-label-padding-x);
    font-family: var(--pa-font-family-roboto, Roboto, sans-serif);
    font-size: var(--pa-page-divider-label-font-size);
    font-weight: var(--pa-page-divider-label-font-weight);
    color: var(--pa-page-divider-text);
    background-color: var(--pa-page-divider-background);
  }
}
</style>

