<template>
  <div id="vue-design-table" ref="containerRef">
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
import { ref, provide, onMounted, useTemplateRef, watch } from 'vue'
import type { CanvasElement, CanvasData, CanvasLayout, ThemeColors } from '@/types'
import { Direction } from '@/types'
import { useThemeColors } from '@/composables/useThemeColors'
import TableResource from './components/TableResource.vue'
import TableDesigner from './components/TableDesigner.vue'
import TableAttributes from './components/TableAttributes.vue'
import LayoutModal from './components/modal/LayoutModal.vue'

// Props
const props = defineProps<{
  themeColors?: ThemeColors
}>()

const containerRef = useTemplateRef('containerRef')

// 页面配置总数据
const canvasData = ref<CanvasData>({
  layouts: {
    // 主布局
    tableMain: {
      id: 'tableMain',
      parentId: '',
      name: '表格主布局',
      children: [], // 子布局ID列表
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
// 当前鼠标悬停的布局ID
const hoveredLayoutId = ref<string>('')
// 新布局点击方向
const newLayoutDirection = ref<string>('')

// 颜色配置
const { themeColors, setThemeColors, applyCssVariables } = useThemeColors(props.themeColors)

// 监听 props.themeColors 变化
watch(
  () => props.themeColors,
  (newColors) => {
    console.log('newColors', newColors)
    if (newColors) {
      setThemeColors(newColors)
      if (containerRef.value) {
        applyCssVariables(containerRef.value)
      }
    }
  },
  { deep: true },
)

// 应用 CSS 变量
onMounted(() => {
  if (containerRef.value) {
    applyCssVariables(containerRef.value)
  }
  selectLayout('tableMain') // 初始化选择主布局
})

provide('canvasContext', {
  canvasData,
  activeCanvasElement,
  activeCanvasLayout,
  hoveredLayoutId,
  addCanvasElement,
  deleteCanvasElement,
  selectCanvasElement,
  getLayoutById,
  addLayout,
  deleteLayout,
})

provide('themeContext', {
  themeColors,
  setThemeColors,
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
  newLayoutDirection.value = clickDirection
  layoutModalRef.value?.open(layoutId)
}

// 添加布局确认
function addLayoutConfirm(layout: CanvasLayout) {
  const layoutDirection = newLayoutDirection.value
  console.log('添加布局确认', layout, layoutDirection)
  // 添加到布局列表
  canvasData.value.layouts[layout.id] = layout
  const parentId = layout.parentId || ''
  const parentLayout = getLayoutById(parentId)
  // 更新父布局方向 和 children
  if (['top', 'bottom'].includes(layoutDirection)) {
    parentLayout.direction = Direction.Vertical
  } else if (['left', 'right'].includes(layoutDirection)) {
    parentLayout.direction = Direction.Horizontal
  }
  if (['top', 'left'].includes(layoutDirection)) {
    parentLayout.children?.unshift(layout.id)
  } else {
    parentLayout.children?.push(layout.id)
  }
}

// 选择布局
function selectLayout(layoutId: string) {
  activeCanvasLayout.value = getLayoutById(layoutId)
}

// 删除布局 to do
function deleteLayout(layoutId: string) {
  const layout = canvasData.value.layouts[layoutId]
  if (!layout) return
  const parentId = layout.parentId
  if (!parentId) return
  const parentLayout = canvasData.value.layouts[parentId]
  if (!parentLayout) return
  // 递归收集所有子布局ID
  const idsToDelete: string[] = [layoutId]
  function collectChildIds(id: string) {
    const item = canvasData.value.layouts[id]
    if (item?.children) {
      for (const childId of item.children) {
        idsToDelete.push(childId)
        collectChildIds(childId)
      }
    }
  }
  collectChildIds(layoutId)
  // 从父布局的children中移除
  parentLayout.children = parentLayout.children?.filter((id) => id !== layoutId)
  // 如果父布局没有子布局了，清除方向
  if (!parentLayout.children?.length) {
    parentLayout.direction = undefined
  }
  // 删除所有收集到的布局
  for (const id of idsToDelete) {
    delete canvasData.value.layouts[id]
  }
  // 清除选中状态
  if (activeCanvasLayout.value?.id === layoutId) {
    activeCanvasLayout.value = undefined
  }
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

<style lang="scss">
@import '../style.scss';
</style>
