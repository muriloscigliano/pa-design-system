<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { PaActionButton } from '../components'
import { CodeBlock } from '../components'
import { useCodeCopy } from '../composables/useCodeCopy'
import { getComponentSourceCode } from '../config/componentSourceCode'
import { getComponentTokens } from '../utils/tokenExtractor'

const { showCode, toggleShowCode } = useCodeCopy()
const activeSizesTab = ref('sm')
const activeStatesTab = ref('default')
const tokenSource = ref('')

onMounted(async () => {
  tokenSource.value = await getComponentTokens('paactionbutton')
})

const getSizesCode = (tab: string): string => {
  const codes: Record<string, string> = {
    'sm': `import { PaActionButton } from './components'

<PaActionButton size="sm">Small Action</PaActionButton>`,
    'md': `import { PaActionButton } from './components'

<PaActionButton size="md">Medium Action</PaActionButton>`,
    'lg': `import { PaActionButton } from './components'

<PaActionButton size="lg">Large Action</PaActionButton>`
  }
  return codes[tab] || ''
}

const getStatesCode = (tab: string): string => {
  const codes: Record<string, string> = {
    'default': `import { PaActionButton } from './components'

<PaActionButton>Default Action</PaActionButton>`,
    'disabled': `import { PaActionButton } from './components'

<PaActionButton :disabled="true">Disabled Action</PaActionButton>`,
    'loading': `import { PaActionButton } from './components'

<PaActionButton :loading="true">Loading Action</PaActionButton>`
  }
  return codes[tab] || ''
}
</script>

<template>
  <div class="component-docs">
    <div class="documentation-section">
      <h3 class="documentation-section-title">Sizes</h3>
      <p class="documentation-section-description">
        Action buttons are available in three sizes: small, medium, and large.
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
              <PaActionButton size="sm">Small Action</PaActionButton>
            </template>
            <template v-else-if="activeSizesTab === 'md'">
              <PaActionButton size="md">Medium Action</PaActionButton>
            </template>
            <template v-else-if="activeSizesTab === 'lg'">
              <PaActionButton size="lg">Large Action</PaActionButton>
            </template>
          </div>
        </div>
        <button 
          class="show-code-button"
          @click="toggleShowCode(`paactionbutton-sizes-${activeSizesTab}`)"
        >
          {{ showCode[`paactionbutton-sizes-${activeSizesTab}`] ? 'Hide code' : 'Show code' }}
        </button>
        <div v-if="showCode[`paactionbutton-sizes-${activeSizesTab}`]" class="code-preview">
          <CodeBlock 
            :code="getSizesCode(activeSizesTab)"
            :copy-key="`paactionbutton-sizes-usage-${activeSizesTab}`"
            :show-line-numbers="true"
            language="vue"
          />
        </div>
      </div>
    </div>

    <div class="documentation-section">
      <h3 class="documentation-section-title">States</h3>
      <p class="documentation-section-description">
        Action buttons support different states: default, disabled, and loading.
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
          :class="{ 'is-active': activeStatesTab === 'loading' }"
          @click="activeStatesTab = 'loading'"
        >
          Loading
        </button>
      </div>

      <div class="example-preview-container">
        <div class="example-preview">
          <div class="component-preview" style="display: flex; flex-direction: column; gap: var(--pa-spacing-16, 16px);">
            <template v-if="activeStatesTab === 'default'">
              <PaActionButton>Default Action</PaActionButton>
            </template>
            <template v-else-if="activeStatesTab === 'disabled'">
              <PaActionButton :disabled="true">Disabled Action</PaActionButton>
            </template>
            <template v-else-if="activeStatesTab === 'loading'">
              <PaActionButton :loading="true">Loading Action</PaActionButton>
            </template>
          </div>
        </div>
        <button 
          class="show-code-button"
          @click="toggleShowCode(`paactionbutton-states-${activeStatesTab}`)"
        >
          {{ showCode[`paactionbutton-states-${activeStatesTab}`] ? 'Hide code' : 'Show code' }}
        </button>
        <div v-if="showCode[`paactionbutton-states-${activeStatesTab}`]" class="code-preview">
          <CodeBlock 
            :code="getStatesCode(activeStatesTab)"
            :copy-key="`paactionbutton-states-usage-${activeStatesTab}`"
            :show-line-numbers="true"
            language="vue"
          />
        </div>
      </div>
    </div>

    <div class="documentation-section">
      <h3 class="documentation-section-title">Component Source</h3>
      <p class="documentation-section-description">
        The complete source code for the PaActionButton component.
      </p>
      <CodeBlock 
        :code="getComponentSourceCode('paactionbutton')"
        copy-key="paactionbutton-component-source"
        :show-line-numbers="true"
        language="vue"
      />
    </div>

    <div class="documentation-section">
      <h3 class="documentation-section-title">Token Source</h3>
      <p class="documentation-section-description">
        CSS custom properties (design tokens) used by the PaActionButton component.
      </p>
      <CodeBlock 
        :code="tokenSource"
        copy-key="paactionbutton-token-source"
        :show-line-numbers="true"
        language="css"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '../styles/docs-shared.scss';
</style>

