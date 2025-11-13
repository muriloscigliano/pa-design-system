<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { PaInputGroup } from '../components'
import { CodeBlock } from '../components'
import { useCodeCopy } from '../composables/useCodeCopy'
import { getComponentSourceCode } from '../config/componentSourceCode'
import { getComponentTokens } from '../utils/tokenExtractor'

const { showCode, toggleShowCode } = useCodeCopy()
const activeTab = ref('default')
const tokenSource = ref('')

onMounted(async () => {
  tokenSource.value = await getComponentTokens('painputgroup')
})

const getUsageCode = (tab: string): string => {
  const codes: Record<string, string> = {
    'default': `import { PaInputGroup } from './components'

<PaInputGroup />`
  }
  return codes[tab] || ''
}
</script>

<template>
  <div class="component-docs">
    <div class="documentation-section">
      <h3 class="documentation-section-title">Usage</h3>
      <p class="documentation-section-description">
        Wrapper for grouped input components.
      </p>

      <div class="example-preview-container">
        <div class="example-preview">
          <div class="component-preview" style="display: flex; flex-direction: column; gap: var(--pa-spacing-16, 16px);">
            <PaInputGroup />
          </div>
        </div>
        <button 
          class="show-code-button"
          @click="toggleShowCode('painputgroup-usage')"
        >
          {{ showCode['painputgroup-usage'] ? 'Hide code' : 'Show code' }}
        </button>
        <div v-if="showCode['painputgroup-usage']" class="code-preview">
          <CodeBlock 
            :code="getUsageCode(activeTab)"
            :copy-key="'painputgroup-usage-code'"
            :show-line-numbers="true"
            language="vue"
          />
        </div>
      </div>
    </div>

    <div class="documentation-section">
      <h3 class="documentation-section-title">Component Source</h3>
      <p class="documentation-section-description">
        The complete source code for the PaInputGroup component.
      </p>
      <CodeBlock 
        :code="getComponentSourceCode('painputgroup')"
        copy-key="painputgroup-component-source"
        :show-line-numbers="true"
        language="vue"
      />
    </div>

    <div class="documentation-section">
      <h3 class="documentation-section-title">Token Source</h3>
      <p class="documentation-section-description">
        CSS custom properties (design tokens) used by the PaInputGroup component.
      </p>
      <CodeBlock 
        :code="tokenSource"
        copy-key="painputgroup-token-source"
        :show-line-numbers="true"
        language="css"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '../styles/docs-shared.scss';
</style>
