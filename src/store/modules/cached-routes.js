import { defineStore } from 'pinia'

/**
 * 中划线字符驼峰
 * @param {*} str 要转换的字符串
 * @returns 返回值
 */
function toHump(str) {
  if (!str) return str
  return str
    .replace(/\-(\w)/g, function (all, letter) {
      return letter.toUpperCase()
    })
    .replace(/(\s|^)[a-z]/g, function (char) {
      return char.toUpperCase()
    })
}

const useCachedRouteStore = defineStore('cached-routes', {
  state: () => {
    return {
      cachedRoutes: []
    }
  },
  getters: {
    getCachedRouteName(state) {
      return state.cachedRoutes
    }
  },
  actions: {
    initCachedRoute(routes) {
      this.cachedRoutes = routes.map((it) => {
        return toHump(it)
      })
    },
    setCachedRoutes(cachedRoutes) {
      this.cachedRoutes = cachedRoutes
    },
    resetCachedRoutes() {
      this.$reset()
    }
  }
})

export default useCachedRouteStore
