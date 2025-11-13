<script setup lang="ts">
defineProps<{
  size?: 'sm' | 'md' | 'lg' | 'xl'
  color?: string
  name?: string
}>()
</script>

<template>
  <span
    :class="[
      'pa-icon',
      `pa-icon--${size || 'md'}`
    ]"
    :style="color ? { color } : undefined"
    role="img"
    :aria-label="name"
  >
    <slot />
  </span>
</template>

<style lang="scss" scoped>
.pa-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: var(--pa-icon-color, var(--pa-color-surface-container-icon));

  &--sm {
    width: var(--pa-icon-size-sm, var(--pa-icon-size-100, 16px));
    height: var(--pa-icon-size-sm, var(--pa-icon-size-100, 16px));
  }

  &--md {
    width: var(--pa-icon-size-md, var(--pa-icon-size-200, 24px));
    height: var(--pa-icon-size-md, var(--pa-icon-size-200, 24px));
  }

  &--lg {
    width: var(--pa-icon-size-lg, var(--pa-icon-size-300, 32px));
    height: var(--pa-icon-size-lg, var(--pa-icon-size-300, 32px));
  }

  &--xl {
    width: var(--pa-icon-size-xl, var(--pa-icon-size-400, 48px));
    height: var(--pa-icon-size-xl, var(--pa-icon-size-400, 48px));
  }

  svg {
    width: 100%;
    height: 100%;
  }
}
</style>

