<template>
  <div id="vue-design-table">
    <!-- 左侧：可拖拽元素列表 -->
    <TableResource />

    <!-- 中间：放置区域 -->
    <TableDesigner />

    <!-- 右侧：属性编辑面板 -->
    <TableAttributes />

    <!-- 创建布局弹窗 -->
    <LayoutModal ref="layoutModalRef" @confirm="addLayoutConfirm" />
  </div>
</template>

<script setup lang="ts">
import { ref, provide, onMounted, useTemplateRef } from 'vue'
import type { CanvasElement, CanvasData, CanvasLayout } from '@/types'
import { Direction } from '@/types'
import TableResource from './components/TableResource.vue'
import TableDesigner from './components/TableDesigner.vue'
import TableAttributes from './components/TableAttributes.vue'
import LayoutModal from './components/modal/LayoutModal.vue'

// 页面配置总数据
const canvasData = ref<CanvasData>({
  layouts: {
    // 主布局
    tableMain: {
      id: 'tableMain',
      parentId: '',
      name: '表格主布局',
      children: ['table'], // 子布局ID列表
      direction: Direction.Vertical,
      editable: false,
      props: {
        isForm: false,
        padding: [0, 0, 0, 0],
        widthType: '%',
        widthValue: 100,
        heightType: '%',
        heightValue: 100,
        gap: 0,
        backgroundColor: '#FFF',
      },
    },
    // 表格
    table: {
      id: 'table',
      parentId: 'tableMain',
      name: '表格',
      children: [],
      direction: undefined,
      props: {
        isForm: false,
        padding: [12, 12, 12, 12],
        widthType: '%',
        widthValue: 100,
        heightType: '%',
        heightValue: 100,
        gap: 0,
        backgroundColor: '#FFF',
      },
    },
  },
  elements: {},
})

const layoutModalRef = useTemplateRef('layoutModalRef')
// 当前选中的元素
const activeCanvasElement = ref<CanvasElement>()
// 当前选中的布局
const activeCanvasLayout = ref<CanvasLayout>()

provide('canvasContext', {
  canvasData,
  activeCanvasElement,
  activeCanvasLayout,
  addCanvasElement,
  deleteCanvasElement,
  selectCanvasElement,
  getLayoutById,
  addLayout,
})

// 添加元素
function addCanvasElement(component: CanvasElement) {
  console.log('添加元素', component)
  // canvasData.value.elements.push.push(component)
  // selectCanvasElement(canvasData.value.length - 1)
}

// 删除元素
function deleteCanvasElement(index: number) {
  console.log('删除元素', index)
  // const delItem = canvasData.value.splice(index, 1)
  // if (activeCanvasElement.value?.id === delItem[0].id) {
  //   activeCanvasElement.value = null
  // }
}

// 选择元素
function selectCanvasElement(index: number) {
  console.log('选择元素', index)
  // activeCanvasElement.value = canvasData.value[index]
}

// 获取指定布局的信息
function getLayoutById(layoutId: string): CanvasLayout {
  return canvasData.value.layouts[layoutId]
}

// 添加布局
function addLayout(layoutId: string, clickDirection: string) {
  layoutModalRef.value?.open(layoutId, clickDirection)
}

// 添加布局确认
function addLayoutConfirm(layout: CanvasLayout, clickDirection: string) {
  console.log('添加布局确认', layout, clickDirection)
  // 添加到布局列表
  canvasData.value.layouts[layout.id] = layout
  const parentId = layout.parentId || ''
  const parentLayout = getLayoutById(parentId)
  // 更新父布局方向 和 children
  if (['top', 'bottom'].includes(clickDirection)) {
    parentLayout.direction = Direction.Vertical
  } else if (['left', 'right'].includes(clickDirection)) {
    parentLayout.direction = Direction.Horizontal
  }
  if (['top', 'left'].includes(clickDirection)) {
    parentLayout.children?.unshift(layout.id)
  } else {
    parentLayout.children?.push(layout.id)
  }
}



// 选择布局
function selectLayout(layoutId: string) {
  activeCanvasLayout.value = getLayoutById(layoutId)
}

onMounted(() => {
  selectLayout('tableMain') // 初始化选择主布局
})

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
@import '../style.scss';
</style>
