<script setup lang="ts">
import PaCheckbox from '../PaCheckbox/PaCheckbox.vue'

interface CheckboxOption {
  label: string
  value: string | number
  disabled?: boolean
}

const props = defineProps<{
  modelValue?: Array<string | number>
  options: CheckboxOption[]
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
  <fieldset
    :class="[
      'pa-checkbox-group',
      `pa-checkbox-group--${direction || 'horizontal'}`
    ]"
    role="group"
  >
    <PaCheckbox
      v-for="option in options"
      :key="String(option.value)"
      :model-value="(modelValue || []).includes(option.value)"
      :size="size"
      :disabled="disabled || option.disabled"
      :label="option.label"
      @update:model-value="handleChange($event, option.value)"
    />
  </fieldset>
</template>

<style lang="scss" scoped>
.pa-checkbox-group {
  display: inline-flex;
  gap: var(--pa-checkbox-group-gap);
  border: none;
  padding: 0;
  margin: 0;

  &--horizontal {
    flex-direction: row;
  }

  &--vertical {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>

