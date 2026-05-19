import { Option, Position } from '@/types'

export const yesNoOptions: Option[] = [
  { label: '是', value: 1 },
  { label: '否', value: 0 },
]

export const directionOptions: Option[] = [
  { label: '水平', value: 'horizontal' },
  { label: '垂直', value: 'vertical' },
]

export const widthTypeOptions: Option[] = [
  { label: '固定宽度', value: 'px' },
  { label: '百分比', value: '%' },
  { label: '弹性布局', value: 'flex' },
]

export const heightTypeOptions: Option[] = [
  { label: '固定高度', value: 'px' },
  { label: '百分比', value: '%' },
  { label: '弹性布局', value: 'flex' },
]

export const alignOptions: Option[] = [
  { label: '左对齐', value: 'left' },
  { label: '居中对齐', value: 'center' },
  { label: '右对齐', value: 'right' },
]

export const fixedOptions: Option[] = [
  { label: '不固定', value: false },
  { label: '左侧', value: 'left' },
  { label: '右侧', value: 'right' },
]

export const filterModeOptions: Option[] = [
  { label: '下拉', value: 'menu' },
  { label: '树形', value: 'tree' },
  { label: '搜索', value: 'search' },
]

export const filtersSourceOptions: Option[] = [
  { label: '字典', value: 'dict' },
  { label: '静态数据', value: 'static' },
  { label: '接口', value: 'api' },
]

export const buttonTypeOptions: Option[] = [
  { label: '默认', value: 'default' },
  { label: '主要', value: 'primary' },
  { label: '虚线', value: 'dashed' },
  { label: '链接', value: 'link' },
  { label: '文本', value: 'text' },
]

export const buttonSizeOptions: Option[] = [
  { label: '大', value: 'large' },
  { label: '中', value: 'default' },
  { label: '小', value: 'small' },
]

// 布局操作选项
export const layoutOperateOptions: Option[] = [
  {
    label: '在上方添加',
    value: Position.Top,
    icon: 'material-symbols:splitscreen-add-outline-rounded',
  },
  {
    label: '在下方添加',
    value: Position.Bottom,
    icon: 'material-symbols:splitscreen-add-outline-rounded',
  },
  {
    label: '在左侧添加',
    value: Position.Left,
    icon: 'material-symbols:splitscreen-vertical-add-outline-rounded',
  },
  {
    label: '在右侧添加',
    value: Position.Right,
    icon: 'material-symbols:splitscreen-vertical-add-outline-rounded',
  },
  {
    label: '删除布局',
    value: 'delete',
    icon: 'material-symbols:delete',
    danger: true,
    color: '#ff4d4f',
  },
]

// 元素操作选项
export const elementOperateOptions: Option[] = [
  {
    label: '删除元素',
    value: 'delete',
    icon: 'material-symbols:delete',
    danger: true,
    color: '#ff4d4f',
  }
]
