<script setup lang="ts">
defineProps<{
  label?: string
  optional?: boolean
}>()
</script>

<template>
  <div class="pa-optional-group">
    <div v-if="label" class="pa-optional-group-header">
      <label class="pa-optional-group-label">{{ label }}</label>
      <span v-if="optional" class="pa-optional-group-badge">Optional</span>
    </div>
    <div class="pa-optional-group-content">
      <slot />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.pa-optional-group {
  display: flex;
  flex-direction: column;
  gap: var(--pa-optional-group-gap, var(--pa-spacing-8, 8px));

  &-header {
    display: flex;
    align-items: center;
    gap: var(--pa-spacing-8, 8px);
  }

  &-label {
    font-family: var(--pa-font-family-roboto, Roboto, sans-serif);
    font-size: var(--pa-font-size-100, 14px);
    font-weight: var(--pa-font-weight-500, 500);
    color: var(--pa-color-surface-container-text, var(--pa-color-surface-base-text));
  }

  &-badge {
    font-family: var(--pa-font-family-roboto, Roboto, sans-serif);
    font-size: var(--pa-font-size-75, 12px);
    font-weight: var(--pa-font-weight-400, 400);
    color: var(--pa-color-surface-container-text-secondary, var(--pa-color-surface-base-text));
  }

  &-content {
    display: flex;
    flex-direction: column;
    gap: var(--pa-spacing-8, 8px);
  }
}
</style>

