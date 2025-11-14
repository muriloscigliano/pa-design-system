<script setup lang="ts">
const props = defineProps<{
  modelValue?: boolean
  removable?: boolean
  disabled?: boolean
}>()

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  'change': [value: boolean]
  'remove': []
}>()

const toggle = () => {
  if (!props.disabled) {
    const newValue = !props.modelValue
    emit('update:modelValue', newValue)
    emit('change', newValue)
  }
}

const remove = (event: MouseEvent) => {
  event.stopPropagation()
  emit('remove')
}
</script>

<template>
  <span
    :class="[
      'pa-toggle-chip',
      {
        'is-selected': modelValue,
        'is-disabled': disabled,
        'is-removable': removable
      }
    ]"
    role="button"
    :aria-pressed="modelValue"
    :aria-disabled="disabled"
    :tabindex="disabled ? -1 : 0"
    @click="toggle"
    @keydown.enter="toggle"
    @keydown.space.prevent="toggle"
  >
    <slot />
    <button
      v-if="removable"
      class="pa-toggle-chip-remove"
      @click="remove"
    >
      ×
    </button>
  </span>
</template>

<style lang="scss" scoped>
.pa-toggle-chip {
  display: inline-flex;
  align-items: center;
  gap: var(--pa-toggle-chip-gap);
  padding: var(--pa-toggle-chip-padding-y) var(--pa-toggle-chip-padding-x);
  background-color: var(--pa-toggle-chip-background-default);
  color: var(--pa-toggle-chip-text-default);
  border: var(--pa-toggle-chip-border-width) solid var(--pa-toggle-chip-border-default);
  border-radius: var(--pa-toggle-chip-border-radius);
  font-family: var(--pa-font-family-roboto, Roboto, sans-serif);
  font-size: var(--pa-toggle-chip-font-size);
  font-weight: var(--pa-toggle-chip-font-weight);
  cursor: var(--pa-cursor-pointer);
  transition: all var(--pa-toggle-chip-transition-duration-default) var(--pa-toggle-chip-transition-easing-default);
  user-select: none;

  &:hover:not(.is-disabled) {
    background-color: var(--pa-toggle-chip-background-hover);
  }

  &.is-selected {
    background-color: var(--pa-toggle-chip-background-selected);
    color: var(--pa-toggle-chip-text-selected);
    border-color: var(--pa-toggle-chip-border-selected);
  }

  &.is-disabled {
    opacity: calc(var(--pa-opacity-60) / 100);
    cursor: var(--pa-cursor-not-allowed);
  }
}

.pa-toggle-chip-remove {
  background: none;
  border: none;
  font-size: var(--pa-toggle-chip-remove-font-size);
  line-height: 1;
  cursor: var(--pa-cursor-pointer);
  color: currentColor;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: var(--pa-toggle-chip-remove-size);
  height: var(--pa-toggle-chip-remove-size);
  opacity: var(--pa-toggle-chip-remove-opacity-default);
  transition: opacity var(--pa-toggle-chip-transition-duration-default) var(--pa-toggle-chip-transition-easing-default);

  &:hover {
    opacity: var(--pa-toggle-chip-remove-opacity-hover);
  }
}
</style>

