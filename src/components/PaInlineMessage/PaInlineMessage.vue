<script setup lang="ts">
import { ref } from 'vue'

defineProps<{
  variant?: 'info' | 'success' | 'warning' | 'error'
  dismissible?: boolean
}>()

const emit = defineEmits<{
  'dismiss': []
}>()

const isVisible = ref(true)

const dismiss = () => {
  isVisible.value = false
  emit('dismiss')
}
</script>

<template>
  <Transition name="pa-inline-message">
    <div
      v-if="isVisible"
      :class="[
        'pa-inline-message',
        `pa-inline-message--${variant || 'info'}`
      ]"
    >
      <span v-if="$slots.icon" class="pa-inline-message-icon">
        <slot name="icon" />
      </span>
      <div class="pa-inline-message-content">
        <slot />
      </div>
      <button
        v-if="dismissible"
        class="pa-inline-message-close"
        aria-label="Dismiss message"
        @click="dismiss"
      >
        ×
      </button>
    </div>
  </Transition>
</template>

<style lang="scss" scoped>
.pa-inline-message {
  display: flex;
  align-items: flex-start;
  gap: var(--pa-inline-message-gap);
  padding: var(--pa-inline-message-padding-y) var(--pa-inline-message-padding-x);
  border: var(--pa-inline-message-border-width-default) solid;
  border-radius: var(--pa-inline-message-border-radius-default);
  font-family: var(--pa-font-family-roboto, Roboto, sans-serif);
  font-size: var(--pa-inline-message-font-size);
  font-weight: var(--pa-inline-message-font-weight);

  &--info {
    background-color: var(--pa-inline-message-background-info);
    color: var(--pa-inline-message-text-info);
    border-color: var(--pa-inline-message-border-info);
  }

  &--success {
    background-color: var(--pa-inline-message-background-success);
    color: var(--pa-inline-message-text-success);
    border-color: var(--pa-inline-message-border-success);
  }

  &--warning {
    background-color: var(--pa-inline-message-background-warning);
    color: var(--pa-inline-message-text-warning);
    border-color: var(--pa-inline-message-border-warning);
  }

  &--error {
    background-color: var(--pa-inline-message-background-error);
    color: var(--pa-inline-message-text-error);
    border-color: var(--pa-inline-message-border-error);
  }
}

.pa-inline-message-icon {
  display: flex;
  align-items: center;
  flex-shrink: 0;
  width: var(--pa-inline-message-icon-size);
  height: var(--pa-inline-message-icon-size);

  .pa-inline-message--info & {
    color: var(--pa-inline-message-icon-info);
  }

  .pa-inline-message--success & {
    color: var(--pa-inline-message-icon-success);
  }

  .pa-inline-message--warning & {
    color: var(--pa-inline-message-icon-warning);
  }

  .pa-inline-message--error & {
    color: var(--pa-inline-message-icon-error);
  }
}

.pa-inline-message-content {
  flex: 1;
}

.pa-inline-message-close {
  background: none;
  border: none;
  font-size: var(--pa-inline-message-close-font-size);
  line-height: 1;
  cursor: var(--pa-cursor-pointer);
  color: currentColor;
  padding: var(--pa-inline-message-close-padding);
  display: flex;
  align-items: center;
  justify-content: center;
  width: var(--pa-inline-message-close-size);
  height: var(--pa-inline-message-close-size);
  flex-shrink: 0;
  opacity: var(--pa-inline-message-close-opacity-default);
  transition: opacity var(--pa-inline-message-transition-duration-default) var(--pa-inline-message-transition-easing-default);

  &:hover {
    opacity: var(--pa-inline-message-close-opacity-hover);
  }
}

.pa-inline-message-enter-active,
.pa-inline-message-leave-active {
  transition: opacity var(--pa-inline-message-transition-duration-default) var(--pa-inline-message-transition-easing-default);
}

.pa-inline-message-enter-from,
.pa-inline-message-leave-to {
  opacity: 0;
}
</style>

