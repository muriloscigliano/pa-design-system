<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { PaSettingsPanel } from '../components'
import { CodeBlock } from '../components'
import { useCodeCopy } from '../composables/useCodeCopy'
import { getComponentSourceCode } from '../config/componentSourceCode'
import { getComponentTokens } from '../utils/tokenExtractor'
import { getComponentStyleSource } from '../config/componentStyleSource'
import type { SettingsSectionConfig } from '../components/PaSettingsPanel/types'

const { showCode, toggleShowCode } = useCodeCopy()
const activeTab = ref('basic')
const tokenSource = ref('')
const sectionTokenSource = ref('')
const panelValues = ref<Record<string, any>>({})

onMounted(async () => {
  tokenSource.value = await getComponentTokens('pasettingspanel')
  sectionTokenSource.value = await getComponentTokens('pasettingssection')
})

const basicSections: SettingsSectionConfig[] = [
  {
    id: 'yearly-discount',
    title: 'YEARLY DISCOUNT',
    description: 'Apply a discount for long-term plans, set a percentage or fixed amount.',
    type: 'input',
    inputPlaceholder: 'Discount',
    defaultOpen: true,
    defaultEnabled: true,
    showToggle: false
  },
  {
    id: 'yearly-increase',
    title: 'YEARLY INCREASE',
    description: 'Auto-increase subscription price annually.',
    type: 'input',
    inputPlaceholder: 'Increase',
    defaultEnabled: true,
    showToggle: false
  }
]

const radioSections: SettingsSectionConfig[] = [
  {
    id: 'frequency',
    title: 'FREQUENCY',
    description: 'Set how often this subscription renews.',
    type: 'radio',
    radioOptions: [
      { label: 'Weekly', value: 'weekly' },
      { label: 'Fortnightly', value: 'fortnightly' },
      { label: 'Monthly', value: 'monthly' }
    ],
    defaultOpen: true,
    defaultEnabled: true
  }
]

const segmentedSections: SettingsSectionConfig[] = [
  {
    id: 'start-condition',
    title: 'START CONDITION',
    description: 'Set when the subscription starts',
    type: 'segmented',
    segmentedOptions: [
      { label: 'IMMEDIATELY', value: 'immediately' },
      { label: 'CUSTOM', value: 'custom' },
      { label: 'FIXED', value: 'fixed' }
    ],
    defaultOpen: true,
    defaultEnabled: true
  }
]

const timePeriodSections: SettingsSectionConfig[] = [
  {
    id: 'free-trial',
    title: 'FREE TRIAL',
    description: 'Offer a trial period before billing begins.',
    type: 'time-period',
    timePeriodOptions: [
      { value: 7, unit: 'day' },
      { value: 15, unit: 'day' },
      { value: 30, unit: 'day' },
      { value: 90, unit: 'day' }
    ],
    defaultOpen: true,
    defaultEnabled: true
  }
]

const completeExample: SettingsSectionConfig[] = [
  {
    id: 'yearly-discount',
    title: 'YEARLY DISCOUNT',
    description: 'Apply a discount for long-term plans, set a percentage or fixed amount.',
    type: 'input',
    inputPlaceholder: 'Discount',
    defaultOpen: true,
    defaultEnabled: true,
    showToggle: false
  },
  {
    id: 'yearly-increase',
    title: 'YEARLY INCREASE',
    description: 'Auto-increase subscription price annually.',
    type: 'input',
    inputPlaceholder: 'Increase',
    defaultEnabled: true,
    showToggle: false
  },
  {
    id: 'frequency',
    title: 'FREQUENCY',
    description: 'Set how often this subscription renews.',
    type: 'radio',
    radioOptions: [
      { label: 'Weekly', value: 'weekly' },
      { label: 'Fortnightly', value: 'fortnightly' },
      { label: 'Monthly', value: 'monthly' }
    ],
    defaultEnabled: true
  },
  {
    id: 'free-trial',
    title: 'FREE TRIAL',
    description: 'Offer a trial period before billing begins.',
    type: 'time-period',
    timePeriodOptions: [
      { value: 7, unit: 'day' },
      { value: 15, unit: 'day' },
      { value: 30, unit: 'day' },
      { value: 90, unit: 'day' }
    ],
    defaultEnabled: true
  }
]

