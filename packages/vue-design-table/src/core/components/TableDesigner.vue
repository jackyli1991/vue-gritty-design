<template>
  <div class="table-design-designer table-design-wrapper">
    <div
      class="canvas-area"
      :class="{ 'drag-over': isDragOver }"
      @dragover.prevent="handleDragOver"
      @dragleave="handleDragLeave"
      @drop="handleDrop"
    >
      <!-- <div v-if="canvasData.length === 0" class="empty-tip">
        拖拽左侧组件到此处
      </div> -->
      <LayoutDesign />
      <!-- <div
        v-for="(element, index) in canvasData"
        :key="element.id"
        class="canvas-element"
        :class="{ selected: activeCanvasElement?.id === element.id }"
        @click="selectElement(index)"
      >
        <div class="element-content">
          <component :is="'button'" v-bind="element.props">
            {{ element.name }}
          </component>
        </div>
        <div class="element-actions">
          <button class="delete-btn" @click.stop="deleteElement(index)">
            <IconifyIcon icon="material-symbols:delete-outline" />
          </button>
        </div>
      </div> -->
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import type { CanvasElement } from '@/types'
import { useDesignContext } from '@/composables/useDesignContext'
import LayoutDesign from './designer/LayoutDesign.vue'

const { addCanvasElement } = useDesignContext()

const isDragOver = ref(false)

// 拖拽经过
const handleDragOver = (e: DragEvent) => {
  e.preventDefault()
  e.dataTransfer!.dropEffect = 'copy'
  isDragOver.value = true
}

// 拖拽离开
const handleDragLeave = () => {
  isDragOver.value = false
}

// 放置
const handleDrop = (e: DragEvent) => {
  e.preventDefault()
  isDragOver.value = false

  const dragData = e.dataTransfer?.getData('dragResourceInfo')
  if (!dragData) return

  const parsed = JSON.parse(dragData) as {
    group?: { key: string }
    resource?: { type: string; name: string; defaultProps: Record<string, unknown> }
  }
  const { group, resource } = parsed
  if (!resource) return

  console.log('拖拽的数据', group?.key, resource)

  const newElement: CanvasElement = {
    id: `element_${Date.now()}_${Math.random().toString(36)}`,
    layoutId: group?.key ?? '',
    type: resource.type,
    name: resource.name,
    props: reactive({ ...resource.defaultProps }),
  }

  addCanvasElement(newElement)
}

// 选择元素
// function selectElement(index: number) {
//   console.log('选择元素', index)
//   selectCanvasElement(index)
// }

// // 删除元素
// function deleteElement(index: number) {
//   deleteCanvasElement(index)
// }
</script>

<style scoped lang="scss">
.table-design-designer {
  overflow: hidden;
  flex: 1;
  .canvas-area {
    box-sizing: border-box;
    height: 100%;
    border: 1px dashed transparent;
    border-radius: 8px;
    background: #fafafa;
    background-image: radial-gradient(#e0e0e0 1px, transparent 1px);
    background-size: 20px 20px;
    position: relative;

    &.drag-over {
      background-color: var(--vdt-primary-light);
      border-color: var(--vdt-primary);
    }

    .empty-tip {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: var(--vdt-font-color-light);
      font-size: 12px;
      text-align: center;
      padding: 40px;
      border: 1px dashed #d9d9d9;
      border-radius: 8px;
      background: #fff;
    }
  }
}
</style>
