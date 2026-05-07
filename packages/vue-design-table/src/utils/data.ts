import { Option } from '@/types'

/**
 * 排除选项值
 * @param list 选项列表
 * @param excludeValues 排除值列表或单个值
 * @returns 排除后的选项列表
 */
export function excludeOption(list: Option[], excludeValues: (string | number | boolean)[] | string | number | boolean) {
  if (Array.isArray(excludeValues)) {
    return list.filter(item => !excludeValues.includes(item.value))
  }
  return list.filter(item => item.value !== excludeValues)
}
