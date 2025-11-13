import { createApp } from 'vue'
import './style.scss'
import App from './App.vue'
import { router } from './router'
import { initTheme } from './utils/theme'

initTheme()
createApp(App).use(router).mount('#app')

