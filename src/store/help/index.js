import { isExternal, toHump } from '@/utils'
import { resolve } from 'path-browserify'
import { h, ref } from 'vue'
let asyncRoutes=[]
export function loadComponents() {
  return import.meta.glob('/src/views/**/*.vue')
}

export const asynComponents = loadComponents()

export function getComponent(it) {
  return asynComponents[getFilePath(it)]
}

export function getFilePath(it) {
  if (!it.localFilePath) {
    it.localFilePath = it.menuUrl
  }
  it.localFilePath = resolve('/', it.localFilePath)
  return '/src/views' + it.localFilePath + '.vue'
}

export function findRootPathRoute(routes) {
  for (let index = 0; index < routes.length; index++) {
    const route = routes[index]
    const rootRoute = route.children?.find(
      (it) => it.meta && it.meta.isRootPath
    )
    if (rootRoute) {
      return rootRoute.path
    }
  }
  return routes &&
    routes.length > 0 &&
    routes[0].children &&
    routes[0].children.length > 0
    ? routes[0].children[0].path
    : '/'
}

export function filterRoutesFromLocalRoutes(route, localRoutes, path = '/') {
  const filterRoute = localRoutes.find((it) => {
    return resolve(path, it.path) === route.menuUrl
  })
  if (filterRoute) {
    filterRoute.meta = {
      title: route.menuName,
      affix: !!route.affix,
      cacheable: !!route.cacheable,
      icon: route.icon || 'menu',
      iconPrefix: route.iconPrefix || 'icon',
      badge: route.badge,
      hidden: !!route.hidden,
      isRootPath: !!route.isRootPath,
      isSingle: !!route.isSingle,
      ...filterRoute.meta
    }
    const parentPath = resolve(path, filterRoute.path)
    if (
      Array.isArray(route.children) &&
      route.children.length > 0 &&
      Array.isArray(filterRoute.children) &&
      filterRoute.children.length > 0
    ) {
      const tempChildren = []
      route.children.forEach((it) => {
        const childFilterRoute = filterRoutesFromLocalRoutes(
          it,
          filterRoute.children,
          parentPath
        )
        childFilterRoute && tempChildren.push(childFilterRoute)
      })
      filterRoute.children = tempChildren
    }
  }
  return filterRoute
}

export function isMenu(it) {
  return it.children && it.children.length > 0
}

export function getNameByUrl(menuUrl) {
  const temp = menuUrl.split('/')
  return toHump(temp[temp.length - 1])
}

export function generatorRoutes(res) {
  const tempRoutes = []
  res.forEach((it) => {
    const isMenuFlag = isMenu(it)
    const localRoute = isMenuFlag
      ? filterRoutesFromLocalRoutes(it, asyncRoutes)
      : null
    if (localRoute) {
      tempRoutes.push(localRoute)
    } else {
      const route = {
        path: it.outLink && isExternal(it.outLink) ? it.outLink : it.menuUrl,
        name: it.routeName || getNameByUrl(it.menuUrl),
        component: isMenuFlag ? LAYOUT : getComponent(it),
        meta: {
          hidden: !!it.hidden,
          title: it.menuName,
          affix: !!it.affix,
          cacheable: !!it.cacheable,
          icon: it.icon || 'menu',
          iconPrefix: it.iconPrefix || 'icon',
          badge: it.badge,
          isRootPath: !!it.isRootPath,
          isSingle: !!it.isSingle
        }
      }
      if (it.children) {
        route.children = generatorRoutes(it.children)
      }
      tempRoutes.push(route)
    }
  })
  return tempRoutes
}

export function mapTwoLevelRouter(srcRoutes) {
  function addParentRoute(routes, parent, parentPath) {
    routes.forEach((it) => {
      if (!isExternal(it.path)) {
        it.path = resolve(parentPath, it.path)
      }
      parent.push(it)
      if (it.children && it.children.length > 0) {
        addParentRoute(it.children, parent, it.path)
      }
    })
  }
  if (srcRoutes && srcRoutes.length > 0) {
    const tempRoutes = []
    srcRoutes.forEach((it) => {
      const route = { ...it }
      const parentRoutes = []
      if (route.children && route.children.length > 0) {
        addParentRoute(route.children, parentRoutes, route.path)
      }
      parentRoutes && parentRoutes.length > 0 && (route.children = parentRoutes)
      tempRoutes.push(route)
    })
    return tempRoutes
  }
  return []
}

export function findAffixedRoutes(routes) {
  const temp = []
  routes.forEach((it) => {
    if (it.meta && it.meta.affix) {
      temp.push(it)
    }
  })
  return temp
}

export function findCachedRoutes(routes) {
  const temp = []
  routes.forEach((it) => {
    if (it.name && it.meta && it.meta.cacheable) {
      temp.push(it.name)
    }
  })
  return temp
}

export function findRouteByUrl(routes, path) {
  if (!path || !routes) {
    return null
  }
  let tempRoute = null
  for (let index = 0; index < routes.length; index++) {
    const temp = routes[index]
    if (temp.path === path) {
      tempRoute = temp
      return tempRoute
    }
    if (temp.children) {
      tempRoute = findRouteByUrl(temp.children, path)
      if (tempRoute) {
        return tempRoute
      }
    }
  }
  return null
}
