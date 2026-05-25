import type { LayoutProps } from '@/types'

// 默认布局属性
export const defaultLayoutProps: LayoutProps = {
  padding: [0, 0, 0, 0],
  widthType: '%',
  widthValue: 100,
  heightType: 'px',
  heightValue: 100,
  gap: 12,
  backgroundColor: '#fff',
  isForm: false,
}

/**
 * 创建布局属性
 * @param props 布局属性
 * @returns 布局属性
 */
export function createLayoutProps(props: Partial<LayoutProps>) {
  return { ...defaultLayoutProps, ...props }
}
