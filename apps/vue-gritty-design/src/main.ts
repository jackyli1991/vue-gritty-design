import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.css'

import App from './App.vue'
import router from './router'
import components from '@/components'
import darkModePlugin from '@/plugins/darkMode'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(components)
app.use(darkModePlugin)

app.mount('#app')
