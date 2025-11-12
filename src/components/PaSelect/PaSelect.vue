<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import PaCheckbox from '../PaCheckbox/PaCheckbox.vue'
import PaLoading from '../PaLoading/PaLoading.vue'

interface SelectOption {
  label: string
  value: string | number
  disabled?: boolean
  group?: string
}

const props = defineProps<{
  modelValue?: string | number | Array<string | number>
  options: SelectOption[]
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  error?: boolean
  placeholder?: string
  multiple?: boolean
  clearable?: boolean
  searchable?: boolean
  loading?: boolean
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string | number | Array<string | number> | undefined]
  'change': [value: string | number | Array<string | number> | undefined]
  'search': [query: string]
}>()

const isOpen = ref(false)
const searchQuery = ref('')
const selectRef = ref<HTMLElement>()
const menuRef = ref<HTMLElement>()

const displayValue = computed(() => {
  if (props.multiple) {
    const selected = props.options.filter(opt => 
      Array.isArray(props.modelValue) && props.modelValue.includes(opt.value)
    )
    return selected.length > 0 ? `${selected.length} selected` : props.placeholder || 'Select...'
  }
  const selected = props.options.find(opt => opt.value === props.modelValue)
  return selected ? selected.label : props.placeholder || 'Select...'
})

const filteredOptions = computed(() => {
  if (!props.searchable || !searchQuery.value) {
    return props.options
  }
  const query = searchQuery.value.toLowerCase()
  return props.options.filter(opt => 
    opt.label.toLowerCase().includes(query)
  )
})

const groupedOptions = computed(() => {
  const groups: Record<string, SelectOption[]> = {}
  const ungrouped: SelectOption[] = []
  
  filteredOptions.value.forEach(opt => {
    if (opt.group) {
      if (!groups[opt.group]) {
        groups[opt.group] = []
      }
      groups[opt.group].push(opt)
    } else {
      ungrouped.push(opt)
    }
  })
  
  return { groups, ungrouped }
})

const isSelected = (value: string | number) => {
  if (props.multiple) {
    return Array.isArray(props.modelValue) && props.modelValue.includes(value)
  }
  return props.modelValue === value
}

const selectOption = (option: SelectOption) => {
  if (option.disabled) return
  
  if (props.multiple) {
    const current = Array.isArray(props.modelValue) ? [...props.modelValue] : []
    const index = current.indexOf(option.value)
    if (index > -1) {
      current.splice(index, 1)
    } else {
      current.push(option.value)
    }
    emit('update:modelValue', current)
    emit('change', current)
  } else {
    emit('update:modelValue', option.value)
    emit('change', option.value)
    isOpen.value = false
  }
}

const clearSelection = () => {
  const newValue = props.multiple ? [] : undefined
  emit('update:modelValue', newValue)
  emit('change', newValue)
}

const toggle = () => {
  if (!props.disabled) {
    isOpen.value = !isOpen.value
    if (isOpen.value && props.searchable) {
      searchQuery.value = ''
    }
  }
}

const handleClickOutside = (event: MouseEvent) => {
  if (menuRef.value && !menuRef.value.contains(event.target as Node) &&
      selectRef.value && !selectRef.value.contains(event.target as Node)) {
    isOpen.value = false
  }
}

