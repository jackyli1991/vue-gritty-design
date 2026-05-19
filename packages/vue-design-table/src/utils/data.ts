import { Option } from '@/types'

/**
 * 排除选项值
 * @param list 选项列表
 * @param excludeValues 排除值列表或单个值
 * @returns 排除后的选项列表
 */
export function excludeOption(
  list: Option[],
  excludeValues: (string | number | boolean)[] | string | number | boolean,
) {
  if (Array.isArray(excludeValues)) {
    return list.filter((item) => !excludeValues.includes(item.value))
  }
  return list.filter((item) => item.value !== excludeValues)
}

/**
 * 创建UUID
 * @returns UUID字符串
 */
export function createUUID(len = 36) {
  const uuidv4 = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c: string): string => {
      const r = (Math.random() * 16) | 0
      return c === 'x' ? r.toString() : ((r & 0x3) | 0x8).toString()
    })
  }
  return uuidv4().substring(0, len)
}

/**
 * 判断是不是对象
 * @param data 数据
 * @return boolean
 */
export function isObject(data: unknown) {
  return typeof data === 'object'
}

/**
 * 判断是不是字符串
 * @param data 数据
 * @return boolean
 */
export function isString(data: unknown) {
  return typeof data === 'string'
}
