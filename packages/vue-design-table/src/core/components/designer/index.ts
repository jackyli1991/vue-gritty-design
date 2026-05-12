import type { CanvasLayout } from '@/types'

export interface CreateLayoutConfig extends Omit<CanvasLayout, 'id' | 'props'> {
  widthType?: string
  heightType?: string
  widthValue?: number
  heightValue?: number
  gap?: number
  backgroundColor?: string
  isForm?: boolean
  padding?: number[]
}

/**
 * 创建布局
 * @description 创建一个画布布局对象
 * @param id 布局ID
 * @param parentId 父布局ID
 * @param config 布局配置
 * @returns 布局对象
 */
export function createLayout(
  id: string,
  parentId: string,
  config: CreateLayoutConfig,
): CanvasLayout {
  return {
    id,
    parentId,
    name: config.name ?? '',
    direction: config.direction ?? undefined,
    children: config.children ?? [],
    deleteAllowed: config.deleteAllowed ?? true,
    addAllowed: config.addAllowed ?? true,
    dropAllowed: config.dropAllowed ?? true,
    props: {
      padding: config.padding ?? [0, 0, 0, 0],
      widthType: config.widthType ?? '%',
      widthValue: config.widthValue ?? 100,
      heightType: config.heightType ?? 'px',
      heightValue: config.heightValue ?? 100,
      gap: config.gap ?? 12,
      backgroundColor: config.backgroundColor ?? '#fff',
      isForm: config.isForm ?? false,
    },
  }
}
