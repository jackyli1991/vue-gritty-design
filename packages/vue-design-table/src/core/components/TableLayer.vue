<template>
  <div class="table-design-layer table-design-wrapper">
    <div class="layer-header">
      <span class="layer-title">图层</span>
      <IconifyIcon
        icon="material-symbols:close"
        :size="16"
        class="close-btn"
        @click="closeLayerPanel"
      />
    </div>
    <div class="layer-content">
      <div v-if="!layoutTree.length" class="layer-empty">暂无图层</div>
      <LayerTree
        v-else
        :nodes="layoutTree"
        :selectedId="activeCanvasLayout?.id"
        @select="handleSelect"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, h } from 'vue'
import IconifyIcon from '@/components/IconifyIcon.vue'
import { useDesignContext } from '@/composables/useDesignContext'

defineOptions({
  name: 'TableLayer',
})

const { canvasData, activeCanvasLayout, selectLayout, closeLayerPanel } = useDesignContext()

interface LayerNode {
  id: string
  name: string
  children: LayerNode[]
}

const layoutTree = computed(() => {
  const layouts = canvasData.value.layouts
  function buildTree(parentId: string): LayerNode[] {
    const children = Object.values(layouts).filter((l) => l.parentId === parentId)
    return children.map((layout) => ({
      id: layout.id,
      name: layout.name,
      children: buildTree(layout.id),
    }))
  }

  return buildTree('')
})

function handleSelect(layoutId: string) {
  selectLayout(layoutId)
}

const LayerTree = (props: { nodes: LayerNode[]; selectedId?: string; depth?: number }) => {
  const depth = props.depth ?? 0
  return props.nodes.map((node) => {
    const isSelected = node.id === props.selectedId
    const hasChildren = node.children && node.children.length > 0

    return h('div', { class: 'layer-node-wrapper' }, [
      h(
        'div',
        {
          class: ['layer-node', { selected: isSelected }],
          style: { paddingLeft: `${12 + depth * 16}px` },
          onClick: () => handleSelect(node.id),
        },
        [
          hasChildren
            ? h(IconifyIcon, {
                icon: 'material-symbols:keyboard-arrow-down-rounded',
                size: 16,
                class: 'expand-icon',
              })
            : h('span', { class: 'expand-placeholder' }),
          h('span', { class: 'node-name' }, node.name),
        ],
      ),
      hasChildren
        ? h(LayerTree, { nodes: node.children, selectedId: props.selectedId, depth: depth + 1 })
        : null,
    ])
  })
}
</script>

<style scoped lang="scss">
.table-design-layer {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  width: 300px;
  flex-shrink: 0;
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  z-index: 100;
  border-radius: 8px;

  .layer-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px;
    border-bottom: 1px solid #f0f0f0;

    .layer-title {
      font-weight: 600;
      font-size: 14px;
    }

    .close-btn {
      cursor: pointer;
      color: var(--vdt-font-color-light);
      transition: color 0.2s;

      &:hover {
        color: var(--vdt-font-color);
      }
    }
  }

  .layer-content {
    flex: 1;
    overflow-y: auto;
    padding: 8px 0;
  }

  .layer-empty {
    text-align: center;
    color: var(--vdt-font-color-light);
    padding: 40px 0;
    font-size: 12px;
  }

  :deep(.layer-node-wrapper) {
    .layer-node {
      display: flex;
      align-items: center;
      gap: 4px;
      padding: 8px 12px;
      cursor: pointer;
      transition: background-color 0.2s;
      font-size: 13px;

      &:hover {
        background-color: #f5f5f5;
      }

      &.selected {
        background-color: var(--vdt-primary-light);
        color: var(--vdt-primary);
      }

      .expand-icon {
        flex-shrink: 0;
        color: var(--vdt-font-color-light);
      }

      .expand-placeholder {
        width: 16px;
        flex-shrink: 0;
      }

      .node-name {
        flex: 1;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
}
</style>
