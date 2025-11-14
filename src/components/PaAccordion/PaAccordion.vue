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
      :aria-expanded="isOpen"
      :aria-controls="`pa-accordion-content-${Math.random().toString(36).substr(2, 9)}`"
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
      <div v-if="isOpen" class="pa-accordion-content" role="region">
        <div class="pa-accordion-content-inner">
          <slot />
        </div>
      </div>
    </Transition>
  </div>
</template>

<style lang="scss" scoped>
.pa-accordion {
  border: var(--pa-accordion-border-width) solid var(--pa-accordion-header-border);
  border-radius: var(--pa-accordion-border-radius);
  overflow: hidden;
}

.pa-accordion-header {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: var(--pa-accordion-header-background-default);
  color: var(--pa-accordion-header-text);
  padding: var(--pa-accordion-header-padding-y) var(--pa-accordion-header-padding-x);
  border: none;
  cursor: var(--pa-cursor-pointer);
  font-family: var(--pa-font-family-roboto, Roboto, sans-serif);
  font-size: var(--pa-accordion-header-font-size);
  font-weight: var(--pa-accordion-header-font-weight);
  text-align: left;
  transition: all var(--pa-accordion-transition-duration-default) var(--pa-accordion-transition-easing-default);

  &:hover {
    background-color: var(--pa-accordion-header-background-hover);
  }

  &:focus-visible {
    outline: var(--pa-accordion-outline-width) solid var(--pa-color-action-primary-border-focus);
    outline-offset: var(--pa-accordion-outline-offset);
  }
}

.pa-accordion-header-content {
  flex: 1;
}

.pa-accordion-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--pa-accordion-icon-color);
  width: var(--pa-accordion-icon-size);
  height: var(--pa-accordion-icon-size);
  flex-shrink: 0;
  transition: transform var(--pa-accordion-transition-duration-default) var(--pa-accordion-transition-easing-default);

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
  transition: max-height var(--pa-accordion-transition-duration-default) var(--pa-accordion-transition-easing-default),
    opacity var(--pa-accordion-transition-duration-default) var(--pa-accordion-transition-easing-default);
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