const getUsageCode = (tab: string): string => {
  const codes: Record<string, string> = {
    'basic': `import { PaSettingsPanel } from './components'
import type { SettingsSectionConfig } from './components/PaSettingsPanel/types'

const sections: SettingsSectionConfig[] = [
  {
    id: 'yearly-discount',
    title: 'YEARLY DISCOUNT',
    description: 'Apply a discount for long-term plans.',
    type: 'input',
    inputPlaceholder: 'Discount',
    defaultOpen: true,
    defaultEnabled: true
  }
]

<PaSettingsPanel :sections="sections" />`,
    'radio': `import { PaSettingsPanel } from './components'
import type { SettingsSectionConfig } from './components/PaSettingsPanel/types'

const sections: SettingsSectionConfig[] = [
  {
    id: 'frequency',
    title: 'FREQUENCY',
    description: 'Set how often this subscription renews.',
    type: 'radio',
    radioOptions: [
      { label: 'Weekly', value: 'weekly' },
      { label: 'Fortnightly', value: 'fortnightly' },
      { label: 'Monthly', value: 'monthly' }
    ],
    defaultOpen: true,
    defaultEnabled: true
  }
]

<PaSettingsPanel :sections="sections" />`,
    'segmented': `import { PaSettingsPanel } from './components'
import type { SettingsSectionConfig } from './components/PaSettingsPanel/types'

const sections: SettingsSectionConfig[] = [
  {
    id: 'start-condition',
    title: 'START CONDITION',
    description: 'Set when the subscription starts',
    type: 'segmented',
    segmentedOptions: [
      { label: 'IMMEDIATELY', value: 'immediately' },
      { label: 'CUSTOM', value: 'custom' },
      { label: 'FIXED', value: 'fixed' }
    ],
    defaultOpen: true,
    defaultEnabled: true
  }
]

<PaSettingsPanel :sections="sections" />`,
    'time-period': `import { PaSettingsPanel } from './components'
import type { SettingsSectionConfig } from './components/PaSettingsPanel/types'

const sections: SettingsSectionConfig[] = [
  {
    id: 'free-trial',
    title: 'FREE TRIAL',
    description: 'Offer a trial period before billing begins.',
    type: 'time-period',
    timePeriodOptions: [
      { value: 7, unit: 'day' },
      { value: 15, unit: 'day' },
      { value: 30, unit: 'day' },
      { value: 90, unit: 'day' }
    ],
    defaultOpen: true,
    defaultEnabled: true
  }
]

<PaSettingsPanel :sections="sections" />`,
    'complete': `import { PaSettingsPanel } from './components'
import type { SettingsSectionConfig } from './components/PaSettingsPanel/types'

const sections: SettingsSectionConfig[] = [
  {
    id: 'yearly-discount',
    title: 'YEARLY DISCOUNT',
    description: 'Apply a discount for long-term plans.',
    type: 'input',
    inputPlaceholder: 'Discount',
    defaultOpen: true,
    defaultEnabled: true
  },
  {
    id: 'yearly-increase',
    title: 'YEARLY INCREASE',
    description: 'Auto-increase subscription price annually.',
    type: 'input',
    inputPlaceholder: 'Increase',
    defaultEnabled: true
  },
  {
    id: 'frequency',
    title: 'FREQUENCY',
    description: 'Set how often this subscription renews.',
    type: 'radio',
    radioOptions: [
      { label: 'Weekly', value: 'weekly' },
      { label: 'Fortnightly', value: 'fortnightly' },
      { label: 'Monthly', value: 'monthly' }
    ],
    defaultEnabled: true
  },
  {
    id: 'free-trial',
    title: 'FREE TRIAL',
    description: 'Offer a trial period before billing begins.',
    type: 'time-period',
    timePeriodOptions: [
      { value: 7, unit: 'day' },
      { value: 15, unit: 'day' },
      { value: 30, unit: 'day' },
      { value: 90, unit: 'day' }
    ],
    defaultEnabled: true
  }
]

<PaSettingsPanel 
  :sections="sections" 
  v-model="values"
  @section-toggle="handleSectionToggle"
  @section-expand="handleSectionExpand"
/>`
  }
  return codes[tab] || ''
}
</script>

