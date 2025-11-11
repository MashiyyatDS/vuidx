import { createApp } from 'vue'
import router from './router'
import plugin from './index'
import '@/assets/md.css'
import App from './app.vue'

const app = createApp(App)

app.use(router)
app.use(plugin)
app.mount('#app')
