<script setup lang="ts">
defineProps<{
  sidebar?: boolean
}>()
</script>

<template>
  <div
    :class="[
      'pa-page-layout',
      {
        'has-sidebar': sidebar
      }
    ]"
  >
    <aside v-if="$slots.sidebar" class="pa-page-layout-sidebar">
      <slot name="sidebar" />
    </aside>
    <main class="pa-page-layout-main">
      <slot />
    </main>
  </div>
</template>

<style lang="scss" scoped>
.pa-page-layout {
  display: flex;
  min-height: 100vh;
  width: 100%;
}

.pa-page-layout-sidebar {
  width: var(--pa-layout-drawer-sm, 300px);
  flex-shrink: 0;
  background-color: var(--pa-color-surface-container-background, var(--pa-gray-white, #ffffff));
  border-right: var(--pa-Border-width-50, 1px) solid var(--pa-color-surface-container-border, var(--pa-gray-200, #e9ecef));
}

.pa-page-layout-main {
  flex: 1;
  padding: var(--pa-spacing-24, 24px);
  background-color: var(--pa-color-surface-base-background, var(--pa-gray-100, #f7f7f8));
  overflow-x: auto;
}
</style>

