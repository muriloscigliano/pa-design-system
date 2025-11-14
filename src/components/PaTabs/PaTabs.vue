<script setup lang="ts">
import { computed, provide } from 'vue'
import PaBadge from '../PaBadge/PaBadge.vue'

interface Tab {
  label: string
  value: string | number
  disabled?: boolean
  icon?: string
  badge?: string | number
  lazy?: boolean
}

const props = defineProps<{
  modelValue: string | number
  tabs?: Tab[]
  type?: 'line' | 'card'
  position?: 'top' | 'bottom' | 'left' | 'right'
  closable?: boolean
  addable?: boolean
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string | number]
  'change': [value: string | number]
  'tab-click': [tab: Tab, event: MouseEvent]
  'tab-close': [tab: Tab]
  'tab-add': []
}>()

const activeTab = computed(() => props.modelValue)

const selectTab = (tab: Tab, event: MouseEvent) => {
  if (!tab.disabled) {
    emit('update:modelValue', tab.value)
    emit('change', tab.value)
    emit('tab-click', tab, event)
  }
}

const closeTab = (tab: Tab, event: MouseEvent) => {
  event.stopPropagation()
  emit('tab-close', tab)
}

provide('activeTab', activeTab)
provide('selectTab', selectTab)
provide('closeTab', closeTab)
</script>

<template>
  <div
    :class="[
      'pa-tabs',
      `pa-tabs--${type || 'line'}`,
      `pa-tabs--${position || 'top'}`
    ]"
  >
    <div class="pa-tabs-header">
      <div
        :class="[
          'pa-tabs-nav',
          {
            'is-scrollable': tabs && tabs.length > 5
          }
        ]"
      >
        <div
          v-for="tab in tabs"
          :key="String(tab.value)"
          :class="[
            'pa-tabs-tab',
            {
              'is-active': activeTab === tab.value,
              'is-disabled': tab.disabled
            }
          ]"
          role="tab"
          :aria-selected="activeTab === tab.value"
          :aria-disabled="tab.disabled"
          :tabindex="tab.disabled ? -1 : (activeTab === tab.value ? 0 : -1)"
          @click="selectTab(tab, $event)"
        >
          <span v-if="tab.icon" class="pa-tabs-tab-icon">{{ tab.icon }}</span>
          <span class="pa-tabs-tab-label">{{ tab.label }}</span>
          <PaBadge
            v-if="tab.badge"
            :variant="activeTab === tab.value ? 'default' : 'default'"
            size="sm"
            class="pa-tabs-tab-badge"
          >
            {{ tab.badge }}
          </PaBadge>
          <button
            v-if="closable"
            class="pa-tabs-tab-close"
            @click="closeTab(tab, $event)"
          >
            ×
          </button>
        </div>
        <div
          v-if="addable"
          class="pa-tabs-tab pa-tabs-tab-add"
          @click="emit('tab-add')"
        >
          +
        </div>
      </div>
    </div>
    <div class="pa-tabs-content" role="tabpanel">
      <slot />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.pa-tabs {
  display: flex;
  flex-direction: column;
  width: 100%;

  &--top {
    flex-direction: column;
  }

  &--bottom {
    flex-direction: column-reverse;
  }

  &--left {
    flex-direction: row;

    .pa-tabs-header {
      border-right: var(--pa-tabs-border-width-default) solid var(--pa-tabs-border-default);
      border-bottom: none;
    }
  }

  &--right {
    flex-direction: row-reverse;

    .pa-tabs-header {
      border-left: var(--pa-tabs-border-width-default) solid var(--pa-tabs-border-default);
      border-bottom: none;
    }
  }
}

.pa-tabs-header {
  border-bottom: var(--pa-tabs-border-width-default) solid var(--pa-tabs-border-default);
}

.pa-tabs-nav {
  display: flex;
  overflow-x: auto;
  overflow-y: hidden;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }

  &.is-scrollable {
    position: relative;
  }
}

.pa-tabs-tab {
  position: relative;
  display: flex;
  align-items: center;
  gap: var(--pa-tabs-tab-spacing-icon-text);
  padding: var(--pa-tabs-tab-padding-y) var(--pa-tabs-tab-padding-x);
  background-color: var(--pa-tabs-tab-background-default);
  color: var(--pa-tabs-tab-text-default);
  border: none;
  border-bottom: var(--pa-tabs-tab-indicator-width) solid transparent;
  cursor: var(--pa-cursor-pointer);
  transition: all var(--pa-tabs-transition-duration-default) var(--pa-tabs-transition-easing-default);
  font-family: var(--pa-font-family-roboto, Roboto, sans-serif);
  font-size: var(--pa-tabs-tab-font-size);
  font-weight: var(--pa-tabs-tab-font-weight-default);
  white-space: nowrap;
  flex-shrink: 0;

  &:hover:not(.is-disabled) {
    background-color: var(--pa-tabs-tab-background-hover);
  }

  &.is-active {
    color: var(--pa-tabs-tab-text-active);
    font-weight: var(--pa-tabs-tab-font-weight-active);
    border-bottom-color: var(--pa-tabs-tab-indicator);
  }

  &.is-disabled {
    color: var(--pa-tabs-tab-text-disabled);
    cursor: var(--pa-cursor-not-allowed);
    opacity: calc(var(--pa-opacity-60, 60) / 100);
  }
}

.pa-tabs-tab-icon {
  display: flex;
  align-items: center;
  font-size: var(--pa-icon-size-200, 20px);
}

.pa-tabs-tab-label {
  flex: 1;
}

.pa-tabs-tab-badge {
  flex-shrink: 0;
}

.pa-tabs-tab-close {
  margin-left: var(--pa-spacing-4, 4px);
  padding: var(--pa-spacing-2, 2px);
  background: none;
  border: none;
  font-size: var(--pa-font-size-400, 20px);
  line-height: 1;
  cursor: var(--pa-cursor-pointer, pointer);
  color: inherit;
  opacity: 0.6;
  transition: opacity var(--pa-transition-duration-default, 200ms) var(--pa-transition-easing-default, ease);

  &:hover {
    opacity: 1;
  }
}

.pa-tabs-tab-add {
  min-width: var(--pa-spacing-100, var(--pa-spacing-10, 10px));
  justify-content: center;
  font-size: var(--pa-font-size-500, 24px);
  font-weight: var(--pa-font-weight-400, 400);
}

.pa-tabs-content {
  padding: var(--pa-tabs-content-padding, var(--pa-spacing-16, 16px));
}
</style>

