<script setup lang="ts">
defineProps<{
  selected?: boolean
  hoverable?: boolean
}>()
</script>

<template>
  <div
    :class="[
      'pa-list-item',
      {
        'is-selected': selected,
        'is-hoverable': hoverable
      }
    ]"
  >
    <div v-if="$slots.avatar" class="pa-list-item-avatar">
      <slot name="avatar" />
    </div>
    <div v-if="$slots.icon" class="pa-list-item-icon">
      <slot name="icon" />
    </div>
    <div class="pa-list-item-content">
      <slot />
    </div>
    <div v-if="$slots.actions" class="pa-list-item-actions">
      <slot name="actions" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.pa-list-item {
  display: flex;
  align-items: center;
  gap: var(--pa-list-item-gap-default);
  padding: var(--pa-list-item-padding-y) var(--pa-list-item-padding-x);
  background-color: var(--pa-list-item-background-default);
  color: var(--pa-list-item-text);
  border-bottom: var(--pa-list-item-border-width) solid var(--pa-list-item-border-color);
  transition: all var(--pa-list-item-transition-duration-default) var(--pa-list-item-transition-easing-default);

  &:last-child {
    border-bottom: none;
  }

  &.is-hoverable {
    cursor: var(--pa-cursor-pointer, pointer);

    &:hover {
      background-color: var(--pa-list-item-background-hover);
    }
  }

  &.is-selected {
    background-color: var(--pa-list-item-background-selected);
  }
}

.pa-list-item-avatar,
.pa-list-item-icon {
  display: flex;
  align-items: center;
  flex-shrink: 0;
}

.pa-list-item-content {
  flex: 1;
  min-width: 0;
}

.pa-list-item-actions {
  display: flex;
  align-items: center;
  gap: var(--pa-list-item-gap-actions);
  flex-shrink: 0;
}
</style>

