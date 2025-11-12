<script setup lang="ts">
interface BreadcrumbItem {
  label: string
  to?: string
  href?: string
  icon?: string
}

const props = defineProps<{
  items: BreadcrumbItem[]
  separator?: string
}>()

const defaultSeparator = props.separator || '/'
</script>

<template>
  <nav class="pa-breadcrumbs">
    <ol class="pa-breadcrumbs-list">
      <li
        v-for="(item, index) in items"
        :key="index"
        class="pa-breadcrumbs-item"
      >
        <component
          :is="item.to ? 'router-link' : item.href ? 'a' : 'span'"
          :to="item.to"
          :href="item.href"
          :class="[
            'pa-breadcrumbs-link',
            {
              'is-active': index === items.length - 1
            }
          ]"
        >
          <span v-if="item.icon" class="pa-breadcrumbs-icon">{{ item.icon }}</span>
          <span class="pa-breadcrumbs-label">{{ item.label }}</span>
        </component>
        <span
          v-if="index < items.length - 1"
          class="pa-breadcrumbs-separator"
        >
          {{ defaultSeparator }}
        </span>
      </li>
    </ol>
  </nav>
</template>

<style lang="scss" scoped>
.pa-breadcrumbs {
  display: flex;
  align-items: center;
}

.pa-breadcrumbs-list {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  list-style: none;
  margin: 0;
  padding: 0;
  gap: var(--pa-breadcrumbs-spacing-item-gap, var(--pa-spacing-8, 8px));
}

.pa-breadcrumbs-item {
  display: flex;
  align-items: center;
  gap: var(--pa-breadcrumbs-spacing-item-gap, var(--pa-spacing-8, 8px));
}

.pa-breadcrumbs-link {
  display: flex;
  align-items: center;
  gap: var(--pa-spacing-4, 4px);
  color: var(--pa-breadcrumbs-text-link, var(--pa-color-action-primary-text-default));
  text-decoration: none;
  font-family: var(--pa-font-family-roboto, Roboto, sans-serif);
  font-size: var(--pa-breadcrumbs-font-size, var(--pa-font-size-200, 16px));
  font-weight: var(--pa-font-weight-400, 400);
  transition: color var(--pa-transition-duration-default, 200ms) var(--pa-transition-easing-default, ease);
  cursor: var(--pa-cursor-pointer, pointer);

  &:hover:not(.is-active) {
    text-decoration: underline;
  }

  &.is-active {
    color: var(--pa-breadcrumbs-text-default, var(--pa-color-surface-container-text));
    cursor: var(--pa-cursor-default, default);
  }
}

.pa-breadcrumbs-icon {
  display: flex;
  align-items: center;
  font-size: var(--pa-icon-size-200, 20px);
}

.pa-breadcrumbs-separator {
  color: var(--pa-breadcrumbs-text-separator, var(--pa-color-surface-container-icon));
  font-family: var(--pa-font-family-roboto, Roboto, sans-serif);
  font-size: var(--pa-breadcrumbs-font-size, var(--pa-font-size-200, 16px));
}
</style>

