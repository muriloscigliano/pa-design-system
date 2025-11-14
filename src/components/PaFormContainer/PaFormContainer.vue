<script setup lang="ts">
defineProps<{
  title?: string
  description?: string
  variant?: 'default' | 'outlined' | 'elevated'
}>()
</script>

<template>
  <div
    :class="[
      'pa-form-container',
      `pa-form-container--${variant || 'default'}`
    ]"
  >
    <div v-if="title || description || $slots.header" class="pa-form-container-header">
      <slot name="header">
        <h2 v-if="title" class="pa-form-container-title">{{ title }}</h2>
        <p v-if="description" class="pa-form-container-description">{{ description }}</p>
      </slot>
    </div>
    <div class="pa-form-container-content">
      <slot />
    </div>
    <div v-if="$slots.footer" class="pa-form-container-footer">
      <slot name="footer" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.pa-form-container {
  background-color: var(--pa-form-container-background);
  border-radius: var(--pa-form-container-border-radius);
  padding: var(--pa-form-container-padding-y) var(--pa-form-container-padding-x);
  width: 100%;

  &--outlined {
    border: var(--pa-form-container-border-width) solid var(--pa-form-container-border);
  }

  &--elevated {
    box-shadow: var(--pa-form-container-shadow);
  }
}

.pa-form-container-header {
  padding-bottom: var(--pa-form-container-header-padding-bottom);
  border-bottom: var(--pa-form-container-border-width) solid var(--pa-form-container-header-border);
  margin-bottom: var(--pa-form-container-spacing-section);
}

.pa-form-container-title {
  margin: 0 0 var(--pa-form-container-title-spacing-bottom) 0;
  font-family: var(--pa-font-family-roboto, Roboto, sans-serif);
  font-size: var(--pa-form-container-title-font-size);
  font-weight: var(--pa-form-container-title-font-weight);
  color: var(--pa-form-container-title-color);
}

.pa-form-container-description {
  margin: 0;
  font-family: var(--pa-font-family-roboto, Roboto, sans-serif);
  font-size: var(--pa-form-container-description-font-size);
  font-weight: var(--pa-form-container-description-font-weight);
  color: var(--pa-form-container-description-color);
}

.pa-form-container-content {
  display: flex;
  flex-direction: column;
  gap: var(--pa-form-container-spacing-field);
}

.pa-form-container-footer {
  margin-top: var(--pa-form-container-spacing-section);
  padding-top: var(--pa-form-container-spacing-section);
  border-top: var(--pa-form-container-border-width) solid var(--pa-form-container-header-border);
  display: flex;
  gap: var(--pa-form-container-footer-gap);
  justify-content: flex-end;
}
</style>

