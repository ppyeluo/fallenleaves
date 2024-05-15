import request from "@/utils/request";
import { Result, OrderItem } from "./type";

enum API {
    // 得到用户的所有订单
    ORDER_URL = '/api/allOrders',
    // 删除订单
    DETLETEODTRDER_URL = '/api/deleteOrder/'
}

// 得到用户的所有订单
export const reqOrder = () => request.get<any, Result<OrderItem[]>>(API.ORDER_URL)
// 删除订单
export const reqDeleteOrder = (id:string) => request.delete<any, Result<any>>(API.DETLETEODTRDER_URL+`${id}`)