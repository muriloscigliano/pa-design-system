<script setup lang="ts">
import { ref, watch } from 'vue'
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
    } else if (section.type === 'toggle' && section.toggleOptions) {
      sectionValues.value[section.id] = section.toggleOptions.map(opt => ({ ...opt }))
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
    const currentValue = sectionValues.value[section.id]
    const optionsToUse = Array.isArray(currentValue)
      ? currentValue 
      : section.toggleOptions.map(opt => ({ ...opt }))
    return {
      component: PaSettingsToggleList,
      props: {
        modelValue: optionsToUse,
        disabled: !sectionEnabled.value[section.id]
      },
      on: {
        'update:modelValue': (options: Array<{ label: string; value: string; checked?: boolean }>) => updateSectionValue(section.id, options)
      }
    }
  }
  
  if (section.type === 'input') {
    return {
      component: PaInput,
      props: {
        modelValue: sectionValues.value[section.id] || '',
        label: section.inputPlaceholder,
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
      :show-toggle="section.showToggle !== undefined ? section.showToggle : true"
      :disabled="section.disabled"
      @update:model-value="toggleSection(section.id)"
      @update:enabled="toggleEnabled(section.id, $event)"
    >
      <template #default>
        <template v-if="$slots[`section-${section.id}`]">
          <slot :name="`section-${section.id}`" :section="section" :value="sectionValues[section.id]" :enabled="sectionEnabled[section.id]" />
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
      </template>
    </PaSettingsSection>
  </div>
</template>

<style lang="scss" scoped>
.pa-settings-panel {
  display: flex;
  flex-direction: column;
  gap: var(--pa-settings-panel-gap);
  width: 100%;
}
</style>

