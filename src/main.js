import Vue from 'vue'
import App from './App.vue'
import './init'
// Vue.prototype.$t = (str) => {
//   console.log('str',str)
//   return str
// }
let app = new Vue({
  render: (h) => h(App)
}).$mount('#app')
