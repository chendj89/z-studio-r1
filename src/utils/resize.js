import { onMounted, onBeforeUnmount } from 'vue'
/**
 * 添加resize
 * @param {*} callback 
 */
export function addResizeListener(callback) {
  const resize = () => {
    callback()
  }
  onMounted(() => {
    window.addEventListener('resize', resize)
  })
  onBeforeUnmount(() => {
    window.removeEventListener('resize', resize)
  })
}
