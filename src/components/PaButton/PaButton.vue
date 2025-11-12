<script setup lang="ts">
defineProps<{
  variant?: 'primary' | 'secondary' | 'tertiary' | 'payment-navigation' | 'action'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
}>()
</script>

<template>
  <button
    :class="[
      'pa-button',
      `pa-button--${variant || 'primary'}`,
      `pa-button--${size || 'md'}`,
      { 'is-disabled': disabled }
    ]"
    :disabled="disabled"
  >
    <slot />
  </button>
</template>

<style lang="scss" scoped>
.pa-button {
  border: none;
  cursor: var(--pa-button-cursor-default, var(--pa-cursor-pointer, pointer));
  font-family: var(--pa-font-family-roboto, Roboto, sans-serif);
  font-weight: var(--pa-font-weight-400, 400);
  transition: all var(--pa-button-transition-duration-default, var(--pa-transition-duration-default, 200ms)) var(--pa-button-transition-easing-default, var(--pa-transition-easing-default, ease));
  display: inline-flex;
  align-items: center;
  justify-content: center;

  &--primary {
    background-color: var(--pa-button-primary-background-default);
    color: var(--pa-button-primary-text-default);
    border: var(--pa-button-border-width-default, var(--pa-Border-width-50, 1px)) solid var(--pa-button-primary-border-default);
    border-radius: var(--pa-button-primary-radius, var(--pa-Border-radius-100, 8px));

    &:hover:not(.is-disabled) {
      background-color: var(--pa-button-primary-background-hover);
    }

    &:active:not(.is-disabled) {
      background-color: var(--pa-button-primary-background-active);
    }

    &:focus-visible {
      outline: var(--pa-button-outline-width-default, var(--pa-outline-width-default, 2px)) solid var(--pa-button-primary-border-focus);
      outline-offset: var(--pa-button-outline-offset-default, var(--pa-outline-offset-default, 2px));
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
    border: var(--pa-button-border-width-default, var(--pa-Border-width-50, 1px)) solid var(--pa-button-secondary-border-default);
    border-radius: var(--pa-button-secondary-radius, var(--pa-Border-radius-100, 8px));

    &:hover:not(.is-disabled) {
      background-color: var(--pa-button-secondary-background-hover);
    }

    &:active:not(.is-disabled) {
      background-color: var(--pa-button-secondary-background-active);
    }

    &:focus-visible {
      outline: var(--pa-button-outline-width-default, var(--pa-outline-width-default, 2px)) solid var(--pa-button-secondary-border-focus);
      outline-offset: var(--pa-button-outline-offset-default, var(--pa-outline-offset-default, 2px));
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
    border: var(--pa-button-border-width-default, var(--pa-Border-width-50, 1px)) solid var(--pa-button-tertiary-border-default);
    border-radius: var(--pa-button-tertiary-radius, var(--pa-Border-radius-100, 8px));

    &:hover:not(.is-disabled) {
      background-color: var(--pa-button-tertiary-background-hover);
    }

    &:active:not(.is-disabled) {
      background-color: var(--pa-button-tertiary-background-active);
    }

    &:focus-visible {
      outline: var(--pa-button-outline-width-default, var(--pa-outline-width-default, 2px)) solid var(--pa-button-tertiary-border-focus);
      outline-offset: var(--pa-button-outline-offset-default, var(--pa-outline-offset-default, 2px));
    }

    &.is-disabled,
    &:disabled {
      background-color: var(--pa-button-tertiary-background-disabled);
      color: var(--pa-button-tertiary-text-disabled);
      border-color: var(--pa-button-tertiary-border-disabled);
    }
  }

  &--payment-navigation {
    background-color: var(--pa-button-payment-navigation-background-default);
    color: var(--pa-button-payment-navigation-text-default);
    border: var(--pa-button-border-width-default, var(--pa-Border-width-50, 1px)) solid var(--pa-button-payment-navigation-border-default);
    border-radius: var(--pa-button-payment-navigation-radius, var(--pa-Border-radius-100, 8px));

    &:hover:not(.is-disabled) {
      background-color: var(--pa-button-payment-navigation-background-hover);
    }

    &:active:not(.is-disabled) {
      background-color: var(--pa-button-payment-navigation-background-active);
    }

    &:focus-visible {
      outline: var(--pa-button-outline-width-default, var(--pa-outline-width-default, 2px)) solid var(--pa-button-payment-navigation-border-focus);
      outline-offset: var(--pa-button-outline-offset-default, var(--pa-outline-offset-default, 2px));
    }

    &.is-disabled,
    &:disabled {
      background-color: var(--pa-button-payment-navigation-background-disabled);
      color: var(--pa-button-payment-navigation-text-disabled);
      border-color: var(--pa-button-payment-navigation-border-disabled);
    }
  }

  &--action {
    background-color: var(--pa-button-action-background-default);
    color: var(--pa-button-action-text-default);
    border: var(--pa-button-border-width-default, var(--pa-Border-width-50, 1px)) solid var(--pa-button-action-border-default);
    border-radius: var(--pa-button-action-radius, var(--pa-Border-radius-100, 8px));

    &:hover:not(.is-disabled) {
      background-color: var(--pa-button-action-background-hover);
    }

    &:active:not(.is-disabled) {
      background-color: var(--pa-button-action-background-active);
    }

    &:focus-visible {
      outline: var(--pa-button-outline-width-default, var(--pa-outline-width-default, 2px)) solid var(--pa-button-action-border-focus);
      outline-offset: var(--pa-button-outline-offset-default, var(--pa-outline-offset-default, 2px));
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
    cursor: var(--pa-button-cursor-disabled, var(--pa-cursor-not-allowed, not-allowed));
    opacity: calc(var(--pa-opacity-60, 60) / 100);
  }
}
</style>
