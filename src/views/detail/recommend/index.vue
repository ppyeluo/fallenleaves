<template>
    <div class="recommend">
        <h3 class="title">为您推荐</h3>
        <div class="content">
            <div class="item" @click="changeCommodity(i.id)" v-for="i in recommendCommodity">
                <div class="picture">
                    <el-image style="width: 100px; height: 100px;border-radius: 10px;" :src="i.picture" />
                </div>
                <div class="info">
                    <div class="name">{{ i.name }}</div>
                    <div class="flowerLanguage">
                        <el-text  line-clamp="2"> {{ i.flowerLanguage }}</el-text></div>
                    <div class="footer">
                        <div class="comments">{{ i.comments }}人评价过它</div>
                        <div class="price">&yen;{{ i.price }}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang='ts'>
import { reqHotRecommend } from '@/api/commodity';
import { Commodity } from '@/api/commodity/type';
import { Result } from '@/api/user/type';
import { onMounted, ref } from 'vue';

import { useRouter } from 'vue-router';

const router = useRouter()
// 打开新的详情页
const changeCommodity = (id:string) => {
    router.push(`/detail?id=${id}`)
    window.location.reload()
}
let recommendCommodity = ref<Commodity[]>([])
// 得到推荐列表
const getRecommendCommodity = async () => {
    let result: Result<Commodity[]> = await reqHotRecommend(1)
    if(result.code === 200){
        recommendCommodity.value = result.data.slice(0, 8)
    }
}
onMounted(getRecommendCommodity)
</script>

<style scoped lang='scss'>
.recommend{
    .title{
        font-size: 1.4em;
        margin-bottom: .6em;
    }
    .content{
        .item{
            display: flex;
            margin-bottom: 10px;
            cursor: pointer;

            .info{
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                width: 200px;
                padding-left: 10px;

                .name{
                    padding-top: 3px;
                    font-size: 15px;
                }

                .footer{
                    display: flex;
                    justify-content: space-between;
                    padding-bottom: 10px;
                    padding-right: 10px;

                    .comments{
                        font-size: 12px;
                    }
                    .price{
                        font-size: 14px;
                        color: $main-color;
                    }
                }
            }
        }
    }
}
</style>