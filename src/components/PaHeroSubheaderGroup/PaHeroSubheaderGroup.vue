<script setup lang="ts">
defineProps<{
  gap?: 'sm' | 'md' | 'lg'
}>()
</script>

<template>
  <div
    :class="[
      'pa-hero-subheader-group',
      `pa-hero-subheader-group--gap-${gap || 'md'}`
    ]"
  >
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.pa-hero-subheader-group {
  display: flex;
  flex-direction: column;

  &--gap-sm {
    gap: var(--pa-hero-subheader-group-gap-sm, var(--pa-spacing-8, 8px));
  }

  &--gap-md {
    gap: var(--pa-hero-subheader-group-gap-md, var(--pa-spacing-16, 16px));
  }

  &--gap-lg {
    gap: var(--pa-hero-subheader-group-gap-lg, var(--pa-spacing-24, 24px));
  }
}
</style>

