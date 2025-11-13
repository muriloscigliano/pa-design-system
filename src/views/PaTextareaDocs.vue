<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { PaTextarea } from '../components'
import { CodeBlock } from '../components'
import { useCodeCopy } from '../composables/useCodeCopy'
import { getComponentSourceCode } from '../config/componentSourceCode'
import { getComponentTokens } from '../utils/tokenExtractor'
import { getComponentStyleSource } from '../config/componentStyleSource'

const { showCode, toggleShowCode } = useCodeCopy()
const activeStatesTab = ref('default')
const tokenSource = ref('')

onMounted(async () => {
  tokenSource.value = await getComponentTokens('patextarea')
})

const getStatesCode = (tab: string): string => {
  const codes: Record<string, string> = {
    'default': `import { PaTextarea } from './components'

<PaTextarea />`
  }
  return codes[tab] || ''
}
</script>

<template>
  <div class="component-docs">
    <div class="documentation-section">
      <h3 class="documentation-section-title">Usage</h3>
      <p class="documentation-section-description">
        Multi-line text input component with resize options.
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
              <PaTextarea />
            </template>
          </div>
        </div>
        <button 
          class="show-code-button"
          @click="toggleShowCode(`patextarea-states-${activeStatesTab}`)"
        >
          {{ showCode[`patextarea-states-${activeStatesTab}`] ? 'Hide code' : 'Show code' }}
        </button>
        <div v-if="showCode[`patextarea-states-${activeStatesTab}`]" class="code-preview">
          <CodeBlock 
            :code="getStatesCode(activeStatesTab)"
            :copy-key="`patextarea-states-usage-${activeStatesTab}`"
            :show-line-numbers="true"
            language="vue"
          />
        </div>
      </div>
    </div>

    <div class="documentation-section">
      <h3 class="documentation-section-title">Component Source</h3>
      <p class="documentation-section-description">
        The complete source code for the PaTextarea component.
      </p>
      <CodeBlock 
        :code="getComponentSourceCode('patextarea')"
        copy-key="patextarea-component-source"
        :show-line-numbers="true"
        language="vue"
      />
    </div>

    <div class="documentation-section">
      <h3 class="documentation-section-title">Token Source</h3>
      <p class="documentation-section-description">
        CSS custom properties (design tokens) used by the PaTextarea component.
      </p>
      <CodeBlock 
        :code="tokenSource"
        copy-key="patextarea-token-source"
        :show-line-numbers="true"
        language="css"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '../styles/docs-shared.scss';
</style>
