<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  variant?: 'primary' | 'secondary' | 'tertiary' | 'link' | 'action'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  loading?: boolean
  isLoading?: boolean // Alias for loading (external library compatibility)
  iconPosition?: 'left' | 'center' | 'right'
  icon?: string // Icon name (external library compatibility)
  iconRight?: boolean // External library compatibility
  block?: boolean // Full width button
  shape?: 'square' | 'circle' // Button shape
  type?: 'button' | 'submit' | 'reset'
  preventDefault?: boolean // Prevent default click behavior
  sfSelector?: string // Salesforce selector (external library compatibility)
}>(), {
  variant: 'primary',
  size: 'md',
  disabled: false,
  loading: false,
  isLoading: false,
  iconPosition: 'left',
  iconRight: false,
  block: false,
  shape: 'square',
  type: 'button',
  preventDefault: false,
  sfSelector: ''
})

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

const isActuallyLoading = computed(() => props.loading || props.isLoading)

const validatedType = computed((): 'submit' | 'reset' | 'button' => {
  if (['button', 'submit', 'reset'].includes(props.type || 'button')) {
    return props.type as 'submit' | 'reset' | 'button'
  }
  return 'button'
})

const effectiveIconPosition = computed(() => {
  if (props.iconRight) return 'right'
  return props.iconPosition
})

const handleClick = (event: MouseEvent) => {
  if (props.preventDefault) {
    event.preventDefault()
  }
  if (props.disabled || isActuallyLoading.value) {
    return
  }
  emit('click', event)
}
</script>

<template>
  <button
    :type="validatedType"
    :class="[
      'pa-button',
      `pa-button--${variant}`,
      `pa-button--${size}`,
      `pa-button--shape-${shape}`,
      {
        'has-icon-left': effectiveIconPosition === 'left',
        'has-icon-center': effectiveIconPosition === 'center',
        'has-icon-right': effectiveIconPosition === 'right',
        'is-block': block,
        'is-disabled': disabled || isActuallyLoading,
        'is-loading': isActuallyLoading,
        'has-icon': icon,
        'icon-lone': icon && !$slots.default
      }
    ]"
    :disabled="disabled || isActuallyLoading"
    :aria-busy="isActuallyLoading"
    :aria-live="isActuallyLoading ? 'polite' : undefined"
    :sf-selector="sfSelector || undefined"
    @click="handleClick"
  >
    <span v-if="icon && $slots.default && effectiveIconPosition === 'left'" class="pa-button-icon pa-button-icon--left">
      <slot name="icon">{{ icon }}</slot>
    </span>
    <slot />
    <span v-if="icon && $slots.default && effectiveIconPosition === 'right'" class="pa-button-icon pa-button-icon--right">
      <slot name="icon">{{ icon }}</slot>
    </span>
    <span v-if="icon && !$slots.default" class="pa-button-icon pa-button-icon--lone">
      <slot name="icon">{{ icon }}</slot>
    </span>
    <span v-if="isActuallyLoading" class="pa-button-loader" aria-hidden="true"></span>
  </button>
</template>

