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
                <div class="right"><span>应付金额：</span><span>xxx.00</span>元</div>
            </section>
            <el-card>
                测试完成，{{ time }}秒后关闭页面
            </el-card>
        </div>
    </div>
</template>

<script setup lang='ts'>
defineOptions({ name: 'Pay' })
import { ref } from 'vue';

const time = ref<number>(5)
let timer = setInterval(() => {
    time.value --
    if(time.value == 0){
        clearInterval(timer)
        window.history.back()
    }
}, 1000);
</script>

<style scoped lang='scss'>
.pay_container{
    
    .w{
        width: $type-area-width;
        margin: 0 auto;
        .top{
            display: flex;
            align-items: center;
            padding-top: .4em;

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