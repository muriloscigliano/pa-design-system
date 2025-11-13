<script setup lang="ts">
import { computed, ref } from 'vue'

const props = defineProps<{
  modelValue?: string | number
  disabled?: boolean
  error?: boolean
  valid?: boolean
  placeholder?: string
  type?: string
  label?: string
  optional?: boolean
  helperText?: string
  errorMessage?: string
  validMessage?: string
  iconLeft?: string
  iconRight?: string
  showClear?: boolean
  rightElement?: 'text' | 'icon' | 'dropdown' | 'checkbox' | 'toggle'
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string | number]
  'focus': [event: FocusEvent]
  'blur': [event: FocusEvent]
  'clear': []
}>()

const inputId = computed(() => `pa-input-${Math.random().toString(36).substr(2, 9)}`)
const helperId = computed(() => `${inputId.value}-helper`)
const errorId = computed(() => `${inputId.value}-error`)
const validId = computed(() => `${inputId.value}-valid`)

const isFocused = ref(false)
const hasValue = computed(() => props.modelValue !== undefined && props.modelValue !== null && props.modelValue !== '')
const isLabelFloating = computed(() => isFocused.value || hasValue.value)

const ariaDescribedBy = computed(() => {
  const ids: string[] = []
  if (props.helperText && !props.error && !props.valid) ids.push(helperId.value)
  if (props.error && props.errorMessage) ids.push(errorId.value)
  if (props.valid && props.validMessage) ids.push(validId.value)
  return ids.length > 0 ? ids.join(' ') : undefined
})

const clearInput = () => {
  emit('update:modelValue', '')
  emit('clear')
}

const handleFocus = (event: FocusEvent) => {
  isFocused.value = true
  emit('focus', event)
}

const handleBlur = (event: FocusEvent) => {
  isFocused.value = false
  emit('blur', event)
}
</script>

<template>
  <div
    :class="[
      'pa-input-wrapper',
      {
        'is-disabled': disabled,
        'is-error': error,
        'is-valid': valid,
        'has-label': label,
        'is-label-floating': isLabelFloating
      }
    ]"
  >
    <div class="pa-input-container">
      <span v-if="iconLeft" class="pa-input-icon pa-input-icon--left">
        <slot name="iconLeft">{{ iconLeft }}</slot>
      </span>

      <label
        v-if="label"
        :for="inputId"
        class="pa-input-label"
        :class="{ 'is-floating': isLabelFloating }"
      >
        {{ label }}
        <span v-if="optional" class="pa-input-label-optional">(Optional)</span>
      </label>

      <input
        :id="inputId"
        :class="[
          'pa-input',
          {
            'is-disabled': disabled,
            'is-error': error,
            'is-valid': valid,
            'has-icon-left': iconLeft,
            'has-icon-right': iconRight || showClear,
            'has-right-element': rightElement,
            'has-label': label,
            'is-label-floating': isLabelFloating
          }
        ]"
        :value="modelValue"
        :disabled="disabled"
        :placeholder="label ? undefined : placeholder"
        :type="type || 'text'"
        :aria-invalid="error"
        :aria-describedby="ariaDescribedBy"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
        @focus="handleFocus"
        @blur="handleBlur"
      />

      <button
        v-if="showClear && hasValue && !disabled"
        type="button"
        class="pa-input-clear"
        @click="clearInput"
        aria-label="Clear input"
      >
        <slot name="clearIcon">×</slot>
      </button>

      <span
        v-else-if="iconRight && !showClear"
        class="pa-input-icon pa-input-icon--right"
      >
        <slot name="iconRight">{{ iconRight }}</slot>
      </span>

      <span
        v-else-if="error"
        class="pa-input-icon pa-input-icon--right pa-input-icon--error"
        aria-hidden="true"
      >
        <slot name="errorIcon">!</slot>
      </span>

      <span
        v-else-if="valid"
        class="pa-input-icon pa-input-icon--right pa-input-icon--success"
        aria-hidden="true"
      >
        <slot name="validIcon">✓</slot>
      </span>

      <div
        v-if="rightElement"
        class="pa-input-right-element"
      >
        <slot name="rightElement">
          <span v-if="rightElement === 'text'">Text</span>
          <span v-else-if="rightElement === 'icon'">📅</span>
          <span v-else-if="rightElement === 'dropdown'">▼</span>
          <span v-else-if="rightElement === 'checkbox'">☐</span>
          <span v-else-if="rightElement === 'toggle'">○</span>
        </slot>
      </div>
    </div>

    <span
      v-if="helperText && !error && !valid"
      :id="helperId"
      class="pa-input-helper"
    >
      {{ helperText }}
    </span>

    <span
      v-if="error && errorMessage"
      :id="errorId"
      class="pa-input-message pa-input-message--error"
    >
      {{ errorMessage }}
    </span>

    <span
      v-if="valid && validMessage"
      :id="validId"
      class="pa-input-message pa-input-message--valid"
    >
      {{ validMessage }}
    </span>
  </div>
