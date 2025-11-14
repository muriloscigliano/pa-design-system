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
  border: var(--pa-segmented-control-border-width) solid var(--pa-segmented-control-item-border);
  border-radius: var(--pa-segmented-control-item-radius);
  padding: var(--pa-segmented-control-padding);
  gap: var(--pa-segmented-control-gap);
}

.pa-segmented-control-item {
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

