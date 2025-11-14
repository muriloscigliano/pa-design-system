<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'

defineProps<{
  modelValue: boolean
  size?: 'sm' | 'md' | 'lg' | 'fullscreen'
  closeOnOverlay?: boolean
}>()

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  'close': []
}>()

const close = () => {
  emit('update:modelValue', false)
  emit('close')
}

const handleOverlayClick = (event: MouseEvent) => {
  if ((event.target as HTMLElement).classList.contains('pa-modal-overlay')) {
    close()
  }
}

const handleEscape = (event: KeyboardEvent) => {
  if (event.key === 'Escape') {
    close()
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleEscape)
  document.body.style.overflow = 'hidden'
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleEscape)
  document.body.style.overflow = ''
})
</script>

<template>
  <Teleport to="body">
    <Transition name="pa-modal">
      <div
        v-if="modelValue"
        class="pa-modal-overlay"
        @click="handleOverlayClick"
      >
        <div
          :class="[
            'pa-modal-container',
            `pa-modal-container--${size || 'md'}`
          ]"
          role="dialog"
          :aria-modal="true"
          :aria-labelledby="modelValue ? 'pa-modal-title' : undefined"
          @click.stop
        >
          <div v-if="$slots.header || $slots.close" class="pa-modal-header">
            <slot name="header" />
            <button
              v-if="$slots.close"
              class="pa-modal-close"
              @click="close"
            >
              <slot name="close">×</slot>
            </button>
          </div>
          <div class="pa-modal-body">
            <slot />
          </div>
          <div v-if="$slots.footer" class="pa-modal-footer">
            <slot name="footer" />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style lang="scss" scoped>
.pa-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: var(--pa-modal-overlay-background);
  z-index: var(--pa-modal-overlay-z-index);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--pa-modal-overlay-padding);
}

.pa-modal-container {
  background-color: var(--pa-modal-container-background);
  border: var(--pa-modal-container-border-width) solid var(--pa-modal-container-border);
  border-radius: var(--pa-modal-container-border-radius);
  box-shadow: var(--pa-modal-container-shadow);
  z-index: var(--pa-modal-container-z-index);
  max-width: 100%;
  max-height: 90vh;
  overflow: auto;
  display: flex;
  flex-direction: column;

  &--sm {
    width: 100%;
    max-width: var(--pa-modal-container-max-width-sm);
  }

  &--md {
    width: 100%;
    max-width: var(--pa-modal-container-max-width-md);
  }

  &--lg {
    width: 100%;
    max-width: var(--pa-modal-container-max-width-lg);
  }

  &--fullscreen {
    width: 100%;
    height: 100%;
    max-width: 100%;
    max-height: 100%;
    border-radius: 0;
  }
}

.pa-modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: var(--pa-modal-header-background);
  color: var(--pa-modal-header-text);
  padding: var(--pa-modal-header-padding-y) var(--pa-modal-header-padding-x);
  border-bottom: var(--pa-modal-header-border-width) solid var(--pa-modal-header-border-color);
  flex-shrink: 0;
}

.pa-modal-close {
  background: none;
  border: none;
  font-size: var(--pa-modal-close-font-size);
  line-height: 1;
  cursor: var(--pa-cursor-pointer);
  color: var(--pa-modal-header-text);
  padding: var(--pa-modal-close-padding);
  display: flex;
  align-items: center;
  justify-content: center;
  width: var(--pa-modal-close-size-width);
  height: var(--pa-modal-close-size-height);
  border-radius: var(--pa-modal-close-radius);
  transition: all var(--pa-transition-duration-default) var(--pa-transition-easing-default);

  &:hover {
    background-color: var(--pa-modal-close-background-hover);
  }
}

.pa-modal-body {
  padding: var(--pa-modal-body-padding-y) var(--pa-modal-body-padding-x);
  overflow-y: auto;
  flex: 1;
}

.pa-modal-footer {
  background-color: var(--pa-modal-footer-background);
  border-top: var(--pa-modal-footer-border-width) solid var(--pa-modal-footer-border-color);
  padding: var(--pa-modal-footer-padding-y) var(--pa-modal-footer-padding-x);
  flex-shrink: 0;
}

.pa-modal-enter-active,
.pa-modal-leave-active {
  transition: opacity var(--pa-transition-duration-default) var(--pa-transition-easing-default);
}

.pa-modal-enter-from,
.pa-modal-leave-to {
  opacity: 0;
}
</style>

