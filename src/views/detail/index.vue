<template>
    <NavTitle :title="commodityDetail.name" />
    <CommodityInfo />
    <section style="padding: 0 10px;">
        <el-row :gutter="20">
            <el-col :span="16"><Comment /></el-col>
            <el-col :span="8"><Recommend /></el-col>
        </el-row>
    </section>
</template>

<script setup lang='ts'>
defineOptions({ name: 'Detail' })
import CommodityInfo from './commodityInfo/index.vue'
import Comment from './comment/index.vue'
import Recommend from './recommend/index.vue'
import { onMounted, provide, readonly, ref } from 'vue';
import type { Result, Commodity } from '@/api/commodity/type';
import { reqCommodity } from '@/api/commodity';
import { useRoute } from 'vue-router'

const route = useRoute()
const commodityDetail = ref<Commodity>({} as Commodity)
provide('commodityDetail', readonly(commodityDetail))

onMounted(async () => {
    const { id } = route.query
    let res: Result<Commodity> = await reqCommodity(id as string)
    commodityDetail.value = res.data
})
// 页面滚动到顶部
window.scrollTo({
    top: 0,
    behavior: 'smooth'
})
</script>

<style scoped lang='scss'>

</style>