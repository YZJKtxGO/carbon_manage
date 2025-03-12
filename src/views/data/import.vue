<template>
  <div class="data-import">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>数据导入</span>
          <el-button type="primary" @click="handleImport">
            <el-icon><Upload /></el-icon>导入数据
          </el-button>
        </div>
      </template>

      <el-steps :active="activeStep" finish-status="success" align-center>
        <el-step title="选择文件" />
        <el-step title="数据预览" />
        <el-step title="导入确认" />
      </el-steps>

      <div class="step-content">
        <div v-if="activeStep === 0" class="upload-area">
          <el-upload
            class="upload-demo"
            drag
            action="#"
            :auto-upload="false"
            :on-change="handleFileChange"
            accept=".xlsx,.xls,.csv"
          >
            <el-icon class="el-icon--upload"><Upload /></el-icon>
            <div class="el-upload__text">
              将文件拖到此处，或<em>点击上传</em>
            </div>
            <template #tip>
              <div class="el-upload__tip">
                支持 xlsx、xls、csv 格式文件
              </div>
            </template>
          </el-upload>
        </div>

        <div v-if="activeStep === 1" class="preview-area">
          <el-table :data="previewData" border style="width: 100%">
            <el-table-column
              v-for="(col, index) in previewColumns"
              :key="index"
              :prop="col.prop"
              :label="col.label"
            />
          </el-table>
        </div>

        <div v-if="activeStep === 2" class="confirm-area">
          <el-result
            icon="success"
            title="数据校验通过"
            sub-title="点击确认开始导入数据"
          >
            <template #extra>
              <el-button type="primary" @click="confirmImport">确认导入</el-button>
            </template>
          </el-result>
        </div>
      </div>

      <div class="step-actions">
        <el-button v-if="activeStep > 0" @click="activeStep--">上一步</el-button>
        <el-button 
          v-if="activeStep < 2" 
          type="primary" 
          @click="activeStep++"
        >
          下一步
        </el-button>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Upload } from '@element-plus/icons-vue'

const activeStep = ref(0)
const previewData = ref([])
const previewColumns = ref([])

const handleFileChange = (file) => {
  // 处理文件上传
  console.log('文件已选择:', file)
}

const handleImport = () => {
  // 处理导入操作
}

const confirmImport = () => {
  // 确认导入
}
</script>

<style scoped>
.step-content {
  margin: 40px 0;
  min-height: 300px;
}

.step-actions {
  display: flex;
  justify-content: center;
  gap: 20px;
}

.upload-area {
  width: 400px;
  margin: 0 auto;
}

.preview-area {
  margin: 20px 0;
}

.confirm-area {
  text-align: center;
}
</style> 