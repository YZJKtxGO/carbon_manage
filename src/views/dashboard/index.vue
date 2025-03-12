<template>
  <div class="dashboard">
    <el-row :gutter="20">
      <el-col :span="6">
        <el-card shadow="hover" class="dashboard-card">
          <template #header>
            <div class="card-header">
              <span>设备总数</span>
              <el-tag type="success">实时</el-tag>
            </div>
          </template>
          <div class="card-content">
            <div class="number">128</div>
            <div class="compare">
              <span class="label">较上周</span>
              <span class="value up">
                <el-icon><CaretTop /></el-icon>12%
              </span>
            </div>
          </div>
        </el-card>
      </el-col>
      
      <el-col :span="6">
        <el-card shadow="hover" class="dashboard-card">
          <template #header>
            <div class="card-header">
              <span>碳排放量</span>
              <el-tag type="warning">本月</el-tag>
            </div>
          </template>
          <div class="card-content">
            <div class="number">2,450</div>
            <div class="compare">
              <span class="label">较上月</span>
              <span class="value down">
                <el-icon><CaretBottom /></el-icon>8%
              </span>
            </div>
          </div>
        </el-card>
      </el-col>
      
      <el-col :span="6">
        <el-card shadow="hover" class="dashboard-card">
          <template #header>
            <div class="card-header">
              <span>告警数</span>
              <el-tag type="danger">今日</el-tag>
            </div>
          </template>
          <div class="card-content">
            <div class="number">5</div>
            <div class="compare">
              <span class="label">较昨日</span>
              <span class="value up">
                <el-icon><CaretTop /></el-icon>2
              </span>
            </div>
          </div>
        </el-card>
      </el-col>
      
      <el-col :span="6">
        <el-card shadow="hover" class="dashboard-card">
          <template #header>
            <div class="card-header">
              <span>在线率</span>
              <el-tag type="info">实时</el-tag>
            </div>
          </template>
          <div class="card-content">
            <div class="number">98.5%</div>
            <div class="compare">
              <span class="label">较昨日</span>
              <span class="value up">
                <el-icon><CaretTop /></el-icon>0.5%
              </span>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-row :gutter="20" class="mt-20">
      <el-col :span="16">
        <el-card shadow="hover">
          <template #header>
            <div class="card-header">
              <span>碳排放趋势</span>
              <el-radio-group 
                v-model="chartTimeRange" 
                @change="handleTimeRangeChange"
                size="small"
              >
                <el-radio-button label="week">本周</el-radio-button>
                <el-radio-button label="month">本月</el-radio-button>
                <el-radio-button label="year">本年</el-radio-button>
              </el-radio-group>
            </div>
          </template>
          <div ref="chartRef" class="chart-container"></div>
        </el-card>
      </el-col>
      
      <el-col :span="8">
        <el-card shadow="hover">
          <template #header>
            <div class="card-header">
              <span>最近告警</span>
              <el-button link type="primary">查看更多</el-button>
            </div>
          </template>
          <el-timeline>
            <el-timeline-item
              v-for="(activity, index) in activities"
              :key="index"
              :type="activity.type"
              :timestamp="activity.timestamp"
            >
              {{ activity.content }}
            </el-timeline-item>
          </el-timeline>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { CaretTop, CaretBottom } from '@element-plus/icons-vue'
import * as echarts from 'echarts'

const chartTimeRange = ref('week')
const chartRef = ref(null)
let chart = null

// 初始化图表
const initChart = () => {
  chart = echarts.init(chartRef.value)
  const option = {
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: ['碳排放量', '环比变化']
    },
    grid: {
      top: '8%',
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
      }
    ],
    yAxis: [
      {
        type: 'value',
        name: '碳排放量(吨)',
        position: 'left'
      },
      {
        type: 'value',
        name: '环比变化(%)',
        position: 'right',
        axisLabel: {
          formatter: '{value}%'
        }
      }
    ],
    series: [
      {
        name: '碳排放量',
        type: 'line',
        smooth: true,
        emphasis: {
          focus: 'series'
        },
        itemStyle: {
          color: '#42b983'
        },
        areaStyle: {
          opacity: 0.2
        },
        data: [320, 332, 301, 334, 390, 330, 320]
      },
      {
        name: '环比变化',
        type: 'line',
        yAxisIndex: 1,
        smooth: true,
        emphasis: {
          focus: 'series'
        },
        itemStyle: {
          color: '#e6a23c'
        },
        data: [2, 3.8, -9.3, 11, 16.8, -15.4, -3]
      }
    ]
  }
  chart.setOption(option)
}

