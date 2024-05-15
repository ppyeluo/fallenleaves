<template>
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

<script setup lang='ts'>
import { reqHotBuy } from '@/api/commodity';
import { Commodity, Result } from '@/api/commodity/type';
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()


let hotBuyList = ref<Commodity[]>([])

const getHotBuy = async () => {
    const result: Result<Commodity[]> = await reqHotBuy()
    if(result.code === 200){
        hotBuyList.value = result.data
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
        padding: 20px 10px;

        h4{
            font-size: 24px;
        }
        .sub{
            padding-left: 10px;
            font-size: 14px;
            color: #909090;
        }
    }
    .content{ 
        .contentItem{
            display: flex;
            margin-bottom: 10px;

            .image{
                width: 80px;
                height: 80px;
                border-radius: 10px;
                overflow: hidden;
            }
            .info{
                position: relative;
                width: 250px;

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
                    -webkit-line-clamp: 2;
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