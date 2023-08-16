import Axios from 'axios'
import qs from 'qs'
export const CONTENT_TYPE = 'Content-Type'
export const FORM_URLENCODED =
  'application/x-www-form-urlencoded; charset=UTF-8'
export const APPLICATION_JSON = 'application/json; charset=UTF-8'
export const TEXT_PLAIN = 'text/plain; charset=UTF-8'

const service = Axios.create({
  baseURL: '/',
  timeout: 10 * 60 * 1000
})

service.interceptors.request.use(
  (config) => {
    !config.headers && (config.headers = {})
    if (!config.headers[CONTENT_TYPE]) {
      config.headers[CONTENT_TYPE] = APPLICATION_JSON
    }
    if (config.headers[CONTENT_TYPE] === FORM_URLENCODED) {
      config.data = qs.stringify(config.data)
    }
    if (!config.headers['token']) {
      config.headers['token'] = sessionStorage.getItem('token') || ''
    }
    return config
  },
  (error) => {
    return Promise.reject(error.response)
  }
)

service.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (import.meta.env.MODE === 'development') {
      console.log(error)
    }
    return Promise.reject({ code: 500, msg: '服务器异常，请稍后重试…' })
  }
)

export default service
