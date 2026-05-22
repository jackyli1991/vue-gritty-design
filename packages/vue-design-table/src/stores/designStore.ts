import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { message } from 'ant-design-vue'
import type {
  CanvasElement,
  CanvasData,
  CanvasLayout,
  ActionBtnGroup,
  ActionBtnGroupItem,
} from '@/types'
import { Direction, Position, BaseLayouts, ColumnType } from '@/types'
import { excludeOption, isObject, isString } from '@/utils'
import { createLayout } from '@/core/components/designer'
import { layoutOperateOptions, elementOperateOptions, columnsComponentNames } from '@/datas'
import { useConfirmModal } from '@/composables/useConfirmModal'

const { openModal } = useConfirmModal()

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
  config: {
    actionBtnsList: [], // 按钮分组
  },
}

export const useDesignStore = defineStore('tableDesign', () => {
  const canvasData = ref<CanvasData>(JSON.parse(JSON.stringify(initialCanvasData))) // 画布数据
  const activeCanvasElement = ref<CanvasElement>() // 当前选中的画布元素
  const activeCanvasLayout = ref<CanvasLayout>() // 当前选中的画布布局
  const hoveredLayoutId = ref<string>('') // 当前悬停的画布布局ID
  const attributesPanelCollapsed = ref(false) // 属性面板是否折叠

  const layoutIds = computed(() => Object.keys(canvasData.value.layouts)) // 所有布局ID列表
  // 所有表格操作按钮，按actionBtnsList 分组进行重组
  const actionBtnGroups = computed<ActionBtnGroupItem[]>((): ActionBtnGroupItem[] => {
    // 所有按钮
    const btns = getTableElements().filter(
      (item: CanvasElement) => item.type === ColumnType.ActionBtn,
    )
    const groups = canvasData.value.config.actionBtnsList
    // 按照分组顺序和嵌套重新组合按钮
    return groups.map((item) => {
      if (isString(item)) {
        return btns.find((btn) => btn.id === item)
      } else if (isObject(item) && (item as ActionBtnGroup).children) {
        return {
          ...(item as ActionBtnGroup),
          children: (item as ActionBtnGroup).children.map((btnId) => {
            return btns.find((btn) => btn.id === btnId)
          }),
        }
      }
    }) as ActionBtnGroupItem[]
  })

  /**
   * 获取元素
   * @description 获取指定画布元素对象
   * @param id 元素ID
   * @returns 元素对象
   */
  function getElement(id: string): CanvasElement | undefined {
    return canvasData.value.elements[id]
  }

  /**
   * 选择元素
   * @description 选择当前画布元素
   * @param id 元素ID
   */
  function selectElement(id: string) {
    activeCanvasElement.value = getElement(id)
    activeCanvasLayout.value = undefined
  }

  /**
   * 添加元素
   * @param component 元素数据对象
   */
  function addElement(component: CanvasElement) {
    if (!checkRowSelectionAvailable(component)) return
    if (!checkActionColumnAvailable(component)) return
    if (!checkPaginationAvailable(component)) return
    canvasData.value.elements[component.id] = component
    selectElement(component.id)
    // 操作列按钮添加到按钮分组
    if (component.type === ColumnType.ActionBtn) {
      addActionBtnIntoList(component.id)
    }
  }

  /**
   * 删除元素
   * @param id 元素ID
   * @description 删除当前画布元素
   */
  function deleteElement(id: string) {
    delete canvasData.value.elements[id]
    if (activeCanvasElement.value?.id === id) {
      activeCanvasElement.value = undefined
    }
    removeActionBtnFromList(id)
  }

  /**
   * 更新元素
   * @param id 元素ID
   * @param props 元素属性更新对象
   */
  function updateElement(id: string, props: Partial<CanvasElement>) {
    const element = getElement(id)
    if (element) {
      Object.assign(element, props)
    }
  }

  /**
   * 替换元素
   * @param component 元素数据对象
   * @param oldComponent 旧元素数据对象
   */
  function replaceElement(component: CanvasElement, oldComponent: CanvasElement) {
    canvasData.value.elements[component.id] = component
    deleteElement(oldComponent.id)
    selectElement(component.id)
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
   * 添加到按钮分组配置中
   * @param id 按钮id
   */
  function addActionBtnIntoList(id: string) {
    canvasData.value.config.actionBtnsList.push(id)
  }

  /**
   * 从按钮分组配置中移除按钮
   * @param id 按钮id
   */
  function removeActionBtnFromList(id: string) {
    const idx = canvasData.value.config.actionBtnsList.findIndex((item) => item === id)
    if (idx !== -1) {
      canvasData.value.config.actionBtnsList.splice(idx, 1)
      return
    }
    const groupIdx = canvasData.value.config.actionBtnsList.findIndex(
      (item) => isObject(item) && (item as ActionBtnGroup).children.includes(id),
    )
    if (groupIdx !== -1) {
      const children = (canvasData.value.config.actionBtnsList[groupIdx] as ActionBtnGroup).children
      const idx = children.indexOf(id)
      children.splice(idx, 1)
      // 如果分组下已没有按钮，分组也删除
      if (!children.length) {
        canvasData.value.config.actionBtnsList.splice(groupIdx, 1)
      }
    }
  }

  /**
   * 新增按钮分组
   * 从actionBtnsList中移除btnList中的数据，并在 btnList[0]所在的位置添加按钮分组
   * @param group 按钮分组配置
   * @param btnList 分组下的按钮
   */
  function addActionBtnGroup(group: ActionBtnGroup, btnList: string[]) {
    const list: string[] = []
    // 按照 actionBtnsList 中的顺序重新排列btnList
    canvasData.value.config.actionBtnsList.forEach((item) => {
      if (btnList.includes(item as string)) {
        list.push(item as string)
      }
    })
    // 第一个所在的索引
    const firstIdx = canvasData.value.config.actionBtnsList.indexOf(list[0])
    // 从actionBtnsList中删除 list 中的所有元素
    list.forEach((item) => {
      const index = canvasData.value.config.actionBtnsList.indexOf(item)
      canvasData.value.config.actionBtnsList.splice(index, 1)
    })
    group.children = list
    canvasData.value.config.actionBtnsList.splice(firstIdx, 0, group)
  }

  /**
   * 删除按钮分组
   * @param groupId 分组id
   */
  function deleteActionBtnGroup(groupId: string) {
    const idx = canvasData.value.config.actionBtnsList.findIndex(
      (item) => isObject(item) && (item as ActionBtnGroup).id === groupId,
    )
    if (idx === -1) return
    const group = canvasData.value.config.actionBtnsList[idx] as ActionBtnGroup
    const groupIds = group.children
    canvasData.value.config.actionBtnsList.splice(idx, 1, ...groupIds) // 只删除分组，分组下的按钮留在原分组的位置
  }

  /**
   * 更新按钮分组
   * @param id 分组id
   * @param props 分组属性更新对象
   */
  function updateActionBtnGroup(id: string, props: Partial<ActionBtnGroup>) {
    const group = canvasData.value.config.actionBtnsList.find(
      (item) => isObject(item) && (item as ActionBtnGroup).id === id,
    )
    if (!group) return
    Object.assign(group, props)
  }

  /**
   * 检查分页是否可以添加
   * 分页只能添加一个
   * @param component 元素数据对象
   * @returns Boolean 是否可以添加
   */
  function checkPaginationAvailable(component: CanvasElement): boolean {
    const curColumnType = component.type as ColumnType
    const hasComponent = getTableElements().find(
      (element) => element.type === ColumnType.Pagination,
    )
    if (curColumnType === ColumnType.Pagination && hasComponent) {
      message.error(`${columnsComponentNames[ColumnType.Pagination]}已存在，不能重复添加`)
      return false
    }
    return true
  }

  /**
   * 检查操作列是否可以添加
   * 操作列只能添加一个；操作按钮要添加到操作列中
   * @param component 元素数据对象
   * @returns Boolean 是否可以添加
   */
  function checkActionColumnAvailable(component: CanvasElement): boolean {
    const curColumnType = component.type as ColumnType
    const hasComponent = getTableElements().find((element) => element.type === ColumnType.Action)
    if (curColumnType === ColumnType.ActionBtn && !hasComponent) {
      message.error(`请先添加${columnsComponentNames[ColumnType.Action]}，再添加操作按钮`)
      return false
    }
    if (curColumnType === ColumnType.Action && hasComponent) {
      message.error(`${columnsComponentNames[ColumnType.Action]}已存在，不能重复添加`)
      return false
    }
    return true
  }

  /**
   * 检查表格选择控件是否可以添加
   * 单选、多选、索引列只能添加一个
   * @param component 元素数据对象
   * @returns Boolean 是否可以添加
   */
  function checkRowSelectionAvailable(component: CanvasElement): boolean {
    const curColumnType = component.type as ColumnType
    const types = [ColumnType.Radio, ColumnType.Checkbox, ColumnType.Index]
    const hasComponent = getTableElements().find((element) =>
      types.includes(element.type as ColumnType),
    )
    const hasComponentColumnType = hasComponent?.type as ColumnType
    if (hasComponent && types.includes(curColumnType)) {
      if (hasComponentColumnType === curColumnType) {
        message.error(`${columnsComponentNames[curColumnType]}已存在，不能重复添加`)
      } else {
        openModal(
          {
            title: '替换',
            content: `是否替换已有的${columnsComponentNames[hasComponentColumnType]}为${columnsComponentNames[curColumnType]}？`,
            subContent: '',
          },
          () => {
            console.log('确认替换其他类型控件')
            replaceElement(component, hasComponent)
          },
        )
      }
      return false
    }
    return true // 其他类型可以添加
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
    activeCanvasElement.value = undefined
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
    if (canDelete) return layoutOperateOptions
    else return excludeOption(layoutOperateOptions, 'delete')
  }

  function getElementToolbar() {
    return elementOperateOptions
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
    actionBtnGroups,
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
    getElementToolbar,
    selectElement,
    addElement,
    deleteElement,
    updateElement,
    getTableElements,
    addActionBtnGroup,
    deleteActionBtnGroup,
    updateActionBtnGroup,
    resetCanvas,
    toggleAttributesPanel,
  }
})

export type DesignStore = ReturnType<typeof useDesignStore>
