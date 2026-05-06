export const YesNoOptions = [
  { label: '是', value: 1 },
  { label: '否', value: 0 },
]

export const DirectionOptions = [
  { label: '水平', value: 'horizontal' },
  { label: '垂直', value: 'vertical' },
]

export const widthTypeOptions = [
  { label: '固定宽度', value: 'px' },
  { label: '百分比', value: '%' },
  { label: '弹性布局', value: 'flex' },
]

export const heightTypeOptions = [
  { label: '固定高度', value: 'px' },
  { label: '百分比', value: '%' },
  { label: '弹性布局', value: 'flex' },
]

// 布局操作选项
export const LayoutOperateOptions = [
  {
    label: '在上方添加',
    value: 'top',
    icon: 'material-symbols:splitscreen-add-outline-rounded',
  },
  {
    label: '在下方添加',
    value: 'bottom',
    icon: 'material-symbols:splitscreen-add-outline-rounded',
  },
  {
    label: '在左侧添加',
    value: 'left',
    icon: 'material-symbols:splitscreen-vertical-add-outline-rounded',
  },
  {
    label: '在右侧添加',
    value: 'right',
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
