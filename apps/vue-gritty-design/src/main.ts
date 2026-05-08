import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.css'

import App from './App.vue'
import router from './router'
import components from '@/components'
import darkModePlugin from '@/plugins/darkMode'
import i18n from '@/locales'
import VueDesignTable from '@vue-gritty-design/vue-design-table'
import '@vue-gritty-design/vue-design-table/style.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(components)
app.use(darkModePlugin)
app.use(i18n)
app.use(VueDesignTable)

app.mount('#app')
