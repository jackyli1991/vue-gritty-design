<template>
  <div class="table-design-resource">
    <div class="resource-list">
      <div v-for="group in resourceGroupsList" :key="group.title" class="resource-group">
        <div class="resource-group-title">{{ group.title }}</div>
        <div
          v-for="item in group.components"
          :key="item.type"
          class="resource-item"
          draggable="true"
          @dragstart="handleDragStart($event, group, item)">
          <div class="resource-icon">
            <Icon :icon="item.icon" />
          </div>
          <div class="resource-name">{{ item.name }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Icon } from '@iconify/vue'
import type { ResourceItem, ResourceGroup } from '@/types'
import { resourceGroupsList } from '../../datas'

// 拖拽开始
const handleDragStart = (e: DragEvent, group: ResourceGroup, resource: ResourceItem) => {
  e.dataTransfer?.setData('dragResourceInfo', JSON.stringify({ group, resource }))
  e.dataTransfer!.effectAllowed = 'copy'
}
</script>

<style scoped lang="scss">
.table-design-resource {
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  width: 240px;
  flex-shrink: 0;
  .resource-list {
    flex: 1;
    padding: 12px;
    overflow-y: auto;
  }

  .resource-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px;
    margin-bottom: 8px;
    border: 1px solid #e8e8e8;
    border-radius: 6px;
    cursor: move;
    transition: all 0.2s;
    background: #fff;

    &:hover {
      border-color: #1890ff;
      background: #e6f7ff;
      transform: translateX(4px);
    }

    &:active {
      cursor: grabbing;
    }
  }

  .resource-icon {
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #f5f5f5;
    border-radius: 4px;
    font-size: 18px;
    color: #666;
  }

  .resource-name {
    font-size: 14px;
    color: #333;
  }
}
</style>
