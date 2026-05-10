import { ref, markRaw } from 'vue'
import type { Component } from 'vue'
import { defineStore } from 'pinia'
import type { CanvasElement, CanvasData, CanvasLayout } from '@/types'
import { Direction, Position } from '@/types'
import { createLayout } from '@/core/components/designer'

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
  const asyncComponent = ref<Component>() // 动态组件
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const asyncComponentProps = ref<Record<string, any>>({}) // 动态组件属性
  const canvasData = ref<CanvasData>(JSON.parse(JSON.stringify(initialCanvasData)))
  const activeCanvasElement = ref<CanvasElement>()
  const activeCanvasLayout = ref<CanvasLayout>()
  const hoveredLayoutId = ref<string>('')

  /**
   * 设置动态组件
   * @param component 动态组件
   * @param props 动态组件属性
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function setAsyncComponent(component: Component, props: Record<string, any>) {
    asyncComponent.value = markRaw(component)
    asyncComponentProps.value = props || {}
  }

  function selectCanvasElement(index: number) {
    console.log('选择元素', index)
  }

  function addCanvasElement(component: CanvasElement) {
    console.log('添加元素', component)
  }

  function deleteCanvasElement(index: number) {
    console.log('删除元素', index)
  }

  /**
   * 根据布局ID获取布局
   * @param layoutId 布局ID
   * @returns 布局
   */
  function getLayout(layoutId: string): CanvasLayout | undefined {
    return canvasData.value.layouts[layoutId]
  }

  /**
   * 悬停布局
   * @param layoutId 布局ID
   */
  function hoverLayout(layoutId: string) {
    hoveredLayoutId.value = layoutId
  }

  /**
   * 选择布局
   * @param layoutId 布局ID
   */
  function selectLayout(layoutId: string) {
    activeCanvasLayout.value = getLayout(layoutId)
  }

  /**
   * 添加布局
   * @param layout 布局
   * @param parentId 父级布局的ID
   * @param layoutDirection 布局方向
   */
  function addLayout(layout: CanvasLayout, parentId: string, layoutDirection: Position) {
    console.log('添加布局确认', layout, layoutDirection)
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

  /**
   * 删除布局
   * @param layoutId 布局ID
   */
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

  /**
   * 重置画布
   */
  function resetCanvas() {
    canvasData.value = JSON.parse(JSON.stringify(initialCanvasData))
    activeCanvasElement.value = undefined
    activeCanvasLayout.value = undefined
    hoveredLayoutId.value = ''
  }

  return {
    asyncComponent,
    asyncComponentProps,
    canvasData,
    activeCanvasElement,
    activeCanvasLayout,
    hoveredLayoutId,
    // layout相关操作
    getLayout,
    selectLayout,
    deleteLayout,
    addLayout,
    hoverLayout,
    // element相关操作
    selectCanvasElement,
    addCanvasElement,
    deleteCanvasElement,
    // 重置画布
    resetCanvas,
    setAsyncComponent,
  }
})

export type DesignStore = ReturnType<typeof useDesignStore>
