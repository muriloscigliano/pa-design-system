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
  border-top: var(--pa-text-divider-border-width) solid var(--pa-text-divider-border);
  margin: 0;

  &--spacing-sm {
    margin: var(--pa-text-divider-spacing-sm) 0;
  }

  &--spacing-md {
    margin: var(--pa-text-divider-spacing-md) 0;
  }

  &--spacing-lg {
    margin: var(--pa-text-divider-spacing-lg) 0;
  }
}
</style>

