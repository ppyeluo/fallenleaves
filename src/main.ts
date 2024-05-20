import { createApp } from 'vue'
import App from '@/App.vue'
import '@/styles/index.scss'
// svg配置
import 'virtual:svg-icons-register'
// 引入全局注册组件
import globalComponent from '@/components/index'
import pinia from '@/store'
import router from '@/router/index.ts'

const app = createApp(App)
app.use(globalComponent)
app.use(pinia)
app.use(router)
app.mount('#app')