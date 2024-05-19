<template>
    <div class="customized_container">
        <NavTitle title="私人定制" />
        <el-row>
            <!-- 热销榜 -->
            <el-col :span="12"><div class="hot_sold"><HotSold /></div></el-col>
            <el-col :span="12" style="background-color: #a0c4ff;;">
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
import MyMessage from '@/utils/myMessage';
import { onMounted } from 'vue';

onMounted(() => {
    MyMessage({
        type: 'info',
        message: '模块待开发！'
    })
})
</script>

<style scoped lang="scss">
.customized_container{
    margin-bottom: 1em;

    .hot_sold{
        padding-top: 1em;
        padding-left: 1em;
        width: 100%;
        height: 100%;
        backdrop-filter: blur(50px);
    }
    .sold_ranking{
        padding-top: 1em;
        padding-left: 1em;
        width: 300px;
        height: 200px;
        backdrop-filter: blur(50px);
    }
    .commodity_category{
        padding-top: 1em;
        padding-left: 1em;
        width: 100%;
        backdrop-filter: blur(50px);
    }
}
</style>