</template>

<style lang="scss" scoped>
.pa-input-wrapper {
  display: inline-flex;
  flex-direction: column;
  width: 100%;
}

.pa-input-container {
  position: relative;
  display: inline-flex;
  align-items: center;
  width: 100%;
}

.pa-input-label {
  position: absolute;
  left: var(--pa-input-padding-x, var(--pa-spacing-200, 16px));
  top: 50%;
  transform: translateY(-50%);
  font-size: var(--pa-input-font-size, var(--pa-font-size-lg, 16px));
  font-weight: var(--pa-input-label-font-weight, var(--pa-font-weight-400, 400));
  color: var(--pa-input-text-default);
  pointer-events: none;
  transition: all var(--pa-input-transition-duration-default, var(--pa-transition-duration-default, 200ms)) var(--pa-input-transition-easing-default, var(--pa-transition-easing-default, ease));
  z-index: 1;
  white-space: nowrap;
  max-width: calc(100% - calc(var(--pa-input-padding-x, var(--pa-spacing-200, 16px)) * 2));

  &.is-floating {
    top: var(--pa-input-padding-y, var(--pa-spacing-100, 8px));
    transform: none;
    font-size: var(--pa-input-label-font-size, var(--pa-font-size-sm, 12px));
    color: var(--pa-input-text-placeholder);
    line-height: 1;
  }
}

.pa-input-wrapper.has-icon-left .pa-input-label {
  left: calc(var(--pa-input-icon-spacing-left, var(--pa-spacing-200, 16px)) + var(--pa-input-icon-size, var(--pa-spacing-200, 20px)) + var(--pa-spacing-100, 8px));
  max-width: calc(100% - calc(var(--pa-input-padding-x, var(--pa-spacing-200, 16px)) * 2) - var(--pa-input-icon-size, var(--pa-spacing-200, 20px)) - var(--pa-input-icon-spacing-left, var(--pa-spacing-200, 16px)) - var(--pa-spacing-100, 8px));

  &.is-floating {
    left: calc(var(--pa-input-icon-spacing-left, var(--pa-spacing-200, 16px)) + var(--pa-input-icon-size, var(--pa-spacing-200, 20px)) + var(--pa-spacing-100, 8px));
  }
}

.pa-input-label-optional {
  color: var(--pa-input-label-color-optional, var(--pa-input-text-placeholder));
  font-weight: var(--pa-font-weight-400, 400);
}

