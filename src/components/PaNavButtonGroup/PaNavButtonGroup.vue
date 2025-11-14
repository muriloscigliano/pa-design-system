<script setup lang="ts">
defineProps<{
  direction?: 'horizontal' | 'vertical'
  gap?: 'sm' | 'md' | 'lg'
}>()
</script>

<template>
  <nav
    :class="[
      'pa-nav-button-group',
      `pa-nav-button-group--${direction || 'horizontal'}`,
      `pa-nav-button-group--gap-${gap || 'md'}`
    ]"
    role="navigation"
  >
    <slot />
  </nav>
</template>

<style lang="scss" scoped>
.pa-nav-button-group {
  display: inline-flex;

  &--horizontal {
    flex-direction: row;
  }

  &--vertical {
    flex-direction: column;
    align-items: flex-start;
  }

  &--gap-sm {
    gap: var(--pa-nav-button-group-gap-sm);
  }

  &--gap-md {
    gap: var(--pa-nav-button-group-gap-md);
  }

  &--gap-lg {
    gap: var(--pa-nav-button-group-gap-lg);
  }
}
</style>

