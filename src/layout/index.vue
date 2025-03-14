<template>
  <el-container class="layout-container">
    <!-- 侧边栏 -->
    <el-aside :width="isCollapse ? '64px' : '200px'" class="aside">
      <div class="logo-container">
        <span v-show="!isCollapse">碳排放管理系统</span>
        <el-icon v-show="isCollapse"><Promotion /></el-icon>
      </div>
      <el-menu
        :default-active="activeMenu"
        class="el-menu-vertical"
        :collapse="isCollapse"
        background-color="#304156"
        text-color="#bfcbd9"
        active-text-color="#409EFF"
        router
      >
        <el-menu-item index="/dashboard">
          <el-icon><House /></el-icon>
          <template #title>首页</template>
        </el-menu-item>

        <el-sub-menu index="/device">
          <template #title>
            <el-icon><Monitor /></el-icon>
            <span>设备管理</span>
          </template>
          <el-menu-item index="/device/list">设备列表</el-menu-item>
          <el-menu-item index="/device/category">设备分类</el-menu-item>
          <el-menu-item index="/device/maintenance">设备维护</el-menu-item>
        </el-sub-menu>

        <el-sub-menu index="/data">
          <template #title>
            <el-icon><DataLine /></el-icon>
            <span>数据管理</span>
          </template>
          <el-menu-item index="/data/import">数据导入</el-menu-item>
          <el-menu-item index="/data/analysis">报表分析</el-menu-item>
        </el-sub-menu>

        <el-sub-menu 
          v-if="showSystemMenu" 
          index="/system"
        >
          <template #title>
            <el-icon><Setting /></el-icon>
            <span>系统管理</span>
          </template>
          <el-menu-item index="/system/user">用户管理</el-menu-item>
          <el-menu-item index="/system/role">角色管理</el-menu-item>
          <el-menu-item index="/system/menu">菜单管理</el-menu-item>
          <el-menu-item index="/system/log">日志管理</el-menu-item>
        </el-sub-menu>

        <el-menu-item index="/feedback">
          <el-icon><ChatDotRound /></el-icon>
          <template #title>意见反馈</template>
        </el-menu-item>
      </el-menu>
    </el-aside>

    <el-container>
      <!-- 头部 -->
      <el-header class="header">
        <div class="header-left">
          <el-icon 
            class="collapse-btn"
            @click="toggleCollapse"
          >
            <component :is="isCollapse ? 'Expand' : 'Fold'" />
          </el-icon>
        </div>
        <div class="header-right">
          <!-- 通知组件 -->
          <el-badge :value="unreadCount" :max="99" class="notice-badge">
            <el-popover
              placement="bottom"
              :width="300"
              trigger="click"
              popper-class="notice-popover"
            >
              <template #reference>
                <el-icon class="notice-icon" :size="20"><Bell /></el-icon>
              </template>
              
              <template #default>
                <div class="notice-header">
                  <span>通知</span>
                  <el-button link type="primary" @click="readAll">全部已读</el-button>
                </div>
                
                <el-tabs v-model="activeNoticeTab">
                  <el-tab-pane label="通知" name="notification">
                    <el-scrollbar max-height="300px">
                      <div v-if="notifications.length" class="notice-list">
                        <div 
                          v-for="item in notifications" 
                          :key="item.id"
                          class="notice-item"
                          :class="{ unread: !item.read }"
                          @click="readNotification(item)"
                        >
                          <el-icon class="notice-item-icon" :class="item.type">
                            <component :is="getNoticeIcon(item.type)" />
                          </el-icon>
                          <div class="notice-item-content">
                            <div class="notice-item-title">{{ item.title }}</div>
                            <div class="notice-item-time">{{ item.time }}</div>
                          </div>
                        </div>
                      </div>
                      <el-empty v-else description="暂无通知" />
                    </el-scrollbar>
                  </el-tab-pane>
                  
                  <el-tab-pane label="消息" name="message">
                    <el-scrollbar max-height="300px">
                      <div v-if="messages.length" class="notice-list">
                        <div 
                          v-for="item in messages" 
                          :key="item.id"
                          class="notice-item"
                          :class="{ unread: !item.read }"
                          @click="readMessage(item)"
                        >
                          <el-avatar :size="32" :src="item.avatar" />
                          <div class="notice-item-content">
                            <div class="notice-item-title">{{ item.title }}</div>
                            <div class="notice-item-desc">{{ item.content }}</div>
                            <div class="notice-item-time">{{ item.time }}</div>
                          </div>
                        </div>
                      </div>
                      <el-empty v-else description="暂无消息" />
                    </el-scrollbar>
                  </el-tab-pane>
                </el-tabs>
              </template>
            </el-popover>
          </el-badge>

          <!-- 用户信息 -->
          <el-dropdown>
            <div class="user-info">
              <el-avatar :size="32" :src="userAvatar">
                <el-icon><UserFilled /></el-icon>
              </el-avatar>
              <span class="username">管理员</span>
              <el-icon><CaretBottom /></el-icon>
            </div>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click="$router.push('/system/profile')">
                  <el-icon><User /></el-icon>个人信息
                </el-dropdown-item>
                <el-dropdown-item @click="$router.push('/system/settings')">
                  <el-icon><Setting /></el-icon>系统设置
                </el-dropdown-item>
                <el-dropdown-item divided @click="handleLogout">
                  <el-icon><SwitchButton /></el-icon>退出登录
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </el-header>

      <!-- 标签页导航 -->
      <tags-view />

      <!-- 主要内容区 -->
      <el-main class="main">
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import TagsView from './components/TagsView.vue'
import { 
  Bell,
  Message,
  Warning,
  InfoFilled,
  User, 
  Setting, 
  SwitchButton,
  UserFilled,
  House,
  Monitor,
  Promotion,
  CaretBottom,
  Expand,
  Fold,
  DataLine,
  ChatDotRound
} from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { getUserInfo, logout } from '@/api/user'
import { isAdmin } from '@/utils/auth'

