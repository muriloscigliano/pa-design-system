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
  left: var(--pa-input-padding-x);
  top: 50%;
  transform: translateY(-50%);
  font-size: var(--pa-input-font-size);
  font-weight: var(--pa-input-label-font-weight);
  color: var(--pa-input-text-default);
  pointer-events: none;
  transition: all var(--pa-input-transition-duration-default) var(--pa-input-transition-easing-default);
  z-index: 1;
  white-space: nowrap;
  max-width: calc(100% - calc(var(--pa-input-padding-x) * 2));

  &.is-floating {
    top: var(--pa-input-padding-y);
    transform: none;
    font-size: var(--pa-input-label-font-size);
    color: var(--pa-input-text-placeholder);
    line-height: 1;
  }
}

.pa-input-wrapper.has-icon-left .pa-input-label {
  left: calc(var(--pa-input-padding-x) + var(--pa-input-icon-size) + var(--pa-input-icon-spacing-left));
  max-width: calc(100% - calc(var(--pa-input-padding-x) * 2) - var(--pa-input-icon-size) - var(--pa-input-icon-spacing-left));

  &:not(.is-floating) {
    left: calc(var(--pa-input-padding-x) + var(--pa-input-icon-size) + var(--pa-input-icon-spacing-left));
  }

  &.is-floating {
    left: calc(var(--pa-input-icon-spacing-left) + var(--pa-input-icon-size) + var(--pa-input-padding-x));
  }
}

.pa-input-label-optional {
  color: var(--pa-input-label-color-optional);
  font-weight: var(--pa-input-label-font-weight);
}

.pa-input {
  width: 100%;
  height: var(--pa-input-height-default);
  box-sizing: border-box;
  font-family: var(--pa-font-family-roboto, Roboto, sans-serif);
  font-size: var(--pa-input-font-size);
  font-weight: var(--pa-input-font-weight);
  padding: var(--pa-input-padding-y) var(--pa-input-padding-x);
  background-color: var(--pa-input-background-default);
  color: var(--pa-input-text-default);
  border: var(--pa-input-border-width-default) solid var(--pa-input-border-default);
  border-radius: var(--pa-input-border-radius-default);
  transition: all var(--pa-input-transition-duration-default) var(--pa-input-transition-easing-default);
  outline: none;


  &::placeholder {
    color: transparent;
  }

  &.has-label.is-label-floating {
    padding-top: calc(var(--pa-input-padding-y) + var(--pa-input-label-font-size) + var(--pa-input-label-spacing-gap));
    padding-bottom: var(--pa-input-padding-y);
  }

  &:hover:not(.is-disabled) {
    background-color: var(--pa-input-background-hover);
    border-color: var(--pa-input-border-hover);
  }

  &:focus:not(.is-disabled) {
    background-color: var(--pa-input-background-focus);
    border-color: var(--pa-input-border-focus);
    outline: var(--pa-input-outline-width-default) solid var(--pa-input-border-focus);
    outline-offset: var(--pa-input-outline-offset-default);
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
    cursor: var(--pa-cursor-not-allowed);
    opacity: calc(var(--pa-opacity-60) / 100);
  }

  &.has-icon-left {
    padding-left: calc(var(--pa-input-padding-x) + var(--pa-input-icon-size) + var(--pa-input-icon-spacing-left));
  }

  &.has-icon-right {
    padding-right: calc(var(--pa-input-padding-x) + var(--pa-input-icon-size) + var(--pa-input-icon-spacing-right));
  }

  &.has-right-element {
    padding-right: calc(var(--pa-input-padding-x) + var(--pa-input-right-element-width) + var(--pa-input-right-element-spacing-left));
  }
}

.pa-input-icon {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--pa-input-icon-default);
  pointer-events: none;
  width: var(--pa-input-icon-size);
  height: var(--pa-input-icon-size);
  font-size: var(--pa-input-icon-size);
  line-height: 1;
  z-index: 2;

  &--left {
    left: var(--pa-input-icon-spacing-left);
  }

  &--right {
    right: var(--pa-input-icon-spacing-right);
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
  right: var(--pa-input-icon-spacing-right);
  display: flex;
  align-items: center;
  justify-content: center;
  width: var(--pa-input-icon-size);
  height: var(--pa-input-icon-size);
  background: none;
  border: none;
  color: var(--pa-input-icon-default);
  cursor: pointer;
  font-size: var(--pa-input-icon-size);
  line-height: 1;
  padding: 0;
  z-index: 2;
  transition: color var(--pa-input-transition-duration-default) var(--pa-input-transition-easing-default);

  &:hover {
    color: var(--pa-input-text-default);
  }

  &:focus {
    outline: var(--pa-input-outline-width-default) solid var(--pa-input-border-focus);
    outline-offset: var(--pa-input-outline-offset-default);
    border-radius: var(--pa-input-border-radius-default);
  }
}

.pa-input-right-element {
  position: absolute;
  right: var(--pa-input-right-element-spacing-left);
  display: flex;
  align-items: center;
  justify-content: center;
  width: var(--pa-input-right-element-width);
  height: 100%;
  pointer-events: none;
  z-index: 2;
}

.pa-input-helper {
  display: block;
  font-size: var(--pa-input-helper-font-size);
  font-weight: var(--pa-input-helper-font-weight);
  color: var(--pa-input-helper-color-default);
  margin-top: var(--pa-input-helper-spacing-top);
}

.pa-input-message {
  display: block;
  margin-top: var(--pa-input-message-error-spacing-top);

  &--error {
    font-size: var(--pa-input-message-error-font-size);
    font-weight: var(--pa-input-message-error-font-weight);
    color: var(--pa-input-message-error-color);
  }

  &--valid {
    font-size: var(--pa-input-message-valid-font-size);
    font-weight: var(--pa-input-message-valid-font-weight);
    color: var(--pa-input-message-valid-color);
    margin-top: var(--pa-input-message-valid-spacing-top);
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
