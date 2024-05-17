
export interface Result<T=any> {
    code: number,
    message: string,
    data: T
}

export interface CollectItem{
    userId: string,
    commodityId: string,
    name:string,
    flowerLanguage:string,
    picture:string
}
// 向收藏中添加商品
export interface addCollect {
    isSuccess: boolean
}