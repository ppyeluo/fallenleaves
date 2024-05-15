<template>
    <header class="myHeader">
        <div class="w">
            <div class="left">
                <span>首页</span>
                <span>上海</span>
            </div>
            <div class="right">
                <span>叶落飘飘</span>
                <span>客户服务</span>
            </div>
        </div>
    </header>
</template>

<script setup lang='ts'>
defineOptions({ name: 'Header' })
</script>

<style scoped lang='scss'>
.myHeader{
    width: 100%;
    height: 40px;
    background-color: $type-area-background-color;

    .w{
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: $type-area-width;
        height: 100%;
        margin: 0 auto;
    }
}
</style>