import { createRouter, createWebHistory } from 'vue-router'
import Layout from '../layout/index.vue'

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
        meta: { title: '设备列表',btnPermissions: ['admin'] }
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

// 添加路由守卫
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  
  // 白名单路由 - 不需要登录就可以访问
  const whiteList = ['/login']
  
  if (token) {
    if (to.path === '/login') {
      // 已登录且要跳转的页面是登录页
      next({ path: '/' })
    } else {
      next()
    }
  } else {
    // 未登录
    if (whiteList.includes(to.path)) {
      // 在免登录白名单中，直接进入
      next()
    } else {
      // 其他没有访问权限的页面将被重定向到登录页面
      next(`/login?redirect=${to.path}`)
    }
  }
})

export default router 