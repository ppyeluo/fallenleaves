import request from "@/utils/request";
import { Result, CollectItem } from "./type";


enum API {
    // 获取我的收藏信息
    COLLECT_URL = '/api/collect',
    // 向我的收藏中添加商品
    ADDCOLLECT_URL = '/api/addCollect',
    // 某一商品取消收藏
    REMOVECOLLECT_URL = '/api/removeCollect',
}

// 获取我的收藏信息
export const reqCollect = () => request.get<any, Result<CollectItem[]>>(API.COLLECT_URL)
// 向我的收藏中添加商品
export const reqAddCollect = (id:string) => request.post<any, Result<any>>(API.ADDCOLLECT_URL,{id})
// 某一商品取消收藏
export const reqRemoveCollect = (id:string) => request.post<any, Result<any>>(API.REMOVECOLLECT_URL, {id})