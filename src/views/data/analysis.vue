<template>
  <div class="data-analysis">
    <el-row :gutter="20">
      <el-col :span="24">
        <el-card>
          <template #header>
            <div class="card-header">
              <span>碳排放趋势分析</span>
              <div class="header-actions">
                <el-date-picker
                  v-model="dateRange"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  size="small"
                />
                <el-button type="primary" size="small" @click="exportReport">
                  <el-icon><Download /></el-icon>导出报表
                </el-button>
              </div>
            </div>
          </template>
          <div ref="trendChartRef" class="chart-container"></div>
        </el-card>
      </el-col>
    </el-row>

    <el-row :gutter="20" class="mt-20">
      <el-col :span="12">
        <el-card>
          <template #header>
            <div class="card-header">
              <span>设备排放占比</span>
            </div>
          </template>
          <div ref="pieChartRef" class="chart-container"></div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card>
          <template #header>
            <div class="card-header">
              <span>排放指标分析</span>
            </div>
          </template>
          <div ref="barChartRef" class="chart-container"></div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { Download } from '@element-plus/icons-vue'
import * as echarts from 'echarts'

const dateRange = ref([])
const trendChartRef = ref(null)
const pieChartRef = ref(null)
const barChartRef = ref(null)
let trendChart = null
let pieChart = null
let barChart = null

// 初始化趋势图表
const initTrendChart = () => {
  trendChart = echarts.init(trendChartRef.value)
  const option = {
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: ['总排放量', '设备A', '设备B', '设备C']
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月']
    },
    yAxis: {
      type: 'value',
      name: '碳排放量(吨)'
    },
    series: [
      {
        name: '总排放量',
        type: 'line',
        stack: 'Total',
        data: [120, 132, 101, 134, 90, 230, 210],
        smooth: true,
        lineStyle: {
          width: 3
        }
      },
      {
        name: '设备A',
        type: 'line',
        stack: 'devices',
        data: [50, 60, 40, 70, 30, 100, 90],
        smooth: true
      },
      {
        name: '设备B',
        type: 'line',
        stack: 'devices',
        data: [40, 42, 31, 34, 30, 80, 70],
        smooth: true
      },
      {
        name: '设备C',
        type: 'line',
        stack: 'devices',
        data: [30, 30, 30, 30, 30, 50, 50],
        smooth: true
      }
    ]
  }
  trendChart.setOption(option)
}

// 初始化饼图
const initPieChart = () => {
  pieChart = echarts.init(pieChartRef.value)
  const option = {
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c} ({d}%)'
    },
    legend: {
      orient: 'vertical',
      left: 'left'
    },
    series: [
      {
        name: '排放占比',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2
        },
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: '20',
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        data: [
          { value: 1048, name: '设备A' },
          { value: 735, name: '设备B' },
          { value: 580, name: '设备C' },
          { value: 484, name: '设备D' },
          { value: 300, name: '其他' }
        ]
      }
    ]
  }
  pieChart.setOption(option)
}

// 初始化柱状图
const initBarChart = () => {
  barChart = echarts.init(barChartRef.value)
  const option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    legend: {},
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'value',
      boundaryGap: [0, 0.01]
    },
    yAxis: {
      type: 'category',
      data: ['设备A', '设备B', '设备C', '设备D', '设备E']
    },
    series: [
      {
        name: '实际排放',
        type: 'bar',
        data: [180, 224, 200, 334, 290]
      },
      {
        name: '排放限额',
        type: 'bar',
        data: [200, 250, 220, 350, 300]
      }
    ]
  }
  barChart.setOption(option)
}

// 处理窗口大小变化
const handleResize = () => {
  trendChart?.resize()
  pieChart?.resize()
  barChart?.resize()
}

// 导出报表
const exportReport = () => {
  // 导出报表逻辑
  console.log('导出报表')
}

onMounted(() => {
  initTrendChart()
  initPieChart()
  initBarChart()
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
  trendChart?.dispose()
  pieChart?.dispose()
  barChart?.dispose()
})
</script>

<style scoped>
.mt-20 {
  margin-top: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-actions {
  display: flex;
  gap: 10px;
}

.chart-container {
  width: 100%;
  height: 400px;
}

/* 调整第二行图表的高度 */
.mt-20 .chart-container {
  height: 300px;
}
</style> 