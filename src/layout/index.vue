<template>
    <div class="layout_container">
        <!-- 侧边栏 -->
        <DragPopWidget v-if="route.meta.dragPopWidget" />
        <div class="layout_sidebar">
            <Logo />
            <el-scrollbar class="scrollbar">
                <Menu />
            </el-scrollbar>
        </div>
        <!-- 顶部 -->
        <div class="layout_header">
            <Header />
        </div>
        <!-- 内容展示区 -->
        <div class="layout_main">
            <Main />
            <MyFooter />
        </div>
        <Login />
    </div>
</template>

<script setup lang='ts'>
import Logo from './logo/index.vue'
import Menu from './menu/index.vue'
import Header from './header/index.vue'
import Main from './main/index.vue'
import Login from './login/index.vue'
import DragPopWidget from './dragPopWidget/index.vue'
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<style scoped lang="scss">
.layout_container{
    position: relative;
    width: 100%;
    height: 100vh;
    background-color: $background-color;
    
    .layout_sidebar{
        width: $base-sidebar-width;
        height: 100vh;

        .scrollbar{
            width: 100%;
            height: calc(100vh - $base-sidebar-logo-height);
        }
    }
    .layout_header{
        position: fixed;
        width: calc(100% - $base-sidebar-width);
        height: $base-header-height;
        top: 0;
        left: $base-sidebar-width;
    }
    .layout_main{
        position: absolute;
        top: $base-header-height;
        left: $base-sidebar-width;
        width: calc(100% - $base-sidebar-width);
        height: calc(100% - $base-header-height);
        overflow: auto;
    }
}
</style>