import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter)

const router = new VueRouter({
	base: "/",
	routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('@/views/home/index.vue')
    }
  ]
});

export default router;
