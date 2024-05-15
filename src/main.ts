import { createApp } from 'vue'
import App from '@/App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import '@/styles/index.scss'
// svg配置
import 'virtual:svg-icons-register'
// 引入全局注册组件
import globalComponent from '@/components/index'
import pinia from '@/store'
import router from '@/router/index.ts'

const app = createApp(App)
app.use(globalComponent)
app.use(ElementPlus, { locale: zhCn, })
app.use(pinia)
app.use(router)
app.mount('#app')