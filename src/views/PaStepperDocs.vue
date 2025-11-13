<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { PaStepper } from '../components'
import { CodeBlock } from '../components'
import { useCodeCopy } from '../composables/useCodeCopy'
import { getComponentSourceCode } from '../config/componentSourceCode'
import { getComponentTokens } from '../utils/tokenExtractor'

const { showCode, toggleShowCode } = useCodeCopy()
const activeStatesTab = ref('default')
const tokenSource = ref('')

onMounted(async () => {
  tokenSource.value = await getComponentTokens('pastepper')
})

const getStatesCode = (tab: string): string => {
  const codes: Record<string, string> = {
    'default': `import { PaStepper } from './components'

<PaStepper :current="0" :steps="[{ title: 'Step 1' }, { title: 'Step 2' }, { title: 'Step 3' }]" />`
  }
  return codes[tab] || ''
}
</script>

<template>
  <div class="component-docs">
    <div class="documentation-section">
      <h3 class="documentation-section-title">Usage</h3>
      <p class="documentation-section-description">
        Stepper component for multi-step processes.
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
              <PaStepper :current="0" :steps="[{ title: 'Step 1' }, { title: 'Step 2' }, { title: 'Step 3' }]" />
            </template>
          </div>
        </div>
        <button 
          class="show-code-button"
          @click="toggleShowCode(`pastepper-states-${activeStatesTab}`)"
        >
          {{ showCode[`pastepper-states-${activeStatesTab}`] ? 'Hide code' : 'Show code' }}
        </button>
        <div v-if="showCode[`pastepper-states-${activeStatesTab}`]" class="code-preview">
          <CodeBlock 
            :code="getStatesCode(activeStatesTab)"
            :copy-key="`pastepper-states-usage-${activeStatesTab}`"
            :show-line-numbers="true"
            language="vue"
          />
        </div>
      </div>
    </div>

    <div class="documentation-section">
      <h3 class="documentation-section-title">Component Source</h3>
      <p class="documentation-section-description">
        The complete source code for the PaStepper component.
      </p>
      <CodeBlock 
        :code="getComponentSourceCode('pastepper')"
        copy-key="pastepper-component-source"
        :show-line-numbers="true"
        language="vue"
      />
    </div>

    <div class="documentation-section">
      <h3 class="documentation-section-title">Token Source</h3>
      <p class="documentation-section-description">
        CSS custom properties (design tokens) used by the PaStepper component.
      </p>
      <CodeBlock 
        :code="tokenSource"
        copy-key="pastepper-token-source"
        :show-line-numbers="true"
        language="css"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '../styles/docs-shared.scss';
</style>
