<script setup lang="ts">
defineProps<{
  text?: string
  size?: 'sm' | 'md' | 'lg'
}>()
</script>

<template>
  <p
    :class="[
      'pa-hero-subheader',
      `pa-hero-subheader--${size || 'md'}`
    ]"
  >
    <slot>{{ text }}</slot>
  </p>
</template>

<style lang="scss" scoped>
.pa-hero-subheader {
  margin: 0;
  font-family: var(--pa-font-family-roboto, Roboto, sans-serif);
  font-weight: var(--pa-font-weight-400, 400);
  color: var(--pa-hero-subheader-text, var(--pa-color-surface-container-text));
  line-height: var(--pa-hero-subheader-line-height, 1.5);

  &--sm {
    font-size: var(--pa-hero-subheader-size-sm, var(--pa-font-size-100, 14px));
  }

  &--md {
    font-size: var(--pa-hero-subheader-size-md, var(--pa-font-size-200, 16px));
  }

  &--lg {
    font-size: var(--pa-hero-subheader-size-lg, var(--pa-font-size-400, 32px));
  }
}
</style>

