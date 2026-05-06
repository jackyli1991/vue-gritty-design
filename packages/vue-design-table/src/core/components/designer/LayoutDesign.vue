<template>
  <div
    :class="['table-layout-wrapper', props.layoutId]"
    :style="wrapperStyle"
    @mouseenter.stop="handleMouseEnter"
    @mouseleave.stop="handleMouseLeave"
  >
    <template v-for="child in layoutChildren" :key="child">
      <LayoutDesign :layoutId="child" />
    </template>
    <!-- table是页面表格容器，不能再添加布局 -->
    <template v-if="!isTable">
      <span
        v-for="line in lines"
        :key="line.placement"
        class="layout-icon"
        :class="['layout-icon-' + line.placement]"
        :style="lineStyle"
        @click="handleAddLayout(line.placement)"
      >
        <IconifyIcon :icon="line.icon" />
      </span>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed, inject, ref } from 'vue'
import IconifyIcon from '@/components/IconifyIcon.vue'
import { CanvasContext, Direction } from '@/types'

defineOptions({
  name: 'LayoutDesign',
})

interface Props {
  layoutId?: string // 布局ID
}

// 添加布局图标
const lines = [
  {
    placement: 'top',
    icon: 'material-symbols:splitscreen-add-outline-rounded',
  },
  {
    placement: 'bottom',
    icon: 'material-symbols:splitscreen-add-outline-rounded',
  },
  {
    placement: 'left',
    icon: 'material-symbols:splitscreen-vertical-add-outline-rounded',
  },
  {
    placement: 'right',
    icon: 'material-symbols:splitscreen-vertical-add-outline-rounded',
  },
]

const showLines = ref(false)
// 从父组件注入配置数据
const canvasContext = inject<CanvasContext>('canvasContext')
const getLayoutById = canvasContext?.getLayoutById || (() => {})
const addLayout = canvasContext?.addLayout || (() => {})

const props = withDefaults(defineProps<Props>(), {
  layoutId: 'tableMain',
})

const isTable = computed(() => props.layoutId === 'table')

// 布局包装器额外样式
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

// 计算布局包装器样式
const wrapperStyle = computed(() => {
  if (isTable.value) {
    return {
      ...wrapperExtraStyle.value,
      flex: 1,
    }
  }
  const layout = getLayoutById(props.layoutId)
  // 布局方向
  const direction = layout?.direction
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

// 布局包装器子元素
const layoutChildren = computed(() => {
  const layout = getLayoutById(props.layoutId)
  return layout?.children || []
})

// 线条样式
const lineStyle = computed(() => ({
  opacity: showLines.value ? 0.1 : 0,
}))

/**
 * 处理添加布局图标点击事件
 * @param clickDirection 点击方向
 */
function handleAddLayout(clickDirection: string) {
  addLayout(props.layoutId, clickDirection)
}

function handleMouseEnter() {
  console.log('mouseenter', props.layoutId)
  showLines.value = true
}

function handleMouseLeave() {
  console.log('mouseleave', props.layoutId)
  showLines.value = false
}
</script>

<style scoped lang="scss">
.table-layout-wrapper {
  position: relative;
  border: 1px dashed #1890ff;
  .layout-icon {
    position: absolute;
    cursor: pointer;
    background-color: #999;
    transition: all 0.2s ease-in-out;
    &-top,
    &-bottom {
      width: 80%;
      height: 2px;
      border-radius: 1px;
      left: 50%;
      transform: translateX(-50%);
    }
    &-left,
    &-right {
      width: 2px;
      height: 80%;
      border-radius: 1px;
      top: 50%;
      transform: translateY(-50%);
    }
    &-top {
      top: 5px;
    }
    &-bottom {
      bottom: 5px;
    }
    &-left {
      left: 5px;
    }
    &-right {
      right: 5px;
    }
    svg {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
    &:hover {
      opacity: 1;
    }
  }
}
</style>
