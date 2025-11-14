export const componentSourceCode: Record<string, string> = {
  'pabutton': `<script setup lang="ts">
defineProps<{
  variant?: 'primary' | 'secondary' | 'tertiary' | 'link' | 'action'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  loading?: boolean
  iconPosition?: 'left' | 'center' | 'right'
}>()
</script>

<template>
  <button
    :class="[
      'pa-button',
      \`pa-button--\${variant || 'primary'}\`,
      \`pa-button--\${size || 'md'}\`,
      {
        'has-icon-left': iconPosition === 'left',
        'has-icon-center': iconPosition === 'center',
        'has-icon-right': iconPosition === 'right'
      },
      { 
        'is-disabled': disabled || loading,
        'is-loading': loading
      }
    ]"
    :disabled="disabled || loading"
  >
    <span v-if="loading" class="pa-button-loader" aria-hidden="true"></span>
    <slot />
  </button>
</template>`,
  'painput': `<script setup lang="ts">
defineProps<{
  modelValue?: string | number
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  error?: boolean
  placeholder?: string
  type?: string
  iconLeft?: string
  iconRight?: string
}>()

defineEmits<{
  'update:modelValue': [value: string | number]
  'focus': [event: FocusEvent]
  'blur': [event: FocusEvent]
}>()
</script>

<template>
  <div
    :class="[
      'pa-input-wrapper',
      \`pa-input-wrapper--\${size || 'md'}\`,
      {
        'is-disabled': disabled,
        'is-error': error
      }
    ]"
  >
    <div class="pa-input-container">
      <span v-if="iconLeft" class="pa-input-icon pa-input-icon--left">
        <slot name="iconLeft">{{ iconLeft }}</slot>
      </span>
      <input
        :class="[
          'pa-input',
          \`pa-input--\${size || 'md'}\`,
          {
            'is-disabled': disabled,
            'is-error': error,
            'has-icon-left': iconLeft,
            'has-icon-right': iconRight
          }
        ]"
        :value="modelValue"
        :disabled="disabled"
        :placeholder="placeholder"
        :type="type || 'text'"
        :aria-invalid="error"
        :aria-describedby="error ? 'pa-input-error' : undefined"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
        @focus="$emit('focus', $event)"
        @blur="$emit('blur', $event)"
      />
      <span v-if="iconRight" class="pa-input-icon pa-input-icon--right">
        <slot name="iconRight">{{ iconRight }}</slot>
      </span>
    </div>
  </div>
</template>`,
  'pacheckbox': `<script setup lang="ts">
defineProps<{
  modelValue?: boolean
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  indeterminate?: boolean
  label?: string
}>()

defineEmits<{
  'update:modelValue': [value: boolean]
  'change': [value: boolean]
}>()
</script>

<template>
  <label
    :class="[
      'pa-checkbox',
      \`pa-checkbox--\${size || 'md'}\`,
      {
        'is-disabled': disabled,
        'is-checked': modelValue,
        'is-indeterminate': indeterminate
      }
    ]"
  >
    <input
      type="checkbox"
      :checked="modelValue"
      :disabled="disabled"
      :indeterminate="indeterminate"
      :aria-checked="indeterminate ? 'mixed' : modelValue"
      class="pa-checkbox-input"
      @change="$emit('update:modelValue', ($event.target as HTMLInputElement).checked); $emit('change', ($event.target as HTMLInputElement).checked)"
    />
    <span class="pa-checkbox-box">
      <svg
        v-if="modelValue && !indeterminate"
        class="pa-checkbox-checkmark"
        viewBox="0 0 12 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M10 3L4.5 8.5L2 6"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
      <span v-if="indeterminate" class="pa-checkbox-indeterminate"></span>
    </span>
    <span v-if="label" class="pa-checkbox-label">{{ label }}</span>
  </label>
</template>`,
  'paradio': `<script setup lang="ts">
defineProps<{
  modelValue?: string | number
  value: string | number
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  label?: string
  name?: string
}>()

defineEmits<{
  'update:modelValue': [value: string | number]
  'change': [value: string | number]
}>()
</script>

<template>
  <label
    :class="[
      'pa-radio',
      \`pa-radio--\${size || 'md'}\`,
      {
        'is-disabled': disabled,
        'is-checked': modelValue === value
      }
    ]"
  >
    <input
      type="radio"
      :checked="modelValue === value"
      :disabled="disabled"
      :name="name"
      :value="value"
      :aria-checked="modelValue === value"
      class="pa-radio-input"
      @change="$emit('update:modelValue', value); $emit('change', value)"
    />
    <span class="pa-radio-circle">
      <span v-if="modelValue === value" class="pa-radio-dot"></span>
    </span>
    <span v-if="label" class="pa-radio-label">{{ label }}</span>
  </label>
</template>`,
  'pacard': `<script setup lang="ts">
defineProps<{
  variant?: 'default' | 'outlined' | 'elevated'
  hoverable?: boolean
  selected?: boolean
}>()
</script>

<template>
  <div
    :class="[
      'pa-card',
      \`pa-card--\${variant || 'default'}\`,
      {
        'is-hoverable': hoverable,
        'is-selected': selected
      }
    ]"
  >
    <div v-if="$slots.header" class="pa-card-header">
      <slot name="header" />
    </div>
    <div class="pa-card-body">
      <slot />
    </div>
    <div v-if="$slots.footer" class="pa-card-footer">
      <slot name="footer" />
    </div>
  </div>
</template>`,
  'pabadge': `<script setup lang="ts">
defineProps<{
  variant?: 'default' | 'success' | 'warning' | 'error'
  size?: 'sm' | 'md' | 'lg'
  dot?: boolean
}>()
</script>

<template>
  <span
    :class="[
      'pa-badge',
      \`pa-badge--\${variant || 'default'}\`,
      \`pa-badge--\${size || 'md'}\`,
      {
        'is-dot': dot
      }
    ]"
  >
    <span v-if="dot" class="pa-badge-dot"></span>
    <span v-else class="pa-badge-content">
      <slot />
    </span>
  </span>
</template>`,
  'paradiobuttongroup': `<script setup lang="ts">
import { computed } from 'vue'
import PaRadio from '../PaRadio/PaRadio.vue'

const props = defineProps<{
  modelValue?: string | number
  options: Array<{ label: string; value: string | number; disabled?: boolean }>
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  name?: string
  direction?: 'horizontal' | 'vertical'
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string | number]
  'change': [value: string | number]
}>()

const groupName = computed(() => props.name || \`radio-group-\${Math.random().toString(36).substr(2, 9)}\`)

const handleChange = (value: string | number) => {
  emit('update:modelValue', value)
  emit('change', value)
}
</script>

<template>
  <fieldset
    :class="[
      'pa-radio-button-group',
      \`pa-radio-button-group--\${direction || 'horizontal'}\`
    ]"
    role="radiogroup"
  >
    <PaRadio
      v-for="option in options"
      :key="String(option.value)"
      :model-value="modelValue"
      :value="option.value"
      :size="size"
      :disabled="disabled || option.disabled"
      :label="option.label"
      :name="groupName"
      @update:model-value="handleChange"
      @change="handleChange"
    />
  </fieldset>
</template>`,
  'paswitch': `<script setup lang="ts">
defineProps<{
  modelValue?: boolean
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  label?: string
}>()

defineEmits<{
  'update:modelValue': [value: boolean]
  'change': [value: boolean]
}>()
</script>

<template>
  <label
    :class="[
      'pa-switch',
      \`pa-switch--\${size || 'md'}\`,
      {
        'is-disabled': disabled,
        'is-on': modelValue
      }
    ]"
  >
    <input
      type="checkbox"
      :checked="modelValue"
      :disabled="disabled"
      :aria-checked="modelValue"
      role="switch"
      class="pa-switch-input"
      @change="$emit('update:modelValue', ($event.target as HTMLInputElement).checked); $emit('change', ($event.target as HTMLInputElement).checked)"
    />
    <span class="pa-switch-track">
      <span class="pa-switch-thumb"></span>
    </span>
    <span v-if="label" class="pa-switch-label">{{ label }}</span>
  </label>
</template>`,
  'paselect': `<script setup lang="ts">
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
    return selected.length > 0 ? \`\${selected.length} selected\` : props.placeholder || 'Select...'
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
      \`pa-select--\${size || 'md'}\`,
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
</template>`,
  'patextarea': `<script setup lang="ts">
import { ref, computed, watch } from 'vue'

const props = defineProps<{
  modelValue?: string
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  error?: boolean
  placeholder?: string
  rows?: number
  maxLength?: number
  autoResize?: boolean
  showCount?: boolean
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
  'change': [value: string]
  'focus': [event: FocusEvent]
  'blur': [event: FocusEvent]
}>()

const textareaRef = ref<HTMLTextAreaElement>()

const characterCount = computed(() => {
  return props.modelValue?.length || 0
})

const isOverLimit = computed(() => {
  if (!props.maxLength) return false
  return characterCount.value > props.maxLength
})

const handleInput = (event: Event) => {
  const value = (event.target as HTMLTextAreaElement).value
  emit('update:modelValue', value)
  emit('change', value)
  
  if (props.autoResize && textareaRef.value) {
    adjustHeight()
  }
}

const adjustHeight = () => {
  if (!textareaRef.value) return
  
  textareaRef.value.style.height = 'auto'
  const scrollHeight = textareaRef.value.scrollHeight
  const lineHeight = parseInt(getComputedStyle(textareaRef.value).lineHeight)
  const minHeight = lineHeight * (props.rows || 3)
  
  textareaRef.value.style.height = \`\${Math.max(scrollHeight, minHeight)}px\`
}

watch(() => props.modelValue, () => {
  if (props.autoResize) {
    setTimeout(adjustHeight, 0)
  }
})

const handleFocus = (event: FocusEvent) => {
  emit('focus', event)
}

const handleBlur = (event: FocusEvent) => {
  emit('blur', event)
}
</script>

<template>
  <div
    :class="[
      'pa-textarea-wrapper',
      \`pa-textarea-wrapper--\${size || 'md'}\`,
      {
        'is-error': error,
        'is-disabled': disabled
      }
    ]"
  >
    <textarea
      ref="textareaRef"
      :class="[
        'pa-textarea',
        \`pa-textarea--\${size || 'md'}\`,
        {
          'is-error': error,
          'is-disabled': disabled
        }
      ]"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :rows="autoResize ? undefined : (rows || 3)"
      :maxlength="maxLength"
      :aria-invalid="error"
      :aria-describedby="error ? 'pa-textarea-error' : undefined"
      @input="handleInput"
      @focus="handleFocus"
      @blur="handleBlur"
    />
    <div
      v-if="showCount || maxLength"
      :class="[
        'pa-textarea-counter',
        {
          'is-over-limit': isOverLimit
        }
      ]"
    >
      <span v-if="showCount && !maxLength">
        {{ characterCount }}
      </span>
      <span v-else-if="maxLength">
        {{ characterCount }} / {{ maxLength }}
      </span>
    </div>
  </div>
</template>`,
  'paautocomplete': `<script setup lang="ts">
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
      \`pa-autocomplete--\${size || 'md'}\`,
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
          \`pa-autocomplete-input--\${size || 'md'}\`,
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
</template>`,
  'patimepicker': `<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

const props = defineProps<{
  modelValue?: string
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  error?: boolean
  placeholder?: string
  format?: '12h' | '24h'
  showSeconds?: boolean
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
  'change': [value: string]
}>()

const isOpen = ref(false)
const inputRef = ref<HTMLInputElement>()
const panelRef = ref<HTMLElement>()

const timeValue = computed({
  get: () => props.modelValue || '',
  set: (value: string) => {
    emit('update:modelValue', value)
    emit('change', value)
  }
})

const displayValue = computed(() => {
  if (!props.modelValue) return ''
  
  if (props.format === '12h') {
    const [hours, minutes, seconds] = props.modelValue.split(':')
    const hour = parseInt(hours || '0')
    const ampm = hour >= 12 ? 'PM' : 'AM'
    const hour12 = hour % 12 || 12
    if (props.showSeconds && seconds) {
      return \`\${String(hour12).padStart(2, '0')}:\${minutes || '00'}:\${seconds} \${ampm}\`
    }
    return \`\${String(hour12).padStart(2, '0')}:\${minutes || '00'} \${ampm}\`
  }
  
  return props.modelValue
})

const hours = computed(() => {
  const list = []
  const max = props.format === '12h' ? 12 : 24
  for (let i = props.format === '12h' ? 1 : 0; i < max; i++) {
    list.push(String(i).padStart(2, '0'))
  }
  return list
})

const minutes = computed(() => {
  const list = []
  for (let i = 0; i < 60; i += props.showSeconds ? 1 : 5) {
    list.push(String(i).padStart(2, '0'))
  }
  return list
})

const seconds = computed(() => {
  if (!props.showSeconds) return []
  const list = []
  for (let i = 0; i < 60; i++) {
    list.push(String(i).padStart(2, '0'))
  }
  return list
})

const currentTime = computed(() => {
  if (!props.modelValue) {
    const now = new Date()
    return {
      hour: String(now.getHours()).padStart(2, '0'),
      minute: String(now.getMinutes()).padStart(2, '0'),
      second: String(now.getSeconds()).padStart(2, '0'),
      ampm: now.getHours() >= 12 ? 'PM' : 'AM'
    }
  }
  
  const [h, m, s] = props.modelValue.split(':')
  const hour = parseInt(h || '0')
  return {
    hour: props.format === '12h' ? String((hour % 12) || 12).padStart(2, '0') : String(hour).padStart(2, '0'),
    minute: m || '00',
    second: s || '00',
    ampm: hour >= 12 ? 'PM' : 'AM'
  }
})

const selectedHour = ref(currentTime.value.hour)
const selectedMinute = ref(currentTime.value.minute)
const selectedSecond = ref(currentTime.value.second)
const selectedAmPm = ref(currentTime.value.ampm)

const selectTime = (type: 'hour' | 'minute' | 'second' | 'ampm', value: string) => {
  if (type === 'hour') selectedHour.value = value
  if (type === 'minute') selectedMinute.value = value
  if (type === 'second') selectedSecond.value = value
  if (type === 'ampm') selectedAmPm.value = value
  
  let hour24 = parseInt(selectedHour.value)
  if (props.format === '12h') {
    if (selectedAmPm.value === 'PM' && hour24 !== 12) {
      hour24 += 12
    } else if (selectedAmPm.value === 'AM' && hour24 === 12) {
      hour24 = 0
    }
  }
  
  const timeString = props.showSeconds
    ? \`\${String(hour24).padStart(2, '0')}:\${selectedMinute.value}:\${selectedSecond.value}\`
    : \`\${String(hour24).padStart(2, '0')}:\${selectedMinute.value}\`
  
  timeValue.value = timeString
}

const toggle = () => {
  if (!props.disabled) {
    isOpen.value = !isOpen.value
  }
}

const handleClickOutside = (event: MouseEvent) => {
  if (panelRef.value && !panelRef.value.contains(event.target as Node) &&
      inputRef.value && !inputRef.value.contains(event.target as Node)) {
    isOpen.value = false
  }
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
    :class="[
      'pa-time-picker',
      \`pa-time-picker--\${size || 'md'}\`,
      {
        'is-open': isOpen,
        'is-disabled': disabled,
        'is-error': error
      }
    ]"
  >
    <div
      ref="inputRef"
      class="pa-time-picker-input"
      role="combobox"
      :aria-expanded="isOpen"
      :aria-haspopup="true"
      :aria-invalid="error"
      :aria-disabled="disabled"
      @click="toggle"
    >
      <input
        :class="[
          'pa-time-picker-input-field',
          \`pa-time-picker-input-field--\${size || 'md'}\`,
          {
            'is-disabled': disabled,
            'is-error': error
          }
        ]"
        :value="displayValue"
        :placeholder="placeholder || 'Select time'"
        :disabled="disabled"
        readonly
        aria-readonly="true"
      />
      <span class="pa-time-picker-icon">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
          <path d="M12 6v6l4 2" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
      </span>
    </div>
    <Transition name="pa-time-picker-panel">
      <div
        v-if="isOpen"
        ref="panelRef"
        class="pa-time-picker-panel"
      >
        <div class="pa-time-picker-scroll">
          <div class="pa-time-picker-column">
            <div class="pa-time-picker-column-label">Hour</div>
            <div class="pa-time-picker-list">
              <div
                v-for="hour in hours"
                :key="hour"
                :class="[
                  'pa-time-picker-item',
                  {
                    'is-selected': selectedHour === hour
                  }
                ]"
                @click="selectTime('hour', hour)"
              >
                {{ hour }}
              </div>
            </div>
          </div>
          <div class="pa-time-picker-column">
            <div class="pa-time-picker-column-label">Minute</div>
            <div class="pa-time-picker-list">
              <div
                v-for="minute in minutes"
                :key="minute"
                :class="[
                  'pa-time-picker-item',
                  {
                    'is-selected': selectedMinute === minute
                  }
                ]"
                @click="selectTime('minute', minute)"
              >
                {{ minute }}
              </div>
            </div>
          </div>
          <div v-if="showSeconds" class="pa-time-picker-column">
            <div class="pa-time-picker-column-label">Second</div>
            <div class="pa-time-picker-list">
              <div
                v-for="second in seconds"
                :key="second"
                :class="[
                  'pa-time-picker-item',
                  {
                    'is-selected': selectedSecond === second
                  }
                ]"
                @click="selectTime('second', second)"
              >
                {{ second }}
              </div>
            </div>
          </div>
          <div v-if="format === '12h'" class="pa-time-picker-column">
            <div class="pa-time-picker-column-label">AM/PM</div>
            <div class="pa-time-picker-list">
              <div
                :class="[
                  'pa-time-picker-item',
                  {
                    'is-selected': selectedAmPm === 'AM'
                  }
                ]"
                @click="selectTime('ampm', 'AM')"
              >
                AM
              </div>
              <div
                :class="[
                  'pa-time-picker-item',
                  {
                    'is-selected': selectedAmPm === 'PM'
                  }
                ]"
                @click="selectTime('ampm', 'PM')"
              >
                PM
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>`,
  'pafileuploader': `<script setup lang="ts">
import { ref } from 'vue'

defineProps<{
  accept?: string
  multiple?: boolean
  disabled?: boolean
}>()

const emit = defineEmits<{
  'change': [files: FileList | null]
}>()

const fileInputRef = ref<HTMLInputElement>()

const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('change', target.files)
}

const triggerFileInput = () => {
  fileInputRef.value?.click()
}
</script>

<template>
  <div
    :class="[
      'pa-file-uploader',
      {
        'is-disabled': disabled
      }
    ]"
  >
    <input
      ref="fileInputRef"
      type="file"
      :accept="accept"
      :multiple="multiple"
      :disabled="disabled"
      class="pa-file-uploader-input"
      aria-label="File upload"
      @change="handleFileChange"
    />
    <div 
      class="pa-file-uploader-dropzone" 
      role="button"
      :aria-disabled="disabled"
      :tabindex="disabled ? -1 : 0"
      @click="triggerFileInput"
      @keydown.enter="triggerFileInput"
      @keydown.space.prevent="triggerFileInput"
    >
      <slot>
        <div class="pa-file-uploader-content">
          <span class="pa-file-uploader-icon">📎</span>
          <span class="pa-file-uploader-text">Click to upload or drag and drop</span>
        </div>
      </slot>
    </div>
  </div>
</template>`,
  'paform': `<script setup lang="ts">
defineProps<{
  error?: string | boolean
}>()
</script>

<template>
  <form
    :class="[
      'pa-form',
      {
        'is-error': error
      }
    ]"
    @submit.prevent
  >
    <slot />
    <div v-if="error && typeof error === 'string'" class="pa-form-error">
      {{ error }}
    </div>
  </form>
</template>`,
  'paheader': `<script setup lang="ts">
defineProps<{
  sticky?: boolean
}>()
</script>

<template>
  <header
    :class="[
      'pa-header',
      {
        'is-sticky': sticky
      }
    ]"
  >
    <div class="pa-header-content">
      <div v-if="$slots.logo" class="pa-header-logo">
        <slot name="logo" />
      </div>
      <nav v-if="$slots.navigation" class="pa-header-navigation">
        <slot name="navigation" />
      </nav>
      <div v-if="$slots.actions" class="pa-header-actions">
        <slot name="actions" />
      </div>
    </div>
  </header>
</template>`,
  'palistitem': `<script setup lang="ts">
defineProps<{
  selected?: boolean
  hoverable?: boolean
}>()
</script>

<template>
  <div
    :class="[
      'pa-list-item',
      {
        'is-selected': selected,
        'is-hoverable': hoverable
      }
    ]"
  >
    <div v-if="$slots.avatar" class="pa-list-item-avatar">
      <slot name="avatar" />
    </div>
    <div v-if="$slots.icon" class="pa-list-item-icon">
      <slot name="icon" />
    </div>
    <div class="pa-list-item-content">
      <slot />
    </div>
    <div v-if="$slots.actions" class="pa-list-item-actions">
      <slot name="actions" />
    </div>
  </div>
</template>`,
  'papagelayout': `<script setup lang="ts">
defineProps<{
  sidebar?: boolean
}>()
</script>

<template>
  <div
    :class="[
      'pa-page-layout',
      {
        'has-sidebar': sidebar
      }
    ]"
  >
    <aside v-if="$slots.sidebar" class="pa-page-layout-sidebar">
      <slot name="sidebar" />
    </aside>
    <main class="pa-page-layout-main">
      <slot />
    </main>
  </div>
</template>`,
  'pacontentseparator': `<script setup lang="ts">
defineProps<{
  direction?: 'horizontal' | 'vertical'
  text?: string
}>()
</script>

<template>
  <div
    :class="[
      'pa-content-separator',
      \`pa-content-separator--\${direction || 'horizontal'}\`,
      {
        'has-text': text
      }
    ]"
    role="separator"
  >
    <span v-if="text" class="pa-content-separator-text">{{ text }}</span>
  </div>
</template>`,
  'pacontainer': `<script setup lang="ts">
defineProps<{
  variant?: 'default' | 'subtle' | 'outlined' | 'elevated'
  size?: 'sm' | 'md' | 'lg'
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  centered?: boolean
}>()
</script>

<template>
  <div
    :class="[
      'pa-container',
      \`pa-container--\${variant || 'default'}\`,
      \`pa-container--\${size || 'md'}\`,
      {
        'is-centered': centered
      }
    ]"
    :style="{
      maxWidth: maxWidth ? \`var(--pa-container-max-width-\${maxWidth})\` : undefined
    }"
  >
    <slot />
  </div>
</template>`,
  'paformcontainer': `<script setup lang="ts">
defineProps<{
  title?: string
  description?: string
  variant?: 'default' | 'outlined' | 'elevated'
}>()
</script>

<template>
  <div
    :class="[
      'pa-form-container',
      \`pa-form-container--\${variant || 'default'}\`
    ]"
  >
    <div v-if="title || description || $slots.header" class="pa-form-container-header">
      <slot name="header">
        <h2 v-if="title" class="pa-form-container-title">{{ title }}</h2>
        <p v-if="description" class="pa-form-container-description">{{ description }}</p>
      </slot>
    </div>
    <div class="pa-form-container-content">
      <slot />
    </div>
    <div v-if="$slots.footer" class="pa-form-container-footer">
      <slot name="footer" />
    </div>
  </div>
</template>`,
  'pasectioncontainer': `<script setup lang="ts">
defineProps<{
  title?: string
  description?: string
}>()
</script>

<template>
  <div class="pa-section-container">
    <div v-if="title || description || $slots.header" class="pa-section-container-header">
      <slot name="header">
        <div class="pa-section-container-header-content">
          <h2 v-if="title" class="pa-section-container-title">{{ title }}</h2>
          <p v-if="description" class="pa-section-container-description">{{ description }}</p>
        </div>
        <div v-if="$slots.actions" class="pa-section-container-actions">
          <slot name="actions" />
        </div>
      </slot>
    </div>
    <div class="pa-section-container-content">
      <slot />
    </div>
  </div>
</template>`,
  'padropdown': `<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

defineProps<{
  modelValue?: boolean
  placement?: 'top' | 'bottom' | 'left' | 'right'
  trigger?: 'click' | 'hover'
}>()

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  'close': []
}>()

const isOpen = ref(false)
const menuRef = ref<HTMLElement>()

const toggle = () => {
  isOpen.value = !isOpen.value
  emit('update:modelValue', isOpen.value)
}

const close = () => {
  isOpen.value = false
  emit('update:modelValue', false)
  emit('close')
}

const handleClickOutside = (event: MouseEvent) => {
  if (menuRef.value && !menuRef.value.contains(event.target as Node)) {
    close()
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<template>
  <div class="pa-dropdown">
    <div 
      class="pa-dropdown-trigger" 
      role="button"
      :aria-expanded="isOpen"
      :aria-haspopup="true"
      @click="toggle"
    >
      <slot name="trigger" />
    </div>
    <Transition name="pa-dropdown">
      <div
        v-if="isOpen"
        ref="menuRef"
        :class="[
          'pa-dropdown-menu',
          \`pa-dropdown-menu--\${placement || 'bottom'}\`
        ]"
        role="menu"
      >
        <slot />
      </div>
    </Transition>
  </div>
</template>`,
  'pasegmentedcontrol': `<script setup lang="ts">
defineProps<{
  modelValue: string | number
  options: Array<{ label: string; value: string | number; disabled?: boolean }>
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string | number]
  'change': [value: string | number]
}>()

const selectOption = (option: { label: string; value: string | number; disabled?: boolean }) => {
  if (!option.disabled) {
    emit('update:modelValue', option.value)
    emit('change', option.value)
  }
}
</script>

<template>
  <div class="pa-segmented-control" role="radiogroup">
    <button
      v-for="option in options"
      :key="String(option.value)"
      :class="[
        'pa-segmented-control-item',
        {
          'is-selected': modelValue === option.value,
          'is-disabled': option.disabled
        }
      ]"
      :disabled="option.disabled"
      :aria-pressed="modelValue === option.value"
      role="radio"
      :aria-checked="modelValue === option.value"
      @click="selectOption(option)"
    >
      {{ option.label }}
    </button>
  </div>
</template>`,
  'patogglesegmentation': `<script setup lang="ts">
const props = defineProps<{
  modelValue: string | number | null
  options: Array<{ label: string; value: string | number; disabled?: boolean }>
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string | number | null]
  'change': [value: string | number | null]
}>()

const selectOption = (option: { label: string; value: string | number; disabled?: boolean }) => {
  if (!option.disabled) {
    const newValue = props.modelValue === option.value ? null : option.value
    emit('update:modelValue', newValue)
    emit('change', newValue)
  }
}
</script>

<template>
  <div class="pa-toggle-segmentation">
    <button
      v-for="option in options"
      :key="String(option.value)"
      :class="[
        'pa-toggle-segmentation-item',
        {
          'is-selected': modelValue === option.value,
          'is-disabled': option.disabled
        }
      ]"
      :disabled="option.disabled"
      :aria-pressed="modelValue === option.value"
      role="button"
      @click="selectOption(option)"
    >
      {{ option.label }}
    </button>
  </div>
</template>`,
  'patogglechip': `<script setup lang="ts">
const props = defineProps<{
  modelValue?: boolean
  removable?: boolean
  disabled?: boolean
}>()

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  'change': [value: boolean]
  'remove': []
}>()

const toggle = () => {
  if (!props.disabled) {
    const newValue = !props.modelValue
    emit('update:modelValue', newValue)
    emit('change', newValue)
  }
}

const remove = (event: MouseEvent) => {
  event.stopPropagation()
  emit('remove')
}
</script>

<template>
  <span
    :class="[
      'pa-toggle-chip',
      {
        'is-selected': modelValue,
        'is-disabled': disabled,
        'is-removable': removable
      }
    ]"
    role="button"
    :aria-pressed="modelValue"
    :aria-disabled="disabled"
    :tabindex="disabled ? -1 : 0"
    @click="toggle"
    @keydown.enter="toggle"
    @keydown.space.prevent="toggle"
  >
    <slot />
    <button
      v-if="removable"
      class="pa-toggle-chip-remove"
      @click="remove"
    >
      ×
    </button>
  </span>
</template>`,
  'pakebabmenu': `<script setup lang="ts">
import { ref } from 'vue'
import PaDropdown from '../PaDropdown/PaDropdown.vue'
import PaDropdownItem from '../PaDropdown/PaDropdownItem.vue'

defineProps<{
  options: Array<{ label: string; action: () => void; disabled?: boolean }>
}>()

const isOpen = ref(false)
</script>

<template>
  <PaDropdown v-model="isOpen" placement="bottom">
    <template #trigger>
      <button class="pa-kebab-menu-trigger" aria-label="Menu">
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="8" cy="4" r="1.5" fill="currentColor" />
          <circle cx="8" cy="8" r="1.5" fill="currentColor" />
          <circle cx="8" cy="12" r="1.5" fill="currentColor" />
        </svg>
      </button>
    </template>
    <PaDropdownItem
      v-for="(option, index) in options"
      :key="index"
      :disabled="option.disabled"
      @click="option.action(); isOpen = false"
    >
      {{ option.label }}
    </PaDropdownItem>
  </PaDropdown>
</template>`,
  'patabs': `<script setup lang="ts">
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
      \`pa-tabs--\${type || 'line'}\`,
      \`pa-tabs--\${position || 'top'}\`
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
</template>`,
  'pabreadcrumbs': `<script setup lang="ts">
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
</template>`,
  'pastepper': `<script setup lang="ts">
interface Step {
  title: string
  description?: string
  icon?: string
  status?: 'wait' | 'process' | 'finish' | 'error'
  disabled?: boolean
}

const props = defineProps<{
  current: number
  steps: Step[]
  direction?: 'horizontal' | 'vertical'
  clickable?: boolean
}>()

const emit = defineEmits<{
  'step-click': [index: number, step: Step]
}>()

const getStepStatus = (index: number, step: Step) => {
  if (step.status) return step.status
  if (index < props.current) return 'finish'
  if (index === props.current) return 'process'
  return 'wait'
}

const handleStepClick = (index: number, step: Step) => {
  if (props.clickable && !step.disabled && index <= props.current) {
    emit('step-click', index, step)
  }
}
</script>

<template>
  <div
    :class="[
      'pa-stepper',
      \`pa-stepper--\${direction || 'horizontal'}\`
    ]"
    role="navigation"
    aria-label="Steps"
  >
    <div
      v-for="(step, index) in steps"
      :key="index"
      :class="[
        'pa-stepper-step',
        {
          [\`is-\${getStepStatus(index, step)}\`]: true,
          'is-clickable': clickable && !step.disabled,
          'is-disabled': step.disabled
        }
      ]"
      role="button"
      :aria-current="index === current ? 'step' : undefined"
      :aria-disabled="step.disabled || (clickable && index > current)"
      :tabindex="(clickable && !step.disabled && index <= current) ? 0 : -1"
      @click="handleStepClick(index, step)"
      @keydown.enter="handleStepClick(index, step)"
      @keydown.space.prevent="handleStepClick(index, step)"
    >
      <div class="pa-stepper-step-icon">
        <span v-if="step.icon" class="pa-stepper-step-icon-custom">{{ step.icon }}</span>
        <span v-else class="pa-stepper-step-icon-number">{{ index + 1 }}</span>
      </div>
      <div class="pa-stepper-step-content">
        <div class="pa-stepper-step-title">{{ step.title }}</div>
        <div v-if="step.description" class="pa-stepper-step-description">{{ step.description }}</div>
      </div>
      <div
        v-if="index < steps.length - 1"
        :class="[
          'pa-stepper-step-line',
          {
            'is-completed': index < current
          }
        ]"
      />
    </div>
  </div>
</template>`,
  'padrawer': `<script setup lang="ts">
import { onMounted, onUnmounted, watch } from 'vue'

const props = defineProps<{
  modelValue: boolean
  placement?: 'left' | 'right' | 'top' | 'bottom'
  size?: 'sm' | 'md' | 'lg'
  closeOnOverlay?: boolean
  persistent?: boolean
}>()

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  'close': []
}>()

const close = () => {
  if (!props.persistent) {
    emit('update:modelValue', false)
    emit('close')
  }
}

const handleOverlayClick = (event: MouseEvent) => {
  if (props.closeOnOverlay && (event.target as HTMLElement).classList.contains('pa-drawer-overlay')) {
    close()
  }
}

const handleEscape = (event: KeyboardEvent) => {
  if (event.key === 'Escape' && !props.persistent) {
    close()
  }
}

watch(() => props.modelValue, (isOpen) => {
  if (isOpen) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
})

onMounted(() => {
  document.addEventListener('keydown', handleEscape)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleEscape)
  document.body.style.overflow = ''
})
</script>

<template>
  <Teleport to="body">
    <Transition name="pa-drawer">
      <div
        v-if="modelValue"
        class="pa-drawer-overlay"
        @click="handleOverlayClick"
      >
        <div
          :class="[
            'pa-drawer-container',
            \`pa-drawer-container--\${placement || 'right'}\`,
            \`pa-drawer-container--\${size || 'md'}\`
          ]"
          role="dialog"
          :aria-modal="true"
          :aria-labelledby="modelValue ? 'pa-drawer-title' : undefined"
          @click.stop
        >
          <div v-if="$slots.header" class="pa-drawer-header">
            <slot name="header" />
          </div>
          <div class="pa-drawer-body">
            <slot />
          </div>
          <div v-if="$slots.footer" class="pa-drawer-footer">
            <slot name="footer" />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>`,
  'pamodal': `<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'

defineProps<{
  modelValue: boolean
  size?: 'sm' | 'md' | 'lg' | 'fullscreen'
  closeOnOverlay?: boolean
}>()

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  'close': []
}>()

const close = () => {
  emit('update:modelValue', false)
  emit('close')
}

const handleOverlayClick = (event: MouseEvent) => {
  if ((event.target as HTMLElement).classList.contains('pa-modal-overlay')) {
    close()
  }
}

const handleEscape = (event: KeyboardEvent) => {
  if (event.key === 'Escape') {
    close()
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleEscape)
  document.body.style.overflow = 'hidden'
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleEscape)
  document.body.style.overflow = ''
})
</script>

<template>
  <Teleport to="body">
    <Transition name="pa-modal">
      <div
        v-if="modelValue"
        class="pa-modal-overlay"
        @click="handleOverlayClick"
      >
        <div
          :class="[
            'pa-modal-container',
            \`pa-modal-container--\${size || 'md'}\`
          ]"
          role="dialog"
          :aria-modal="true"
          :aria-labelledby="modelValue ? 'pa-modal-title' : undefined"
          @click.stop
        >
          <div v-if="$slots.header || $slots.close" class="pa-modal-header">
            <slot name="header" />
            <button
              v-if="$slots.close"
              class="pa-modal-close"
              @click="close"
            >
              <slot name="close">×</slot>
            </button>
          </div>
          <div class="pa-modal-body">
            <slot />
          </div>
          <div v-if="$slots.footer" class="pa-modal-footer">
            <slot name="footer" />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>`,
  'patooltip': `<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

defineProps<{
  placement?: 'top' | 'bottom' | 'left' | 'right'
  trigger?: 'hover' | 'click' | 'focus'
}>()

const tooltipRef = ref<HTMLElement>()
const isVisible = ref(false)
const position = ref({ top: 0, left: 0 })

const updatePosition = () => {
  if (!tooltipRef.value) return

  const trigger = tooltipRef.value.previousElementSibling as HTMLElement
  if (!trigger) return

  const triggerRect = trigger.getBoundingClientRect()
  const tooltipRect = tooltipRef.value.getBoundingClientRect()

  position.value = {
    top: triggerRect.bottom + 8,
    left: triggerRect.left + triggerRect.width / 2 - tooltipRect.width / 2
  }
}

const show = () => {
  isVisible.value = true
  setTimeout(updatePosition, 0)
}

const hide = () => {
  isVisible.value = false
}

onMounted(() => {
  if (tooltipRef.value) {
    const trigger = tooltipRef.value.previousElementSibling as HTMLElement
    if (trigger) {
      trigger.addEventListener('mouseenter', show)
      trigger.addEventListener('mouseleave', hide)
    }
  }
})

onUnmounted(() => {
  if (tooltipRef.value) {
    const trigger = tooltipRef.value.previousElementSibling as HTMLElement
    if (trigger) {
      trigger.removeEventListener('mouseenter', show)
      trigger.removeEventListener('mouseleave', hide)
    }
  }
})
</script>

<template>
  <div class="pa-tooltip-wrapper">
    <slot />
    <Transition name="pa-tooltip">
      <div
        v-if="isVisible"
        ref="tooltipRef"
        :class="[
          'pa-tooltip',
          \`pa-tooltip--\${placement || 'top'}\`
        ]"
        :style="{
          top: \`\${position.top}px\`,
          left: \`\${position.left}px\`
        }"
      >
        <slot name="content" />
        <span class="pa-tooltip-arrow"></span>
      </div>
    </Transition>
  </div>
</template>`,
  'painlinemessage': `<script setup lang="ts">
import { ref } from 'vue'

defineProps<{
  variant?: 'info' | 'success' | 'warning' | 'error'
  dismissible?: boolean
}>()

const emit = defineEmits<{
  'dismiss': []
}>()

const isVisible = ref(true)

const dismiss = () => {
  isVisible.value = false
  emit('dismiss')
}
</script>

<template>
  <Transition name="pa-inline-message">
    <div
      v-if="isVisible"
      :class="[
        'pa-inline-message',
        \`pa-inline-message--\${variant || 'info'}\`
      ]"
    >
      <span v-if="$slots.icon" class="pa-inline-message-icon">
        <slot name="icon" />
      </span>
      <div class="pa-inline-message-content">
        <slot />
      </div>
      <button
        v-if="dismissible"
        class="pa-inline-message-close"
        aria-label="Dismiss message"
        @click="dismiss"
      >
        ×
      </button>
    </div>
  </Transition>
</template>`,
  'paloading': `<script setup lang="ts">
defineProps<{
  variant?: 'primary' | 'secondary'
  size?: 'sm' | 'md' | 'lg'
  overlay?: boolean
}>()
</script>

<template>
  <div
    :class="[
      'pa-loading',
      \`pa-loading--\${size || 'md'}\`,
      {
        'is-overlay': overlay
      }
    ]"
  >
    <div
      :class="[
        'pa-loading-spinner',
        \`pa-loading-spinner--\${variant || 'primary'}\`
      ]"
      role="status"
      aria-label="Loading"
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-dasharray="31.416"
          stroke-dashoffset="31.416"
        >
          <animate
            attributeName="stroke-dasharray"
            dur="2s"
            values="0 31.416;15.708 15.708;0 31.416;0 31.416"
            repeatCount="indefinite"
          />
          <animate
            attributeName="stroke-dashoffset"
            dur="2s"
            values="0;-15.708;-31.416;-31.416"
            repeatCount="indefinite"
          />
        </circle>
      </svg>
    </div>
  </div>
</template>`,
  'paemptystate': `<script setup lang="ts">
defineProps<{
  title?: string
  description?: string
}>()
</script>

<template>
  <div class="pa-empty-state">
    <div v-if="$slots.icon" class="pa-empty-state-icon">
      <slot name="icon" />
    </div>
    <h3 v-if="title || $slots.title" class="pa-empty-state-title">
      <slot name="title">{{ title }}</slot>
    </h3>
    <p v-if="description || $slots.description" class="pa-empty-state-description">
      <slot name="description">{{ description }}</slot>
    </p>
    <div v-if="$slots.action" class="pa-empty-state-action">
      <slot name="action" />
    </div>
  </div>
</template>`,
  'paprogress': `<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  percentage?: number
  type?: 'line' | 'circle'
  status?: 'default' | 'success' | 'warning' | 'error'
  size?: 'sm' | 'md' | 'lg'
  showText?: boolean
  strokeWidth?: number
}>()

const displayPercentage = computed(() => {
  if (props.percentage === undefined) return 0
  return Math.min(Math.max(props.percentage, 0), 100)
})

const circumference = computed(() => {
  const radius = props.size === 'sm' ? 30 : props.size === 'lg' ? 70 : 50
  return 2 * Math.PI * radius
})

const strokeDashoffset = computed(() => {
  const radius = props.size === 'sm' ? 30 : props.size === 'lg' ? 70 : 50
  const circumference = 2 * Math.PI * radius
  return circumference - (displayPercentage.value / 100) * circumference
})
</script>

<template>
  <div
    :class="[
      'pa-progress',
      \`pa-progress--\${type || 'line'}\`,
      \`pa-progress--\${size || 'md'}\`,
      {
        [\`pa-progress--\${status || 'default'}\`]: true
      }
    ]"
  >
    <div v-if="type === 'line'" class="pa-progress-line" role="progressbar" :aria-valuenow="displayPercentage" aria-valuemin="0" aria-valuemax="100">
      <div class="pa-progress-line-track">
        <div
          :class="[
            'pa-progress-line-fill',
            {
              [\`pa-progress-line-fill--\${status || 'default'}\`]: true
            }
          ]"
          :style="{ width: \`\${displayPercentage}%\` }"
        />
      </div>
      <span v-if="showText" class="pa-progress-text">{{ displayPercentage }}%</span>
    </div>
    <div v-else class="pa-progress-circle">
      <svg
        :class="[
          'pa-progress-circle-svg',
          \`pa-progress-circle-svg--\${size || 'md'}\`
        ]"
        viewBox="0 0 100 100"
      >
        <circle
          class="pa-progress-circle-track"
          cx="50"
          cy="50"
          :r="size === 'sm' ? 30 : size === 'lg' ? 40 : 35"
          fill="none"
          :stroke-width="strokeWidth || (size === 'sm' ? 4 : size === 'lg' ? 8 : 6)"
        />
        <circle
          :class="[
            'pa-progress-circle-fill',
            {
              [\`pa-progress-circle-fill--\${status || 'default'}\`]: true
            }
          ]"
          cx="50"
          cy="50"
          :r="size === 'sm' ? 30 : size === 'lg' ? 40 : 35"
          fill="none"
          :stroke-width="strokeWidth || (size === 'sm' ? 4 : size === 'lg' ? 8 : 6)"
          :stroke-dasharray="circumference"
          :stroke-dashoffset="strokeDashoffset"
          stroke-linecap="round"
        />
      </svg>
      <span v-if="showText" class="pa-progress-circle-text">{{ displayPercentage }}%</span>
    </div>
  </div>
</template>`,
  'patable': `<script setup lang="ts">
defineProps<{
  striped?: boolean
  hoverable?: boolean
}>()
</script>

<template>
  <div class="pa-table-wrapper">
    <table
      :class="[
        'pa-table',
        {
          'is-striped': striped,
          'is-hoverable': hoverable
        }
      ]"
    >
      <thead v-if="$slots.header" class="pa-table-header">
        <slot name="header" />
      </thead>
      <tbody v-if="$slots.body" class="pa-table-body">
        <slot name="body" />
      </tbody>
      <tfoot v-if="$slots.footer" class="pa-table-footer">
        <slot name="footer" />
      </tfoot>
    </table>
  </div>
</template>`,
  'paaccordion': `<script setup lang="ts">
import { ref } from 'vue'

defineProps<{
  modelValue?: boolean
  multiple?: boolean
}>()

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  'toggle': [value: boolean]
}>()

const isOpen = ref(false)

const toggle = () => {
  isOpen.value = !isOpen.value
  emit('update:modelValue', isOpen.value)
  emit('toggle', isOpen.value)
}
</script>

<template>
  <div
    :class="[
      'pa-accordion',
      {
        'is-open': isOpen
      }
    ]"
  >
    <button
      class="pa-accordion-header"
      :aria-expanded="isOpen"
      :aria-controls="\`pa-accordion-content-\${Math.random().toString(36).substr(2, 9)}\`"
      @click="toggle"
    >
      <span class="pa-accordion-header-content">
        <slot name="header" />
      </span>
      <span class="pa-accordion-icon">
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
    </button>
    <Transition name="pa-accordion-content">
      <div v-if="isOpen" class="pa-accordion-content" role="region">
        <div class="pa-accordion-content-inner">
          <slot />
        </div>
      </div>
    </Transition>
  </div>
</template>`,
  'papagination': `<script setup lang="ts">
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
</template>`,
  'paslider': `<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  modelValue: number
  min?: number
  max?: number
  step?: number
  disabled?: boolean
}>()

const emit = defineEmits<{
  'update:modelValue': [value: number]
  'change': [value: number]
}>()

const value = computed({
  get: () => props.modelValue,
  set: (val) => {
    emit('update:modelValue', val)
    emit('change', val)
  }
})

const min = computed(() => props.min ?? 0)
const max = computed(() => props.max ?? 100)
const step = computed(() => props.step ?? 1)

const percentage = computed(() => {
  return ((value.value - min.value) / (max.value - min.value)) * 100
})

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  value.value = Number(target.value)
}
</script>

<template>
  <div
    :class="[
      'pa-slider',
      {
        'is-disabled': disabled
      }
    ]"
  >
    <div class="pa-slider-track">
      <div
        class="pa-slider-filled"
        :style="{ width: \`\${percentage}%\` }"
      />
      <input
        type="range"
        :value="value"
        :min="min"
        :max="max"
        :step="step"
        :disabled="disabled"
        :aria-valuenow="value"
        :aria-valuemin="min"
        :aria-valuemax="max"
        :aria-label="\`Slider value: \${value}\`"
        class="pa-slider-input"
        @input="handleInput"
      />
    </div>
  </div>
</template>`,
  'parangeslider': `<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  modelValue: [number, number]
  min?: number
  max?: number
  step?: number
  disabled?: boolean
}>()

const emit = defineEmits<{
  'update:modelValue': [value: [number, number]]
  'change': [value: [number, number]]
}>()

const minValue = computed({
  get: () => props.modelValue[0],
  set: (val) => {
    const newValue: [number, number] = [val, props.modelValue[1]]
    emit('update:modelValue', newValue)
    emit('change', newValue)
  }
})

const maxValue = computed({
  get: () => props.modelValue[1],
  set: (val) => {
    const newValue: [number, number] = [props.modelValue[0], val]
    emit('update:modelValue', newValue)
    emit('change', newValue)
  }
})

const min = computed(() => props.min ?? 0)
const max = computed(() => props.max ?? 100)
const step = computed(() => props.step ?? 1)

const minPercentage = computed(() => {
  return ((minValue.value - min.value) / (max.value - min.value)) * 100
})

const maxPercentage = computed(() => {
  return ((maxValue.value - min.value) / (max.value - min.value)) * 100
})

const handleMinInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  const val = Number(target.value)
  if (val <= maxValue.value) {
    minValue.value = val
  }
}

const handleMaxInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  const val = Number(target.value)
  if (val >= minValue.value) {
    maxValue.value = val
  }
}
</script>

<template>
  <div
    :class="[
      'pa-range-slider',
      {
        'is-disabled': disabled
      }
    ]"
  >
    <div class="pa-range-slider-track">
      <div
        class="pa-range-slider-filled"
        :style="{
          left: \`\${minPercentage}%\`,
          width: \`\${maxPercentage - minPercentage}%\`
        }"
      />
      <input
        type="range"
        :value="minValue"
        :min="min"
        :max="max"
        :step="step"
        :disabled="disabled"
        :aria-valuenow="minValue"
        :aria-valuemin="min"
        :aria-valuemax="max"
        :aria-label="\`Minimum value: \${minValue}\`"
        class="pa-range-slider-input pa-range-slider-input--min"
        @input="handleMinInput"
      />
      <input
        type="range"
        :value="maxValue"
        :min="min"
        :max="max"
        :step="step"
        :disabled="disabled"
        :aria-valuenow="maxValue"
        :aria-valuemin="min"
        :aria-valuemax="max"
        :aria-label="\`Maximum value: \${maxValue}\`"
        class="pa-range-slider-input pa-range-slider-input--max"
        @input="handleMaxInput"
      />
    </div>
  </div>
</template>`,
  'paactionbutton': `<script setup lang="ts">
import PaButton from '../PaButton/PaButton.vue'

defineProps<{
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  loading?: boolean
  iconPosition?: 'left' | 'center' | 'right'
}>()
</script>

<template>
  <PaButton
    variant="action"
    :size="size"
    :disabled="disabled"
    :loading="loading"
    :icon-position="iconPosition"
  >
    <slot />
  </PaButton>
</template>`,
  'paactionbuttongroup': `<script setup lang="ts">
defineProps<{
  direction?: 'horizontal' | 'vertical'
  gap?: 'sm' | 'md' | 'lg'
}>()
</script>

<template>
  <div
    :class="[
      'pa-action-button-group',
      \`pa-action-button-group--\${direction || 'horizontal'}\`,
      \`pa-action-button-group--gap-\${gap || 'md'}\`
    ]"
    role="group"
  >
    <slot />
  </div>
</template>`,
  'paactiongroup': `<script setup lang="ts">
defineProps<{
  direction?: 'horizontal' | 'vertical'
  gap?: 'sm' | 'md' | 'lg'
}>()
</script>

<template>
  <div
    :class="[
      'pa-action-group',
      \`pa-action-group--\${direction || 'horizontal'}\`,
      \`pa-action-group--gap-\${gap || 'md'}\`
    ]"
    role="group"
  >
    <slot />
  </div>
</template>`,
  'pabuttondropdown': `<script setup lang="ts">
import { ref } from 'vue'
import PaButton from '../PaButton/PaButton.vue'
import PaDropdown from '../PaDropdown/PaDropdown.vue'
import PaDropdownItem from '../PaDropdown/PaDropdownItem.vue'

interface DropdownOption {
  label: string
  value: string | number
  disabled?: boolean
  action?: () => void
}

const props = defineProps<{
  options: DropdownOption[]
  variant?: 'primary' | 'secondary' | 'tertiary' | 'link' | 'action'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  placement?: 'top' | 'bottom' | 'left' | 'right'
}>()

const isOpen = ref(false)

const handleSelect = (option: DropdownOption) => {
  if (option.action) {
    option.action()
  }
  isOpen.value = false
}
</script>

<template>
  <PaDropdown v-model="isOpen" :placement="placement">
    <template #trigger>
      <PaButton
        :variant="variant"
        :size="size"
        :disabled="disabled"
        @click="isOpen = !isOpen"
      >
        <slot name="button">
          <span>Actions</span>
        </slot>
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          :style="{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }"
        >
          <path
            d="M4 6L8 10L12 6"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </PaButton>
    </template>
    <template #content>
      <PaDropdownItem
        v-for="option in options"
        :key="String(option.value)"
        :disabled="option.disabled"
        @click="handleSelect(option)"
      >
        {{ option.label }}
      </PaDropdownItem>
    </template>
  </PaDropdown>
</template>`,
  'pacheckboxgroup': `<script setup lang="ts">
import PaCheckbox from '../PaCheckbox/PaCheckbox.vue'

interface CheckboxOption {
  label: string
  value: string | number
  disabled?: boolean
}

const props = defineProps<{
  modelValue?: Array<string | number>
  options: CheckboxOption[]
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  direction?: 'horizontal' | 'vertical'
}>()

const emit = defineEmits<{
  'update:modelValue': [value: Array<string | number>]
  'change': [value: Array<string | number>]
}>()

const handleChange = (value: boolean, optionValue: string | number) => {
  const currentValue = props.modelValue || []
  let newValue: Array<string | number>
  
  if (value) {
    newValue = [...currentValue, optionValue]
  } else {
    newValue = currentValue.filter(v => v !== optionValue)
  }
  
  emit('update:modelValue', newValue)
  emit('change', newValue)
}
</script>

<template>
  <fieldset
    :class="[
      'pa-checkbox-group',
      \`pa-checkbox-group--\${direction || 'horizontal'}\`
    ]"
    role="group"
  >
    <PaCheckbox
      v-for="option in options"
      :key="String(option.value)"
      :model-value="(modelValue || []).includes(option.value)"
      :size="size"
      :disabled="disabled || option.disabled"
      :label="option.label"
      @update:model-value="handleChange($event, option.value)"
    />
  </fieldset>
</template>`,
  'painputgroup': `<script setup lang="ts">
defineProps<{
  direction?: 'horizontal' | 'vertical'
  gap?: 'sm' | 'md' | 'lg'
}>()
</script>

<template>
  <div
    :class="[
      'pa-input-group',
      \`pa-input-group--\${direction || 'horizontal'}\`,
      \`pa-input-group--gap-\${gap || 'md'}\`
    ]"
  >
    <slot />
  </div>
</template>`,
  'pacurrencyinput': `<script setup lang="ts">
import { computed } from 'vue'
import PaInput from '../PaInput/PaInput.vue'

const props = defineProps<{
  modelValue?: string | number
  currency?: string
  disabled?: boolean
  error?: boolean
  placeholder?: string
  label?: string
  helperText?: string
  errorMessage?: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string | number]
  'focus': [event: FocusEvent]
  'blur': [event: FocusEvent]
}>()

const currencySymbol = computed(() => props.currency || '$')

const formatValue = (value: string | number | undefined): string => {
  if (!value) return ''
  const numValue = typeof value === 'string' ? parseFloat(value.replace(/[^0-9.]/g, '')) : value
  if (isNaN(numValue)) return ''
  return numValue.toFixed(2)
}

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  const numericValue = target.value.replace(/[^0-9.]/g, '')
  emit('update:modelValue', numericValue || '')
}
</script>

<template>
  <div class="pa-currency-input">
    <PaInput
      :model-value="formatValue(modelValue)"
      :disabled="disabled"
      :error="error"
      :placeholder="placeholder"
      :label="label"
      :helper-text="helperText"
      :error-message="errorMessage"
      type="text"
      @update:model-value="handleInput"
      @focus="emit('focus', $event)"
      @blur="emit('blur', $event)"
    >
      <template #left>
        <span class="pa-currency-input-symbol">{{ currencySymbol }}</span>
      </template>
    </PaInput>
  </div>
</template>`,
  'padatepicker': `<script setup lang="ts">
import PaInput from '../PaInput/PaInput.vue'

const props = defineProps<{
  modelValue?: string
  disabled?: boolean
  error?: boolean
  placeholder?: string
  label?: string
  helperText?: string
  errorMessage?: string
  min?: string
  max?: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
  'focus': [event: FocusEvent]
  'blur': [event: FocusEvent]
}>()
</script>

<template>
  <PaInput
    :model-value="modelValue"
    :disabled="disabled"
    :error="error"
    :placeholder="placeholder || 'YYYY-MM-DD'"
    :label="label"
    :helper-text="helperText"
    :error-message="errorMessage"
    type="date"
    :min="min"
    :max="max"
    @update:model-value="emit('update:modelValue', $event)"
    @focus="emit('focus', $event)"
    @blur="emit('blur', $event)"
  />
</template>`,
  'paphonenumberinputgroup': `<script setup lang="ts">
import { ref } from 'vue'
import PaInput from '../PaInput/PaInput.vue'

const props = defineProps<{
  modelValue?: string
  countryCode?: string
  disabled?: boolean
  error?: boolean
  placeholder?: string
  label?: string
  helperText?: string
  errorMessage?: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
  'focus': [event: FocusEvent]
  'blur': [event: FocusEvent]
}>()

const countryCodeValue = ref(props.countryCode || '+1')

const formatPhoneNumber = (value: string): string => {
  const cleaned = value.replace(/\\D/g, '')
  if (cleaned.length <= 3) return cleaned
  if (cleaned.length <= 6) return \`(\${cleaned.slice(0, 3)}) \${cleaned.slice(3)}\`
  return \`(\${cleaned.slice(0, 3)}) \${cleaned.slice(3, 6)}-\${cleaned.slice(6, 10)}\`
}

const handleInput = (value: string | number) => {
  const strValue = String(value).replace(/\\D/g, '')
  emit('update:modelValue', strValue)
}
</script>

<template>
  <div class="pa-phone-number-input-group">
    <div class="pa-phone-number-input-group-wrapper">
      <PaInput
        :model-value="countryCodeValue"
        :disabled="disabled"
        class="pa-phone-number-input-group-country-code"
        @update:model-value="countryCodeValue = $event"
      />
      <PaInput
        :model-value="formatPhoneNumber(modelValue || '')"
        :disabled="disabled"
        :error="error"
        :placeholder="placeholder || '(555) 123-4567'"
        :label="label"
        :helper-text="helperText"
        :error-message="errorMessage"
        type="tel"
        @update:model-value="handleInput"
        @focus="emit('focus', $event)"
        @blur="emit('blur', $event)"
      />
    </div>
  </div>
</template>`,
  'patoggleinputgroup': `<script setup lang="ts">
import PaSwitch from '../PaSwitch/PaSwitch.vue'

interface ToggleOption {
  label: string
  value: string | number
  disabled?: boolean
}

const props = defineProps<{
  modelValue?: Array<string | number>
  options: ToggleOption[]
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  direction?: 'horizontal' | 'vertical'
}>()

const emit = defineEmits<{
  'update:modelValue': [value: Array<string | number>]
  'change': [value: Array<string | number>]
}>()

const handleChange = (value: boolean, optionValue: string | number) => {
  const currentValue = props.modelValue || []
  let newValue: Array<string | number>
  
  if (value) {
    newValue = [...currentValue, optionValue]
  } else {
    newValue = currentValue.filter(v => v !== optionValue)
  }
  
  emit('update:modelValue', newValue)
  emit('change', newValue)
}
</script>

<template>
  <div
    :class="[
      'pa-toggle-input-group',
      \`pa-toggle-input-group--\${direction || 'horizontal'}\`
    ]"
    role="group"
  >
    <PaSwitch
      v-for="option in options"
      :key="String(option.value)"
      :model-value="(modelValue || []).includes(option.value)"
      :size="size"
      :disabled="disabled || option.disabled"
      :label="option.label"
      @update:model-value="handleChange($event, option.value)"
    />
  </div>
</template>`,
  'paoptionalgroup': `<script setup lang="ts">
defineProps<{
  label?: string
  optional?: boolean
}>()
</script>

<template>
  <div class="pa-optional-group">
    <div v-if="label" class="pa-optional-group-header">
      <label class="pa-optional-group-label">{{ label }}</label>
      <span v-if="optional" class="pa-optional-group-badge">Optional</span>
    </div>
    <div class="pa-optional-group-content">
      <slot />
    </div>
  </div>
</template>`,
  'paheroheader': `<script setup lang="ts">
defineProps<{
  title?: string
  size?: 'sm' | 'md' | 'lg'
}>()
</script>

<template>
  <h1
    :class="[
      'pa-hero-header',
      \`pa-hero-header--\${size || 'md'}\`
    ]"
  >
    <slot>{{ title }}</slot>
  </h1>
</template>`,
  'paheroicon': `<script setup lang="ts">
defineProps<{
  size?: 'sm' | 'md' | 'lg'
  color?: string
}>()
</script>

<template>
  <div
    :class="[
      'pa-hero-icon',
      \`pa-hero-icon--\${size || 'md'}\`
    ]"
    :style="color ? { color } : undefined"
  >
    <slot />
  </div>
</template>`,
  'paherosubheader': `<script setup lang="ts">
defineProps<{
  text?: string
  size?: 'sm' | 'md' | 'lg'
}>()
</script>

<template>
  <p
    :class="[
      'pa-hero-subheader',
      \`pa-hero-subheader--\${size || 'md'}\`
    ]"
  >
    <slot>{{ text }}</slot>
  </p>
</template>`,
  'paherosubheadergroup': `<script setup lang="ts">
defineProps<{
  gap?: 'sm' | 'md' | 'lg'
}>()
</script>

<template>
  <div
    :class="[
      'pa-hero-subheader-group',
      \`pa-hero-subheader-group--gap-\${gap || 'md'}\`
    ]"
  >
    <slot />
  </div>
</template>`,
  'paformdivider': `<script setup lang="ts">
defineProps<{
  label?: string
  spacing?: 'sm' | 'md' | 'lg'
}>()
</script>

<template>
  <div
    :class="[
      'pa-form-divider',
      \`pa-form-divider--spacing-\${spacing || 'md'}\`
    ]"
  >
    <hr class="pa-form-divider-line" />
    <span v-if="label" class="pa-form-divider-label">{{ label }}</span>
  </div>
</template>`,
  'papagedivider': `<script setup lang="ts">
defineProps<{
  label?: string
  spacing?: 'sm' | 'md' | 'lg'
}>()
</script>

<template>
  <div
    :class="[
      'pa-page-divider',
      \`pa-page-divider--spacing-\${spacing || 'md'}\`
    ]"
  >
    <hr class="pa-page-divider-line" />
    <span v-if="label" class="pa-page-divider-label">{{ label }}</span>
  </div>
</template>`,
  'patextcontainer': `<script setup lang="ts">
defineProps<{
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  padding?: 'sm' | 'md' | 'lg'
}>()
</script>

<template>
  <div
    :class="[
      'pa-text-container',
      \`pa-text-container--max-width-\${maxWidth || 'md'}\`,
      \`pa-text-container--padding-\${padding || 'md'}\`
    ]"
  >
    <slot />
  </div>
</template>`,
  'patextdivider': `<script setup lang="ts">
defineProps<{
  spacing?: 'sm' | 'md' | 'lg'
}>()
</script>

<template>
  <hr
    :class="[
      'pa-text-divider',
      \`pa-text-divider--spacing-\${spacing || 'md'}\`
    ]"
  />
</template>`,
  'paslottedlayout': `<script setup lang="ts">
defineProps<{
  direction?: 'horizontal' | 'vertical'
  gap?: 'sm' | 'md' | 'lg'
}>()
</script>

<template>
  <div
    :class="[
      'pa-slotted-layout',
      \`pa-slotted-layout--\${direction || 'horizontal'}\`,
      \`pa-slotted-layout--gap-\${gap || 'md'}\`
    ]"
  >
    <slot />
  </div>
</template>`,
  'paslottedlayoutheader': `<script setup lang="ts">
defineProps<{
  title?: string
  align?: 'left' | 'center' | 'right'
}>()
</script>

<template>
  <div
    :class="[
      'pa-slotted-layout-header',
      \`pa-slotted-layout-header--align-\${align || 'left'}\`
    ]"
  >
    <h2 v-if="title" class="pa-slotted-layout-header-title">{{ title }}</h2>
    <slot />
  </div>
</template>`,
  'pacircle': `<script setup lang="ts">
defineProps<{
  size?: number | string
  color?: string
}>()
</script>

<template>
  <div
    class="pa-circle"
    :style="{
      width: typeof size === 'number' ? \`\${size}px\` : size || 'var(--pa-circle-size-default, 48px)',
      height: typeof size === 'number' ? \`\${size}px\` : size || 'var(--pa-circle-size-default, 48px)',
      backgroundColor: color || 'var(--pa-circle-background, var(--pa-color-surface-container-background))'
    }"
  >
    <slot />
  </div>
</template>`,
  'pacolorpicker': `<script setup lang="ts">
const props = defineProps<{
  modelValue?: string
  disabled?: boolean
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
  'change': [value: string]
}>()

const handleChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.value)
  emit('change', target.value)
}
</script>

<template>
  <div class="pa-color-picker">
    <input
      type="color"
      :value="modelValue || '#000000'"
      :disabled="disabled"
      class="pa-color-picker-input"
      @input="handleChange"
    />
  </div>
</template>`,
  'padivider': `<script setup lang="ts">
defineProps<{
  orientation?: 'horizontal' | 'vertical'
  spacing?: 'sm' | 'md' | 'lg'
}>()
</script>

<template>
  <hr
    :class="[
      'pa-divider',
      \`pa-divider--\${orientation || 'horizontal'}\`,
      \`pa-divider--spacing-\${spacing || 'md'}\`
    ]"
  />
</template>`,
  'paicon': `<script setup lang="ts">
defineProps<{
  size?: 'sm' | 'md' | 'lg' | 'xl'
  color?: string
  name?: string
}>()
</script>

<template>
  <span
    :class="[
      'pa-icon',
      \`pa-icon--\${size || 'md'}\`
    ]"
    :style="color ? { color } : undefined"
    role="img"
    :aria-label="name"
  >
    <slot />
  </span>
</template>`,
  'panavbutton': `<script setup lang="ts">
import PaButton from '../PaButton/PaButton.vue'

defineProps<{
  to?: string
  href?: string
  active?: boolean
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
}>()
</script>

<template>
  <component
    :is="to || href ? 'a' : 'button'"
    :href="href"
    :to="to"
    :class="[
      'pa-nav-button',
      \`pa-nav-button--\${size || 'md'}\`,
      {
        'is-active': active,
        'is-disabled': disabled
      }
    ]"
    :disabled="disabled"
  >
    <slot />
  </component>
</template>`,
  'panavbuttongroup': `<script setup lang="ts">
defineProps<{
  direction?: 'horizontal' | 'vertical'
  gap?: 'sm' | 'md' | 'lg'
}>()
</script>

<template>
  <nav
    :class="[
      'pa-nav-button-group',
      \`pa-nav-button-group--\${direction || 'horizontal'}\`,
      \`pa-nav-button-group--gap-\${gap || 'md'}\`
    ]"
    role="navigation"
  >
    <slot />
  </nav>
</template>`,
  'pasheet': `<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'

const props = defineProps<{
  modelValue: boolean
  placement?: 'left' | 'right' | 'top' | 'bottom'
  size?: 'sm' | 'md' | 'lg' | 'full'
  closeOnOverlay?: boolean
}>()

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  'close': []
}>()

const close = () => {
  emit('update:modelValue', false)
  emit('close')
}

const handleOverlayClick = (event: MouseEvent) => {
  if (props.closeOnOverlay && (event.target as HTMLElement).classList.contains('pa-sheet-overlay')) {
    close()
  }
}

const handleEscape = (event: KeyboardEvent) => {
  if (event.key === 'Escape' && props.modelValue) {
    close()
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleEscape)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleEscape)
})
</script>

<template>
  <Teleport to="body">
    <Transition name="pa-sheet">
      <div
        v-if="modelValue"
        class="pa-sheet-overlay"
        @click="handleOverlayClick"
      >
        <div
          :class="[
            'pa-sheet',
            \`pa-sheet--\${placement || 'right'}\`,
            \`pa-sheet--\${size || 'md'}\`
          ]"
          @click.stop
        >
          <slot />
        </div>
      </div>
    </Transition>
  </Teleport>
</template>`,
  'pasquare': `<script setup lang="ts">
defineProps<{
  size?: number | string
  color?: string
}>()
</script>

<template>
  <div
    class="pa-square"
    :style="{
      width: typeof size === 'number' ? \`\${size}px\` : size || 'var(--pa-square-size-default, 48px)',
      height: typeof size === 'number' ? \`\${size}px\` : size || 'var(--pa-square-size-default, 48px)',
      backgroundColor: color || 'var(--pa-square-background, var(--pa-color-surface-container-background))'
    }"
  >
    <slot />
  </div>
</template>`,
  'patoggle': `<script setup lang="ts">
import PaSwitch from '../PaSwitch/PaSwitch.vue'

defineProps<{
  modelValue?: boolean
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  label?: string
}>()

defineEmits<{
  'update:modelValue': [value: boolean]
  'change': [value: boolean]
}>()
</script>

<template>
  <PaSwitch
    :model-value="modelValue"
    :size="size"
    :disabled="disabled"
    :label="label"
    @update:model-value="$emit('update:modelValue', $event)"
    @change="$emit('change', $event)"
  />
</template>`,
  'pasettingspanel': `<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { PaSettingsSection } from '../PaSettingsSection'
import { PaSettingsRadioGroup } from '../PaSettingsRadioGroup'
import { PaSettingsToggleList } from '../PaSettingsToggleList'
import { PaTimePeriodSelector } from '../PaTimePeriodSelector'
import { PaSegmentedControl } from '../PaSegmentedControl'
import { PaInput } from '../PaInput'
import type { SettingsSectionConfig } from './types'

interface Props {
  sections: SettingsSectionConfig[]
  multiple?: boolean
  defaultOpenSections?: string[]
  modelValue?: Record<string, any>
}

const props = withDefaults(defineProps<Props>(), {
  multiple: true,
  defaultOpenSections: () => []
})

const emit = defineEmits<{
  'update:modelValue': [value: Record<string, any>]
  'section-toggle': [sectionId: string, enabled: boolean]
  'section-expand': [sectionId: string, expanded: boolean]
}>()

const openSections = ref<Set<string>>(new Set(props.defaultOpenSections))
const sectionValues = ref<Record<string, any>>(props.modelValue || {})
const sectionEnabled = ref<Record<string, boolean>>({})

const initializeSections = () => {
  props.sections.forEach(section => {
    if (section.defaultOpen) {
      openSections.value.add(section.id)
    }
    if (section.defaultEnabled !== undefined) {
      sectionEnabled.value[section.id] = section.defaultEnabled
    } else if (section.enabled !== undefined) {
      sectionEnabled.value[section.id] = section.enabled
    } else {
      sectionEnabled.value[section.id] = true
    }
    
    if (section.type === 'radio' && section.radioOptions) {
      sectionValues.value[section.id] = section.radioOptions[0]?.value
    } else if (section.type === 'segmented' && section.segmentedOptions) {
      sectionValues.value[section.id] = section.segmentedOptions[0]?.value
    } else if (section.type === 'time-period') {
      sectionValues.value[section.id] = { value: 7, unit: 'day' }
    }
  })
}

initializeSections()

watch(() => props.modelValue, (newVal) => {
  if (newVal) {
    sectionValues.value = { ...newVal }
  }
}, { deep: true })

const toggleSection = (sectionId: string) => {
  if (!props.multiple) {
    if (openSections.value.has(sectionId)) {
      openSections.value.clear()
    } else {
      openSections.value.clear()
      openSections.value.add(sectionId)
    }
  } else {
    if (openSections.value.has(sectionId)) {
      openSections.value.delete(sectionId)
    } else {
      openSections.value.add(sectionId)
    }
  }
  emit('section-expand', sectionId, openSections.value.has(sectionId))
}

const toggleEnabled = (sectionId: string, enabled: boolean) => {
  sectionEnabled.value[sectionId] = enabled
  emit('section-toggle', sectionId, enabled)
}

const updateSectionValue = (sectionId: string, value: any) => {
  sectionValues.value[sectionId] = value
  emit('update:modelValue', { ...sectionValues.value })
}

const renderSectionContent = (section: SettingsSectionConfig) => {
  if (section.type === 'radio' && section.radioOptions) {
    return {
      component: PaSettingsRadioGroup,
      props: {
        modelValue: sectionValues.value[section.id],
        options: section.radioOptions,
        disabled: !sectionEnabled.value[section.id]
      },
      on: {
        'update:modelValue': (value: string | number) => updateSectionValue(section.id, value)
      }
    }
  }
  
  if (section.type === 'segmented' && section.segmentedOptions) {
    return {
      component: PaSegmentedControl,
      props: {
        modelValue: sectionValues.value[section.id],
        options: section.segmentedOptions,
        disabled: !sectionEnabled.value[section.id]
      },
      on: {
        'update:modelValue': (value: string | number) => updateSectionValue(section.id, value)
      }
    }
  }
  
  if (section.type === 'toggle' && section.toggleOptions) {
    return {
      component: PaSettingsToggleList,
      props: {
        options: section.toggleOptions,
        disabled: !sectionEnabled.value[section.id]
      }
    }
  }
  
  if (section.type === 'input') {
    return {
      component: PaInput,
      props: {
        modelValue: sectionValues.value[section.id] || '',
        placeholder: section.inputPlaceholder,
        type: section.inputType || 'text',
        disabled: !sectionEnabled.value[section.id]
      },
      on: {
        'update:modelValue': (value: string | number) => updateSectionValue(section.id, value)
      }
    }
  }
  
  if (section.type === 'time-period') {
    const defaultOptions = section.timePeriodOptions || [
      { value: 7, unit: 'day' },
      { value: 15, unit: 'day' },
      { value: 30, unit: 'day' },
      { value: 90, unit: 'day' }
    ]
    return {
      component: PaTimePeriodSelector,
      props: {
        modelValue: sectionValues.value[section.id] || { value: 7, unit: 'day' },
        options: defaultOptions,
        disabled: !sectionEnabled.value[section.id]
      },
      on: {
        'update:modelValue': (value: { value: number; unit: 'day' | 'week' | 'month' }) => updateSectionValue(section.id, value)
      }
    }
  }
  
  return null
}
</script>

<template>
  <div class="pa-settings-panel">
    <PaSettingsSection
      v-for="section in sections"
      :key="section.id"
      :icon="section.icon"
      :title="section.title"
      :description="section.description"
      :model-value="openSections.has(section.id)"
      :enabled="sectionEnabled[section.id] ?? true"
      :show-toggle="section.showToggle !== false"
      :disabled="section.disabled"
      @update:model-value="toggleSection(section.id)"
      @update:enabled="toggleEnabled(section.id, $event)"
    >
      <template v-if="$slots[\`section-\${section.id}\`]" #default>
        <slot :name="\`section-\${section.id}\`" :section="section" :value="sectionValues[section.id]" :enabled="sectionEnabled[section.id]" />
      </template>
      <template v-else-if="renderSectionContent(section)">
        <component
          :is="renderSectionContent(section)!.component"
          v-bind="renderSectionContent(section)!.props"
          v-on="renderSectionContent(section)!.on"
        />
      </template>
      <template v-else>
        <slot name="default" :section="section" :value="sectionValues[section.id]" :enabled="sectionEnabled[section.id]" />
      </template>
    </PaSettingsSection>
  </div>
</template>

<style lang="scss" scoped>
.pa-settings-panel {
  display: flex;
  flex-direction: column;
  gap: var(--pa-settings-panel-gap, var(--pa-spacing-200, 18px));
  width: 100%;
}
</style>`
}

export const getComponentSourceCode = (componentId: string): string => {
  return componentSourceCode[componentId] || ''
}

