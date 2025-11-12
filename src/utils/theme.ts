type Theme = 'light' | 'dark'

const THEME_STORAGE_KEY = 'pa-ui-theme'
const DEFAULT_THEME: Theme = 'dark'

export function getTheme(): Theme {
  if (typeof window === 'undefined') {
    return DEFAULT_THEME
  }

  const stored = localStorage.getItem(THEME_STORAGE_KEY) as Theme | null
  if (stored && (stored === 'light' || stored === 'dark')) {
    return stored
  }

  return DEFAULT_THEME
}

export function setTheme(theme: Theme): void {
  if (typeof window === 'undefined') {
    return
  }

  localStorage.setItem(THEME_STORAGE_KEY, theme)
  document.documentElement.setAttribute('data-theme', theme)
}

export function initTheme(): void {
  if (typeof window === 'undefined') {
    return
  }

  const theme = getTheme()
  setTheme(theme)
}

