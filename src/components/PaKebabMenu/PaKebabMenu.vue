<script setup lang="ts">
import { ref } from 'vue'
import PaDropdown from '../PaDropdown/PaDropdown.vue'
import PaDropdownItem from '../PaDropdown/PaDropdownItem.vue'

defineProps<{
  options: Array<{ label: string; action: () => void; disabled?: boolean }>
}>()

const isOpen = ref(false)
</script>

<template>
  <PaDropdown v-model="isOpen" placement="bottom">
    <template #trigger>
      <button class="pa-kebab-menu-trigger" aria-label="Menu">
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="8" cy="4" r="1.5" fill="currentColor" />
          <circle cx="8" cy="8" r="1.5" fill="currentColor" />
          <circle cx="8" cy="12" r="1.5" fill="currentColor" />
        </svg>
      </button>
    </template>
    <PaDropdownItem
      v-for="(option, index) in options"
      :key="index"
      :disabled="option.disabled"
      @click="option.action(); isOpen = false"
    >
      {{ option.label }}
    </PaDropdownItem>
  </PaDropdown>
</template>

<style lang="scss" scoped>
.pa-kebab-menu-trigger {
  background: none;
  border: none;
  padding: var(--pa-spacing-4, 4px);
  cursor: var(--pa-cursor-pointer, pointer);
  color: var(--pa-color-surface-container-text, var(--pa-gray-900, #212529));
  display: flex;
  align-items: center;
  justify-content: center;
  width: var(--pa-icon-size-lg, var(--pa-icon-size-300, 32px));
  height: var(--pa-icon-size-lg, var(--pa-icon-size-300, 32px));
  border-radius: var(--pa-Border-radius-50, 4px);
  transition: background-color var(--pa-transition-duration-default, 200ms) var(--pa-transition-easing-default, ease);

  &:hover {
    background-color: var(--pa-color-surface-cards-hover-background, var(--pa-gray-200, #e9ecef));
  }

  svg {
    width: var(--pa-icon-size-sm, var(--pa-icon-size-100, 16px));
    height: var(--pa-icon-size-sm, var(--pa-icon-size-100, 16px));
  }
}
</style>

