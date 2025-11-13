<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { PaRadioButtonGroup } from '../components'
import { CodeBlock } from '../components'
import { useCodeCopy } from '../composables/useCodeCopy'
import { getComponentSourceCode } from '../config/componentSourceCode'
import { getComponentTokens } from '../utils/tokenExtractor'

const { showCode, toggleShowCode } = useCodeCopy()
const activeStatesTab = ref('default')
const tokenSource = ref('')
const selectedValue = ref('option1')

onMounted(async () => {
  tokenSource.value = await getComponentTokens('paradiobuttongroup')
})

const getStatesCode = (tab: string): string => {
  const codes: Record<string, string> = {
    'default': `import { PaRadioButtonGroup } from './components'

<PaRadioButtonGroup 
  v-model="selected"
  :options="[
    { label: 'Option 1', value: 'option1' },
    { label: 'Option 2', value: 'option2' },
    { label: 'Option 3', value: 'option3' }
  ]"
/>`
  }
  return codes[tab] || ''
}
</script>

<template>
  <div class="component-docs">
    <!-- States Section -->
    <div class="documentation-section">
      <h3 class="documentation-section-title">Usage</h3>
      <p class="documentation-section-description">
        Radio button group component for selecting a single option from multiple choices.
      </p>

      <div class="example-tabs">
        <button
          class="example-tab"
          :class="{ 'is-active': activeStatesTab === 'default' }"
          @click="activeStatesTab = 'default'"
        >
          Default
        </button>
      </div>

      <div class="example-preview-container">
        <div class="example-preview">
          <div class="component-preview" style="display: flex; flex-direction: column; gap: var(--pa-spacing-16, 16px);">
            <template v-if="activeStatesTab === 'default'">
              <PaRadioButtonGroup 
                v-model="selectedValue"
                :options="[
                  { label: 'Option 1', value: 'option1' },
                  { label: 'Option 2', value: 'option2' },
                  { label: 'Option 3', value: 'option3' }
                ]"
              />
            </template>
          </div>
        </div>
        <button 
          class="show-code-button"
          @click="toggleShowCode(`paradiobuttongroup-states-${activeStatesTab}`)"
        >
          {{ showCode[`paradiobuttongroup-states-${activeStatesTab}`] ? 'Hide code' : 'Show code' }}
        </button>
        <div v-if="showCode[`paradiobuttongroup-states-${activeStatesTab}`]" class="code-preview">
          <CodeBlock 
            :code="getStatesCode(activeStatesTab)"
            :copy-key="`paradiobuttongroup-states-usage-${activeStatesTab}`"
            :show-line-numbers="true"
            language="vue"
          />
        </div>
      </div>
    </div>

    <!-- Component Source Section -->
    <div class="documentation-section">
      <h3 class="documentation-section-title">Component Source</h3>
      <p class="documentation-section-description">
        The complete source code for the PaRadioButtonGroup component.
      </p>
      <CodeBlock 
        :code="getComponentSourceCode('paradiobuttongroup')"
        copy-key="paradiobuttongroup-component-source"
        :show-line-numbers="true"
        language="vue"
      />
    </div>

    <!-- Token Source Section -->
    <div class="documentation-section">
      <h3 class="documentation-section-title">Token Source</h3>
      <p class="documentation-section-description">
        CSS custom properties (design tokens) used by the PaRadioButtonGroup component.
      </p>
      <CodeBlock 
        :code="tokenSource"
        copy-key="paradiobuttongroup-token-source"
        :show-line-numbers="true"
        language="css"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '../styles/docs-shared.scss';
</style>

