import { createApp } from 'vue'
import router from './router'
import plugin from './index'
import '@/assets/md.css'
import App from './app.vue'
import rules from './rules'

const app = createApp(App)

app.use(plugin, { rules })
app.use(router)
app.mount('#app')
