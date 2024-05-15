<template>
    <div class="navTitle_container">
        <el-popover
            placement="bottom-start"
            trigger="hover"
        >
            <template #reference>
                <el-icon class="icon" @click="router.back"><DArrowLeft /></el-icon>
            </template>
            <div class="title">点击回退到上一页</div>
        </el-popover>
        <span class="title">{{ title ? title : route.meta.title }}</span>
    </div>
</template>

<script setup lang='ts'>
import { useRoute, useRouter } from 'vue-router'
const route = useRoute()
const router = useRouter()
defineProps({
    title: {
        type: String,
        default: ''
    }
})
</script>

<style scoped lang='scss'>
.navTitle_container{
    height: $nav-title-height;
    display: flex;
    align-items: center;
    font-size: 14px;
    padding-bottom: 1.5em;

    .icon:hover{
        color: red;
    }
    .title{
        padding-left: .3em;
    }
}
</style>