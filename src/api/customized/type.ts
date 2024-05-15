export interface Result<T=any> {
    code: number,
    message: string,
    data: T
}

export interface CommodityCategory {
    typeName: string,
    count: number
}
export interface HotSearchKeywords {
    keyword: string,
    count:number
}
export interface HotSaleCommodity {
    name: string,   // 商品名称
    dealTotal:number,   // 交易额 单位：万元
    sold: number    // 订单数
}