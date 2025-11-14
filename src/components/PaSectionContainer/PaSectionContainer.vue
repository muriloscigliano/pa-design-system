<script setup lang="ts">
defineProps<{
  title?: string
  description?: string
}>()
</script>

<template>
  <div class="pa-section-container">
    <div v-if="title || description || $slots.header" class="pa-section-container-header">
      <slot name="header">
        <div class="pa-section-container-header-content">
          <h2 v-if="title" class="pa-section-container-title">{{ title }}</h2>
          <p v-if="description" class="pa-section-container-description">{{ description }}</p>
        </div>
        <div v-if="$slots.actions" class="pa-section-container-actions">
          <slot name="actions" />
        </div>
      </slot>
    </div>
    <div class="pa-section-container-content">
      <slot />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.pa-section-container {
  background-color: var(--pa-section-container-background);
  border: var(--pa-section-container-border-width) solid var(--pa-section-container-border);
  border-radius: var(--pa-section-container-border-radius);
  padding: var(--pa-section-container-padding-y) var(--pa-section-container-padding-x);
  width: 100%;
}

.pa-section-container-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: var(--pa-section-container-spacing-header-gap);
  padding-bottom: var(--pa-section-container-spacing-header);
  border-bottom: var(--pa-section-container-header-border-width) solid var(--pa-section-container-header-border);
  margin-bottom: var(--pa-section-container-spacing-content);
}

.pa-section-container-header-content {
  flex: 1;
}

.pa-section-container-title {
  margin: 0 0 var(--pa-section-container-spacing-title-bottom) 0;
  font-family: var(--pa-font-family-roboto, Roboto, sans-serif);
  font-size: var(--pa-section-container-title-font-size);
  font-weight: var(--pa-section-container-title-font-weight);
  color: var(--pa-section-container-title-color);
}

.pa-section-container-description {
  margin: 0;
  font-family: var(--pa-font-family-roboto, Roboto, sans-serif);
  font-size: var(--pa-section-container-description-font-size);
  font-weight: var(--pa-section-container-description-font-weight);
  color: var(--pa-section-container-description-color);
}

.pa-section-container-actions {
  display: flex;
  gap: var(--pa-section-container-spacing-actions-gap);
  flex-shrink: 0;
}

.pa-section-container-content {
  width: 100%;
}
</style>

