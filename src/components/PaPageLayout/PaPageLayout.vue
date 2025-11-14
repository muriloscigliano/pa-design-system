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
  width: var(--pa-page-layout-sidebar-width);
  flex-shrink: 0;
  background-color: var(--pa-page-layout-sidebar-background);
  border-right: var(--pa-page-layout-sidebar-border-width) solid var(--pa-page-layout-sidebar-border-color);
}

.pa-page-layout-main {
  flex: 1;
  padding: var(--pa-page-layout-main-padding);
  background-color: var(--pa-page-layout-main-background);
  overflow-x: auto;
}
</style>

