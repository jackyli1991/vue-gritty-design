<template>
  <div
    :class="['table-layout-wrapper', props.data.id]"
    :style="wrapperStyle">
    <template v-for="child in layoutChildren" :key="child.id">
      <LayoutWrapper :data="child" />
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed, inject } from 'vue'
import { CanvasLayout, CanvasContext } from '@/types'

defineOptions({
  name: 'LayoutWrapper',
})

interface Props {
  data: CanvasLayout
}

// 从父组件注入配置数据
const canvasContext = inject<CanvasContext>('canvasContext')
const getChildrenLayouts = canvasContext?.getChildrenLayouts || (() => [])

const props = withDefaults(defineProps<Props>(), {
  // data: {
  //   padding: [0, 0, 0, 0],
  //   widthType: '%',
  //   heightType: '%',
  //   widthValue: 100,
  //   heightValue: 100,
  //   gap: 0,
  //   backgroundColor: '#FFF',
  // }
})

// 计算布局包装器样式
const wrapperStyle = computed(() => {
  const { widthType, heightType, widthValue, heightValue, backgroundColor, padding } = props?.data?.props || {}
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

// 计算布局包装器子元素
const layoutChildren = computed(() => getChildrenLayouts(props.data.id))
</script>
