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
                <div class="right">
                    <el-steps style="width: 500px; font-size: 16px;" :active="2" align-center>
                        <el-step title="1.我的购物车" icon="ShoppingCartFull" />
                        <el-step title="2.填写核对订单信息" icon="CircleCheck" />
                        <el-step title="3.成功提交订单" icon="Finished" />
                    </el-steps>
                </div>
            </div>
            <h3>填写并核对订单信息</h3>
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
                <div class="title">使用优惠/礼品卡/抵用</div>
                
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
</script>

<style scoped lang='scss'>
.settlement_container{
    width: 100%;

    .w{
        width: $type-area-width;
        margin: 0 auto;
        padding-top: 10px;

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