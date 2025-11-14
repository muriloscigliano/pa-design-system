<script setup lang="ts">
defineProps<{
  title?: string
  description?: string
}>()
</script>

<template>
  <div class="pa-empty-state">
    <div v-if="$slots.icon" class="pa-empty-state-icon">
      <slot name="icon" />
    </div>
    <h3 v-if="title || $slots.title" class="pa-empty-state-title">
      <slot name="title">{{ title }}</slot>
    </h3>
    <p v-if="description || $slots.description" class="pa-empty-state-description">
      <slot name="description">{{ description }}</slot>
    </p>
    <div v-if="$slots.action" class="pa-empty-state-action">
      <slot name="action" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.pa-empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: var(--pa-empty-state-padding);
}

.pa-empty-state-icon {
  color: var(--pa-empty-state-icon);
  margin-bottom: var(--pa-empty-state-spacing-icon);
  display: flex;
  align-items: center;
  justify-content: center;
  width: var(--pa-empty-state-icon-size);
  height: var(--pa-empty-state-icon-size);
}

.pa-empty-state-title {
  color: var(--pa-empty-state-text-primary);
  font-family: var(--pa-font-family-roboto, Roboto, sans-serif);
  font-size: var(--pa-empty-state-title-font-size);
  font-weight: var(--pa-empty-state-title-font-weight);
  margin: 0 0 var(--pa-empty-state-spacing-text) 0;
}

.pa-empty-state-description {
  color: var(--pa-empty-state-text-secondary);
  font-family: var(--pa-font-family-roboto, Roboto, sans-serif);
  font-size: var(--pa-empty-state-description-font-size);
  font-weight: var(--pa-empty-state-description-font-weight);
  margin: 0 0 var(--pa-empty-state-spacing-text) 0;
  max-width: var(--pa-empty-state-description-max-width);
}

.pa-empty-state-action {
  margin-top: var(--pa-empty-state-spacing-action);
}
</style>

