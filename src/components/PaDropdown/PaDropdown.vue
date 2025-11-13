<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

defineProps<{
  modelValue?: boolean
  placement?: 'top' | 'bottom' | 'left' | 'right'
  trigger?: 'click' | 'hover'
}>()

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  'close': []
}>()

const isOpen = ref(false)
const menuRef = ref<HTMLElement>()

const toggle = () => {
  isOpen.value = !isOpen.value
  emit('update:modelValue', isOpen.value)
}

const close = () => {
  isOpen.value = false
  emit('update:modelValue', false)
  emit('close')
}

const handleClickOutside = (event: MouseEvent) => {
  if (menuRef.value && !menuRef.value.contains(event.target as Node)) {
    close()
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<template>
  <div class="pa-dropdown">
    <div 
      class="pa-dropdown-trigger" 
      role="button"
      :aria-expanded="isOpen"
      :aria-haspopup="true"
      @click="toggle"
    >
      <slot name="trigger" />
    </div>
    <Transition name="pa-dropdown">
      <div
        v-if="isOpen"
        ref="menuRef"
        :class="[
          'pa-dropdown-menu',
          `pa-dropdown-menu--${placement || 'bottom'}`
        ]"
        role="menu"
      >
        <slot />
      </div>
    </Transition>
  </div>
</template>

<style lang="scss" scoped>
.pa-dropdown {
  position: relative;
  display: inline-block;
}

.pa-dropdown-trigger {
  cursor: var(--pa-cursor-pointer, pointer);
}

.pa-dropdown-menu {
  position: absolute;
  background-color: var(--pa-dropdown-menu-background, var(--pa-color-surface-container-background));
  border: var(--pa-Border-width-50, 1px) solid var(--pa-dropdown-menu-border, var(--pa-color-surface-container-border));
  border-radius: var(--pa-dropdown-menu-border-radius, var(--pa-Border-radius-100, 8px));
  box-shadow: var(--pa-dropdown-menu-shadow, var(--pa-shadow-md));
  padding: var(--pa-dropdown-menu-padding-y) var(--pa-dropdown-menu-padding-x);
  z-index: var(--pa-dropdown-menu-z-index, var(--pa-z-index-400, 400));
  min-width: var(--pa-spacing-500, var(--pa-spacing-48, 48px));
  margin-top: var(--pa-spacing-4, 4px);

  &--top {
    bottom: 100%;
    margin-top: 0;
    margin-bottom: var(--pa-spacing-4, 4px);
  }

  &--left {
    right: 100%;
    margin-top: 0;
    margin-right: var(--pa-spacing-4, 4px);
  }

  &--right {
    left: 100%;
    margin-top: 0;
    margin-left: var(--pa-spacing-4, 4px);
  }
}

.pa-dropdown-enter-active,
.pa-dropdown-leave-active {
  transition: opacity var(--pa-transition-duration-fast, 100ms) var(--pa-transition-easing-default, ease),
    transform var(--pa-transition-duration-fast, 100ms) var(--pa-transition-easing-default, ease);
}

.pa-dropdown-enter-from,
.pa-dropdown-leave-to {
  opacity: 0;
  transform: translateY(calc(var(--pa-spacing-4, 4px) * -1));
}
</style>

