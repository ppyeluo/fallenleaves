import axios from 'axios'
import type { AxiosInstance, InternalAxiosRequestConfig, AxiosError, AxiosResponse } from 'axios'
import { ElMessage } from 'element-plus'
import useUserStore from '@/store/modules/user'

const request:AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_SERVE,
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    timeout: 5000
})

request.interceptors.request.use((config:InternalAxiosRequestConfig) => {
    const userStore = useUserStore()
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
    let message = ''
    switch(error.response?.status){
        case 401:
            message = 'TOKEN过期'
            break
        case 403:
            message = '无权访问'
            break
        case 404:
            message = '请求地址错误'
            break
        case 500:
            message = '服务器内部错误'
            break
        default:
            message = '网络错误'
            break
    }
    ElMessage({
        type: 'error',
        message
    })
    return Promise.reject(error)
})

export default request