import { reqLogin, reqLogout, reqRegister, reqUserInfo } from "@/api/user"
import { Result } from "@/api/user/type"
import { GET_TOKEN, REMOVE_TOKEN, SET_TOKEN } from "@/utils/token"
import { defineStore } from "pinia"
import { ref } from "vue"
import MyMessage from '@/utils/myMessage'

const useUserStore = defineStore('user', () => {
    // 登录弹窗是否可见，初始为false不可见
    let loginDialogVisible = ref<boolean>(false)

    // 存储token令牌
    let token = ref<string | null>(GET_TOKEN())
    

    const userLogin = async (data:any) => {    // 用户登录
        let result: Result<any> = await reqLogin(data)
        if(result.code === 200){
            token.value = (result.data as string)
            SET_TOKEN((result.data as string))
            loginDialogVisible.value = false
            MyMessage({
                message:'登录成功！',
                type:'success',
            })
            return 'ok'
        }else {
            throw new Error(result.message)
        }
    }
    const userRegister = async (data:any) => {  // 用户注册
        let result: Result<any> = await reqRegister(data)
        if(result.code === 200){
            token.value = (result.data as string)
            SET_TOKEN((result.data as string))
            loginDialogVisible.value = false
            MyMessage({
                message:'注册成功！',
                type:'success',
            })
            return 'ok'
        }else {
            throw new Error(result.message)
        }
    }
    const userLogout = async () => {    // 退出登录
        let result: Result<any> = await reqLogout()
        if(result.code === 200){
            token.value = null
            REMOVE_TOKEN()
            MyMessage({
                message:'退出登录成功！',
                type:'info',
            })
        }
    }
    // 根据token获取用户信息
    const getUserInfo = async () => {
        await reqUserInfo()
    }
    return {
        loginDialogVisible,
        token, userLogin, getUserInfo, userLogout, userRegister
    }
})

export default useUserStore