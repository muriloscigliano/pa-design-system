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
      width: typeof size === 'number' ? `${size}px` : size || 'var(--pa-square-size-default)',
      height: typeof size === 'number' ? `${size}px` : size || 'var(--pa-square-size-default)',
      backgroundColor: color || 'var(--pa-square-background)'
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
  border-radius: var(--pa-square-radius);
  background-color: var(--pa-square-background);
  overflow: hidden;
}
</style>

