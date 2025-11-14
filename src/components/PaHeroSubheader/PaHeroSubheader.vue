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
  font-family: var(--pa-font-family-roboto);
  font-weight: var(--pa-hero-subheader-font-weight);
  color: var(--pa-hero-subheader-text);
  line-height: var(--pa-hero-subheader-line-height);

  &--sm {
    font-size: var(--pa-hero-subheader-size-sm);
  }

  &--md {
    font-size: var(--pa-hero-subheader-size-md);
  }

  &--lg {
    font-size: var(--pa-hero-subheader-size-lg);
  }
}
</style>

