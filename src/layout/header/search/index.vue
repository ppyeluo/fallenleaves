<template>
    <el-select style="width: 300px;height: 35px;"
        v-model="value"
        placeholder="请输入关键字进行搜索"
        filterable
        clearable
        remote
        :remote-method="getSearchResult"
        :loading="loading"
        loading-text="全力加载中"
        @keyup.enter="goSearch()">

        <div class="hotSearch" v-if="!value">
            <h5>热门搜索</h5>
            <el-option @click="goDetail(item.id)" v-for="(item, index) in hotSearchList" :key="index" :value="item.id">
                <span :class="`num${index+1}`">{{ index + 1 }}.</span>
                <span class="content">{{ item.name }}</span>
            </el-option>
        </div>
        <div v-else>
            <el-option-group v-if="searchResultList.type" label="类别">
                <el-option @click="goSearch(t.type)" v-for="t in searchResultList['type']" :value="t.type" :label="t.typeName"></el-option>
            </el-option-group>
            <el-option-group v-if="searchResultList.commodityName" label="花束">
                <el-option @click="goSearch()" v-for="c in searchResultList['commodityName']" :value="c.name" :label="c.name"></el-option>
            </el-option-group>
            <el-option-group v-if="searchResultList.flowerLanguage" label="花语">
                <el-option @click="goSearch()" v-for="c in searchResultList['flowerLanguage']" :value="c.name" :label="c.name"></el-option>
            </el-option-group>
        </div>
    </el-select>
</template>

<script setup lang='ts'>
defineOptions({ name: 'Search' })
import { reqHotSearch, reqSearch } from '@/api/commodity';
import { Commodity, Result, SearchResult } from '@/api/commodity/type';
import { onMounted, ref } from 'vue'
import { debounce } from '@/utils/debounceAndThrottle'
import { useRouter } from 'vue-router';

const router = useRouter()
// 输入框内的值
let value = ref<string>('')
let loading = ref<boolean>(false)
// 搜索下拉框默认显示热门搜索数据
let hotSearchList = ref<Commodity[]>([])
const getHotSearchList = async () => {
    let result:Result<Commodity[]> = await reqHotSearch()
    if(result.code === 200){
        hotSearchList.value = result.data
    }    
}
onMounted(getHotSearchList)
// 搜索结果列表
let searchResultList = ref<SearchResult>({})
// 得到搜索结果, 使用防抖
const getSearchResult = debounce(async (intent:string) => {      
    if(!intent) return
    value.value = intent
    loading.value = true
    const result: Result<SearchResult> = await reqSearch(intent)
    if(result.code === 200){
        searchResultList.value = result.data
    }
    loading.value = false
}, 300)
// 点击默认热门搜索的商品列表，进入对应的商品详情页
const goDetail = (id:string) => {
    router.push(`/detail?id=${id}`)
    value.value = ''
}
// 点击回车或者点击搜索出来的列表的数据进入搜索页
const goSearch = (type = '') => {
    if(value.value){
        if(type != '') value.value = ''
        router.push(`/search?intent=${value.value}&type=${type}`)
        value.value = ''
    }
}
</script>

<style scoped lang='scss'>
.hotSearch{
    
    h5{
        padding: 5px 0 5px 20px;
        font-size: 18px;
    }
    .num1{
        color: rgb(255, 0, 0);
    }
    .num2{
        color: rgb(250, 124, 125);
    }
    .num3{
        color: rgb(255, 158, 158);
    }

    .content{
        padding-left: 5px;
    }
}
</style>