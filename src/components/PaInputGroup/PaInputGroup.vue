<script setup lang="ts">
defineProps<{
  direction?: 'horizontal' | 'vertical'
  gap?: 'sm' | 'md' | 'lg'
}>()
</script>

<template>
  <div
    :class="[
      'pa-input-group',
      `pa-input-group--${direction || 'horizontal'}`,
      `pa-input-group--gap-${gap || 'md'}`
    ]"
  >
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.pa-input-group {
  display: flex;

  &--horizontal {
    flex-direction: row;
    align-items: flex-start;
  }

  &--vertical {
    flex-direction: column;
  }

  &--gap-sm {
    gap: var(--pa-input-group-gap-sm, var(--pa-spacing-8, 8px));
  }

  &--gap-md {
    gap: var(--pa-input-group-gap-md, var(--pa-spacing-16, 16px));
  }

  &--gap-lg {
    gap: var(--pa-input-group-gap-lg, var(--pa-spacing-24, 24px));
  }
}
</style>

