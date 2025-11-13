<script setup lang="ts">
defineProps<{
  title?: string
  size?: 'sm' | 'md' | 'lg'
}>()
</script>

<template>
  <h1
    :class="[
      'pa-hero-header',
      `pa-hero-header--${size || 'md'}`
    ]"
  >
    <slot>{{ title }}</slot>
  </h1>
</template>

<style lang="scss" scoped>
.pa-hero-header {
  margin: 0;
  font-family: var(--pa-font-family-roboto, Roboto, sans-serif);
  font-weight: var(--pa-font-weight-700, 700);
  color: var(--pa-hero-header-text, var(--pa-color-surface-base-text));
  line-height: var(--pa-hero-header-line-height, 1.2);

  &--sm {
    font-size: var(--pa-hero-header-size-sm, var(--pa-font-size-400, 32px));
  }

  &--md {
    font-size: var(--pa-hero-header-size-md, var(--pa-font-size-600, 48px));
  }

  &--lg {
    font-size: var(--pa-hero-header-size-lg, var(--pa-font-size-800, 64px));
  }
}
</style>

