import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.css'

import App from './App.vue'
import router from './router'
import darkModePlugin from '@/plugins/darkMode'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(darkModePlugin)

app.mount('#app')
