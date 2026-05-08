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

// 布局操作选项
export const LayoutOperateOptions: Option[] = [
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
