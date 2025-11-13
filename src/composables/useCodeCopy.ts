import { ref } from 'vue'

export function useCodeCopy() {
  const showCode = ref<Record<string, boolean>>({})

  const copyToClipboard = async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text)
      showCode.value[`copied-${key}`] = true
      setTimeout(() => {
        showCode.value[`copied-${key}`] = false
      }, 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const toggleShowCode = (key: string) => {
    showCode.value[key] = !showCode.value[key]
  }

  const getCodeTextForCopy = (code: string | undefined): string => {
    if (!code) return ''
    return code.trim()
  }

  const formatCodeWithLineNumbers = (code: string): string => {
    const lines = code.split('\n')
    const maxDigits = String(lines.length).length
    return lines.map((line, index) => {
      const lineNumber = String(index + 1).padStart(maxDigits, ' ')
      return `${lineNumber}  ${line}`
    }).join('\n')
  }

  return {
    showCode,
    copyToClipboard,
    toggleShowCode,
    getCodeTextForCopy,
    formatCodeWithLineNumbers
  }
}

