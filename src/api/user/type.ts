
export interface Result<T=any> {
    code: number,
    message: string,
    data: T
}

export interface userInfo{
    id:number,
    username:string,
    phone:string,
    email:string,
    password:string,
    avatar:string,
    tag:string
}
// 地址
export interface Address {
    user_id: number,
    receiver: string,
    phone: string,
    province: string,
    city: string,
    town: string,
    detail: string,
    default: 1
}