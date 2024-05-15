import request from "@/utils/request"
import { CommodityCategory, HotSaleCommodity, HotSearchKeywords, Result } from "./type"

enum API {
    // 得到所有花的分类名称和库存
    COMMODITYCATEGORY_URL = '/api/getCommodityCategroy',
    // 得到热搜关键词和搜索次数
    HOTSEARCHKEYWORDS_URL = '/api/getHotSearchKeywords',
    // 得到热门销售数据
    HOTSALECOMMODITY_URL = '/api/getHotSaleCommodity',
}
// 得到所有花的分类名称和库存
export const reqCommodityCategory = () => request.get<any, Result<CommodityCategory[]>>(API.COMMODITYCATEGORY_URL)
// 得到热搜关键词和搜索次数
export const reqHotSearchKeywords = () => request.get<any, Result<HotSearchKeywords[]>>(API.HOTSEARCHKEYWORDS_URL)
// 得到热门销售数据
export const reqHotSaleCommodity = () => request.get<any, Result<HotSaleCommodity[]>>(API.HOTSALECOMMODITY_URL)