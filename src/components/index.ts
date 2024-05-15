import type { App, Component } from 'vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import SvgIcon from '@/components/SvgIcon/index.vue'
import MyFooter from '@/components/footer/index.vue'
import MyHeader from '@/components/header/index.vue'
import NavTitle from '@/components/navTitle/index.vue'

const components: { [name: string]: Component }  = {
    SvgIcon,
    MyFooter,
    MyHeader,
    NavTitle
    
}

export default {
    install(app:App){
        Object.keys(components).forEach((key: string) => {
            app.component(key, components[key])
        })
        // 全局注册elementplus的icon图标组件
        for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
            app.component(key, component)
        }
    }
}