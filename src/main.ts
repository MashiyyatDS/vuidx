import { createApp } from 'vue'
import router from './router'
import plugin from './index'
import '@/assets/md.css'
import App from './app.vue'
import rules from './rules'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const app = createApp(App)
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

app.use(plugin, { rules })
app.use(router)
app.use(pinia)
app.mount('#app')
