<script setup lang="ts">
defineProps<{
  size?: number | string
  color?: string
}>()
</script>

<template>
  <div
    class="pa-circle"
    :style="{
      width: typeof size === 'number' ? `${size}px` : size || 'var(--pa-circle-size-default)',
      height: typeof size === 'number' ? `${size}px` : size || 'var(--pa-circle-size-default)',
      backgroundColor: color || 'var(--pa-circle-background)'
    }"
  >
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.pa-circle {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: var(--pa-circle-background, var(--pa-color-surface-container-background));
  overflow: hidden;
}
</style>

