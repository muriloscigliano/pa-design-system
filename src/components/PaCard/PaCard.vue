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
  border: var(--pa-card-border-width-default) solid var(--pa-card-border-default);
  border-radius: var(--pa-card-border-radius-default);
  padding: var(--pa-card-padding-y) var(--pa-card-padding-x);
  transition: all var(--pa-transition-duration-default) var(--pa-transition-easing-default);
  box-shadow: var(--pa-card-shadow-default);

  &--outlined {
    border-width: var(--pa-card-outlined-border-width);
  }

  &--elevated {
    box-shadow: var(--pa-card-shadow-hover);
  }

  &.is-hoverable {
    cursor: var(--pa-cursor-pointer);

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
  margin-bottom: var(--pa-card-header-spacing-bottom);
  padding-bottom: var(--pa-card-header-padding-bottom);
  border-bottom: var(--pa-card-header-border-width) solid var(--pa-card-header-border-color);
}

.pa-card-body {
  flex: 1;
}

.pa-card-footer {
  margin-top: var(--pa-card-footer-spacing-top);
  padding-top: var(--pa-card-footer-padding-top);
  border-top: var(--pa-card-footer-border-width) solid var(--pa-card-footer-border-color);
}
</style>

