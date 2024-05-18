// 定义全部接口返回都拥有的ts类型
/* 服务器返回数据的的类型，根据接口文档确定 */
export interface Result<T=any> {
    code: number,
    message: string,
    data: T
}
// 定义商品类型
export interface Commodity{
    id: string, // 唯一id
    name: string,  // 名字
    desc: string,   // 描述
    price: number,  // 价格
    materials: string,  // 制作材料
    flowerLanguage: string, // 花语
    picture: string,    // 图片
    type: string,   // 类型
    size: number,   // 型号
    sold: number,   // 已售
    score: number,  // 评分
    bank: number,   // 库存
    comments: number,   //评论数量
    listing_time: string,    // 上架时间
    imgUrls?: string[]   // 商品图片地址数组
}
// 定义商品类型
export interface CommodityType{
    type:string,    // 类型代码
    typeName:string,    // 类型名字
    typeCount?:number    // 该类型商品数目
}
// 定义搜索结果类型
export interface SearchResult {
    type?: CommodityType[],
    commodityName?: Commodity[],
    flowerLanguage?: Commodity[]
}
// 排序字段的类型
export type SortField = 'id' | 'desc' | 'price' | 'picture' | 'type' | 'size' | 'sold' | 'score' | 'bank' | 'comments' | 'listing_time'

// 排序顺序的类型
export type SortOrder = 'asc' | 'desc' | 'ASC' | 'DESC'

// 定义搜索页结果类型
export interface SearchCommodity{
    intent: string, // 根据什么关键字检索
    type: string,   // 检索类型
    page: number,   // 当前是第几页
    pageSize: number,   // 每页多少个
    totalPages?: number, // 总页数
    total?: number,  // 总共有多少个
    sortField: SortField,  // 按什么排序
    sortOrder: SortOrder, // 顺序还是降序
    data?: Commodity[]
}
// 商品评论
export interface CommodityComment {
    id: number, // 评论id
    username: string,   // 评论人用户名
    avatar: string, // 评论人头像 
    tag: string,    // 评论人标签
    commodityName: string, // 商品名称
    content: string,    // 评论内容
    commentTime: string,    // 评论时间
    rating: number, // 评分
    ipAddress: string,  // ip地址
    likesCount: number, // 点赞量
    repliesCount: number    // 回复量
}
// 订单页面商品
export interface Settlement extends Commodity {
    count: number
}