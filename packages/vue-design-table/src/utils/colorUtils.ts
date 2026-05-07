/**
 * 将十六进制颜色转换为RGB表示
 * @param hex 颜色的十六进制表示
 * @returns 颜色的RGB表示，包含红、绿、蓝分量
 */
export function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const h = hex.replace('#', '')
  return {
    r: parseInt(h.substring(0, 2), 16),
    g: parseInt(h.substring(2, 4), 16),
    b: parseInt(h.substring(4, 6), 16),
  }
}

/**
 * 将RGB颜色转换为十六进制表示
 * @param r 红色分量
 * @param g 绿色分量
 * @param b 蓝色分量
 * @returns 颜色的十六进制表示
 */
function rgbToHex(r: number, g: number, b: number): string {
  const clamp = (v: number) => Math.max(0, Math.min(255, Math.round(v)))
  return `#${clamp(r).toString(16).padStart(2, '0')}${clamp(g).toString(16).padStart(2, '0')}${clamp(b).toString(16).padStart(2, '0')}`
}

/**
 * 将颜色与白色混合，生成浅色颜色
 * @param hex 颜色的十六进制表示
 * @param amount 变浅的量，默认0.9
 * @returns 变浅后的颜色的十六进制表示
 */
export function lighten(hex: string, amount: number = 0.9): string {
  const { r, g, b } = hexToRgb(hex)
  return rgbToHex(r + (255 - r) * amount, g + (255 - g) * amount, b + (255 - b) * amount)
}

/**
 * 将颜色与黑色混合，生成深色颜色
 * @param hex 颜色的十六进制表示
 * @param amount 变深的量，默认0.15
 * @returns 变深后的颜色的十六进制表示
 */
export function darken(hex: string, amount: number = 0.15): string {
  const { r, g, b } = hexToRgb(hex)
  return rgbToHex(r * (1 - amount), g * (1 - amount), b * (1 - amount))
}
