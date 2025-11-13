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
  gap: var(--pa-spacing-12, 12px);
  padding: var(--pa-list-item-padding-y) var(--pa-list-item-padding-x);
  background-color: var(--pa-list-item-background-default, var(--pa-color-surface-base-background));
  color: var(--pa-list-item-text, var(--pa-color-surface-base-text));
  border-bottom: var(--pa-Border-width-50, 1px) solid var(--pa-list-item-border, var(--pa-color-surface-base-divider));
  transition: all var(--pa-list-item-transition-duration-default, var(--pa-transition-duration-default, 200ms)) var(--pa-list-item-transition-easing-default, var(--pa-transition-easing-default, ease));

  &:last-child {
    border-bottom: none;
  }

  &.is-hoverable {
    cursor: var(--pa-cursor-pointer, pointer);

    &:hover {
      background-color: var(--pa-list-item-background-hover, var(--pa-color-surface-cards-hover-background));
    }
  }

  &.is-selected {
    background-color: var(--pa-list-item-background-selected, var(--pa-color-surface-cards-selected-background));
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
  gap: var(--pa-spacing-8, 8px);
  flex-shrink: 0;
}
</style>

