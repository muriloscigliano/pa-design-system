<script setup lang="ts">
defineProps<{
  label?: string
  spacing?: 'sm' | 'md' | 'lg'
}>()
</script>

<template>
  <div
    :class="[
      'pa-form-divider',
      `pa-form-divider--spacing-${spacing || 'md'}`
    ]"
  >
    <hr class="pa-form-divider-line" />
    <span v-if="label" class="pa-form-divider-label">{{ label }}</span>
  </div>
</template>

<style lang="scss" scoped>
.pa-form-divider {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;

  &--spacing-sm {
    margin: var(--pa-form-divider-spacing-sm) 0;
  }

  &--spacing-md {
    margin: var(--pa-form-divider-spacing-md) 0;
  }

  &--spacing-lg {
    margin: var(--pa-form-divider-spacing-lg) 0;
  }

  &-line {
    flex: 1;
    border: none;
    border-top: var(--pa-form-divider-border-width) solid var(--pa-form-divider-border);
    margin: 0;
  }

  &-label {
    padding: 0 var(--pa-form-divider-label-padding-x);
    font-family: var(--pa-font-family-roboto, Roboto, sans-serif);
    font-size: var(--pa-form-divider-label-font-size);
    font-weight: var(--pa-form-divider-label-font-weight);
    color: var(--pa-form-divider-text);
    background-color: var(--pa-form-divider-background);
  }
}
</style>

