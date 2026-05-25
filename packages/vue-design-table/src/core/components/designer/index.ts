import type { CanvasLayout, CanvasElement, ActionBtnGroup, LayoutProps } from '@/types'
import { BaseLayouts } from '@/types'
import { createUUID } from '@/utils'
import { buttonProps } from '@/datas/buttonProps'
import { createLayoutProps } from '@/datas/layoutProps'

export type CreateLayoutConfig = Omit<CanvasLayout, 'id' | 'props'> & Partial<LayoutProps>

/**
 * 创建布局
 * @description 创建一个画布布局对象
 * @param id 布局ID
 * @param parentId 父布局ID
 * @param config 布局配置
 * @returns 布局对象
 */
export function createLayout(
  id: string,
  parentId: string,
  config: CreateLayoutConfig,
): CanvasLayout {
  return {
    id,
    parentId,
    type: config.type ?? BaseLayouts.Common,
    name: config.name ?? '',
    direction: config.direction ?? undefined,
    children: config.children ?? [],
    deleteAllowed: config.deleteAllowed ?? true,
    addAllowed: config.addAllowed ?? true,
    dropAllowed: config.dropAllowed ?? true,
    props: createLayoutProps(config),
  }
}

/**
 * 创建元素
 * @description 创建一个画布元素对象
 * @param layoutId 布局ID
 * @param config 元素配置
 * @returns 元素对象
 */
export function createElement(layoutId: string, config: Omit<CanvasElement, 'id'>): CanvasElement {
  return {
    id: `element_${createUUID()}`,
    layoutId,
    name: config.name ?? '',
    type: config.type ?? 'div',
    props: config.props ?? {},
  }
}

/**
 * 创建按钮分组
 * @returns 按钮分组对象
 */
export function createActionBtnGroup(): ActionBtnGroup {
  return {
    id: `actionBtnGroup_${createUUID()}`,
    type: 'actionBtnsGroup',
    button: { ...buttonProps },
    children: [],
  }
}
