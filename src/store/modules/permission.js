import { defineStore } from 'pinia'
import useUserStore from './user'
import router from '@/router'
import { findRootPathRoute, generatorRoutes, mapTwoLevelRouter } from '../help'
let defaultRoutes=[]
const usePermissionStore = defineStore('permission-route', {
  state: () => {
    return {
      permissionRoutes: []
    }
  },
  getters: {
    getPermissionSideBar(state) {
      return state.permissionRoutes.filter((it) => {
        return it.meta && !it.meta.hidden
      })
    },
    getPermissionSplitTabs(state) {
      return state.permissionRoutes.filter((it) => {
        return (
          it.meta && !it.meta.hidden && it.children && it.children.length > 0
        )
      })
    }
  },
  actions: {
    async getRoutes(data) {
      try {
        return generatorRoutes(defaultRoutes)
      } catch (error) {
        console.log(
          '路由加载失败了，请清空一下Cookie和localStorage，重新登录；如果已经采用真实接口的，请确保菜单接口地址真实可用并且返回的数据格式和mock中的一样'
        )
        return []
      }
    },
    async initPermissionRoute() {
      const userStore = useUserStore()
      // 加载路由
      const accessRoutes = await this.getRoutes({
        roleId: userStore.roleId,
        userId: userStore.userId
      })
      const mapRoutes = mapTwoLevelRouter(accessRoutes)
      mapRoutes.forEach((it) => {
        router.addRoute(it)
      })
      // 配置 `/` 路由的默认跳转地址
      router.addRoute({
        path: '/',
        redirect: findRootPathRoute(accessRoutes),
        meta: {
          hidden: true
        }
      })
      // 这个路由一定要放在最后
      router.addRoute({
        path: '/:pathMatch(.*)*',
        redirect: '/404',
        meta: {
          hidden: true
        }
      })
      this.permissionRoutes = []
    },
    isEmptyPermissionRoute() {
      return !this.permissionRoutes || this.permissionRoutes.length === 0
    },
    reset() {
      this.$reset()
    }
  }
})

export default usePermissionStore
