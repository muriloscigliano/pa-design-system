<script setup lang="ts">
defineProps<{
  striped?: boolean
  hoverable?: boolean
}>()
</script>

<template>
  <div class="pa-table-wrapper">
    <table
      :class="[
        'pa-table',
        {
          'is-striped': striped,
          'is-hoverable': hoverable
        }
      ]"
    >
      <thead v-if="$slots.header" class="pa-table-header">
        <slot name="header" />
      </thead>
      <tbody v-if="$slots.body" class="pa-table-body">
        <slot name="body" />
      </tbody>
      <tfoot v-if="$slots.footer" class="pa-table-footer">
        <slot name="footer" />
      </tfoot>
    </table>
  </div>
</template>

<style lang="scss" scoped>
.pa-table-wrapper {
  width: 100%;
  overflow-x: auto;
}

.pa-table {
  width: 100%;
  border-collapse: collapse;
  font-family: var(--pa-font-family-roboto, Roboto, sans-serif);
}

.pa-table-header {
  background-color: var(--pa-table-header-background, var(--pa-color-surface-container-background));
  color: var(--pa-table-header-text, var(--pa-color-surface-container-text));
  border-bottom: var(--pa-Border-width-100, 2px) solid var(--pa-table-header-border, var(--pa-color-surface-container-border));
}

.pa-table-header :deep(th) {
  padding: var(--pa-table-header-padding-y) var(--pa-table-header-padding-x);
  font-weight: var(--pa-font-weight-600, 600);
  text-align: left;
}

.pa-table-body {
  background-color: var(--pa-table-row-background-default, var(--pa-color-surface-base-background));
}

.pa-table-body :deep(tr) {
  border-bottom: var(--pa-Border-width-50, 1px) solid var(--pa-table-row-border, var(--pa-color-surface-base-divider));
  transition: background-color var(--pa-transition-duration-default, 200ms) var(--pa-transition-easing-default, ease);

  &:last-child {
    border-bottom: none;
  }

  .pa-table.is-hoverable &:hover {
    background-color: var(--pa-table-row-background-hover, var(--pa-color-surface-cards-hover-background));
  }

  &.is-selected {
    background-color: var(--pa-table-row-background-selected, var(--pa-color-surface-cards-selected-background));
  }
}

.pa-table.is-striped .pa-table-body :deep(tr:nth-child(even)) {
  background-color: var(--pa-table-row-background-striped, var(--pa-color-surface-container-background));
}

.pa-table-body :deep(td),
.pa-table-footer :deep(td) {
  padding: var(--pa-table-cell-padding-y) var(--pa-table-cell-padding-x);
  color: var(--pa-table-cell-text, var(--pa-color-surface-base-text));
}

.pa-table-footer {
  border-top: var(--pa-Border-width-100, 2px) solid var(--pa-table-header-border, var(--pa-color-surface-container-border));
}
</style>

