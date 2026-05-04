<template>
  <div
    :class="['table-layout-wrapper', props.layoutId]"
    :style="wrapperStyle"
    @mouseenter.stop>
    <template v-for="child in layoutChildren" :key="child">
      <TableLayout :layoutId="child" />
    </template>
    <span class="layout-icon top-icon" @click="handleAddLayout('top')">
      <Icon icon="material-symbols:splitscreen-add-outline-rounded" />
    </span>
    <span class="layout-icon bottom-icon" @click="handleAddLayout('bottom')">
      <Icon icon="material-symbols:splitscreen-add-outline-rounded" />
    </span>
    <span class="layout-icon left-icon" @click="handleAddLayout('left')">
      <Icon icon="material-symbols:splitscreen-vertical-add-outline-rounded" />
    </span>
    <span class="layout-icon right-icon" @click="handleAddLayout('right')">
      <Icon icon="material-symbols:splitscreen-vertical-add-outline-rounded" />
    </span>
  </div>
</template>

<script setup lang="ts">
import { computed, inject } from 'vue'
import { Icon } from '@iconify/vue'
import { CanvasContext } from '@/types'

defineOptions({
  name: 'TableLayout',
})

interface Props {
  layoutId?: string // 布局ID
}

// 从父组件注入配置数据
const canvasContext = inject<CanvasContext>('canvasContext')
const getLayoutById = canvasContext?.getLayoutById || (() => {})
const addLayout = canvasContext?.addLayout || (() => {})

const props = withDefaults(defineProps<Props>(), {
  layoutId: 'tableMain',
})

// 计算布局包装器样式
const wrapperStyle = computed(() => {
  const layout = getLayoutById(props.layoutId)
  if (!layout?.props) {
    return {}
  }
  const { widthType, heightType, widthValue, heightValue, backgroundColor, padding } = layout?.props || {}
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

// 布局包装器子元素
const layoutChildren = computed(() => {
  const layout = getLayoutById(props.layoutId)
  return layout?.children || []
})

// 点击添加布局图标
function handleAddLayout(direction: string) {
  addLayout(props.layoutId, direction)
}
</script>

<style scoped lang="scss">
.table-layout-wrapper {
  position: relative;
  .layout-icon {
    position: absolute;
    cursor: pointer;
    opacity: 0;
    color: #1890ff;
    background-color: #1890ff;
    &.top-icon,
    &.bottom-icon {
      width: 80%;
      height: 2px;
      border-radius: 1px;
      left: 50%;
      transform: translateX(-50%);
    }
    &.left-icon,
    &.right-icon {
      width: 2px;
      height: 80%;
      border-radius: 1px;
      top: 50%;
      transform: translateY(-50%);
    }
    &.top-icon {
      top: 5px;
    }
    &.bottom-icon {
      bottom: 5px;
    }
    &.left-icon {
      left: 5px;
    }
    &.right-icon {
      right: 5px;
    }
    &:hover {
      opacity: 1;
    }
    svg {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
}
</style>
