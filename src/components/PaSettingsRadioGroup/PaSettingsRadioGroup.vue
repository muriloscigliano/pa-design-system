<script setup lang="ts">
import { computed } from 'vue'
import { PaRadio } from '../PaRadio'

interface Option {
  label: string
  value: string | number
  disabled?: boolean
}

const props = defineProps<{
  modelValue?: string | number
  options: Option[]
  name?: string
  disabled?: boolean
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string | number]
  'change': [value: string | number]
}>()

const handleChange = (value: string | number) => {
  emit('update:modelValue', value)
  emit('change', value)
}

const radioName = computed(() => props.name || `pa-settings-radio-${Math.random().toString(36).substr(2, 9)}`)
</script>

<template>
  <div class="pa-settings-radio-group">
    <template v-for="(option, index) in options" :key="String(option.value)">
      <div v-if="index > 0" class="pa-settings-radio-group-divider" />
      <div class="pa-settings-radio-group-item">
        <PaRadio
          :model-value="modelValue"
          :value="option.value"
          :name="radioName"
          :label="option.label"
          :disabled="disabled || option.disabled"
          @update:model-value="handleChange"
        />
      </div>
      <div v-if="index < options.length - 1" class="pa-settings-radio-group-divider" />
    </template>
  </div>
</template>

<style lang="scss" scoped>
.pa-settings-radio-group {
  display: flex;
  flex-direction: column;
  gap: var(--pa-settings-radio-group-gap);
  width: 100%;
}

.pa-settings-radio-group-item {
  display: flex;
  align-items: center;
  padding: var(--pa-settings-radio-group-divider-padding-y) 0;
}

.pa-settings-radio-group-divider {
  height: 1px;
  background-color: var(--pa-settings-radio-group-divider-color);
  margin: 0;
}
</style>

