<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { PaButtonDropdown } from '../components'
import { CodeBlock } from '../components'
import { useCodeCopy } from '../composables/useCodeCopy'
import { getComponentSourceCode } from '../config/componentSourceCode'
import { getComponentTokens } from '../utils/tokenExtractor'

const { showCode, toggleShowCode } = useCodeCopy()
const activeTab = ref('default')
const tokenSource = ref('')

onMounted(async () => {
  tokenSource.value = await getComponentTokens('pabuttondropdown')
})

const getUsageCode = (tab: string): string => {
  const codes: Record<string, string> = {
    'default': `import { PaButtonDropdown } from './components'

<PaButtonDropdown />`
  }
  return codes[tab] || ''
}
</script>

<template>
  <div class="component-docs">
    <div class="documentation-section">
      <h3 class="documentation-section-title">Usage</h3>
      <p class="documentation-section-description">
        Button with dropdown menu functionality.
      </p>

      <div class="example-preview-container">
        <div class="example-preview">
          <div class="component-preview" style="display: flex; flex-direction: column; gap: var(--pa-spacing-16, 16px);">
            <PaButtonDropdown :options="[{ label: 'Option 1', value: 1 }, { label: 'Option 2', value: 2 }]" />
          </div>
        </div>
        <button 
          class="show-code-button"
          @click="toggleShowCode('pabuttondropdown-usage')"
        >
          {{ showCode['pabuttondropdown-usage'] ? 'Hide code' : 'Show code' }}
        </button>
        <div v-if="showCode['pabuttondropdown-usage']" class="code-preview">
          <CodeBlock 
            :code="getUsageCode(activeTab)"
            :copy-key="'pabuttondropdown-usage-code'"
            :show-line-numbers="true"
            language="vue"
          />
        </div>
      </div>
    </div>

    <div class="documentation-section">
      <h3 class="documentation-section-title">Component Source</h3>
      <p class="documentation-section-description">
        The complete source code for the PaButtonDropdown component.
      </p>
      <CodeBlock 
        :code="getComponentSourceCode('pabuttondropdown')"
        copy-key="pabuttondropdown-component-source"
        :show-line-numbers="true"
        language="vue"
      />
    </div>

    <div class="documentation-section">
      <h3 class="documentation-section-title">Token Source</h3>
      <p class="documentation-section-description">
        CSS custom properties (design tokens) used by the PaButtonDropdown component.
      </p>
      <CodeBlock 
        :code="tokenSource"
        copy-key="pabuttondropdown-token-source"
        :show-line-numbers="true"
        language="css"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '../styles/docs-shared.scss';
</style>
