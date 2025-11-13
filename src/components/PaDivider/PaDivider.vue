<script setup lang="ts">
defineProps<{
  orientation?: 'horizontal' | 'vertical'
  spacing?: 'sm' | 'md' | 'lg'
}>()
</script>

<template>
  <hr
    :class="[
      'pa-divider',
      `pa-divider--${orientation || 'horizontal'}`,
      `pa-divider--spacing-${spacing || 'md'}`
    ]"
  />
</template>

<style lang="scss" scoped>
.pa-divider {
  border: none;
  background-color: var(--pa-divider-background, var(--pa-color-surface-container-border));

  &--horizontal {
    width: 100%;
    height: var(--pa-divider-thickness, var(--pa-Border-width-50, 1px));
    margin: var(--pa-divider-spacing-md, var(--pa-spacing-16, 16px)) 0;
  }

  &--vertical {
    width: var(--pa-divider-thickness, var(--pa-Border-width-50, 1px));
    height: 100%;
    margin: 0 var(--pa-divider-spacing-md, var(--pa-spacing-16, 16px));
  }

  &--spacing-sm {
    margin: var(--pa-divider-spacing-sm, var(--pa-spacing-8, 8px));
  }

  &--spacing-md {
    margin: var(--pa-divider-spacing-md, var(--pa-spacing-16, 16px));
  }

  &--spacing-lg {
    margin: var(--pa-divider-spacing-lg, var(--pa-spacing-24, 24px));
  }
}
</style>

