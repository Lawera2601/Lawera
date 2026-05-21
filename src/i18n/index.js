import { createI18n } from 'vue-i18n'
import zhCN from './zh-CN.json'
import en from './en.json'

function getSavedLocale() {
  try {
    return localStorage.getItem('locale') || 'zh-CN'
  } catch {
    return 'zh-CN'
  }
}

const savedLocale = getSavedLocale()
document.documentElement.lang = savedLocale === 'en' ? 'en' : 'zh-CN'

const i18n = createI18n({
  legacy: false,
  locale: savedLocale,
  fallbackLocale: 'zh-CN',
  messages: {
    'zh-CN': zhCN,
    'zh': zhCN,
    'en': en
  }
})

export default i18n
