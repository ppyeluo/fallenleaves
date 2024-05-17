import request from "@/utils/request"
import type { Result, addCartData, cartItem, batchRemoveCartData } from "./type"

enum API {
    // 获取用户购物车内的详细信息
    CART_URL = '/api/cart',
    // 商品加入购物车
    ADDCART_URL = '/api/addCart',
    // 从购物车中删除商品
    REMOVECART_URL = '/api/removeCart',
    // 批量删除购物车中的商品
    BATCHREMOVECART_URL = '/api/batchRemoveCart',
}

// 获取用户购物车内的详细信息
export const reqCart = () => request.get<any,Result<cartItem[]>>(API.CART_URL)
// 商品加入购物车
export const reqAddCart = (data:addCartData) => request.post<any, Result<any>>(API.ADDCART_URL, data)
// 从购物车中删除商品
export const reqRemoveCart = (data:addCartData) => request.delete<any, Result<any>>(API.REMOVECART_URL, {data})
// 批量删除购物车中的商品
export const reqBatchRemoveCart = (data:batchRemoveCartData) => request.delete<any, Result<any>>(API.BATCHREMOVECART_URL, {data})