<template>
    <div class="pay_container">
        <MyHeader />
        <div class="w">
            <div class="top">
                <div class="logo"><img src="@/assets/images/logo.png" width="100%"></div>
                <div class="word">结算页</div>
            </div>
            <section class="middle">
                <div class="left">订单提交成功，请尽快支付！订单号：291872792254</div>
                <div class="right"><span>应付金额：</span><span>1289.00</span>元</div>
            </section>
            <el-card>

            </el-card>
        </div>
    </div>
</template>

<script setup lang='ts'>

</script>

<style scoped lang='scss'>
.pay_container{
    
    .w{
        width: $type-area-width;
        margin: 0 auto;
        .top{
            display: flex;
            align-items: center;

            .logo{
                width: 140px;
            }
            .word{
                padding-left: 1em;
            }
        }
        .middle{
            padding: 1em 0;
            display: flex;
            justify-content: space-between;
        }
    }
}
</style>