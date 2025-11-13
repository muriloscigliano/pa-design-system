<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { PaCurrencyInput } from '../components'
import { CodeBlock } from '../components'
import { useCodeCopy } from '../composables/useCodeCopy'
import { getComponentSourceCode } from '../config/componentSourceCode'
import { getComponentTokens } from '../utils/tokenExtractor'

const { showCode, toggleShowCode } = useCodeCopy()
const activeTab = ref('default')
const tokenSource = ref('')

onMounted(async () => {
  tokenSource.value = await getComponentTokens('pacurrencyinput')
})

const getUsageCode = (tab: string): string => {
  const codes: Record<string, string> = {
    'default': `import { PaCurrencyInput } from './components'

<PaCurrencyInput />`
  }
  return codes[tab] || ''
}
</script>

<template>
  <div class="component-docs">
    <div class="documentation-section">
      <h3 class="documentation-section-title">Usage</h3>
      <p class="documentation-section-description">
        Specialized input component for currency values.
      </p>

      <div class="example-preview-container">
        <div class="example-preview">
          <div class="component-preview" style="display: flex; flex-direction: column; gap: var(--pa-spacing-16, 16px);">
            <PaCurrencyInput />
          </div>
        </div>
        <button 
          class="show-code-button"
          @click="toggleShowCode('pacurrencyinput-usage')"
        >
          {{ showCode['pacurrencyinput-usage'] ? 'Hide code' : 'Show code' }}
        </button>
        <div v-if="showCode['pacurrencyinput-usage']" class="code-preview">
          <CodeBlock 
            :code="getUsageCode(activeTab)"
            :copy-key="'pacurrencyinput-usage-code'"
            :show-line-numbers="true"
            language="vue"
          />
        </div>
      </div>
    </div>

    <div class="documentation-section">
      <h3 class="documentation-section-title">Component Source</h3>
      <p class="documentation-section-description">
        The complete source code for the PaCurrencyInput component.
      </p>
      <CodeBlock 
        :code="getComponentSourceCode('pacurrencyinput')"
        copy-key="pacurrencyinput-component-source"
        :show-line-numbers="true"
        language="vue"
      />
    </div>

    <div class="documentation-section">
      <h3 class="documentation-section-title">Token Source</h3>
      <p class="documentation-section-description">
        CSS custom properties (design tokens) used by the PaCurrencyInput component.
      </p>
      <CodeBlock 
        :code="tokenSource"
        copy-key="pacurrencyinput-token-source"
        :show-line-numbers="true"
        language="css"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '../styles/docs-shared.scss';
</style>
