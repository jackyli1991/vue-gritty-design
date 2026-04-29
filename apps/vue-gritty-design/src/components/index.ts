import type { App, Component } from 'vue'

// 组件
import { default as GIcon } from './GIcon/GIcon.vue' // 图标
import { default as GPage } from './GPage/GPage.vue' // 页面布局
import { default as GProgressBar } from './GProgressBar/GProgressBar.vue' // 进度条
import { default as GGlobalLoading } from './GGlobalLoading/GGlobalLoading.vue' // 全局加载组件

// 方法
import { createIcon } from './GIcon/create-icon' // 创建图标

const components: Record<string, Component> = {
  GIcon,
  GPage,
  GProgressBar,
  GGlobalLoading,
}

export default {
  // 自动注册为全局组件
  install(app: App) {
    Object.keys(components).forEach((componentName) =>
      app.component(componentName, components[componentName] as Component),
    )

    // 全局注册方法
    app.config.globalProperties.$createIcon = createIcon
  },
}
