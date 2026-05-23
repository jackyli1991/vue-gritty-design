import { ColumnType, BaseLayouts } from '@/types'
import LayoutAttrs from './LayoutAttrs.vue' // 布局属性
import NormalColumnAttrs from './NormalColumnAttrs.vue' // 普通列属性：包括：Index、column、action
import SelectColumnAttrs from './SelectColumnAttrs.vue' // 选择列属性：包括radio、checkbox
import ActionBtnAttrs from './ActionBtnAttrs.vue' // 操作按钮属性
import ActionBtnGroupsAttrs from './ActionBtnGroupsAttrs.vue' // 操作按钮分组属性
import PaginationAttrs from './PaginationAttrs.vue' // 分页器属性

// 属性组件映射表
export const attrComponentsMap = {
  // 布局属性
  [BaseLayouts.TablePage]: [LayoutAttrs],
  [BaseLayouts.TableWrapper]: [LayoutAttrs],
  [BaseLayouts.TableMain]: [LayoutAttrs],
  [BaseLayouts.TableForm]: [LayoutAttrs],
  [BaseLayouts.Common]: [LayoutAttrs],
  // 表格列及相关属性
  [ColumnType.Column]: [NormalColumnAttrs],
  [ColumnType.Index]: [NormalColumnAttrs],
  [ColumnType.Action]: [NormalColumnAttrs, ActionBtnGroupsAttrs],
  [ColumnType.Radio]: [SelectColumnAttrs],
  [ColumnType.Checkbox]: [SelectColumnAttrs],
  [ColumnType.ActionBtn]: [ActionBtnAttrs],
  [ColumnType.Pagination]: [PaginationAttrs],
}

export type attrComponentsMapType = keyof typeof attrComponentsMap
