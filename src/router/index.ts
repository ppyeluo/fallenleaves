import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes'
import setting from '@/setting'
import MyMessage from '@/utils/myMessage'
import { GET_TOKEN } from '@/utils/token'

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior() {
        return { top: 0 }
    }
})
// 全局前置守卫
router.beforeEach((to, from, next) => {  
    if(to.meta.needToken){
        if(GET_TOKEN()){
            next()
        }else{
            MyMessage({
                type:'warning',
                message:'请登录后再试！'
            })
            next(from)
        }
    }else{
        next()
    }
})

// 全局后置守卫，切换路由成功后，改变页签标题
router.afterEach((to, _from) => {
    document.title = `${setting.title}-${to.meta.title}`
})

export default router