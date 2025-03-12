<template>
  <div class="menu-manage">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>菜单管理</span>
          <el-button type="primary" @click="handleAdd">添加菜单</el-button>
        </div>
      </template>
      
      <el-table :data="tableData" row-key="id" :tree-props="{ children: 'children' }" style="width: 100%">
        <el-table-column prop="menuName" label="菜单名称" />
        <el-table-column prop="path" label="路由路径" />
        <el-table-column prop="icon" label="图标" />
        <el-table-column prop="sort" label="排序" width="80" />
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
    id: 1,
    menuName: '设备管理',
    path: '/device',
    icon: 'Monitor',
    sort: 1,
    children: [
      {
        id: 2,
        menuName: '设备列表',
        path: '/device/list',
        sort: 1
      },
      {
        id: 3,
        menuName: '设备分类',
        path: '/device/category',
        sort: 2
      }
    ]
  }
])

const handleAdd = () => {
  // 添加菜单逻辑
}

const handleEdit = (row) => {
  // 编辑菜单逻辑
}

const handleDelete = (row) => {
  // 删除菜单逻辑
}
</script>

<style scoped>
.menu-manage {
  min-height: 100%;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style> 