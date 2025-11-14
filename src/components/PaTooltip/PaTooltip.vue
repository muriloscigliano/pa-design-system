<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

defineProps<{
  placement?: 'top' | 'bottom' | 'left' | 'right'
  trigger?: 'hover' | 'click' | 'focus'
}>()

const tooltipRef = ref<HTMLElement>()
const isVisible = ref(false)
const position = ref({ top: 0, left: 0 })

const updatePosition = () => {
  if (!tooltipRef.value) return

  const trigger = tooltipRef.value.previousElementSibling as HTMLElement
  if (!trigger) return

  const triggerRect = trigger.getBoundingClientRect()
  const tooltipRect = tooltipRef.value.getBoundingClientRect()

  // Simple positioning logic - can be enhanced
  position.value = {
    top: triggerRect.bottom + 8,
    left: triggerRect.left + triggerRect.width / 2 - tooltipRect.width / 2
  }
}

const show = () => {
  isVisible.value = true
  setTimeout(updatePosition, 0)
}

const hide = () => {
  isVisible.value = false
}

onMounted(() => {
  if (tooltipRef.value) {
    const trigger = tooltipRef.value.previousElementSibling as HTMLElement
    if (trigger) {
      trigger.addEventListener('mouseenter', show)
      trigger.addEventListener('mouseleave', hide)
    }
  }
})

onUnmounted(() => {
  if (tooltipRef.value) {
    const trigger = tooltipRef.value.previousElementSibling as HTMLElement
    if (trigger) {
      trigger.removeEventListener('mouseenter', show)
      trigger.removeEventListener('mouseleave', hide)
    }
  }
})
</script>

<template>
  <div class="pa-tooltip-wrapper">
    <slot />
    <Transition name="pa-tooltip">
      <div
        v-if="isVisible"
        ref="tooltipRef"
        :class="[
          'pa-tooltip',
          `pa-tooltip--${placement || 'top'}`
        ]"
        :style="{
          top: `${position.top}px`,
          left: `${position.left}px`
        }"
      >
        <slot name="content" />
        <span class="pa-tooltip-arrow"></span>
      </div>
    </Transition>
  </div>
</template>

<style lang="scss" scoped>
.pa-tooltip-wrapper {
  position: relative;
  display: inline-block;
}

.pa-tooltip {
  position: fixed;
  background-color: var(--pa-tooltip-background);
  color: var(--pa-tooltip-text);
  padding: var(--pa-tooltip-padding-y) var(--pa-tooltip-padding-x);
  border-radius: var(--pa-tooltip-border-radius-default);
  font-family: var(--pa-font-family-roboto, Roboto, sans-serif);
  font-size: var(--pa-tooltip-font-size);
  font-weight: var(--pa-tooltip-font-weight);
  z-index: var(--pa-tooltip-z-index);
  white-space: nowrap;
  pointer-events: none;
  max-width: var(--pa-tooltip-max-width);
  word-wrap: break-word;
  white-space: normal;
}

.pa-tooltip-arrow {
  position: absolute;
  width: 0;
  height: 0;
  border-style: solid;

  .pa-tooltip--top & {
    bottom: calc(var(--pa-tooltip-arrow-offset) * -1);
    left: 50%;
    transform: translateX(-50%);
    border-width: var(--pa-tooltip-arrow-size) var(--pa-tooltip-arrow-size) 0 var(--pa-tooltip-arrow-size);
    border-color: var(--pa-tooltip-arrow) transparent transparent transparent;
  }

  .pa-tooltip--bottom & {
    top: calc(var(--pa-tooltip-arrow-offset) * -1);
    left: 50%;
    transform: translateX(-50%);
    border-width: 0 var(--pa-tooltip-arrow-size) var(--pa-tooltip-arrow-size) var(--pa-tooltip-arrow-size);
    border-color: transparent transparent var(--pa-tooltip-arrow) transparent;
  }

  .pa-tooltip--left & {
    right: calc(var(--pa-tooltip-arrow-offset) * -1);
    top: 50%;
    transform: translateY(-50%);
    border-width: var(--pa-tooltip-arrow-size) 0 var(--pa-tooltip-arrow-size) var(--pa-tooltip-arrow-size);
    border-color: transparent transparent transparent var(--pa-tooltip-arrow);
  }

  .pa-tooltip--right & {
    left: calc(var(--pa-tooltip-arrow-offset) * -1);
    top: 50%;
    transform: translateY(-50%);
    border-width: var(--pa-tooltip-arrow-size) var(--pa-tooltip-arrow-size) var(--pa-tooltip-arrow-size) 0;
    border-color: transparent var(--pa-tooltip-arrow) transparent transparent;
  }
}

.pa-tooltip-enter-active,
.pa-tooltip-leave-active {
  transition: opacity var(--pa-tooltip-transition-duration-fast) var(--pa-transition-easing-default);
}

.pa-tooltip-enter-from,
.pa-tooltip-leave-to {
  opacity: 0;
}
</style>