<template>
  <div class="component-docs">
    <div class="documentation-section">
      <h3 class="documentation-section-title">Usage</h3>
      <p class="documentation-section-description">
        The PaSettingsPanel component displays multiple collapsible sections, each with its own toggle switch to enable/disable the setting. Each section can contain different form control types including inputs, radio groups, segmented controls, and time period selectors. Sections can be expanded or collapsed individually, and their enabled state is controlled by the toggle switch in the header.
      </p>

      <div class="example-tabs">
        <button
          class="example-tab"
          :class="{ 'is-active': activeTab === 'basic' }"
          @click="activeTab = 'basic'"
        >
          Basic
        </button>
        <button
          class="example-tab"
          :class="{ 'is-active': activeTab === 'radio' }"
          @click="activeTab = 'radio'"
        >
          Radio Group
        </button>
        <button
          class="example-tab"
          :class="{ 'is-active': activeTab === 'segmented' }"
          @click="activeTab = 'segmented'"
        >
          Segmented Control
        </button>
        <button
          class="example-tab"
          :class="{ 'is-active': activeTab === 'time-period' }"
          @click="activeTab = 'time-period'"
        >
          Time Period
        </button>
        <button
          class="example-tab"
          :class="{ 'is-active': activeTab === 'complete' }"
          @click="activeTab = 'complete'"
        >
          Complete Example
        </button>
      </div>

      <div class="example-preview-container">
        <div class="example-preview">
          <div class="component-preview" style="display: flex; flex-direction: column; gap: var(--pa-spacing-16, 16px); width: 100%;">
            <template v-if="activeTab === 'basic'">
              <PaSettingsPanel :sections="basicSections" />
            </template>
            <template v-else-if="activeTab === 'radio'">
              <PaSettingsPanel :sections="radioSections" />
            </template>
            <template v-else-if="activeTab === 'segmented'">
              <PaSettingsPanel :sections="segmentedSections" />
            </template>
            <template v-else-if="activeTab === 'time-period'">
              <PaSettingsPanel :sections="timePeriodSections" />
            </template>
            <template v-else-if="activeTab === 'complete'">
              <PaSettingsPanel 
                :sections="completeExample" 
                v-model="panelValues"
              />
            </template>
          </div>
        </div>
        <button 
          class="show-code-button"
          @click="toggleShowCode(`pasettingspanel-usage-${activeTab}`)"
        >
          {{ showCode[`pasettingspanel-usage-${activeTab}`] ? 'Hide code' : 'Show code' }}
        </button>
        <div v-if="showCode[`pasettingspanel-usage-${activeTab}`]" class="code-preview">
          <CodeBlock 
            :code="getUsageCode(activeTab)"
            :copy-key="`pasettingspanel-usage-code-${activeTab}`"
            :show-line-numbers="true"
            language="vue"
          />
        </div>
      </div>
    </div>

    <div class="documentation-section">
      <h3 class="documentation-section-title">Component Source</h3>
      <p class="documentation-section-description">
        The complete source code for the PaSettingsPanel component.
      </p>
      <CodeBlock 
        :code="getComponentSourceCode('pasettingspanel')"
        copy-key="pasettingspanel-component-source"
        :show-line-numbers="true"
        language="vue"
      />
    </div>

    <div class="documentation-section">
      <h3 class="documentation-section-title">Style Source</h3>
      <p class="documentation-section-description">
        The complete SCSS styles for the PaSettingsSection component (the main visual component used by PaSettingsPanel).
      </p>
      <CodeBlock 
        :code="getComponentStyleSource('pasettingssection')"
        copy-key="pasettingssection-style-source"
        :show-line-numbers="true"
        language="scss"
      />
    </div>

    <div class="documentation-section">
      <h3 class="documentation-section-title">Token Source</h3>
      <p class="documentation-section-description">
        The design tokens used by the PaSettingsSection component.
      </p>
      <CodeBlock 
        :code="sectionTokenSource"
        copy-key="pasettingssection-token-source"
        :show-line-numbers="true"
        language="css"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.component-docs {
  display: flex;
  flex-direction: column;
  gap: var(--pa-spacing-32, 32px);
}

.documentation-section {
  display: flex;
  flex-direction: column;
  gap: var(--pa-spacing-16, 16px);
}

