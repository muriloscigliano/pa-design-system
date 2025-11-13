<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { PaDatePicker } from '../components'
import { CodeBlock } from '../components'
import { useCodeCopy } from '../composables/useCodeCopy'
import { getComponentSourceCode } from '../config/componentSourceCode'
import { getComponentTokens } from '../utils/tokenExtractor'

const { showCode, toggleShowCode } = useCodeCopy()
const activeTab = ref('default')
const tokenSource = ref('')

onMounted(async () => {
  tokenSource.value = await getComponentTokens('padatepicker')
})

const getUsageCode = (tab: string): string => {
  const codes: Record<string, string> = {
    'default': `import { PaDatePicker } from './components'

<PaDatePicker />`
  }
  return codes[tab] || ''
}
</script>

<template>
  <div class="component-docs">
    <div class="documentation-section">
      <h3 class="documentation-section-title">Usage</h3>
      <p class="documentation-section-description">
        Date selection input component.
      </p>

      <div class="example-preview-container">
        <div class="example-preview">
          <div class="component-preview" style="display: flex; flex-direction: column; gap: var(--pa-spacing-16, 16px);">
            <PaDatePicker />
          </div>
        </div>
        <button 
          class="show-code-button"
          @click="toggleShowCode('padatepicker-usage')"
        >
          {{ showCode['padatepicker-usage'] ? 'Hide code' : 'Show code' }}
        </button>
        <div v-if="showCode['padatepicker-usage']" class="code-preview">
          <CodeBlock 
            :code="getUsageCode(activeTab)"
            :copy-key="'padatepicker-usage-code'"
            :show-line-numbers="true"
            language="vue"
          />
        </div>
      </div>
    </div>

    <div class="documentation-section">
      <h3 class="documentation-section-title">Component Source</h3>
      <p class="documentation-section-description">
        The complete source code for the PaDatePicker component.
      </p>
      <CodeBlock 
        :code="getComponentSourceCode('padatepicker')"
        copy-key="padatepicker-component-source"
        :show-line-numbers="true"
        language="vue"
      />
    </div>

    <div class="documentation-section">
      <h3 class="documentation-section-title">Token Source</h3>
      <p class="documentation-section-description">
        CSS custom properties (design tokens) used by the PaDatePicker component.
      </p>
      <CodeBlock 
        :code="tokenSource"
        copy-key="padatepicker-token-source"
        :show-line-numbers="true"
        language="css"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '../styles/docs-shared.scss';
</style>
