<template>
  <div class="device-maintenance">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>设备维护</span>
          <el-button type="primary" @click="handleAdd">添加维护记录</el-button>
        </div>
      </template>
      
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="deviceName" label="设备名称" />
        <el-table-column prop="maintenanceTime" label="维护时间" />
        <el-table-column prop="maintainer" label="维护人员" />
        <el-table-column prop="status" label="状态">
          <template #default="scope">
            <el-tag :type="scope.row.status === '已完成' ? 'success' : 'warning'">
              {{ scope.row.status }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200">
          <template #default="scope">
            <el-button size="small" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button size="small" type="danger" @click="handleDelete(scope.row)">删除</el-button>
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
    deviceName: '测试设备1',
    maintenanceTime: '2024-03-20',
    maintainer: '张三',
    status: '已完成'
  },
  {
    deviceName: '测试设备2',
    maintenanceTime: '2024-03-21',
    maintainer: '李四',
    status: '进行中'
  }
])

const handleAdd = () => {
  // 添加维护记录逻辑
}

const handleEdit = (row) => {
  // 编辑维护记录逻辑
}

const handleDelete = (row) => {
  // 删除维护记录逻辑
}
</script>

<style scoped>
.device-maintenance {
  min-height: 100%;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style> 