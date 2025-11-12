<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  modelValue: number
  total: number
  pageSize?: number
  showSizeSelector?: boolean
}>()

const emit = defineEmits<{
  'update:modelValue': [value: number]
  'change': [value: number]
}>()

const currentPage = computed({
  get: () => props.modelValue,
  set: (value) => {
    emit('update:modelValue', value)
    emit('change', value)
  }
})

const pageSize = computed(() => props.pageSize || 10)
const totalPages = computed(() => Math.ceil(props.total / pageSize.value))

const goToPage = (page: number) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
  }
}

const pages = computed(() => {
  const pages: (number | string)[] = []
  const current = currentPage.value
  const total = totalPages.value

  if (total <= 7) {
    for (let i = 1; i <= total; i++) {
      pages.push(i)
    }
  } else {
    if (current <= 4) {
      for (let i = 1; i <= 5; i++) {
        pages.push(i)
      }
      pages.push('...')
      pages.push(total)
    } else if (current >= total - 3) {
      pages.push(1)
      pages.push('...')
      for (let i = total - 4; i <= total; i++) {
        pages.push(i)
      }
    } else {
      pages.push(1)
      pages.push('...')
      for (let i = current - 1; i <= current + 1; i++) {
        pages.push(i)
      }
      pages.push('...')
      pages.push(total)
    }
  }

  return pages
})
</script>

<template>
  <nav class="pa-pagination" aria-label="Pagination">
    <div class="pa-pagination-controls">
      <button
        class="pa-pagination-item"
        :disabled="currentPage === 1"
        @click="goToPage(currentPage - 1)"
      >
        Previous
      </button>

      <template v-for="(page, index) in pages" :key="index">
        <button
          v-if="typeof page === 'number'"
          :class="[
            'pa-pagination-item',
            {
              'is-active': page === currentPage
            }
          ]"
          @click="goToPage(page)"
        >
          {{ page }}
        </button>
        <span v-else class="pa-pagination-ellipsis">{{ page }}</span>
      </template>

      <button
        class="pa-pagination-item"
        :disabled="currentPage === totalPages"
        @click="goToPage(currentPage + 1)"
      >
        Next
      </button>
    </div>
  </nav>
</template>

<style lang="scss" scoped>
.pa-pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--pa-spacing-4, 4px);
}

.pa-pagination-controls {
  display: flex;
  align-items: center;
  gap: var(--pa-spacing-4, 4px);
}

.pa-pagination-item {
  padding: var(--pa-pagination-item-padding-y) var(--pa-pagination-item-padding-x);
  background-color: var(--pa-pagination-item-background-default, var(--pa-color-surface-base-background));
  color: var(--pa-pagination-item-text-default, var(--pa-color-surface-base-text));
  border: 1px solid var(--pa-pagination-item-border, var(--pa-color-surface-container-border));
  border-radius: var(--pa-pagination-item-radius, var(--pa-Border-radius-100, 8px));
  font-family: var(--pa-font-family-roboto, Roboto, sans-serif);
  font-size: var(--pa-font-size-200, 16px);
  font-weight: var(--pa-font-weight-400, 400);
  cursor: var(--pa-cursor-pointer, pointer);
  transition: all var(--pa-transition-duration-default, 200ms) var(--pa-transition-easing-default, ease);
  min-width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover:not(:disabled) {
    background-color: var(--pa-pagination-item-background-hover, var(--pa-color-surface-cards-hover-background));
  }

  &.is-active {
    background-color: var(--pa-pagination-item-background-active, var(--pa-color-action-primary-background-default));
    color: var(--pa-pagination-item-text-active, var(--pa-color-action-primary-text-default));
    border-color: var(--pa-pagination-item-background-active, var(--pa-color-action-primary-background-default));
  }

  &:disabled {
    opacity: calc(var(--pa-opacity-60, 60) / 100);
    cursor: var(--pa-cursor-not-allowed, not-allowed);
  }
}

.pa-pagination-ellipsis {
  padding: var(--pa-pagination-item-padding-y) var(--pa-pagination-item-padding-x);
  color: var(--pa-pagination-item-text-default, var(--pa-color-surface-base-text));
  min-width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>

