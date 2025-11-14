<script setup lang="ts">
defineProps<{
  modelValue?: string | number
  value: string | number
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  label?: string
  name?: string
}>()

defineEmits<{
  'update:modelValue': [value: string | number]
  'change': [value: string | number]
}>()
</script>

<template>
  <label
    :class="[
      'pa-radio',
      `pa-radio--${size || 'md'}`,
      {
        'is-disabled': disabled,
        'is-checked': modelValue === value
      }
    ]"
  >
    <input
      type="radio"
      :checked="modelValue === value"
      :disabled="disabled"
      :name="name"
      :value="value"
      :aria-checked="modelValue === value"
      class="pa-radio-input"
      @change="$emit('update:modelValue', value); $emit('change', value)"
    />
    <span class="pa-radio-circle">
      <span v-if="modelValue === value" class="pa-radio-dot"></span>
    </span>
    <span v-if="label" class="pa-radio-label">{{ label }}</span>
  </label>
</template>

<style lang="scss" scoped>
.pa-radio {
  display: inline-flex;
  align-items: center;
  gap: var(--pa-radio-gap);
  cursor: var(--pa-cursor-pointer);
  font-family: var(--pa-font-family-roboto, Roboto, sans-serif);
  font-weight: var(--pa-font-weight-regular);

  &.is-disabled {
    cursor: var(--pa-cursor-not-allowed);
    opacity: calc(var(--pa-opacity-60) / 100);
  }
}

.pa-radio-input {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
}

.pa-radio-circle {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: var(--pa-radio-background-default);
  border: var(--pa-radio-border-width-default) solid var(--pa-radio-border-default);
  border-radius: var(--pa-radio-border-radius-default);
  transition: all var(--pa-radio-transition-duration-default) var(--pa-radio-transition-easing-default);
  flex-shrink: 0;

  .pa-radio--sm & {
    width: var(--pa-radio-size-sm-width);
    height: var(--pa-radio-size-sm-height);
  }

  .pa-radio--md & {
    width: var(--pa-radio-size-md-width);
    height: var(--pa-radio-size-md-height);
  }

  .pa-radio--lg & {
    width: var(--pa-radio-size-lg-width);
    height: var(--pa-radio-size-lg-height);
  }

  .pa-radio:not(.is-disabled):hover & {
    background-color: var(--pa-radio-background-hover);
    border-color: var(--pa-radio-border-checked);
  }

  .pa-radio-input:focus-visible + & {
    outline: var(--pa-radio-outline-width-default) solid var(--pa-radio-border-focus);
    outline-offset: var(--pa-radio-outline-offset-default);
  }

  .pa-radio.is-checked & {
    background-color: var(--pa-radio-background-checked);
    border-color: var(--pa-radio-border-checked);
  }

  .pa-radio.is-disabled & {
    background-color: var(--pa-radio-background-disabled);
    border-color: var(--pa-radio-border-disabled);
  }
}

.pa-radio-dot {
  width: var(--pa-radio-size-md-dot);
  height: var(--pa-radio-size-md-dot);
  background-color: var(--pa-radio-dot-default);
  border-radius: var(--pa-radio-border-radius-default);

  .pa-radio--sm & {
    width: var(--pa-radio-size-sm-dot);
    height: var(--pa-radio-size-sm-dot);
  }

  .pa-radio--lg & {
    width: var(--pa-radio-size-lg-dot);
    height: var(--pa-radio-size-lg-dot);
  }

  .pa-radio.is-disabled & {
    background-color: var(--pa-radio-dot-disabled);
  }
}

.pa-radio-label {
  color: var(--pa-input-text-default);
  user-select: none;
}
</style>

