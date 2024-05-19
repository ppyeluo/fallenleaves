<template>
    <div class="customized_container">
        <NavTitle title="私人定制" />
        <el-row>
            <!-- 热销榜 -->
            <el-col :span="12"><div class="hot_sold"><HotSold /></div></el-col>
            <el-col :span="12">
                <!-- 搜索热词 -->
                <div class="sold_ranking"><SoldRanking /></div>
                <div class="commodity_category"><CommodityCategory /></div>
            </el-col>
        </el-row>
    </div>
</template>

<script setup lang='ts'>
defineOptions({ name: 'Customized' })
import CommodityCategory from './commodityCategory/index.vue'
import SoldRanking from './soldRanking/index.vue'
import HotSold from './hotSale/index.vue'
</script>

<style scoped lang="scss">
.customized_container{
    background-color: #6B5B95;
    margin-bottom: 1em;

    .hot_sold{
        padding-top: 1em;
        padding-left: 1em;
        width: 100%;
        height: 100%;
        background-color: rgba(107, 91, 149, .3);
        backdrop-filter: blur(50px);
    }
    .sold_ranking{
        padding-top: 1em;
        padding-left: 1em;
        width: 100%;
        background-color: rgba(255, 140, 0, .7);
        backdrop-filter: blur(50px);
    }
    .commodity_category{
        padding-top: 1em;
        padding-left: 1em;
        width: 100%;
        background-color: rgba(0, 255, 255, .3);
        backdrop-filter: blur(50px);
    }
}
</style>