
export interface Result<T=any> {
    code: number,
    message: string,
    data: T
}

export interface userInfo{
    id:number,
    username:string, // 用户名
}