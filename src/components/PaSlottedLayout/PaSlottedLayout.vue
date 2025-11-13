<script setup lang="ts">
defineProps<{
  direction?: 'horizontal' | 'vertical'
  gap?: 'sm' | 'md' | 'lg'
}>()
</script>

<template>
  <div
    :class="[
      'pa-slotted-layout',
      `pa-slotted-layout--${direction || 'horizontal'}`,
      `pa-slotted-layout--gap-${gap || 'md'}`
    ]"
  >
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.pa-slotted-layout {
  display: flex;

  &--horizontal {
    flex-direction: row;
  }

  &--vertical {
    flex-direction: column;
  }

  &--gap-sm {
    gap: var(--pa-slotted-layout-gap-sm, var(--pa-spacing-8, 8px));
  }

  &--gap-md {
    gap: var(--pa-slotted-layout-gap-md, var(--pa-spacing-16, 16px));
  }

  &--gap-lg {
    gap: var(--pa-slotted-layout-gap-lg, var(--pa-spacing-24, 24px));
  }
}
</style>

