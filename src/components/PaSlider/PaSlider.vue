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
  padding: var(--pa-spacing-8, 8px) 0;
}

.pa-slider-track {
  position: relative;
  width: 100%;
  height: var(--pa-slider-track-height, 4px);
  background-color: var(--pa-slider-track-background, var(--pa-gray-300, #dee2e6));
  border-radius: var(--pa-slider-track-radius, var(--pa-Border-radius-full, 99999px));
}

.pa-slider-filled {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  background-color: var(--pa-slider-track-filled, var(--pa-color-action-primary-background-default));
  border-radius: var(--pa-slider-track-radius, var(--pa-Border-radius-full, 99999px));
  transition: width var(--pa-transition-duration-default, 200ms) var(--pa-transition-easing-default, ease);
}

.pa-slider-input {
  position: absolute;
  top: 50%;
  left: 0;
  width: 100%;
  height: var(--pa-icon-size-xs, var(--pa-icon-size-150, 20px));
  margin: 0;
  transform: translateY(-50%);
  background: transparent;
  cursor: var(--pa-cursor-pointer, pointer);
  appearance: none;
  -webkit-appearance: none;

  &::-webkit-slider-thumb {
    appearance: none;
    width: var(--pa-slider-thumb-width, var(--pa-icon-size-xs, var(--pa-icon-size-150, 20px)));
    height: var(--pa-slider-thumb-height, var(--pa-icon-size-xs, var(--pa-icon-size-150, 20px)));
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
    width: var(--pa-slider-thumb-width, var(--pa-icon-size-xs, var(--pa-icon-size-150, 20px)));
    height: var(--pa-slider-thumb-height, var(--pa-icon-size-xs, var(--pa-icon-size-150, 20px)));
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

