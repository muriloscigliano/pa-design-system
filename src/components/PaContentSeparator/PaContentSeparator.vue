<script setup lang="ts">
defineProps<{
  direction?: 'horizontal' | 'vertical'
  text?: string
}>()
</script>

<template>
  <div
    :class="[
      'pa-content-separator',
      `pa-content-separator--${direction || 'horizontal'}`,
      {
        'has-text': text
      }
    ]"
    role="separator"
  >
    <span v-if="text" class="pa-content-separator-text">{{ text }}</span>
  </div>
</template>

<style lang="scss" scoped>
.pa-content-separator {
  border-color: var(--pa-content-separator-border-color);

  &--horizontal {
    width: 100%;
    height: var(--pa-content-separator-border-width);
    border-top: var(--pa-content-separator-border-width) solid var(--pa-content-separator-border-color);
    display: flex;
    align-items: center;

    &.has-text {
      border-top: none;
      gap: var(--pa-content-separator-spacing-text);

      &::before,
      &::after {
        content: '';
        flex: 1;
        height: var(--pa-content-separator-border-width);
        background-color: var(--pa-content-separator-border-color);
      }
    }
  }

  &--vertical {
    width: var(--pa-content-separator-border-width);
    height: 100%;
    border-left: var(--pa-content-separator-border-width) solid var(--pa-content-separator-border-color);
    display: flex;
    flex-direction: column;
    align-items: center;

    &.has-text {
      border-left: none;
      gap: var(--pa-content-separator-spacing-text);

      &::before,
      &::after {
        content: '';
        flex: 1;
        width: var(--pa-content-separator-border-width);
        background-color: var(--pa-content-separator-border-color);
      }
    }
  }
}

.pa-content-separator-text {
  color: var(--pa-content-separator-text-color);
  font-family: var(--pa-font-family-roboto, Roboto, sans-serif);
  font-size: var(--pa-content-separator-text-font-size);
  font-weight: var(--pa-content-separator-text-font-weight);
  white-space: nowrap;
}
</style>

