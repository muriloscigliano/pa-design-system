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
  cursor: var(--pa-nav-button-cursor-default);
  font-family: var(--pa-font-family-roboto, Roboto, sans-serif);
  text-decoration: none;
  transition: all var(--pa-nav-button-transition-duration) var(--pa-nav-button-transition-easing);
  color: var(--pa-nav-button-text-default);
  padding: var(--pa-nav-button-padding-y) var(--pa-nav-button-padding-x);
  border-radius: var(--pa-nav-button-radius);

  &--sm {
    font-size: var(--pa-nav-button-size-sm-font);
    padding: var(--pa-nav-button-size-sm-padding-y) var(--pa-nav-button-size-sm-padding-x);
  }

  &--md {
    font-size: var(--pa-nav-button-size-md-font);
    padding: var(--pa-nav-button-size-md-padding-y) var(--pa-nav-button-size-md-padding-x);
  }

  &--lg {
    font-size: var(--pa-nav-button-size-lg-font);
    padding: var(--pa-nav-button-size-lg-padding-y) var(--pa-nav-button-size-lg-padding-x);
  }

  &:hover:not(.is-disabled) {
    background-color: var(--pa-nav-button-background-hover);
    color: var(--pa-nav-button-text-hover);
  }

  &.is-active {
    background-color: var(--pa-nav-button-background-active);
    color: var(--pa-nav-button-text-active);
  }

  &.is-disabled,
  &:disabled {
    cursor: var(--pa-nav-button-cursor-disabled);
    opacity: calc(var(--pa-nav-button-disabled-opacity) / 100);
  }
}
</style>

