<script setup lang="ts">
defineProps<{
  size?: number | string
  color?: string
}>()
</script>

<template>
  <div
    class="pa-square"
    :style="{
      width: typeof size === 'number' ? `${size}px` : size || 'var(--pa-square-size-default, 48px)',
      height: typeof size === 'number' ? `${size}px` : size || 'var(--pa-square-size-default, 48px)',
      backgroundColor: color || 'var(--pa-square-background, var(--pa-color-surface-container-background))'
    }"
  >
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.pa-square {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--pa-square-radius, var(--pa-Border-radius-100, 8px));
  background-color: var(--pa-square-background, var(--pa-color-surface-container-background));
  overflow: hidden;
}
</style>

