<script setup lang="ts">
import PaSwitch from '../PaSwitch/PaSwitch.vue'

defineProps<{
  modelValue?: boolean
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  label?: string
}>()

defineEmits<{
  'update:modelValue': [value: boolean]
  'change': [value: boolean]
}>()
</script>

<template>
  <PaSwitch
    :model-value="modelValue"
    :size="size"
    :disabled="disabled"
    :label="label"
    @update:model-value="$emit('update:modelValue', $event)"
    @change="$emit('change', $event)"
  />
</template>

