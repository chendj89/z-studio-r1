import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import { PiniaVuePlugin } from 'pinia'
import pinia from '@/store'
import useRouterGuard from './router/guard'
Vue.use(PiniaVuePlugin)
import './init'
// @ts-ignore
import scss from '@/scss/alias.module.scss'
// @ts-ignore
import '@/scss/app.scss'
// 去除版本环境提示
Vue.config.productionTip = false
let app = new Vue({
  router,
  pinia,
  render: (h) => h(App)
}).$mount('#app')
useRouterGuard()