<style lang="scss" scoped>
.pa-button {
  border: none;
  cursor: var(--pa-button-cursor-default);
  font-family: var(--pa-font-family-roboto, Roboto, sans-serif);
  font-weight: var(--pa-font-weight-regular);
  transition: all var(--pa-button-transition-duration-default) var(--pa-button-transition-easing-default);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--pa-button-icon-gap);
  
  &.has-icon-left {
    justify-content: flex-start;
    gap: var(--pa-button-icon-gap);
  }
  
  &.has-icon-center {
    justify-content: center;
  }
  
  &.has-icon-right {
    justify-content: flex-end;
    gap: var(--pa-button-icon-gap);
  }

  &.is-block {
    width: 100%;
    min-width: 100%;
  }

  &--shape-circle {
    border-radius: var(--pa-border-radius-full);
    aspect-ratio: 1;
    padding: var(--pa-button-size-md-padding-y);
  }

  &.has-icon {
    &.has-icon-left:not(.icon-lone) {
      justify-content: flex-start;
    }
    &.has-icon-right:not(.icon-lone) {
      justify-content: flex-end;
    }
  }

  &.icon-lone {
    justify-content: center;
    padding: var(--pa-button-size-md-padding-y);
  }

  .pa-button-icon {
    display: inline-flex;
    align-items: center;
    flex-shrink: 0;
  }

  &--primary {
    background-color: var(--pa-button-primary-background-default);
    color: var(--pa-button-primary-text-default);
    border: var(--pa-button-border-width-default) solid var(--pa-button-primary-border-default);
    border-radius: var(--pa-button-primary-radius);

    &:hover:not(.is-disabled) {
      background-color: var(--pa-button-primary-background-hover);
    }

    &:active:not(.is-disabled) {
      background-color: var(--pa-button-primary-background-active);
    }

    &:focus-visible {
      outline: var(--pa-button-outline-width-default) solid var(--pa-button-primary-border-focus);
      outline-offset: var(--pa-button-outline-offset-default);
    }

    &.is-disabled,
    &:disabled {
      background-color: var(--pa-button-primary-background-disabled);
      color: var(--pa-button-primary-text-disabled);
      border-color: var(--pa-button-primary-border-disabled);
    }
  }

  &--secondary {
    background-color: var(--pa-button-secondary-background-default);
    color: var(--pa-button-secondary-text-default);
    border: var(--pa-button-border-width-default) solid var(--pa-button-secondary-border-default);
    border-radius: var(--pa-button-secondary-radius);

    &:hover:not(.is-disabled) {
      background-color: var(--pa-button-secondary-background-hover);
    }

    &:active:not(.is-disabled) {
      background-color: var(--pa-button-secondary-background-active);
    }

    &:focus-visible {
      outline: var(--pa-button-outline-width-default) solid var(--pa-button-secondary-border-focus);
      outline-offset: var(--pa-button-outline-offset-default);
    }

    &.is-disabled,
    &:disabled {
      background-color: var(--pa-button-secondary-background-disabled);
      color: var(--pa-button-secondary-text-disabled);
      border-color: var(--pa-button-secondary-border-disabled);
    }
  }

  &--tertiary {
    background-color: var(--pa-button-tertiary-background-default);
    color: var(--pa-button-tertiary-text-default);
    border: var(--pa-button-border-width-default) solid var(--pa-button-tertiary-border-default);
    border-radius: var(--pa-button-tertiary-radius);

    &:hover:not(.is-disabled) {
      background-color: var(--pa-button-tertiary-background-hover);
    }

    &:active:not(.is-disabled) {
      background-color: var(--pa-button-tertiary-background-active);
    }

    &:focus-visible {
      outline: var(--pa-button-outline-width-default) solid var(--pa-button-tertiary-border-focus);
      outline-offset: var(--pa-button-outline-offset-default);
    }

    &.is-disabled,
    &:disabled {
      background-color: var(--pa-button-tertiary-background-disabled);
      color: var(--pa-button-tertiary-text-disabled);
      border-color: var(--pa-button-tertiary-border-disabled);
    }
  }

  &--link {
    background-color: transparent;
    color: var(--pa-button-link-text-default);
    border: none;
    border-radius: 0;
    padding: 0;
    text-decoration: underline;
    text-underline-offset: var(--pa-button-link-underline-offset);

    &:hover:not(.is-disabled) {
      color: var(--pa-button-link-text-hover);
      text-decoration-thickness: var(--pa-button-link-underline-thickness);
    }

    &:active:not(.is-disabled) {
      color: var(--pa-button-link-text-active);
    }

    &:focus-visible {
      outline: var(--pa-button-outline-width-default) solid var(--pa-button-link-border-focus);
      outline-offset: var(--pa-button-outline-offset-default);
      border-radius: var(--pa-border-radius-small);
    }

    &.is-disabled,
    &:disabled {
      color: var(--pa-button-link-text-disabled);
      text-decoration: none;
      opacity: calc(var(--pa-opacity-60) / 100);
    }
  }

  &--action {
    background-color: var(--pa-button-action-background-default);
    color: var(--pa-button-action-text-default);
    border: var(--pa-button-border-width-default) solid var(--pa-button-action-border-default);
    border-radius: var(--pa-button-action-radius);

    &:hover:not(.is-disabled) {
      background-color: var(--pa-button-action-background-hover);
    }

    &:active:not(.is-disabled) {
      background-color: var(--pa-button-action-background-active);
    }

    &:focus-visible {
      outline: var(--pa-button-outline-width-default) solid var(--pa-button-action-border-focus);
      outline-offset: var(--pa-button-outline-offset-default);
    }

    &.is-disabled,
    &:disabled {
      background-color: var(--pa-button-action-background-disabled);
      color: var(--pa-button-action-text-disabled);
      border-color: var(--pa-button-action-border-disabled);
    }
  }

  &--sm {
    padding: var(--pa-button-size-sm-padding-y) var(--pa-button-size-sm-padding-x);
    font-size: var(--pa-button-size-sm-font);
  }

  &--md {
    padding: var(--pa-button-size-md-padding-y) var(--pa-button-size-md-padding-x);
    font-size: var(--pa-button-size-md-font);
  }

  &--lg {
    padding: var(--pa-button-size-lg-padding-y) var(--pa-button-size-lg-padding-x);
    font-size: var(--pa-button-size-lg-font);
  }

  &.is-disabled,
  &:disabled {
    cursor: var(--pa-button-cursor-disabled);
    opacity: calc(var(--pa-opacity-60) / 100);
  }

  &.is-loading {
    position: relative;
    pointer-events: none;
    
    .pa-button-loader {
      display: inline-block;
      width: var(--pa-icon-size-sm);
      height: var(--pa-icon-size-sm);
      border: var(--pa-button-border-width-default) solid currentColor;
      border-top-color: transparent;
      border-radius: 50%;
      animation: pa-button-spin 0.6s linear infinite;
      margin-right: var(--pa-button-icon-gap);
    }
  }
}

@keyframes pa-button-spin {
  to {
    transform: rotate(360deg);
  }
}

@media (max-width: 768px) {
  .pa-button:not(.icon-lone) {
    width: 100%;
    min-width: 100%;
  }
}
</style>
