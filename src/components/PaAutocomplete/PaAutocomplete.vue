<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import PaLoading from '../PaLoading/PaLoading.vue'

interface AutocompleteOption {
  label: string
  value: string | number
  disabled?: boolean
}

const props = defineProps<{
  modelValue?: string | number
  options: AutocompleteOption[]
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  error?: boolean
  placeholder?: string
  loading?: boolean
  filterMethod?: (query: string, options: AutocompleteOption[]) => AutocompleteOption[]
  debounce?: number
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string | number]
  'change': [value: string | number]
  'select': [option: AutocompleteOption]
  'search': [query: string]
  'focus': [event: FocusEvent]
  'blur': [event: FocusEvent]
}>()

const inputRef = ref<HTMLInputElement>()
const menuRef = ref<HTMLElement>()
const isOpen = ref(false)
const query = ref('')
const selectedIndex = ref(-1)
const debounceTimer = ref<number>()

const displayValue = computed(() => {
  if (props.modelValue === undefined || props.modelValue === null || props.modelValue === '') {
    return query.value
  }
  const option = props.options.find(opt => opt.value === props.modelValue)
  return option ? option.label : String(props.modelValue)
})

const filteredOptions = computed(() => {
  if (!query.value) {
    return props.options.slice(0, 10)
  }
  
  if (props.filterMethod) {
    return props.filterMethod(query.value, props.options)
  }
  
  const lowerQuery = query.value.toLowerCase()
  return props.options.filter(opt => 
    opt.label.toLowerCase().includes(lowerQuery) && !opt.disabled
  ).slice(0, 10)
})

const handleInput = (event: Event) => {
  const value = (event.target as HTMLInputElement).value
  query.value = value
  emit('update:modelValue', value)
  emit('change', value)
  
  if (props.debounce) {
    clearTimeout(debounceTimer.value)
    debounceTimer.value = window.setTimeout(() => {
      emit('search', value)
    }, props.debounce)
  } else {
    emit('search', value)
  }
  
  if (value && filteredOptions.value.length > 0) {
    isOpen.value = true
  } else {
    isOpen.value = false
  }
  selectedIndex.value = -1
}

const handleFocus = (event: FocusEvent) => {
  if (filteredOptions.value.length > 0) {
    isOpen.value = true
  }
  emit('focus', event)
}

const handleBlur = (event: FocusEvent) => {
  setTimeout(() => {
    if (!menuRef.value?.contains(document.activeElement)) {
      isOpen.value = false
      emit('blur', event)
    }
  }, 200)
}

const selectOption = (option: AutocompleteOption) => {
  if (option.disabled) return
  
  query.value = option.label
  emit('update:modelValue', option.value)
  emit('change', option.value)
  emit('select', option)
  isOpen.value = false
  inputRef.value?.blur()
}

const handleKeydown = (event: KeyboardEvent) => {
  if (!isOpen.value || filteredOptions.value.length === 0) return
  
  switch (event.key) {
    case 'ArrowDown':
      event.preventDefault()
      selectedIndex.value = Math.min(selectedIndex.value + 1, filteredOptions.value.length - 1)
      break
    case 'ArrowUp':
      event.preventDefault()
      selectedIndex.value = Math.max(selectedIndex.value - 1, -1)
      break
    case 'Enter':
      if (selectedIndex.value >= 0 && selectedIndex.value < filteredOptions.value.length) {
        event.preventDefault()
        selectOption(filteredOptions.value[selectedIndex.value])
      }
      break
    case 'Escape':
      isOpen.value = false
      selectedIndex.value = -1
      break
  }
}

const handleClickOutside = (event: MouseEvent) => {
  if (menuRef.value && !menuRef.value.contains(event.target as Node) &&
      inputRef.value && !inputRef.value.contains(event.target as Node)) {
    isOpen.value = false
  }
}

watch(() => props.modelValue, (newValue) => {
  if (newValue === undefined || newValue === null || newValue === '') {
    query.value = ''
  } else {
    const option = props.options.find(opt => opt.value === newValue)
    if (option) {
      query.value = option.label
    }
  }
})

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
  if (debounceTimer.value) {
    clearTimeout(debounceTimer.value)
  }
})
</script>

<template>
  <div
    :class="[
      'pa-autocomplete',
      `pa-autocomplete--${size || 'md'}`,
      {
        'is-open': isOpen,
        'is-disabled': disabled,
        'is-error': error
      }
    ]"
  >
    <div class="pa-autocomplete-input-wrapper">
      <input
        ref="inputRef"
        :class="[
          'pa-autocomplete-input',
          `pa-autocomplete-input--${size || 'md'}`,
          {
            'is-disabled': disabled,
            'is-error': error
          }
        ]"
        :value="displayValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :aria-invalid="error"
        :aria-expanded="isOpen"
        :aria-haspopup="true"
        :aria-autocomplete="'list'"
        role="combobox"
        @input="handleInput"
        @focus="handleFocus"
        @blur="handleBlur"
        @keydown="handleKeydown"
      />
      <div v-if="loading" class="pa-autocomplete-loading">
        <PaLoading size="sm" />
      </div>
    </div>
    <Transition name="pa-autocomplete-menu">
      <div
        v-if="isOpen && (filteredOptions.length > 0 || loading)"
        ref="menuRef"
        class="pa-autocomplete-menu"
      >
        <div v-if="loading" class="pa-autocomplete-loading-menu">
          <PaLoading size="sm" />
        </div>
        <div v-else class="pa-autocomplete-options" role="listbox">
          <div
            v-for="(option, index) in filteredOptions"
            :key="String(option.value)"
            :class="[
              'pa-autocomplete-option',
              {
                'is-selected': selectedIndex === index,
                'is-disabled': option.disabled
              }
            ]"
            role="option"
            :aria-selected="selectedIndex === index"
            :aria-disabled="option.disabled"
            @click="selectOption(option)"
            @mouseenter="selectedIndex = index"
          >
            {{ option.label }}
          </div>
          <div v-if="filteredOptions.length === 0" class="pa-autocomplete-empty">
            No options found
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style lang="scss" scoped>
.pa-autocomplete {
  position: relative;
  display: inline-flex;
  flex-direction: column;
  width: 100%;
}

