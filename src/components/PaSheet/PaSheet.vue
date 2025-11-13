<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'

const props = defineProps<{
  modelValue: boolean
  placement?: 'left' | 'right' | 'top' | 'bottom'
  size?: 'sm' | 'md' | 'lg' | 'full'
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
  if (props.closeOnOverlay && (event.target as HTMLElement).classList.contains('pa-sheet-overlay')) {
    close()
  }
}

const handleEscape = (event: KeyboardEvent) => {
  if (event.key === 'Escape' && props.modelValue) {
    close()
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleEscape)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleEscape)
})
</script>

<template>
  <Teleport to="body">
    <Transition name="pa-sheet">
      <div
        v-if="modelValue"
        class="pa-sheet-overlay"
        @click="handleOverlayClick"
      >
        <div
          :class="[
            'pa-sheet',
            `pa-sheet--${placement || 'right'}`,
            `pa-sheet--${size || 'md'}`
          ]"
          @click.stop
        >
          <slot />
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style lang="scss" scoped>
.pa-sheet-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: var(--pa-sheet-overlay-background, rgba(0, 0, 0, 0.5));
  z-index: var(--pa-z-index-400, 400);
  display: flex;
}

.pa-sheet {
  background-color: var(--pa-sheet-background, var(--pa-color-surface-container-background));
  box-shadow: var(--pa-shadow-lg-x, 4px) var(--pa-shadow-lg-y, 4px) var(--pa-shadow-lg-blur, 30px) var(--pa-shadow-lg-spread, 5px) var(--pa-shadow-lg-Color, #616161);
  overflow-y: auto;
  display: flex;
  flex-direction: column;

  &--left {
    justify-content: flex-start;
    align-items: flex-start;
    width: var(--pa-sheet-size-md-width, 400px);
    height: 100%;
  }

  &--right {
    justify-content: flex-start;
    align-items: flex-end;
    margin-left: auto;
    width: var(--pa-sheet-size-md-width, 400px);
    height: 100%;
  }

  &--top {
    justify-content: flex-start;
    align-items: flex-start;
    width: 100%;
    height: var(--pa-sheet-size-md-height, 400px);
  }

  &--bottom {
    justify-content: flex-end;
    align-items: flex-start;
    margin-top: auto;
    width: 100%;
    height: var(--pa-sheet-size-md-height, 400px);
  }

  &--sm {
    width: var(--pa-sheet-size-sm-width, 300px);
    height: var(--pa-sheet-size-sm-height, 300px);
  }

  &--md {
    width: var(--pa-sheet-size-md-width, 400px);
    height: var(--pa-sheet-size-md-height, 400px);
  }

  &--lg {
    width: var(--pa-sheet-size-lg-width, 600px);
    height: var(--pa-sheet-size-lg-height, 600px);
  }

  &--full {
    width: 100%;
    height: 100%;
  }
}

.pa-sheet-enter-active,
.pa-sheet-leave-active {
  transition: opacity var(--pa-transition-duration-default, 200ms) var(--pa-transition-easing-default, ease);
}

.pa-sheet-enter-from,
.pa-sheet-leave-to {
  opacity: 0;
}
</style>

