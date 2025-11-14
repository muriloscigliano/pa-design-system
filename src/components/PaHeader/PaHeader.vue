<script setup lang="ts">
defineProps<{
  sticky?: boolean
}>()
</script>

<template>
  <header
    :class="[
      'pa-header',
      {
        'is-sticky': sticky
      }
    ]"
  >
    <div class="pa-header-content">
      <div v-if="$slots.logo" class="pa-header-logo">
        <slot name="logo" />
      </div>
      <nav v-if="$slots.navigation" class="pa-header-navigation">
        <slot name="navigation" />
      </nav>
      <div v-if="$slots.actions" class="pa-header-actions">
        <slot name="actions" />
      </div>
    </div>
  </header>
</template>

<style lang="scss" scoped>
.pa-header {
  background-color: var(--pa-header-background);
  color: var(--pa-header-text);
  border-bottom: var(--pa-header-border-width) solid var(--pa-header-border);
  height: var(--pa-header-height);
  padding: var(--pa-header-padding-y) var(--pa-header-padding-x);

  &.is-sticky {
    position: sticky;
    top: 0;
    z-index: var(--pa-header-z-index);
  }
}

.pa-header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  max-width: 100%;
}

.pa-header-logo {
  display: flex;
  align-items: center;
  flex-shrink: 0;
}

.pa-header-navigation {
  display: flex;
  align-items: center;
  flex: 1;
  margin: 0 var(--pa-header-navigation-margin-x);
}

.pa-header-actions {
  display: flex;
  align-items: center;
  gap: var(--pa-header-actions-gap);
  flex-shrink: 0;
}
</style>

