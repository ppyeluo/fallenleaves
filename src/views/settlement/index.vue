<template>
    <!-- 结算页面 -->
    <div class="settlement_container">
        <MyHeader />
        <div class="w">
            <div class="steps">
                <div class="left">
                    <div class="logo"><img src="@/assets/images/logo.png" width="100%"></div>
                    <div class="word">结算页</div>
                </div>
                <div class="right" style="background-color: #fff; padding: 1em;border-radius: 1em;">
                    <el-steps style="width: 500px; font-size: 16px;" :active="2" align-center>
                        <el-step title="1.我的购物车" icon="ShoppingCartFull" />
                        <el-step title="2.填写核对订单信息" icon="CircleCheck" />
                        <el-step title="3.成功提交订单" icon="Finished" />
                    </el-steps>
                </div>
            </div>
            <h3 style="padding: .7em 0;">填写并核对订单信息</h3>
            <div class="card">
                <div class="title">收货人信息</div>
                <ConsigneeInfo />
            </div>
            <div class="card">
                <div class="title">支付方式</div>
                <PaymentMethod />
            </div>
            <div class="card">
                <div class="title">送货清单</div>
                <DeliveryList />
            </div>
            <div class="card">
                <div class="title">
                    <span>发票信息</span>
                    <span class="pop"><el-icon><Key /></el-icon>开企业抬头发票须填写纳税人识别号，以免影响报销</span>
                </div>
                <Invoice />
            </div>
            <div class="card">
                <div class="title"><el-icon><Promotion /></el-icon><span style="padding-left: .4em;">使用优惠/礼品卡/抵用</span></div>
                <span style="color: #808080; font-size: .8em;">暂无可用优惠券</span>
            </div>
            <TotalFooter />
        </div>
        <MyFooter />
    </div>
</template>

<script setup lang='ts'>
defineOptions({ name: 'Settlement' })
import ConsigneeInfo from './consigneeInfo/index.vue'
import PaymentMethod from './paymentMethod/index.vue'
import DeliveryList from './deliveryList/index.vue'
import Invoice from './invoice/index.vue'
import TotalFooter from './totalFooter/index.vue'
import { Commodity, Settlement } from '@/api/commodity/type';
import { onMounted, provide, readonly, ref } from 'vue';
import { useRoute } from 'vue-router'
import { Result } from '@/api/user/type';
import { reqCommodity } from '@/api/commodity';

const route = useRoute()

const commodityList = ref<Settlement[]>([] as Settlement[])
provide('commodityList', readonly(commodityList))

onMounted(async () => {
    const data = JSON.parse(route.query.data as string)
    for(let i = 0; i < data.length; i++){
        let res: Result<Commodity> = await reqCommodity(data[i].id as string)
        commodityList.value = [...commodityList.value, Object.assign(res.data, { count: data[i].count })]
    }
})
</script>

<style scoped lang='scss'>
.settlement_container{
    width: 100%;
    background: $background;

    .w{
        width: $type-area-width;
        margin: 0 auto;
        padding-top: 10px;
        margin-bottom: 10px;

        .steps{
            display: flex;
            justify-content: space-between;
            align-items: center;
            .left{
                display: flex;
                align-items: center;
                .logo{
                    width: 150px;
                }
                .word{
                    padding-left: 30px;
                    font-size: 20px;
                }
            }
        }
        h3{
            font-size: 16px;
            margin-bottom: 10px;
        }
        .card{
            border: 1px solid rgb(221, 221, 221);
            padding: 1em;

            .title{
                display: flex;
                align-items: center;
                padding-bottom: 1em;
            }
            .pop{
                position: relative;
                margin-left: 1em;
                display: flex;
                align-items: center;
                font-size: 12px;
                border: 1px solid rgb(221, 221, 221);
                padding: 0.2em 1em;
                padding-left: 0.5em;

                &::after{
                    position: absolute;
                    top: 0.35em;
                    left: -0.35em;
                    content: '';
                    display: block;
                    width: 0.5em;
                    height: 0.5em;
                    background-color: #fff;
                    border: 1px solid rgb(221, 221, 221);
                    border-top: none;
                    border-right: none;
                    transform: rotate(45deg);
                }
            }
        }
    }
}
</style>