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
        <Transition name="slide-panel">
          <TableAttributes v-show="!attributesPanelCollapsed" />
        </Transition>
        <!-- 图层面板：从上方滑下 -->
        <Transition name="slide-down">
          <TableLayer v-if="layerPanelVisible" />
        </Transition>
      </div>
    </div>

    <!-- Modal 组件 -->
    <AddLayoutModal />
    <DeleteConfirmModal />
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
import TableLayer from './components/TableLayer.vue'
import AddLayoutModal from './components/modal/AddLayoutModal.vue'
import DeleteConfirmModal from './components/modal/DeleteConfirmModal.vue'

const props = defineProps<{
  themeColors?: ThemeColors
}>()

const store = useDesignStore()
const { attributesPanelCollapsed } = storeToRefs(store)

const { layerPanelVisible } = useDesignContext()

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
