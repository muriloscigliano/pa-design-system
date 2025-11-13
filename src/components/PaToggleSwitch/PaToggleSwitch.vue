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
      'pa-toggle-switch',
      `pa-toggle-switch--${size || 'md'}`,
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
      class="pa-toggle-switch-input"
      @change="$emit('update:modelValue', ($event.target as HTMLInputElement).checked); $emit('change', ($event.target as HTMLInputElement).checked)"
    />
    <span class="pa-toggle-switch-track">
      <span class="pa-toggle-switch-thumb"></span>
    </span>
    <span v-if="label" class="pa-toggle-switch-label">{{ label }}</span>
  </label>
</template>

<style lang="scss" scoped>
.pa-toggle-switch {
  display: inline-flex;
  align-items: center;
  gap: var(--pa-spacing-8, 8px);
  cursor: var(--pa-cursor-pointer, pointer);
  font-family: var(--pa-font-family-roboto, Roboto, sans-serif);
  font-weight: var(--pa-font-weight-400, 400);

  &.is-disabled {
    cursor: var(--pa-cursor-not-allowed, not-allowed);
    opacity: calc(var(--pa-opacity-60, 60) / 100);
  }
}

.pa-toggle-switch-input {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
}

.pa-toggle-switch-track {
  position: relative;
  display: inline-flex;
  align-items: center;
  background-color: var(--pa-toggle-switch-background-off);
  border-radius: var(--pa-Border-radius-full, 99999px);
  transition: all var(--pa-toggle-switch-transition-duration-default, var(--pa-transition-duration-default, 200ms)) var(--pa-toggle-switch-transition-easing-default, var(--pa-transition-easing-default, ease));
  flex-shrink: 0;

  .pa-toggle-switch--sm & {
    width: var(--pa-toggle-switch-size-sm-width, 32px);
    height: var(--pa-toggle-switch-size-sm-height, 18px);
  }

  .pa-toggle-switch--md & {
    width: var(--pa-toggle-switch-size-md-width, 40px);
    height: var(--pa-toggle-switch-size-md-height, 22px);
  }

  .pa-toggle-switch--lg & {
    width: var(--pa-toggle-switch-size-lg-width, 48px);
    height: var(--pa-toggle-switch-size-lg-height, 26px);
  }

  .pa-toggle-switch.is-on & {
    background-color: var(--pa-toggle-switch-background-on);
  }

  .pa-toggle-switch.is-disabled & {
    background-color: var(--pa-toggle-switch-background-disabled);
  }

  .pa-toggle-switch-input:focus-visible + & {
    outline: var(--pa-toggle-switch-outline-width-default, var(--pa-outline-width-default, 2px)) solid var(--pa-toggle-switch-border-focus);
    outline-offset: var(--pa-toggle-switch-outline-offset-default, var(--pa-outline-offset-default, 2px));
  }
}

.pa-toggle-switch-thumb {
  position: absolute;
  background-color: var(--pa-toggle-switch-thumb-off);
  border-radius: var(--pa-Border-radius-full, 99999px);
  transition: all var(--pa-toggle-switch-transition-duration-default, var(--pa-transition-duration-default, 200ms)) var(--pa-toggle-switch-transition-easing-default, var(--pa-transition-easing-default, ease));
  left: var(--pa-spacing-2, 2px);

  .pa-toggle-switch--sm & {
    width: var(--pa-toggle-switch-size-sm-thumb, 14px);
    height: var(--pa-toggle-switch-size-sm-thumb, 14px);
  }

  .pa-toggle-switch--md & {
    width: var(--pa-toggle-switch-size-md-thumb, 18px);
    height: var(--pa-toggle-switch-size-md-thumb, 18px);
  }

  .pa-toggle-switch--lg & {
    width: var(--pa-toggle-switch-size-lg-thumb, 22px);
    height: var(--pa-toggle-switch-size-lg-thumb, 22px);
  }

  .pa-toggle-switch.is-on & {
    background-color: var(--pa-toggle-switch-thumb-on);
    transform: translateX(calc(var(--pa-toggle-switch-size-md-width, 40px) - var(--pa-toggle-switch-size-md-thumb, 18px) - var(--pa-spacing-4, 4px)));
  }

  .pa-toggle-switch--sm.is-on & {
    transform: translateX(calc(var(--pa-toggle-switch-size-sm-width, 32px) - var(--pa-toggle-switch-size-sm-thumb, 14px) - var(--pa-spacing-4, 4px)));
  }

  .pa-toggle-switch--lg.is-on & {
    transform: translateX(calc(var(--pa-toggle-switch-size-lg-width, 48px) - var(--pa-toggle-switch-size-lg-thumb, 22px) - var(--pa-spacing-4, 4px)));
  }

  .pa-toggle-switch.is-disabled & {
    background-color: var(--pa-toggle-switch-thumb-disabled);
  }
}

.pa-toggle-switch-label {
  color: var(--pa-input-text-default, var(--pa-color-surface-container-text));
  user-select: none;
}
</style>

