import axios from 'axios'
import type { AxiosInstance, InternalAxiosRequestConfig, AxiosError, AxiosResponse } from 'axios'
import { ElMessage } from 'element-plus'
import useUserStore from '@/store/modules/user'
import { REMOVE_TOKEN } from './token'


const userStore = useUserStore()
const request:AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_SERVE,
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    timeout: 5000
})

request.interceptors.request.use((config:InternalAxiosRequestConfig) => {
    if(userStore.token){
        config.headers.Authorization = `Bearer ${userStore.token}`
    }
    // 开启loading效果
    
    return config
}, (error: AxiosError) => {
    console.error(error.message);
    return Promise.reject(error)
})

request.interceptors.response.use((response:AxiosResponse) => {
    return response.data
}, (error:AxiosError) => {
    const code = error.response?.status
    if(code == 401){
        REMOVE_TOKEN()
        userStore.token = null
        ElMessage({
            type: 'warning',
            message: '登录过期'
        })
    }else if(code == 500){
        ElMessage({
            type: 'error',
            message: '服务器内部错误'
        })
    }
    return Promise.reject(error)
})

export default request