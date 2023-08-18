/**
 * 使用安全数据，统一处理错误
 * @param res 请求数据
 * @param param.default 报错时取默认数据
 */
declare function useSafeData<T>(res: { data: T }, param: any = {}): Promise<T>

declare global {
  interface Window {
    useSafeData: typeof useSafeData
  }
}
