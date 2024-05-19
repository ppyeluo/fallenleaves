<template>
    <div class="order_container">
        <NavTitle title="订单中心" />
        <section v-if="orderList.length === 0">
            <el-empty description="您的订单为空" :image-size="300"/>
        </section>
        <el-card v-else shadow="never" style="margin-bottom: 10px;">
            <div class="nav">
                <span class="active">全部订单</span>
                <span @click="undeveloped">待付款</span>
                <span @click="undeveloped">待收货</span>
                <span @click="undeveloped">待评价</span>
            </div>
            <div class="content">
                <div class="header">
                    <el-row>
                        <el-col :span="15">
                            <el-row>
                                <el-col :span="4"></el-col><el-col :span="12"></el-col>
                                <el-col :span="4">订单详情</el-col><el-col :span="4"></el-col>
                            </el-row>
                        </el-col>
                        <el-col :span="3">收货人</el-col>
                        <el-col :span="2">金额</el-col>
                        <el-col :span="2">订单状态</el-col>
                        <el-col :span="2">操作</el-col>
                    </el-row>
                </div>
                <div class="item" v-for="item in orderList">
                    <div class="top">
                        <div class="left">
                            <time>{{ item.generateDate }}</time>
                            <div class="orderId">订单号： <span>{{ item.id }}</span></div>
                        </div>
                        <div class="right">
                            <el-icon @click="deleteOrder(item.id)" class="delete"><Delete /></el-icon>
                        </div>
                    </div>
                    <div class="main">
                        <el-row>
                            <el-col :span="15" class="left">
                                <el-row>
                                    <el-col :span="4" class="image"><img :src="item.picture" width="100%"></el-col>
                                    <el-col :span="12" class="name">{{ item.name }}</el-col>
                                    <el-col :span="4" class="count">x{{ item.count }}</el-col>
                                    <el-col :span="4" class="aftermarket" @click="undeveloped">申请售后</el-col>
                                </el-row>
                            </el-col>
                            <el-col :span="3" class="receiver"><el-icon><User /></el-icon>&nbsp;云深不知处</el-col>
                            <el-col :span="2" class="price">
                                <span>&yen;{{ item.totalPrice }}</span>
                                <div class="tag">
                                    <span :class="payTheme(item.paymentMethod)">{{ item.paymentMethod }}</span>
                                </div>
                            </el-col>
                            <el-col :span="2" class="status">{{ item.status }}</el-col>
                            <el-col :span="2" class="operate" @click="undeveloped">再次购买</el-col>
                        </el-row>
                    </div>
                </div>
            </div>
        </el-card>
    </div>
</template>

<script setup lang='ts'>
import { reqOrder } from '@/api/order';
import { OrderItem } from '@/api/order/type';
import { Result } from '@/api/user/type';
import MyMessage from '@/utils/myMessage'
import { onMounted, ref } from 'vue';
import { undeveloped } from '@/utils/undeveloped';

defineOptions({ name: 'Order' })

let orderList = ref<OrderItem[]>([])
// 得到用户订单信息，进入页面调用一次
const getOrder = async () => {
    let result: Result<OrderItem[]> = await reqOrder()
    if(result.code === 200){
        orderList.value = result.data
    }
}
onMounted(getOrder)
// 删除订单
const deleteOrder = async (_id:string) => {
    if(true){
        MyMessage({
            type: 'error',
            message: '系统数据，禁止删除！'
        })
        return
    }
    // let result: Result<any> = await reqDeleteOrder(id)
    // if(result.code === 200){
    //     getOrder()
    //     MyMessage({
    //         type: 'success',
    //         message:'删除成功'
    //     })
    // }
}
// 支付方式标签主题
function payTheme(pay:string){
    if(pay == '微信支付'){
        return 'weixin'
    }else if(pay == '支付宝'){
        return 'zhifubao'
    }else if(pay == '云闪付'){
        return 'yunshanfu'
    }
}
</script>

<style scoped lang="scss">
.order_container{
    .nav{
        padding: 1em 0;

        span{
            position: relative;
            font-size: 15px;
            margin-right: 1em;
            color: black;
            cursor: pointer;

            &.active{
                color: red;
                
                &:after{
                    position: absolute;
                    content: "";
                    left: 0;
                    bottom: -5px;
                    width: 100%;
                    height: 2px;
                    background-color: red;
                }
            }
        }
    }
    .content{
        width: 95%;

        .header{
            background-color: rgb(245, 220, 226);
            font-size: 14px;
            text-align: center;
            padding: .4em 0;
            margin-bottom: .7em;
        }
        .item{
            margin-bottom: 1em;
            border-bottom: 1px solid #746363;


            .top{
                display: flex;
                justify-content: space-between;
                padding: .2em .3em;
                background-color: rgb(245, 220, 226, .7);

                .left{
                    display: flex;
                    font-size: 13px;
                    color: #746363;

                    time{
                        padding-right: 50px;
                    }
                    .orderId{
                        span{
                            color: black;
                        }
                    }
                }
                .right{
                    .delete{
                        transition: 0.4s;
                        cursor: pointer;
                        &:hover{
                            color: red;
                        }
                    }
                }
            }
            .main{
                padding: 10px;
                background-color: #fff;
                font-size: 14px;
                text-align: center;

                .left{
                    .name{
                        padding-top: 0.5em;
                        padding-left: 1em;
                        text-align: left;
                    }
                    .count{
                        padding-top: 0.5em;
                        text-align: right;
                    }
                    .aftermarket{
                        cursor: pointer;
                        transition: .4s;
                    }
                    .aftermarket:hover{
                        color: $main-color;
                    }
                }
            }
            .receiver, .price, .status, .operate{
                padding-top: 0.5em;
            }
            .receiver{
                height: 1.5em;
                display: flex;
                justify-content: center;
                align-items: center;
            }
            .price .tag{
                padding-top: .5em;
            }
            .tag {
                span{                                        
                    display: inline-block;
                    background-color: #f0f0f0;
                    color: #fff;
                    font-size: 14px;
                    border: 1px solid #cccccc;
                    font-weight: 500;
                    padding: 6px 12px;
                    border-radius: 4px;
                    cursor: default;

                    &.zhifubao{
                        background-color: rgba(0, 160, 233, 1);
                    }
                    &.weixin{
                        background-color: rgba(0, 187, 41, 1);
                    }
                    &.yunshanfu{
                        background-color: rgba(0, 95, 170, 1);
                    }
                }
            }
            .operate{
                cursor: pointer;
                transition: .4s;
            }
            .operate:hover{
                color: $main-color;
            }
        }
        .item:last-child{
            border-bottom: none;
        }
    }
}
</style>