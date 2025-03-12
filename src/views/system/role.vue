<template>
  <div class="role-manage">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>角色管理</span>
          <el-button type="primary" @click="handleAdd">添加角色</el-button>
        </div>
      </template>
      
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="roleName" label="角色名称" />
        <el-table-column prop="roleCode" label="角色编码" />
        <el-table-column prop="description" label="描述" />
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
    roleName: '超级管理员',
    roleCode: 'ADMIN',
    description: '系统最高权限'
  },
  {
    roleName: '普通用户',
    roleCode: 'USER',
    description: '基础操作权限'
  }
])

const handleAdd = () => {
  // 添加角色逻辑
}

const handleEdit = (row) => {
  // 编辑角色逻辑
}

const handleDelete = (row) => {
  // 删除角色逻辑
}
</script>

<style scoped>
.role-manage {
  min-height: 100%;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style> 