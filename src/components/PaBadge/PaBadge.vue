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
  border-radius: var(--pa-badge-border-radius-default, var(--pa-Border-radius-full, 99999px));
  font-family: var(--pa-font-family-roboto, Roboto, sans-serif);
  font-weight: var(--pa-font-weight-500, 500);
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
    font-size: var(--pa-badge-size-sm-font, var(--pa-font-size-75, 12px));
  }

  &--md {
    padding: var(--pa-badge-size-md-padding-y) var(--pa-badge-size-md-padding-x);
    font-size: var(--pa-badge-size-md-font, var(--pa-font-size-100, 14px));
  }

  &--lg {
    padding: var(--pa-badge-size-lg-padding-y) var(--pa-badge-size-lg-padding-x);
    font-size: var(--pa-badge-size-lg-font, var(--pa-font-size-200, 16px));
  }

  &.is-dot {
    padding: 0;
    width: 8px;
    height: 8px;
    min-width: 8px;
  }
}

.pa-badge-content {
  display: inline-flex;
  align-items: center;
}

.pa-badge-dot {
  width: 8px;
  height: 8px;
  border-radius: var(--pa-Border-radius-full, 99999px);
  background-color: currentColor;
}
</style>

