<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import type { Component } from 'vue'
import { PaSwitch } from '../PaSwitch'
import { PaSquare } from '../PaSquare'
import { PaIcon } from '../PaIcon'

interface Props {
  icon?: string | Component
  title: string
  description?: string
  modelValue?: boolean
  enabled?: boolean
  defaultOpen?: boolean
  defaultEnabled?: boolean
  showToggle?: boolean
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  showToggle: true,
  defaultOpen: false,
  defaultEnabled: false
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  'update:enabled': [value: boolean]
  'toggle': [value: boolean]
  'enable-toggle': [value: boolean]
}>()

const isOpen = ref(props.modelValue !== undefined ? props.modelValue : (props.showToggle ? props.defaultOpen : true))
const isEnabled = ref(props.enabled !== undefined ? props.enabled : props.defaultEnabled)

watch(() => props.modelValue, (newVal) => {
  if (newVal !== undefined) {
    isOpen.value = newVal
  }
})

watch(() => props.enabled, (newVal) => {
  if (newVal !== undefined) {
    isEnabled.value = newVal
  }
})

const toggleOpen = () => {
  if (props.disabled || !isEnabled.value) return
  isOpen.value = !isOpen.value
  emit('update:modelValue', isOpen.value)
  emit('toggle', isOpen.value)
}

const toggleEnabled = (value: boolean) => {
  if (props.disabled) return
  isEnabled.value = value
  emit('update:enabled', value)
  emit('enable-toggle', value)
  
  if (!value && isOpen.value) {
    isOpen.value = false
    emit('update:modelValue', false)
    emit('toggle', false)
  }
}

const sectionId = computed(() => `pa-settings-section-${Math.random().toString(36).substr(2, 9)}`)
</script>

<template>
  <div
    :class="[
      'pa-settings-section',
      {
        'is-open': isOpen,
        'is-disabled': disabled || !isEnabled,
        'has-toggle': showToggle
      }
    ]"
  >
    <div class="pa-settings-section-header">
      <div class="pa-settings-section-header-left">
        <PaSquare 
          v-if="icon || $slots.icon"
          class="pa-settings-section-icon"
          :size="44"
        >
          <slot name="icon">
            <PaIcon v-if="typeof icon === 'string'">
              <img :src="icon" :alt="title" />
            </PaIcon>
            <PaIcon v-else-if="typeof icon !== 'string'">
              <component :is="icon" />
            </PaIcon>
          </slot>
        </PaSquare>
        <h3 class="pa-settings-section-title">{{ title }}</h3>
      </div>
      <div class="pa-settings-section-header-right">
        <PaSwitch
          v-if="showToggle"
          :model-value="isEnabled"
          :disabled="disabled"
          class="pa-settings-section-toggle"
          @update:model-value="toggleEnabled"
        />
        <button
          v-if="showToggle && isEnabled"
          class="pa-settings-section-chevron"
          :aria-expanded="isOpen"
          :aria-controls="`${sectionId}-content`"
          :disabled="disabled || !isEnabled"
          @click="toggleOpen"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6 9L12 15L18 9"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>

    <Transition name="pa-settings-section-content">
      <div
        v-if="isOpen"
        :id="`${sectionId}-content`"
        class="pa-settings-section-content"
        role="region"
      >
        <div v-if="description || $slots.description" class="pa-settings-section-description">
          <slot name="description">
            {{ description }}
          </slot>
        </div>
        <div class="pa-settings-section-body">
          <slot />
        </div>
      </div>
    </Transition>
  </div>
</template>

<style lang="scss" scoped>
.pa-settings-section {
  background-color: var(--pa-settings-section-background);
  border: var(--pa-settings-section-border-width) solid var(--pa-settings-section-border);
  border-radius: var(--pa-settings-section-radius);
  padding: var(--pa-settings-section-padding-y) var(--pa-settings-section-padding-x);
  transition: all var(--pa-settings-section-transition-duration-default) var(--pa-settings-section-transition-easing-default);

  &.is-disabled {
    opacity: calc(var(--pa-opacity-60) / 100);
    
    .pa-settings-section-chevron {
      pointer-events: none;
      cursor: var(--pa-cursor-not-allowed);
    }
  }
}

