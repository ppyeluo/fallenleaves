<template>
    <NavTitle :title="`搜索 - '${route.query.intent}'`" />
    <div class="search_container">     
        <el-card shadow="never" style="margin-bottom: 10px;">
            <template #default>
                <div class="option">
                    <div class="option_item">
                        <div class="o_key">分类：</div>
                        <div class="o_value">
                            <div @click="changeType('')" class="o_value_item" :class="{ 'active': !route.query.type }">全部</div>
                            <div class="o_value_item" :class="{ 'active': route.query.type === t.type }" 
                                @click="changeType(t.type)"
                                v-for="t in commodityStore.type">{{ t.typeName }}</div>
                        </div>
                    </div>
                </div>
            </template>
        </el-card>
        <el-card shadow="never">
            <template #header>
                <div class="header">
                    <div class="left">
                        <span class="hl_item" :class="{ 'active': orderActive === 'id' }" @click="changeOrder('id')">综合</span>
                        <span class="hl_item" :class="{ 'active': orderActive === 'sold' }" @click="changeOrder('sold')">销量</span>
                        <span class="hl_item" :class="{ 'active': orderActive === 'comments' }" @click="changeOrder('comments')">评论数</span>
                        <span class="hl_item" :class="{ 'active': orderActive === 'listing_time' }" @click="changeOrder('listing_time')">最新上架</span>
                        <span class="hl_item price" :class="{ 'active': orderActive === 'price' }" @click="changeOrder('price')">
                            <span class="pword">价格</span>
                            <span class="price_icon">
                                <el-icon :class="{ 'subActive': ascActive == 'desc' }"><CaretTop /></el-icon>
                                <el-icon :class="{ 'subActive': ascActive == 'asc' }"><CaretBottom /></el-icon>
                            </span>
                        </span>
                    </div>
                    <div class="right">
                        共<span>{{ total }}</span>件
                    </div>
                </div>
            </template>
            <template #default>
                <div class="main">
                    <div class="commodity">
                        <div class="c_item" v-for="i in searchCommodityList">
                            <div class="img"><img :src="i.picture" width="100%" height="100%"></div>
                            <div class="desc">
                                <el-text line-clamp="2">
                                    <span class="name" v-highlight>{{ i.name }}</span>
                                    <span class="flowerLanguage" v-highlight>{{ i.flowerLanguage }}</span>
                                </el-text>
                            </div>
                            <div class="bottom">
                                <div class="comment_count">{{ i.comments }}+评论</div>
                                <div class="price">&yen;{{ i.price }}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </template>
            <template #footer>
                <div class="footer">
                    <el-pagination
                        :default-page-size="12"
                        :page-size="searchCommodityForm.pageSize"
                        v-model:current-page="searchCommodityForm.page"
                        @current-change="getSearchCommodity"
                        layout="prev, pager, next"
                        :total="total"
                    />
                </div>
            </template>
        </el-card>
    </div>
</template>

<script setup lang='ts'>
import { reqSearchCommodity } from '@/api/commodity';
import { Commodity, SearchCommodity, SortField, SortOrder } from '@/api/commodity/type';
import { Result } from '@/api/user/type';
import useCommodityStore from '@/store/modules/commodity'
import { onMounted, reactive, ref, Directive } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute()
const router = useRouter()
const commodityStore = useCommodityStore()
onMounted(commodityStore.getType)
let searchCommodityForm: SearchCommodity = reactive({
    page:1,
    pageSize:12,
    intent:route.query.intent as string,
    type: route.query.type as string,
    sortField: 'id',
    sortOrder: 'asc'
})
// 检索出的商品列表
let searchCommodityList = ref<Commodity[]>([])
// 检索出的商品总个数
let total = ref<number>(0)
const getSearchCommodity = async () => {
    let result: Result<SearchCommodity> = await reqSearchCommodity(searchCommodityForm)
    if(result.code === 200){
        total.value = result.data.total!
        searchCommodityList.value = result.data.data!
    }
}
onMounted(getSearchCommodity)
const changeType = (type:string) => {
    router.push(`/search/?intent=${route.query.intent}&type=${type}`)
    searchCommodityForm.type = type
    getSearchCommodity()
}
// 当前显示的是按什么排序
let orderActive = ref<SortField>('id')
// 当前是顺序还是降序
let ascActive = ref<SortOrder>('desc')
const changeOrder = (sortField: SortField) => {
    orderActive.value = sortField
    searchCommodityForm.sortField = sortField
    if(sortField === 'price'){
        if(['asc', 'ASC'].includes(ascActive.value)){
            ascActive.value = 'desc'
            searchCommodityForm.sortOrder = 'desc'
        }else{            
            ascActive.value = 'asc'
            searchCommodityForm.sortOrder = 'asc'
        }
    }else{
        ascActive.value = 'asc'
        searchCommodityForm.sortOrder = 'asc'
    }
    getSearchCommodity()
}
// 自定义指令文字高亮显示
const vHighlight:Directive = {
  mounted(el) {
    const searchText = route.query.intent as string // 要搜索的文字
    const color = 'red' // 要改变的颜色
    const regex = new RegExp(searchText, 'gi')
    const html = el.innerHTML
    el.innerHTML = html.replace(regex, `<span style="color:${color}">${searchText}</span>`);
  }
}
</script>

<style scoped lang='scss'>
.search_container{
    .option{
        .option_item{
            display: flex;
            .o_key{
                width: 4em;
            }
            .o_value{
                display: flex;
                flex-wrap: wrap;

                .o_value_item{
                    padding: 0 1em;

                    &.active{
                        color: $main-color;
                    }
                }
            }
        }
    }
    .header{
        display: flex;
        justify-content: space-between;
        font-size: 15px;

        .left{
            display: flex;
            align-items: center;

            .hl_item{
                display: inline-block;
                padding: 0.3em .6em;

                &.price{
                    display: flex;
                    align-items: center;

                    .price_icon{
                        font-size: 0.5em;
                        display: flex;
                        flex-direction: column;
                        padding: 0.3em;
                    }
                }

                &.active{
                    color: $main-color;
                    border: 1px solid $main-color;
                    border-radius: .3em;

                    &.price{
                        color:black;

                        .pword{
                            color: $main-color;;
                        }
                        .subActive{
                            color: $main-color;
                        }
                    }
                }
            }
        }
        .right{
            padding-right: 3em;

            span{
                font-size: 1.2em;
                padding: 0 .3em;
                color: $main-color;
            }
        }
    }
    .main{
        .commodity{
            display: flex;
            justify-content: flex-start;
            flex-wrap: wrap;

            .c_item{
                width: calc(25% - 1em);
                padding: 1em;
                margin-right: 1em;

                .img{
                    width: 100%;
                    aspect-ratio:1;
                }
                .desc{
                    padding: .3em 0;

                    .name{
                        font-size: 16px;
                        padding-right: .7em;
                    }
                    .flowerLanguage{
                        font-size: 14px;
                        color: #a1a1a1;
                    }
                }
                .bottom{
                    display: flex;
                    justify-content: space-between;
                    font-size: 14px;
                    padding: 0 .3em;

                    .price{
                        font-size: 17px;
                        color: $main-color;
                    }
                }
            }
        }
    }
    .footer{
        display: flex;
        justify-content: flex-end;
        padding-right: 4em;
    }
}
</style>