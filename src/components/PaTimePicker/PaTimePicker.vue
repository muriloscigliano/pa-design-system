<script setup lang="ts">
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
      return `${String(hour12).padStart(2, '0')}:${minutes || '00'}:${seconds} ${ampm}`
    }
    return `${String(hour12).padStart(2, '0')}:${minutes || '00'} ${ampm}`
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
    ? `${String(hour24).padStart(2, '0')}:${selectedMinute.value}:${selectedSecond.value}`
    : `${String(hour24).padStart(2, '0')}:${selectedMinute.value}`
  
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
      `pa-time-picker--${size || 'md'}`,
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
          `pa-time-picker-input-field--${size || 'md'}`,
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
</template>

<style lang="scss" scoped>
.pa-time-picker {
  position: relative;
  display: inline-flex;
  flex-direction: column;
  width: 100%;
}

.pa-time-picker-input {
  position: relative;
  display: flex;
  align-items: center;
  cursor: var(--pa-cursor-pointer, pointer);
}

.pa-time-picker-input-field {
  width: 100%;
  background-color: var(--pa-time-picker-background-default, var(--pa-color-input-background-default));
  color: var(--pa-time-picker-text-default, var(--pa-color-input-text-default));
  border: var(--pa-time-picker-border-width-default, var(--pa-Border-width-50, 1px)) solid var(--pa-time-picker-border-default, var(--pa-color-input-border-default));
  border-radius: var(--pa-time-picker-border-radius-default, var(--pa-Border-radius-100, 8px));
  font-family: var(--pa-font-family-roboto, Roboto, sans-serif);
  font-weight: var(--pa-font-weight-400, 400);
  transition: all var(--pa-time-picker-transition-duration-default, var(--pa-transition-duration-default, 200ms)) var(--pa-time-picker-transition-easing-default, var(--pa-transition-easing-default, ease));
  outline: none;
  cursor: inherit;

  &::placeholder {
    color: var(--pa-time-picker-text-placeholder, var(--pa-color-input-text-placeholder));
  }

  .pa-time-picker--sm & {
    padding: var(--pa-time-picker-size-sm-padding-y) var(--pa-time-picker-size-sm-padding-x);
    padding-right: calc(var(--pa-time-picker-size-sm-padding-x, var(--pa-spacing-12, 12px)) + var(--pa-icon-size-md, var(--pa-icon-size-200, 24px)));
    font-size: var(--pa-time-picker-size-sm-font, var(--pa-font-size-100, 14px));
  }

  .pa-time-picker--md & {
    padding: var(--pa-time-picker-size-md-padding-y) var(--pa-time-picker-size-md-padding-x);
    padding-right: calc(var(--pa-time-picker-size-md-padding-x, var(--pa-spacing-16, 16px)) + var(--pa-icon-size-md, var(--pa-icon-size-200, 24px)));
    font-size: var(--pa-time-picker-size-md-font, var(--pa-font-size-200, 16px));
  }

  .pa-time-picker--lg & {
    padding: var(--pa-time-picker-size-lg-padding-y) var(--pa-time-picker-size-lg-padding-x);
    padding-right: calc(var(--pa-time-picker-size-lg-padding-x, var(--pa-spacing-24, 24px)) + var(--pa-icon-size-md, var(--pa-icon-size-200, 24px)));
    font-size: var(--pa-time-picker-size-lg-font, var(--pa-font-size-400, 20px));
  }

  &:hover:not(.is-disabled) {
    background-color: var(--pa-time-picker-background-hover, var(--pa-color-input-background-hover));
    border-color: var(--pa-time-picker-border-hover, var(--pa-color-input-border-hover));
  }

  .pa-time-picker.is-open & {
    background-color: var(--pa-time-picker-background-focus, var(--pa-color-input-background-focus));
    border-color: var(--pa-time-picker-border-focus, var(--pa-color-input-border-focus));
    outline: var(--pa-time-picker-outline-width-default, var(--pa-outline-width-default, 2px)) solid var(--pa-time-picker-border-focus, var(--pa-color-input-border-focus));
    outline-offset: var(--pa-time-picker-outline-offset-default, var(--pa-outline-offset-default, 2px));
  }

  &.is-error {
    border-color: var(--pa-time-picker-border-error, var(--pa-color-input-border-error));
  }

  &.is-disabled {
    background-color: var(--pa-time-picker-background-disabled, var(--pa-color-input-background-disabled));
    color: var(--pa-time-picker-text-disabled, var(--pa-color-input-text-disabled));
    border-color: var(--pa-time-picker-border-disabled, var(--pa-color-input-border-disabled));
    cursor: var(--pa-cursor-not-allowed, not-allowed);
    opacity: calc(var(--pa-opacity-60, 60) / 100);
  }
}

