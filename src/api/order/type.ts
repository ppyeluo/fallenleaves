export interface Result<T=any> {
    code: number,
    message: string,
    data: T
}

export interface OrderItem {
    id: string, // 订单唯一id
    userId: number, // 用户id
    commodityId: string,    // 商品id
    name: string,   // 商品名称
    picture: string, // 商品图片
    count: number,  // 购买数量
    totalPrice: number, // 总价
    paymentMethod: string,  // 支付方式
    address: string,    // 收获地址
    status: string, // 订单状态
    generateDate:string // 订单生成日期
}