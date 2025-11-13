<script setup lang="ts">
defineProps<{
  modelValue: string | number
  options: Array<{ label: string; value: string | number; disabled?: boolean }>
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string | number]
  'change': [value: string | number]
}>()

const selectOption = (option: { label: string; value: string | number; disabled?: boolean }) => {
  if (!option.disabled) {
    emit('update:modelValue', option.value)
    emit('change', option.value)
  }
}
</script>

<template>
  <div class="pa-segmented-control" role="radiogroup">
    <button
      v-for="option in options"
      :key="String(option.value)"
      :class="[
        'pa-segmented-control-item',
        {
          'is-selected': modelValue === option.value,
          'is-disabled': option.disabled
        }
      ]"
      :disabled="option.disabled"
      :aria-pressed="modelValue === option.value"
      role="radio"
      :aria-checked="modelValue === option.value"
      @click="selectOption(option)"
    >
      {{ option.label }}
    </button>
  </div>
</template>

<style lang="scss" scoped>
.pa-segmented-control {
  display: inline-flex;
  background-color: var(--pa-segmented-control-background, var(--pa-color-surface-container-background));
  border: var(--pa-Border-width-50, 1px) solid var(--pa-segmented-control-item-border, var(--pa-color-surface-container-border));
  border-radius: var(--pa-segmented-control-item-radius, var(--pa-Border-radius-100, 8px));
  padding: var(--pa-spacing-4, 4px);
  gap: var(--pa-spacing-4, 4px);
}

.pa-segmented-control-item {
  padding: var(--pa-segmented-control-item-padding-y) var(--pa-segmented-control-item-padding-x);
  background-color: var(--pa-segmented-control-item-background-default, transparent);
  color: var(--pa-segmented-control-item-text-default, var(--pa-color-surface-container-text));
  border: none;
  border-radius: var(--pa-segmented-control-item-radius, var(--pa-Border-radius-100, 8px));
  font-family: var(--pa-font-family-roboto, Roboto, sans-serif);
  font-size: var(--pa-font-size-200, 16px);
  font-weight: var(--pa-font-weight-400, 400);
  cursor: var(--pa-cursor-pointer, pointer);
  transition: all var(--pa-transition-duration-default, 200ms) var(--pa-transition-easing-default, ease);
  white-space: nowrap;

  &:hover:not(.is-disabled):not(.is-selected) {
    background-color: var(--pa-color-surface-cards-hover-background, var(--pa-gray-200, #e9ecef));
  }

  &.is-selected {
    background-color: var(--pa-segmented-control-item-background-selected, var(--pa-color-action-primary-background-default));
    color: var(--pa-segmented-control-item-text-selected, var(--pa-color-action-primary-text-default));
  }

  &.is-disabled {
    opacity: calc(var(--pa-opacity-60, 60) / 100);
    cursor: var(--pa-cursor-not-allowed, not-allowed);
  }
}
</style>