.documentation-section-title {
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: var(--pa-font-size-300, 20px);
  color: var(--pa-color-surface-container-text, #212529);
  margin: 0;
  transition: color var(--pa-transition-duration-default, 200ms) var(--pa-transition-easing-default, ease);
}

[data-theme="dark"] .documentation-section-title {
  color: #ffffff;
}

.documentation-section-description {
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  font-size: var(--pa-font-size-200, 16px);
  color: var(--pa-color-surface-container-text-secondary, #6c757d);
  margin: 0;
  line-height: 1.5;
  transition: color var(--pa-transition-duration-default, 200ms) var(--pa-transition-easing-default, ease);
}

[data-theme="dark"] .documentation-section-description {
  color: #6e757c;
}

.example-tabs {
  display: flex;
  gap: var(--pa-spacing-8, 8px);
  border-bottom: 1px solid var(--pa-color-surface-container-border, #e9ecef);
  padding-bottom: var(--pa-spacing-8, 8px);
  margin-bottom: var(--pa-spacing-16, 16px);
  transition: border-color var(--pa-transition-duration-default, 200ms) var(--pa-transition-easing-default, ease);
}

[data-theme="dark"] .example-tabs {
  border-color: #222529;
}

.example-tab {
  background: none;
  border: none;
  padding: var(--pa-spacing-8, 8px) var(--pa-spacing-16, 16px);
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: var(--pa-font-size-100, 14px);
  color: var(--pa-color-surface-container-text-secondary, #6c757d);
  cursor: pointer;
  transition: color var(--pa-transition-duration-default, 200ms) var(--pa-transition-easing-default, ease);
  position: relative;
  
  &:hover {
    color: var(--pa-color-surface-container-text-hover, #495057);
  }
  
  &.is-active {
    color: var(--pa-color-surface-container-text, #212529);
    
    &::after {
      content: '';
      position: absolute;
      bottom: calc(-1 * var(--pa-spacing-8, 8px) - 1px);
      left: 0;
      right: 0;
      height: 2px;
      background: linear-gradient(-85.36deg, #c10505 7.68%, #d51e33 92.47%);
    }
  }
}

[data-theme="dark"] .example-tab {
  color: #6e757c;
  
  &:hover {
    color: #cfd4d9;
  }
  
  &.is-active {
    color: #ffffff;
  }
}

.example-preview-container {
  background-color: var(--pa-color-surface-base-background, #f7f7f8);
  border: 1px solid var(--pa-color-surface-container-border, #e9ecef);
  border-radius: var(--pa-Border-radius-100, 8px);
  padding: var(--pa-spacing-24, 24px);
  position: relative;
  transition: background-color var(--pa-transition-duration-default, 200ms) var(--pa-transition-easing-default, ease), border-color var(--pa-transition-duration-default, 200ms) var(--pa-transition-easing-default, ease);
}

[data-theme="dark"] .example-preview-container {
  background-color: #0e0e0f;
  border-color: #222529;
}

.example-preview {
  min-height: 80px;
  display: flex;
  align-items: center;
}

.component-preview {
  display: flex;
  align-items: center;
  min-height: 48px;
  padding: var(--pa-spacing-8, 8px) 0;
}

.show-code-button {
  position: absolute;
  top: var(--pa-spacing-16, 16px);
  right: var(--pa-spacing-16, 16px);
  background: none;
  border: 1px solid var(--pa-color-surface-container-border, #dee2e6);
  border-radius: var(--pa-Border-radius-50, 4px);
  padding: var(--pa-spacing-6, 6px) var(--pa-spacing-12, 12px);
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: var(--pa-font-size-100, 14px);
  color: var(--pa-color-surface-container-text-secondary, #6c757d);
  cursor: pointer;
  transition: all var(--pa-transition-duration-default, 200ms) var(--pa-transition-easing-default, ease);
  
  &:hover {
    background-color: var(--pa-color-surface-container-border, #dee2e6);
    color: var(--pa-color-surface-container-text, #212529);
  }
}

[data-theme="dark"] .show-code-button {
  border-color: #222529;
  color: #cfd4d9;
  
  &:hover {
    background-color: #222529;
    color: #ffffff;
  }
}

.code-preview {
  margin-top: var(--pa-spacing-8, 8px);
}

.code-split-container {
  display: flex;
  flex-direction: column;
  gap: var(--pa-spacing-16, 16px);
}

.code-section {
  display: flex;
  flex-direction: column;
  gap: var(--pa-spacing-8, 8px);
}

.code-section-title {
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: var(--pa-font-size-100, 14px);
  color: var(--pa-color-surface-container-text-secondary, #6c757d);
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  transition: color var(--pa-transition-duration-default, 200ms) var(--pa-transition-easing-default, ease);
}

[data-theme="dark"] .code-section-title {
  color: #6e757c;
}
</style>

