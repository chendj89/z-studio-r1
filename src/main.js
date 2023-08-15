import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import './init'
// @ts-ignore
import scss from '@/scss/alias.module.scss'
// @ts-ignore
import "@/scss/app.scss";  
let app = new Vue({
  router,
  render: (h) => h(App)
}).$mount('#app')
