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
  background-color: var(--pa-divider-background);

  &--horizontal {
    width: 100%;
    height: var(--pa-divider-thickness);
    margin: var(--pa-divider-spacing-md) 0;
  }

  &--vertical {
    width: var(--pa-divider-thickness);
    height: 100%;
    margin: 0 var(--pa-divider-spacing-md);
  }

  &--spacing-sm {
    margin: var(--pa-divider-spacing-sm);
  }

  &--spacing-md {
    margin: var(--pa-divider-spacing-md);
  }

  &--spacing-lg {
    margin: var(--pa-divider-spacing-lg);
  }
}
</style>

