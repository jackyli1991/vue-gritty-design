export enum Direction {
  Vertical = 'vertical',
  Horizontal = 'horizontal',
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
  editable?: boolean // 是否可编辑
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
  canvasData: CanvasData
  activeCanvasElement: CanvasElement | null
  addCanvasElement: (component: CanvasElement) => void
  deleteCanvasElement: (index: number) => void
  selectCanvasElement: (index: number) => void
  getLayoutById: (layoutId: string) => CanvasLayout | undefined
  addLayout: (layoutId: string, direction: string) => void
}

export interface DesignTableConfig {
  components?: ResourceItem[]
  showProperties?: boolean
  canvasBackground?: string
}
