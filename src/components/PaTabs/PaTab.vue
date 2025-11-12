<script setup lang="ts">
import { inject, computed, ref, watch } from 'vue'

const props = defineProps<{
  label: string
  value: string | number
  disabled?: boolean
  icon?: string
  badge?: string | number
  lazy?: boolean
}>()

const activeTab = inject<ReturnType<typeof computed>>('activeTab')
const selectTab = inject<(tab: any, event: MouseEvent) => void>('selectTab')
const closeTab = inject<(tab: any, event: MouseEvent) => void>('closeTab')

const isActive = computed(() => activeTab?.value === props.value)
const isLazyLoaded = ref(false)

watch(isActive, (active) => {
  if (active && props.lazy && !isLazyLoaded.value) {
    isLazyLoaded.value = true
  }
})

const handleClick = (event: MouseEvent) => {
  if (selectTab) {
    selectTab({ label: props.label, value: props.value, disabled: props.disabled }, event)
  }
}

const handleClose = (event: MouseEvent) => {
  if (closeTab) {
    closeTab({ label: props.label, value: props.value, disabled: props.disabled }, event)
  }
}
</script>

<template>
  <div
    v-if="!lazy || isLazyLoaded || isActive"
    :class="[
      'pa-tab-pane',
      {
        'is-active': isActive
      }
    ]"
  >
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.pa-tab-pane {
  display: none;

  &.is-active {
    display: block;
  }
}
</style>

