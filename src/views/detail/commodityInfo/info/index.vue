<template>
    <div class="info_container">
        <div class="item">
            <div class="title">商品名称</div><div>：</div>
            <div class="content">{{ commodityDetail?.name }}</div>
        </div>
        <div class="item rate">
            <div class="title">评分</div><div>：</div>
            <div class="content">
                <el-rate
                    :model-value="commodityDetail!.score"
                    disabled
                    show-score
                    size="small"
                    text-color="#ff9900"
                    score-template="{value}分"
                />
            </div>
        </div>
        <div class="item" v-if="commodityDetail?.desc">
            <div class="title">描述</div><div>：</div>
            <div class="content">{{ commodityDetail?.desc }}</div>
        </div>
        <div class="item flowerLanguage" v-if="commodityDetail?.flowerLanguage">
            <div class="title">花语</div><div>：</div>
            <div class="content">{{ commodityDetail?.flowerLanguage }}</div>
        </div>
        <div class="item">
            <div class="title">鲜花主材</div><div>：</div>
            <div class="content">{{ commodityDetail?.materials }}</div>
        </div>
        <div class="item">
            <div class="title">型号</div><div>：</div>
            <div class="content"><span style="font-size: .8em;color: #808080; margin-right: .2em;">直径</span>{{ commodityDetail?.size }}<span style="font-size: .8em;color: #808080; margin-left: .2em;">cm</span></div>
        </div>
        <div class="item">
            <div class="title">库存</div><div>：</div>
            <div class="content">{{ commodityDetail?.bank }}<span style="font-size: .8em;color: #808080; margin-left: .2em;">件</span></div>
        </div>
        <div class="item">
            <div class="title">已售</div><div>：</div>
            <div class="content">{{ commodityDetail?.sold }}<span style="font-size: .8em;color: #808080; margin-left: .2em;">件</span></div>
        </div>
        <div class="item">
            <div class="title">数量</div><div>：</div>
            <div class="content">
                <el-input-number v-model="count" size="small" :min="1" :max="commodityDetail?.bank" />
            </div>
        </div>
        <div class="item price">
            <div class="title">单价</div><div>：</div>
            <div class="content">&yen; {{ commodityDetail?.price }}</div>
        </div>
        <div class="operate">
            <button class="btn btn_cost" @click="gotoBuy"><span>购买</span></button>
            <button class="btn btn_cart" @click="addCart"><span>加入购物车</span></button>
            <el-tooltip content="收藏商品" effect="light">
                <el-icon @click="addCollect" size="20"><Star /></el-icon>
            </el-tooltip>
        </div>
    </div>
</template>

<script setup lang='ts'>
defineOptions({ name: 'Info' })
import { reqAddCart } from '@/api/cart';
import { reqAddCollect } from '@/api/collect';
import type { addCollect } from '@/api/collect/type';
import type { Commodity } from '@/api/commodity/type'
import { Result } from '@/api/user/type';
import useUserStore from '@/store/modules/user';
import MyMessage from '@/utils/myMessage'
import { ref } from 'vue';
import { Ref, inject } from 'vue'
import { useRouter } from 'vue-router';

const router = useRouter()
const userStore = useUserStore()
const commodityDetail = inject<Ref<Commodity>>('commodityDetail')
// 商品数量，默认为1件
let count = ref<number>(1)
// 购买商品
const gotoBuy = () => {
    const data = [
        {
            id: commodityDetail?.value.id,
            count:count.value
        }
    ]
    router.push({path:'/settelment', query:{ data: JSON.stringify(data) }})
}
// 将商品加入购物车
const addCart = async () => {
    if(!userStore.token){
        MyMessage({
            type: 'warning',
            message: '请登录后再试！'
        })
        return
    }
    let result: Result<any> = await reqAddCart({
        id: commodityDetail!.value.id,
        count: count.value
    })
    if(result.code === 200){
        MyMessage({
            type: 'success',
            message: '加入购物车成功！'
        })
    }
}
// 将商品加入收藏
const addCollect = async () => {
    if(!userStore.token){
        MyMessage({
            type: 'warning',
            message: '请登录后再试！'
        })
        return
    }
    let result: Result<addCollect> = await reqAddCollect(commodityDetail!.value.id)
    if(result.data.isSuccess){
        MyMessage({
            type: 'success',
            message: '收藏成功！'
        })
    }else{
        MyMessage({
            type: 'warning',
            message: '商品已经收藏过了！'
        })
    }
}
</script>

<style scoped lang='scss'>
.info_container{
    padding-left: 1em;

    .item{
        display: flex;
        margin-top: .8em;
        align-items: baseline;

        .title{
            width: 4.2em;
            font-size: 16px;
            color: #808080;
            text-align: justify;
            text-align-last: justify;
            white-space: nowrap;
        }

        &.rate{
            align-items: flex-end;
        }

        &.flowerLanguage .content{
            position: relative;
            padding: 10px;
            overflow: hidden;
            background: 
                linear-gradient(to left, transparent -100px,#f6eef0 300px),
                linear-gradient(to right bottom, #D2EEF9 ,#f6eef0, #FFD1DE, #f39eb3);
            border-radius: 10px;
            overflow: hidden;
        }
        &.price{
            padding-top: .5em;
            padding-bottom: .5em;

            .content{
                font-size: 1.1em;
                color: #ff6b6b;
                font-weight: 600;
            }
        }
    }
    .operate{
        display: flex;
        align-items: center;
        padding-top: 1em;

        .btn {
            position: relative;
            display: inline-block;
            color: #fff;
            border-radius: 5px;
            padding: 0.5em 1.2em;
            font-weight: 500;
            background: transparent;
            cursor: pointer;
            transition: all 0.3s ease;
            box-shadow:inset 2px 2px 2px 0px rgba(255,255,255,.5),
            7px 7px 20px 0px rgba(0,0,0,.1),
            4px 4px 5px 0px rgba(0,0,0,.1);
            outline: none;
        }

        .btn_cost, .btn_cart {
            background: linear-gradient(to right, #f39eb3, #ffb3c1);
            color: #fff;
            border: none;
            border-radius: 16px;
            padding: 12px 24px;
            font-size: 16px;
            font-weight: bold;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            transition: transform 0.3s, box-shadow 0.3s;
            margin-right: .8em;
        }
        .btn_cost:hover, .btn_cart:hover{     
            background: linear-gradient(to right, #e980a0, #ff9aae);
            transform: translateY(-2px);
            box-shadow: 0 8px 12px rgba(0, 0, 0, 0.15);
        }
    }
}
</style>