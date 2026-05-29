import { Option, Position } from '@/types'

export const yesNoOptions: Option[] = [
  { label: '是', text: '是', value: 1 },
  { label: '否', text: '否', value: 0 },
]

export const directionOptions: Option[] = [
  { label: '水平', text: '水平', value: 'horizontal' },
  { label: '垂直', text: '垂直', value: 'horizontal' },
  { label: '垂直', text: '垂直', value: 'vertical' },
]

export const widthTypeOptions: Option[] = [
  { label: '固定宽度', text: '固定宽度', value: 'px' },
  { label: '百分比', text: '百分比', value: '%' },
  { label: '弹性布局', text: '弹性布局', value: 'flex' },
]

export const heightTypeOptions: Option[] = [
  { label: '固定高度', text: '固定高度', value: 'px' },
  { label: '百分比', text: '百分比', value: '%' },
  { label: '弹性布局', text: '弹性布局', value: 'flex' },
]

export const alignOptions: Option[] = [
  { label: '左对齐', text: '左对齐', value: 'left' },
  { label: '居中对齐', text: '居中对齐', value: 'center' },
  { label: '右对齐', text: '右对齐', value: 'right' },
]

export const fixedOptions: (Omit<Option, 'value'> & { value: string | boolean })[] = [
  { label: '不固定', text: '不固定', value: false },
  { label: '左侧', text: '左侧', value: 'left' },
  { label: '右侧', text: '右侧', value: 'right' },
]

export const filterModeOptions: Option[] = [
  { label: '下拉', text: '下拉', value: 'menu' },
  { label: '树形', text: '树形', value: 'tree' },
  { label: '搜索', text: '搜索', value: 'search' },
]

export const filtersSourceOptions: Option[] = [
  { label: '字典', text: '字典', value: 'dict' },
  { label: '静态数据', text: '静态数据', value: 'static' },
  { label: '接口', text: '接口', value: 'api' },
]

export const buttonTypeOptions: Option[] = [
  { label: '默认', text: '默认', value: 'default' },
  { label: '主要', text: '主要', value: 'primary' },
  { label: '虚线', text: '虚线', value: 'dashed' },
  { label: '链接', text: '链接', value: 'link' },
  { label: '文本', text: '文本', value: 'text' },
]

export const buttonSizeOptions: Option[] = [
  { label: '大', text: '大', value: 'large' },
  { label: '中', text: '中', value: 'default' },
  { label: '小', text: '小', value: 'small' },
]

export const pageSizeOptions: Option[] = [
  { label: '10', text: '10', value: 10 },
  { label: '20', text: '20', value: 20 },
  { label: '30', text: '30', value: 30 },
  { label: '40', text: '40', value: 40 },
  { label: '50', text: '50', value: 50 },
  { label: '100', text: '100', value: 100 },
  { label: '200', text: '200', value: 200 },
  { label: '300', text: '300', value: 300 },
  { label: '400', text: '400', value: 400 },
  { label: '500', text: '500', value: 500 },
]

// 布局操作选项
export const layoutOperateOptions: (Omit<Option, 'value'> & { value: Position | 'delete' })[] = [
  {
    label: '在上方添加',
    text: '在上方添加',
    value: Position.Top,
    icon: 'material-symbols:splitscreen-add-outline-rounded',
  },
  {
    label: '在下方添加',
    text: '在下方添加',
    value: Position.Bottom,
    icon: 'material-symbols:splitscreen-add-outline-rounded',
  },
  {
    label: '在左侧添加',
    text: '在左侧添加',
    value: Position.Left,
    icon: 'material-symbols:splitscreen-vertical-add-outline-rounded',
  },
  {
    label: '在右侧添加',
    text: '在右侧添加',
    value: Position.Right,
    icon: 'material-symbols:splitscreen-vertical-add-outline-rounded',
  },
  {
    label: '删除布局',
    text: '删除布局',
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
    text: '删除元素',
    value: 'delete',
    icon: 'material-symbols:delete',
    danger: true,
    color: '#ff4d4f',
  },
]
