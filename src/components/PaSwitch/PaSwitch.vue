<script setup lang="ts">
defineProps<{
  modelValue?: boolean
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  label?: string
}>()

defineEmits<{
  'update:modelValue': [value: boolean]
  'change': [value: boolean]
}>()
</script>

<template>
  <label
    :class="[
      'pa-switch',
      `pa-switch--${size || 'md'}`,
      {
        'is-disabled': disabled,
        'is-on': modelValue
      }
    ]"
  >
    <input
      type="checkbox"
      :checked="modelValue"
      :disabled="disabled"
      :aria-checked="modelValue"
      role="switch"
      class="pa-switch-input"
      @change="$emit('update:modelValue', ($event.target as HTMLInputElement).checked); $emit('change', ($event.target as HTMLInputElement).checked)"
    />
    <span class="pa-switch-track">
      <span class="pa-switch-thumb"></span>
    </span>
    <span v-if="label" class="pa-switch-label">{{ label }}</span>
  </label>
</template>

<style lang="scss" scoped>
.pa-switch {
  display: inline-flex;
  align-items: center;
  gap: var(--pa-switch-gap);
  cursor: var(--pa-cursor-pointer);
  font-family: var(--pa-font-family-roboto, Roboto, sans-serif);
  font-weight: var(--pa-font-weight-regular);

  &.is-disabled {
    cursor: var(--pa-cursor-not-allowed);
    opacity: calc(var(--pa-opacity-60) / 100);
  }
}

.pa-switch-input {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
}

.pa-switch-track {
  position: relative;
  display: inline-flex;
  align-items: center;
  background-color: var(--pa-switch-background-off);
  border-radius: var(--pa-switch-border-radius);
  transition: all var(--pa-switch-transition-duration-default) var(--pa-switch-transition-easing-default);
  flex-shrink: 0;

  .pa-switch--sm & {
    width: var(--pa-switch-size-sm-width);
    height: var(--pa-switch-size-sm-height);
  }

  .pa-switch--md & {
    width: var(--pa-switch-size-md-width);
    height: var(--pa-switch-size-md-height);
  }

  .pa-switch--lg & {
    width: var(--pa-switch-size-lg-width);
    height: var(--pa-switch-size-lg-height);
  }

  .pa-switch.is-on & {
    background-color: var(--pa-switch-background-on);
  }

  .pa-switch.is-disabled & {
    background-color: var(--pa-switch-background-disabled);
  }

  .pa-switch-input:focus-visible + & {
    outline: var(--pa-switch-outline-width-default) solid var(--pa-switch-border-focus);
    outline-offset: var(--pa-switch-outline-offset-default);
  }
}

.pa-switch-thumb {
  position: absolute;
  background-color: var(--pa-switch-thumb-off);
  border-radius: var(--pa-switch-border-radius);
  transition: all var(--pa-switch-transition-duration-default) var(--pa-switch-transition-easing-default);
  left: var(--pa-switch-thumb-spacing-left);

  .pa-switch--sm & {
    width: var(--pa-switch-size-sm-thumb);
    height: var(--pa-switch-size-sm-thumb);
  }

  .pa-switch--md & {
    width: var(--pa-switch-size-md-thumb);
    height: var(--pa-switch-size-md-thumb);
  }

  .pa-switch--lg & {
    width: var(--pa-switch-size-lg-thumb);
    height: var(--pa-switch-size-lg-thumb);
  }

  .pa-switch.is-on & {
    background-color: var(--pa-switch-thumb-on);
    transform: translateX(calc(var(--pa-switch-size-md-width) - var(--pa-switch-size-md-thumb) - var(--pa-switch-thumb-spacing-right)));
  }

  .pa-switch--sm.is-on & {
    transform: translateX(calc(var(--pa-switch-size-sm-width) - var(--pa-switch-size-sm-thumb) - var(--pa-switch-thumb-spacing-right)));
  }

  .pa-switch--lg.is-on & {
    transform: translateX(calc(var(--pa-switch-size-lg-width) - var(--pa-switch-size-lg-thumb) - var(--pa-switch-thumb-spacing-right)));
  }

  .pa-switch.is-disabled & {
    background-color: var(--pa-switch-thumb-disabled);
  }
}

.pa-switch-label {
  color: var(--pa-input-text-default);
  user-select: none;
}
</style>

