import index from './pages/index.vue'
import { createApp } from 'vue'
import router from './router'
import plugin from './index'
import '@/assets/md.css'

const app = createApp(index)

app.use(router)
app.use(plugin)
app.mount('#app')
