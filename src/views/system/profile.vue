<template>
  <div class="profile">
    <el-row :gutter="20">
      <el-col :span="8">
        <el-card>
          <template #header>
            <div class="card-header">
              <span>个人信息</span>
              <el-button type="primary" link @click="handleEdit">编辑</el-button>
            </div>
          </template>
          
          <div class="user-info">
            <div class="avatar-container">
              <el-avatar :size="100" :src="userInfo.avatar">
                <el-icon><UserFilled /></el-icon>
              </el-avatar>
              <el-upload
                v-if="isEditing"
                class="avatar-uploader"
                action="#"
                :show-file-list="false"
                :auto-upload="false"
                :on-change="handleAvatarChange"
              >
                <el-button size="small">更换头像</el-button>
              </el-upload>
            </div>
            
            <el-descriptions :column="1" border>
              <el-descriptions-item label="用户名">
                {{ userInfo.username }}
              </el-descriptions-item>
              <el-descriptions-item label="姓名">
                <template v-if="!isEditing">{{ userInfo.name }}</template>
                <el-input v-else v-model="editForm.name" />
              </el-descriptions-item>
              <el-descriptions-item label="手机号">
                <template v-if="!isEditing">{{ userInfo.phone }}</template>
                <el-input v-else v-model="editForm.phone" />
              </el-descriptions-item>
              <el-descriptions-item label="邮箱">
                <template v-if="!isEditing">{{ userInfo.email }}</template>
                <el-input v-else v-model="editForm.email" />
              </el-descriptions-item>
              <el-descriptions-item label="部门">{{ userInfo.department }}</el-descriptions-item>
              <el-descriptions-item label="角色">{{ userInfo.role }}</el-descriptions-item>
            </el-descriptions>

            <div v-if="isEditing" class="edit-actions">
              <el-button @click="cancelEdit">取消</el-button>
              <el-button type="primary" @click="saveEdit">保存</el-button>
            </div>
          </div>
        </el-card>
      </el-col>

      <el-col :span="16">
        <el-card>
          <template #header>
            <div class="card-header">
              <span>修改密码</span>
            </div>
          </template>

          <el-form 
            ref="passwordFormRef"
            :model="passwordForm"
            :rules="passwordRules"
            label-width="100px"
          >
            <el-form-item label="当前密码" prop="oldPassword">
              <el-input 
                v-model="passwordForm.oldPassword"
                type="password"
                show-password
                placeholder="请输入当前密码"
              />
            </el-form-item>
            <el-form-item label="新密码" prop="newPassword">
              <el-input 
                v-model="passwordForm.newPassword"
                type="password"
                show-password
                placeholder="请输入新密码"
              />
            </el-form-item>
            <el-form-item label="确认新密码" prop="confirmPassword">
              <el-input 
                v-model="passwordForm.confirmPassword"
                type="password"
                show-password
                placeholder="请再次输入新密码"
              />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="changePassword">修改密码</el-button>
            </el-form-item>
          </el-form>
        </el-card>

        <el-card class="mt-20">
          <template #header>
            <div class="card-header">
              <span>最近登录记录</span>
            </div>
          </template>

          <el-table :data="loginRecords" stripe>
            <el-table-column prop="time" label="登录时间" width="180" />
            <el-table-column prop="ip" label="IP地址" width="180" />
            <el-table-column prop="location" label="登录地点" />
            <el-table-column prop="device" label="设备信息" />
          </el-table>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { UserFilled } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'

const isEditing = ref(false)
const userInfo = ref({
  username: 'admin',
  name: '管理员',
  phone: '13800138000',
  email: 'admin@example.com',
  department: '技术部',
  role: '超级管理员',
  avatar: ''
})

const editForm = ref({
  name: '',
  phone: '',
  email: ''
})

const handleEdit = () => {
  isEditing.value = true
  editForm.value = {
    name: userInfo.value.name,
    phone: userInfo.value.phone,
    email: userInfo.value.email
  }
}

const cancelEdit = () => {
  isEditing.value = false
}

const saveEdit = () => {
  userInfo.value = {
    ...userInfo.value,
    ...editForm.value
  }
  isEditing.value = false
  ElMessage.success('保存成功')
}

const handleAvatarChange = (file) => {
  // 处理头像上传
  console.log('头像文件:', file)
}

const passwordFormRef = ref(null)
const passwordForm = ref({
  oldPassword: '',
  newPassword: '',
  confirmPassword: ''
})

const validateConfirmPassword = (rule, value, callback) => {
  if (value !== passwordForm.value.newPassword) {
    callback(new Error('两次输入的密码不一致'))
  } else {
    callback()
  }
}

const passwordRules = {
  oldPassword: [
    { required: true, message: '请输入当前密码', trigger: 'blur' }
  ],
  newPassword: [
    { required: true, message: '请输入新密码', trigger: 'blur' },
    { min: 6, message: '密码长度不能小于6位', trigger: 'blur' }
  ],
  confirmPassword: [
    { required: true, message: '请再次输入新密码', trigger: 'blur' },
    { validator: validateConfirmPassword, trigger: 'blur' }
  ]
}

const changePassword = () => {
  passwordFormRef.value?.validate((valid) => {
    if (valid) {
      ElMessage.success('密码修改成功')
      passwordForm.value = {
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
      }
    }
  })
}

const loginRecords = ref([
  {
    time: '2024-03-20 10:30:00',
    ip: '192.168.1.100',
    location: '广东省深圳市',
    device: 'Chrome 122.0.0 / Windows 10'
  },
  {
    time: '2024-03-19 14:20:00',
    ip: '192.168.1.100',
    location: '广东省深圳市',
    device: 'Chrome 122.0.0 / Windows 10'
  },
  {
    time: '2024-03-18 09:15:00',
    ip: '192.168.1.100',
    location: '广东省深圳市',
    device: 'Chrome 122.0.0 / Windows 10'
  }
])
</script>

<style scoped>
.profile {
  min-height: 100%;
}

.mt-20 {
  margin-top: 20px;
}

.user-info {
  text-align: center;
}

.avatar-container {
  margin-bottom: 20px;
}

.avatar-uploader {
  margin-top: 10px;
}

.edit-actions {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  gap: 20px;
}

:deep(.el-descriptions__label) {
  width: 100px;
  justify-content: flex-end;
}
</style> 