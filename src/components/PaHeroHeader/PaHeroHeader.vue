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
  font-family: var(--pa-font-family-roboto);
  font-weight: var(--pa-hero-header-font-weight);
  color: var(--pa-hero-header-text);
  line-height: var(--pa-hero-header-line-height);

  &--sm {
    font-size: var(--pa-hero-header-size-sm);
  }

  &--md {
    font-size: var(--pa-hero-header-size-md);
  }

  &--lg {
    font-size: var(--pa-hero-header-size-lg);
  }
}
</style>

