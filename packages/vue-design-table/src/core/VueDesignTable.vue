<template>
  <div id="vue-design-table" ref="containerRef">
    <!-- 左侧：可拖拽元素列表 -->
    <TableResource />

    <div class="table-design-edit-wrapper">
      <!-- 工具条 -->
      <TableToolbar />
      <div class="table-design-edit-content">
        <!-- 中间：放置区域 -->
        <TableDesigner />
        <!-- 右侧：属性编辑面板 -->
        <TableAttributes />
      </div>
    </div>

    <!-- 所有动态组件 -->
    <component :is="asyncComponent" v-bind="asyncComponentProps" v-if="asyncComponentProps" />
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { onMounted, useTemplateRef, watch } from 'vue'
import type { ThemeColors } from '@/types'
import { useDesignContext } from '@/composables/useDesignContext'
import { useThemeColors } from '@/composables/useThemeColors'
import { useDesignStore } from '@/stores'
import TableResource from './components/TableResource.vue'
import TableDesigner from './components/TableDesigner.vue'
import TableToolbar from './components/TableToolbar.vue'
import TableAttributes from './components/TableAttributes.vue'

const props = defineProps<{
  themeColors?: ThemeColors
}>()

const store = useDesignStore()
const { asyncComponent, asyncComponentProps } = storeToRefs(store)

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
