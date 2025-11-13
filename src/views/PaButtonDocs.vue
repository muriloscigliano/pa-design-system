<script setup lang="ts">
import { ref } from 'vue'
import { PaButton } from '../components'
import { CodeBlock } from '../components'
import { getComponentExamples } from '../config/componentExamples'
import { useCodeCopy } from '../composables/useCodeCopy'

const { showCode, toggleShowCode, getCodeTextForCopy } = useCodeCopy()
const activeHierarchyTab = ref('primary')
const activeMultipleCTAsTab = ref('primary-secondary')
const activeIconsTab = ref('left')
const activeStatesTab = ref('default')

const getHierarchyCode = (tab: string): string => {
  const codes: Record<string, string> = {
    'primary': '<PaButton variant="primary">Primary</PaButton>',
    'secondary': '<PaButton variant="secondary">Secondary</PaButton>',
    'tertiary': '<PaButton variant="tertiary">Tertiary</PaButton>',
    'link': '<PaButton variant="link">Link</PaButton>',
    'action': '<PaButton variant="action">Action</PaButton>'
  }
  return codes[tab] || ''
}

const getMultipleCTAsCode = (tab: string): string => {
  const codes: Record<string, string> = {
    'primary-secondary': '<PaButton variant="primary">Save Changes</PaButton>\n<PaButton variant="secondary">Cancel</PaButton>',
    'primary-tertiary': '<PaButton variant="primary">Submit</PaButton>\n<PaButton variant="tertiary">Skip</PaButton>',
    'three-actions': '<PaButton variant="primary">Confirm</PaButton>\n<PaButton variant="secondary">Edit</PaButton>\n<PaButton variant="tertiary">Cancel</PaButton>'
  }
  return codes[tab] || ''
}

const getIconsCode = (tab: string): string => {
  const codes: Record<string, string> = {
    'left': `<PaButton variant="primary" icon-position="left">
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M8 2V4M8 12V14M2 8H4M12 8H14M3.757 3.757L5.172 5.172M10.828 10.828L12.243 12.243M3.757 12.243L5.172 10.828M10.828 5.172L12.243 3.757" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
  </svg>
  <span>Icon Left</span>
</PaButton>`,
    'center': `<PaButton variant="primary" icon-position="center">
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M8 2V4M8 12V14M2 8H4M12 8H14M3.757 3.757L5.172 5.172M10.828 10.828L12.243 12.243M3.757 12.243L5.172 10.828M10.828 5.172L12.243 3.757" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
  </svg>
  <span>Icon Center</span>
</PaButton>`,
    'right': `<PaButton variant="primary" icon-position="right">
  <span>Icon Right</span>
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M8 2V4M8 12V14M2 8H4M12 8H14M3.757 3.757L5.172 5.172M10.828 10.828L12.243 12.243M3.757 12.243L5.172 10.828M10.828 5.172L12.243 3.757" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
  </svg>
</PaButton>`
  }
  return codes[tab] || ''
}

