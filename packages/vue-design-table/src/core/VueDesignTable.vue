<template>
  <div id="vue-design-table" ref="containerRef">
    <!-- 左侧：可拖拽元素列表 -->
    <TableResource />

    <!-- 中间：放置区域 -->
    <TableDesigner />

    <!-- 右侧：属性编辑面板 -->
    <TableAttributes />

    <!-- 创建布局弹窗 -->
    <!-- <LayoutModal ref="layoutModalRef" /> -->
    <!-- 删除确认弹窗 -->
    <!-- <DeleteConfirmModal ref="deleteConfirmModalRef" /> -->
  </div>
</template>

<script setup lang="ts">
import { onMounted, useTemplateRef, watch } from 'vue'
import type { ThemeColors } from '@/types'
import { useDesignContext } from '@/composables/useDesignContext'
import { useThemeColors } from '@/composables/useThemeColors'
import TableResource from './components/TableResource.vue'
import TableDesigner from './components/TableDesigner.vue'
import TableAttributes from './components/TableAttributes.vue'
// import LayoutModal from './components/modal/LayoutModal.vue'
// import DeleteConfirmModal from './components/modal/DeleteConfirmModal.vue'

const props = defineProps<{
  themeColors?: ThemeColors
}>()

const containerRef = useTemplateRef('containerRef')

const { selectLayout } = useDesignContext()
const { setThemeColors, applyCssVariables } = useThemeColors(props.themeColors)

watch(
  () => props.themeColors,
  (newColors) => {
    if (newColors) {
      setThemeColors(newColors)
      if (containerRef.value) {
        applyCssVariables(containerRef.value)
      }
    }
  },
  { deep: true },
)

onMounted(() => {
  if (containerRef.value) {
    applyCssVariables(containerRef.value)
  }
  selectLayout('tablePage')
})
</script>

<style lang="scss">
@import '../style.scss';
</style>
