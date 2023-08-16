import { useUserStoreContext } from '@/store/modules/user'

export default function (config) {
  const useStore = useUserStoreContext()
  console.log('0099')
  if (config) {
    if (!config.headers) {
      config.headers = {}
    }
    if (!config.headers['token']) {
      console.log('--==')
      config.headers['token'] = '0e21d997894c41b7aeb765eb2410672a'
    }
    // if (!config.headers['Cookie']) {
    //   config.headers['Cookie'] = 'SESSION=7dea06bc-a36a-476d-9c14-1266ee9881e3'
    // }
  }
  return config
}
