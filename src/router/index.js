import { createRouter, createWebHistory } from 'vue-router'
import Layout from '../layout/index.vue'
import { isAdmin } from '@/utils/auth'

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/login/index.vue'),
    meta: { title: '登录' }
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('../views/dashboard/index.vue'),
        meta: { title: '首页', icon: 'House' }
      }
    ]
  },
  {
    path: '/device',
    component: Layout,
    name: 'Device',
    meta: { title: '设备管理', icon: 'Monitor' },
    children: [
      {
        path: 'list',
        name: 'DeviceList',
        component: () => import('../views/device/list.vue'),
        meta: { title: '设备列表' }
      },
      {
        path: 'category',
        name: 'DeviceCategory',
        component: () => import('../views/device/category.vue'),
        meta: { title: '设备分类' }
      },
      {
        path: 'maintenance',
        name: 'DeviceMaintenance',
        component: () => import('../views/device/maintenance.vue'),
        meta: { title: '设备维护' }
      }
    ]
  },
  {
    path: '/system',
    component: Layout,
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
  },
  {
    path: '/data',
    component: Layout,
    name: 'Data',
    meta: { title: '数据管理', icon: 'DataLine' },
    children: [
      {
        path: 'import',
        name: 'DataImport',
        component: () => import('../views/data/import.vue'),
        meta: { title: '数据导入' }
      },
      {
        path: 'analysis',
        name: 'DataAnalysis',
        component: () => import('../views/data/analysis.vue'),
        meta: { title: '报表分析' }
      }
    ]
  },
  {
    path: '/feedback',
    component: Layout,
    children: [
      {
        path: '',
        name: 'Feedback',
        component: () => import('../views/feedback/index.vue'),
        meta: { title: '意见反馈', icon: 'ChatDotRound' }
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    component: () => import('../views/error/404.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// 修改路由守卫
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  const whiteList = ['/login']
  
  if (token) {
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      // 检查系统管理页面的访问权限
      if (to.path.startsWith('/system') && !isAdmin()) {
        next('/403')
        return
      }
      next()
    }
  } else {
    if (whiteList.includes(to.path)) {
      next()
    } else {
      next(`/login?redirect=${to.path}`)
    }
  }
})

export default router 