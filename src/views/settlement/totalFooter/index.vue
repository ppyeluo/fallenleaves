<template>
    <div class="total_contailer">
        <div class="amount">
            <div class="amount_item">
                <div class="key">总商品金额：</div>
                <div class="value">&yen;{{ totalPrice?.toFixed(2) }}</div>
            </div>
            <div class="amount_item">
                <div class="key">税费：</div>
                <div class="value">&yen;0.0</div>
            </div>
            <div class="amount_item">
                <div class="key">运费：</div>
                <div class="value">&yen;0.00</div>
            </div>
            <div class="amount_item">
                <div class="key">服务费：</div>
                <div class="value">&yen;0.00</div>
            </div>
        </div>
        <div class="info">
            <div class="cost">
                <div class="costKey">应付总额：</div>
                <div class="costValue">&yen;{{ totalPrice?.toFixed(2) }}</div>
            </div>
            <div>寄送至：上海 浦东新区 曹路镇 金海路2360号上海第二工业大学(金海路校区) 收货人：叶 150****1092</div>
        </div>
        <div class="submit">
            <el-button size="large" type="primary" @click="router.push('/pay')">提交订单</el-button>
        </div>
    </div>
</template>

<script setup lang='ts'>
defineOptions({ name: 'TotalFooter' })
import { Ref, computed, inject } from 'vue'
import { Settlement } from '@/api/commodity/type'
import { useRouter } from 'vue-router'

const router = useRouter()

const commodityList = inject<Ref<Settlement[]>>('commodityList')
const totalPrice = computed(() => commodityList?.value.reduce((accumulator, currentValue) => accumulator + currentValue.count * currentValue.price , 0))
</script>

<style scoped lang='scss'>
.total_contailer{
    margin-top: 3em;
    text-align: right;
    
    .amount{
        display: flex;
        flex-direction: column;
        align-items: flex-end;

        .amount_item{
            display: flex;
            font-size: 14px;
            padding-bottom: 0.8em;

            .key{
                width: 15em;
            }
            .value{
                width: 10em;
            }
        }
    }
    .info{
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        background-color: #ede2e2;
        padding: 1em;
        font-size: 14px;

        .cost{
            position: relative;
            display: flex;
            margin-bottom: 1em;

            .costKey{
                position: absolute;
            }
            .costValue{
                width: 10em;
                text-align: right;
                color: red;
                font-size: 20px;
            }
        }
    }
    .submit{
        margin-top: 1em;
    }
}
</style>