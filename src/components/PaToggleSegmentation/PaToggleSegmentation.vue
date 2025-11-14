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
      :aria-pressed="modelValue === option.value"
      role="button"
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
  border: var(--pa-segmented-control-border-width) solid var(--pa-segmented-control-item-border);
  border-radius: var(--pa-segmented-control-item-radius);
  padding: var(--pa-segmented-control-padding);
  gap: var(--pa-segmented-control-gap);
}

.pa-toggle-segmentation-item {
  padding: var(--pa-segmented-control-item-padding-y) var(--pa-segmented-control-item-padding-x);
  background-color: var(--pa-segmented-control-item-background-default);
  color: var(--pa-segmented-control-item-text-default);
  border: none;
  border-radius: var(--pa-segmented-control-item-radius);
  font-family: var(--pa-font-family-roboto, Roboto, sans-serif);
  font-size: var(--pa-segmented-control-font-size);
  font-weight: var(--pa-segmented-control-font-weight);
  cursor: var(--pa-cursor-pointer);
  transition: all var(--pa-segmented-control-transition-duration-default) var(--pa-segmented-control-transition-easing-default);
  white-space: nowrap;

  &:hover:not(.is-disabled):not(.is-selected) {
    background-color: var(--pa-segmented-control-item-hover-background);
  }

  &.is-selected {
    background-color: var(--pa-segmented-control-item-background-selected);
    color: var(--pa-segmented-control-item-text-selected);
  }

  &.is-disabled {
    opacity: calc(var(--pa-opacity-60) / 100);
    cursor: var(--pa-cursor-not-allowed);
  }
}
</style>
