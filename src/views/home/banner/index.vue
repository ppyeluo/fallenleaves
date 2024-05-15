<template>
    <div class="banner">
        <el-carousel type="card" :interval="3000" height="150px">
            <el-carousel-item>
                <img src="@/assets/images/banner/banner_01.jpg" style="width: 100%;height: 100%;">
            </el-carousel-item>
            <el-carousel-item>
                <img src="@/assets/images/banner/banner_02.jpg" style="width: 100%;height: 100%;">
            </el-carousel-item>
            <el-carousel-item>
                <img src="@/assets/images/banner/banner_03.jpg" style="width: 100%;height: 100%;">
            </el-carousel-item>
            <el-carousel-item>
                <img src="@/assets/images/banner/banner_04.jpg" style="width: 100%;height: 100%;">
            </el-carousel-item>
        </el-carousel>
    </div>
</template>

<script setup lang='ts'>

</script>

<style scoped lang='scss'>
.banner{
    width: 96%;
    padding: 0 2%;
    margin-top: 1em;
    margin-bottom: 1em;

    .el-carousel__item{
        border-radius: 10px;
    }
}
</style>