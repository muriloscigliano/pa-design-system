<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  percentage?: number
  type?: 'line' | 'circle'
  status?: 'default' | 'success' | 'warning' | 'error'
  size?: 'sm' | 'md' | 'lg'
  showText?: boolean
  strokeWidth?: number
}>()

const displayPercentage = computed(() => {
  if (props.percentage === undefined) return 0
  return Math.min(Math.max(props.percentage, 0), 100)
})

const circumference = computed(() => {
  const radius = props.size === 'sm' ? 30 : props.size === 'lg' ? 70 : 50
  return 2 * Math.PI * radius
})

const strokeDashoffset = computed(() => {
  const radius = props.size === 'sm' ? 30 : props.size === 'lg' ? 70 : 50
  const circumference = 2 * Math.PI * radius
  return circumference - (displayPercentage.value / 100) * circumference
})
</script>

<template>
  <div
    :class="[
      'pa-progress',
      `pa-progress--${type || 'line'}`,
      `pa-progress--${size || 'md'}`,
      {
        [`pa-progress--${status || 'default'}`]: true
      }
    ]"
  >
    <div v-if="type === 'line'" class="pa-progress-line" role="progressbar" :aria-valuenow="displayPercentage" aria-valuemin="0" aria-valuemax="100">
      <div class="pa-progress-line-track">
        <div
          :class="[
            'pa-progress-line-fill',
            {
              [`pa-progress-line-fill--${status || 'default'}`]: true
            }
          ]"
          :style="{ width: `${displayPercentage}%` }"
        />
      </div>
      <span v-if="showText" class="pa-progress-text">{{ displayPercentage }}%</span>
    </div>
    <div v-else class="pa-progress-circle">
      <svg
        :class="[
          'pa-progress-circle-svg',
          `pa-progress-circle-svg--${size || 'md'}`
        ]"
        viewBox="0 0 100 100"
      >
        <circle
          class="pa-progress-circle-track"
          cx="50"
          cy="50"
          :r="size === 'sm' ? 30 : size === 'lg' ? 40 : 35"
          fill="none"
          :stroke-width="strokeWidth || (size === 'sm' ? 4 : size === 'lg' ? 8 : 6)"
        />
        <circle
          :class="[
            'pa-progress-circle-fill',
            {
              [`pa-progress-circle-fill--${status || 'default'}`]: true
            }
          ]"
          cx="50"
          cy="50"
          :r="size === 'sm' ? 30 : size === 'lg' ? 40 : 35"
          fill="none"
          :stroke-width="strokeWidth || (size === 'sm' ? 4 : size === 'lg' ? 8 : 6)"
          :stroke-dasharray="circumference"
          :stroke-dashoffset="strokeDashoffset"
          stroke-linecap="round"
        />
      </svg>
      <span v-if="showText" class="pa-progress-circle-text">{{ displayPercentage }}%</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.pa-progress {
  display: inline-flex;
  align-items: center;
  width: 100%;
}

.pa-progress-line {
  display: flex;
  align-items: center;
  width: 100%;
  gap: var(--pa-spacing-12, 12px);
}

.pa-progress-line-track {
  flex: 1;
  height: var(--pa-progress-size-md-height, var(--pa-spacing-8, 8px));
  background-color: var(--pa-progress-background-default, var(--pa-color-surface-base-divider));
  border-radius: var(--pa-progress-border-radius, var(--pa-Border-radius-full, 9999px));
  overflow: hidden;

  .pa-progress--sm & {
    height: var(--pa-progress-size-sm-height, var(--pa-spacing-4, 4px));
  }

  .pa-progress--lg & {
    height: var(--pa-progress-size-lg-height, var(--pa-spacing-12, 12px));
  }
}

.pa-progress-line-fill {
  height: 100%;
  background-color: var(--pa-progress-background-filled, var(--pa-color-action-primary-background-default));
  border-radius: var(--pa-progress-border-radius, var(--pa-Border-radius-full, 9999px));
  transition: width var(--pa-transition-duration-default, 200ms) var(--pa-transition-easing-default, ease);

  &--success {
    background-color: var(--pa-progress-background-success, var(--pa-color-status-success-background-default));
  }

  &--warning {
    background-color: var(--pa-progress-background-warning, var(--pa-color-status-warning-background-default));
  }

  &--error {
    background-color: var(--pa-progress-background-error, var(--pa-color-status-error-background-default));
  }
}

.pa-progress-text {
  font-family: var(--pa-font-family-roboto, Roboto, sans-serif);
  font-size: var(--pa-progress-size-md-font, var(--pa-font-size-200, 16px));
  color: var(--pa-progress-text-default, var(--pa-color-surface-container-text));
  white-space: nowrap;
}

.pa-progress-circle {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.pa-progress-circle-svg {
  width: var(--pa-progress-circular-size-md, var(--pa-icon-size-400, 64px));
  height: var(--pa-progress-circular-size-md, var(--pa-icon-size-400, 64px));
  transform: rotate(-90deg);

  &--sm {
    width: var(--pa-progress-circular-size-sm, var(--pa-icon-size-300, 48px));
    height: var(--pa-progress-circular-size-sm, var(--pa-icon-size-300, 48px));
  }

  &--lg {
    width: var(--pa-progress-circular-size-lg, var(--pa-icon-size-500, 56px));
    height: var(--pa-progress-circular-size-lg, var(--pa-icon-size-500, 56px));
  }
}

.pa-progress-circle-track {
  stroke: var(--pa-progress-background-default, var(--pa-color-surface-base-divider));
}

.pa-progress-circle-fill {
  stroke: var(--pa-progress-background-filled, var(--pa-color-action-primary-background-default));
  transition: stroke-dashoffset var(--pa-transition-duration-default, 200ms) var(--pa-transition-easing-default, ease);

  &--success {
    stroke: var(--pa-progress-background-success, var(--pa-color-status-success-background-default));
  }

  &--warning {
    stroke: var(--pa-progress-background-warning, var(--pa-color-status-warning-background-default));
  }

  &--error {
    stroke: var(--pa-progress-background-error, var(--pa-color-status-error-background-default));
  }
}

.pa-progress-circle-text {
  position: absolute;
  font-family: var(--pa-font-family-roboto, Roboto, sans-serif);
  font-size: var(--pa-progress-size-md-font, var(--pa-font-size-200, 16px));
  color: var(--pa-progress-text-default, var(--pa-color-surface-container-text));
}
</style>

