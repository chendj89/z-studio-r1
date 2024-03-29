import router from '..'
import { getTokenFromUrl } from '@/utils'
export default function useRouteReady() {
  router.onReady(() => {
    const token = window.sessionStorage.getItem('token')
    const urlToken = getTokenFromUrl(location.href, 'token')
    if (urlToken) {
      sessionStorage.setItem('token', urlToken)
      return
    }
    if (!token) {
      router.app.$message({
        type: 'error',
        message: '请先登录',
        onClose: () => {
          if (!window.top.location.href.includes('login')) {
            window.top.location.href = '/#/login'
          }
        }
      })
    }
  })
}
