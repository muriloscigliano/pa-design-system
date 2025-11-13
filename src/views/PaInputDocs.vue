<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { PaInput } from '../components'
import { CodeBlock } from '../components'
import { useCodeCopy } from '../composables/useCodeCopy'
import { getComponentSourceCode } from '../config/componentSourceCode'
import { getComponentTokens } from '../utils/tokenExtractor'
import { getComponentStyleSource } from '../config/componentStyleSource'

const { showCode, toggleShowCode } = useCodeCopy()
const activeStatesTab = ref('default')
const activeVariantsTab = ref('basic')
const tokenSource = ref('')
const searchValue = ref('')
const errorValue = ref('')
const validValue = ref('test@example.com')

onMounted(async () => {
  tokenSource.value = await getComponentTokens('painput')
})

const getStatesCode = (tab: string): string => {
  const codes: Record<string, string> = {
    'default': `import { PaInput } from './components'

<PaInput 
  label="Label"
  placeholder="Placeholder"
  helper-text="Helper text"
/>`,
    'disabled': `import { PaInput } from './components'

<PaInput 
  label="Label"
  placeholder="Disabled input"
  :disabled="true"
/>`,
    'error': `import { PaInput } from './components'

<PaInput 
  label="Label"
  placeholder="Error input"
  :error="true"
  error-message="Error message"
/>`,
    'valid': `import { PaInput } from './components'

<PaInput 
  label="Label"
  placeholder="Valid input"
  :valid="true"
  valid-message="Valid message"
/>`,
    'optional': `import { PaInput } from './components'

<PaInput 
  label="Label"
  :optional="true"
  placeholder="Optional input"
/>`
  }
  return codes[tab] || ''
}

const getVariantsCode = (tab: string): string => {
  const codes: Record<string, string> = {
    'basic': `import { PaInput } from './components'

<PaInput 
  label="Label"
  placeholder="Placeholder"
/>`,
    'with-helper': `import { PaInput } from './components'

<PaInput 
  label="Label"
  placeholder="Placeholder"
  helper-text="Helper text"
/>`,
    'with-icons': `import { PaInput } from './components'

<PaInput 
  label="Label"
  placeholder="With icons"
  icon-left="🔍"
  icon-right="✓"
/>`,
    'search': `import { PaInput } from './components'

<PaInput 
  label="Search label"
  placeholder="Search placeholder"
  icon-left="🔍"
  :show-clear="true"
  v-model="searchValue"
/>`,
    'with-right-element': `import { PaInput } from './components'

<PaInput 
  label="Label"
  placeholder="Placeholder"
  right-element="icon"
>
  <template #rightElement>
    <span>📅</span>
  </template>
</PaInput>`
  }
  return codes[tab] || ''
}
</script>

