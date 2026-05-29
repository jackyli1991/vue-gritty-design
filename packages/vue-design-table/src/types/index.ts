import type { TablePaginationConfig } from 'ant-design-vue/es/table/interface'

export enum Direction {
  Vertical = 'vertical',
  Horizontal = 'horizontal',
}

export enum Position {
  Top = 'top',
  Bottom = 'bottom',
  Left = 'left',
  Right = 'right',
}

export enum BaseLayouts {
  TablePage = 'tablePage', // 表格页面布局
  TableWrapper = 'tableWrapper', // 表格包裹布局
  TableMain = 'tableMain', // 表格主体布局
  TableForm = 'tableForm', // 表格表单布局
  Common = 'common', // 通用布局
}

export enum ColumnType {
  Column = 'column', // 表格列
  Radio = 'radio', // 单选列
  Checkbox = 'checkbox', // 多选列
  Index = 'index', // 索引列
  Action = 'action', // 操作列
  ActionBtn = 'action_btn', // 操作按钮
  Pagination = 'pagination', // 分页列
}

export enum FilterMode {
  Menu = 'menu', // 菜单筛选
  Input = 'input', // 输入筛选
}

export enum FiltersSource {
  Dict = 'dict', // 字典
  Static = 'static', // 静态数据
  Api = 'api', // 接口
}

export interface Option {
  value: string | number | null | undefined
  label: string
  icon?: string
  danger?: boolean
  color?: string
  text: string
}

// 组件类型定义
export interface ResourceItem {
  type: ColumnType | string
  name: string
  icon: string
  props: Record<string, unknown> | ColumnProps
}

// 组件分类类型定义
export interface ResourceGroup {
  title: string // 分类标题
  target?: BaseLayouts // 目标布局
  components: ResourceItem[] // 组件列表
}

// 画布布局类型定义
export interface CanvasLayout {
  id: string // 布局ID
  parentId?: string // 父布局ID
  type: BaseLayouts // 布局类型
  name: string // 布局名称
  direction?: Direction | undefined // 布局方向
  children?: string[] // 子布局ID列表
  deleteAllowed?: boolean // 是否可删除
  addAllowed?: boolean // 是否可添加子布局
  dropAllowed?: boolean // 是否可拖拽元素到该布局
  props: LayoutProps // 布局属性
}

// 画布元素类型定义
export interface CanvasElement {
  id: string // 元素ID
  layoutId: string // 布局ID
  type: ColumnType | string // 元素类型
  name: string // 元素名称
  props: ColumnProps | ButtonProps | PaginationProps // 元素属性
}

// 操作列分组
export interface ActionBtnGroup {
  id: string // 分组id
  type: 'actionBtnsGroup' // 分组类型
  button: ButtonProps // 分组按钮配置
  children: string[] // 分组按钮id
}

// 画布配置
export interface CanvasConfig {
  actionBtnsList: (string | ActionBtnGroup)[] // 操作列排序和分组
}

// 画布数据类型定义
export interface CanvasData {
  layouts: Record<string, CanvasLayout> // 画布布局
  elements: Record<string, CanvasElement> // 画布元素
  config: CanvasConfig // 画布配置
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

// export interface DesignTableConfig {
//   components?: ResourceItem[]
//   showProperties?: boolean
//   canvasBackground?: string
//   themeColors?: ThemeColors
// }

// 表格列属性类型定义
export interface ColumnProps {
  title: string // 列标题
  width: number // 列宽度
  maxWidth?: number // 列最大宽度
  minWidth?: number // 列最小宽度
  align: string // 列对齐方式
  dataIndex: string // 列数据索引名 支持通过数组查询嵌套路径
  fixed?: 'left' | 'right' | boolean // 列固定位置 false true(等效于left) left right
  resizable?: boolean // 是否可调整宽度
  filterable?: boolean // 是否可筛选
  filterMultiple?: boolean // 是否可多选筛选
  filterMode?: FilterMode // 指定筛选菜单的用户界面
  filtersSource?: FiltersSource // 列筛选选项来源  dict-字典 static-静态数据 api-接口
  filters?: Option[] // 列筛选选项
  filterIcon?: string // 列筛选图标
  sortable?: boolean // 是否可排序
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any // 其他列属性
}

// 按钮属性类型定义
export interface ButtonProps {
  content: string // 按钮文本
  type: string // 按钮类型
  size: string // 按钮大小
  icon?: string // 按钮图标
  danger: boolean // 是否为危险按钮
  ghost: boolean // 是否为幽灵按钮
  backgroundColor?: string // 背景颜色
}

// 布局属性类型定义
export interface LayoutProps {
  padding: number[] // 内边距
  widthType: string // 宽度类型
  widthValue: number // 宽度值
  heightType: string // 高度类型
  heightValue: number // 高度值
  gap: number // 间距
  backgroundColor: string // 背景颜色
  isForm: boolean // 是否为表单布局
}

// position: TablePaginationPosition[] // 分页位置 topLeft topCenter topRight bottomLeft bottomCenter bottomRight
// defaultPageSize: number // 默认每页数量
// hideOnSinglePage: boolean // 是否在单页时隐藏分页组件
// pageSizeOptions: number[] // 每页数量选项
// showQuickJumper: boolean // 是否显示快速跳转页码
// showSizeChanger: boolean // 是否显示每页数量选择器
// simple: boolean // 是否为简单分页
// size: string // 分页大小
export interface PaginationProps extends TablePaginationConfig {
  enabled: boolean // 是否启用分页组件
  showQuickJumper: boolean // 是否显示快速跳转页码
  prePageText?: string // 上一页文本
  nextPageText?: string // 下一页文本
  totalText?: string // 总页数文本
}
