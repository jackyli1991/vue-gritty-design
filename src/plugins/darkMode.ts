import type { App } from 'vue'

// 暗黑模式插件
export default {
  install(app: App) {
    app.directive('dark-mode', {
      updated(el, binding) {
        // 是否暗黑模式
        const isDarkMode = binding.value
        // 支持自定义过渡动画的颜色
        // const transitionColor = binding.value || '#000'
        el.addEventListener('click', () => {
          // 1. 浏览器不支持 View Transition 时直接切换主题
          if (!document.startViewTransition) {
            console.error('浏览器不支持 View Transition 时，无法切换主题')
            return
          }
          // 2. 获取点击坐标（从点击位置扩散动画）
          const { left, top } = el.getBoundingClientRect()
          const x = left + el.offsetWidth / 2
          const y = top + el.offsetHeight / 2
          // 计算圆的最大半径（覆盖整个屏幕）
          const radius = Math.hypot(
            Math.max(x, window.innerWidth - x),
            Math.max(y, window.innerHeight - y),
          )
          const clipPath = [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`]
          // 3. 关键：启动视图过渡动画
          const transition = document.startViewTransition(() => {})
          // 4. 动画准备阶段：设置关键帧样式
          transition.ready.then(() => {
            console.log('isDarkMode', isDarkMode)
            const root = document.documentElement
            root.animate(
              {
                clipPath: !isDarkMode ? clipPath.reverse() : clipPath,
              },
              {
                duration: 1000,
                easing: 'ease-in',
                fill: 'both',
                pseudoElement: isDarkMode
                  ? '::view-transition-old(root)'
                  : '::view-transition-new(root)',
              },
            )
          })
        })
      },
    })
  },
}
