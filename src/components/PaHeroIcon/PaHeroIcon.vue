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
    width: var(--pa-hero-icon-size-sm, var(--pa-icon-size-300, 32px));
    height: var(--pa-hero-icon-size-sm, var(--pa-icon-size-300, 32px));
  }

  &--md {
    width: var(--pa-hero-icon-size-md, var(--pa-icon-size-400, 48px));
    height: var(--pa-hero-icon-size-md, var(--pa-icon-size-400, 48px));
  }

  &--lg {
    width: var(--pa-hero-icon-size-lg, var(--pa-icon-size-500, 56px));
    height: var(--pa-hero-icon-size-lg, var(--pa-icon-size-500, 56px));
  }

  svg {
    width: 100%;
    height: 100%;
  }
}
</style>

