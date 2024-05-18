<template>
    <el-skeleton animated :loading="loading" :throttle="500">
        <template #template>
            <div class="hotRecommend">
                <div class="title">
                    <h3>热门推荐</h3>
                </div>
                <div class="content">
                    <div class="contentItem" v-for="c in 9" :key="c">
                        <div class="image">
                            <el-skeleton-item variant="image" style="width: 100%;height: 100%;" />
                        </div>
                        <div class="info">
                            <div class="name">
                                <el-skeleton-item variant="text" style="width: 100%;height: 100%;" />
                            </div>
                            <div class="flowerLanguage">
                                <el-skeleton-item variant="text" />
                            </div>
                            <div class="sell">
                                <div class="sold">
                                    <el-skeleton-item variant="text" />
                                </div>
                                <div class="price">
                                    <el-skeleton-item variant="text" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </template>
        <template #default>
            <div class="hotRecommend">
                <div class="title">
                    <h3>热门推荐</h3>
                </div>
                <div v-infinite-scroll="getHotRecommend" infinite-scroll-distance="10" infinite-scroll-delay="500" class="content">
                    <div @click="router.push(`/detail?id=${c.id}`)" class="contentItem" v-for="c in hotRecommendList" :key="c.id">
                        <div class="image">
                            <img :src="c.picture" width="100%" height="100%">
                        </div>
                        <div class="info">
                            <div class="name">
                                {{ c.name }}
                            </div>
                            <div class="flowerLanguage">
                                {{ c.flowerLanguage }}
                            </div>
                            <div class="sell">
                                <div class="sold">
                                    {{ c.comments }}条评价
                                </div>
                                <div class="price">
                                    &yen;{{ c.price }}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </template>
    </el-skeleton>
</template>

<script setup lang='ts'>
defineOptions({ name: 'HotRecommend' })
import { reqHotRecommend } from '@/api/commodity'
import type { Commodity, Result } from '@/api/commodity/type'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
const loading = ref<boolean>(true)
const router = useRouter()

// 存储要展示的推荐商品数据
let hotRecommendList = ref<Commodity[]>([])
// 展示第几页，默认第一页，随着页面滚动触底增加
let page = ref<number>(1)
const getHotRecommend = async () => {
    let result: Result<Commodity[]> = await reqHotRecommend(page.value)
    if(result.code === 200){
        hotRecommendList.value.push(...result.data)
        loading.value = false
    }
    page.value++
}
onMounted(getHotRecommend)
</script>

<style scoped lang='scss'>
.hotRecommend{
    padding-right: 4em;

    .title{
        padding: 20px 10px;

        h3{
            display: inline-block;
            font-size: 26px;
        }
    }
    
    .content{
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        
        .contentItem{
            display: flex;
            justify-content: space-between;
            padding: 0 10px 20px 0;
            overflow: hidden;
            cursor: pointer;

            .image{
                width: 130px;
                height: 130px;
                border-radius: 8px;
                overflow: hidden;
            }
            .info{
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                width: 180px;
                padding-left: 10px;

                .name{
                    padding-top: 8px;
                    color: black;
                    font-size: 15px;
                    font-weight: 450;
                }
                .flowerLanguage{    /* 文字显示两行，多余省略号代替 */
                    /* 设置文本超出容器时的隐藏和省略号显示 */
                    overflow: hidden;
                    /* 设置文本的行为 */
                    display: -webkit-box;
                    /* 设置文本的排列方向为垂直方向 */
                    -webkit-box-orient: vertical;
                    /* 设置文本显示的行数 */
                    -webkit-line-clamp: 3;
                    /* 设置超出文本的显示为省略号 */
                    text-overflow: ellipsis;
                    color: #716f6f;
                    font-size: 13px;
                }
                .sell{
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;

                    .sold{
                        font-size: 12px;
                        color: #716f6f;
                    }
                    .price{
                        color: $main-color;
                    }
                }
            }
        }
    }
}
</style>