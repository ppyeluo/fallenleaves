<template>
    <el-skeleton animated :loading="loading" :throttle="2000">
        <template #template>
            <div class="newLanuch">
                <div class="title">
                    <h3>新品上架</h3>
                    <span v-for="_i in 5"><el-skeleton-item variant="text" style="width: 2em;" /></span>
                </div>
                <div class="content">
                    <div class="contentItem" v-for="item in 6" :key="item">
                        <div class="image"><el-skeleton-item variant="image" style="width: 100%;height: 100%;" /></div>
                        <div class="info">
                            <div class="name"><el-skeleton-item variant="text" /></div>
                            <div class="flowerLanguage"><el-skeleton-item variant="text" /></div>
                            <div class="sell">
                                <time class="sold"><el-skeleton-item variant="text" /></time>
                                <div class="price"><el-skeleton-item variant="text" /></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </template>
        <template #default>
            <div class="newLanuch">
                <div class="title">
                    <h3>新品上架</h3>
                    <span :class="{ 'active': typeActive === '' }" @mouseenter="changeType('')">全部</span>
                    <span :class="{ 'active': typeActive === t.type }" @mouseenter="changeType(t.type)" v-for="t in typeList" :key="t.type">{{ t.typeName }}</span>
                </div>
                <div class="content">
                    <div @click="router.push(`/detail?id=${item.id}`)" class="contentItem" v-for="item in newLanuchList" :key="item.id">
                        <div class="image"><img :src="item.picture" width="100%" height="100%"></div>
                        <div class="info">
                            <div class="name">{{ item.name }}</div>
                            <div class="flowerLanguage">{{ item.flowerLanguage }}</div>
                            <div class="sell">
                                <time class="sold">{{ item.listing_time }}上架</time>
                                <div class="price">&yen;{{ item.price }}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </template>
    </el-skeleton>
</template>

<script setup lang='ts'>
defineOptions({ name: 'NewLanuch' })
import { reqNewLanuch } from '@/api/commodity'
import { Commodity, CommodityType, Result } from '@/api/commodity/type'
import useCommodityStore from '@/store/modules/commodity';
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const loading = ref<boolean>(true)
const router = useRouter()
const commodityStore = useCommodityStore()
let newLanuchList = ref<Commodity[]>([])
let typeList = ref<CommodityType[]>([])

const getNewLanuch = async (type:string) => {
    let result:Result<Commodity[]> = await reqNewLanuch(type)
    if(result.code === 200){
        newLanuchList.value = result.data
        loading.value = false
    }else{
        console.error('NewLanuch')
    }
}
// 当前选中type，默认全部
const typeActive = ref<string>('')
const changeType = (type:string) => {
    typeActive.value = type
    getNewLanuch(type)
}
onMounted(async () => {
    await commodityStore.getType()
    await getNewLanuch(typeActive.value)
    typeList.value = commodityStore.type.sort((a, b) => b.typeCount! - a.typeCount!).slice(0,4)
})
</script>

<style scoped lang='scss'>
.newLanuch{

    .title{
        padding: 1.2em .8em;

        h3{
            display: inline-block;
            font-size: 1.4em;
            margin-right: 10px;
        }
        span{
            position: relative;
            display: inline-block;
            font-size: 1em;
            padding: 0 .5em;
            cursor: pointer;

            &.active{
            
                &:after{
                    position: absolute;
                    content: "";
                    left: 0;
                    bottom: -5px;
                    width: 100%;
                    height: 3px;
                    background-color: $main-color;
                }
            }
        }
    }    
    .content{
        display: grid;
        grid-template-columns: repeat(2, 1fr); /* 2列网格布局 */
        grid-template-rows: repeat(3, 1fr); /* 3行网格布局 */
        gap: 1em; /* 网格项之间的间隙 */
    
        .contentItem{
            display: flex;
            justify-content: space-between;
            overflow: hidden;
            border-radius: 8px;
            cursor: pointer;

            .image{
                width: 130px;
                height: 130px;
                border-radius: 8px;
                overflow: hidden;
                flex-shrink: 0; /* 防止图片缩小 */
            }

            .info{
                position: relative;
                flex-grow: 1; /* 让信息区域占满剩余空间 */
                padding-left: .7em;

                .name{
                    position: absolute;
                    top: 8px;
                    color: black;
                    font-size: 15px;
                    font-weight: 450;
                }
                .flowerLanguage{    /* 文字显示两行，多余省略号代替 */
                    position: absolute;
                    top: 35px;
                    line-height: 1.4;
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
                    position: absolute;
                    bottom: 5px;
                    width: 100%;
                    display: flex;
                    align-items: end;
                    justify-content: space-between;

                    .sold{
                        font-size: 10px;
                        color: #716f6f;
                    }
                    .price{
                        position: absolute;
                        right: 1em;
                        color: $main-color;
                    }
                }
            }
        }
    }
    // .content{
    //     display: flex;
    //     flex-wrap: wrap;
    //     justify-content: space-between;
    
    //     .contentItem{
    //         display: flex;
    //         justify-content: space-between;
    //         padding-bottom: 1em;
    //         overflow: hidden;

    //         .image{
    //             width: 130px;
    //             height: 130px;
    //             border-radius: 8px;
    //             overflow: hidden;
    //         }
    //         .info{
    //             display: flex;
    //             flex-direction: column;
    //             justify-content: space-between;
    //             width: 220px;
    //             padding-left: 10px;

    //             .name{
    //                 padding-top: 8px;
    //                 color: black;
    //                 font-size: 15px;
    //                 font-weight: 450;
    //             }
    //             .flowerLanguage{    /* 文字显示两行，多余省略号代替 */
    //                 /* 设置文本超出容器时的隐藏和省略号显示 */
    //                 overflow: hidden;
    //                 /* 设置文本的行为 */
    //                 display: -webkit-box;
    //                 /* 设置文本的排列方向为垂直方向 */
    //                 -webkit-box-orient: vertical;
    //                 /* 设置文本显示的行数 */
    //                 -webkit-line-clamp: 3;
    //                 /* 设置超出文本的显示为省略号 */
    //                 text-overflow: ellipsis;
    //                 color: #716f6f;
    //                 font-size: 13px;
    //             }
    //             .sell{
    //                 display: flex;
    //                 flex-direction: row;
    //                 align-items: end;
    //                 justify-content: space-between;

    //                 .sold{
    //                     font-size: 10px;
    //                     color: #716f6f;
    //                 }
    //                 .price{
    //                     color: $main-color;
    //                 }
    //             }
    //         }
    //     }
    // }
}
</style>