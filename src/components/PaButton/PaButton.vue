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
    :aria-busy="loading"
    :aria-live="loading ? 'polite' : undefined"
  >
    <span v-if="loading" class="pa-button-loader" aria-hidden="true"></span>
    <slot />
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
  .pa-button {
    width: 100%;
  }
}
</style>
