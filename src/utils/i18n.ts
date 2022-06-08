import { createI18n } from 'vue-i18n'

// 自己的语言配置
import enLocale from './lang/en'
import zhLocale from './lang/zh-cn'

// 语言配置整合
const messages = {
  en: {
    ...enLocale
  },
  zh: {
    ...zhLocale,
  }
}

// 创建 i18n
const i18n = createI18n({
  legacy: false,
  globalInjection: true,  // 全局模式，可以直接使用 $t
  locale: 'zh',
  messages: messages
})


export { i18n }