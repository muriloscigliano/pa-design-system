<script setup lang="ts">
defineProps<{
  modelValue?: string | number
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  error?: boolean
  placeholder?: string
  type?: string
  iconLeft?: string
  iconRight?: string
}>()

defineEmits<{
  'update:modelValue': [value: string | number]
  'focus': [event: FocusEvent]
  'blur': [event: FocusEvent]
}>()
</script>

<template>
  <div
    :class="[
      'pa-input-wrapper',
      `pa-input-wrapper--${size || 'md'}`,
      {
        'is-disabled': disabled,
        'is-error': error
      }
    ]"
  >
    <div class="pa-input-container">
      <span v-if="iconLeft" class="pa-input-icon pa-input-icon--left">
        <slot name="iconLeft">{{ iconLeft }}</slot>
      </span>
      <input
        :class="[
          'pa-input',
          `pa-input--${size || 'md'}`,
          {
            'is-disabled': disabled,
            'is-error': error,
            'has-icon-left': iconLeft,
            'has-icon-right': iconRight
          }
        ]"
        :value="modelValue"
        :disabled="disabled"
        :placeholder="placeholder"
        :type="type || 'text'"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
        @focus="$emit('focus', $event)"
        @blur="$emit('blur', $event)"
      />
      <span v-if="iconRight" class="pa-input-icon pa-input-icon--right">
        <slot name="iconRight">{{ iconRight }}</slot>
      </span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.pa-input-wrapper {
  display: inline-flex;
  flex-direction: column;
  width: 100%;

  &--sm {
    font-size: var(--pa-input-size-sm-font, var(--pa-font-size-100, 14px));
  }

  &--md {
    font-size: var(--pa-input-size-md-font, var(--pa-font-size-200, 16px));
  }

  &--lg {
    font-size: var(--pa-input-size-lg-font, var(--pa-font-size-400, 20px));
  }
}

.pa-input-container {
  position: relative;
  display: inline-flex;
  align-items: center;
  width: 100%;
}

.pa-input {
  width: 100%;
  font-family: var(--pa-font-family-roboto, Roboto, sans-serif);
  font-weight: var(--pa-font-weight-400, 400);
  background-color: var(--pa-input-background-default);
  color: var(--pa-input-text-default);
  border: var(--pa-input-border-width-default, var(--pa-Border-width-50, 1px)) solid var(--pa-input-border-default);
  border-radius: var(--pa-input-border-radius-default, var(--pa-Border-radius-100, 8px));
  transition: all var(--pa-input-transition-duration-default, var(--pa-transition-duration-default, 200ms)) var(--pa-input-transition-easing-default, var(--pa-transition-easing-default, ease));
  outline: none;

  &::placeholder {
    color: var(--pa-input-text-placeholder);
  }

  &--sm {
    padding: var(--pa-input-size-sm-padding-y) var(--pa-input-size-sm-padding-x);
    font-size: var(--pa-input-size-sm-font, var(--pa-font-size-100, 14px));
  }

  &--md {
    padding: var(--pa-input-size-md-padding-y) var(--pa-input-size-md-padding-x);
    font-size: var(--pa-input-size-md-font, var(--pa-font-size-200, 16px));
  }

  &--lg {
    padding: var(--pa-input-size-lg-padding-y) var(--pa-input-size-lg-padding-x);
    font-size: var(--pa-input-size-lg-font, var(--pa-font-size-400, 20px));
  }

  &:hover:not(.is-disabled) {
    background-color: var(--pa-input-background-hover);
    border-color: var(--pa-input-border-hover);
  }

  &:focus:not(.is-disabled) {
    background-color: var(--pa-input-background-focus);
    border-color: var(--pa-input-border-focus);
    outline: var(--pa-input-outline-width-default, var(--pa-outline-width-default, 2px)) solid var(--pa-input-border-focus);
    outline-offset: var(--pa-input-outline-offset-default, var(--pa-outline-offset-default, 2px));
  }

  &.is-error {
    border-color: var(--pa-input-border-error);

    &:focus {
      outline-color: var(--pa-input-border-error);
    }
  }

  &.is-disabled,
  &:disabled {
    background-color: var(--pa-input-background-disabled);
    color: var(--pa-input-text-disabled);
    border-color: var(--pa-input-border-disabled);
    cursor: var(--pa-cursor-not-allowed, not-allowed);
    opacity: calc(var(--pa-opacity-60, 60) / 100);
  }

  &.has-icon-left {
    padding-left: calc(var(--pa-input-size-md-padding-x, var(--pa-spacing-16, 16px)) + 24px);
  }

  &.has-icon-right {
    padding-right: calc(var(--pa-input-size-md-padding-x, var(--pa-spacing-16, 16px)) + 24px);
  }
}

.pa-input-icon {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--pa-input-icon-default);
  pointer-events: none;
  width: 20px;
  height: 20px;

  &--left {
    left: var(--pa-input-size-md-padding-x, var(--pa-spacing-16, 16px));
  }

  &--right {
    right: var(--pa-input-size-md-padding-x, var(--pa-spacing-16, 16px));
  }
}

.pa-input-wrapper.is-error {
  .pa-input-icon {
    color: var(--pa-input-icon-error);
  }
}
</style>

