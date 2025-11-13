<script setup lang="ts">
defineProps<{
  modelValue?: string
  disabled?: boolean
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
  'change': [value: string]
}>()

const handleChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.value)
  emit('change', target.value)
}
</script>

<template>
  <div class="pa-color-picker">
    <input
      type="color"
      :value="modelValue || '#000000'"
      :disabled="disabled"
      class="pa-color-picker-input"
      @input="handleChange"
    />
  </div>
</template>

<style lang="scss" scoped>
.pa-color-picker {
  display: inline-block;

  &-input {
    width: var(--pa-color-picker-size, 48px);
    height: var(--pa-color-picker-size, 48px);
    border: var(--pa-color-picker-border-width, var(--pa-Border-width-50, 1px)) solid var(--pa-color-picker-border, var(--pa-color-surface-container-border));
    border-radius: var(--pa-color-picker-radius, var(--pa-Border-radius-100, 8px));
    cursor: var(--pa-cursor-pointer, pointer);
    padding: 0;

    &:disabled {
      cursor: var(--pa-cursor-not-allowed, not-allowed);
      opacity: calc(var(--pa-opacity-60, 60) / 100);
    }
  }
}
</style>

