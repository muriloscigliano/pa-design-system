<script setup lang="ts">
defineProps<{
  variant?: 'default' | 'subtle' | 'outlined' | 'elevated'
  size?: 'sm' | 'md' | 'lg'
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  centered?: boolean
}>()
</script>

<template>
  <div
    :class="[
      'pa-container',
      `pa-container--${variant || 'default'}`,
      `pa-container--${size || 'md'}`,
      {
        'is-centered': centered
      }
    ]"
    :style="{
      maxWidth: maxWidth ? `var(--pa-container-max-width-${maxWidth})` : undefined
    }"
  >
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.pa-container {
  width: 100%;
  background-color: var(--pa-container-background-default, var(--pa-color-surface-container-background));

  &--subtle {
    background-color: var(--pa-container-background-subtle, var(--pa-color-surface-base-background));
  }

  &--outlined {
    border: var(--pa-container-border-width) solid var(--pa-container-border);
    border-radius: var(--pa-container-border-radius);
  }

  &--elevated {
    box-shadow: var(--pa-container-shadow);
    border-radius: var(--pa-container-border-radius);
  }

  &--sm {
    padding: var(--pa-container-padding-sm-y) var(--pa-container-padding-sm-x);
  }

  &--md {
    padding: var(--pa-container-padding-md-y) var(--pa-container-padding-md-x);
  }

  &--lg {
    padding: var(--pa-container-padding-lg-y) var(--pa-container-padding-lg-x);
  }

  &.is-centered {
    margin-left: auto;
    margin-right: auto;
  }
}
</style>

