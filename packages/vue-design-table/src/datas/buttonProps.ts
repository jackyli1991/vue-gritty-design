import { ButtonProps } from '@/types'

export const buttonProps: ButtonProps = {
  content: '操作',
  type: 'primary',
  icon: '',
  size: 'small',
  danger: false,
  ghost: false,
  backgroundColor: '',
}

/**
 * 创建按钮属性
 * @param props 自定义按钮属性
 * @returns 按钮属性
 */
export function createButtonProps(props: Record<string, unknown> = {}) {
  return {
    ...buttonProps,
    ...props,
  }
}
