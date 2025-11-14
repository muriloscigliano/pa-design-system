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
  gap: var(--pa-progress-line-gap);
}

.pa-progress-line-track {
  flex: 1;
  height: var(--pa-progress-size-md-height);
  background-color: var(--pa-progress-background-default);
  border-radius: var(--pa-progress-border-radius);
  overflow: hidden;

  .pa-progress--sm & {
    height: var(--pa-progress-size-sm-height);
  }

  .pa-progress--lg & {
    height: var(--pa-progress-size-lg-height);
  }
}

.pa-progress-line-fill {
  height: 100%;
  background-color: var(--pa-progress-background-filled);
  border-radius: var(--pa-progress-border-radius);
  transition: width var(--pa-progress-transition-duration-default) var(--pa-progress-transition-easing-default);

  &--success {
    background-color: var(--pa-progress-background-success);
  }

  &--warning {
    background-color: var(--pa-progress-background-warning);
  }

  &--error {
    background-color: var(--pa-progress-background-error);
  }
}

.pa-progress-text {
  font-family: var(--pa-font-family-roboto, Roboto, sans-serif);
  font-size: var(--pa-progress-size-md-font);
  color: var(--pa-progress-text-default);
  white-space: nowrap;
}

.pa-progress-circle {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.pa-progress-circle-svg {
  width: var(--pa-progress-circular-size-md);
  height: var(--pa-progress-circular-size-md);
  transform: rotate(-90deg);

  &--sm {
    width: var(--pa-progress-circular-size-sm);
    height: var(--pa-progress-circular-size-sm);
  }

  &--lg {
    width: var(--pa-progress-circular-size-lg);
    height: var(--pa-progress-circular-size-lg);
  }
}

.pa-progress-circle-track {
  stroke: var(--pa-progress-background-default);
}

.pa-progress-circle-fill {
  stroke: var(--pa-progress-background-filled);
  transition: stroke-dashoffset var(--pa-progress-transition-duration-default) var(--pa-progress-transition-easing-default);

  &--success {
    stroke: var(--pa-progress-background-success);
  }

  &--warning {
    stroke: var(--pa-progress-background-warning);
  }

  &--error {
    stroke: var(--pa-progress-background-error);
  }
}

.pa-progress-circle-text {
  position: absolute;
  font-family: var(--pa-font-family-roboto, Roboto, sans-serif);
  font-size: var(--pa-progress-size-md-font);
  color: var(--pa-progress-text-default);
}
</style>

