import request from '@/utils/request'

// 获取操作日志列表
export function getOperationLogs(params) {
  return request({
    url: '/log/operation',
    method: 'get',
    params
  })
}

// 获取登录日志列表
export function getLoginLogs(params) {
  return request({
    url: '/log/login',
    method: 'get',
    params
  })
}

// 清空日志
export function clearLogs(type) {
  return request({
    url: `/log/${type}/clear`,
    method: 'delete'
  })
} 