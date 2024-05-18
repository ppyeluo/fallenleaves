import request from "@/utils/request"
import type { Result, Commodity, CommodityType, SearchResult, SearchCommodity, CommodityComment } from './type'

enum API {
    // 得到商品的详细信息
    COMMODITYDETAILED_URL = '/api/commodity',
    // 得到最新上架的商品
    NEWLANUCH_URL = '/api/getNewLaunch',
    // 得到商品类别信息
    COMMODITYTYPE_URL = '/api/getType',
    // 得到热门购买的商品
    HOTBUY_URL = '/api/getHotBuy',
    // 得到热门推荐商品
    HOTRECOMMEND_URL = '/api/getHotRecommend/',
    // 得到热门搜索数据
    HOTSEARCH_URL = '/api/getHotSearch',
    // 搜索框得到搜索结果
    SEARCH_URL = '/api/getIntentResult',
    // 得到搜索页搜索结果
    SEARCHCOMMODITY_URL = '/api/searchCommodity',
    // 获取商品的评论
    COMMODITYCOMMENTS_URL = '/api/getCommodityComments/',
    // 给商品的评论点赞
    LIKECOMMENT_URL = '/api/likeComment'
}

// 得到商品的详细信息
export const reqCommodity = (id:string) => request.get<any,Result<Commodity>>(API.COMMODITYDETAILED_URL,{ params:{ id } })
// 得到最新上架的商品
export const reqNewLanuch = (type?:string) => request.get<any, Result<Commodity[]>>(API.NEWLANUCH_URL,{ params:{ type } })
// 得到商品类别信息
export const reqCommodityType = () => request.get<any, Result<CommodityType[]>>(API.COMMODITYTYPE_URL)
// 得到热门购买的商品
export const reqHotBuy = () => request.get<any, Result<Commodity[]>>(API.HOTBUY_URL)
// 得到热门推荐商品
export const reqHotRecommend = (page:number) => request.get<any, Result<Commodity[]>>(API.HOTRECOMMEND_URL+`${page}`)
// 得到热门搜索数据
export const reqHotSearch = () => request.get<any, Result<Commodity[]>>(API.HOTSEARCH_URL)
// 搜索框得到搜索结果
export const reqSearch = (intent:string) => request.get<any, Result<SearchResult>>(API.SEARCH_URL,{ params:{ intent } })
// 得到搜索页搜索结果
export const reqSearchCommodity = ({ page, pageSize,sortField, sortOrder, intent, type }:SearchCommodity) => request.post<any, Result<SearchCommodity>>(API.SEARCHCOMMODITY_URL, { page, pageSize,sortField, sortOrder }, { params: { intent, type } })
// 获取商品的评论
export const reqCommodityComments = (id:string) => request.get<any, Result<CommodityComment[]>>(API.COMMODITYCOMMENTS_URL+`${id}`)
// 给商品的评论点赞
export const reqLikeComment = (id:number) => request.get<any, Result<any>>(`${API.LIKECOMMENT_URL}/${id}`)