import Vue from 'vue'
import ElementUI from 'element-ui' // 引入element-ui
import VueI18n from 'vue-i18n'

// 2.9.3版本element国际化移除来自定义配置
import enLocale from 'element-ui/lib/locale/lang/en'
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'
import locale from 'element-ui/lib/locale'

import enLang from '@/lang/en.json'
import zhCnLang from '@/lang/zh-cn.json'

Vue.use(ElementUI, {
  locale: zhLocale
})
Vue.use(VueI18n)

// 添加element的国际化配置
export const i18n = new VueI18n({
  silentTranslationWarn: true,
  locale: 'zh-cn',
  fallbackLocale: 'zh-cn',
  messages: {
    en: {
      ...enLocale,
      ...enLang
    },
    'zh-cn': {
      ...zhLocale,
      ...zhCnLang
    }
  }
})

Vue.prototype.$t = (args) => i18n.tc.call(i18n, args)

locale.i18n = (key, value) => {
  return i18n.t(key, value)
}
// 引入方舟ui库
import ZjarkUI from 'zjark-ui/lib/zjarkUi.umd.js'
import 'zjark-ui/lib/zjarkUi.css'
Vue.use(ZjarkUI)
ZjarkUI.initZjarkI18n(i18n)

// 引入方舟业务库
import zjarkWeb from 'zjark-web'
import 'zjark-web/lib/zjarkWeb.css'
Vue.use(zjarkWeb)
zjarkWeb.initWebI18n(i18n)
