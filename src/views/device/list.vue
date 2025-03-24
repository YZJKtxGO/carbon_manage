<template>
  <div class="device-list">
    <el-card>
      <template #header>
        <div class="card-header">
          <div class="left">
            <el-icon><Monitor /></el-icon>
            <span>设备列表</span>
          </div>
          <div class="right">
            <el-input
              v-model="searchKey"
              placeholder="搜索设备..."
              class="search-input"
              :prefix-icon="Search"
              clearable
            />
            <el-button type="primary" @click="handleAdd" v-has>
              <el-icon><Plus /></el-icon>添加设备
            </el-button>
          </div>
        </div>
      </template>
      
      <el-tabs v-model="activeTab" class="demo-tabs">
        <el-tab-pane label="全部设备" name="all">
          <el-badge :value="tableData.length" class="tab-badge" type="info" />
        </el-tab-pane>
        <el-tab-pane label="正常设备" name="normal">
          <el-badge :value="normalDevices.length" class="tab-badge" type="success" />
        </el-tab-pane>
        <el-tab-pane label="故障设备" name="fault">
          <el-badge :value="faultDevices.length" class="tab-badge" type="danger" />
        </el-tab-pane>
      </el-tabs>

      <el-table 
        :data="filteredTableData" 
        style="width: 100%"
        v-loading="loading"
      >
        <el-table-column prop="deviceName" label="设备名称">
          <template #default="scope">
            <el-icon><Monitor /></el-icon>
            <span style="margin-left: 6px">{{ scope.row.deviceName }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="deviceCode" label="设备编号" />
        <el-table-column prop="category" label="设备分类">
          <template #default="scope">
            <el-tag size="small" effect="plain">{{ scope.row.category }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态" width="100">
          <template #default="scope">
            <el-tag 
              :type="scope.row.status === '正常' ? 'success' : 'danger'"
              effect="dark"
              size="small"
            >
              <el-icon>
                <component :is="scope.row.status === '正常' ? 'CircleCheck' : 'Warning'" />
              </el-icon>
              {{ scope.row.status }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200" fixed="right">
          <template #default="scope">
            <el-tooltip content="编辑设备" placement="top">
              <el-button 
                type="primary" 
                :icon="Edit"
                circle
                @click="handleEdit(scope.row)"
              />
            </el-tooltip>
            <el-tooltip content="删除设备" placement="top">
              <el-button 
                type="danger" 
                :icon="Delete"
                circle
                @click="handleDelete(scope.row)"
              />
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        class="pagination"
        :current-page="currentPage"
        :page-size="pageSize"
        :total="filteredTableData.length"
        layout="total, prev, pager, next"
        @current-change="handleCurrentChange"
      />
    </el-card>

    <!-- 添加/编辑设备对话框 -->
    <el-dialog
      v-model="dialogVisible"
      :title="dialogType === 'add' ? '添加设备' : '编辑设备'"
      width="500px"
    >
      <el-form :model="deviceForm" label-width="100px">
        <el-form-item label="设备名称">
          <el-input v-model="deviceForm.deviceName" />
        </el-form-item>
        <el-form-item label="设备编号">
          <el-input v-model="deviceForm.deviceCode" />
        </el-form-item>
        <el-form-item label="设备分类">
          <el-select v-model="deviceForm.category" style="width: 100%">
            <el-option label="监测设备" value="监测设备" />
            <el-option label="采集设备" value="采集设备" />
          </el-select>
        </el-form-item>
        <el-form-item label="设备状态">
          <el-select v-model="deviceForm.status" style="width: 100%">
            <el-option label="正常" value="正常" />
            <el-option label="故障" value="故障" />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleSubmit">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { Edit, Delete, Search, Plus, Monitor, CircleCheck, Warning } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'

// 表格数据
const tableData = ref([
  {
    deviceName: '测试设备1',
    deviceCode: 'DEV001',
    category: '监测设备',
    status: '正常'
  },
  {
    deviceName: '测试设备2',
    deviceCode: 'DEV002',
    category: '采集设备',
    status: '故障'
  }
])

// 搜索和过滤
const searchKey = ref('')
const activeTab = ref('all')
const loading = ref(false)

// 分页
const currentPage = ref(1)
const pageSize = ref(10)

// 对话框
const dialogVisible = ref(false)
const dialogType = ref('add')
const deviceForm = ref({
  deviceName: '',
  deviceCode: '',
  category: '',
  status: '正常'
})

// 计算属性
const normalDevices = computed(() => tableData.value.filter(item => item.status === '正常'))
const faultDevices = computed(() => tableData.value.filter(item => item.status === '故障'))

const filteredTableData = computed(() => {
  let data = tableData.value
  
  // 标签页过滤
  if (activeTab.value === 'normal') {
    data = normalDevices.value
  } else if (activeTab.value === 'fault') {
    data = faultDevices.value
  }
  
  // 搜索过滤
  if (searchKey.value) {
    data = data.filter(item => 
      item.deviceName.includes(searchKey.value) || 
      item.deviceCode.includes(searchKey.value)
    )
  }
  
  return data
})

// 方法
const handleAdd = () => {
  dialogType.value = 'add'
  deviceForm.value = {
    deviceName: '',
    deviceCode: '',
    category: '',
    status: '正常'
  }
  dialogVisible.value = true
}

const handleEdit = (row) => {
  dialogType.value = 'edit'
  deviceForm.value = { ...row }
  dialogVisible.value = true
}

const handleDelete = (row) => {
  ElMessageBox.confirm(
    `确定要删除设备 ${row.deviceName} 吗？`,
    '警告',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }
  ).then(() => {
    // 实际删除逻辑
    ElMessage({
      type: 'success',
      message: '删除成功',
    })
  })
}

const handleSubmit = () => {
  // 实际提交逻辑
  ElMessage({
    type: 'success',
    message: dialogType.value === 'add' ? '添加成功' : '修改成功',
  })
  dialogVisible.value = false
}

const handleCurrentChange = (val) => {
  currentPage.value = val
}
</script>

<style scoped>
.device-list {
  min-height: 100%;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.left {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 16px;
  font-weight: bold;
}

.right {
  display: flex;
  gap: 12px;
}

.search-input {
  width: 200px;
}

.demo-tabs {
  margin-bottom: 20px;
}

.tab-badge {
  margin-top: -2px;
  margin-left: 6px;
}

.pagination {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}

:deep(.el-table) {
  border-radius: 8px;
  overflow: hidden;
}

:deep(.el-tag) {
  display: inline-flex;
  align-items: center;
  gap: 4px;
}
</style> 