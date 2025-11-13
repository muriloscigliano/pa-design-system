<script setup lang="ts">
import PaSwitch from '../PaSwitch/PaSwitch.vue'

interface ToggleOption {
  label: string
  value: string | number
  disabled?: boolean
}

const props = defineProps<{
  modelValue?: Array<string | number>
  options: ToggleOption[]
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  direction?: 'horizontal' | 'vertical'
}>()

const emit = defineEmits<{
  'update:modelValue': [value: Array<string | number>]
  'change': [value: Array<string | number>]
}>()

const handleChange = (value: boolean, optionValue: string | number) => {
  const currentValue = props.modelValue || []
  let newValue: Array<string | number>
  
  if (value) {
    newValue = [...currentValue, optionValue]
  } else {
    newValue = currentValue.filter(v => v !== optionValue)
  }
  
  emit('update:modelValue', newValue)
  emit('change', newValue)
}
</script>

<template>
  <div
    :class="[
      'pa-toggle-input-group',
      `pa-toggle-input-group--${direction || 'horizontal'}`
    ]"
    role="group"
  >
    <PaSwitch
      v-for="option in options"
      :key="String(option.value)"
      :model-value="(modelValue || []).includes(option.value)"
      :size="size"
      :disabled="disabled || option.disabled"
      :label="option.label"
      @update:model-value="handleChange($event, option.value)"
    />
  </div>
</template>

<style lang="scss" scoped>
.pa-toggle-input-group {
  display: inline-flex;
  gap: var(--pa-toggle-input-group-gap, var(--pa-spacing-16, 16px));

  &--horizontal {
    flex-direction: row;
  }

  &--vertical {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>

