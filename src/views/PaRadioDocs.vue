<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { PaRadio } from '../components'
import { CodeBlock } from '../components'
import { useCodeCopy } from '../composables/useCodeCopy'
import { getComponentSourceCode } from '../config/componentSourceCode'
import { getComponentTokens } from '../utils/tokenExtractor'

const { showCode, toggleShowCode } = useCodeCopy()
const activeSizesTab = ref('sm')
const activeStatesTab = ref('default')
const tokenSource = ref('')
const selectedValue = ref('')

onMounted(async () => {
  tokenSource.value = await getComponentTokens('paradio')
})

const getSizesCode = (tab: string): string => {
  const codes: Record<string, string> = {
    'sm': `import { PaRadio } from './components'

<PaRadio size="sm" value="option1" v-model="selected" label="Small radio" />`,
    'md': `import { PaRadio } from './components'

<PaRadio size="md" value="option1" v-model="selected" label="Medium radio" />`,
    'lg': `import { PaRadio } from './components'

<PaRadio size="lg" value="option1" v-model="selected" label="Large radio" />`
  }
  return codes[tab] || ''
}

const getStatesCode = (tab: string): string => {
  const codes: Record<string, string> = {
    'default': `import { PaRadio } from './components'

<PaRadio value="option1" v-model="selected" label="Default radio" />`,
    'checked': `import { PaRadio } from './components'

<PaRadio value="option1" v-model="selected" label="Checked radio" />`,
    'disabled': `import { PaRadio } from './components'

<PaRadio :disabled="true" value="option1" label="Disabled radio" />`
  }
  return codes[tab] || ''
}
</script>

<template>
  <div class="component-docs">
    <!-- Sizes Section -->
    <div class="documentation-section">
      <h3 class="documentation-section-title">Sizes</h3>
      <p class="documentation-section-description">
        Radio buttons are available in three sizes: small, medium, and large. Choose the size that best fits your layout. Medium is the default size.
      </p>
      
      <div class="example-tabs">
        <button
          class="example-tab"
          :class="{ 'is-active': activeSizesTab === 'sm' }"
          @click="activeSizesTab = 'sm'"
        >
          Small
        </button>
        <button
          class="example-tab"
          :class="{ 'is-active': activeSizesTab === 'md' }"
          @click="activeSizesTab = 'md'"
        >
          Medium
        </button>
        <button
          class="example-tab"
          :class="{ 'is-active': activeSizesTab === 'lg' }"
          @click="activeSizesTab = 'lg'"
        >
          Large
        </button>
      </div>

      <div class="example-preview-container">
        <div class="example-preview">
          <div class="component-preview" style="display: flex; flex-direction: column; gap: var(--pa-spacing-16, 16px);">
            <template v-if="activeSizesTab === 'sm'">
              <PaRadio size="sm" value="sm1" v-model="selectedValue" label="Small radio" />
            </template>
            <template v-else-if="activeSizesTab === 'md'">
              <PaRadio size="md" value="md1" v-model="selectedValue" label="Medium radio" />
            </template>
            <template v-else-if="activeSizesTab === 'lg'">
              <PaRadio size="lg" value="lg1" v-model="selectedValue" label="Large radio" />
            </template>
          </div>
        </div>
        <button 
          class="show-code-button"
          @click="toggleShowCode(`paradio-sizes-${activeSizesTab}`)"
        >
          {{ showCode[`paradio-sizes-${activeSizesTab}`] ? 'Hide code' : 'Show code' }}
        </button>
        <div v-if="showCode[`paradio-sizes-${activeSizesTab}`]" class="code-preview">
          <CodeBlock 
            :code="getSizesCode(activeSizesTab)"
            :copy-key="`paradio-sizes-usage-${activeSizesTab}`"
            :show-line-numbers="true"
            language="vue"
          />
        </div>
      </div>
    </div>

    <!-- States Section -->
    <div class="documentation-section">
      <h3 class="documentation-section-title">States</h3>
      <p class="documentation-section-description">
        Radio buttons support different states: default (unchecked), checked, and disabled. Radio buttons are typically used in groups where only one option can be selected.
      </p>

      <div class="example-tabs">
        <button
          class="example-tab"
          :class="{ 'is-active': activeStatesTab === 'default' }"
          @click="activeStatesTab = 'default'"
        >
          Default
        </button>
        <button
          class="example-tab"
          :class="{ 'is-active': activeStatesTab === 'checked' }"
          @click="activeStatesTab = 'checked'"
        >
          Checked
        </button>
        <button
          class="example-tab"
          :class="{ 'is-active': activeStatesTab === 'disabled' }"
          @click="activeStatesTab = 'disabled'"
        >
          Disabled
        </button>
      </div>

      <div class="example-preview-container">
        <div class="example-preview">
          <div class="component-preview" style="display: flex; flex-direction: column; gap: var(--pa-spacing-16, 16px);">
            <template v-if="activeStatesTab === 'default'">
              <PaRadio value="default1" v-model="selectedValue" label="Default radio" />
            </template>
            <template v-else-if="activeStatesTab === 'checked'">
              <PaRadio value="checked1" v-model="selectedValue" label="Checked radio" />
            </template>
            <template v-else-if="activeStatesTab === 'disabled'">
              <PaRadio :disabled="true" value="disabled1" label="Disabled radio" />
            </template>
          </div>
        </div>
        <button 
          class="show-code-button"
          @click="toggleShowCode(`paradio-states-${activeStatesTab}`)"
        >
          {{ showCode[`paradio-states-${activeStatesTab}`] ? 'Hide code' : 'Show code' }}
        </button>
        <div v-if="showCode[`paradio-states-${activeStatesTab}`]" class="code-preview">
          <CodeBlock 
            :code="getStatesCode(activeStatesTab)"
            :copy-key="`paradio-states-usage-${activeStatesTab}`"
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
        The complete source code for the PaRadio component.
      </p>
      <CodeBlock 
        :code="getComponentSourceCode('paradio')"
        copy-key="paradio-component-source"
        :show-line-numbers="true"
        language="vue"
      />
    </div>

    <!-- Token Source Section -->
    <div class="documentation-section">
      <h3 class="documentation-section-title">Token Source</h3>
      <p class="documentation-section-description">
        CSS custom properties (design tokens) used by the PaRadio component.
      </p>
      <CodeBlock 
        :code="tokenSource"
        copy-key="paradio-token-source"
        :show-line-numbers="true"
        language="css"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '../styles/docs-shared.scss';
</style>

