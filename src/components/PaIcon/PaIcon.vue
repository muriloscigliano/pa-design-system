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
    width: var(--pa-icon-size-sm);
    height: var(--pa-icon-size-sm);
  }

  &--md {
    width: var(--pa-icon-size-md);
    height: var(--pa-icon-size-md);
  }

  &--lg {
    width: var(--pa-icon-size-lg);
    height: var(--pa-icon-size-lg);
  }

  &--xl {
    width: var(--pa-icon-size-xl);
    height: var(--pa-icon-size-xl);
  }

  svg {
    width: 100%;
    height: 100%;
  }
}
</style>

