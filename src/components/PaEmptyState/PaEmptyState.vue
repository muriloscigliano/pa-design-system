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
  padding: var(--pa-spacing-32, 32px);
}

.pa-empty-state-icon {
  color: var(--pa-empty-state-icon, var(--pa-gray-400, #ced4da));
  margin-bottom: var(--pa-empty-state-spacing-icon, var(--pa-spacing-24, 24px));
  display: flex;
  align-items: center;
  justify-content: center;
  width: var(--pa-icon-size-xl, var(--pa-icon-size-400, 64px));
  height: var(--pa-icon-size-xl, var(--pa-icon-size-400, 64px));
}

.pa-empty-state-title {
  color: var(--pa-empty-state-text-primary, var(--pa-color-surface-container-text));
  font-family: var(--pa-font-family-roboto, Roboto, sans-serif);
  font-size: var(--pa-font-size-500, 24px);
  font-weight: var(--pa-font-weight-700, 700);
  margin: 0 0 var(--pa-empty-state-spacing-text, var(--pa-spacing-16, 16px)) 0;
}

.pa-empty-state-description {
  color: var(--pa-empty-state-text-secondary, var(--pa-gray-500, #adb5bd));
  font-family: var(--pa-font-family-roboto, Roboto, sans-serif);
  font-size: var(--pa-font-size-200, 16px);
  font-weight: var(--pa-font-weight-400, 400);
  margin: 0 0 var(--pa-empty-state-spacing-text, var(--pa-spacing-16, 16px)) 0;
  max-width: var(--pa-spacing-800, var(--pa-spacing-100, 100px));
}

.pa-empty-state-action {
  margin-top: var(--pa-spacing-8, 8px);
}
</style>

