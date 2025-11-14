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
  background-color: var(--pa-dropdown-menu-background);
  border: var(--pa-dropdown-menu-border-width) solid var(--pa-dropdown-menu-border);
  border-radius: var(--pa-dropdown-menu-border-radius);
  box-shadow: var(--pa-dropdown-menu-shadow);
  padding: var(--pa-dropdown-menu-padding-y) var(--pa-dropdown-menu-padding-x);
  z-index: var(--pa-dropdown-menu-z-index);
  min-width: var(--pa-dropdown-menu-min-width);
  margin-top: var(--pa-dropdown-menu-spacing-top);

  &--top {
    bottom: 100%;
    margin-top: 0;
    margin-bottom: var(--pa-dropdown-menu-spacing-bottom);
  }

  &--left {
    right: 100%;
    margin-top: 0;
    margin-right: var(--pa-dropdown-menu-spacing-right);
  }

  &--right {
    left: 100%;
    margin-top: 0;
    margin-left: var(--pa-dropdown-menu-spacing-left);
  }
}

.pa-dropdown-enter-active,
.pa-dropdown-leave-active {
  transition: opacity var(--pa-dropdown-transition-duration-fast) var(--pa-transition-easing-default),
    transform var(--pa-dropdown-transition-duration-fast) var(--pa-transition-easing-default);
}

.pa-dropdown-enter-from,
.pa-dropdown-leave-to {
  opacity: 0;
  transform: translateY(calc(var(--pa-dropdown-menu-spacing-top) * -1));
}
</style>

