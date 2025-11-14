<script setup lang="ts">
defineProps<{
  variant?: 'default' | 'success' | 'warning' | 'error'
  size?: 'sm' | 'md' | 'lg'
  dot?: boolean
}>()
</script>

<template>
  <span
    :class="[
      'pa-badge',
      `pa-badge--${variant || 'default'}`,
      `pa-badge--${size || 'md'}`,
      {
        'is-dot': dot
      }
    ]"
  >
    <span v-if="dot" class="pa-badge-dot"></span>
    <span v-else class="pa-badge-content">
      <slot />
    </span>
  </span>
</template>

<style lang="scss" scoped>
.pa-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--pa-badge-border-radius-default);
  font-family: var(--pa-font-family-roboto, Roboto, sans-serif);
  font-weight: var(--pa-font-weight-medium);
  white-space: nowrap;

  &--default {
    background-color: var(--pa-badge-background-default);
    color: var(--pa-badge-text-default);
  }

  &--success {
    background-color: var(--pa-badge-background-success);
    color: var(--pa-badge-text-success);
  }

  &--warning {
    background-color: var(--pa-badge-background-warning);
    color: var(--pa-badge-text-warning);
  }

  &--error {
    background-color: var(--pa-badge-background-error);
    color: var(--pa-badge-text-error);
  }

  &--sm {
    padding: var(--pa-badge-size-sm-padding-y) var(--pa-badge-size-sm-padding-x);
    font-size: var(--pa-badge-size-sm-font);
  }

  &--md {
    padding: var(--pa-badge-size-md-padding-y) var(--pa-badge-size-md-padding-x);
    font-size: var(--pa-badge-size-md-font);
  }

  &--lg {
    padding: var(--pa-badge-size-lg-padding-y) var(--pa-badge-size-lg-padding-x);
    font-size: var(--pa-badge-size-lg-font);
  }

  &.is-dot {
    padding: 0;
    width: var(--pa-badge-dot-size);
    height: var(--pa-badge-dot-size);
    min-width: var(--pa-badge-dot-size);
  }
}

.pa-badge-content {
  display: inline-flex;
  align-items: center;
}

.pa-badge-dot {
  width: var(--pa-badge-dot-size);
  height: var(--pa-badge-dot-size);
  border-radius: var(--pa-badge-border-radius-default);
  background-color: currentColor;
}
</style>

