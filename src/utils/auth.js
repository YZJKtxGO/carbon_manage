// 获取用户信息
export function getUserInfo() {
  const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}')
  return userInfo
}

// 检查是否是管理员
export function isAdmin() {
  const userInfo = getUserInfo()
  return userInfo.role === 'admin'
} 