.pa-settings-section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--pa-settings-section-header-gap);
  padding: 0;
}

.pa-settings-section-header-left {
  display: flex;
  align-items: center;
  gap: var(--pa-settings-section-icon-gap);
  flex: 1;
  min-width: 0;
}

.pa-settings-section-icon {
  flex-shrink: 0;
  background-color: var(--pa-settings-section-icon-background) !important;
  border: var(--pa-settings-section-icon-border-width) solid var(--pa-settings-section-icon-border-color) !important;
  border-radius: var(--pa-settings-section-icon-radius) !important;
  padding: var(--pa-settings-section-icon-padding) !important;

  :deep(.pa-icon) {
    width: var(--pa-settings-section-icon-inner-size);
    height: var(--pa-settings-section-icon-inner-size);
    color: var(--pa-settings-section-icon-color);
  }

  :deep(.pa-icon img) {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  :deep(.pa-icon svg) {
    width: 100%;
    height: 100%;
    color: var(--pa-settings-section-icon-color);
  }
}

.pa-settings-section-title {
  font-family: var(--pa-font-family-roboto);
  font-size: var(--pa-settings-section-title-font-size);
  font-weight: var(--pa-settings-section-title-font-weight);
  line-height: normal;
  color: var(--pa-settings-section-title-color);
  text-transform: uppercase;
  margin: 0;
  white-space: nowrap;
  font-variation-settings: 'wdth' 100;
}

.pa-settings-section-header-right {
  display: flex;
  align-items: center;
  gap: var(--pa-settings-section-header-right-gap);
  flex-shrink: 0;
  padding-right: var(--pa-settings-section-header-right-padding-right);
}

.pa-settings-section-toggle {
  flex-shrink: 0;
}

.pa-settings-section-chevron {
  width: var(--pa-settings-section-chevron-size);
  height: var(--pa-settings-section-chevron-size);
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  cursor: var(--pa-cursor-pointer);
  color: var(--pa-settings-section-chevron-color);
  padding: 0;
  transition: transform var(--pa-settings-section-transition-duration-default) var(--pa-settings-section-transition-easing-default);
  transform: rotate(90deg);

  &:disabled {
    cursor: var(--pa-cursor-not-allowed);
    opacity: calc(var(--pa-opacity-60) / 100);
  }

  svg {
    width: 100%;
    height: 100%;
  }

  .pa-settings-section.is-open & {
    transform: rotate(270deg);
  }
}

.pa-settings-section-content {
  margin-top: var(--pa-settings-section-content-gap);
  overflow: hidden;
}

.pa-settings-section-description {
  margin-bottom: var(--pa-settings-section-description-gap);
  padding: 0 var(--pa-settings-section-description-padding-x);
  text-align: center;
  font-family: var(--pa-font-family-roboto);
  font-size: var(--pa-settings-section-description-font-size);
  font-weight: var(--pa-settings-section-description-font-weight);
  line-height: normal;
  color: var(--pa-settings-section-description-color);
  font-variation-settings: 'wdth' 100;
}

.pa-settings-section-body {
  padding: 0 var(--pa-settings-section-body-padding-x);
  padding-bottom: var(--pa-settings-section-body-padding-bottom);
}

.pa-settings-section-content-enter-active,
.pa-settings-section-content-leave-active {
  transition: max-height var(--pa-settings-section-transition-duration-default) var(--pa-settings-section-transition-easing-default),
    opacity var(--pa-settings-section-transition-duration-default) var(--pa-settings-section-transition-easing-default),
    margin-top var(--pa-settings-section-transition-duration-default) var(--pa-settings-section-transition-easing-default);
}

.pa-settings-section-content-enter-from,
.pa-settings-section-content-leave-to {
  max-height: 0;
  opacity: 0;
  margin-top: 0;
}

.pa-settings-section-content-enter-to,
.pa-settings-section-content-leave-from {
  max-height: 1000px;
  opacity: 1;
  margin-top: var(--pa-settings-section-content-gap);
}
</style>


