<template>
  <div class="table-design-designer">
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
      <TableLayout />
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
            <Icon icon="material-symbols:delete-outline" />
          </button>
        </div>
      </div> -->
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, inject } from 'vue'
// import { Icon } from '@iconify/vue'
import type { CanvasElement, CanvasContext } from '@/types'
import TableLayout from './TableLayout.vue'

// 从父组件注入配置数据
const canvasContext = inject<CanvasContext>('canvasContext')

// 提供默认值
// const canvasData = canvasContext?.canvasData || {
//   layouts: {},
//   elements: {},
// }
// const activeCanvasElement = canvasContext?.activeCanvasElement ?? null
const addCanvasElement = canvasContext?.addCanvasElement ?? (() => {})
// const deleteCanvasElement = canvasContext?.deleteCanvasElement ?? (() => {})
// const selectCanvasElement = canvasContext?.selectCanvasElement ?? (() => {})

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

  const parsed = JSON.parse(dragData) as { group?: { key: string }; resource?: { type: string; name: string; defaultProps: Record<string, unknown> } }
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
  background: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
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
      background-color: #e6f7ff;
      border-color: #1890ff;
    }

    .canvas-element {
      position: relative;
      margin-bottom: 16px;
      border: 1px solid transparent;
      border-radius: 4px;
      transition: all 0.2s;
      cursor: pointer;

      &:hover {
        border-color: #d9d9d9;
      }

      &.selected {
        border-color: #1890ff;
        box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
        .element-actions {
          opacity: 1;
        }
      }

      .element-content {
        min-height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .element-actions {
        position: absolute;
        top: -24px;
        right: 0;
        display: flex;
        align-items: center;
        gap: 8px;
        opacity: 0;
        transition: opacity 0.2s;

        .canvas-element:hover &,
        .canvas-element.selected & {
          opacity: 1;
        }
      }
      .delete-btn {
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #ff4d4f;
        color: #fff;
        border-radius: 4px;
        cursor: pointer;
        font-size: 12px;

        &:hover {
          background: #ff7875;
        }
      }
    }

    .empty-tip {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: #999;
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
