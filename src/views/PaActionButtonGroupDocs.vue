<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { PaActionButtonGroup, PaActionButton } from '../components'
import { CodeBlock } from '../components'
import { useCodeCopy } from '../composables/useCodeCopy'
import { getComponentSourceCode } from '../config/componentSourceCode'
import { getComponentTokens } from '../utils/tokenExtractor'

const { showCode, toggleShowCode } = useCodeCopy()
const activeTab = ref('horizontal')
const tokenSource = ref('')

onMounted(async () => {
  tokenSource.value = await getComponentTokens('paactionbuttongroup')
})

const getUsageCode = (tab: string): string => {
  const codes: Record<string, string> = {
    'horizontal': `import { PaActionButtonGroup, PaActionButton } from './components'

<PaActionButtonGroup direction="horizontal">
  <PaActionButton>Action 1</PaActionButton>
  <PaActionButton>Action 2</PaActionButton>
</PaActionButtonGroup>`,
    'vertical': `import { PaActionButtonGroup, PaActionButton } from './components'

<PaActionButtonGroup direction="vertical">
  <PaActionButton>Action 1</PaActionButton>
  <PaActionButton>Action 2</PaActionButton>
</PaActionButtonGroup>`
  }
  return codes[tab] || ''
}
</script>

<template>
  <div class="component-docs">
    <div class="documentation-section">
      <h3 class="documentation-section-title">Usage</h3>
      <p class="documentation-section-description">
        Action button group component for grouping multiple action buttons together.
      </p>

      <div class="example-tabs">
        <button
          class="example-tab"
          :class="{ 'is-active': activeTab === 'horizontal' }"
          @click="activeTab = 'horizontal'"
        >
          Horizontal
        </button>
        <button
          class="example-tab"
          :class="{ 'is-active': activeTab === 'vertical' }"
          @click="activeTab = 'vertical'"
        >
          Vertical
        </button>
      </div>

      <div class="example-preview-container">
        <div class="example-preview">
          <div class="component-preview" style="display: flex; flex-direction: column; gap: var(--pa-spacing-16, 16px);">
            <template v-if="activeTab === 'horizontal'">
              <PaActionButtonGroup direction="horizontal">
                <PaActionButton>Action 1</PaActionButton>
                <PaActionButton>Action 2</PaActionButton>
              </PaActionButtonGroup>
            </template>
            <template v-else-if="activeTab === 'vertical'">
              <PaActionButtonGroup direction="vertical">
                <PaActionButton>Action 1</PaActionButton>
                <PaActionButton>Action 2</PaActionButton>
              </PaActionButtonGroup>
            </template>
          </div>
        </div>
        <button 
          class="show-code-button"
          @click="toggleShowCode(`paactionbuttongroup-${activeTab}`)"
        >
          {{ showCode[`paactionbuttongroup-${activeTab}`] ? 'Hide code' : 'Show code' }}
        </button>
        <div v-if="showCode[`paactionbuttongroup-${activeTab}`]" class="code-preview">
          <CodeBlock 
            :code="getUsageCode(activeTab)"
            :copy-key="`paactionbuttongroup-usage-${activeTab}`"
            :show-line-numbers="true"
            language="vue"
          />
        </div>
      </div>
    </div>

    <div class="documentation-section">
      <h3 class="documentation-section-title">Component Source</h3>
      <p class="documentation-section-description">
        The complete source code for the PaActionButtonGroup component.
      </p>
      <CodeBlock 
        :code="getComponentSourceCode('paactionbuttongroup')"
        copy-key="paactionbuttongroup-component-source"
        :show-line-numbers="true"
        language="vue"
      />
    </div>

    <div class="documentation-section">
      <h3 class="documentation-section-title">Token Source</h3>
      <p class="documentation-section-description">
        CSS custom properties (design tokens) used by the PaActionButtonGroup component.
      </p>
      <CodeBlock 
        :code="tokenSource"
        copy-key="paactionbuttongroup-token-source"
        :show-line-numbers="true"
        language="css"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '../styles/docs-shared.scss';
</style>

