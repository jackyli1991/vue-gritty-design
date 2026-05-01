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



export interface CanvasElement {
  id: string
  type: string
  name: string
  props: Record<string, unknown>
}

export interface DesignTableConfig {
  components?: ResourceItem[]
  showProperties?: boolean
  canvasBackground?: string
}
