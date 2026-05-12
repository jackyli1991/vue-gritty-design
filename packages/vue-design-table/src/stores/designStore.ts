import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import type { CanvasElement, CanvasData, CanvasLayout } from '@/types'
import { Direction, Position } from '@/types'
import { excludeOption } from '@/utils'
import { createLayout } from '@/core/components/designer'
import { LayoutOperateOptions } from '@/datas/directory'

const initialCanvasData: CanvasData = {
  layouts: {
    tablePage: createLayout('tablePage', '', {
      direction: Direction.Vertical,
      name: '页面容器',
      deleteAllowed: false,
      dropAllowed: false,
      children: ['tableWrapper'],
      heightType: '%',
      heightValue: 100,
      backgroundColor: '#fefefe',
      padding: [10, 10, 10, 10],
    }),
    tableWrapper: createLayout('tableWrapper', 'tablePage', {
      direction: undefined,
      name: '表格容器',
      deleteAllowed: false,
      dropAllowed: false,
      children: ['tableMain'],
      heightType: '%',
      heightValue: 100,
      padding: [10, 10, 10, 10],
    }),
    tableMain: createLayout('tableMain', 'tableWrapper', {
      direction: undefined,
      name: '表格',
      deleteAllowed: false,
      addAllowed: false,
      heightType: '%',
      heightValue: 100,
    }),
  },
  elements: {},
}

export const useDesignStore = defineStore('tableDesign', () => {
  const canvasData = ref<CanvasData>(JSON.parse(JSON.stringify(initialCanvasData)))
  const activeCanvasElement = ref<CanvasElement>()
  const activeCanvasLayout = ref<CanvasLayout>()
  const hoveredLayoutId = ref<string>('')
  const attributesPanelCollapsed = ref(false)

  const layoutIds = computed(() => Object.keys(canvasData.value.layouts))

  function selectCanvasElement(index: number) {
    console.log('选择元素', index)
  }

  function addCanvasElement(component: CanvasElement) {
    console.log('添加元素', component)
  }

  function deleteCanvasElement(index: number) {
    console.log('删除元素', index)
  }

  function getLayout(layoutId: string): CanvasLayout | undefined {
    return canvasData.value.layouts[layoutId]
  }

  function hoverLayout(layoutId: string) {
    hoveredLayoutId.value = layoutId
  }

  function selectLayout(layoutId: string) {
    activeCanvasLayout.value = getLayout(layoutId)
  }

  function addLayout(layout: CanvasLayout, parentId: string, layoutDirection: Position) {
    layout.parentId = parentId
    const parentLayout = getLayout(parentId)
    if (!parentLayout) return
    const isVertical = layoutDirection === Position.Top || layoutDirection === Position.Bottom
    const direction = isVertical ? Direction.Vertical : Direction.Horizontal

    canvasData.value.layouts[layout.id] = layout
    parentLayout.direction = direction
    const isUnshift = layoutDirection === Position.Top || layoutDirection === Position.Left
    if (isUnshift) {
      parentLayout.children?.unshift(layout.id)
    } else {
      parentLayout.children?.push(layout.id)
    }
  }

  function deleteLayout(layoutId: string) {
    const layout = canvasData.value.layouts[layoutId]
    if (!layout) return
    const parentId = layout.parentId
    if (!parentId) return
    const parentLayout = canvasData.value.layouts[parentId]
    if (!parentLayout) return
    const idsToDelete: string[] = [layoutId]
    function collectChildIds(id: string) {
      const item = canvasData.value.layouts[id]
      if (item?.children) {
        for (const childId of item.children) {
          idsToDelete.push(childId)
          collectChildIds(childId)
        }
      }
    }
    collectChildIds(layoutId)
    parentLayout.children = parentLayout.children?.filter((id) => id !== layoutId)
    if (!parentLayout.children?.length) {
      parentLayout.direction = undefined
    }
    for (const id of idsToDelete) {
      delete canvasData.value.layouts[id]
    }
    if (activeCanvasLayout.value?.id === layoutId) {
      activeCanvasLayout.value = undefined
    }
  }

  function getLayoutToolbar(layoutId: string) {
    const layout = getLayout(layoutId)
    if (!layout) return []
    const canDelete = layout?.deleteAllowed === true
    if (canDelete) return LayoutOperateOptions
    else return excludeOption(LayoutOperateOptions, 'delete')
  }

  function resetCanvas() {
    canvasData.value = JSON.parse(JSON.stringify(initialCanvasData))
    activeCanvasElement.value = undefined
    activeCanvasLayout.value = undefined
    hoveredLayoutId.value = ''
  }

  function toggleAttributesPanel() {
    attributesPanelCollapsed.value = !attributesPanelCollapsed.value
  }

  return {
    canvasData,
    layoutIds,
    activeCanvasElement,
    activeCanvasLayout,
    hoveredLayoutId,
    attributesPanelCollapsed,
    getLayout,
    selectLayout,
    deleteLayout,
    addLayout,
    hoverLayout,
    getLayoutToolbar,
    selectCanvasElement,
    addCanvasElement,
    deleteCanvasElement,
    resetCanvas,
    toggleAttributesPanel,
  }
})

export type DesignStore = ReturnType<typeof useDesignStore>
