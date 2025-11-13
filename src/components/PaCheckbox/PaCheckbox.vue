<script setup lang="ts">
defineProps<{
  modelValue?: boolean
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  indeterminate?: boolean
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
      'pa-checkbox',
      `pa-checkbox--${size || 'md'}`,
      {
        'is-disabled': disabled,
        'is-checked': modelValue,
        'is-indeterminate': indeterminate
      }
    ]"
  >
    <input
      type="checkbox"
      :checked="modelValue"
      :disabled="disabled"
      :indeterminate="indeterminate"
      :aria-checked="indeterminate ? 'mixed' : modelValue"
      class="pa-checkbox-input"
      @change="$emit('update:modelValue', ($event.target as HTMLInputElement).checked); $emit('change', ($event.target as HTMLInputElement).checked)"
    />
    <span class="pa-checkbox-box">
      <svg
        v-if="modelValue && !indeterminate"
        class="pa-checkbox-checkmark"
        viewBox="0 0 12 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M10 3L4.5 8.5L2 6"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
      <span v-if="indeterminate" class="pa-checkbox-indeterminate"></span>
    </span>
    <span v-if="label" class="pa-checkbox-label">{{ label }}</span>
  </label>
</template>

<style lang="scss" scoped>
.pa-checkbox {
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

.pa-checkbox-input {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
}

.pa-checkbox-box {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: var(--pa-checkbox-background-default);
  border: var(--pa-checkbox-border-width-default, var(--pa-Border-width-50, 1px)) solid var(--pa-checkbox-border-default);
  border-radius: var(--pa-checkbox-border-radius-default, var(--pa-Border-radius-50, 4px));
  transition: all var(--pa-checkbox-transition-duration-default, var(--pa-transition-duration-default, 200ms)) var(--pa-checkbox-transition-easing-default, var(--pa-transition-easing-default, ease));
  flex-shrink: 0;

  .pa-checkbox--sm & {
    width: var(--pa-checkbox-size-sm-width, 16px);
    height: var(--pa-checkbox-size-sm-height, 16px);
  }

  .pa-checkbox--md & {
    width: var(--pa-checkbox-size-md-width, 20px);
    height: var(--pa-checkbox-size-md-height, 20px);
  }

  .pa-checkbox--lg & {
    width: var(--pa-checkbox-size-lg-width, 24px);
    height: var(--pa-checkbox-size-lg-height, 24px);
  }

  .pa-checkbox:not(.is-disabled):hover & {
    background-color: var(--pa-checkbox-background-hover);
    border-color: var(--pa-checkbox-border-checked);
  }

  .pa-checkbox-input:focus-visible + & {
    outline: var(--pa-checkbox-outline-width-default, var(--pa-outline-width-default, 2px)) solid var(--pa-checkbox-border-focus);
    outline-offset: var(--pa-checkbox-outline-offset-default, var(--pa-outline-offset-default, 2px));
  }

  .pa-checkbox.is-checked & {
    background-color: var(--pa-checkbox-background-checked);
    border-color: var(--pa-checkbox-border-checked);
  }

  .pa-checkbox.is-disabled & {
    background-color: var(--pa-checkbox-background-disabled);
    border-color: var(--pa-checkbox-border-disabled);
  }
}

.pa-checkbox-checkmark {
  width: var(--pa-icon-size-xs, var(--pa-icon-size-150, 20px));
  height: var(--pa-icon-size-xs, var(--pa-icon-size-150, 20px));
  color: var(--pa-checkbox-checkmark-default);

  .pa-checkbox--sm & {
    width: calc(var(--pa-checkbox-size-sm-width, var(--pa-icon-size-sm, 16px)) * 0.625);
    height: calc(var(--pa-checkbox-size-sm-width, var(--pa-icon-size-sm, 16px)) * 0.625);
  }

  .pa-checkbox--lg & {
    width: calc(var(--pa-checkbox-size-lg-width, var(--pa-icon-size-md, 24px)) * 0.583);
    height: calc(var(--pa-checkbox-size-lg-width, var(--pa-icon-size-md, 24px)) * 0.583);
  }

  .pa-checkbox.is-disabled & {
    color: var(--pa-checkbox-checkmark-disabled);
  }
}

.pa-checkbox-indeterminate {
  width: calc(var(--pa-checkbox-size-md-width, var(--pa-spacing-250, 18px)) * 0.444);
  height: var(--pa-Border-width-50, 1px);
  background-color: var(--pa-checkbox-checkmark-default);
  border-radius: var(--pa-Border-radius-50, 4px);

  .pa-checkbox.is-disabled & {
    background-color: var(--pa-checkbox-checkmark-disabled);
  }
}

.pa-checkbox-label {
  color: var(--pa-input-text-default, var(--pa-color-surface-container-text));
  user-select: none;
}
</style>

