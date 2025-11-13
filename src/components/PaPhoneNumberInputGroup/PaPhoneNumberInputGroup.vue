<script setup lang="ts">
import { ref } from 'vue'
import PaInput from '../PaInput/PaInput.vue'

const props = defineProps<{
  modelValue?: string
  countryCode?: string
  disabled?: boolean
  error?: boolean
  placeholder?: string
  label?: string
  helperText?: string
  errorMessage?: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
  'focus': [event: FocusEvent]
  'blur': [event: FocusEvent]
}>()

const countryCodeValue = ref(props.countryCode || '+1')

const formatPhoneNumber = (value: string): string => {
  const cleaned = value.replace(/\D/g, '')
  if (cleaned.length <= 3) return cleaned
  if (cleaned.length <= 6) return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3)}`
  return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6, 10)}`
}

const handleInput = (value: string | number) => {
  const strValue = String(value).replace(/\D/g, '')
  emit('update:modelValue', strValue)
}
</script>

<template>
  <div class="pa-phone-number-input-group">
    <div class="pa-phone-number-input-group-wrapper">
      <PaInput
        :model-value="countryCodeValue"
        :disabled="disabled"
        class="pa-phone-number-input-group-country-code"
        @update:model-value="countryCodeValue = String($event)"
      />
      <PaInput
        :model-value="formatPhoneNumber(modelValue || '')"
        :disabled="disabled"
        :error="error"
        :placeholder="placeholder || '(555) 123-4567'"
        :label="label"
        :helper-text="helperText"
        :error-message="errorMessage"
        type="tel"
        @update:model-value="handleInput"
        @focus="emit('focus', $event)"
        @blur="emit('blur', $event)"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.pa-phone-number-input-group {
  &-wrapper {
    display: flex;
    gap: var(--pa-spacing-8, 8px);
  }

  &-country-code {
    width: 80px;
    flex-shrink: 0;
  }
}
</style>

