<script setup lang="ts">
defineProps<{
  to?: string
  href?: string
  active?: boolean
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
}>()
</script>

<template>
  <component
    :is="to || href ? 'a' : 'button'"
    :href="href"
    :to="to"
    :class="[
      'pa-nav-button',
      `pa-nav-button--${size || 'md'}`,
      {
        'is-active': active,
        'is-disabled': disabled
      }
    ]"
    :disabled="disabled"
  >
    <slot />
  </component>
</template>

<style lang="scss" scoped>
.pa-nav-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: transparent;
  cursor: var(--pa-nav-button-cursor, var(--pa-cursor-pointer, pointer));
  font-family: var(--pa-font-family-roboto, Roboto, sans-serif);
  text-decoration: none;
  transition: all var(--pa-nav-button-transition-duration, var(--pa-transition-duration-default, 200ms)) var(--pa-nav-button-transition-easing, var(--pa-transition-easing-default, ease));
  color: var(--pa-nav-button-text-default, var(--pa-color-surface-container-text));
  padding: var(--pa-nav-button-padding-y, var(--pa-spacing-8, 8px)) var(--pa-nav-button-padding-x, var(--pa-spacing-16, 16px));
  border-radius: var(--pa-nav-button-radius, var(--pa-Border-radius-100, 8px));

  &--sm {
    font-size: var(--pa-nav-button-size-sm-font, var(--pa-font-size-100, 14px));
    padding: var(--pa-nav-button-size-sm-padding-y, var(--pa-spacing-6, 6px)) var(--pa-nav-button-size-sm-padding-x, var(--pa-spacing-12, 12px));
  }

  &--md {
    font-size: var(--pa-nav-button-size-md-font, var(--pa-font-size-200, 16px));
    padding: var(--pa-nav-button-size-md-padding-y, var(--pa-spacing-8, 8px)) var(--pa-nav-button-size-md-padding-x, var(--pa-spacing-16, 16px));
  }

  &--lg {
    font-size: var(--pa-nav-button-size-lg-font, var(--pa-font-size-400, 32px));
    padding: var(--pa-nav-button-size-lg-padding-y, var(--pa-spacing-12, 12px)) var(--pa-nav-button-size-lg-padding-x, var(--pa-spacing-24, 24px));
  }

  &:hover:not(.is-disabled) {
    background-color: var(--pa-nav-button-background-hover, var(--pa-color-surface-cards-hover-background));
    color: var(--pa-nav-button-text-hover, var(--pa-color-surface-container-text));
  }

  &.is-active {
    background-color: var(--pa-nav-button-background-active, var(--pa-color-action-primary-background-default));
    color: var(--pa-nav-button-text-active, var(--pa-color-action-primary-text-default));
  }

  &.is-disabled,
  &:disabled {
    cursor: var(--pa-nav-button-cursor-disabled, var(--pa-cursor-not-allowed, not-allowed));
    opacity: calc(var(--pa-opacity-60, 60) / 100);
  }
}
</style>

