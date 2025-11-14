<script setup lang="ts">
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
  
  textareaRef.value.style.height = `${Math.max(scrollHeight, minHeight)}px`
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
      `pa-textarea-wrapper--${size || 'md'}`,
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
        `pa-textarea--${size || 'md'}`,
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
</template>

<style lang="scss" scoped>
.pa-textarea-wrapper {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
}

.pa-textarea {
  width: 100%;
  background-color: var(--pa-textarea-background-default);
  color: var(--pa-textarea-text-default);
  border: var(--pa-textarea-border-width-default) solid var(--pa-textarea-border-default);
  border-radius: var(--pa-textarea-border-radius-default);
  font-family: var(--pa-font-family-roboto, Roboto, sans-serif);
  font-weight: var(--pa-font-weight-regular);
  line-height: var(--pa-line-height-200);
  resize: vertical;
  transition: all var(--pa-textarea-transition-duration-default) var(--pa-textarea-transition-easing-default);
  outline: none;

  &::placeholder {
    color: var(--pa-textarea-text-placeholder);
  }

  .pa-textarea-wrapper--sm & {
    padding: var(--pa-textarea-size-sm-padding-y) var(--pa-textarea-size-sm-padding-x);
    font-size: var(--pa-textarea-size-sm-font);
    min-height: var(--pa-textarea-size-sm-min-height);
  }

  .pa-textarea-wrapper--md & {
    padding: var(--pa-textarea-size-md-padding-y) var(--pa-textarea-size-md-padding-x);
    font-size: var(--pa-textarea-size-md-font);
    min-height: var(--pa-textarea-size-md-min-height);
  }

  .pa-textarea-wrapper--lg & {
    padding: var(--pa-textarea-size-lg-padding-y) var(--pa-textarea-size-lg-padding-x);
    font-size: var(--pa-textarea-size-lg-font);
    min-height: var(--pa-textarea-size-lg-min-height);
  }

  &:hover:not(.is-disabled) {
    background-color: var(--pa-textarea-background-hover);
    border-color: var(--pa-textarea-border-hover);
  }

  &:focus:not(.is-disabled) {
    background-color: var(--pa-textarea-background-focus);
    border-color: var(--pa-textarea-border-focus);
    outline: var(--pa-textarea-outline-width-default) solid var(--pa-textarea-border-focus);
    outline-offset: var(--pa-textarea-outline-offset-default);
  }

  &.is-error {
    border-color: var(--pa-textarea-border-error);
  }

  &.is-disabled {
    background-color: var(--pa-textarea-background-disabled);
    color: var(--pa-textarea-text-disabled);
    border-color: var(--pa-textarea-border-disabled);
    cursor: var(--pa-cursor-not-allowed);
    opacity: calc(var(--pa-opacity-60) / 100);
    resize: none;
  }
}

.pa-textarea-counter {
  margin-top: var(--pa-textarea-counter-spacing-top);
  text-align: right;
  font-family: var(--pa-font-family-roboto, Roboto, sans-serif);
  font-size: var(--pa-textarea-counter-font-size);
  color: var(--pa-textarea-counter-text);

  &.is-over-limit {
    color: var(--pa-textarea-counter-error-color);
  }
}
</style>

