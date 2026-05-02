import type { ResourceItem, ResourceGroup } from '../types'

// 顶部栏组件列表
export const topComponentsList: ResourceItem[] = [
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
]

// 表格列组件列表
export const columnsComponentsList: ResourceItem[] = [
  {
    type: 'column',
    name: '表格列',
    icon: 'material-symbols:view-column-2-outline',
    props: {},
  },
  {
    type: 'checkbox',
    name: '多选列',
    icon: 'material-symbols:check-box-outline-rounded',
    props: {},
  },
  {
    type: 'radio',
    name: '单选列',
    icon: 'material-symbols:radio-button-checked',
    props: {},
  },
  {
    type: 'index',
    name: '序号列',
    icon: 'material-symbols:format-list-numbered-rounded',
    props: {},
  },
  {
    type: 'action',
    name: '操作列',
    icon: 'material-symbols:edit-note-outline-rounded',
    props: {},
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

export const resourceGroupsList: ResourceGroup[] = [
  {
    title: '顶部栏',
    key: 'table-top', // 目的拖拽区域标识
    components: topComponentsList,
  },
  {
    title: '表格',
    key: 'table-columns', // 目的拖拽区域标识
    components: columnsComponentsList,
  },
  {
    title: '表单',
    key: 'table-form', // 目的拖拽区域标识
    components: [],
  },
]
