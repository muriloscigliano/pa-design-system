<script setup lang="ts">
defineProps<{
  selected?: boolean
  disabled?: boolean
}>()

defineEmits<{
  'click': [event: MouseEvent]
}>()
</script>

<template>
  <div
    :class="[
      'pa-dropdown-item',
      {
        'is-selected': selected,
        'is-disabled': disabled
      }
    ]"
    @click="$emit('click', $event)"
  >
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.pa-dropdown-item {
  padding: var(--pa-dropdown-item-padding-y) var(--pa-dropdown-item-padding-x);
  color: var(--pa-dropdown-item-text-default, var(--pa-color-surface-container-text));
  font-family: var(--pa-font-family-roboto, Roboto, sans-serif);
  font-size: var(--pa-font-size-200, 16px);
  font-weight: var(--pa-font-weight-400, 400);
  cursor: var(--pa-cursor-pointer, pointer);
  border-radius: var(--pa-Border-radius-50, 4px);
  transition: all var(--pa-transition-duration-default, 200ms) var(--pa-transition-easing-default, ease);

  &:hover:not(.is-disabled) {
    background-color: var(--pa-dropdown-item-background-hover, var(--pa-color-surface-cards-hover-background));
  }

  &.is-selected {
    background-color: var(--pa-dropdown-item-background-selected, var(--pa-color-surface-cards-selected-background));
    color: var(--pa-dropdown-item-text-selected, var(--pa-color-surface-container-text));
  }

  &.is-disabled {
    opacity: calc(var(--pa-opacity-60, 60) / 100);
    cursor: var(--pa-cursor-not-allowed, not-allowed);
    pointer-events: none;
  }
}
</style>

