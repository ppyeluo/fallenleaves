<template>
    <el-skeleton animated :loading="loading" :throttle="500">
        <template #template>
            <div class="banner">
                <el-carousel type="card" :interval="3000" height="150px">
                    <el-carousel-item>
                        <el-skeleton-item variant="image"  style="width: 100%;height: 100%;"/>
                    </el-carousel-item>
                    <el-carousel-item>
                        <el-skeleton-item variant="image"  style="width: 100%;height: 100%;"/>
                    </el-carousel-item>
                    <el-carousel-item>
                        <el-skeleton-item variant="image"  style="width: 100%;height: 100%;"/>
                    </el-carousel-item>
                    <el-carousel-item>
                        <el-skeleton-item variant="image"  style="width: 100%;height: 100%;"/>
                    </el-carousel-item>
                </el-carousel>
            </div>
        </template>
        <template #default>
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
    </el-skeleton>
</template>

<script setup lang='ts'>
defineOptions({name: 'Banner'})
import { ref } from 'vue';

const loading = ref<boolean>(true)
setTimeout(() => {
    loading.value = false
}, 1000);
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