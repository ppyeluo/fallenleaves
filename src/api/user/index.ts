import request from '@/utils/request'
import type { Address, Result, userInfo } from './type'


enum API {
    // 用户登录
    LOGIN_URL = '/api/login',
    // 根据token获取用户信息
    USERINFO_URL = '/api/userInfo',
    // 用户退出登录
    LOGOUT_URL = '/api/logout',
    // 用户注册
    REGISTER_URL = '/api/register',
    // 得到用户地址
    ADDRESS_URL = '/api/getUserAddress',
}

// 用户登录
export const reqLogin = (data:any) => request.post<any, Result<any>>(API.LOGIN_URL, data)
// 获取用户信息
export const reqUserInfo = () => request.get<any, Result<userInfo>>(API.USERINFO_URL)
// 退出登录
export const reqLogout = () => request.get<any, Result<any>>(API.LOGOUT_URL)
// 用户注册
export const reqRegister = (data:any) => request.post<any, Result<any>>(API.REGISTER_URL, data)
// 得到用户地址
export const getAddress = () => request.get<any, Result<Address[]>>(API.ADDRESS_URL)