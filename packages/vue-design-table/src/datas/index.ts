import type { ResourceItem, ResourceGroup } from '@/types'
import { BaseLayouts, ColumnType } from '@/types'
import { createColumnProps } from './columnProps'
export * from './directory'

// 基础组件列表
export const baseComponentsList: ResourceItem[] = [
  {
    type: 'title',
    name: '标题',
    icon: 'material-symbols:titlecase',
    props: {},
  },
  {
    type: 'tabs',
    name: '选项卡',
    icon: 'material-symbols:tabs-outline',
    props: {},
  },
  {
    type: 'button',
    name: '按钮',
    icon: 'material-symbols:buttons-alt-outline',
    props: {},
  },
  {
    type: 'icon',
    name: '图标',
    icon: 'material-symbols:emoticon-rounded',
    props: {},
  },
]

// 表格相关组件列表
export const columnsComponentsList: ResourceItem[] = [
  {
    type: ColumnType.Column,
    name: '表格列',
    icon: 'material-symbols:view-column-2-outline',
    props: createColumnProps({}, true),
  },
  {
    type: ColumnType.Checkbox,
    name: '多选列',
    icon: 'material-symbols:check-box-outline-rounded',
    props: createColumnProps(),
  },
  {
    type: ColumnType.Radio,
    name: '单选列',
    icon: 'material-symbols:radio-button-checked',
    props: createColumnProps(),
  },
  {
    type: ColumnType.Index,
    name: '序号列',
    icon: 'material-symbols:format-list-numbered-rounded',
    props: createColumnProps({
      title: '序号',
      width: 30,
    }),
  },
  {
    type: ColumnType.Action,
    name: '操作列',
    icon: 'material-symbols:edit-note-outline-rounded',
    props: createColumnProps({
      title: '操作'
    }),
  },
  {
    type: ColumnType.ActionBtn,
    name: '操作按钮',
    icon: 'material-symbols:edit-square-outline',
    props: {
      title: '操作',
    },
  },
  {
    type: ColumnType.Pagination,
    name: '分页',
    icon: 'material-symbols:fit-page-width-outline',
    props: {},
  },
]

// 表单相关组件列表
export const formComponentsList: ResourceItem[] = [
  {
    type: 'input',
    name: '输入框',
    icon: 'material-symbols:form-outline',
    props: {},
  },
]

export const resourceGroupsList: ResourceGroup[] = [
  {
    title: '基础',
    target: BaseLayouts.Common, // 目的拖拽区域标识
    components: baseComponentsList,
  },
  {
    title: '表格',
    target: BaseLayouts.TableMain, // 目的拖拽区域标识
    components: columnsComponentsList,
  },
  {
    title: '表单',
    target: BaseLayouts.TableForm, // 目的拖拽区域标识
    components: formComponentsList,
  },
]

export const columnsComponentNames = columnsComponentsList.reduce((prev, cur) => {
  prev[cur.type as ColumnType] = cur.name
  return prev
}, {} as Record<ColumnType, string>)
