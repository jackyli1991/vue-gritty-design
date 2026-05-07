<template>
  <div
    :class="[
      'table-layout-wrapper',
      props.layoutId,
      {'table-layout-wrapper-drop': canDropElement},
      ]"
    :style="wrapperStyle"
    @click.stop="handleClick"
    @mouseenter.stop="handleMouseEnter"
    @mouseover.stop="handleMouseEnter"
    @mouseleave.stop="handleMouseLeave"
    @contextmenu.prevent.stop="handleContextMenu"
  >
    <template v-for="child in layoutChildren" :key="child">
      <LayoutDesign :layoutId="child" />
    </template>
    <!-- table是页面表格容器，不能再添加布局 -->
    <template v-if="canAddLayout">
      <LayoutHoverToolbar :visible="isHovered" :canDelete="canDelete" @action="handleAction" />
      <LayoutContextMenu ref="contextMenuRef" :canDelete="canDelete" @action="handleAction" />
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed, inject, toRef, useTemplateRef } from 'vue'
import { CanvasContext, Direction } from '@/types'
import LayoutHoverToolbar from './LayoutHoverToolbar.vue'
import LayoutContextMenu from './LayoutContextMenu.vue'

defineOptions({
  name: 'LayoutDesign',
})

interface Props {
  layoutId?: string
}

const canvasContext = inject<CanvasContext>('canvasContext')
const getLayoutById = canvasContext?.getLayoutById || (() => {})
const addLayout = canvasContext?.addLayout || (() => {})
const deleteLayout = canvasContext?.deleteLayout || (() => {})
const selectLayout = canvasContext?.selectLayout || (() => {})
const hoveredLayoutId = toRef(canvasContext?.hoveredLayoutId)

const props = withDefaults(defineProps<Props>(), {
  layoutId: 'tablePage',
})

// 右键上下文菜单
const contextMenuRef = useTemplateRef('contextMenuRef')

// 是否是表格布局
const isTable = computed(() => props.layoutId === 'table' || props.layoutId === 'tableWrapper')

// 是否悬停在布局上
const isHovered = computed(() => hoveredLayoutId.value === props.layoutId)

// 是否可以删除布局
const canDelete = computed(() => {
  const layout = getLayoutById(props.layoutId)
  return !!layout && layout?.deleteAllowed === true
})

// 是否可以添加布局
const canAddLayout = computed(() => {
  const layout = getLayoutById(props.layoutId)
  return !!layout && layout?.addAllowed !== false
})

// 是否可以拖拽元素到该布局
const canDropElement = computed(() => {
  const layout = getLayoutById(props.layoutId)
  return !!layout && layout?.dropAllowed === true
})



// 布局额外样式
const wrapperExtraStyle = computed(() => {
  const layout = getLayoutById(props.layoutId)
  if (!layout?.props) {
    return {}
  }
  const { widthType, heightType, widthValue, heightValue, backgroundColor, padding } =
    layout?.props || {}
  return {
    width: widthValue + widthType,
    height: heightValue + heightType,
    backgroundColor,
    paddingTop: padding[0] + 'px',
    paddingLeft: padding[1] + 'px',
    paddingBottom: padding[2] + 'px',
    paddingRight: padding[3] + 'px',
  }
})

// 布局样式
const wrapperStyle = computed(() => {
  if (isTable.value) {
    return {
      ...wrapperExtraStyle.value,
      flex: 1,
    }
  }
  const layout = getLayoutById(props.layoutId)
  const direction = layout?.direction
  // 布局方向样式
  const directionStyle: Record<string, string> = {}
  if (direction) {
    directionStyle.display = 'flex'
    directionStyle.flexDirection = direction === Direction.Horizontal ? 'row' : 'column'
    directionStyle.alignItems = 'center'
    directionStyle.justifyContent = 'center'
  }
  return {
    ...directionStyle,
    ...wrapperExtraStyle.value,
  }
})

// 布局子布局
const layoutChildren = computed(() => {
  const layout = getLayoutById(props.layoutId)
  return layout?.children || []
})

// 处理操作
function handleAction(direction: string) {
  if (direction === 'delete') {
    handleDeleteLayout()
    return
  }
  handleAddLayout(direction)
}

// 添加布局
function handleAddLayout(direction: string) {
  addLayout(props.layoutId, direction)
}

// 删除布局
function handleDeleteLayout() {
  deleteLayout(props.layoutId)
}

// 点击布局
function handleClick() {
  selectLayout(props.layoutId)
  contextMenuRef.value?.close()
}

// 鼠标悬停布局
function handleMouseEnter() {
  hoveredLayoutId.value = props.layoutId
}

// 鼠标离开布局
function handleMouseLeave() {
  hoveredLayoutId.value = ''
}

// 开启右键上下文菜单
function handleContextMenu(e: MouseEvent) {
  contextMenuRef.value?.open(e.clientX, e.clientY)
}
</script>

<style scoped lang="scss">
.table-layout-wrapper {
  position: relative;
  box-sizing: border-box;
  &-drop {
    border: 1px dashed var(--vdt-primary);
  }
}
</style>
