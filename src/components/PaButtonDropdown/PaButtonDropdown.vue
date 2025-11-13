<script setup lang="ts">
import { ref } from 'vue'
import PaButton from '../PaButton/PaButton.vue'
import PaDropdown from '../PaDropdown/PaDropdown.vue'
import PaDropdownItem from '../PaDropdown/PaDropdownItem.vue'

interface DropdownOption {
  label: string
  value: string | number
  disabled?: boolean
  action?: () => void
}

const props = defineProps<{
  options: DropdownOption[]
  variant?: 'primary' | 'secondary' | 'tertiary' | 'link' | 'action'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  placement?: 'top' | 'bottom' | 'left' | 'right'
}>()

const isOpen = ref(false)

const handleSelect = (option: DropdownOption) => {
  if (option.action) {
    option.action()
  }
  isOpen.value = false
}
</script>

<template>
  <PaDropdown v-model="isOpen" :placement="props.placement">
    <template #trigger>
      <PaButton
        :variant="props.variant"
        :size="props.size"
        :disabled="props.disabled"
      >
        <slot name="button">
          <span>Actions</span>
        </slot>
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          :style="{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }"
        >
          <path
            d="M4 6L8 10L12 6"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </PaButton>
    </template>
    <PaDropdownItem
      v-for="option in props.options"
      :key="String(option.value)"
      :disabled="option.disabled"
      @click="handleSelect(option)"
    >
      {{ option.label }}
    </PaDropdownItem>
  </PaDropdown>
</template>

