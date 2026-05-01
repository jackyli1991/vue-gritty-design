import type { ResourceItem, ResourceGroup } from '../types'

// 顶部栏组件列表
export const topComponentsList: ResourceItem[] = [
  {
    type: 'title',
    name: '标题',
    icon: 'material-symbols:title-text',
    props: {},
  },
  {
    type: 'input',
    name: '搜索框',
    icon: 'material-symbols:text-fields',
    props: {},
  },
  {
    type: 'button',
    name: '按钮',
    icon: 'material-symbols:smart-button',
    props: {},
  },
]

// 表格列组件列表
export const columnsComponentsList: ResourceItem[] = [
  {
    type: 'column',
    name: '表格列',
    icon: 'material-symbols:text-fields',
    props: {},
  },
  {
    type: 'action',
    name: '操作列',
    icon: 'material-symbols:text-fields',
    props: {},
  },
  {
    type: 'action_btn',
    name: '操作按钮',
    icon: 'material-symbols:check-box-outline-blank',
    props: {},
  }
]

export const resourceGroupsList: ResourceGroup[] = [
  {
    title: '顶部栏',
    key: 'table-top', // 目的拖拽区域标识
    components: topComponentsList,
  },
  {
    title: '表格列',
    key: 'table-columns', // 目的拖拽区域标识
    components: columnsComponentsList,
  },
  {
    title: '其他组件',
    key: 'table-other', // 目的拖拽区域标识
    components: [],
  },
]
