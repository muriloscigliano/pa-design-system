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
    role="navigation"
    aria-label="Steps"
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
      role="button"
      :aria-current="index === current ? 'step' : undefined"
      :aria-disabled="step.disabled || (clickable && index > current)"
      :tabindex="(clickable && !step.disabled && index <= current) ? 0 : -1"
      @click="handleStepClick(index, step)"
      @keydown.enter="handleStepClick(index, step)"
      @keydown.space.prevent="handleStepClick(index, step)"
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
    opacity: calc(var(--pa-opacity-60) / 100);
    cursor: var(--pa-cursor-not-allowed);
  }
}

.pa-stepper-step-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: var(--pa-stepper-icon-size);
  height: var(--pa-stepper-icon-size);
  border-radius: var(--pa-border-radius-full);
  background-color: var(--pa-stepper-icon-background-default);
  color: var(--pa-stepper-icon-text-default);
  font-family: var(--pa-font-family-roboto, Roboto, sans-serif);
  font-size: var(--pa-stepper-font-icon-size);
  font-weight: var(--pa-stepper-font-title-weight);
  flex-shrink: 0;
  transition: all var(--pa-stepper-transition-duration-default) var(--pa-stepper-transition-easing-default);

  .pa-stepper-step.is-process & {
    background-color: var(--pa-stepper-icon-background-active);
    color: var(--pa-stepper-icon-text-active);
  }

  .pa-stepper-step.is-finish & {
    background-color: var(--pa-stepper-icon-background-completed);
    color: var(--pa-stepper-icon-text-completed);
  }

  .pa-stepper-step.is-error & {
    background-color: var(--pa-stepper-icon-background-error);
    color: var(--pa-stepper-icon-text-error);
  }
}

.pa-stepper-step-icon-custom {
  font-size: var(--pa-stepper-font-icon-size);
}

.pa-stepper-step-content {
  margin-left: var(--pa-stepper-spacing-icon-text);
  text-align: left;

  .pa-stepper--horizontal & {
    margin-left: var(--pa-stepper-spacing-icon-text);
    margin-top: 0;
  }

  .pa-stepper--vertical & {
    margin-left: 0;
    margin-top: var(--pa-stepper-spacing-icon-text);
    text-align: center;
  }
}

.pa-stepper-step-title {
  font-family: var(--pa-font-family-roboto, Roboto, sans-serif);
  font-size: var(--pa-stepper-font-title-size);
  font-weight: var(--pa-stepper-font-title-weight);
  color: var(--pa-stepper-text-default);
  transition: color var(--pa-stepper-transition-duration-default) var(--pa-stepper-transition-easing-default);

  .pa-stepper-step.is-process &,
  .pa-stepper-step.is-finish & {
    color: var(--pa-stepper-text-active);
  }

  .pa-stepper-step.is-error & {
    color: var(--pa-stepper-text-error);
  }
}

.pa-stepper-step-description {
  margin-top: var(--pa-stepper-description-spacing-top);
  font-family: var(--pa-font-family-roboto, Roboto, sans-serif);
  font-size: var(--pa-stepper-font-description-size);
  color: var(--pa-stepper-text-default);
  opacity: var(--pa-stepper-description-opacity);
}

.pa-stepper-step-line {
  position: absolute;
  background-color: var(--pa-stepper-line-default);

  .pa-stepper--horizontal & {
    top: calc(var(--pa-stepper-icon-size) / 2);
    left: calc(50% + var(--pa-stepper-icon-size) / 2 + var(--pa-stepper-spacing-icon-text));
    right: calc(-50% + var(--pa-stepper-icon-size) / 2);
    height: var(--pa-stepper-line-width);
    transform: translateY(-50%);
  }

  .pa-stepper--vertical & {
    top: calc(var(--pa-stepper-icon-size) + var(--pa-stepper-spacing-icon-text));
    left: calc(var(--pa-stepper-icon-size) / 2);
    bottom: calc(-100% + var(--pa-stepper-icon-size) / 2);
    width: var(--pa-stepper-line-width);
    transform: translateX(-50%);
  }

  &.is-completed {
    background-color: var(--pa-stepper-line-completed);
  }
}
</style>

