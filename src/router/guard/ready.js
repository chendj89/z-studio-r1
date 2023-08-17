import router from '..'
export default function useRouteReady() {
  router.onReady(() => {
    const token = window.sessionStorage.getItem('token')
    if (!token) {
      router.app.$message({
        type: 'error',
        message: '请先登录',
        onClose: () => {
          if (!window.top.location.href.includes('login')) {
            window.top.location.href = '/login'
          }
        }
      })
    }
  })
}
