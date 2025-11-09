import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import plugin from './index'
import '@/assets/md.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(plugin)
app.mount('#app')
