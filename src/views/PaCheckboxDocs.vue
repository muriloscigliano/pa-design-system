<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { PaCheckbox } from '../components'
import { CodeBlock } from '../components'
import { useCodeCopy } from '../composables/useCodeCopy'
import { getComponentSourceCode } from '../config/componentSourceCode'
import { getComponentTokens } from '../utils/tokenExtractor'

const { showCode, toggleShowCode } = useCodeCopy()
const activeSizesTab = ref('sm')
const activeStatesTab = ref('default')
const tokenSource = ref('')

onMounted(async () => {
  tokenSource.value = await getComponentTokens('pacheckbox')
})

const getSizesCode = (tab: string): string => {
  const codes: Record<string, string> = {
    'sm': `import { PaCheckbox } from './components'

<PaCheckbox size="sm" label="Small checkbox" />`,
    'md': `import { PaCheckbox } from './components'

<PaCheckbox size="md" label="Medium checkbox" />`,
    'lg': `import { PaCheckbox } from './components'

<PaCheckbox size="lg" label="Large checkbox" />`
  }
  return codes[tab] || ''
}

const getStatesCode = (tab: string): string => {
  const codes: Record<string, string> = {
    'default': `import { PaCheckbox } from './components'

<PaCheckbox label="Default checkbox" />`,
    'checked': `import { PaCheckbox } from './components'

<PaCheckbox :model-value="true" label="Checked checkbox" />`,
    'disabled': `import { PaCheckbox } from './components'

<PaCheckbox :disabled="true" label="Disabled checkbox" />`,
    'indeterminate': `import { PaCheckbox } from './components'

<PaCheckbox :indeterminate="true" label="Indeterminate checkbox" />`
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
        Checkboxes are available in three sizes: small, medium, and large. Choose the size that best fits your layout. Medium is the default size.
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
              <PaCheckbox size="sm" label="Small checkbox" />
            </template>
            <template v-else-if="activeSizesTab === 'md'">
              <PaCheckbox size="md" label="Medium checkbox" />
            </template>
            <template v-else-if="activeSizesTab === 'lg'">
              <PaCheckbox size="lg" label="Large checkbox" />
            </template>
          </div>
        </div>
        <button 
          class="show-code-button"
          @click="toggleShowCode(`pacheckbox-sizes-${activeSizesTab}`)"
        >
          {{ showCode[`pacheckbox-sizes-${activeSizesTab}`] ? 'Hide code' : 'Show code' }}
        </button>
        <div v-if="showCode[`pacheckbox-sizes-${activeSizesTab}`]" class="code-preview">
          <CodeBlock 
            :code="getSizesCode(activeSizesTab)"
            :copy-key="`pacheckbox-sizes-usage-${activeSizesTab}`"
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
        Checkboxes support different states: default (unchecked), checked, disabled, and indeterminate. Use the indeterminate state for partial selections in hierarchical structures.
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
        <button
          class="example-tab"
          :class="{ 'is-active': activeStatesTab === 'indeterminate' }"
          @click="activeStatesTab = 'indeterminate'"
        >
          Indeterminate
        </button>
      </div>

      <div class="example-preview-container">
        <div class="example-preview">
          <div class="component-preview" style="display: flex; flex-direction: column; gap: var(--pa-spacing-16, 16px);">
            <template v-if="activeStatesTab === 'default'">
              <PaCheckbox label="Default checkbox" />
            </template>
            <template v-else-if="activeStatesTab === 'checked'">
              <PaCheckbox :model-value="true" label="Checked checkbox" />
            </template>
            <template v-else-if="activeStatesTab === 'disabled'">
              <PaCheckbox :disabled="true" label="Disabled checkbox" />
            </template>
            <template v-else-if="activeStatesTab === 'indeterminate'">
              <PaCheckbox :indeterminate="true" label="Indeterminate checkbox" />
            </template>
          </div>
        </div>
        <button 
          class="show-code-button"
          @click="toggleShowCode(`pacheckbox-states-${activeStatesTab}`)"
        >
          {{ showCode[`pacheckbox-states-${activeStatesTab}`] ? 'Hide code' : 'Show code' }}
        </button>
        <div v-if="showCode[`pacheckbox-states-${activeStatesTab}`]" class="code-preview">
          <CodeBlock 
            :code="getStatesCode(activeStatesTab)"
            :copy-key="`pacheckbox-states-usage-${activeStatesTab}`"
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
        The complete source code for the PaCheckbox component.
      </p>
      <CodeBlock 
        :code="getComponentSourceCode('pacheckbox')"
        copy-key="pacheckbox-component-source"
        :show-line-numbers="true"
        language="vue"
      />
    </div>

    <!-- Token Source Section -->
    <div class="documentation-section">
      <h3 class="documentation-section-title">Token Source</h3>
      <p class="documentation-section-description">
        CSS custom properties (design tokens) used by the PaCheckbox component.
      </p>
      <CodeBlock 
        :code="tokenSource"
        copy-key="pacheckbox-token-source"
        :show-line-numbers="true"
        language="css"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '../styles/docs-shared.scss';
</style>

