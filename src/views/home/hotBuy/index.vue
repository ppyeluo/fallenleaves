<template>
    <el-skeleton animated :loading="loading" :throttle="500">
        <template #template>
            <div class="hotBuy_container">
                <div class="title">
                    <h4>热门购买</h4>
                    <time class="sub"><el-skeleton-item variant="text" /></time>
                </div>
                <div class="content">
                    <div class="contentItem" v-for="item in 5" :key="item">
                        <div class="image">
                            <el-skeleton-item variant="image" style=" width:100%;height:100%"/>
                        </div>
                        <div class="info">
                            <div class="name"><el-skeleton-item variant="text" /></div>
                            <div class="flowerLanguage"><el-skeleton-item variant="text" /></div>
                            <div class="sold"><el-skeleton-item variant="text" /></div>
                        </div>
                    </div>
                </div>
            </div>
        </template>
        <template #default>
            <div class="hotBuy_container">
                <div class="title">
                    <h4>热门购买</h4>
                    <time class="sub">最近更新：{{ getCurrentTime() }}</time>
                </div>
                <div class="content">
                    <div @click="router.push(`/detail?id=${item.id}`)" class="contentItem" v-for="item in hotBuyList" :key="item.id">
                        <div class="image">
                            <img :src="item.picture" width="100%" height="100%">
                        </div>
                        <div class="info">
                            <div class="name">{{ item.name }}</div>
                            <div class="flowerLanguage">{{ item.flowerLanguage }}</div>
                            <div class="sold">已售{{ item.sold }}</div>
                        </div>
                    </div>
                </div>
            </div>
        </template>
    </el-skeleton>
</template>

<script setup lang='ts'>
import { reqHotBuy } from '@/api/commodity';
import { Commodity, Result } from '@/api/commodity/type';
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const loading = ref<boolean>(true)

let hotBuyList = ref<Commodity[]>([])

const getHotBuy = async () => {
    const result: Result<Commodity[]> = await reqHotBuy()
    if(result.code === 200){
        hotBuyList.value = result.data
        loading.value = false
    }
}
// 得到实时时间
function getCurrentTime(){
    const now = new Date()
    const month = String(now.getMonth() + 1).padStart(2, '0')
    const day = String(now.getDate()).padStart(2, '0')
    const hours = String(now.getHours()).padStart(2, '0')
    const minutes = String(now.getMinutes()).padStart(2, '0')
    return `${month}月${day}日 ${hours}:${minutes}`
}
onMounted(getHotBuy)
</script>

<style scoped lang='scss'>
.hotBuy_container{
    
    .title{
        display: flex;
        align-items: flex-end;
        padding: 1.2em .8em;

        h4{
            font-size: 1.4em;
        }
        .sub{
            padding-left: 10px;
            font-size: 14px;
            color: #909090;
        }
    }
    .content{ 
        display: grid;
        grid-template-columns: repeat(1, 1fr); /* 1列网格布局 */
        grid-template-rows: repeat(5, 1fr); /* 5行网格布局 */
        gap: 8px; /* 网格项之间的间隙 */
        
        .contentItem{
            display: flex;
            margin-right: 1em;

            .image{
                width: 78px;
                height: 78px;
                border-radius: 10px;
                overflow: hidden;
                flex-shrink: 0; /* 防止图片缩小 */
            }
            .info{
                position: relative;

                .name{
                    padding: 5px 0 0 10px;
                    color: balck;
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
                    -webkit-line-clamp: 1;
                    /* 设置超出文本的显示为省略号 */
                    text-overflow: ellipsis;
                    
                    padding: 4px 0 0 10px;
                    color: #716f6f;
                    font-size: 13px;
                }
                .sold{
                    position: absolute;
                    bottom: .3em;
                    padding-left: 10px;
                    font-size: 12px;
                }
            }
        }
    }
}
</style>