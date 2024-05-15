<template>
    <div class="picture">
        <div class="big">
            <el-image :src="commodityDetail?.picture"
             fit="cover" loading="lazy" />
        </div>
        <div class="smallSet">
            <div class="small"  v-for="i in commodityDetail?.imgUrls">
                <el-image :src="i" fit="cover" loading="lazy" />
            </div>
        </div>
    </div>
</template>

<script setup lang='ts'>
defineOptions({ name: 'Picture' })
import { Ref, inject } from 'vue'
import { Commodity } from '@/api/commodity/type'

const commodityDetail = inject<Ref<Commodity>>('commodityDetail')
</script>

<style scoped lang='scss'>
.picture{
    
    .big{
        width: 100%;
        border-radius: 10px;
        overflow: hidden;
    }
    .smallSet{
        display: flex;
        margin-top: 10px;


        .small{
            width: 70px;
            margin-right: 5px;
            border-radius: 5px;
            overflow: hidden;
        }
    }
}
</style>