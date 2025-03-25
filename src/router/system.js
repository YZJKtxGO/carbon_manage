const system = {
    path: '/system',
    component: () => import('../layout/index.vue'),
    name: 'System',
    meta: { title: '系统管理', icon: 'Setting' },
    children: [
      {
        path: 'profile',
        name: 'Profile',
        component: () => import('../views/system/profile.vue'),
        meta: { title: '个人信息', hidden: true }
      },
      {
        path: 'settings',
        name: 'Settings',
        component: () => import('../views/system/settings.vue'),
        meta: { title: '系统设置', hidden: true }
      },
      {
        path: 'user',
        name: 'UserManage',
        component: () => import('../views/system/user.vue'),
        meta: { title: '用户管理' }
      },
      {
        path: 'role',
        name: 'RoleManage',
        component: () => import('../views/system/role.vue'),
        meta: { title: '角色管理' }
      },
      {
        path: 'menu',
        name: 'MenuManage',
        component: () => import('../views/system/menu.vue'),
        meta: { title: '菜单管理' }
      },
      {
        path: 'log',
        name: 'LogManage',
        component: () => import('../views/system/log.vue'),
        meta: { title: '日志管理' }
      }
    ]
  };
  export default system;