<script setup lang="ts">
defineProps<{
  variant?: 'primary' | 'secondary'
  size?: 'sm' | 'md' | 'lg'
  overlay?: boolean
}>()
</script>

<template>
  <div
    :class="[
      'pa-loading',
      `pa-loading--${size || 'md'}`,
      {
        'is-overlay': overlay
      }
    ]"
  >
    <div
      :class="[
        'pa-loading-spinner',
        `pa-loading-spinner--${variant || 'primary'}`
      ]"
      role="status"
      aria-label="Loading"
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-dasharray="31.416"
          stroke-dashoffset="31.416"
        >
          <animate
            attributeName="stroke-dasharray"
            dur="2s"
            values="0 31.416;15.708 15.708;0 31.416;0 31.416"
            repeatCount="indefinite"
          />
          <animate
            attributeName="stroke-dashoffset"
            dur="2s"
            values="0;-15.708;-31.416;-31.416"
            repeatCount="indefinite"
          />
        </circle>
      </svg>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.pa-loading {
  display: inline-flex;
  align-items: center;
  justify-content: center;

  &.is-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: var(--pa-loading-overlay-background);
    z-index: var(--pa-loading-overlay-z-index);
  }

  &--sm {
    .pa-loading-spinner {
      width: var(--pa-loading-size-sm);
      height: var(--pa-loading-size-sm);
    }
  }

  &--md {
    .pa-loading-spinner {
      width: var(--pa-loading-size-md);
      height: var(--pa-loading-size-md);
    }
  }

  &--lg {
    .pa-loading-spinner {
      width: var(--pa-loading-size-lg);
      height: var(--pa-loading-size-lg);
    }
  }
}

.pa-loading-spinner {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: var(--pa-loading-spinner-primary);

  &--primary {
    color: var(--pa-loading-spinner-primary);
  }

  &--secondary {
    color: var(--pa-loading-spinner-secondary);
  }

  svg {
    width: 100%;
    height: 100%;
    animation: pa-loading-spin 1s linear infinite;
  }
}

@keyframes pa-loading-spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>