const getStatesCode = (tab: string): string => {
  const codes: Record<string, string> = {
    'default': '<PaButton variant="primary">Default</PaButton>',
    'disabled': '<PaButton variant="primary" :disabled="true">Disabled</PaButton>',
    'loading': '<PaButton variant="primary" :loading="true">Loading</PaButton>'
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
        Buttons are available in three sizes: small, medium, and large. Choose the size that best fits your layout and the importance of the action. Medium is the default size.
      </p>
      <div class="example-preview-container">
        <div class="example-preview">
          <div class="component-preview" style="display: flex; flex-wrap: wrap; gap: var(--pa-spacing-8, 8px); align-items: center;">
            <PaButton variant="primary" size="sm">Small</PaButton>
            <PaButton variant="primary" size="md">Medium</PaButton>
            <PaButton variant="primary" size="lg">Large</PaButton>
          </div>
        </div>
        <button 
          class="show-code-button"
          @click="toggleShowCode('pabutton-sizes')"
        >
          {{ showCode['pabutton-sizes'] ? 'Hide code' : 'Show code' }}
        </button>
        <div v-if="showCode['pabutton-sizes']" class="code-preview">
          <CodeBlock 
            :code="getCodeTextForCopy(getComponentExamples('pabutton').find(e => e.render === 'sizes')?.code)"
            copy-key="pabutton-sizes"
            :show-line-numbers="true"
          />
        </div>
      </div>
    </div>

    <!-- Variants Section -->
    <div class="documentation-section">
      <h3 class="documentation-section-title">Variants</h3>
      <p class="documentation-section-description">
        Each variant serves a specific purpose in the interface hierarchy. Select the variant that matches the importance and context of the action.
      </p>
      <div class="example-preview-container">
        <div class="example-preview">
          <div class="component-preview" style="display: flex; flex-wrap: wrap; gap: var(--pa-spacing-8, 8px);">
            <PaButton variant="primary">Primary</PaButton>
            <PaButton variant="secondary">Secondary</PaButton>
            <PaButton variant="tertiary">Tertiary</PaButton>
            <PaButton variant="link">Link</PaButton>
            <PaButton variant="action">Action</PaButton>
          </div>
        </div>
        <button 
          class="show-code-button"
          @click="toggleShowCode('pabutton-variants')"
        >
          {{ showCode['pabutton-variants'] ? 'Hide code' : 'Show code' }}
        </button>
        <div v-if="showCode['pabutton-variants']" class="code-preview">
          <CodeBlock 
            :code="getCodeTextForCopy(getComponentExamples('pabutton').find(e => e.render === 'variants')?.code)"
            copy-key="pabutton-variants"
            :show-line-numbers="true"
          />
        </div>
      </div>
    </div>

    <!-- Hierarchy Section -->
    <div class="documentation-section">
      <h3 class="documentation-section-title">Hierarchy</h3>
      <p class="documentation-section-description">
        Button variants follow a clear hierarchical order from highest to lowest priority. Use this hierarchy to guide users through your interface and establish clear visual importance.
      </p>
      
      <div class="example-tabs">
        <button
          class="example-tab"
          :class="{ 'is-active': activeHierarchyTab === 'primary' }"
          @click="activeHierarchyTab = 'primary'"
        >
          1. Primary
        </button>
        <button
          class="example-tab"
          :class="{ 'is-active': activeHierarchyTab === 'secondary' }"
          @click="activeHierarchyTab = 'secondary'"
        >
          2. Secondary
        </button>
        <button
          class="example-tab"
          :class="{ 'is-active': activeHierarchyTab === 'tertiary' }"
          @click="activeHierarchyTab = 'tertiary'"
        >
          3. Tertiary
        </button>
        <button
          class="example-tab"
          :class="{ 'is-active': activeHierarchyTab === 'link' }"
          @click="activeHierarchyTab = 'link'"
        >
          4. Link
        </button>
        <button
          class="example-tab"
          :class="{ 'is-active': activeHierarchyTab === 'action' }"
          @click="activeHierarchyTab = 'action'"
        >
          5. Action
        </button>
      </div>

      <div class="example-preview-container">
        <div class="example-preview">
          <div class="component-preview" style="display: flex; flex-direction: column; gap: var(--pa-spacing-16, 16px);">
            <template v-if="activeHierarchyTab === 'primary'">
              <div style="display: flex; flex-direction: column; gap: var(--pa-spacing-8, 8px);">
                <div style="display: flex; flex-wrap: wrap; gap: var(--pa-spacing-8, 8px);">
                  <PaButton variant="primary">Primary</PaButton>
                </div>
                <p style="margin: 0; font-size: var(--pa-font-size-100, 14px); color: var(--pa-color-surface-container-text-secondary, #6c757d); line-height: 1.5;">
                  The main call-to-action. Use for the most important action users should take (e.g., "Submit", "Save", "Confirm"). Only one Primary button should be visible per section or modal.
                </p>
              </div>
            </template>
            <template v-else-if="activeHierarchyTab === 'secondary'">
              <div style="display: flex; flex-direction: column; gap: var(--pa-spacing-8, 8px);">
                <div style="display: flex; flex-wrap: wrap; gap: var(--pa-spacing-8, 8px);">
                  <PaButton variant="secondary">Secondary</PaButton>
                </div>
                <p style="margin: 0; font-size: var(--pa-font-size-100, 14px); color: var(--pa-color-surface-container-text-secondary, #6c757d); line-height: 1.5;">
                  Secondary actions that are important but not the primary focus. Common use cases include "Cancel", "Back", "Edit", or alternative actions to the primary button.
                </p>
              </div>
            </template>
            <template v-else-if="activeHierarchyTab === 'tertiary'">
              <div style="display: flex; flex-direction: column; gap: var(--pa-spacing-8, 8px);">
                <div style="display: flex; flex-wrap: wrap; gap: var(--pa-spacing-8, 8px);">
                  <PaButton variant="tertiary">Tertiary</PaButton>
                </div>
                <p style="margin: 0; font-size: var(--pa-font-size-100, 14px); color: var(--pa-color-surface-container-text-secondary, #6c757d); line-height: 1.5;">
                  Less emphasized actions that are optional or supplementary. Use for actions like "Skip", "Learn More", or when you need a third action option.
                </p>
              </div>
            </template>
            <template v-else-if="activeHierarchyTab === 'link'">
              <div style="display: flex; flex-direction: column; gap: var(--pa-spacing-8, 8px);">
                <div style="display: flex; flex-wrap: wrap; gap: var(--pa-spacing-8, 8px);">
                  <PaButton variant="link">Link</PaButton>
                </div>
                <p style="margin: 0; font-size: var(--pa-font-size-100, 14px); color: var(--pa-color-surface-container-text-secondary, #6c757d); line-height: 1.5;">
                  Text-style button for links and less prominent actions. Use for "Learn more", "View all", or when you need a minimal visual footprint while maintaining button functionality.
                </p>
              </div>
            </template>
            <template v-else-if="activeHierarchyTab === 'action'">
              <div style="display: flex; flex-direction: column; gap: var(--pa-spacing-8, 8px);">
                <div style="display: flex; flex-wrap: wrap; gap: var(--pa-spacing-8, 8px);">
                  <PaButton variant="action">Action</PaButton>
                </div>
                <p style="margin: 0; font-size: var(--pa-font-size-100, 14px); color: var(--pa-color-surface-container-text-secondary, #6c757d); line-height: 1.5;">
                  General-purpose action button for contexts where the specialized variants don't fit. Use for standard actions that don't require specific emphasis.
                </p>
              </div>
            </template>
          </div>
        </div>
        <button 
          class="show-code-button"
          @click="toggleShowCode(`pabutton-hierarchy-${activeHierarchyTab}`)"
        >
          {{ showCode[`pabutton-hierarchy-${activeHierarchyTab}`] ? 'Hide code' : 'Show code' }}
        </button>
        <div v-if="showCode[`pabutton-hierarchy-${activeHierarchyTab}`]" class="code-preview">
          <CodeBlock 
            :code="getHierarchyCode(activeHierarchyTab)"
            :copy-key="`pabutton-hierarchy-${activeHierarchyTab}`"
            :show-line-numbers="true"
          />
        </div>
      </div>
    </div>

    <!-- Multiple CTAs Section -->
    <div class="documentation-section">
      <h3 class="documentation-section-title">Multiple CTAs</h3>
      <p class="documentation-section-description">
        When multiple actions are available, use the variant hierarchy to establish clear visual importance. Follow these patterns for common scenarios.
      </p>
      
      <div class="example-tabs">
        <button
          class="example-tab"
          :class="{ 'is-active': activeMultipleCTAsTab === 'primary-secondary' }"
          @click="activeMultipleCTAsTab = 'primary-secondary'"
        >
          Primary + Secondary
        </button>
        <button
          class="example-tab"
          :class="{ 'is-active': activeMultipleCTAsTab === 'primary-tertiary' }"
          @click="activeMultipleCTAsTab = 'primary-tertiary'"
        >
          Primary + Tertiary
        </button>
        <button
          class="example-tab"
          :class="{ 'is-active': activeMultipleCTAsTab === 'three-actions' }"
          @click="activeMultipleCTAsTab = 'three-actions'"
        >
          Three Actions
        </button>
      </div>

      <div class="example-preview-container">
        <div class="example-preview">
          <div class="component-preview" style="display: flex; flex-direction: column; gap: var(--pa-spacing-16, 16px);">
            <template v-if="activeMultipleCTAsTab === 'primary-secondary'">
              <div style="display: flex; flex-direction: column; gap: var(--pa-spacing-8, 8px);">
                <div style="display: flex; flex-wrap: wrap; gap: var(--pa-spacing-8, 8px);">
                  <PaButton variant="primary">Save Changes</PaButton>
                  <PaButton variant="secondary">Cancel</PaButton>
                </div>
                <p style="margin: 0; font-size: var(--pa-font-size-100, 14px); color: var(--pa-color-surface-container-text-secondary, #6c757d); line-height: 1.5;">
                  Use when you have a main action and a secondary action. The Primary button should be placed on the right (or left in RTL layouts).
                </p>
              </div>
            </template>
            <template v-else-if="activeMultipleCTAsTab === 'primary-tertiary'">
              <div style="display: flex; flex-direction: column; gap: var(--pa-spacing-8, 8px);">
                <div style="display: flex; flex-wrap: wrap; gap: var(--pa-spacing-8, 8px);">
                  <PaButton variant="primary">Submit</PaButton>
                  <PaButton variant="tertiary">Skip</PaButton>
                </div>
                <p style="margin: 0; font-size: var(--pa-font-size-100, 14px); color: var(--pa-color-surface-container-text-secondary, #6c757d); line-height: 1.5;">
                  Use when the secondary action is less important or optional. Tertiary provides minimal emphasis while still being accessible.
                </p>
              </div>
            </template>
            <template v-else-if="activeMultipleCTAsTab === 'three-actions'">
              <div style="display: flex; flex-direction: column; gap: var(--pa-spacing-8, 8px);">
                <div style="display: flex; flex-wrap: wrap; gap: var(--pa-spacing-8, 8px);">
                  <PaButton variant="primary">Confirm</PaButton>
                  <PaButton variant="secondary">Edit</PaButton>
                  <PaButton variant="tertiary">Cancel</PaButton>
                </div>
                <p style="margin: 0; font-size: var(--pa-font-size-100, 14px); color: var(--pa-color-surface-container-text-secondary, #6c757d); line-height: 1.5;">
                  Use when you need three distinct action levels. Always maintain visual hierarchy: Primary should be most prominent, followed by Secondary, then Tertiary. Limit to maximum 3 buttons per action group.
                </p>
              </div>
            </template>
          </div>
        </div>
        <button 
          class="show-code-button"
          @click="toggleShowCode(`pabutton-multiple-ctas-${activeMultipleCTAsTab}`)"
        >
          {{ showCode[`pabutton-multiple-ctas-${activeMultipleCTAsTab}`] ? 'Hide code' : 'Show code' }}
        </button>
        <div v-if="showCode[`pabutton-multiple-ctas-${activeMultipleCTAsTab}`]" class="code-preview">
          <CodeBlock 
            :code="getMultipleCTAsCode(activeMultipleCTAsTab)"
            :copy-key="`pabutton-multiple-ctas-${activeMultipleCTAsTab}`"
            :show-line-numbers="true"
          />
        </div>
      </div>
    </div>

    <!-- Icons Section -->
    <div class="documentation-section">
      <h3 class="documentation-section-title">Icons</h3>
      <p class="documentation-section-description">
        Buttons can include icons positioned on the left, center, or right. Icons help communicate the action and improve visual clarity.
      </p>

      <div class="example-tabs">
        <button
          class="example-tab"
          :class="{ 'is-active': activeIconsTab === 'left' }"
          @click="activeIconsTab = 'left'"
        >
          Left
        </button>
        <button
          class="example-tab"
          :class="{ 'is-active': activeIconsTab === 'center' }"
          @click="activeIconsTab = 'center'"
        >
          Center
        </button>
        <button
          class="example-tab"
          :class="{ 'is-active': activeIconsTab === 'right' }"
          @click="activeIconsTab = 'right'"
        >
          Right
        </button>
      </div>

      <div class="example-preview-container">
        <div class="example-preview">
          <div class="component-preview" style="display: flex; flex-wrap: wrap; gap: var(--pa-spacing-8, 8px); align-items: center;">
            <template v-if="activeIconsTab === 'left'">
              <PaButton variant="primary" icon-position="left">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style="flex-shrink: 0;">
                  <path d="M8 2V4M8 12V14M2 8H4M12 8H14M3.757 3.757L5.172 5.172M10.828 10.828L12.243 12.243M3.757 12.243L5.172 10.828M10.828 5.172L12.243 3.757" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                </svg>
                <span>Icon Left</span>
              </PaButton>
            </template>
            <template v-else-if="activeIconsTab === 'center'">
              <PaButton variant="primary" icon-position="center">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style="flex-shrink: 0;">
                  <path d="M8 2V4M8 12V14M2 8H4M12 8H14M3.757 3.757L5.172 5.172M10.828 10.828L12.243 12.243M3.757 12.243L5.172 10.828M10.828 5.172L12.243 3.757" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                </svg>
                <span>Icon Center</span>
              </PaButton>
            </template>
            <template v-else-if="activeIconsTab === 'right'">
              <PaButton variant="primary" icon-position="right">
                <span>Icon Right</span>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style="flex-shrink: 0;">
                  <path d="M8 2V4M8 12V14M2 8H4M12 8H14M3.757 3.757L5.172 5.172M10.828 10.828L12.243 12.243M3.757 12.243L5.172 10.828M10.828 5.172L12.243 3.757" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                </svg>
              </PaButton>
            </template>
          </div>
        </div>
        <button 
          class="show-code-button"
          @click="toggleShowCode(`pabutton-icons-${activeIconsTab}`)"
        >
          {{ showCode[`pabutton-icons-${activeIconsTab}`] ? 'Hide code' : 'Show code' }}
        </button>
        <div v-if="showCode[`pabutton-icons-${activeIconsTab}`]" class="code-preview">
          <CodeBlock 
            :code="getIconsCode(activeIconsTab)"
            :copy-key="`pabutton-icons-${activeIconsTab}`"
            :show-line-numbers="true"
          />
        </div>
      </div>
    </div>

    <!-- States Section -->
    <div class="documentation-section">
      <h3 class="documentation-section-title">States</h3>
      <p class="documentation-section-description">
        Buttons support different states to provide feedback and control user interactions. Use the disabled state when an action is not available, and the loading state for async operations.
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
          :class="{ 'is-active': activeStatesTab === 'disabled' }"
          @click="activeStatesTab = 'disabled'"
        >
          Disabled
        </button>
        <button
          class="example-tab"
          :class="{ 'is-active': activeStatesTab === 'loading' }"
          @click="activeStatesTab = 'loading'"
        >
          Loading
        </button>
      </div>

      <div class="example-preview-container">
        <div class="example-preview">
          <div class="component-preview" style="display: flex; flex-wrap: wrap; gap: var(--pa-spacing-8, 8px);">
            <template v-if="activeStatesTab === 'default'">
              <PaButton variant="primary">Default</PaButton>
            </template>
            <template v-else-if="activeStatesTab === 'disabled'">
              <PaButton variant="primary" :disabled="true">Disabled</PaButton>
            </template>
            <template v-else-if="activeStatesTab === 'loading'">
              <PaButton variant="primary" :loading="true">Loading</PaButton>
            </template>
          </div>
        </div>
        <button 
          class="show-code-button"
          @click="toggleShowCode(`pabutton-states-${activeStatesTab}`)"
        >
          {{ showCode[`pabutton-states-${activeStatesTab}`] ? 'Hide code' : 'Show code' }}
        </button>
        <div v-if="showCode[`pabutton-states-${activeStatesTab}`]" class="code-preview">
          <CodeBlock 
            :code="getStatesCode(activeStatesTab)"
            :copy-key="`pabutton-states-${activeStatesTab}`"
            :show-line-numbers="true"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.component-docs {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: var(--pa-spacing-24, 24px);
  padding-bottom: var(--pa-spacing-48, 48px);
}

.documentation-section {
  margin-top: var(--pa-spacing-32, 32px);
  
  &:first-of-type {
    margin-top: var(--pa-spacing-24, 24px);
  }
}

.documentation-section-title {
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: var(--pa-font-size-300, 20px);
  color: var(--pa-color-surface-container-text, #212529);
  margin: 0 0 var(--pa-spacing-8, 8px) 0;
  transition: color var(--pa-transition-duration-default, 200ms) var(--pa-transition-easing-default, ease);
}

[data-theme="dark"] .documentation-section-title {
  color: #ffffff;
}

.documentation-section-description {
  font-family: 'Inter', sans-serif;
  font-size: var(--pa-font-size-100, 14px);
  color: var(--pa-color-surface-container-text-secondary, #6c757d);
  line-height: 1.6;
  margin: 0 0 var(--pa-spacing-16, 16px) 0;
  transition: color var(--pa-transition-duration-default, 200ms) var(--pa-transition-easing-default, ease);
}

[data-theme="dark"] .documentation-section-description {
  color: #cfd4d9;
}

.example-tabs {
  display: flex;
  gap: var(--pa-spacing-8, 8px);
  margin-bottom: var(--pa-spacing-24, 24px);
  border-bottom: 1px solid var(--pa-color-surface-container-border, #dee2e6);
  padding-bottom: var(--pa-spacing-8, 8px);
  transition: border-color var(--pa-transition-duration-default, 200ms) var(--pa-transition-easing-default, ease);
}

[data-theme="dark"] .example-tabs {
  border-bottom-color: #222529;
}

.example-tab {
  background: none;
  border: none;
  padding: var(--pa-spacing-8, 8px) var(--pa-spacing-16, 16px);
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: var(--pa-font-size-200, 16px);
  color: var(--pa-color-surface-container-text-secondary, #6c757d);
  cursor: pointer;
  transition: color var(--pa-transition-duration-default, 200ms) var(--pa-transition-easing-default, ease);
  position: relative;
  
  &:hover {
    color: var(--pa-color-surface-container-text-hover, #495057);
  }
  
  &.is-active {
    color: var(--pa-color-surface-container-text, #212529);
    
    &::after {
      content: '';
      position: absolute;
      bottom: calc(-1 * var(--pa-spacing-8, 8px) - 1px);
      left: 0;
      right: 0;
      height: 2px;
      background: linear-gradient(-85.36deg, #c10505 7.68%, #d51e33 92.47%);
    }
  }
}

[data-theme="dark"] .example-tab {
  color: #6e757c;
  
  &:hover {
    color: #cfd4d9;
  }
  
  &.is-active {
    color: #ffffff;
  }
}

.example-preview-container {
  background-color: var(--pa-color-surface-base-background, #f7f7f8);
  border: 1px solid var(--pa-color-surface-container-border, #e9ecef);
  border-radius: var(--pa-Border-radius-100, 8px);
  padding: var(--pa-spacing-24, 24px);
  position: relative;
  transition: background-color var(--pa-transition-duration-default, 200ms) var(--pa-transition-easing-default, ease), border-color var(--pa-transition-duration-default, 200ms) var(--pa-transition-easing-default, ease);
}

[data-theme="dark"] .example-preview-container {
  background-color: #0e0e0f;
  border-color: #222529;
}

.example-preview {
  min-height: 80px;
  display: flex;
  align-items: center;
}

.component-preview {
  display: flex;
  align-items: center;
  min-height: 48px;
  padding: var(--pa-spacing-8, 8px) 0;
}

.show-code-button {
  position: absolute;
  top: var(--pa-spacing-16, 16px);
  right: var(--pa-spacing-16, 16px);
  background: none;
  border: 1px solid var(--pa-color-surface-container-border, #dee2e6);
  border-radius: var(--pa-Border-radius-50, 4px);
  padding: var(--pa-spacing-6, 6px) var(--pa-spacing-12, 12px);
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: var(--pa-font-size-100, 14px);
  color: var(--pa-color-surface-container-text-secondary, #6c757d);
  cursor: pointer;
  transition: all var(--pa-transition-duration-default, 200ms) var(--pa-transition-easing-default, ease);
  
  &:hover {
    background-color: var(--pa-color-surface-container-border, #dee2e6);
    color: var(--pa-color-surface-container-text, #212529);
  }
}

[data-theme="dark"] .show-code-button {
  border-color: #222529;
  color: #cfd4d9;
  
  &:hover {
    background-color: #222529;
    color: #ffffff;
  }
}

.code-preview {
  margin-top: var(--pa-spacing-8, 8px);
}
</style>

