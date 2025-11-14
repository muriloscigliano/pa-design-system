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
    gap: var(--pa-slotted-layout-gap-sm);
  }

  &--gap-md {
    gap: var(--pa-slotted-layout-gap-md);
  }

  &--gap-lg {
    gap: var(--pa-slotted-layout-gap-lg);
  }
}
</style>

