<script setup lang="ts">
import { computed, ref } from 'vue'

interface Props {
  code: string
  copyKey: string
  showLineNumbers?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  showLineNumbers: false
})

const copied = ref(false)

const formatCodeWithLineNumbers = (code: string): string => {
  const lines = code.split('\n')
  const maxDigits = String(lines.length).length
  return lines.map((line, index) => {
    const lineNumber = String(index + 1).padStart(maxDigits, ' ')
    return `${lineNumber}  ${line}`
  }).join('\n')
}

const formattedCode = computed(() => {
  return props.showLineNumbers ? formatCodeWithLineNumbers(props.code) : props.code
})

const getCodeTextForCopy = (code: string): string => {
  if (!code) return ''
  return code.trim()
}

const handleCopy = async () => {
  try {
    await navigator.clipboard.writeText(getCodeTextForCopy(props.code))
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 2000)
  } catch (err) {
    console.error('Failed to copy:', err)
  }
}
</script>

<template>
  <pre class="code-block">
    <button 
      class="copy-code-button"
      @click="handleCopy"
      :aria-label="copied ? 'Copied!' : 'Copy code'"
    >
      <svg v-if="!copied" width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M5.5 3.5H3.5C2.67157 3.5 2 4.17157 2 5V12.5C2 13.3284 2.67157 14 3.5 14H11C11.8284 14 12.5 13.3284 12.5 12.5V10.5M5.5 3.5C5.5 2.67157 6.17157 2 7 2H9.5M5.5 3.5C5.5 4.32843 6.17157 5 7 5H9.5M9.5 5H11C11.8284 5 12.5 5.67157 12.5 6.5V10.5M9.5 5V6.5C9.5 7.32843 10.1716 8 11 8H12.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      <svg v-else width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M13.5 4L6 11.5L2.5 8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      <span>{{ copied ? 'Copied!' : 'Copy' }}</span>
    </button>
    <code>{{ formattedCode }}</code>
  </pre>
</template>

<style lang="scss" scoped>
.code-block {
  background-color: var(--pa-color-surface-base-background, #f7f7f8);
  border: 1px solid var(--pa-color-surface-container-border, #e9ecef);
  border-radius: var(--pa-Border-radius-100, 8px);
  padding: 0;
  overflow-x: auto;
  margin: 0;
  position: relative;
  transition: background-color var(--pa-transition-duration-default, 200ms) var(--pa-transition-easing-default, ease), border-color var(--pa-transition-duration-default, 200ms) var(--pa-transition-easing-default, ease);
  
  &:hover .copy-code-button {
    opacity: 1;
  }
  
  code {
    display: block;
    font-family: 'Roboto Mono', 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
    font-size: var(--pa-font-size-100, 14px);
    line-height: 1.6;
    white-space: pre;
    padding: var(--pa-spacing-24, 24px);
    padding-left: calc(48px + var(--pa-spacing-16, 16px));
    padding-right: calc(var(--pa-spacing-12, 12px) + 80px);
    margin: 0;
    color: var(--pa-color-surface-container-text, #495057);
    transition: color var(--pa-transition-duration-default, 200ms) var(--pa-transition-easing-default, ease);
    background-color: transparent;
    background-image: 
      linear-gradient(
        to right,
        transparent 0,
        transparent 48px,
        var(--pa-color-surface-container-border, #e9ecef) 48px,
        var(--pa-color-surface-container-border, #e9ecef) 49px,
        transparent 49px
      );
    background-clip: padding-box;
    position: relative;
    z-index: 1;
    
    &::selection {
      background-color: rgba(193, 5, 5, 0.2);
    }
  }
  
  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 48px;
    background-color: var(--pa-color-surface-container-background, #ffffff);
    border-right: 1px solid var(--pa-color-surface-container-border, #e9ecef);
    border-radius: var(--pa-Border-radius-100, 8px) 0 0 var(--pa-Border-radius-100, 8px);
    transition: background-color var(--pa-transition-duration-default, 200ms) var(--pa-transition-easing-default, ease), border-color var(--pa-transition-duration-default, 200ms) var(--pa-transition-easing-default, ease);
    z-index: 0;
  }
}

[data-theme="dark"] .code-block {
  background-color: #0e0e0f;
  border-color: #222529;
  
  code {
    color: #cfd4d9;
    background-image: 
      linear-gradient(
        to right,
        transparent 0,
        transparent 48px,
        #222529 48px,
        #222529 49px,
        transparent 49px
      );
  }
  
  &::before {
    background-color: #151517;
    border-color: #222529;
  }
}

.copy-code-button {
  position: absolute;
  top: var(--pa-spacing-12, 12px);
  right: var(--pa-spacing-12, 12px);
  background-color: var(--pa-color-surface-container-background, #ffffff);
  border: 1px solid var(--pa-color-surface-container-border, #e9ecef);
  border-radius: var(--pa-Border-radius-50, 4px);
  padding: var(--pa-spacing-6, 6px) var(--pa-spacing-10, 10px);
  font-family: 'Inter', sans-serif;
  font-size: var(--pa-font-size-100, 14px);
  font-weight: 500;
  color: var(--pa-color-surface-container-text-secondary, #6c757d);
  cursor: pointer;
  opacity: 0;
  transition: all var(--pa-transition-duration-default, 200ms) var(--pa-transition-easing-default, ease);
  z-index: 10;
  display: flex;
  align-items: center;
  gap: var(--pa-spacing-6, 6px);
  margin: 0;
  
  &:hover {
    background-color: var(--pa-color-surface-container-border, #e9ecef);
    color: var(--pa-color-surface-container-text, #212529);
    border-color: var(--pa-color-surface-container-border, #e9ecef);
  }
  
  &:active {
    transform: scale(0.98);
  }
  
  svg {
    width: 16px;
    height: 16px;
    flex-shrink: 0;
  }
}

[data-theme="dark"] .copy-code-button {
  background-color: #151517;
  border-color: #222529;
  color: #cfd4d9;
  
  &:hover {
    background-color: #222529;
    color: #ffffff;
    border-color: #222529;
  }
}
</style>

