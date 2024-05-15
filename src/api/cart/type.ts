
/* 服务器返回数据的的类型，根据接口文档确定 */
export interface Result<T=any> {
    code: number,
    message: string,
    data: T
}
export interface cartItem { // 购物车列表
    userId: number,
    commodityId: string,
    count: number,
    name: string,
    picture: string,
    flowerLanguage: string,
    price: number,
    bank: number
}
export interface addCartData { 
    id:string,  // 商品数量
    count:number
}
export interface batchRemoveCartData{
    numberList: string[]
}