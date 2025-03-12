<template>
  <div class="device-category">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>设备分类</span>
          <el-button type="primary" @click="handleAdd">添加分类</el-button>
        </div>
      </template>
      
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="categoryName" label="分类名称" />
        <el-table-column prop="categoryCode" label="分类编码" />
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
    categoryName: '监测设备',
    categoryCode: 'CAT001',
    description: '用于监测碳排放的设备'
  },
  {
    categoryName: '采集设备',
    categoryCode: 'CAT002',
    description: '用于采集数据的设备'
  }
])

const handleAdd = () => {
  // 添加分类逻辑
}

const handleEdit = (row) => {
  // 编辑分类逻辑
}

const handleDelete = (row) => {
  // 删除分类逻辑
}
</script>

<style scoped>
.device-category {
  min-height: 100%;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style> 