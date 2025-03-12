<template>
  <div class="feedback">
    <el-row :gutter="20">
      <el-col :span="16">
        <el-card>
          <template #header>
            <div class="card-header">
              <span>提交反馈</span>
            </div>
          </template>
          
          <el-form :model="feedbackForm" label-width="100px">
            <el-form-item label="反馈类型">
              <el-select v-model="feedbackForm.type" placeholder="请选择反馈类型">
                <el-option label="功能建议" value="feature" />
                <el-option label="问题反馈" value="bug" />
                <el-option label="其他" value="other" />
              </el-select>
            </el-form-item>

            <el-form-item label="标题">
              <el-input v-model="feedbackForm.title" placeholder="请输入标题" />
            </el-form-item>

            <el-form-item label="详细描述">
              <el-input
                v-model="feedbackForm.content"
                type="textarea"
                :rows="6"
                placeholder="请详细描述您的建议��遇到的问题"
              />
            </el-form-item>

            <el-form-item label="附件">
              <el-upload
                action="#"
                list-type="picture-card"
                :auto-upload="false"
              >
                <el-icon><Plus /></el-icon>
              </el-upload>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" @click="submitFeedback">提交反馈</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>

      <el-col :span="8">
        <el-card>
          <template #header>
            <div class="card-header">
              <span>我的反馈</span>
            </div>
          </template>

          <el-timeline>
            <el-timeline-item
              v-for="(item, index) in feedbackList"
              :key="index"
              :type="item.status === 'replied' ? 'success' : 'primary'"
              :timestamp="item.time"
            >
              <h4>{{ item.title }}</h4>
              <p>{{ item.content }}</p>
              <div v-if="item.reply" class="reply">
                <strong>回复：</strong>{{ item.reply }}
              </div>
            </el-timeline-item>
          </el-timeline>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Plus } from '@element-plus/icons-vue'

const feedbackForm = ref({
  type: '',
  title: '',
  content: ''
})

const feedbackList = ref([
  {
    title: '建议添加数据导出功能',
    content: '希望能够添加数据导出功能，方便数据分析...',
    time: '2024-03-20',
    status: 'replied',
    reply: '感谢您的建议，我们会在下个版本中添加此功能。'
  },
  {
    title: '系统操作建议',
    content: '建议优化操作流程...',
    time: '2024-03-19',
    status: 'pending'
  }
])

const submitFeedback = () => {
  // 提交反馈逻辑
}
</script>

<style scoped>
.feedback {
  min-height: 100%;
}

.reply {
  margin-top: 8px;
  padding: 8px;
  background-color: #f5f7fa;
  border-radius: 4px;
  font-size: 13px;
}
</style> 