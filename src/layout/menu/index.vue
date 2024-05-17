<template>
    <ul class="menu">
        <template v-for="item in layout" :key="item.path">
            <li v-if="!item.meta?.hidden"
            :class="{ active: route.path === item.path }"
            @click="router.push(item.path)">
                <div class="icon"><el-icon size="18px"><component :is="item.meta!.icon"></component></el-icon></div>
                <span>{{ item.meta!.title }}</span>
            </li>
        </template>
    </ul>
</template>

<script setup lang='ts'>
defineOptions({ name: 'Menu' })
import routes from '@/router/routes'
import type { RouteRecordRaw } from "vue-router"
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const layout:RouteRecordRaw[]| undefined  = routes.find(item => item.meta.layout)!.children
</script>

<style scoped lang='scss'>
.menu{
    padding-top: 20px;
    padding-left: 15px;

    li{
        display: flex;
        align-items: center;
        padding: 10px 16px;
        margin-top: 2px;
        color: black;
        border-radius: 8px;
        text-align: left;
        cursor: pointer;

        .icon{
            display: flex;
            justify-content: center;
            align-items: center;
            width: 32px;
            height: 32px;
            margin-right: 10px;
            border-radius: 6px;
            box-shadow: 0 4px 6px rgb(0 0 0 / 5%);
        }

        &.active{
            color: $main-color;
            background-color: #fff;

            .icon{
                color: #fff;
                background-color: $main-color;
            }
        }
    }
}
</style>