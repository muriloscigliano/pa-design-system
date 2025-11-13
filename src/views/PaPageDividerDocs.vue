<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { PaPageDivider } from '../components'
import { CodeBlock } from '../components'
import { useCodeCopy } from '../composables/useCodeCopy'
import { getComponentSourceCode } from '../config/componentSourceCode'
import { getComponentTokens } from '../utils/tokenExtractor'

const { showCode, toggleShowCode } = useCodeCopy()
const activeTab = ref('default')
const tokenSource = ref('')

onMounted(async () => {
  tokenSource.value = await getComponentTokens('papagedivider')
})

const getUsageCode = (tab: string): string => {
  const codes: Record<string, string> = {
    'default': `import { PaPageDivider } from './components'

<PaPageDivider />`
  }
  return codes[tab] || ''
}
</script>

<template>
  <div class="component-docs">
    <div class="documentation-section">
      <h3 class="documentation-section-title">Usage</h3>
      <p class="documentation-section-description">
        Divider component for page sections.
      </p>

      <div class="example-preview-container">
        <div class="example-preview">
          <div class="component-preview" style="display: flex; flex-direction: column; gap: var(--pa-spacing-16, 16px);">
            <PaPageDivider />
          </div>
        </div>
        <button 
          class="show-code-button"
          @click="toggleShowCode('papagedivider-usage')"
        >
          {{ showCode['papagedivider-usage'] ? 'Hide code' : 'Show code' }}
        </button>
        <div v-if="showCode['papagedivider-usage']" class="code-preview">
          <CodeBlock 
            :code="getUsageCode(activeTab)"
            :copy-key="'papagedivider-usage-code'"
            :show-line-numbers="true"
            language="vue"
          />
        </div>
      </div>
    </div>

    <div class="documentation-section">
      <h3 class="documentation-section-title">Component Source</h3>
      <p class="documentation-section-description">
        The complete source code for the PaPageDivider component.
      </p>
      <CodeBlock 
        :code="getComponentSourceCode('papagedivider')"
        copy-key="papagedivider-component-source"
        :show-line-numbers="true"
        language="vue"
      />
    </div>

    <div class="documentation-section">
      <h3 class="documentation-section-title">Token Source</h3>
      <p class="documentation-section-description">
        CSS custom properties (design tokens) used by the PaPageDivider component.
      </p>
      <CodeBlock 
        :code="tokenSource"
        copy-key="papagedivider-token-source"
        :show-line-numbers="true"
        language="css"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '../styles/docs-shared.scss';
</style>
