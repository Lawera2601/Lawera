import { ref, watch } from 'vue'

function getSavedTheme() {
  try {
    return localStorage.getItem('theme') || 'light'
  } catch {
    return 'light'
  }
}

const theme = ref(getSavedTheme())

function applyTheme() {
  document.documentElement.setAttribute('data-theme', theme.value)
  try {
    localStorage.setItem('theme', theme.value)
  } catch {}
}

function toggleTheme() {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
}

applyTheme()

watch(theme, applyTheme)

export function useTheme() {
  return {
    theme,
    toggleTheme
  }
}
