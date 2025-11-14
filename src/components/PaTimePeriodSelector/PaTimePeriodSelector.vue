<script setup lang="ts">
import { computed } from 'vue'

interface TimePeriodOption {
  value: number
  unit: 'day' | 'week' | 'month'
  label?: string
}

const props = defineProps<{
  modelValue?: { value: number; unit: 'day' | 'week' | 'month' }
  options?: TimePeriodOption[]
  disabled?: boolean
}>()

const emit = defineEmits<{
  'update:modelValue': [value: { value: number; unit: 'day' | 'week' | 'month' }]
  'change': [value: { value: number; unit: 'day' | 'week' | 'month' }]
}>()

const defaultOptions: TimePeriodOption[] = [
  { value: 1, unit: 'day' },
  { value: 3, unit: 'day' },
  { value: 1, unit: 'week' },
  { value: 2, unit: 'week' }
]

const options = computed(() => props.options || defaultOptions)

const isSelected = (option: TimePeriodOption): boolean => {
  if (!props.modelValue) return false
  return props.modelValue.value === option.value && props.modelValue.unit === option.unit
}

const formatLabel = (option: TimePeriodOption): string => {
  if (option.label) return option.label
  const unitLabel = option.value === 1 
    ? option.unit.charAt(0).toUpperCase() + option.unit.slice(1)
    : option.unit.charAt(0).toUpperCase() + option.unit.slice(1) + 's'
  return `${option.value} ${unitLabel}`
}

const selectOption = (option: TimePeriodOption) => {
  if (props.disabled) return
  const value = { value: option.value, unit: option.unit }
  emit('update:modelValue', value)
  emit('change', value)
}
</script>

<template>
  <div class="pa-time-period-selector">
    <button
      v-for="option in options"
      :key="`${option.value}-${option.unit}`"
      :class="[
        'pa-time-period-selector-item',
        {
          'is-selected': isSelected(option),
          'is-disabled': disabled
        }
      ]"
      :disabled="disabled"
      @click="selectOption(option)"
    >
      <span class="pa-time-period-selector-value">{{ option.value }}</span>
      <span class="pa-time-period-selector-unit">{{ option.unit === 'day' ? (option.value === 1 ? 'Day' : 'Days') : option.unit === 'week' ? (option.value === 1 ? 'Week' : 'Weeks') : (option.value === 1 ? 'Month' : 'Months') }}</span>
    </button>
  </div>
</template>

<style lang="scss" scoped>
.pa-time-period-selector {
  display: flex;
  gap: var(--pa-time-period-selector-gap);
  width: 100%;
}

.pa-time-period-selector-item {
  flex: 1;
  aspect-ratio: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--pa-time-period-selector-item-gap);
  background-color: var(--pa-time-period-selector-background-default);
  border: var(--pa-time-period-selector-item-border-width) solid var(--pa-time-period-selector-border-default);
  border-radius: var(--pa-time-period-selector-radius);
  padding: var(--pa-time-period-selector-item-padding);
  cursor: var(--pa-cursor-pointer);
  transition: all var(--pa-time-period-selector-transition-duration-default) var(--pa-time-period-selector-transition-easing-default);

  &:hover:not(.is-disabled):not(.is-selected) {
    background-color: var(--pa-time-period-selector-background-hover);
    border-color: var(--pa-time-period-selector-border-hover);
  }

  &.is-selected {
    background-color: var(--pa-time-period-selector-background-selected);
    border-color: var(--pa-time-period-selector-border-selected);
  }

  &.is-disabled {
    cursor: var(--pa-cursor-not-allowed);
    opacity: calc(var(--pa-opacity-60) / 100);
  }
}

.pa-time-period-selector-value {
  font-family: var(--pa-font-family-roboto);
  font-size: var(--pa-time-period-selector-value-font-size);
  font-weight: var(--pa-time-period-selector-value-font-weight);
  color: var(--pa-time-period-selector-value-color);
  line-height: normal;
  font-variation-settings: 'wdth' 100;

  .pa-time-period-selector-item.is-selected & {
    color: var(--pa-time-period-selector-value-color-selected);
  }
}

.pa-time-period-selector-unit {
  font-family: var(--pa-font-family-roboto);
  font-size: var(--pa-time-period-selector-unit-font-size);
  font-weight: var(--pa-time-period-selector-unit-font-weight);
  color: var(--pa-time-period-selector-unit-color);
  line-height: normal;
  font-variation-settings: 'wdth' 100;

  .pa-time-period-selector-item.is-selected & {
    color: var(--pa-time-period-selector-unit-color-selected);
  }
}
</style>

