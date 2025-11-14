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
  <nav class="pa-breadcrumbs" aria-label="Breadcrumb">
    <ol class="pa-breadcrumbs-list" role="list">
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
  gap: var(--pa-breadcrumbs-spacing-item-gap);
}

.pa-breadcrumbs-item {
  display: flex;
  align-items: center;
  gap: var(--pa-breadcrumbs-spacing-item-gap);
}

.pa-breadcrumbs-link {
  display: flex;
  align-items: center;
  gap: var(--pa-breadcrumbs-spacing-link-gap);
  color: var(--pa-breadcrumbs-text-link);
  text-decoration: none;
  font-family: var(--pa-font-family-roboto, Roboto, sans-serif);
  font-size: var(--pa-breadcrumbs-font-size);
  font-weight: var(--pa-breadcrumbs-font-weight);
  transition: color var(--pa-breadcrumbs-transition-duration-default) var(--pa-breadcrumbs-transition-easing-default);
  cursor: var(--pa-cursor-pointer);

  &:hover:not(.is-active) {
    text-decoration: underline;
  }

  &.is-active {
    color: var(--pa-breadcrumbs-text-default);
    cursor: var(--pa-cursor-default);
  }
}

.pa-breadcrumbs-icon {
  display: flex;
  align-items: center;
  font-size: var(--pa-breadcrumbs-icon-size);
}

.pa-breadcrumbs-separator {
  color: var(--pa-breadcrumbs-text-separator);
  font-family: var(--pa-font-family-roboto, Roboto, sans-serif);
  font-size: var(--pa-breadcrumbs-font-size);
}
</style>

