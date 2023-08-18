import Vue from 'vue'
import VueRouter from 'vue-router'

const originPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originPush.call(this, location).catch((err) => err)
}

Vue.use(VueRouter)

const router = new VueRouter({
  mode:'history',
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
          component: () => import('@/views/quota/index.vue'),
          children: [
            {
              path: ':id?',
              name: 'Quota',
              component: () => import('@/views/quota/list.vue')
            },
            {
              path: ':id/:name',
              name: 'QuotaDetail',
              component: () => import('@/views/quota/detail.vue')
            }
          ]
        }
      ]
    }
  ]
})

export default router
