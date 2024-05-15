<template>
    <div class="invoice_container">
        <span class="item"><span style="padding-right: 0.3em;">电子普通发票</span><el-icon color="rgb(221, 221, 221)"><WarningFilled /></el-icon></span>
        <span class="item">个人</span>
        <span class="item">商品明细</span>
        <span class="item" style="color: rgb(0, 147, 213);">修改</span>
    </div>
</template>

<script setup lang='ts'>
defineOptions({ name: 'Invoice' })
</script>

<style scoped lang='scss'>
.invoice_container{
    display: flex;

    .item{
        display: flex;
        align-items: center;
        font-size: 14px;
        padding-left: 1em;
    }
}
</style>