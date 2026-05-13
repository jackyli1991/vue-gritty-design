<template>
  <div
    :class="[
      'table-layout-wrapper',
      props.layoutId,
      {
        'table-layout-wrapper-drop-allowed': canDropElement,
        'is-hover': isHovered,
        'is-active': isActive,
        'drag-over': isDragOver,
      },
    ]"
    :style="wrapperStyle"
    @click.stop="handleClick"
    @mouseenter.stop="handleMouseEnter"
    @mouseover.stop="handleMouseEnter"
    @mouseleave.stop="handleMouseLeave"
    @contextmenu.prevent.stop="handleContextMenu"
    @dragover.prevent="handleDragOver"
    @dragleave="handleDragLeave"
    @drop.prevent.stop="handleDrop"
  >
    <TableLayoutDesign v-if="isTableLayout" />
    <template v-else v-for="child in layoutChildren" :key="child">
      <LayoutDesign :layoutId="child" />
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, reactive } from 'vue'
import type { CanvasElement, ResourceItem } from '@/types'
import { Direction, BaseLayouts } from '@/types'
import { useDesignContext } from '@/composables/useDesignContext'
import { createElement } from '@/core/components/designer'
import TableLayoutDesign from './TableLayoutDesign.vue'

defineOptions({
  name: 'LayoutDesign',
})

interface Props {
  layoutId?: string
}

const {
  getLayout,
  selectLayout,
  hoveredLayoutId,
  hoverLayout,
  activeCanvasLayout,
  closeContextMenu,
  openContextMenu,
  addCanvasElement,
} = useDesignContext()

const isDragOver = ref(false)

const props = withDefaults(defineProps<Props>(), {
  layoutId: BaseLayouts.TablePage,
})

// 是否悬停在布局上
const isHovered = computed(() => hoveredLayoutId.value === props.layoutId)

// 是否选中
const isActive = computed(() => activeCanvasLayout.value?.id === props.layoutId)

// 是否是表格布局
const isTableLayout = computed(() => props.layoutId === BaseLayouts.TableMain)

// 当前layout
const layout = computed(() => getLayout(props.layoutId))

// 是否可以添加布局
const canAddLayout = computed(() => {
  return !!layout.value?.addAllowed !== false
})

// 是否可以拖拽元素到该布局
const canDropElement = computed(() => {
  return !!layout.value && layout.value?.dropAllowed === true
})

// 布局额外样式
const wrapperExtraStyle = computed(() => {
  if (!layout.value?.props) {
    return {}
  }
  const { widthType, heightType, widthValue, heightValue, backgroundColor, padding } =
    layout.value?.props || {}
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
  // 表格布局，默认flex=1，铺满剩余空间
  if (props.layoutId === BaseLayouts.TableMain) {
    return {
      ...wrapperExtraStyle.value,
      flex: 1,
    }
  }
  const direction = layout.value?.direction
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
  return layout.value?.children || []
})

// 点击布局
function handleClick() {
  selectLayout(props.layoutId)
  closeContextMenu()
}

// 鼠标悬停布局
function handleMouseEnter() {
  hoverLayout(props.layoutId)
}

// 鼠标离开布局
function handleMouseLeave() {
  hoverLayout('')
}

// 开启右键上下文菜单
function handleContextMenu(e: MouseEvent) {
  if (canAddLayout.value) {
    selectLayout(props.layoutId)
    openContextMenu(props.layoutId, e.clientX, e.clientY)
  }
}

/**
 * 获取拖拽中的数据
 * @param e 拖拽事件
 * @returns 拖拽数据
 */
function getDragData(e: DragEvent): {
  group?: { target: string }
  resource?: ResourceItem
} {
  const dragData = e.dataTransfer?.getData('dragResourceInfo')
  if (!dragData) return {}
  const parsed = JSON.parse(dragData)
  return parsed
}

// 拖拽经过
function handleDragOver(e: DragEvent) {
  if (!canDropElement.value) return
  // console.log('拖拽经过', e.dataTransfer?.types, layout.value?.type)
  const types = e.dataTransfer?.types || []
  const targetLayoutType = layout.value?.type.toLowerCase()
  // 非目标拖拽布局，不处理
  if (Array.isArray(types) && !types.includes(targetLayoutType)) return
  isDragOver.value = true
}

// 拖拽离开
function handleDragLeave() {
  if (!canDropElement.value) return
  isDragOver.value = false
}

// 放置
const handleDrop = (e: DragEvent) => {
  if (!canDropElement.value) return
  isDragOver.value = false

  const { resource } = getDragData(e)
  if (!resource) return

  // console.log('拖拽的数据', group?.target, resource)

  // 生成新的元素
  const newElement: CanvasElement = createElement(props.layoutId, {
    layoutId: props.layoutId,
    type: resource.type,
    name: resource.name,
    props: reactive(resource.props),
  })
  console.log('新的元素', newElement)
  addCanvasElement(newElement)
}
</script>

<style scoped lang="scss">
.table-layout-wrapper {
  position: relative;
  box-sizing: border-box;
  &-drop-allowed {
    border: 1px dashed var(--vdt-primary);
  }
  &.is-hover {
    box-shadow: 0 0 6px -2px var(--vdt-primary-hover);
  }
  &.is-active {
    box-shadow: 0 0 6px 0 var(--vdt-primary-hover);
  }
  &.drag-over {
    background-color: var(--vdt-primary-light) !important;
  }
}
</style>
