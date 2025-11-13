<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { PaToggleInputGroup } from '../components'
import { CodeBlock } from '../components'
import { useCodeCopy } from '../composables/useCodeCopy'
import { getComponentSourceCode } from '../config/componentSourceCode'
import { getComponentTokens } from '../utils/tokenExtractor'

const { showCode, toggleShowCode } = useCodeCopy()
const activeTab = ref('default')
const tokenSource = ref('')

onMounted(async () => {
  tokenSource.value = await getComponentTokens('patoggleinputgroup')
})

const getUsageCode = (tab: string): string => {
  const codes: Record<string, string> = {
    'default': `import { PaToggleInputGroup } from './components'

<PaToggleInputGroup :options="[{ label: 'Option 1', value: 1 }, { label: 'Option 2', value: 2 }]" />`
  }
  return codes[tab] || ''
}
</script>

<template>
  <div class="component-docs">
    <div class="documentation-section">
      <h3 class="documentation-section-title">Usage</h3>
      <p class="documentation-section-description">
        Group of toggle switch inputs.
      </p>

      <div class="example-preview-container">
        <div class="example-preview">
          <div class="component-preview" style="display: flex; flex-direction: column; gap: var(--pa-spacing-16, 16px);">
            <PaToggleInputGroup :options="[{ label: 'Option 1', value: 1 }, { label: 'Option 2', value: 2 }]" />
          </div>
        </div>
        <button 
          class="show-code-button"
          @click="toggleShowCode('patoggleinputgroup-usage')"
        >
          {{ showCode['patoggleinputgroup-usage'] ? 'Hide code' : 'Show code' }}
        </button>
        <div v-if="showCode['patoggleinputgroup-usage']" class="code-preview">
          <CodeBlock 
            :code="getUsageCode(activeTab)"
            :copy-key="'patoggleinputgroup-usage-code'"
            :show-line-numbers="true"
            language="vue"
          />
        </div>
      </div>
    </div>

    <div class="documentation-section">
      <h3 class="documentation-section-title">Component Source</h3>
      <p class="documentation-section-description">
        The complete source code for the PaToggleInputGroup component.
      </p>
      <CodeBlock 
        :code="getComponentSourceCode('patoggleinputgroup')"
        copy-key="patoggleinputgroup-component-source"
        :show-line-numbers="true"
        language="vue"
      />
    </div>

    <div class="documentation-section">
      <h3 class="documentation-section-title">Token Source</h3>
      <p class="documentation-section-description">
        CSS custom properties (design tokens) used by the PaToggleInputGroup component.
      </p>
      <CodeBlock 
        :code="tokenSource"
        copy-key="patoggleinputgroup-token-source"
        :show-line-numbers="true"
        language="css"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '../styles/docs-shared.scss';
</style>