.pa-input {
  width: 100%;
  height: var(--pa-input-height-default, var(--pa-spacing-700, 56px));
  box-sizing: border-box;
  font-family: var(--pa-font-family-roboto, Roboto, sans-serif);
  font-size: var(--pa-input-font-size, var(--pa-font-size-lg, 16px));
  font-weight: var(--pa-input-font-weight, var(--pa-font-weight-400, 400));
  padding: var(--pa-input-padding-y, var(--pa-spacing-100, 8px)) var(--pa-input-padding-x, var(--pa-spacing-200, 16px));
  background-color: var(--pa-input-background-default);
  color: var(--pa-input-text-default);
  border: var(--pa-input-border-width-default, var(--pa-border-width-thin, 1px)) solid var(--pa-input-border-default);
  border-radius: var(--pa-input-border-radius-default, var(--pa-border-radius-medium, 8px));
  transition: all var(--pa-input-transition-duration-default, var(--pa-transition-duration-default, 200ms)) var(--pa-input-transition-easing-default, var(--pa-transition-easing-default, ease));
  outline: none;


  &::placeholder {
    color: transparent;
  }

  &.has-label.is-label-floating {
    padding-top: calc(var(--pa-input-padding-y, var(--pa-spacing-100, 8px)) + var(--pa-input-label-font-size, var(--pa-font-size-sm, 12px)) + 6px);
    padding-bottom: var(--pa-input-padding-y, var(--pa-spacing-100, 8px));
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

  &.is-valid {
    border-color: var(--pa-input-border-valid);

    &:focus {
      outline-color: var(--pa-input-border-valid);
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
    padding-left: calc(var(--pa-input-padding-x, var(--pa-spacing-200, 16px)) + var(--pa-input-icon-size, var(--pa-spacing-200, 20px)) + var(--pa-input-icon-spacing-left, var(--pa-spacing-200, 16px)));
  }

  &.has-icon-right {
    padding-right: calc(var(--pa-input-padding-x, var(--pa-spacing-200, 16px)) + var(--pa-input-icon-size, var(--pa-spacing-200, 20px)) + var(--pa-input-icon-spacing-right, var(--pa-spacing-200, 16px)));
  }

  &.has-right-element {
    padding-right: calc(var(--pa-input-padding-x, var(--pa-spacing-200, 16px)) + var(--pa-input-right-element-width, var(--pa-spacing-500, 48px)) + var(--pa-input-right-element-spacing-left, var(--pa-spacing-100, 8px)));
  }
}

.pa-input-icon {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--pa-input-icon-default);
  pointer-events: none;
  width: var(--pa-input-icon-size, var(--pa-spacing-200, 20px));
  height: var(--pa-input-icon-size, var(--pa-spacing-200, 20px));
  font-size: var(--pa-input-icon-size, var(--pa-spacing-200, 20px));
  line-height: 1;
  z-index: 2;

  &--left {
    left: var(--pa-input-icon-spacing-left, var(--pa-spacing-200, 16px));
  }

  &--right {
    right: var(--pa-input-icon-spacing-right, var(--pa-spacing-200, 16px));
  }

  &--error {
    color: var(--pa-input-icon-error);
  }

  &--success {
    color: var(--pa-input-icon-success);
  }
}

.pa-input-wrapper.is-error {
  .pa-input-icon {
    color: var(--pa-input-icon-error);
  }
}

.pa-input-wrapper.is-valid {
  .pa-input-icon {
    color: var(--pa-input-icon-success);
  }
}

.pa-input-clear {
  position: absolute;
  right: var(--pa-input-icon-spacing-right, var(--pa-spacing-200, 16px));
  display: flex;
  align-items: center;
  justify-content: center;
  width: var(--pa-input-icon-size, var(--pa-spacing-200, 20px));
  height: var(--pa-input-icon-size, var(--pa-spacing-200, 20px));
  background: none;
  border: none;
  color: var(--pa-input-icon-default);
  cursor: pointer;
  font-size: var(--pa-input-icon-size, var(--pa-spacing-200, 20px));
  line-height: 1;
  padding: 0;
  z-index: 2;
  transition: color var(--pa-input-transition-duration-default, var(--pa-transition-duration-default, 200ms)) var(--pa-input-transition-easing-default, var(--pa-transition-easing-default, ease));

  &:hover {
    color: var(--pa-input-text-default);
  }

  &:focus {
    outline: var(--pa-input-outline-width-default, var(--pa-outline-width-default, 2px)) solid var(--pa-input-border-focus);
    outline-offset: var(--pa-input-outline-offset-default, var(--pa-outline-offset-default, 2px));
    border-radius: 2px;
  }
}

.pa-input-right-element {
  position: absolute;
  right: var(--pa-input-right-element-spacing-left, var(--pa-spacing-100, 8px));
  display: flex;
  align-items: center;
  justify-content: center;
  width: var(--pa-input-right-element-width, var(--pa-spacing-500, 48px));
  height: 100%;
  pointer-events: none;
  z-index: 2;
}

.pa-input-helper {
  display: block;
  font-size: var(--pa-input-helper-font-size, var(--pa-font-size-sm, 12px));
  font-weight: var(--pa-input-helper-font-weight, var(--pa-font-weight-400, 400));
  color: var(--pa-input-helper-color-default, var(--pa-input-text-placeholder));
  margin-top: var(--pa-input-helper-spacing-top, var(--pa-spacing-50, 4px));
}

.pa-input-message {
  display: block;
  margin-top: var(--pa-input-message-error-spacing-top, var(--pa-spacing-50, 4px));

  &--error {
    font-size: var(--pa-input-message-error-font-size, var(--pa-font-size-sm, 12px));
    font-weight: var(--pa-input-message-error-font-weight, var(--pa-font-weight-400, 400));
    color: var(--pa-input-message-error-color, var(--pa-input-border-error));
  }

  &--valid {
    font-size: var(--pa-input-message-valid-font-size, var(--pa-font-size-sm, 12px));
    font-weight: var(--pa-input-message-valid-font-weight, var(--pa-font-weight-400, 400));
    color: var(--pa-input-message-valid-color, var(--pa-input-border-valid));
    margin-top: var(--pa-input-message-valid-spacing-top, var(--pa-spacing-50, 4px));
  }
}

@media (max-width: 768px) {
  .pa-input-wrapper {
    width: 100%;
  }

  .pa-input-container {
    width: 100%;
  }

  .pa-input {
    width: 100%;
  }
}
</style>
