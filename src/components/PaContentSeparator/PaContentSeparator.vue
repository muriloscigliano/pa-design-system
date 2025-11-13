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
  border-color: var(--pa-color-surface-base-divider, var(--pa-gray-200, #e9ecef));

  &--horizontal {
    width: 100%;
    height: var(--pa-Border-width-50, 1px);
    border-top: var(--pa-Border-width-50, 1px) solid var(--pa-color-surface-base-divider, var(--pa-gray-200, #e9ecef));
    display: flex;
    align-items: center;

    &.has-text {
      border-top: none;
      gap: var(--pa-spacing-16, 16px);

      &::before,
      &::after {
        content: '';
        flex: 1;
        height: var(--pa-Border-width-50, 1px);
        background-color: var(--pa-color-surface-base-divider, var(--pa-gray-200, #e9ecef));
      }
    }
  }

  &--vertical {
    width: var(--pa-Border-width-50, 1px);
    height: 100%;
    border-left: var(--pa-Border-width-50, 1px) solid var(--pa-color-surface-base-divider, var(--pa-gray-200, #e9ecef));
    display: flex;
    flex-direction: column;
    align-items: center;

    &.has-text {
      border-left: none;
      gap: var(--pa-spacing-16, 16px);

      &::before,
      &::after {
        content: '';
        flex: 1;
        width: var(--pa-Border-width-50, 1px);
        background-color: var(--pa-color-surface-base-divider, var(--pa-gray-200, #e9ecef));
      }
    }
  }
}

.pa-content-separator-text {
  color: var(--pa-color-surface-container-text, var(--pa-gray-900, #212529));
  font-family: var(--pa-font-family-roboto, Roboto, sans-serif);
  font-size: var(--pa-font-size-100, 14px);
  font-weight: var(--pa-font-weight-400, 400);
  white-space: nowrap;
}
</style>

