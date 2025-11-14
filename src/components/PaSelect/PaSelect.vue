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
      role="combobox"
      :aria-expanded="isOpen"
      :aria-haspopup="true"
      :aria-invalid="error"
      :aria-disabled="disabled"
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
        <span class="pa-select-arrow" aria-hidden="true">
          <svg
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
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
  border: var(--pa-select-border-width-default) solid var(--pa-select-border-default);
  border-radius: var(--pa-select-border-radius-default);
  cursor: var(--pa-cursor-pointer);
  transition: all var(--pa-select-transition-duration-default) var(--pa-select-transition-easing-default);
  font-family: var(--pa-font-family-roboto, Roboto, sans-serif);
  font-weight: var(--pa-font-weight-regular);

  .pa-select--sm & {
    padding: var(--pa-select-size-sm-padding-y) var(--pa-select-size-sm-padding-x);
    font-size: var(--pa-select-size-sm-font);
  }

  .pa-select--md & {
    padding: var(--pa-select-size-md-padding-y) var(--pa-select-size-md-padding-x);
    font-size: var(--pa-select-size-md-font);
  }

  .pa-select--lg & {
    padding: var(--pa-select-size-lg-padding-y) var(--pa-select-size-lg-padding-x);
    font-size: var(--pa-select-size-lg-font);
  }

  &:hover:not(.is-disabled) {
    background-color: var(--pa-select-background-hover);
    border-color: var(--pa-select-border-hover);
  }

  .pa-select.is-open & {
    background-color: var(--pa-select-background-focus);
    border-color: var(--pa-select-border-focus);
    outline: var(--pa-select-outline-width-default) solid var(--pa-select-border-focus);
    outline-offset: var(--pa-select-outline-offset-default);
  }

  .pa-select.is-error & {
    border-color: var(--pa-select-border-error);
  }

  .pa-select.is-disabled & {
    background-color: var(--pa-select-background-disabled);
    color: var(--pa-select-text-disabled);
    border-color: var(--pa-select-border-disabled);
    cursor: var(--pa-cursor-not-allowed);
    opacity: calc(var(--pa-opacity-60) / 100);
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
  gap: var(--pa-select-icons-gap);
  flex-shrink: 0;
}

.pa-select-clear {
  background: none;
  border: none;
  font-size: var(--pa-select-icon-size);
  line-height: 1;
  cursor: var(--pa-cursor-pointer);
  color: var(--pa-select-icon-default);
  padding: var(--pa-select-clear-padding);
  display: flex;
  align-items: center;
  justify-content: center;
  width: var(--pa-select-icon-size);
  height: var(--pa-select-icon-size);
  border-radius: var(--pa-select-clear-radius);
  transition: background-color var(--pa-transition-duration-default) var(--pa-transition-easing-default);

  &:hover {
    background-color: var(--pa-select-clear-background-hover);
  }
}

.pa-select-arrow {
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--pa-select-icon-default);
  width: var(--pa-select-icon-size);
  height: var(--pa-select-icon-size);
  transition: transform var(--pa-select-transition-duration-default) var(--pa-select-transition-easing-default);

  .pa-select.is-open & {
    transform: rotate(180deg);
  }

  svg {
    width: var(--pa-select-icon-size);
    height: var(--pa-select-icon-size);
  }
}

.pa-select-menu {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  margin-top: var(--pa-select-menu-spacing-top);
  background-color: var(--pa-select-menu-background);
  border: var(--pa-select-border-width-default) solid var(--pa-select-menu-border);
  border-radius: var(--pa-select-border-radius-default);
  box-shadow: var(--pa-select-menu-shadow);
  z-index: var(--pa-select-menu-z-index);
  max-height: var(--pa-select-menu-max-height);
  overflow-y: auto;
}

.pa-select-search {
  padding: var(--pa-select-search-padding);
  border-bottom: var(--pa-select-border-width-default) solid var(--pa-color-surface-base-divider);
}

.pa-select-search-input {
  width: 100%;
  padding: var(--pa-select-search-input-padding);
  border: var(--pa-select-border-width-default) solid var(--pa-select-border-default);
  border-radius: var(--pa-select-search-input-radius);
  font-family: var(--pa-font-family-roboto, Roboto, sans-serif);
  font-size: var(--pa-select-search-input-font-size);
}

.pa-select-loading {
  padding: var(--pa-select-loading-padding);
  display: flex;
  align-items: center;
  justify-content: center;
}

.pa-select-options {
  padding: var(--pa-select-menu-options-padding);
}

.pa-select-group {
  margin-bottom: var(--pa-select-group-spacing-bottom);
}

.pa-select-group-label {
  padding: var(--pa-select-group-label-padding-y) var(--pa-select-group-label-padding-x);
  font-family: var(--pa-font-family-roboto, Roboto, sans-serif);
  font-size: var(--pa-select-group-label-font-size);
  font-weight: var(--pa-select-group-label-font-weight);
  color: var(--pa-select-group-label-color);
  text-transform: uppercase;
  letter-spacing: var(--pa-letter-spacing-300);
}

.pa-select-option {
  display: flex;
  align-items: center;
  gap: var(--pa-select-option-gap);
  padding: var(--pa-select-option-padding-y) var(--pa-select-option-padding-x);
  background-color: var(--pa-select-option-background-default);
  color: var(--pa-select-option-text-default);
  cursor: var(--pa-cursor-pointer);
  border-radius: var(--pa-select-option-radius);
  transition: all var(--pa-select-transition-duration-default) var(--pa-select-transition-easing-default);
  font-family: var(--pa-font-family-roboto, Roboto, sans-serif);
  font-size: var(--pa-select-option-font-size);
  font-weight: var(--pa-select-option-font-weight);

  &:hover:not(.is-disabled) {
    background-color: var(--pa-select-option-background-hover);
  }

  &.is-selected {
    background-color: var(--pa-select-option-background-selected);
    color: var(--pa-select-option-text-selected);
  }

  &.is-disabled {
    opacity: calc(var(--pa-opacity-60) / 100);
    cursor: var(--pa-cursor-not-allowed);
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
  padding: var(--pa-select-empty-padding);
  text-align: center;
  color: var(--pa-select-empty-color);
  font-family: var(--pa-font-family-roboto, Roboto, sans-serif);
  font-size: var(--pa-select-empty-font-size);
}

.pa-select-menu-enter-active,
.pa-select-menu-leave-active {
  transition: opacity var(--pa-transition-duration-fast) var(--pa-transition-easing-default),
    transform var(--pa-transition-duration-fast) var(--pa-transition-easing-default);
}

.pa-select-menu-enter-from,
.pa-select-menu-leave-to {
  opacity: 0;
  transform: translateY(calc(var(--pa-select-menu-spacing-top) * -1));
}
</style>