const handleSearch = (event: Event) => {
  const value = (event.target as HTMLInputElement).value
  searchQuery.value = value
  emit('search', value)
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<template>
  <div
    ref="selectRef"
    :class="[
      'pa-select',
      `pa-select--${size || 'md'}`,
      {
        'is-open': isOpen,
        'is-disabled': disabled,
        'is-error': error,
        'is-multiple': multiple
      }
    ]"
  >
    <div
      class="pa-select-trigger"
      @click="toggle"
    >
      <span
        :class="[
          'pa-select-value',
          {
            'is-placeholder': !modelValue || (multiple && (!Array.isArray(modelValue) || modelValue.length === 0))
          }
        ]"
      >
        {{ displayValue }}
      </span>
      <span class="pa-select-icons">
        <button
          v-if="clearable && modelValue && !disabled"
          class="pa-select-clear"
          @click.stop="clearSelection"
        >
          ×
        </button>
        <span class="pa-select-arrow">
          <svg
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6 9L1 4h10L6 9z"
              fill="currentColor"
            />
          </svg>
        </span>
      </span>
    </div>
    <Transition name="pa-select-menu">
      <div
        v-if="isOpen"
        ref="menuRef"
        class="pa-select-menu"
      >
        <div v-if="searchable" class="pa-select-search">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search..."
            class="pa-select-search-input"
            @input="handleSearch"
          />
        </div>
        <div v-if="loading" class="pa-select-loading">
          <PaLoading size="sm" />
        </div>
        <div v-else class="pa-select-options">
          <template v-if="Object.keys(groupedOptions.groups).length > 0">
            <div
              v-for="(groupOptions, groupName) in groupedOptions.groups"
              :key="groupName"
              class="pa-select-group"
            >
              <div class="pa-select-group-label">{{ groupName }}</div>
              <div
                v-for="option in groupOptions"
                :key="String(option.value)"
                :class="[
                  'pa-select-option',
                  {
                    'is-selected': isSelected(option.value),
                    'is-disabled': option.disabled
                  }
                ]"
                @click="selectOption(option)"
              >
                <span v-if="multiple" class="pa-select-option-checkbox">
                  <PaCheckbox
                    :model-value="isSelected(option.value)"
                    size="sm"
                    :disabled="option.disabled"
                    @update:model-value="selectOption(option)"
                  />
                </span>
                <span class="pa-select-option-label">{{ option.label }}</span>
              </div>
            </div>
          </template>
          <div
            v-for="option in groupedOptions.ungrouped"
            :key="String(option.value)"
            :class="[
              'pa-select-option',
              {
                'is-selected': isSelected(option.value),
                'is-disabled': option.disabled
              }
            ]"
            @click="selectOption(option)"
          >
            <span v-if="multiple" class="pa-select-option-checkbox">
              <PaCheckbox
                :model-value="isSelected(option.value)"
                size="sm"
                :disabled="option.disabled"
                @update:model-value="selectOption(option)"
              />
            </span>
            <span class="pa-select-option-label">{{ option.label }}</span>
          </div>
          <div v-if="filteredOptions.length === 0" class="pa-select-empty">
            No options found
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style lang="scss" scoped>
.pa-select {
  position: relative;
  display: inline-flex;
  flex-direction: column;
  width: 100%;
}

.pa-select-trigger {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  background-color: var(--pa-select-background-default);
  color: var(--pa-select-text-default);
  border: var(--pa-select-border-width-default, var(--pa-Border-width-50, 1px)) solid var(--pa-select-border-default);
  border-radius: var(--pa-select-border-radius-default, var(--pa-Border-radius-100, 8px));
  cursor: var(--pa-cursor-pointer, pointer);
  transition: all var(--pa-select-transition-duration-default, var(--pa-transition-duration-default, 200ms)) var(--pa-select-transition-easing-default, var(--pa-transition-easing-default, ease));
  font-family: var(--pa-font-family-roboto, Roboto, sans-serif);
  font-weight: var(--pa-font-weight-400, 400);

  .pa-select--sm & {
    padding: var(--pa-select-size-sm-padding-y) var(--pa-select-size-sm-padding-x);
    font-size: var(--pa-select-size-sm-font, var(--pa-font-size-100, 14px));
  }

  .pa-select--md & {
    padding: var(--pa-select-size-md-padding-y) var(--pa-select-size-md-padding-x);
    font-size: var(--pa-select-size-md-font, var(--pa-font-size-200, 16px));
  }

  .pa-select--lg & {
    padding: var(--pa-select-size-lg-padding-y) var(--pa-select-size-lg-padding-x);
    font-size: var(--pa-select-size-lg-font, var(--pa-font-size-400, 20px));
  }

  &:hover:not(.is-disabled) {
    background-color: var(--pa-select-background-hover);
    border-color: var(--pa-select-border-hover);
  }

  .pa-select.is-open & {
    background-color: var(--pa-select-background-focus);
    border-color: var(--pa-select-border-focus);
    outline: var(--pa-select-outline-width-default, var(--pa-outline-width-default, 2px)) solid var(--pa-select-border-focus);
    outline-offset: var(--pa-select-outline-offset-default, var(--pa-outline-offset-default, 2px));
  }

  .pa-select.is-error & {
    border-color: var(--pa-select-border-error);
  }

  .pa-select.is-disabled & {
    background-color: var(--pa-select-background-disabled);
    color: var(--pa-select-text-disabled);
    border-color: var(--pa-select-border-disabled);
    cursor: var(--pa-cursor-not-allowed, not-allowed);
    opacity: calc(var(--pa-opacity-60, 60) / 100);
  }
}

.pa-select-value {
  flex: 1;
  text-align: left;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  &.is-placeholder {
    color: var(--pa-select-text-placeholder);
  }
}

.pa-select-icons {
  display: flex;
  align-items: center;
  gap: var(--pa-spacing-8, 8px);
  flex-shrink: 0;
}

