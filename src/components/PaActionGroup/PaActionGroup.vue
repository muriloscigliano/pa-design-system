<script setup lang="ts">
defineProps<{
  direction?: 'horizontal' | 'vertical'
  gap?: 'sm' | 'md' | 'lg'
}>()
</script>

<template>
  <div
    :class="[
      'pa-action-group',
      `pa-action-group--${direction || 'horizontal'}`,
      `pa-action-group--gap-${gap || 'md'}`
    ]"
    role="group"
  >
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.pa-action-group {
  display: inline-flex;

  &--horizontal {
    flex-direction: row;
  }

  &--vertical {
    flex-direction: column;
    align-items: flex-start;
  }

  &--gap-sm {
    gap: var(--pa-action-group-gap-sm, var(--pa-spacing-8, 8px));
  }

  &--gap-md {
    gap: var(--pa-action-group-gap-md, var(--pa-spacing-16, 16px));
  }

  &--gap-lg {
    gap: var(--pa-action-group-gap-lg, var(--pa-spacing-24, 24px));
  }
}
</style>

