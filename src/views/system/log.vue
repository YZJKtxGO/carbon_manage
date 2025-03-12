<template>
  <div class="log-manage">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>日志管理</span>
          <el-button type="primary" @click="handleExport">导出日志</el-button>
        </div>
      </template>
      
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="username" label="操作人" />
        <el-table-column prop="operation" label="操作内容" />
        <el-table-column prop="ip" label="IP地址" />
        <el-table-column prop="time" label="操作时间" />
        <el-table-column prop="status" label="状态">
          <template #default="scope">
            <el-tag :type="scope.row.status === '成功' ? 'success' : 'danger'">
              {{ scope.row.status }}
            </el-tag>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const tableData = ref([
  {
    username: 'admin',
    operation: '登录系统',
    ip: '192.168.1.1',
    time: '2024-03-20 10:00:00',
    status: '成功'
  },
  {
    username: 'user1',
    operation: '添加设备',
    ip: '192.168.1.2',
    time: '2024-03-20 11:00:00',
    status: '成功'
  }
])

const handleExport = () => {
  // 导出日志逻辑
}
</script>

<style scoped>
.log-manage {
  min-height: 100%;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style> 