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
  gap: var(--pa-optional-group-gap);

  &-header {
    display: flex;
    align-items: center;
    gap: var(--pa-optional-group-header-gap);
  }

  &-label {
    font-family: var(--pa-font-family-roboto);
    font-size: var(--pa-optional-group-label-font-size);
    font-weight: var(--pa-optional-group-label-font-weight);
    color: var(--pa-color-surface-container-text);
  }

  &-badge {
    font-family: var(--pa-font-family-roboto);
    font-size: var(--pa-optional-group-badge-font-size);
    font-weight: var(--pa-optional-group-badge-font-weight);
    color: var(--pa-color-surface-container-text-secondary);
  }

  &-content {
    display: flex;
    flex-direction: column;
    gap: var(--pa-optional-group-content-gap);
  }
}
</style>

