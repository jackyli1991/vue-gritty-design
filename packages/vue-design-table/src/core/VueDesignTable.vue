<template>
  <div class="drag-layout">
    <!-- 左侧：可拖拽元素列表 -->
    <TableResource />

    <!-- 中间：放置区域 -->
    <TableDesigner />

    <!-- 右侧：属性编辑面板 -->
    <TableAttributes />
  </div>
</template>

<script setup lang="ts">
import { ref, provide } from 'vue'
import type { CanvasElement } from '../types'
import TableResource from './components/TableResource.vue'
import TableDesigner from './components/TableDesigner.vue'
import TableAttributes from './components/TableAttributes.vue'

// 页面配置总数据
const canvasData = ref<CanvasElement[]>([])
// 当前选中的元素
const activeCanvasElement = ref<CanvasElement | null>(null)

provide('canvasContext', {
  canvasData,
  activeCanvasElement,
  addCanvasElement,
  deleteCanvasElement,
  selectCanvasElement
})

// 添加配置数据
function addCanvasElement(component: CanvasElement) {
  canvasData.value.push(component)
  selectCanvasElement(canvasData.value.length - 1)
}

// 删除配置数据
function deleteCanvasElement(index: number) {
  const delItem = canvasData.value.splice(index, 1)
  if (activeCanvasElement.value?.id === delItem[0].id) {
    activeCanvasElement.value = null
  }
}

// 设置当前选中的元素
function selectCanvasElement(index: number) {
  activeCanvasElement.value = canvasData.value[index]
}

// 暴露方法给父组件
defineExpose({
  // getElements: () => canvasElements.value,
  // setElements: (elements: CanvasElement[]) => {
  //   canvasElements.value = elements
  // },
  // clear: () => {
  //   canvasElements.value = []
  //   selectedElement.value = null
  // },
})
</script>

<style scoped lang="scss">
.drag-layout {
  display: flex;
  height: 100%;
  gap: 12px;
}
</style>
