<template>
  <div class="table-design-resource">
    <div class="resource-list">
      <div v-for="group in resourceGroupsList" :key="group.title">
        <div class="resource-group-title">{{ group.title }}</div>
        <div class="resource-group">
          <div
            v-for="item in group.components"
            :key="item.type"
            class="resource-item"
            draggable="true"
            @dragstart="handleDragStart($event, group, item)"
          >
            <IconifyIcon :icon="item.icon" />
            <div class="resource-name">{{ item.name }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import IconifyIcon from '@/components/IconifyIcon.vue'
import type { ResourceItem, ResourceGroup } from '@/types'
import { resourceGroupsList } from '@/datas'

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
  width: 240px;
  .resource-list {
    height: 100%;
    padding: 8px;
    overflow-y: auto;
    .resource-group-title {
      font-size: 14px;
      line-height: 24px;
      font-weight: 500;
      color: #333;
      margin-bottom: 8px;
    }
    .resource-group {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      .resource-item {
        width: 48%;
        display: flex;
        align-items: center;
        gap: 6px;
        padding: 6px;
        margin-bottom: 10px;
        border: 1px solid #e8e8e8;
        border-radius: 6px;
        cursor: move;
        transition: all 0.2s;
        background: #fff;

        .resource-name {
          font-size: 12px;
          color: #333;
        }

        &:hover {
          border-color: var(--vdt-primary);
          background: var(--vdt-primary-light);
          transform: scale(1.05);
        }

        &:active {
          cursor: grabbing;
        }
      }
    }
  }
}
</style>
