<script setup lang="ts">
defineProps<{
  spacing?: 'sm' | 'md' | 'lg'
}>()
</script>

<template>
  <hr
    :class="[
      'pa-text-divider',
      `pa-text-divider--spacing-${spacing || 'md'}`
    ]"
  />
</template>

<style lang="scss" scoped>
.pa-text-divider {
  border: none;
  border-top: var(--pa-text-divider-border-width, var(--pa-Border-width-50, 1px)) solid var(--pa-text-divider-border, var(--pa-color-surface-container-border));
  margin: 0;

  &--spacing-sm {
    margin: var(--pa-text-divider-spacing-sm, var(--pa-spacing-16, 16px)) 0;
  }

  &--spacing-md {
    margin: var(--pa-text-divider-spacing-md, var(--pa-spacing-24, 24px)) 0;
  }

  &--spacing-lg {
    margin: var(--pa-text-divider-spacing-lg, var(--pa-spacing-32, 32px)) 0;
  }
}
</style>

