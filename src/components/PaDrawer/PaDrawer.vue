<script setup lang="ts">
import { onMounted, onUnmounted, watch } from 'vue'

const props = defineProps<{
  modelValue: boolean
  placement?: 'left' | 'right' | 'top' | 'bottom'
  size?: 'sm' | 'md' | 'lg'
  closeOnOverlay?: boolean
  persistent?: boolean
}>()

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  'close': []
}>()

const close = () => {
  if (!props.persistent) {
    emit('update:modelValue', false)
    emit('close')
  }
}

const handleOverlayClick = (event: MouseEvent) => {
  if (props.closeOnOverlay && (event.target as HTMLElement).classList.contains('pa-drawer-overlay')) {
    close()
  }
}

const handleEscape = (event: KeyboardEvent) => {
  if (event.key === 'Escape' && !props.persistent) {
    close()
  }
}

watch(() => props.modelValue, (isOpen) => {
  if (isOpen) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
})

onMounted(() => {
  document.addEventListener('keydown', handleEscape)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleEscape)
  document.body.style.overflow = ''
})
</script>

<template>
  <Teleport to="body">
    <Transition name="pa-drawer">
      <div
        v-if="modelValue"
        class="pa-drawer-overlay"
        @click="handleOverlayClick"
      >
        <div
          :class="[
            'pa-drawer-container',
            `pa-drawer-container--${placement || 'right'}`,
            `pa-drawer-container--${size || 'md'}`
          ]"
          role="dialog"
          :aria-modal="true"
          :aria-labelledby="modelValue ? 'pa-drawer-title' : undefined"
          @click.stop
        >
          <div v-if="$slots.header" class="pa-drawer-header">
            <slot name="header" />
          </div>
          <div class="pa-drawer-body">
            <slot />
          </div>
          <div v-if="$slots.footer" class="pa-drawer-footer">
            <slot name="footer" />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style lang="scss" scoped>
.pa-drawer-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: var(--pa-drawer-overlay-background, var(--pa-color-modal-overlay-background));
  z-index: var(--pa-z-index-500, 500);
}

.pa-drawer-container {
  position: absolute;
  display: flex;
  flex-direction: column;
  background-color: var(--pa-drawer-container-background, var(--pa-color-modal-container-background));
  border: var(--pa-Border-width-50, 1px) solid var(--pa-drawer-container-border, var(--pa-color-modal-container-border));
  box-shadow: var(--pa-drawer-container-shadow, var(--pa-shadow-300));
  overflow: hidden;

  &--left {
    top: 0;
    left: 0;
    bottom: 0;
    width: var(--pa-drawer-size-md-width, 400px);
    border-right: var(--pa-Border-width-50, 1px) solid var(--pa-drawer-container-border, var(--pa-color-modal-container-border));
  }

  &--right {
    top: 0;
    right: 0;
    bottom: 0;
    width: var(--pa-drawer-size-md-width, 400px);
    border-left: var(--pa-Border-width-50, 1px) solid var(--pa-drawer-container-border, var(--pa-color-modal-container-border));
  }

  &--top {
    top: 0;
    left: 0;
    right: 0;
    height: var(--pa-drawer-size-md-height, 400px);
    border-bottom: var(--pa-Border-width-50, 1px) solid var(--pa-drawer-container-border, var(--pa-color-modal-container-border));
  }

  &--bottom {
    bottom: 0;
    left: 0;
    right: 0;
    height: var(--pa-drawer-size-md-height, 400px);
    border-top: var(--pa-Border-width-50, 1px) solid var(--pa-drawer-container-border, var(--pa-color-modal-container-border));
  }

  &--sm {
    &.pa-drawer-container--left,
    &.pa-drawer-container--right {
      width: var(--pa-drawer-size-sm-width, 300px);
    }
    &.pa-drawer-container--top,
    &.pa-drawer-container--bottom {
      height: var(--pa-drawer-size-sm-height, 300px);
    }
  }

  &--lg {
    &.pa-drawer-container--left,
    &.pa-drawer-container--right {
      width: var(--pa-drawer-size-lg-width, 600px);
    }
    &.pa-drawer-container--top,
    &.pa-drawer-container--bottom {
      height: var(--pa-drawer-size-lg-height, 600px);
    }
  }
}

.pa-drawer-header {
  padding: var(--pa-drawer-header-padding, var(--pa-spacing-16, 16px));
  border-bottom: var(--pa-Border-width-50, 1px) solid var(--pa-drawer-header-border, var(--pa-color-surface-base-divider));
}

.pa-drawer-body {
  flex: 1;
  padding: var(--pa-drawer-body-padding, var(--pa-spacing-16, 16px));
  overflow-y: auto;
}

.pa-drawer-footer {
  padding: var(--pa-drawer-footer-padding, var(--pa-spacing-16, 16px));
  border-top: var(--pa-Border-width-50, 1px) solid var(--pa-drawer-footer-border, var(--pa-color-surface-base-divider));
}

.pa-drawer-enter-active,
.pa-drawer-leave-active {
  transition: opacity var(--pa-drawer-transition-duration-default, var(--pa-transition-duration-default, 200ms)) var(--pa-drawer-transition-easing-default, var(--pa-transition-easing-default, ease));
}

.pa-drawer-enter-active .pa-drawer-container--left,
.pa-drawer-leave-active .pa-drawer-container--left {
  transition: transform var(--pa-drawer-transition-duration-default, var(--pa-transition-duration-default, 200ms)) var(--pa-drawer-transition-easing-default, var(--pa-transition-easing-default, ease));
}

.pa-drawer-enter-active .pa-drawer-container--right,
.pa-drawer-leave-active .pa-drawer-container--right {
  transition: transform var(--pa-drawer-transition-duration-default, var(--pa-transition-duration-default, 200ms)) var(--pa-drawer-transition-easing-default, var(--pa-transition-easing-default, ease));
}

.pa-drawer-enter-active .pa-drawer-container--top,
.pa-drawer-leave-active .pa-drawer-container--top {
  transition: transform var(--pa-drawer-transition-duration-default, var(--pa-transition-duration-default, 200ms)) var(--pa-drawer-transition-easing-default, var(--pa-transition-easing-default, ease));
}

.pa-drawer-enter-active .pa-drawer-container--bottom,
.pa-drawer-leave-active .pa-drawer-container--bottom {
  transition: transform var(--pa-drawer-transition-duration-default, var(--pa-transition-duration-default, 200ms)) var(--pa-drawer-transition-easing-default, var(--pa-transition-easing-default, ease));
}

.pa-drawer-enter-from .pa-drawer-container--left {
  transform: translateX(-100%);
}

.pa-drawer-leave-to .pa-drawer-container--left {
  transform: translateX(-100%);
}

.pa-drawer-enter-from .pa-drawer-container--right {
  transform: translateX(100%);
}

.pa-drawer-leave-to .pa-drawer-container--right {
  transform: translateX(100%);
}

.pa-drawer-enter-from .pa-drawer-container--top {
  transform: translateY(-100%);
}

.pa-drawer-leave-to .pa-drawer-container--top {
  transform: translateY(-100%);
}

.pa-drawer-enter-from .pa-drawer-container--bottom {
  transform: translateY(100%);
}

.pa-drawer-leave-to .pa-drawer-container--bottom {
  transform: translateY(100%);
}
</style>

