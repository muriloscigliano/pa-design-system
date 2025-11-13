<script setup lang="ts">
import PaButton from '../PaButton/PaButton.vue'

defineProps<{
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  loading?: boolean
  iconPosition?: 'left' | 'center' | 'right'
}>()
</script>

<template>
  <PaButton
    variant="action"
    :size="size"
    :disabled="disabled"
    :loading="loading"
    :icon-position="iconPosition"
  >
    <slot />
  </PaButton>
</template>

