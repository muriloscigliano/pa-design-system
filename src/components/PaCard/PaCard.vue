<script setup lang="ts">
defineProps<{
  variant?: 'default' | 'outlined' | 'elevated'
  hoverable?: boolean
  selected?: boolean
}>()
</script>

<template>
  <div
    :class="[
      'pa-card',
      `pa-card--${variant || 'default'}`,
      {
        'is-hoverable': hoverable,
        'is-selected': selected
      }
    ]"
  >
    <div v-if="$slots.header" class="pa-card-header">
      <slot name="header" />
    </div>
    <div class="pa-card-body">
      <slot />
    </div>
    <div v-if="$slots.footer" class="pa-card-footer">
      <slot name="footer" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.pa-card {
  background-color: var(--pa-card-background-default);
  border: var(--pa-card-border-width-default, var(--pa-Border-width-50, 1px)) solid var(--pa-card-border-default);
  border-radius: var(--pa-card-border-radius-default, var(--pa-Border-radius-100, 8px));
  padding: var(--pa-card-padding-y) var(--pa-card-padding-x);
  transition: all var(--pa-transition-duration-default, 200ms) var(--pa-transition-easing-default, ease);
  box-shadow: var(--pa-card-shadow-default);

  &--outlined {
    border-width: var(--pa-Border-width-100, 2px);
  }

  &--elevated {
    box-shadow: var(--pa-card-shadow-hover);
  }

  &.is-hoverable {
    cursor: var(--pa-cursor-pointer, pointer);

    &:hover {
      background-color: var(--pa-card-background-hover);
      border-color: var(--pa-card-border-hover);
      box-shadow: var(--pa-card-shadow-hover);
    }
  }

  &.is-selected {
    background-color: var(--pa-card-background-selected);
    border-color: var(--pa-card-border-selected);
  }
}

.pa-card-header {
  margin-bottom: var(--pa-spacing-16, 16px);
  padding-bottom: var(--pa-spacing-16, 16px);
  border-bottom: var(--pa-Border-width-50, 1px) solid var(--pa-color-surface-base-divider, var(--pa-gray-200, #e9ecef));
}

.pa-card-body {
  flex: 1;
}

.pa-card-footer {
  margin-top: var(--pa-spacing-16, 16px);
  padding-top: var(--pa-spacing-16, 16px);
  border-top: var(--pa-Border-width-50, 1px) solid var(--pa-color-surface-base-divider, var(--pa-gray-200, #e9ecef));
}
</style>