.pa-time-picker-icon {
  position: absolute;
  right: var(--pa-spacing-12, 12px);
  display: flex;
  align-items: center;
  justify-content: center;
  width: var(--pa-icon-size-xs, var(--pa-icon-size-150, 20px));
  height: var(--pa-icon-size-xs, var(--pa-icon-size-150, 20px));
  color: var(--pa-color-input-icon-default);
  pointer-events: none;

  svg {
    width: var(--pa-icon-size-sm, var(--pa-icon-size-100, 16px));
    height: var(--pa-icon-size-sm, var(--pa-icon-size-100, 16px));
  }
}

.pa-time-picker-panel {
  position: absolute;
  top: 100%;
  left: 0;
  margin-top: var(--pa-spacing-4, 4px);
  background-color: var(--pa-time-picker-panel-background, var(--pa-color-surface-container-background));
  border: 1px solid var(--pa-time-picker-panel-border, var(--pa-color-surface-container-border));
  border-radius: var(--pa-time-picker-border-radius-default, var(--pa-Border-radius-100, 8px));
  box-shadow: var(--pa-time-picker-panel-shadow, var(--pa-shadow-md));
  z-index: var(--pa-time-picker-panel-z-index, var(--pa-z-index-400, 400));
  min-width: 200px;
  max-height: 300px;
  overflow: hidden;
}

.pa-time-picker-scroll {
  display: flex;
  max-height: 300px;
  overflow-y: auto;
}

.pa-time-picker-column {
  flex: 1;
  min-width: 60px;
  border-right: 1px solid var(--pa-color-surface-base-divider, var(--pa-gray-200, #e9ecef));

  &:last-child {
    border-right: none;
  }
}

.pa-time-picker-column-label {
  padding: var(--pa-spacing-8, 8px);
  text-align: center;
  font-family: var(--pa-font-family-roboto, Roboto, sans-serif);
  font-size: var(--pa-font-size-100, 14px);
  font-weight: var(--pa-font-weight-600, 600);
  color: var(--pa-gray-500, #adb5bd);
  border-bottom: 1px solid var(--pa-color-surface-base-divider, var(--pa-gray-200, #e9ecef));
}

.pa-time-picker-list {
  max-height: 250px;
  overflow-y: auto;
}

.pa-time-picker-item {
  padding: var(--pa-spacing-8, 8px);
  text-align: center;
  background-color: var(--pa-time-picker-time-item-background-default, transparent);
  color: var(--pa-time-picker-time-item-text-default, var(--pa-color-surface-container-text));
  cursor: var(--pa-cursor-pointer, pointer);
  transition: all var(--pa-time-picker-transition-duration-default, var(--pa-transition-duration-default, 200ms)) var(--pa-time-picker-transition-easing-default, var(--pa-transition-easing-default, ease));
  font-family: var(--pa-font-family-roboto, Roboto, sans-serif);
  font-size: var(--pa-font-size-200, 16px);
  font-weight: var(--pa-font-weight-400, 400);

  &:hover {
    background-color: var(--pa-time-picker-time-item-background-hover, var(--pa-color-surface-cards-hover-background));
  }

  &.is-selected {
    background-color: var(--pa-time-picker-time-item-background-selected, var(--pa-color-action-primary-background-default));
    color: var(--pa-time-picker-time-item-text-selected, var(--pa-color-action-primary-text-default));
  }
}

.pa-time-picker-panel-enter-active,
.pa-time-picker-panel-leave-active {
  transition: opacity var(--pa-transition-duration-fast, 100ms) var(--pa-transition-easing-default, ease),
    transform var(--pa-transition-duration-fast, 100ms) var(--pa-transition-easing-default, ease);
}

.pa-time-picker-panel-enter-from,
.pa-time-picker-panel-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}
</style>

