<script setup lang="ts">
import { computed } from 'vue'
import PaRadio from '../PaRadio/PaRadio.vue'

const props = defineProps<{
  modelValue?: string | number
  options: Array<{ label: string; value: string | number; disabled?: boolean }>
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  name?: string
  direction?: 'horizontal' | 'vertical'
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string | number]
  'change': [value: string | number]
}>()

const groupName = computed(() => props.name || `radio-group-${Math.random().toString(36).substr(2, 9)}`)

const handleChange = (value: string | number) => {
  emit('update:modelValue', value)
  emit('change', value)
}
</script>

<template>
  <fieldset
    :class="[
      'pa-radio-button-group',
      `pa-radio-button-group--${direction || 'horizontal'}`
    ]"
    role="radiogroup"
  >
    <PaRadio
      v-for="option in options"
      :key="String(option.value)"
      :model-value="modelValue"
      :value="option.value"
      :size="size"
      :disabled="disabled || option.disabled"
      :label="option.label"
      :name="groupName"
      @update:model-value="handleChange"
      @change="handleChange"
    />
  </fieldset>
</template>

<style lang="scss" scoped>
.pa-radio-button-group {
  display: inline-flex;
  gap: var(--pa-spacing-16, 16px);

  &--horizontal {
    flex-direction: row;
  }

  &--vertical {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>

