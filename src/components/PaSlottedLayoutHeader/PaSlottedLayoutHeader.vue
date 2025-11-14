<script setup lang="ts">
defineProps<{
  title?: string
  align?: 'left' | 'center' | 'right'
}>()
</script>

<template>
  <div
    :class="[
      'pa-slotted-layout-header',
      `pa-slotted-layout-header--align-${align || 'left'}`
    ]"
  >
    <h2 v-if="title" class="pa-slotted-layout-header-title">{{ title }}</h2>
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.pa-slotted-layout-header {
  display: flex;
  flex-direction: column;
  gap: var(--pa-slotted-layout-header-gap);

  &--align-left {
    align-items: flex-start;
    text-align: left;
  }

  &--align-center {
    align-items: center;
    text-align: center;
  }

  &--align-right {
    align-items: flex-end;
    text-align: right;
  }

  &-title {
    margin: 0;
    font-family: var(--pa-font-family-roboto);
    font-size: var(--pa-slotted-layout-header-font-size);
    font-weight: var(--pa-slotted-layout-header-font-weight);
    color: var(--pa-slotted-layout-header-text);
    line-height: var(--pa-slotted-layout-header-line-height);
  }
}
</style>

