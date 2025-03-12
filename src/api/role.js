import request from '@/utils/request'

// 获取角色列表
export function getRoleList(params) {
  return request({
    url: '/role/list',
    method: 'get',
    params
  })
}

// 创建角色
export function createRole(data) {
  return request({
    url: '/role',
    method: 'post',
    data
  })
}

// 更新角色
export function updateRole(id, data) {
  return request({
    url: `/role/${id}`,
    method: 'put',
    data
  })
}

// 删除角色
export function deleteRole(id) {
  return request({
    url: `/role/${id}`,
    method: 'delete'
  })
}

// 获取角色权限
export function getRolePermissions(id) {
  return request({
    url: `/role/${id}/permissions`,
    method: 'get'
  })
}

// 更新角色权限
export function updateRolePermissions(id, data) {
  return request({
    url: `/role/${id}/permissions`,
    method: 'put',
    data
  })
} 