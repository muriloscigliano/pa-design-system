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
  background-color: var(--pa-modal-overlay-background, rgba(0, 0, 0, 0.5));
  z-index: var(--pa-modal-overlay-z-index, var(--pa-z-index-400, 400));
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--pa-spacing-16, 16px);
}

.pa-modal-container {
  background-color: var(--pa-modal-container-background);
  border: 1px solid var(--pa-modal-container-border);
  border-radius: var(--pa-modal-container-border-radius, var(--pa-Border-radius-200, 24px));
  box-shadow: var(--pa-modal-container-shadow, var(--pa-shadow-lg));
  z-index: var(--pa-modal-container-z-index, var(--pa-z-index-500, 500));
  max-width: 100%;
  max-height: 90vh;
  overflow: auto;
  display: flex;
  flex-direction: column;

  &--sm {
    width: 100%;
    max-width: var(--pa-modal-container-max-width-sm, 400px);
  }

  &--md {
    width: 100%;
    max-width: var(--pa-modal-container-max-width-md, 600px);
  }

  &--lg {
    width: 100%;
    max-width: var(--pa-modal-container-max-width-lg, 800px);
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
  border-bottom: 1px solid var(--pa-modal-footer-border, var(--pa-color-surface-base-divider));
  flex-shrink: 0;
}

.pa-modal-close {
  background: none;
  border: none;
  font-size: var(--pa-font-size-500, 24px);
  line-height: 1;
  cursor: var(--pa-cursor-pointer, pointer);
  color: var(--pa-modal-header-text);
  padding: var(--pa-spacing-4, 4px);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: var(--pa-Border-radius-50, 4px);
  transition: all var(--pa-transition-duration-default, 200ms) var(--pa-transition-easing-default, ease);

  &:hover {
    background-color: var(--pa-color-surface-cards-hover-background, var(--pa-gray-200, #e9ecef));
  }
}

.pa-modal-body {
  padding: var(--pa-modal-body-padding-y) var(--pa-modal-body-padding-x);
  overflow-y: auto;
  flex: 1;
}

.pa-modal-footer {
  background-color: var(--pa-modal-footer-background);
  border-top: 1px solid var(--pa-modal-footer-border);
  padding: var(--pa-modal-footer-padding-y) var(--pa-modal-footer-padding-x);
  flex-shrink: 0;
}

.pa-modal-enter-active,
.pa-modal-leave-active {
  transition: opacity var(--pa-transition-duration-default, 200ms) var(--pa-transition-easing-default, ease);
}

.pa-modal-enter-from,
.pa-modal-leave-to {
  opacity: 0;
}
</style>