.pa-select-clear {
  background: none;
  border: none;
  font-size: var(--pa-font-size-400, 20px);
  line-height: 1;
  cursor: var(--pa-cursor-pointer, pointer);
  color: var(--pa-select-icon-default, var(--pa-color-input-icon-default));
  padding: var(--pa-spacing-4, 4px);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  border-radius: var(--pa-Border-radius-50, 4px);
  transition: background-color var(--pa-transition-duration-default, 200ms) var(--pa-transition-easing-default, ease);

  &:hover {
    background-color: var(--pa-color-surface-cards-hover-background, var(--pa-gray-200, #e9ecef));
  }
}

.pa-select-arrow {
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--pa-select-icon-default, var(--pa-color-input-icon-default));
  width: 20px;
  height: 20px;
  transition: transform var(--pa-select-transition-duration-default, var(--pa-transition-duration-default, 200ms)) var(--pa-select-transition-easing-default, var(--pa-transition-easing-default, ease));

  .pa-select.is-open & {
    transform: rotate(180deg);
  }

  svg {
    width: 12px;
    height: 12px;
  }
}

.pa-select-menu {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  margin-top: var(--pa-spacing-4, 4px);
  background-color: var(--pa-select-menu-background, var(--pa-color-surface-container-background));
  border: 1px solid var(--pa-select-menu-border, var(--pa-color-surface-container-border));
  border-radius: var(--pa-select-border-radius-default, var(--pa-Border-radius-100, 8px));
  box-shadow: var(--pa-select-menu-shadow, var(--pa-shadow-md));
  z-index: var(--pa-select-menu-z-index, var(--pa-z-index-400, 400));
  max-height: 300px;
  overflow-y: auto;
}

.pa-select-search {
  padding: var(--pa-spacing-8, 8px);
  border-bottom: 1px solid var(--pa-color-surface-base-divider, var(--pa-gray-200, #e9ecef));
}

.pa-select-search-input {
  width: 100%;
  padding: var(--pa-spacing-8, 8px);
  border: 1px solid var(--pa-select-border-default);
  border-radius: var(--pa-Border-radius-50, 4px);
  font-family: var(--pa-font-family-roboto, Roboto, sans-serif);
  font-size: var(--pa-font-size-200, 16px);
}

.pa-select-loading {
  padding: var(--pa-spacing-16, 16px);
  display: flex;
  align-items: center;
  justify-content: center;
}

.pa-select-options {
  padding: var(--pa-spacing-4, 4px);
}

.pa-select-group {
  margin-bottom: var(--pa-spacing-8, 8px);
}

.pa-select-group-label {
  padding: var(--pa-spacing-8, 8px) var(--pa-spacing-12, 12px);
  font-family: var(--pa-font-family-roboto, Roboto, sans-serif);
  font-size: var(--pa-font-size-100, 14px);
  font-weight: var(--pa-font-weight-600, 600);
  color: var(--pa-gray-500, #adb5bd);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.pa-select-option {
  display: flex;
  align-items: center;
  gap: var(--pa-spacing-8, 8px);
  padding: var(--pa-spacing-8, 8px) var(--pa-spacing-12, 12px);
  background-color: var(--pa-select-option-background-default, transparent);
  color: var(--pa-select-option-text-default, var(--pa-color-surface-container-text));
  cursor: var(--pa-cursor-pointer, pointer);
  border-radius: var(--pa-Border-radius-50, 4px);
  transition: all var(--pa-select-transition-duration-default, var(--pa-transition-duration-default, 200ms)) var(--pa-select-transition-easing-default, var(--pa-transition-easing-default, ease));
  font-family: var(--pa-font-family-roboto, Roboto, sans-serif);
  font-size: var(--pa-font-size-200, 16px);
  font-weight: var(--pa-font-weight-400, 400);

  &:hover:not(.is-disabled) {
    background-color: var(--pa-select-option-background-hover, var(--pa-color-surface-cards-hover-background));
  }

  &.is-selected {
    background-color: var(--pa-select-option-background-selected, var(--pa-color-surface-cards-active-background));
    color: var(--pa-select-option-text-selected, var(--pa-color-action-primary-text-default));
  }

  &.is-disabled {
    opacity: calc(var(--pa-opacity-60, 60) / 100);
    cursor: var(--pa-cursor-not-allowed, not-allowed);
    pointer-events: none;
  }
}

.pa-select-option-checkbox {
  flex-shrink: 0;
}

.pa-select-option-label {
  flex: 1;
}

.pa-select-empty {
  padding: var(--pa-spacing-16, 16px);
  text-align: center;
  color: var(--pa-gray-500, #adb5bd);
  font-family: var(--pa-font-family-roboto, Roboto, sans-serif);
  font-size: var(--pa-font-size-200, 16px);
}

.pa-select-menu-enter-active,
.pa-select-menu-leave-active {
  transition: opacity var(--pa-transition-duration-fast, 100ms) var(--pa-transition-easing-default, ease),
    transform var(--pa-transition-duration-fast, 100ms) var(--pa-transition-easing-default, ease);
}

.pa-select-menu-enter-from,
.pa-select-menu-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}
</style>

