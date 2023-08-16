import { onBeforeUnmount } from 'vue'
let worker = null
/**
 * 使用js worker
 * @param {*} path 路径
 */
export function useSafeWorker({ path, success, error }) {
  if (worker) {
    worker.terminate()
  }
  worker = new Worker(path)
  if (success) {
    worker.onmessage = success
  }
  if (error) {
    worker.onerror = error
  }
  return worker
}