.pa-autocomplete-input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.pa-autocomplete-input {
  width: 100%;
  background-color: var(--pa-autocomplete-background-default);
  color: var(--pa-autocomplete-text-default);
  border: var(--pa-autocomplete-border-width-default) solid var(--pa-autocomplete-border-default);
  border-radius: var(--pa-autocomplete-border-radius-default);
  font-family: var(--pa-font-family-roboto, Roboto, sans-serif);
  font-weight: var(--pa-font-weight-regular);
  transition: all var(--pa-autocomplete-transition-duration-default) var(--pa-autocomplete-transition-easing-default);
  outline: none;

  &::placeholder {
    color: var(--pa-autocomplete-text-placeholder);
  }

  .pa-autocomplete--sm & {
    padding: var(--pa-autocomplete-size-sm-padding-y) var(--pa-autocomplete-size-sm-padding-x);
    font-size: var(--pa-autocomplete-size-sm-font);
  }

  .pa-autocomplete--md & {
    padding: var(--pa-autocomplete-size-md-padding-y) var(--pa-autocomplete-size-md-padding-x);
    font-size: var(--pa-autocomplete-size-md-font);
  }

  .pa-autocomplete--lg & {
    padding: var(--pa-autocomplete-size-lg-padding-y) var(--pa-autocomplete-size-lg-padding-x);
    font-size: var(--pa-autocomplete-size-lg-font);
  }

  &:hover:not(.is-disabled) {
    background-color: var(--pa-autocomplete-background-hover);
    border-color: var(--pa-autocomplete-border-hover);
  }

  &:focus:not(.is-disabled) {
    background-color: var(--pa-autocomplete-background-focus);
    border-color: var(--pa-autocomplete-border-focus);
    outline: var(--pa-autocomplete-outline-width-default) solid var(--pa-autocomplete-border-focus);
    outline-offset: var(--pa-autocomplete-outline-offset-default);
  }

  &.is-error {
    border-color: var(--pa-autocomplete-border-error);
  }

  &.is-disabled {
    background-color: var(--pa-autocomplete-background-disabled);
    color: var(--pa-autocomplete-text-disabled);
    border-color: var(--pa-autocomplete-border-disabled);
    cursor: var(--pa-cursor-not-allowed);
    opacity: calc(var(--pa-opacity-60) / 100);
  }
}

.pa-autocomplete-loading {
  position: absolute;
  right: var(--pa-autocomplete-loading-spacing-right);
  display: flex;
  align-items: center;
}

.pa-autocomplete-menu {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  margin-top: var(--pa-autocomplete-menu-spacing-top);
  background-color: var(--pa-autocomplete-menu-background);
  border: var(--pa-autocomplete-border-width-default) solid var(--pa-autocomplete-menu-border);
  border-radius: var(--pa-autocomplete-border-radius-default);
  box-shadow: var(--pa-autocomplete-menu-shadow);
  z-index: var(--pa-autocomplete-menu-z-index);
  max-height: var(--pa-autocomplete-menu-max-height);
  overflow-y: auto;
}

.pa-autocomplete-loading-menu {
  padding: var(--pa-autocomplete-loading-menu-padding);
  display: flex;
  align-items: center;
  justify-content: center;
}

.pa-autocomplete-options {
  padding: var(--pa-autocomplete-options-padding);
}

.pa-autocomplete-option {
  padding: var(--pa-autocomplete-option-padding-y) var(--pa-autocomplete-option-padding-x);
  background-color: var(--pa-autocomplete-option-background-default);
  color: var(--pa-autocomplete-option-text-default);
  cursor: var(--pa-cursor-pointer);
  border-radius: var(--pa-autocomplete-option-radius);
  transition: all var(--pa-autocomplete-transition-duration-default) var(--pa-autocomplete-transition-easing-default);
  font-family: var(--pa-font-family-roboto, Roboto, sans-serif);
  font-size: var(--pa-autocomplete-option-font-size);
  font-weight: var(--pa-font-weight-regular);

  &:hover:not(.is-disabled),
  &.is-selected {
    background-color: var(--pa-autocomplete-option-background-hover);
  }

  &.is-disabled {
    opacity: calc(var(--pa-opacity-60) / 100);
    cursor: var(--pa-cursor-not-allowed);
    pointer-events: none;
  }
}

.pa-autocomplete-empty {
  padding: var(--pa-autocomplete-empty-padding);
  text-align: center;
  color: var(--pa-autocomplete-empty-color);
  font-family: var(--pa-font-family-roboto);
  font-size: var(--pa-autocomplete-empty-font-size);
}

.pa-autocomplete-menu-enter-active,
.pa-autocomplete-menu-leave-active {
  transition: opacity var(--pa-transition-duration-fast) var(--pa-transition-easing-default),
    transform var(--pa-transition-duration-fast) var(--pa-transition-easing-default);
}

.pa-autocomplete-menu-enter-from,
.pa-autocomplete-menu-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}
</style>

