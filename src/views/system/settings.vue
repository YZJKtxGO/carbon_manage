<template>
  <div class="settings">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>系统设置</span>
        </div>
      </template>

      <el-form :model="settingsForm" label-width="120px">
        <el-tabs v-model="activeTab">
          <el-tab-pane label="基本设置" name="basic">
            <el-form-item label="系统名称">
              <el-input v-model="settingsForm.systemName" />
            </el-form-item>
            <el-form-item label="系统Logo">
              <el-upload
                class="logo-uploader"
                action="#"
                :show-file-list="false"
                :auto-upload="false"
                :on-change="handleLogoChange"
              >
                <el-image
                  v-if="settingsForm.logo"
                  :src="settingsForm.logo"
                  class="logo"
                />
                <el-icon v-else class="logo-uploader-icon"><Plus /></el-icon>
              </el-upload>
            </el-form-item>
            <el-form-item label="页面标题">
              <el-input v-model="settingsForm.pageTitle" />
            </el-form-item>
            <el-form-item label="版权信息">
              <el-input v-model="settingsForm.copyright" />
            </el-form-item>
          </el-tab-pane>

          <el-tab-pane label="主题设置" name="theme">
            <el-form-item label="主题色">
              <el-color-picker v-model="settingsForm.primaryColor" />
            </el-form-item>
            <el-form-item label="导航模式">
              <el-radio-group v-model="settingsForm.navMode">
                <el-radio label="side">侧边菜单</el-radio>
                <el-radio label="top">顶部菜单</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="菜单主题">
              <el-radio-group v-model="settingsForm.menuTheme">
                <el-radio label="dark">深色</el-radio>
                <el-radio label="light">浅色</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-tab-pane>

          <el-tab-pane label="系统配置" name="system">
            <el-form-item label="系统通知">
              <el-switch v-model="settingsForm.enableNotification" />
            </el-form-item>
            <el-form-item label="操作日志">
              <el-switch v-model="settingsForm.enableOperationLog" />
            </el-form-item>
            <el-form-item label="登录日志">
              <el-switch v-model="settingsForm.enableLoginLog" />
            </el-form-item>
            <el-form-item label="数据备份">
              <el-time-picker
                v-model="settingsForm.backupTime"
                format="HH:mm"
                placeholder="选择备份时间"
              />
            </el-form-item>
          </el-tab-pane>

          <el-tab-pane label="安全设置" name="security">
            <el-form-item label="密码有效期">
              <el-input-number 
                v-model="settingsForm.passwordExpireDays" 
                :min="0"
                :max="365"
              />
              <span class="form-tip">天（0表示永不过期）</span>
            </el-form-item>
            <el-form-item label="登录失败锁定">
              <el-input-number 
                v-model="settingsForm.loginFailLock" 
                :min="0"
                :max="10"
              />
              <span class="form-tip">次（0表示不锁定）</span>
            </el-form-item>
            <el-form-item label="会话超时">
              <el-input-number 
                v-model="settingsForm.sessionTimeout" 
                :min="1"
                :max="1440"
              />
              <span class="form-tip">分钟</span>
            </el-form-item>
          </el-tab-pane>
        </el-tabs>

        <div class="form-actions">
          <el-button @click="resetSettings">重置</el-button>
          <el-button type="primary" @click="saveSettings">保存设置</el-button>
        </div>
      </el-form>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Plus } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'

const activeTab = ref('basic')

const settingsForm = ref({
  // 基本设置
  systemName: '碳排放管理系统',
  logo: '',
  pageTitle: '碳排放管理系统',
  copyright: '© 2024 碳排放管理系统',

  // 主题设置
  primaryColor: '#409EFF',
  navMode: 'side',
  menuTheme: 'dark',

  // 系统配置
  enableNotification: true,
  enableOperationLog: true,
  enableLoginLog: true,
  backupTime: new Date(2024, 0, 1, 2, 0),

  // 安全设置
  passwordExpireDays: 90,
  loginFailLock: 5,
  sessionTimeout: 30
})

const handleLogoChange = (file) => {
  // 处理Logo上传
  console.log('Logo文件:', file)
}

const resetSettings = () => {
  // 重置设置
  ElMessage.success('设置已重置')
}

const saveSettings = () => {
  // 保存设置
  ElMessage.success('设置保存成功')
}
</script>

<style scoped>
.settings {
  min-height: 100%;
}

.logo-uploader {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  width: 178px;
  height: 178px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.logo-uploader:hover {
  border-color: #409EFF;
}

.logo {
  width: 178px;
  height: 178px;
  display: block;
}

.logo-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
  line-height: 178px;
}

.form-tip {
  margin-left: 10px;
  color: #909399;
}

.form-actions {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  gap: 20px;
}

:deep(.el-tabs__content) {
  padding: 20px 0;
}
</style> 