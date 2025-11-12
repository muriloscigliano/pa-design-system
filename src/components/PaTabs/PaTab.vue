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

const isActive = computed(() => activeTab?.value === props.value)
const isLazyLoaded = ref(false)

watch(isActive, (active) => {
  if (active && props.lazy && !isLazyLoaded.value) {
    isLazyLoaded.value = true
  }
})

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

