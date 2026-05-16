import type { ResourceItem, ResourceGroup } from '@/types'
import { BaseLayouts } from '@/types'
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
    type: 'column',
    name: '表格列',
    icon: 'material-symbols:view-column-2-outline',
    props: createColumnProps({}, true),
  },
  {
    type: 'checkbox',
    name: '多选列',
    icon: 'material-symbols:check-box-outline-rounded',
    props: createColumnProps({
      columnType: 'checkbox',
    }),
  },
  {
    type: 'radio',
    name: '单选列',
    icon: 'material-symbols:radio-button-checked',
    props: createColumnProps({
      columnType: 'radio',
    }),
  },
  {
    type: 'index',
    name: '序号列',
    icon: 'material-symbols:format-list-numbered-rounded',
    props: createColumnProps({
      columnType: 'index',
    }),
  },
  {
    type: 'action',
    name: '操作列',
    icon: 'material-symbols:edit-note-outline-rounded',
    props: createColumnProps({
      columnType: 'action',
    }),
  },
  {
    type: 'action_btn',
    name: '操作按钮',
    icon: 'material-symbols:edit-square-outline',
    props: {},
  },
  {
    type: 'pagination',
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
