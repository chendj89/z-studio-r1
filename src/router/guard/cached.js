import { findCachedRoutes } from '@/store/help'
import useCachedRouteStore from '@/store/modules/cached-routes'
import router from '..'

function useCachedGuard() {
  router.beforeEach((to,from,next) => {
    const cachedRouteStore = useCachedRouteStore()
    if (cachedRouteStore.getCachedRouteName.length === 0) {
      cachedRouteStore.initCachedRoute(findCachedRoutes(router.getRoutes()))
    }
    next()
  })
}

export default useCachedGuard
