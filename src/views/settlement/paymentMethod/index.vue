<template>
    <div class="paymentMethod_container">
        <el-tooltip
            class="box-item"
            effect="dark"
            content="该地区暂不支持"
            placement="bottom"
        >
            <button class="payItem" disabled style="margin-right: 1em;">货到付款</button>
        </el-tooltip>
      
        <el-badge value="√" class="item" badge-style="width:1em;height:1em;">
            <button class="payItem active">在线支付</button>
        </el-badge>
    </div>
</template>

<script setup lang='ts'>
defineOptions({ name: 'PaymentMethod' })
</script>

<style scoped lang='scss'>
.paymentMethod_container{
    display: flex;
    align-items: center;
    font-size: 13px;

    .payItem{
        position: relative;
        background-color: #fff;
        padding: 0.3em 2em;
        border: 1px solid $main-color;
        outline: none;
        cursor: pointer;

        &.active{
            border: 1px solid red;
        }

        &.active::after{
            position: absolute;
            left: 0.6em;
            content: '惠';
            color: #fff;
            background-color: $main-color;
        }
    }
}
</style>