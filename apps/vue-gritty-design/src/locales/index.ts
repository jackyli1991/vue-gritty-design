import { createI18n } from 'vue-i18n'
import { useStorage } from '@vueuse/core'
import zhCN from './zh-CN'
import enUS from './en-US'

export type LocaleType = 'zh-CN' | 'en-US'

export const localeList = [
  { value: 'zh-CN', label: '简体中文' },
  { value: 'en-US', label: 'English' },
]

const _locale = useStorage('locale', 'zh-CN')

const i18n = createI18n({
  legacy: false,
  locale: _locale.value,
  fallbackLocale: 'zh-CN',
  messages: {
    'zh-CN': zhCN,
    'en-US': enUS,
  },
})

// 设置语言
export const setLocale = (locale: LocaleType) => {
  i18n.global.locale.value = locale
  _locale.value = locale
  document.querySelector('html')?.setAttribute('lang', locale)
}

export default i18n
