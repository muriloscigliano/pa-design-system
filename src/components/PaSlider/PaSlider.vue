<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  modelValue: number
  min?: number
  max?: number
  step?: number
  disabled?: boolean
}>()

const emit = defineEmits<{
  'update:modelValue': [value: number]
  'change': [value: number]
}>()

const value = computed({
  get: () => props.modelValue,
  set: (val) => {
    emit('update:modelValue', val)
    emit('change', val)
  }
})

const min = computed(() => props.min ?? 0)
const max = computed(() => props.max ?? 100)
const step = computed(() => props.step ?? 1)

const percentage = computed(() => {
  return ((value.value - min.value) / (max.value - min.value)) * 100
})

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  value.value = Number(target.value)
}
</script>

<template>
  <div
    :class="[
      'pa-slider',
      {
        'is-disabled': disabled
      }
    ]"
  >
    <div class="pa-slider-track">
      <div
        class="pa-slider-filled"
        :style="{ width: `${percentage}%` }"
      />
      <input
        type="range"
        :value="value"
        :min="min"
        :max="max"
        :step="step"
        :disabled="disabled"
        :aria-valuenow="value"
        :aria-valuemin="min"
        :aria-valuemax="max"
        :aria-label="`Slider value: ${value}`"
        class="pa-slider-input"
        @input="handleInput"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.pa-slider {
  position: relative;
  width: 100%;
  padding: var(--pa-slider-padding-y) 0;
}

.pa-slider-track {
  position: relative;
  width: 100%;
  height: var(--pa-slider-track-height);
  background-color: var(--pa-slider-track-background);
  border-radius: var(--pa-slider-track-radius);
}

.pa-slider-filled {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  background-color: var(--pa-slider-track-filled);
  border-radius: var(--pa-slider-track-radius);
  transition: width var(--pa-slider-transition-duration-default) var(--pa-slider-transition-easing-default);
}

.pa-slider-input {
  position: absolute;
  top: 50%;
  left: 0;
  width: 100%;
  height: var(--pa-slider-input-height);
  margin: 0;
  transform: translateY(-50%);
  background: transparent;
  cursor: var(--pa-cursor-pointer);
  appearance: none;
  -webkit-appearance: none;

  &::-webkit-slider-thumb {
    appearance: none;
    width: var(--pa-slider-thumb-width);
    height: var(--pa-slider-thumb-height);
    background-color: var(--pa-slider-thumb-background);
    border: var(--pa-slider-thumb-border-width) solid var(--pa-slider-thumb-border-color);
    border-radius: var(--pa-slider-thumb-radius);
    cursor: var(--pa-cursor-pointer);
    transition: all var(--pa-slider-transition-duration-default) var(--pa-slider-transition-easing-default);

    &:hover {
      background-color: var(--pa-slider-thumb-hover);
    }
  }

  &::-moz-range-thumb {
    width: var(--pa-slider-thumb-width);
    height: var(--pa-slider-thumb-height);
    background-color: var(--pa-slider-thumb-background);
    border: var(--pa-slider-thumb-border-width) solid var(--pa-slider-thumb-border-color);
    border-radius: var(--pa-slider-thumb-radius);
    cursor: var(--pa-cursor-pointer);
    transition: all var(--pa-slider-transition-duration-default) var(--pa-slider-transition-easing-default);

    &:hover {
      background-color: var(--pa-slider-thumb-hover);
    }
  }

  &:disabled {
    cursor: var(--pa-cursor-not-allowed);
    opacity: calc(var(--pa-opacity-60) / 100);
  }
}
</style>