// 处理时间范围变化
const handleTimeRangeChange = (value) => {
  chartTimeRange.value = value
  // 这里可以根据不同的时间范围更新图表数据
  const data = {
    week: {
      xAxis: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
      emission: [320, 332, 301, 334, 390, 330, 320],
      change: [2, 3.8, -9.3, 11, 16.8, -15.4, -3]
    },
    month: {
      xAxis: Array.from({length: 30}, (_, i) => `${i + 1}日`),
      emission: [280, 250, 290, 310, 285, 270, 295, 305, 320, 315, 330, 325, 340, 335, 
                350, 345, 360, 355, 370, 365, 380, 375, 390, 385, 400, 395, 410, 405, 420, 415],
      change: [-2.1, -10.7, 16.0, 6.9, -8.1, -5.3, 9.3, 3.4, 4.9, -1.6, 4.8, -1.5, 
                4.6, -1.5, 4.5, -1.4, 4.3, -1.4, 4.2, -1.4, 4.1, -1.3, 4.0, -1.3, 3.9, -1.3, 3.8, -1.2, 3.7, -1.2]
    },
    year: {
      xAxis: Array.from({length: 12}, (_, i) => `${i + 1}月`),
      emission: [2200, 2400, 2600, 2800, 3000, 3200, 2900, 2700, 2500, 2300, 2100, 2000],
      change: [null, 9.1, 8.3, 7.7, 7.1, 6.7, -9.4, -6.9, -7.4, -8.0, -8.7, -4.8]
    }
  }
  
  const newOption = {
    xAxis: [{
      data: data[value].xAxis
    }],
    tooltip: {
      trigger: 'axis',
      formatter: function(params) {
        const time = params[0].axisValue
        const emission = params[0].value
        const change = params[1].value
        return `${time}<br/>
               碳排放量：${emission}吨<br/>
               环比变化：${change}%`
      }
    },
    series: [
      {
        data: data[value].emission,
        areaStyle: {
          opacity: value === 'week' ? 0.2 : 0.1
        },
        symbolSize: value === 'year' ? 8 : 6
      },
      {
        data: data[value].change,
        symbolSize: value === 'year' ? 8 : 6,
        lineStyle: {
          width: value === 'year' ? 3 : 2
        }
      }
    ]
  }
  chart?.setOption(newOption)
}

// 处理窗口大小变化
const handleResize = () => {
  chart?.resize()
}

const activities = ref([
  {
    content: '设备 A 温度超过阈值',
    timestamp: '10分钟前',
    type: 'warning'
  },
  {
    content: '设备 B 离线',
    timestamp: '30分钟前',
    type: 'danger'
  },
  {
    content: '设备 C 数据异常',
    timestamp: '1小时前',
    type: 'warning'
  },
  {
    content: '系统存储空间不足',
    timestamp: '2小时前',
    type: 'info'
  }
])

onMounted(() => {
  initChart()
  handleTimeRangeChange('week')
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
  chart?.dispose()
})
</script>

<style scoped>
.dashboard {
  min-height: 100%;
}

.mt-20 {
  margin-top: 20px;
}

.dashboard-card .card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.dashboard-card .card-content {
  text-align: center;
  padding: 10px 0;
}

.dashboard-card .card-content .number {
  font-size: 28px;
  font-weight: bold;
  color: #303133;
  margin-bottom: 10px;
}

.dashboard-card .card-content .compare {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  font-size: 13px;
}

.dashboard-card .card-content .compare .label {
  color: #909399;
}

.dashboard-card .card-content .compare .value {
  display: flex;
  align-items: center;
  gap: 2px;
}

.dashboard-card .card-content .compare .value.up {
  color: #67c23a;
}

.dashboard-card .card-content .compare .value.down {
  color: #f56c6c;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.chart-container {
  width: 100%;
  height: 300px;
}
</style> 