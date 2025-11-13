<script setup lang="ts">
defineProps<{
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  padding?: 'sm' | 'md' | 'lg'
}>()
</script>

<template>
  <div
    :class="[
      'pa-text-container',
      `pa-text-container--max-width-${maxWidth || 'md'}`,
      `pa-text-container--padding-${padding || 'md'}`
    ]"
  >
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.pa-text-container {
  width: 100%;

  &--max-width-sm {
    max-width: var(--pa-text-container-max-width-sm, 480px);
  }

  &--max-width-md {
    max-width: var(--pa-text-container-max-width-md, 720px);
  }

  &--max-width-lg {
    max-width: var(--pa-text-container-max-width-lg, 960px);
  }

  &--max-width-xl {
    max-width: var(--pa-text-container-max-width-xl, 1200px);
  }

  &--max-width-full {
    max-width: 100%;
  }

  &--padding-sm {
    padding: var(--pa-text-container-padding-sm, var(--pa-spacing-16, 16px));
  }

  &--padding-md {
    padding: var(--pa-text-container-padding-md, var(--pa-spacing-24, 24px));
  }

  &--padding-lg {
    padding: var(--pa-text-container-padding-lg, var(--pa-spacing-32, 32px));
  }
}
</style>

