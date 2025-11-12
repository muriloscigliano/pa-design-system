<script setup lang="ts">
const props = defineProps<{
  modelValue: string | number | null
  options: Array<{ label: string; value: string | number; disabled?: boolean }>
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string | number | null]
  'change': [value: string | number | null]
}>()

const selectOption = (option: { label: string; value: string | number; disabled?: boolean }) => {
  if (!option.disabled) {
    const newValue = props.modelValue === option.value ? null : option.value
    emit('update:modelValue', newValue)
    emit('change', newValue)
  }
}
</script>

<template>
  <div class="pa-toggle-segmentation">
    <button
      v-for="option in options"
      :key="String(option.value)"
      :class="[
        'pa-toggle-segmentation-item',
        {
          'is-selected': modelValue === option.value,
          'is-disabled': option.disabled
        }
      ]"
      :disabled="option.disabled"
      @click="selectOption(option)"
    >
      {{ option.label }}
    </button>
  </div>
</template>

<style lang="scss" scoped>
.pa-toggle-segmentation {
  display: inline-flex;
  background-color: var(--pa-segmented-control-background, var(--pa-color-surface-container-background));
  border: 1px solid var(--pa-segmented-control-item-border, var(--pa-color-surface-container-border));
  border-radius: var(--pa-segmented-control-item-radius, var(--pa-Border-radius-100, 8px));
  padding: var(--pa-spacing-4, 4px);
  gap: var(--pa-spacing-4, 4px);
}

.pa-toggle-segmentation-item {
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
