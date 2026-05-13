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
    <!-- 布局右键菜单 -->
    <LayoutContextMenu />
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { onMounted, useTemplateRef, watch, onUnmounted } from 'vue'
import type { ThemeColors } from '@/types'
import { BaseLayouts } from '@/types'
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
import LayoutContextMenu from './components/designer/LayoutContextMenu.vue'

const props = defineProps<{
  themeColors?: ThemeColors
}>()

const store = useDesignStore()
const { attributesPanelCollapsed } = storeToRefs(store)

const { layerPanelVisible, closeContextMenu } = useDesignContext()

const containerRef = useTemplateRef('containerRef')

const { selectLayout } = useDesignContext()
const { setThemeColors, applyCssVariables } = useThemeColors(props.themeColors)

// 点击外部关闭菜单
function handleClickOutside() {
  closeContextMenu()
}

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
  selectLayout(BaseLayouts.TablePage)
  // 监听点击关闭菜单
  document.addEventListener('click', handleClickOutside)
  document.addEventListener('contextmenu', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
  document.removeEventListener('contextmenu', handleClickOutside)
})
</script>

<style lang="scss">
@import '../style.scss';
</style>
