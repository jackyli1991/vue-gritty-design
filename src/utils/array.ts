/**
 * 扁平化以childrenKey为子项的深层嵌套数组
 * @param {T[]} arr 原数组
 * @param {T[]} target 目标数组
 * @param {string} childrenKey 子项键名
 * @returns {void} 目标数组
 */
export function flattenDeepArray<T>(arr: T[], target: T[], childrenKey: string = 'children'): void {
  arr.forEach((item: T) => {
    target.push(item)
    if ((item as Record<string, unknown>)[childrenKey]) {
      flattenDeepArray((item as Record<string, unknown>)[childrenKey] as T[], target, childrenKey)
    }
  })
}
