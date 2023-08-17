import useCachedGuard from './cached'
import usePermissionGuard from './permission'
import usePageTitleGuard from './title'
import useVisitedGuard from './visited'
import useRouteReady from './ready'

export default function useRouterGuard() {
  usePermissionGuard()
  useVisitedGuard()
  useCachedGuard()
  usePageTitleGuard()
  useRouteReady()
}
