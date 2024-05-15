<template>
    <NavTitle title="私人定制" />
    <div class="customized_container">
        <el-row>
            <el-col :span="12"><div class="hot_sold"><HotSold /></div></el-col>
            <el-col :span="12">
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

<style scoped>
.customized_container{
    background-color: #470024;
    margin-bottom: 1em;

    .hot_sold{
        width: 100%;
    }
}
</style>