<script setup>
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()

function toggleLang() {
  locale.value = locale.value === 'zh-CN' ? 'en' : 'zh-CN'
  try {
    localStorage.setItem('locale', locale.value)
  } catch {}
  document.documentElement.lang = locale.value === 'zh-CN' ? 'zh-CN' : 'en'
}
</script>

<template>
  <button
    class="lang-switch"
    @click="toggleLang"
    :aria-label="locale === 'zh-CN' ? 'Switch to English' : '切换到中文'"
  >
    <span class="lang-label">{{ locale === 'zh-CN' ? 'EN' : '中文' }}</span>
  </button>
</template>

<style scoped>
.lang-switch {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 40px;
  border-radius: var(--radius-sm);
  font-size: var(--font-size-sm);
  font-weight: 600;
  letter-spacing: 0.02em;
  color: var(--color-text-secondary);
  transition: all var(--transition-fast);
}

.lang-switch:hover {
  color: var(--color-accent);
  background: var(--color-accent-light);
}

.lang-label {
  line-height: 1;
}
</style>