<template>
  <div class="component-docs">
    <!-- Variants Section -->
    <div class="documentation-section">
      <h3 class="documentation-section-title">Variants</h3>
      <p class="documentation-section-description">
        PaInput supports various configurations including labels, helper text, icons, clear buttons, and right-side elements.
      </p>
      
      <div class="example-tabs">
        <button
          class="example-tab"
          :class="{ 'is-active': activeVariantsTab === 'basic' }"
          @click="activeVariantsTab = 'basic'"
        >
          Basic
        </button>
        <button
          class="example-tab"
          :class="{ 'is-active': activeVariantsTab === 'with-helper' }"
          @click="activeVariantsTab = 'with-helper'"
        >
          With Helper
        </button>
        <button
          class="example-tab"
          :class="{ 'is-active': activeVariantsTab === 'with-icons' }"
          @click="activeVariantsTab = 'with-icons'"
        >
          With Icons
        </button>
        <button
          class="example-tab"
          :class="{ 'is-active': activeVariantsTab === 'search' }"
          @click="activeVariantsTab = 'search'"
        >
          Search
        </button>
        <button
          class="example-tab"
          :class="{ 'is-active': activeVariantsTab === 'with-right-element' }"
          @click="activeVariantsTab = 'with-right-element'"
        >
          Right Element
        </button>
      </div>

      <div class="example-preview-container">
        <div class="example-preview">
          <div class="component-preview" style="display: flex; flex-direction: column; gap: var(--pa-spacing-300, 24px); max-width: 400px;">
            <template v-if="activeVariantsTab === 'basic'">
              <PaInput 
                label="Label"
                placeholder="Placeholder"
              />
            </template>
            <template v-else-if="activeVariantsTab === 'with-helper'">
              <PaInput 
                label="Label"
                placeholder="Placeholder"
                helper-text="Helper text"
              />
            </template>
            <template v-else-if="activeVariantsTab === 'with-icons'">
              <PaInput 
                label="Label"
                placeholder="With icons"
                icon-left="🔍"
                icon-right="✓"
              />
            </template>
            <template v-else-if="activeVariantsTab === 'search'">
              <PaInput 
                label="Search label"
                placeholder="Search placeholder"
                icon-left="🔍"
                :show-clear="true"
                v-model="searchValue"
              />
            </template>
            <template v-else-if="activeVariantsTab === 'with-right-element'">
              <PaInput 
                label="Label"
                placeholder="Placeholder"
                right-element="icon"
              >
                <template #rightElement>
                  <span>📅</span>
                </template>
              </PaInput>
            </template>
          </div>
        </div>
        <button 
          class="show-code-button"
          @click="toggleShowCode(`painput-variants-${activeVariantsTab}`)"
        >
          {{ showCode[`painput-variants-${activeVariantsTab}`] ? 'Hide code' : 'Show code' }}
        </button>
        <div v-if="showCode[`painput-variants-${activeVariantsTab}`]" class="code-preview">
          <CodeBlock 
            :code="getVariantsCode(activeVariantsTab)"
            :copy-key="`painput-variants-usage-${activeVariantsTab}`"
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
        Input fields support different states to provide feedback and control user interactions. Use the disabled state when an input is not available, error state for validation feedback, and valid state for successful validation.
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
          :class="{ 'is-active': activeStatesTab === 'disabled' }"
          @click="activeStatesTab = 'disabled'"
        >
          Disabled
        </button>
        <button
          class="example-tab"
          :class="{ 'is-active': activeStatesTab === 'error' }"
          @click="activeStatesTab = 'error'"
        >
          Error
        </button>
        <button
          class="example-tab"
          :class="{ 'is-active': activeStatesTab === 'valid' }"
          @click="activeStatesTab = 'valid'"
        >
          Valid
        </button>
        <button
          class="example-tab"
          :class="{ 'is-active': activeStatesTab === 'optional' }"
          @click="activeStatesTab = 'optional'"
        >
          Optional
        </button>
      </div>

      <div class="example-preview-container">
        <div class="example-preview">
          <div class="component-preview" style="display: flex; flex-direction: column; gap: var(--pa-spacing-300, 24px); max-width: 400px;">
            <template v-if="activeStatesTab === 'default'">
              <PaInput 
                label="Label"
                placeholder="Placeholder"
                helper-text="Helper text"
              />
            </template>
            <template v-else-if="activeStatesTab === 'disabled'">
              <PaInput 
                label="Label"
                placeholder="Disabled input"
                :disabled="true"
              />
            </template>
            <template v-else-if="activeStatesTab === 'error'">
              <PaInput 
                label="Label"
                placeholder="Error input"
                :error="true"
                error-message="Error message"
                v-model="errorValue"
              />
            </template>
            <template v-else-if="activeStatesTab === 'valid'">
              <PaInput 
                label="Label"
                placeholder="Valid input"
                :valid="true"
                valid-message="Valid message"
                v-model="validValue"
              />
            </template>
            <template v-else-if="activeStatesTab === 'optional'">
              <PaInput 
                label="Label"
                :optional="true"
                placeholder="Optional input"
              />
            </template>
          </div>
        </div>
        <button 
          class="show-code-button"
          @click="toggleShowCode(`painput-states-${activeStatesTab}`)"
        >
          {{ showCode[`painput-states-${activeStatesTab}`] ? 'Hide code' : 'Show code' }}
        </button>
        <div v-if="showCode[`painput-states-${activeStatesTab}`]" class="code-preview">
          <CodeBlock 
            :code="getStatesCode(activeStatesTab)"
            :copy-key="`painput-states-usage-${activeStatesTab}`"
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
        The complete source code for the PaInput component.
      </p>
      <CodeBlock 
        :code="getComponentSourceCode('painput')"
        copy-key="painput-component-source"
        :show-line-numbers="true"
        language="vue"
      />
    </div>

    <!-- Style Source Section -->
    <div class="documentation-section">
      <h3 class="documentation-section-title">Style Source</h3>
      <p class="documentation-section-description">
        The complete SCSS styles for the PaInput component.
      </p>
      <CodeBlock 
        :code="getComponentStyleSource('painput')"
        copy-key="painput-style-source"
        :show-line-numbers="true"
        language="scss"
      />
    </div>

    <!-- Token Source Section -->
    <div class="documentation-section">
      <h3 class="documentation-section-title">Token Source</h3>
      <p class="documentation-section-description">
        CSS custom properties (design tokens) used by the PaInput component.
      </p>
      <CodeBlock 
        :code="tokenSource"
        copy-key="painput-token-source"
        :show-line-numbers="true"
        language="css"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '../styles/docs-shared.scss';
</style>
