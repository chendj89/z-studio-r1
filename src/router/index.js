import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const router = new VueRouter({
  base: '/',
  routes: [
    {
      path: '/',
      component: () => import('@/layout/index.vue'),
      children: [
        {
          path: '',
          name: 'Home',
          component: () => import('@/views/home/index.vue')
        },
        {
          path: 'quota',
          name: 'Quota',
          component: () => import('@/views/quota/index.vue')
        },
        {
          path: 'quotaDetail/:name',
          name: 'QuotaDetail',
          component: () => import('@/views/quota/detail.vue')
        }
      ]
    }
  ]
})

export default router
