<script setup lang="ts">
import { computed, ref, onMounted, watch } from 'vue'
import { createHighlighter, type Highlighter } from 'shiki'

interface Props {
  code: string
  copyKey: string
  showLineNumbers?: boolean
  language?: string
}

const props = withDefaults(defineProps<Props>(), {
  showLineNumbers: false,
  language: 'vue'
})

const copied = ref(false)
const highlighter = ref<Highlighter | null>(null)
const highlightedCode = ref('')
const currentTheme = ref<'light' | 'dark'>('light')

const getCurrentTheme = (): 'light' | 'dark' => {
  return document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light'
}

onMounted(async () => {
  currentTheme.value = getCurrentTheme()
  
  // Watch for theme changes
  const observer = new MutationObserver(() => {
    const newTheme = getCurrentTheme()
    if (newTheme !== currentTheme.value) {
      currentTheme.value = newTheme
      highlightCode()
    }
  })
  
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-theme']
  })
  
  try {
    highlighter.value = await createHighlighter({
      themes: ['github-dark', 'github-light'],
      langs: ['vue', 'typescript', 'javascript', 'json', 'scss', 'css', 'html']
    })
    highlightCode()
  } catch (err) {
    console.error('Failed to initialize highlighter:', err)
    highlightedCode.value = props.code
  }
})

watch(() => props.code, () => {
  highlightCode()
})

watch(() => props.language, () => {
  highlightCode()
})

const highlightCode = async () => {
  if (!highlighter.value || !props.code) {
    highlightedCode.value = props.code
    return
  }

  try {
    const theme = currentTheme.value === 'dark' ? 'github-dark' : 'github-light'
    const html = highlighter.value.codeToHtml(props.code, {
      lang: props.language,
      theme: theme
    })
    
    if (props.showLineNumbers) {
      const lines = props.code.split('\n')
      const maxDigits = String(lines.length).length
      
      // Add line numbers to each line element
      let lineIndex = 0
      highlightedCode.value = html.replace(/<span class="line">/g, (match) => {
        const lineNum = String(lineIndex + 1).padStart(maxDigits, ' ')
        lineIndex++
        return `${match}<span class="line-number">${lineNum}</span>`
      })
      
      // If Shiki doesn't use .line class, wrap each line manually
      if (!html.includes('class="line"')) {
        const numberedLines = lines.map((line, index) => {
          const lineNum = String(index + 1).padStart(maxDigits, ' ')
          return `<span class="line"><span class="line-number">${lineNum}</span>${line || ' '}</span>`
        }).join('\n')
        highlightedCode.value = html.replace(/<pre[^>]*>[\s\S]*?<\/pre>/, () => {
          return `<pre>${numberedLines}</pre>`
        })
      }
    } else {
      highlightedCode.value = html
    }
  } catch (err) {
    console.error('Failed to highlight code:', err)
    highlightedCode.value = props.code
  }
}

const formattedCode = computed(() => {
  return highlightedCode.value || props.code
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
    <code id="code" v-html="formattedCode"></code>
  </pre>
</template>

<style lang="scss" scoped>
.code-block {
  background-color: var(--pa-code-block-background);
  border: var(--pa-border-width-thin) solid var(--pa-code-block-border-color);
  border-radius: var(--pa-code-block-border-radius);
  padding: 0;
  overflow-x: auto;
  margin: 0;
  position: relative;
  transition: background-color var(--pa-code-block-transition-duration-default) var(--pa-code-block-transition-easing-default), border-color var(--pa-code-block-transition-duration-default) var(--pa-code-block-transition-easing-default);
  
  &:hover .copy-code-button {
    opacity: 1;
  }
  
  code {
    display: block;
    font-family: 'Roboto Mono', 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
    font-size: var(--pa-code-block-code-font-size);
    line-height: 1.5;
    white-space: pre;
    padding: var(--pa-code-block-code-padding-default);
    padding-right: calc(var(--pa-code-block-code-padding-right) + 80px);
    margin: 0;
    color: var(--pa-color-surface-container-text);
    transition: color var(--pa-code-block-transition-duration-default) var(--pa-code-block-transition-easing-default);
    background-color: transparent !important;
    position: relative;
    z-index: 1;
    
    &:has(.line-number) {
      padding-left: 0;
    }
    
    &:not(:has(.line-number)) {
      padding-left: var(--pa-code-block-code-padding-left);
    }
    
    &::selection {
      background-color: rgba(193, 5, 5, 0.2);
    }

    :deep(pre) {
      margin: 0;
      padding: 0;
      background: transparent !important;
      position: relative;
    }

    :deep(pre code) {
      background: transparent !important;
    }

    :deep([style*="background-color"]) {
      background-color: transparent !important;
    }

    :deep(.line) {
      display: block;
      position: relative;
      padding-left: 76px;
      min-height: 1.5em;
      white-space: pre;
      margin-bottom: -20px;
      margin-left: -12px;
      
      &:last-child {
        margin-bottom: 0;
      }
    }

    :deep(.line-number) {
      position: absolute;
      left: 0;
      top: 0;
      width: var(--pa-code-block-line-number-width);
      padding-right: var(--pa-code-block-line-number-padding-right);
      text-align: right;
      font-family: 'Roboto Mono', 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
      font-size: var(--pa-code-block-line-number-font-size);
      line-height: 1.5;
      color: var(--pa-color-surface-container-text-secondary);
      user-select: none;
      pointer-events: none;
      white-space: pre;
      transition: color var(--pa-code-block-transition-duration-default) var(--pa-code-block-transition-easing-default);
    }
  }
  
  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: var(--pa-code-block-line-number-width);
    background-color: var(--pa-color-surface-container-background);
    border-right: var(--pa-border-width-thin) solid var(--pa-color-surface-container-border);
    border-radius: var(--pa-code-block-border-radius) 0 0 var(--pa-code-block-border-radius);
    transition: background-color var(--pa-code-block-transition-duration-default) var(--pa-code-block-transition-easing-default), border-color var(--pa-code-block-transition-duration-default) var(--pa-code-block-transition-easing-default);
    z-index: 0;
    margin-right: 28px;
  }
}

.copy-code-button {
  position: absolute;
  top: var(--pa-code-block-copy-button-top);
  right: var(--pa-code-block-copy-button-right);
  background-color: var(--pa-color-surface-container-background);
  border: var(--pa-border-width-thin) solid var(--pa-color-surface-container-border);
  border-radius: var(--pa-code-block-copy-button-border-radius);
  padding: var(--pa-code-block-copy-button-padding-y) var(--pa-code-block-copy-button-padding-x);
  font-family: 'Inter', sans-serif;
  font-size: var(--pa-code-block-copy-button-font-size);
  font-weight: 500;
  color: var(--pa-color-surface-container-text-secondary);
  cursor: pointer;
  opacity: 0;
  transition: all var(--pa-code-block-transition-duration-default) var(--pa-code-block-transition-easing-default);
  z-index: 10;
  display: flex;
  align-items: center;
  gap: var(--pa-code-block-copy-button-gap);
  margin: 0;
  
  &:hover {
    background-color: var(--pa-color-surface-cards-hover-background, var(--pa-color-surface-container-border));
    color: var(--pa-color-surface-container-text);
    border-color: var(--pa-color-surface-container-border);
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
</style>

