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
  background-color: var(--pa-sheet-overlay-background);
  z-index: var(--pa-sheet-overlay-z-index);
  display: flex;
}

.pa-sheet {
  background-color: var(--pa-sheet-background);
  box-shadow: var(--pa-sheet-shadow);
  overflow-y: auto;
  display: flex;
  flex-direction: column;

  &--left {
    justify-content: flex-start;
    align-items: flex-start;
    width: var(--pa-sheet-size-md-width);
    height: 100%;
  }

  &--right {
    justify-content: flex-start;
    align-items: flex-end;
    margin-left: auto;
    width: var(--pa-sheet-size-md-width);
    height: 100%;
  }

  &--top {
    justify-content: flex-start;
    align-items: flex-start;
    width: 100%;
    height: var(--pa-sheet-size-md-height);
  }

  &--bottom {
    justify-content: flex-end;
    align-items: flex-start;
    margin-top: auto;
    width: 100%;
    height: var(--pa-sheet-size-md-height);
  }

  &--sm {
    width: var(--pa-sheet-size-sm-width);
    height: var(--pa-sheet-size-sm-height);
  }

  &--md {
    width: var(--pa-sheet-size-md-width);
    height: var(--pa-sheet-size-md-height);
  }

  &--lg {
    width: var(--pa-sheet-size-lg-width);
    height: var(--pa-sheet-size-lg-height);
  }

  &--full {
    width: 100%;
    height: 100%;
  }
}

.pa-sheet-enter-active,
.pa-sheet-leave-active {
  transition: opacity var(--pa-sheet-transition-duration-default) var(--pa-sheet-transition-easing-default);
}

.pa-sheet-enter-from,
.pa-sheet-leave-to {
  opacity: 0;
}
</style>

