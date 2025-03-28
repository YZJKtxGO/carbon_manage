import axios from 'axios'
import { ElMessage } from 'element-plus'

// 创建 axios 实例
const request = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api', // 从环境变量获取基础URL
  timeout: 15000 // 请求超时时间
})

// 请求拦截器
request.interceptors.request.use(
  config => {
    // 从 localStorage 获取 token
    const token = localStorage.getItem('token')
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 响应拦截器
request.interceptors.response.use(
  response => {
    const res = response.data
    
    // 这里假设后端返回格式为 { code: number, data: any, message: string }
    if (res.code === 200) {
      return res
    } else {
      ElMessage.error(res.message || '请求失败')
      
      // 处理特定错误码
      if (res.code === 401) {
        // token 过期或未登录
        localStorage.removeItem('token')
        window.location.href = '/login'
      }
      return Promise.reject(res)
    }
  },
  error => {
    if (error.response?.status === 401) {
      // token过期或无效
      localStorage.removeItem('token')
      window.location.href = '/login'
    }
    ElMessage.error(error.message || '请求失败')
    return Promise.reject(error)
  }
)

export default request 