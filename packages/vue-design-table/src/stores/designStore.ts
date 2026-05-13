import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import type { CanvasElement, CanvasData, CanvasLayout } from '@/types'
import { Direction, Position, BaseLayouts } from '@/types'
import { excludeOption } from '@/utils'
import { createLayout } from '@/core/components/designer'
import { LayoutOperateOptions } from '@/datas/directory'

// 初始画布数据
const initialCanvasData: CanvasData = {
  layouts: {
    [BaseLayouts.TablePage]: createLayout(BaseLayouts.TablePage, '', {
      type: BaseLayouts.TablePage,
      direction: Direction.Vertical,
      name: '页面容器',
      deleteAllowed: false,
      dropAllowed: false,
      children: [BaseLayouts.TableWrapper],
      heightType: '%',
      heightValue: 100,
      backgroundColor: '#fefefe',
      padding: [10, 10, 10, 10],
    }),
    [BaseLayouts.TableWrapper]: createLayout(BaseLayouts.TableWrapper, BaseLayouts.TablePage, {
      type: BaseLayouts.TableWrapper,
      direction: undefined,
      name: '表格容器',
      deleteAllowed: false,
      dropAllowed: false,
      children: [BaseLayouts.TableMain],
      heightType: '%',
      heightValue: 100,
      padding: [10, 10, 10, 10],
    }),
    [BaseLayouts.TableMain]: createLayout(BaseLayouts.TableMain, BaseLayouts.TableWrapper, {
      type: BaseLayouts.TableMain,
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
  const canvasData = ref<CanvasData>(JSON.parse(JSON.stringify(initialCanvasData))) // 画布数据
  const activeCanvasElement = ref<CanvasElement>() // 当前选中的画布元素
  const activeCanvasLayout = ref<CanvasLayout>() // 当前选中的画布布局
  const hoveredLayoutId = ref<string>('') // 当前悬停的画布布局ID
  const attributesPanelCollapsed = ref(false) // 属性面板是否折叠

  const layoutIds = computed(() => Object.keys(canvasData.value.layouts)) // 所有布局ID列表

  function selectCanvasElement(index: number) {
    console.log('选择元素', index)
  }

  /**
   * 添加元素
   * @param component 元素数据对象
   */
  function addCanvasElement(component: CanvasElement) {
    canvasData.value.elements[component.id] = component
  }

  function deleteCanvasElement(index: number) {
    console.log('删除元素', index)
  }

  /**
   * 获取所有表格元素
   * @description 获取画布上的所有表格元素
   * @returns 所有表格元素列表
   */
  function getTableElements() {
    return Object.values(canvasData.value.elements).filter(
      (element) => element.layoutId === BaseLayouts.TableMain,
    )
  }

  /**
   * 获取布局
   * @description 获取指定画布布局对象
   * @param layoutId 布局ID
   * @returns 布局对象
   */
  function getLayout(layoutId: string): CanvasLayout | undefined {
    return canvasData.value.layouts[layoutId]
  }

  /**
   * 获取悬停布局ID
   * @description 获取当前悬停的画布布局ID
   * @param layoutId 布局ID
   */
  function hoverLayout(layoutId: string) {
    hoveredLayoutId.value = layoutId
  }

  /**
   * 选择布局
   * @description 选择当前画布布局
   * @param layoutId 布局ID
   */
  function selectLayout(layoutId: string) {
    activeCanvasLayout.value = getLayout(layoutId)
  }

  /**
   * 添加布局
   * @description 添加一个画布布局到指定父布局
   * @param layout 布局对象
   * @param parentId 父布局ID
   * @param layoutDirection 布局方向
   */
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

  /**
   * 删除布局
   * @description 删除一个画布布局及其子布局
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
    /**
     * 获取所有子布局ID
     * @param id 布局ID
     */
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
   * 获取布局操作选项
   * @description 获取指定画布布局的操作选项
   * @param layoutId 布局ID
   * @returns 布局操作选项列表
   */
  function getLayoutToolbar(layoutId: string) {
    const layout = getLayout(layoutId)
    if (!layout) return []
    const canDelete = layout?.deleteAllowed === true
    if (canDelete) return LayoutOperateOptions
    else return excludeOption(LayoutOperateOptions, 'delete')
  }

  /**
   * 重置画布
   * @description 重置画布数据为初始状态
   */
  function resetCanvas() {
    canvasData.value = JSON.parse(JSON.stringify(initialCanvasData))
    activeCanvasElement.value = undefined
    activeCanvasLayout.value = undefined
    hoveredLayoutId.value = ''
  }

  /**
   * 切换属性面板
   * @description 切换属性面板的显示状态
   */
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
    getTableElements,
    resetCanvas,
    toggleAttributesPanel,
  }
})

export type DesignStore = ReturnType<typeof useDesignStore>
