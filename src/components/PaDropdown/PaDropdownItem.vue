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
  color: var(--pa-dropdown-item-text-default);
  font-family: var(--pa-font-family-roboto, Roboto, sans-serif);
  font-size: var(--pa-dropdown-item-font-size);
  font-weight: var(--pa-dropdown-item-font-weight);
  cursor: var(--pa-cursor-pointer);
  border-radius: var(--pa-dropdown-item-border-radius);
  transition: all var(--pa-dropdown-transition-duration-default) var(--pa-dropdown-transition-easing-default);

  &:hover:not(.is-disabled) {
    background-color: var(--pa-dropdown-item-background-hover);
  }

  &.is-selected {
    background-color: var(--pa-dropdown-item-background-selected);
    color: var(--pa-dropdown-item-text-selected);
  }

  &.is-disabled {
    opacity: calc(var(--pa-dropdown-item-disabled-opacity) / 100);
    cursor: var(--pa-cursor-not-allowed);
    pointer-events: none;
  }
}
</style>

