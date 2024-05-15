import { reqCommodityType } from "@/api/commodity"
import { CommodityType, Result } from "@/api/commodity/type"
import { defineStore } from "pinia"
import { ref } from "vue"

const useCommodityStore = defineStore('commodity', () => {
    // 商品类别
    const type = ref<CommodityType[]>([])

    const getType = async () => {
        const result: Result<CommodityType[]> = await reqCommodityType()
        type.value = result.data
    }

    return {
        type, getType
    }
})

export default useCommodityStore