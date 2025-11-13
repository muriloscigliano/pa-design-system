<script setup lang="ts">
defineProps<{
  variant?: 'primary' | 'secondary' | 'tertiary' | 'link' | 'action'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  loading?: boolean
  iconPosition?: 'left' | 'center' | 'right'
}>()
</script>

<template>
  <button
    :class="[
      'pa-button',
      `pa-button--${variant || 'primary'}`,
      `pa-button--${size || 'md'}`,
      {
        'has-icon-left': iconPosition === 'left',
        'has-icon-center': iconPosition === 'center',
        'has-icon-right': iconPosition === 'right'
      },
      { 
        'is-disabled': disabled || loading,
        'is-loading': loading
      }
    ]"
    :disabled="disabled || loading"
  >
    <span v-if="loading" class="pa-button-loader" aria-hidden="true"></span>
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
  gap: var(--pa-spacing-8, 8px);
  
  &.has-icon-left {
    justify-content: flex-start;
    gap: var(--pa-spacing-8, 8px);
  }
  
  &.has-icon-center {
    justify-content: center;
  }
  
  &.has-icon-right {
    justify-content: flex-end;
    gap: var(--pa-spacing-8, 8px);
  }

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

  &--link {
    background-color: transparent;
    color: var(--pa-button-link-text-default, var(--pa-color-action-primary-text-default));
    border: none;
    border-radius: 0;
    padding: 0;
    text-decoration: underline;
    text-underline-offset: var(--pa-spacing-4, 4px);

    &:hover:not(.is-disabled) {
      color: var(--pa-button-link-text-hover, var(--pa-color-action-primary-text-hover));
      text-decoration-thickness: 2px;
    }

    &:active:not(.is-disabled) {
      color: var(--pa-button-link-text-active, var(--pa-color-action-primary-text-active));
    }

    &:focus-visible {
      outline: var(--pa-button-outline-width-default, var(--pa-outline-width-default, 2px)) solid var(--pa-button-link-border-focus, var(--pa-color-action-primary-border-focus));
      outline-offset: var(--pa-button-outline-offset-default, var(--pa-outline-offset-default, 2px));
      border-radius: var(--pa-Border-radius-50, 4px);
    }

    &.is-disabled,
    &:disabled {
      color: var(--pa-button-link-text-disabled, var(--pa-color-action-primary-text-disabled));
      text-decoration: none;
      opacity: calc(var(--pa-opacity-60, 60) / 100);
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

  &.is-loading {
    position: relative;
    pointer-events: none;
    
    .pa-button-loader {
      display: inline-block;
      width: 16px;
      height: 16px;
      border: 2px solid currentColor;
      border-top-color: transparent;
      border-radius: 50%;
      animation: pa-button-spin 0.6s linear infinite;
      margin-right: var(--pa-spacing-8, 8px);
    }
  }
}

@keyframes pa-button-spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
