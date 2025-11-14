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
  background-color: var(--pa-time-picker-background-default);
  color: var(--pa-time-picker-text-default);
  border: var(--pa-time-picker-border-width-default) solid var(--pa-time-picker-border-default);
  border-radius: var(--pa-time-picker-border-radius-default);
  font-family: var(--pa-font-family-roboto, Roboto, sans-serif);
  font-weight: var(--pa-font-weight-regular);
  transition: all var(--pa-time-picker-transition-duration-default) var(--pa-time-picker-transition-easing-default);
  outline: none;
  cursor: inherit;

  &::placeholder {
    color: var(--pa-time-picker-text-placeholder);
  }

  .pa-time-picker--sm & {
    padding: var(--pa-time-picker-size-sm-padding-y) var(--pa-time-picker-size-sm-padding-x);
    padding-right: calc(var(--pa-time-picker-size-sm-padding-x) + var(--pa-time-picker-icon-size));
    font-size: var(--pa-time-picker-size-sm-font);
  }

  .pa-time-picker--md & {
    padding: var(--pa-time-picker-size-md-padding-y) var(--pa-time-picker-size-md-padding-x);
    padding-right: calc(var(--pa-time-picker-size-md-padding-x) + var(--pa-time-picker-icon-size));
    font-size: var(--pa-time-picker-size-md-font);
  }

  .pa-time-picker--lg & {
    padding: var(--pa-time-picker-size-lg-padding-y) var(--pa-time-picker-size-lg-padding-x);
    padding-right: calc(var(--pa-time-picker-size-lg-padding-x) + var(--pa-time-picker-icon-size));
    font-size: var(--pa-time-picker-size-lg-font);
  }

  &:hover:not(.is-disabled) {
    background-color: var(--pa-time-picker-background-hover);
    border-color: var(--pa-time-picker-border-hover);
  }

  .pa-time-picker.is-open & {
    background-color: var(--pa-time-picker-background-focus);
    border-color: var(--pa-time-picker-border-focus);
    outline: var(--pa-time-picker-outline-width-default) solid var(--pa-time-picker-border-focus);
    outline-offset: var(--pa-time-picker-outline-offset-default);
  }

  &.is-error {
    border-color: var(--pa-time-picker-border-error);
  }

  &.is-disabled {
    background-color: var(--pa-time-picker-background-disabled);
    color: var(--pa-time-picker-text-disabled);
    border-color: var(--pa-time-picker-border-disabled);
    cursor: var(--pa-cursor-not-allowed);
    opacity: calc(var(--pa-opacity-60) / 100);
  }
}

.pa-time-picker-icon {
  position: absolute;
  right: var(--pa-time-picker-icon-spacing-right);
  display: flex;
  align-items: center;
  justify-content: center;
  width: var(--pa-time-picker-icon-size);
  height: var(--pa-time-picker-icon-size);
  color: var(--pa-color-input-icon-default);
  pointer-events: none;

  svg {
    width: var(--pa-time-picker-icon-size);
    height: var(--pa-time-picker-icon-size);
  }
}

.pa-time-picker-panel {
  position: absolute;
  top: 100%;
  left: 0;
  margin-top: var(--pa-time-picker-panel-spacing-top);
  background-color: var(--pa-time-picker-panel-background);
  border: var(--pa-time-picker-border-width-default) solid var(--pa-time-picker-panel-border);
  border-radius: var(--pa-time-picker-panel-border-radius);
  box-shadow: var(--pa-time-picker-panel-shadow);
  z-index: var(--pa-time-picker-panel-z-index);
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
  border-right: var(--pa-time-picker-border-width-default) solid var(--pa-color-surface-base-divider);

  &:last-child {
    border-right: none;
  }
}

.pa-time-picker-column-label {
  padding: var(--pa-time-picker-column-label-padding);
  text-align: center;
  font-family: var(--pa-font-family-roboto, Roboto, sans-serif);
  font-size: var(--pa-time-picker-column-label-font-size);
  font-weight: var(--pa-time-picker-column-label-font-weight);
  color: var(--pa-color-surface-container-icon);
  border-bottom: var(--pa-time-picker-border-width-default) solid var(--pa-color-surface-base-divider);
}

.pa-time-picker-list {
  max-height: 250px;
  overflow-y: auto;
}

.pa-time-picker-item {
  padding: var(--pa-time-picker-time-item-padding);
  text-align: center;
  background-color: var(--pa-time-picker-time-item-background-default);
  color: var(--pa-time-picker-time-item-text-default);
  cursor: var(--pa-cursor-pointer);
  transition: all var(--pa-time-picker-transition-duration-default) var(--pa-time-picker-transition-easing-default);
  font-family: var(--pa-font-family-roboto, Roboto, sans-serif);
  font-size: var(--pa-time-picker-time-item-font-size);
  font-weight: var(--pa-time-picker-time-item-font-weight);

  &:hover {
    background-color: var(--pa-time-picker-time-item-background-hover);
  }

  &.is-selected {
    background-color: var(--pa-time-picker-time-item-background-selected);
    color: var(--pa-time-picker-time-item-text-selected);
  }
}

.pa-time-picker-panel-enter-active,
.pa-time-picker-panel-leave-active {
  transition: opacity var(--pa-time-picker-transition-duration-fast) var(--pa-time-picker-transition-easing-default),
    transform var(--pa-time-picker-transition-duration-fast) var(--pa-time-picker-transition-easing-default);
}

.pa-time-picker-panel-enter-from,
.pa-time-picker-panel-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}
</style>

