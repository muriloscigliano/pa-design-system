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
    @click="toggle"
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
  gap: var(--pa-spacing-4, 4px);
  padding: var(--pa-toggle-chip-padding-y) var(--pa-toggle-chip-padding-x);
  background-color: var(--pa-toggle-chip-background-default, var(--pa-color-surface-container-background));
  color: var(--pa-toggle-chip-text-default, var(--pa-color-surface-container-text));
  border: 1px solid var(--pa-toggle-chip-border-default, var(--pa-color-surface-container-border));
  border-radius: var(--pa-toggle-chip-border-radius, var(--pa-Border-radius-full, 99999px));
  font-family: var(--pa-font-family-roboto, Roboto, sans-serif);
  font-size: var(--pa-font-size-200, 16px);
  font-weight: var(--pa-font-weight-400, 400);
  cursor: var(--pa-cursor-pointer, pointer);
  transition: all var(--pa-transition-duration-default, 200ms) var(--pa-transition-easing-default, ease);
  user-select: none;

  &:hover:not(.is-disabled) {
    background-color: var(--pa-toggle-chip-background-hover, var(--pa-color-surface-cards-hover-background));
  }

  &.is-selected {
    background-color: var(--pa-toggle-chip-background-selected, var(--pa-color-action-primary-background-default));
    color: var(--pa-toggle-chip-text-selected, var(--pa-color-action-primary-text-default));
    border-color: var(--pa-toggle-chip-border-selected, var(--pa-color-action-primary-border-default));
  }

  &.is-disabled {
    opacity: calc(var(--pa-opacity-60, 60) / 100);
    cursor: var(--pa-cursor-not-allowed, not-allowed);
  }
}

.pa-toggle-chip-remove {
  background: none;
  border: none;
  font-size: var(--pa-font-size-400, 20px);
  line-height: 1;
  cursor: var(--pa-cursor-pointer, pointer);
  color: currentColor;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  opacity: 0.7;
  transition: opacity var(--pa-transition-duration-default, 200ms) var(--pa-transition-easing-default, ease);

  &:hover {
    opacity: 1;
  }
}
</style>

