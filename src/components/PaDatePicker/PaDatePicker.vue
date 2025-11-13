<script setup lang="ts">
import PaInput from '../PaInput/PaInput.vue'

defineProps<{
  modelValue?: string
  disabled?: boolean
  error?: boolean
  placeholder?: string
  label?: string
  helperText?: string
  errorMessage?: string
  min?: string
  max?: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
  'focus': [event: FocusEvent]
  'blur': [event: FocusEvent]
}>()
</script>

<template>
  <PaInput
    :model-value="modelValue"
    :disabled="disabled"
    :error="error"
    :placeholder="placeholder || 'YYYY-MM-DD'"
    :label="label"
    :helper-text="helperText"
    :error-message="errorMessage"
    type="date"
    :min="min"
    :max="max"
    @update:model-value="emit('update:modelValue', String($event))"
    @focus="emit('focus', $event)"
    @blur="emit('blur', $event)"
  />
</template>

