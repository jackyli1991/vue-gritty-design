import type { App } from 'vue'
import { createPinia } from 'pinia'
import VueDesignTable from './core/VueDesignTable.vue'

export { VueDesignTable }
export type { ResourceItem, CanvasElement, ThemeColors } from './types'

export default {
  install(app: App) {
    app.component('VueDesignTable', VueDesignTable)
    app.use(createPinia())
  },
}
