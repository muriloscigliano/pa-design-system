<script setup lang="ts">
import { computed } from 'vue'
import { PaSwitch } from '../PaSwitch'

interface ToggleOption {
  label: string
  value: string
  checked?: boolean
}

const props = defineProps<{
  modelValue?: ToggleOption[]
  options?: ToggleOption[]
  disabled?: boolean
}>()

const emit = defineEmits<{
  'update:modelValue': [options: ToggleOption[]]
  'change': [value: string, checked: boolean]
}>()

const currentOptions = computed(() => {
  if (props.modelValue !== undefined) {
    return props.modelValue
  }
  return props.options || []
})

const handleToggle = (value: string, checked: boolean) => {
  const updatedOptions = currentOptions.value.map(opt => 
    opt.value === value ? { ...opt, checked } : { ...opt }
  )
  emit('update:modelValue', updatedOptions)
  emit('change', value, checked)
}

const isChecked = (value: string): boolean => {
  const option = currentOptions.value.find(opt => opt.value === value)
  return option?.checked ?? false
}
</script>

<template>
  <div class="pa-settings-toggle-list">
    <template v-for="(option, index) in currentOptions" :key="option.value">
      <div class="pa-settings-toggle-list-item">
        <span class="pa-settings-toggle-list-label">{{ option.label }}</span>
        <PaSwitch
          :model-value="isChecked(option.value)"
          :disabled="disabled"
          @update:model-value="handleToggle(option.value, $event)"
        />
      </div>
      <div v-if="index < currentOptions.length - 1" class="pa-settings-toggle-list-divider" />
    </template>
  </div>
</template>

<style lang="scss" scoped>
.pa-settings-toggle-list {
  display: flex;
  flex-direction: column;
  gap: var(--pa-settings-toggle-list-gap);
  width: 100%;
}

.pa-settings-toggle-list-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0;
}

.pa-settings-toggle-list-label {
  font-family: var(--pa-font-family-roboto);
  font-size: var(--pa-settings-toggle-list-label-font-size);
  font-weight: var(--pa-settings-toggle-list-label-font-weight);
  color: var(--pa-settings-toggle-list-label-color);
  line-height: normal;
  font-variation-settings: 'wdth' 100;
}

.pa-settings-toggle-list-divider {
  height: 1px;
  background-color: var(--pa-settings-toggle-list-divider-color);
  margin: 0;
}
</style>

