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
  padding: var(--pa-kebab-menu-trigger-padding);
  cursor: var(--pa-cursor-pointer);
  color: var(--pa-color-surface-container-text);
  display: flex;
  align-items: center;
  justify-content: center;
  width: var(--pa-kebab-menu-trigger-size);
  height: var(--pa-kebab-menu-trigger-size);
  border-radius: var(--pa-kebab-menu-trigger-radius);
  transition: background-color var(--pa-kebab-menu-transition-duration-default) var(--pa-kebab-menu-transition-easing-default);

  &:hover {
    background-color: var(--pa-kebab-menu-trigger-background-hover);
  }

  svg {
    width: var(--pa-kebab-menu-trigger-icon-size);
    height: var(--pa-kebab-menu-trigger-icon-size);
  }
}
</style>

