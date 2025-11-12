<script setup lang="ts">
import { ref, computed } from 'vue'

const props = defineProps<{
  modelValue: [number, number]
  min?: number
  max?: number
  step?: number
  disabled?: boolean
}>()

const emit = defineEmits<{
  'update:modelValue': [value: [number, number]]
  'change': [value: [number, number]]
}>()

const minValue = computed({
  get: () => props.modelValue[0],
  set: (val) => {
    const newValue: [number, number] = [val, props.modelValue[1]]
    emit('update:modelValue', newValue)
    emit('change', newValue)
  }
})

const maxValue = computed({
  get: () => props.modelValue[1],
  set: (val) => {
    const newValue: [number, number] = [props.modelValue[0], val]
    emit('update:modelValue', newValue)
    emit('change', newValue)
  }
})

const min = computed(() => props.min ?? 0)
const max = computed(() => props.max ?? 100)
const step = computed(() => props.step ?? 1)

const minPercentage = computed(() => {
  return ((minValue.value - min.value) / (max.value - min.value)) * 100
})

const maxPercentage = computed(() => {
  return ((maxValue.value - min.value) / (max.value - min.value)) * 100
})

const handleMinInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  const val = Number(target.value)
  if (val <= maxValue.value) {
    minValue.value = val
  }
}

const handleMaxInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  const val = Number(target.value)
  if (val >= minValue.value) {
    maxValue.value = val
  }
}
</script>

<template>
  <div
    :class="[
      'pa-range-slider',
      {
        'is-disabled': disabled
      }
    ]"
  >
    <div class="pa-range-slider-track">
      <div
        class="pa-range-slider-filled"
        :style="{
          left: `${minPercentage}%`,
          width: `${maxPercentage - minPercentage}%`
        }"
      />
      <input
        type="range"
        :value="minValue"
        :min="min"
        :max="max"
        :step="step"
        :disabled="disabled"
        class="pa-range-slider-input pa-range-slider-input--min"
        @input="handleMinInput"
      />
      <input
        type="range"
        :value="maxValue"
        :min="min"
        :max="max"
        :step="step"
        :disabled="disabled"
        class="pa-range-slider-input pa-range-slider-input--max"
        @input="handleMaxInput"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.pa-range-slider {
  position: relative;
  width: 100%;
  padding: var(--pa-spacing-8, 8px) 0;
}

.pa-range-slider-track {
  position: relative;
  width: 100%;
  height: var(--pa-slider-track-height, 4px);
  background-color: var(--pa-slider-track-background, var(--pa-gray-300, #dee2e6));
  border-radius: var(--pa-slider-track-radius, var(--pa-Border-radius-full, 99999px));
}

.pa-range-slider-filled {
  position: absolute;
  top: 0;
  height: 100%;
  background-color: var(--pa-slider-track-filled, var(--pa-color-action-primary-background-default));
  border-radius: var(--pa-slider-track-radius, var(--pa-Border-radius-full, 99999px));
  transition: left var(--pa-transition-duration-default, 200ms) var(--pa-transition-easing-default, ease),
    width var(--pa-transition-duration-default, 200ms) var(--pa-transition-easing-default, ease);
}

.pa-range-slider-input {
  position: absolute;
  top: 50%;
  left: 0;
  width: 100%;
  height: 20px;
  margin: 0;
  transform: translateY(-50%);
  background: transparent;
  cursor: var(--pa-cursor-pointer, pointer);
  appearance: none;
  -webkit-appearance: none;

  &--max {
    z-index: 2;
  }

  &::-webkit-slider-thumb {
    appearance: none;
    width: var(--pa-slider-thumb-width, 20px);
    height: var(--pa-slider-thumb-height, 20px);
    background-color: var(--pa-slider-thumb-background, var(--pa-gray-white, #ffffff));
    border: var(--pa-slider-thumb-border-width, var(--pa-Border-width-100, 2px)) solid var(--pa-slider-thumb-border-color, var(--pa-color-action-primary-border-default));
    border-radius: var(--pa-slider-thumb-radius, var(--pa-Border-radius-full, 99999px));
    cursor: var(--pa-cursor-pointer, pointer);
    transition: all var(--pa-transition-duration-default, 200ms) var(--pa-transition-easing-default, ease);

    &:hover {
      background-color: var(--pa-slider-thumb-hover, var(--pa-color-action-primary-background-hover));
    }
  }

  &::-moz-range-thumb {
    width: var(--pa-slider-thumb-width, 20px);
    height: var(--pa-slider-thumb-height, 20px);
    background-color: var(--pa-slider-thumb-background, var(--pa-gray-white, #ffffff));
    border: var(--pa-slider-thumb-border-width, var(--pa-Border-width-100, 2px)) solid var(--pa-slider-thumb-border-color, var(--pa-color-action-primary-border-default));
    border-radius: var(--pa-slider-thumb-radius, var(--pa-Border-radius-full, 99999px));
    cursor: var(--pa-cursor-pointer, pointer);
    transition: all var(--pa-transition-duration-default, 200ms) var(--pa-transition-easing-default, ease);

    &:hover {
      background-color: var(--pa-slider-thumb-hover, var(--pa-color-action-primary-background-hover));
    }
  }

  &:disabled {
    cursor: var(--pa-cursor-not-allowed, not-allowed);
    opacity: calc(var(--pa-opacity-60, 60) / 100);
  }
}
</style>

