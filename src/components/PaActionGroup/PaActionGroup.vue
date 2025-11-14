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
    gap: var(--pa-action-group-gap-sm);
  }

  &--gap-md {
    gap: var(--pa-action-group-gap-md);
  }

  &--gap-lg {
    gap: var(--pa-action-group-gap-lg);
  }
}
</style>

