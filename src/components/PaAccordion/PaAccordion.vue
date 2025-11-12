<script setup lang="ts">
import { ref } from 'vue'

defineProps<{
  modelValue?: boolean
  multiple?: boolean
}>()

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  'toggle': [value: boolean]
}>()

const isOpen = ref(false)

const toggle = () => {
  isOpen.value = !isOpen.value
  emit('update:modelValue', isOpen.value)
  emit('toggle', isOpen.value)
}
</script>

<template>
  <div
    :class="[
      'pa-accordion',
      {
        'is-open': isOpen
      }
    ]"
  >
    <button
      class="pa-accordion-header"
      @click="toggle"
    >
      <span class="pa-accordion-header-content">
        <slot name="header" />
      </span>
      <span class="pa-accordion-icon">
        <svg
          viewBox="0 0 12 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6 9L1 4h10L6 9z"
            fill="currentColor"
          />
        </svg>
      </span>
    </button>
    <Transition name="pa-accordion-content">
      <div v-if="isOpen" class="pa-accordion-content">
        <div class="pa-accordion-content-inner">
          <slot />
        </div>
      </div>
    </Transition>
  </div>
</template>

<style lang="scss" scoped>
.pa-accordion {
  border: 1px solid var(--pa-accordion-header-border, var(--pa-color-surface-base-border));
  border-radius: var(--pa-Border-radius-100, 8px);
  overflow: hidden;
}

.pa-accordion-header {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: var(--pa-accordion-header-background-default, var(--pa-color-surface-base-background));
  color: var(--pa-accordion-header-text, var(--pa-color-surface-base-text));
  padding: var(--pa-accordion-header-padding-y) var(--pa-accordion-header-padding-x);
  border: none;
  cursor: var(--pa-cursor-pointer, pointer);
  font-family: var(--pa-font-family-roboto, Roboto, sans-serif);
  font-size: var(--pa-font-size-200, 16px);
  font-weight: var(--pa-font-weight-500, 500);
  text-align: left;
  transition: all var(--pa-accordion-transition-duration-default, var(--pa-transition-duration-default, 200ms)) var(--pa-accordion-transition-easing-default, var(--pa-transition-easing-default, ease));

  &:hover {
    background-color: var(--pa-accordion-header-background-hover, var(--pa-color-surface-cards-hover-background));
  }

  &:focus-visible {
    outline: var(--pa-outline-width-default, 2px) solid var(--pa-color-action-primary-border-focus);
    outline-offset: var(--pa-outline-offset-default, 2px);
  }
}

.pa-accordion-header-content {
  flex: 1;
}

.pa-accordion-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--pa-accordion-icon, var(--pa-color-surface-container-icon));
  width: var(--pa-icon-size-xs, var(--pa-icon-size-150, 20px));
  height: var(--pa-icon-size-xs, var(--pa-icon-size-150, 20px));
  flex-shrink: 0;
  transition: transform var(--pa-accordion-transition-duration-default, var(--pa-transition-duration-default, 200ms)) var(--pa-accordion-transition-easing-default, var(--pa-transition-easing-default, ease));

  .pa-accordion.is-open & {
    transform: rotate(180deg);
  }

  svg {
    width: 100%;
    height: 100%;
  }
}

.pa-accordion-content {
  background-color: var(--pa-accordion-content-background, var(--pa-color-surface-container-background));
  color: var(--pa-accordion-content-text, var(--pa-color-surface-container-text));
  overflow: hidden;
}

.pa-accordion-content-inner {
  padding: var(--pa-accordion-content-padding-y) var(--pa-accordion-content-padding-x);
}

.pa-accordion-content-enter-active,
.pa-accordion-content-leave-active {
  transition: max-height var(--pa-accordion-transition-duration-default, var(--pa-transition-duration-default, 200ms)) var(--pa-accordion-transition-easing-default, ease),
    opacity var(--pa-accordion-transition-duration-default, var(--pa-transition-duration-default, 200ms)) var(--pa-accordion-transition-easing-default, ease);
}

.pa-accordion-content-enter-from,
.pa-accordion-content-leave-to {
  max-height: 0;
  opacity: 0;
}

.pa-accordion-content-enter-to,
.pa-accordion-content-leave-from {
  max-height: 1000px;
  opacity: 1;
}
</style>

