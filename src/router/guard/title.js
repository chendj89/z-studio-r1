import router from '@/router'
const projectName=''
function usePageTitleGuard() {
  router.afterEach((to) => {
    if (to.meta && to.meta.title) {
      const title = to.meta.title
      document.title = projectName + ' | ' + title
    } else {
      document.title = projectName
    }
  })
}

export default usePageTitleGuard
