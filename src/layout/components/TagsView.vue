<template>
  <div class="tags-view">
    <el-scrollbar class="tags-view-wrapper">
      <router-link
        v-for="tag in visitedViews"
        :key="tag.path"
        :class="isActive(tag) ? 'active' : ''"
        class="tags-view-item"
        :to="tag.path"
      >
        <el-icon class="icon" size="12">
          <component :is="tag.meta?.icon || 'Document'" />
        </el-icon>
        {{ tag.meta?.title }}
        <el-icon 
          class="close" 
          size="12"
          @click.prevent.stop="closeSelectedTag(tag)"
        >
          <Close />
        </el-icon>
      </router-link>
    </el-scrollbar>

    <div class="tags-view-extra">
      <el-dropdown trigger="click" @command="handleCommand">
        <el-button size="small" type="primary">
          标签操作<el-icon class="el-icon--right"><ArrowDown /></el-icon>
        </el-button>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="closeOthers">关闭其他</el-dropdown-item>
            <el-dropdown-item command="closeAll">关闭所有</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Close, ArrowDown, Document } from '@element-plus/icons-vue'
import { useTagsViewStore } from '../../stores/tagsView'

const route = useRoute()
const router = useRouter()
const tagsViewStore = useTagsViewStore()

// 修改原来的 visitedViews 为 store 中的数据
const visitedViews = computed(() => tagsViewStore.visitedViews)

// 判断是否是当前激活的标签
const isActive = (tag) => {
  return tag.path === route.path
}

// 关闭选中的标签
const closeSelectedTag = (view) => {
  const index = visitedViews.value.findIndex(v => v.path === view.path)
  tagsViewStore.delVisitedView(view)
  if (isActive(view)) {
    const nextView = visitedViews.value[index + 1] || visitedViews.value[index - 1]
    if (nextView) {
      router.push(nextView.path)
    } else {
      router.push('/')
    }
  }
}

// 关闭其他标签
const closeOthersTags = () => {
  tagsViewStore.delOthersViews(route)
}

// 关闭所有标签
const closeAllTags = () => {
  tagsViewStore.delAllViews()
  router.push('/')
}

// 处理下拉菜单命令
const handleCommand = (command) => {
  switch (command) {
    case 'closeOthers':
      closeOthersTags()
      break
    case 'closeAll':
      closeAllTags()
      break
  }
}

// 监听路由变化
watch(
  () => route.path,
  () => {
    tagsViewStore.addVisitedView(route)
    tagsViewStore.addCachedView(route)
  }
)

// 初始化时添加当前路由
onMounted(() => {
  tagsViewStore.addVisitedView(route)
  tagsViewStore.addCachedView(route)
})
</script>

<style scoped>
.tags-view {
  height: 34px;
  width: 100%;
  background: #fff;
  border-bottom: 1px solid #d8dce5;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .12), 0 0 3px 0 rgba(0, 0, 0, .04);
  display: flex;
}

.tags-view-wrapper :deep(.el-scrollbar__wrap) {
  height: 34px;
}

.tags-view-item {
  display: inline-flex;
  align-items: center;
  margin: 2px 4px;
  padding: 0 8px;
  height: 26px;
  line-height: 26px;
  border: 1px solid #d8dce5;
  border-radius: 3px;
  font-size: 12px;
  color: #495060;
  background: #fff;
  text-decoration: none;
  transition: all 0.3s;
}

.tags-view-item:first-of-type {
  margin-left: 15px;
}

.tags-view-item .icon {
  margin-right: 4px;
}

.tags-view-item .close {
  margin-left: 6px;
  border-radius: 50%;
  text-align: center;
  transition: all .3s;
  transform-origin: 100% 50%;
}

.tags-view-item .close:hover {
  background-color: #b4bccc;
  color: #fff;
}

.tags-view-item.active {
  background-color: #42b983;
  color: #fff;
  border-color: #42b983;
}

.tags-view-item.active::before {
  content: '';
  background: #fff;
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  position: relative;
  margin-right: 4px;
}

.tags-view-extra {
  padding-right: 15px;
  display: flex;
  align-items: center;
}
</style> 