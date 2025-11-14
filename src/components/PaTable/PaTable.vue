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
  background-color: var(--pa-table-header-background);
  color: var(--pa-table-header-text);
  border-bottom: var(--pa-table-header-border-width) solid var(--pa-table-header-border-color);
}

.pa-table-header :deep(th) {
  padding: var(--pa-table-header-padding-y) var(--pa-table-header-padding-x);
  font-weight: var(--pa-table-header-font-weight);
  text-align: left;
}

.pa-table-body {
  background-color: var(--pa-table-row-background-default);
}

.pa-table-body :deep(tr) {
  border-bottom: var(--pa-table-row-border-width) solid var(--pa-table-row-border-color);
  transition: background-color var(--pa-table-row-transition-duration) var(--pa-table-row-transition-easing);

  &:last-child {
    border-bottom: none;
  }

  .pa-table.is-hoverable &:hover {
    background-color: var(--pa-table-row-background-hover);
  }

  &.is-selected {
    background-color: var(--pa-table-row-background-selected);
  }
}

.pa-table.is-striped .pa-table-body :deep(tr:nth-child(even)) {
  background-color: var(--pa-table-row-background-striped);
}

.pa-table-body :deep(td),
.pa-table-footer :deep(td) {
  padding: var(--pa-table-cell-padding-y) var(--pa-table-cell-padding-x);
  color: var(--pa-table-cell-text);
}

.pa-table-footer {
  border-top: var(--pa-table-header-border-width) solid var(--pa-table-header-border-color);
}
</style>

