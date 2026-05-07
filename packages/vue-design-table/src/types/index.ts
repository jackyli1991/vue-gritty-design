export enum Direction {
  Vertical = 'vertical',
  Horizontal = 'horizontal',
}

export interface Option {
  value: string | number | boolean
  label: string
  icon?: string
  danger?: boolean
  color?: string
}

// 组件类型定义
export interface ResourceItem {
  type: string
  name: string
  icon: string
  props: Record<string, unknown>
}

// 组件分类类型定义
export interface ResourceGroup {
  title: string
  key: string
  components: ResourceItem[]
}

// 画布布局类型定义
export interface CanvasLayout {
  id: string // 布局ID
  parentId?: string // 父布局ID
  name: string // 布局名称
  direction?: Direction | undefined // 布局方向
  children?: string[] // 子布局ID列表
  deleteAllowed?: boolean // 是否可删除
  addAllowed?: boolean // 是否可添加子布局
  dropAllowed?: boolean // 是否可拖拽元素到该布局
  props: {
    padding: number[] // 内边距
    widthType: string // 宽度类型
    widthValue: number // 宽度值
    heightType: string // 高度类型
    heightValue: number // 高度值
    gap: number // 间距
    backgroundColor: string // 背景颜色
    isForm: boolean // 是否为表单布局
  }
}

// 画布元素类型定义
export interface CanvasElement {
  id: string // 元素ID
  layoutId: string // 布局ID
  type: string // 元素类型
  name: string // 元素名称
  props: Record<string, unknown> // 元素属性
}

// 画布元素组类型定义
export interface CanvasElementGroup {
  layoutId: string // 布局ID
  children: CanvasElement[] // 子元素
}

// 画布数据类型定义
export interface CanvasData {
  layouts: Record<string, CanvasLayout> // 画布布局
  elements: Record<string, CanvasElementGroup> // 画布元素
}

// 画布上下文类型定义
export interface CanvasContext {
  canvasData: CanvasData // 画布数据
  activeCanvasElement: CanvasElement | null // 当前选中的元素
  activeCanvasLayout: CanvasLayout | null // 当前选中的布局
  hoveredLayoutId: string // 当前鼠标悬停的布局ID
  addCanvasElement: (component: CanvasElement) => void // 添加元素
  deleteCanvasElement: (index: number) => void // 删除元素
  selectCanvasElement: (index: number) => void // 选择元素
  getLayoutById: (layoutId: string) => CanvasLayout | undefined // 根据ID获取布局
  addLayout: (layoutId: string, direction: string) => void // 添加布局
  deleteLayout: (layoutId: string) => void // 删除布局
  selectLayout: (layoutId: string) => void // 选择布局
}

// 主题上下文类型定义
export interface ThemeContext {
  themeColors: Required<ThemeColors>
  setThemeColors: (colors: ThemeColors) => void
}

export interface ThemeColors {
  primary?: string
  danger?: string
  success?: string
  warning?: string
  info?: string
}

export interface DesignTableConfig {
  components?: ResourceItem[]
  showProperties?: boolean
  canvasBackground?: string
  themeColors?: ThemeColors
}
