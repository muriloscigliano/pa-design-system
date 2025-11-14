import type { Component } from 'vue'

export interface SettingsSectionConfig {
  id: string
  icon?: string | Component
  title: string
  description?: string
  defaultOpen?: boolean
  defaultEnabled?: boolean
  enabled?: boolean
  showToggle?: boolean
  disabled?: boolean
  type?: 'radio' | 'segmented' | 'toggle' | 'input' | 'time-period' | 'custom'
  inputPlaceholder?: string
  inputType?: 'text' | 'number' | 'date'
  radioOptions?: Array<{ label: string; value: string | number; disabled?: boolean }>
  segmentedOptions?: Array<{ label: string; value: string | number; disabled?: boolean }>
  toggleOptions?: Array<{ label: string; value: string; checked?: boolean }>
  timePeriodOptions?: Array<{ value: number; unit: 'day' | 'week' | 'month' }>
  nestedControls?: {
    triggerValue: string | number
    type: 'segmented' | 'radio' | 'time-period'
    options: Array<{ label: string; value: string | number }>
  }
  conditionalContent?: {
    when: string | number
    component: 'input' | 'time-period' | 'dropdown'
    props?: Record<string, any>
  }
}

