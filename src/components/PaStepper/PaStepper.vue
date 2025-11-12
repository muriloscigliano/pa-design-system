<script setup lang="ts">

interface Step {
  title: string
  description?: string
  icon?: string
  status?: 'wait' | 'process' | 'finish' | 'error'
  disabled?: boolean
}

const props = defineProps<{
  current: number
  steps: Step[]
  direction?: 'horizontal' | 'vertical'
  clickable?: boolean
}>()

const emit = defineEmits<{
  'step-click': [index: number, step: Step]
}>()

const getStepStatus = (index: number, step: Step) => {
  if (step.status) return step.status
  if (index < props.current) return 'finish'
  if (index === props.current) return 'process'
  return 'wait'
}

const handleStepClick = (index: number, step: Step) => {
  if (props.clickable && !step.disabled && index <= props.current) {
    emit('step-click', index, step)
  }
}
</script>

<template>
  <div
    :class="[
      'pa-stepper',
      `pa-stepper--${direction || 'horizontal'}`
    ]"
  >
    <div
      v-for="(step, index) in steps"
      :key="index"
      :class="[
        'pa-stepper-step',
        {
          [`is-${getStepStatus(index, step)}`]: true,
          'is-clickable': clickable && !step.disabled,
          'is-disabled': step.disabled
        }
      ]"
      @click="handleStepClick(index, step)"
    >
      <div class="pa-stepper-step-icon">
        <span v-if="step.icon" class="pa-stepper-step-icon-custom">{{ step.icon }}</span>
        <span v-else class="pa-stepper-step-icon-number">{{ index + 1 }}</span>
      </div>
      <div class="pa-stepper-step-content">
        <div class="pa-stepper-step-title">{{ step.title }}</div>
        <div v-if="step.description" class="pa-stepper-step-description">{{ step.description }}</div>
      </div>
      <div
        v-if="index < steps.length - 1"
        :class="[
          'pa-stepper-step-line',
          {
            'is-completed': index < current
          }
        ]"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.pa-stepper {
  display: flex;
  width: 100%;

  &--horizontal {
    flex-direction: row;
    align-items: flex-start;
  }

  &--vertical {
    flex-direction: column;
  }
}

.pa-stepper-step {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;

  .pa-stepper--horizontal & {
    flex-direction: row;
  }

  &.is-clickable {
    cursor: var(--pa-cursor-pointer, pointer);
  }

  &.is-disabled {
    opacity: calc(var(--pa-opacity-60, 60) / 100);
    cursor: var(--pa-cursor-not-allowed, not-allowed);
  }
}

.pa-stepper-step-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: var(--pa-stepper-icon-size, var(--pa-icon-size-300, 32px));
  height: var(--pa-stepper-icon-size, var(--pa-icon-size-300, 32px));
  border-radius: var(--pa-Border-radius-full, 50%);
  background-color: var(--pa-stepper-icon-background-default, var(--pa-color-surface-container-background));
  color: var(--pa-stepper-icon-text-default, var(--pa-color-surface-container-text));
  font-family: var(--pa-font-family-roboto, Roboto, sans-serif);
  font-size: var(--pa-font-size-200, 16px);
  font-weight: var(--pa-font-weight-500, 500);
  flex-shrink: 0;
  transition: all var(--pa-transition-duration-default, 200ms) var(--pa-transition-easing-default, ease);

  .pa-stepper-step.is-process & {
    background-color: var(--pa-stepper-icon-background-active, var(--pa-color-action-primary-background-default));
    color: var(--pa-stepper-icon-text-active, var(--pa-color-action-primary-text-default));
  }

  .pa-stepper-step.is-finish & {
    background-color: var(--pa-stepper-icon-background-completed, var(--pa-color-action-primary-background-default));
    color: var(--pa-stepper-icon-text-completed, var(--pa-color-action-primary-text-default));
  }

  .pa-stepper-step.is-error & {
    background-color: var(--pa-stepper-icon-background-error, var(--pa-color-status-error-default));
    color: var(--pa-stepper-icon-text-error, var(--pa-color-status-error-text));
  }
}

.pa-stepper-step-icon-custom {
  font-size: var(--pa-icon-size-200, 20px);
}

.pa-stepper-step-content {
  margin-left: var(--pa-stepper-spacing-icon-text, var(--pa-spacing-12, 12px));
  text-align: left;

  .pa-stepper--horizontal & {
    margin-left: var(--pa-stepper-spacing-icon-text, var(--pa-spacing-12, 12px));
    margin-top: 0;
  }

  .pa-stepper--vertical & {
    margin-left: 0;
    margin-top: var(--pa-stepper-spacing-icon-text, var(--pa-spacing-12, 12px));
    text-align: center;
  }
}

.pa-stepper-step-title {
  font-family: var(--pa-font-family-roboto, Roboto, sans-serif);
  font-size: var(--pa-stepper-font-title-size, var(--pa-font-size-200, 16px));
  font-weight: var(--pa-font-weight-500, 500);
  color: var(--pa-stepper-text-default, var(--pa-color-surface-container-text));
  transition: color var(--pa-transition-duration-default, 200ms) var(--pa-transition-easing-default, ease);

  .pa-stepper-step.is-process &,
  .pa-stepper-step.is-finish & {
    color: var(--pa-stepper-text-active, var(--pa-color-action-primary-text-default));
  }

  .pa-stepper-step.is-error & {
    color: var(--pa-stepper-text-error, var(--pa-color-status-error-default));
  }
}

.pa-stepper-step-description {
  margin-top: var(--pa-spacing-4, 4px);
  font-family: var(--pa-font-family-roboto, Roboto, sans-serif);
  font-size: var(--pa-stepper-font-description-size, var(--pa-font-size-100, 14px));
  color: var(--pa-stepper-text-default, var(--pa-color-surface-container-text));
  opacity: 0.7;
}

.pa-stepper-step-line {
  position: absolute;
  background-color: var(--pa-stepper-line-default, var(--pa-color-surface-base-divider));

  .pa-stepper--horizontal & {
    top: calc(var(--pa-stepper-icon-size, var(--pa-icon-size-300, 32px)) / 2);
    left: calc(50% + var(--pa-stepper-icon-size, var(--pa-icon-size-300, 32px)) / 2 + var(--pa-stepper-spacing-icon-text, var(--pa-spacing-12, 12px)));
    right: calc(-50% + var(--pa-stepper-icon-size, var(--pa-icon-size-300, 32px)) / 2);
    height: var(--pa-spacing-25, var(--pa-spacing-2, 2px));
    transform: translateY(-50%);
  }

  .pa-stepper--vertical & {
    top: calc(var(--pa-stepper-icon-size, var(--pa-icon-size-300, 32px)) + var(--pa-stepper-spacing-icon-text, var(--pa-spacing-12, 12px)));
    left: calc(var(--pa-stepper-icon-size, var(--pa-icon-size-300, 32px)) / 2);
    bottom: calc(-100% + var(--pa-stepper-icon-size, var(--pa-icon-size-300, 32px)) / 2);
    width: var(--pa-spacing-25, var(--pa-spacing-2, 2px));
    transform: translateX(-50%);
  }

  &.is-completed {
    background-color: var(--pa-stepper-line-completed, var(--pa-color-action-primary-background-default));
  }
}
</style>

