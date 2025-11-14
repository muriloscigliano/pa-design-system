<script setup lang="ts">
import { computed } from 'vue'
import PaInput from '../PaInput/PaInput.vue'

const props = defineProps<{
  modelValue?: string | number
  currency?: string
  disabled?: boolean
  error?: boolean
  placeholder?: string
  label?: string
  helperText?: string
  errorMessage?: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string | number]
  'focus': [event: FocusEvent]
  'blur': [event: FocusEvent]
}>()

const currencySymbol = computed(() => props.currency || '$')

const formatValue = (value: string | number | undefined): string => {
  if (!value) return ''
  const numValue = typeof value === 'string' ? parseFloat(value.replace(/[^0-9.]/g, '')) : value
  if (isNaN(numValue)) return ''
  return numValue.toFixed(2)
}

const handleInput = (value: string | number) => {
  const stringValue = String(value)
  const numericValue = stringValue.replace(/[^0-9.]/g, '')
  emit('update:modelValue', numericValue || '')
}
</script>

<template>
  <div class="pa-currency-input">
    <PaInput
      :model-value="formatValue(modelValue)"
      :disabled="disabled"
      :error="error"
      :placeholder="placeholder"
      :label="label"
      :helper-text="helperText"
      :error-message="errorMessage"
      type="text"
      icon-left=""
      @update:model-value="handleInput($event)"
      @focus="emit('focus', $event)"
      @blur="emit('blur', $event)"
    >
      <template #iconLeft>
        <span class="pa-currency-input-symbol">{{ currencySymbol }}</span>
      </template>
    </PaInput>
  </div>
</template>

<style lang="scss" scoped>
.pa-currency-input {
  &-symbol {
    color: var(--pa-currency-input-symbol-color);
    font-weight: var(--pa-currency-input-symbol-font-weight);
    padding-right: var(--pa-currency-input-symbol-spacing-right);
  }
}
</style>

