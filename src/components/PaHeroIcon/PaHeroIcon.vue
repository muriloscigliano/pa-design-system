<script setup lang="ts">
defineProps<{
  size?: 'sm' | 'md' | 'lg'
  color?: string
}>()
</script>

<template>
  <div
    :class="[
      'pa-hero-icon',
      `pa-hero-icon--${size || 'md'}`
    ]"
    :style="color ? { color } : undefined"
  >
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.pa-hero-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: var(--pa-hero-icon-color, var(--pa-color-surface-base-icon));

  &--sm {
    width: var(--pa-hero-icon-size-sm);
    height: var(--pa-hero-icon-size-sm);
  }

  &--md {
    width: var(--pa-hero-icon-size-md);
    height: var(--pa-hero-icon-size-md);
  }

  &--lg {
    width: var(--pa-hero-icon-size-lg);
    height: var(--pa-hero-icon-size-lg);
  }

  svg {
    width: 100%;
    height: 100%;
  }
}
</style>

