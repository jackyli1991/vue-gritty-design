<template>
  <div
    :class="[
      'table-layout-wrapper',
      props.layoutId,
      {
        'table-layout-wrapper-drop': canDropElement,
        'is-hover': isHovered,
        'is-active': isActive,
      },
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
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Direction } from '@/types'
import { useDesignContext } from '@/composables/useDesignContext'

defineOptions({
  name: 'LayoutDesign',
})

interface Props {
  layoutId?: string
}

const { getLayout, selectLayout, hoveredLayoutId, hoverLayout, activeCanvasLayout, closeContextMenu, openContextMenu } = useDesignContext()

const props = withDefaults(defineProps<Props>(), {
  layoutId: 'tablePage',
})

// 是否悬停在布局上
const isHovered = computed(() => hoveredLayoutId.value === props.layoutId)

// 是否选中
const isActive = computed(() => activeCanvasLayout.value?.id === props.layoutId)

// 是否可以添加布局
const canAddLayout = computed(() => {
  const layout = getLayout(props.layoutId)
  return !!layout && layout?.addAllowed !== false
})

// 是否可以拖拽元素到该布局
const canDropElement = computed(() => {
  const layout = getLayout(props.layoutId)
  return !!layout && layout?.dropAllowed === true
})

// 布局额外样式
const wrapperExtraStyle = computed(() => {
  const layout = getLayout(props.layoutId)
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
  // 表格布局，默认flex=1，铺满剩余空间
  if (props.layoutId === 'tableMain') {
    return {
      ...wrapperExtraStyle.value,
      flex: 1,
    }
  }
  const layout = getLayout(props.layoutId)
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
  const layout = getLayout(props.layoutId)
  return layout?.children || []
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
</script>

<style scoped lang="scss">
.table-layout-wrapper {
  position: relative;
  box-sizing: border-box;
  &-drop {
    border: 1px dashed var(--vdt-primary);
  }
  &.is-hover,
  &.is-active {
    box-shadow: 0 0 6px -2px var(--vdt-primary-hover);
  }
}
</style>
