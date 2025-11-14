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
  gap: var(--pa-pagination-gap);
}

.pa-pagination-controls {
  display: flex;
  align-items: center;
  gap: var(--pa-pagination-gap);
}

.pa-pagination-item {
  padding: var(--pa-pagination-item-padding-y) var(--pa-pagination-item-padding-x);
  background-color: var(--pa-pagination-item-background-default);
  color: var(--pa-pagination-item-text-default);
  border: var(--pa-pagination-item-border-width) solid var(--pa-pagination-item-border);
  border-radius: var(--pa-pagination-item-radius);
  font-family: var(--pa-font-family-roboto, Roboto, sans-serif);
  font-size: var(--pa-pagination-item-font-size);
  font-weight: var(--pa-pagination-item-font-weight);
  cursor: var(--pa-cursor-pointer);
  transition: all var(--pa-transition-duration-default) var(--pa-transition-easing-default);
  min-width: var(--pa-pagination-item-size-min-width);
  height: var(--pa-pagination-item-size-height);
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover:not(:disabled) {
    background-color: var(--pa-pagination-item-background-hover);
  }

  &.is-active {
    background-color: var(--pa-pagination-item-background-active);
    color: var(--pa-pagination-item-text-active);
    border-color: var(--pa-pagination-item-background-active);
  }

  &:disabled {
    opacity: calc(var(--pa-opacity-60) / 100);
    cursor: var(--pa-cursor-not-allowed);
  }
}

.pa-pagination-ellipsis {
  padding: var(--pa-pagination-item-padding-y) var(--pa-pagination-item-padding-x);
  color: var(--pa-pagination-item-text-default);
  min-width: var(--pa-pagination-item-size-min-width);
  height: var(--pa-pagination-item-size-height);
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>

