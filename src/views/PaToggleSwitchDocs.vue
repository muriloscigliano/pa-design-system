<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { PaToggleSwitch } from '../components'
import { CodeBlock } from '../components'
import { useCodeCopy } from '../composables/useCodeCopy'
import { getComponentSourceCode } from '../config/componentSourceCode'
import { getComponentTokens } from '../utils/tokenExtractor'

const { showCode, toggleShowCode } = useCodeCopy()
const activeSizesTab = ref('sm')
const activeStatesTab = ref('default')
const tokenSource = ref('')
const toggleValue = ref(false)

onMounted(async () => {
  tokenSource.value = await getComponentTokens('patoggleswitch')
})

const getSizesCode = (tab: string): string => {
  const codes: Record<string, string> = {
    'sm': `import { PaToggleSwitch } from './components'

<PaToggleSwitch size="sm" v-model="value" label="Small toggle" />`,
    'md': `import { PaToggleSwitch } from './components'

<PaToggleSwitch size="md" v-model="value" label="Medium toggle" />`,
    'lg': `import { PaToggleSwitch } from './components'

<PaToggleSwitch size="lg" v-model="value" label="Large toggle" />`
  }
  return codes[tab] || ''
}

const getStatesCode = (tab: string): string => {
  const codes: Record<string, string> = {
    'default': `import { PaToggleSwitch } from './components'

<PaToggleSwitch v-model="value" label="Default toggle" />`,
    'on': `import { PaToggleSwitch } from './components'

<PaToggleSwitch v-model="value" label="Toggle ON" />`,
    'disabled': `import { PaToggleSwitch } from './components'

<PaToggleSwitch :disabled="true" v-model="value" label="Disabled toggle" />`
  }
  return codes[tab] || ''
}
</script>

<template>
  <div class="component-docs">
    <!-- Sizes Section -->
    <div class="documentation-section">
      <h3 class="documentation-section-title">Sizes</h3>
      <p class="documentation-section-description">
        Toggle switches are available in three sizes: small, medium, and large. Choose the size that best fits your layout. Medium is the default size.
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
              <PaToggleSwitch size="sm" v-model="toggleValue" label="Small toggle" />
            </template>
            <template v-else-if="activeSizesTab === 'md'">
              <PaToggleSwitch size="md" v-model="toggleValue" label="Medium toggle" />
            </template>
            <template v-else-if="activeSizesTab === 'lg'">
              <PaToggleSwitch size="lg" v-model="toggleValue" label="Large toggle" />
            </template>
          </div>
        </div>
        <button 
          class="show-code-button"
          @click="toggleShowCode(`patoggleswitch-sizes-${activeSizesTab}`)"
        >
          {{ showCode[`patoggleswitch-sizes-${activeSizesTab}`] ? 'Hide code' : 'Show code' }}
        </button>
        <div v-if="showCode[`patoggleswitch-sizes-${activeSizesTab}`]" class="code-preview">
          <CodeBlock 
            :code="getSizesCode(activeSizesTab)"
            :copy-key="`patoggleswitch-sizes-usage-${activeSizesTab}`"
            :show-line-numbers="true"
            language="vue"
          />
        </div>
      </div>
    </div>

    <!-- States Section -->
    <div class="documentation-section">
      <h3 class="documentation-section-title">States</h3>
      <p class="documentation-section-description">
        Toggle switches support different states: default (OFF), ON, and disabled. Use toggle switches for binary settings or on/off controls.
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
          :class="{ 'is-active': activeStatesTab === 'on' }"
          @click="activeStatesTab = 'on'"
        >
          ON
        </button>
        <button
          class="example-tab"
          :class="{ 'is-active': activeStatesTab === 'disabled' }"
          @click="activeStatesTab = 'disabled'"
        >
          Disabled
        </button>
      </div>

      <div class="example-preview-container">
        <div class="example-preview">
          <div class="component-preview" style="display: flex; flex-direction: column; gap: var(--pa-spacing-16, 16px);">
            <template v-if="activeStatesTab === 'default'">
              <PaToggleSwitch v-model="toggleValue" label="Default toggle" />
            </template>
            <template v-else-if="activeStatesTab === 'on'">
              <PaToggleSwitch :model-value="true" label="Toggle ON" />
            </template>
            <template v-else-if="activeStatesTab === 'disabled'">
              <PaToggleSwitch :disabled="true" :model-value="false" label="Disabled toggle" />
            </template>
          </div>
        </div>
        <button 
          class="show-code-button"
          @click="toggleShowCode(`patoggleswitch-states-${activeStatesTab}`)"
        >
          {{ showCode[`patoggleswitch-states-${activeStatesTab}`] ? 'Hide code' : 'Show code' }}
        </button>
        <div v-if="showCode[`patoggleswitch-states-${activeStatesTab}`]" class="code-preview">
          <CodeBlock 
            :code="getStatesCode(activeStatesTab)"
            :copy-key="`patoggleswitch-states-usage-${activeStatesTab}`"
            :show-line-numbers="true"
            language="vue"
          />
        </div>
      </div>
    </div>

    <!-- Component Source Section -->
    <div class="documentation-section">
      <h3 class="documentation-section-title">Component Source</h3>
      <p class="documentation-section-description">
        The complete source code for the PaToggleSwitch component.
      </p>
      <CodeBlock 
        :code="getComponentSourceCode('patoggleswitch')"
        copy-key="patoggleswitch-component-source"
        :show-line-numbers="true"
        language="vue"
      />
    </div>

    <!-- Token Source Section -->
    <div class="documentation-section">
      <h3 class="documentation-section-title">Token Source</h3>
      <p class="documentation-section-description">
        CSS custom properties (design tokens) used by the PaToggleSwitch component.
      </p>
      <CodeBlock 
        :code="tokenSource"
        copy-key="patoggleswitch-token-source"
        :show-line-numbers="true"
        language="css"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '../styles/docs-shared.scss';
</style>

