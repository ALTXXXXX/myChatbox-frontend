import axios, { type AxiosInstance, type AxiosResponse, type InternalAxiosRequestConfig } from 'axios'

/** 创建 Axios 实例，支持扩展多接口 */
const createInstance = (baseURL: string, timeout = 8000): AxiosInstance => {
  const instance = axios.create({
    baseURL,
    timeout,
    headers: {
      'Content-Type': 'application/json',
    },
  })

  // 请求拦截器
  instance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      // 可在此添加 token 等通用请求头
      return config
    },
    (error) => Promise.reject(error)
  )

  // 响应拦截器
  instance.interceptors.response.use(
    (response: AxiosResponse) => {
      return response.data
    },
    (error) => {
      console.error('[API Error]', error)
      return Promise.reject(error)
    }
  )

  return instance
}

/** 默认实例 —— 指向 Vite proxy `/api` → 后端 `http://localhost:8000` */
const request = createInstance('/api')

export { createInstance }
export default request
