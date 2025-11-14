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
    width: var(--pa-color-picker-size);
    height: var(--pa-color-picker-size);
    border: var(--pa-color-picker-border-width) solid var(--pa-color-picker-border);
    border-radius: var(--pa-color-picker-radius);
    cursor: var(--pa-color-picker-cursor-default);
    padding: 0;

    &:disabled {
      cursor: var(--pa-color-picker-cursor-disabled);
      opacity: calc(var(--pa-opacity-60) / 100);
    }
  }
}
</style>