const route = useRoute()
const router = useRouter()
const isCollapse = ref(false)

const activeMenu = computed(() => route.path)

const toggleCollapse = () => {
  isCollapse.value = !isCollapse.value
}

// 用户头像
const userAvatar = ref('')

// 通知相关
const activeNoticeTab = ref('notification')
const unreadCount = computed(() => {
  return notifications.value.filter(n => !n.read).length + 
         messages.value.filter(m => !m.read).length
})

// 模拟通知数据
const notifications = ref([
  {
    id: 1,
    title: '系统更新提醒',
    time: '10分钟前',
    type: 'info',
    read: false
  },
  {
    id: 2,
    title: '设备告警',
    time: '30分钟前',
    type: 'warning',
    read: false
  }
])

// 模拟消息数据
const messages = ref([
  {
    id: 1,
    title: '张三',
    content: '设备维护申请已提交',
    time: '1小时前',
    avatar: '',
    read: false
  },
  {
    id: 2,
    title: '李四',
    content: '数据报表已生成',
    time: '2小时前',
    avatar: '',
    read: false
  }
])

// 获取通知图标
const getNoticeIcon = (type) => {
  switch (type) {
    case 'success':
      return InfoFilled
    case 'warning':
      return Warning
    case 'info':
      return Message
    default:
      return Message
  }
}

// 标记通知已读
const readNotification = (item) => {
  item.read = true
}

// 标记消息已读
const readMessage = (item) => {
  item.read = true
}

// 全部已读
const readAll = () => {
  [...notifications.value, ...messages.value].forEach(item => {
    item.read = true
  })
}

// 获取用户信息
const fetchUserInfo = async () => {
  try {
    const res = await getUserInfo()
    // 存储用户信息
    localStorage.setItem('userInfo', JSON.stringify(res.data))
  } catch (error) {
    console.error('获取用户信息失败:', error)
  }
}

// 退出登录
const handleLogout = async () => {
  try {
    await logout()
    localStorage.removeItem('token')
    localStorage.removeItem('userInfo')
    ElMessage.success('退出成功')
    router.push('/login')
  } catch (error) {
    console.error('退出失败:', error)
  }
}

// 控制系统管理菜单的显示
const showSystemMenu = computed(() => isAdmin())

onMounted(() => {
  fetchUserInfo()
})
</script>

<style scoped>
.layout-container {
  height: 100%;
}

.aside {
  transition: width 0.3s;
  background-color: #304156;
}

.logo-container {
  height: 60px;
  line-height: 60px;
  text-align: center;
  font-size: 16px;
  font-weight: bold;
  color: #fff;
  background-color: #2b2f3a;
}

.el-menu-vertical {
  border-right: none;
}

.header {
  background-color: #fff;
  border-bottom: 1px solid #dcdfe6;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
}

.collapse-btn {
  font-size: 20px;
  cursor: pointer;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 20px;
}

.notice-badge {
  margin-right: 10px;
}

.notice-icon {
  cursor: pointer;
  color: #606266;
}

.notice-icon:hover {
  color: #409EFF;
}

.notice-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 16px;
  border-bottom: 1px solid #eee;
}

.notice-list {
  padding: 0 16px;
}

.notice-item {
  display: flex;
  align-items: flex-start;
  padding: 12px 0;
  cursor: pointer;
  transition: all 0.3s;
  border-bottom: 1px solid #f0f0f0;
}

.notice-item:last-child {
  border-bottom: none;
}

.notice-item:hover {
  background-color: #f5f7fa;
}

.notice-item.unread {
  background-color: #f0f9eb;
}

.notice-item-icon {
  margin-right: 12px;
  font-size: 20px;
  padding-top: 2px;
}

.notice-item-icon.success {
  color: #67c23a;
}

.notice-item-icon.warning {
  color: #e6a23c;
}

.notice-item-content {
  flex: 1;
}

.notice-item-title {
  font-weight: bold;
  margin-bottom: 4px;
}

.notice-item-desc {
  color: #666;
  font-size: 13px;
  margin-bottom: 4px;
}

.notice-item-time {
  color: #999;
  font-size: 12px;
}

.user-info {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.username {
  margin: 0 8px;
  font-size: 14px;
}

:deep(.el-dropdown-menu__item) {
  display: flex;
  align-items: center;
  gap: 8px;
}

:deep(.notice-popover) {
  padding: 0;
  
  .el-tabs__header {
    margin: 0;
  }
  
  .el-tabs__nav {
    width: 100%;
    display: flex;
  }
  
  .el-tabs__item {
    flex: 1;
    text-align: center;
  }
  
  .el-tabs__content {
    padding: 8px 0;
  }
}

.main {
  background-color: #f0f2f5;
  padding: 20px;
  height: calc(100vh - 84px - 34px); /* 减去头部高度和标签页高度 */
  overflow-y: auto;
}
</style> 