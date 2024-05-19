<template>
    <header class="myHeader">
        <div class="w">
            <div class="left">
                <el-tooltip
                    effect="light"
                    content="回到首页"
                    palcement="bottom-start"
                >
                    <span class="item" @click="router.push('/')"><el-icon><HomeFilled /></el-icon><span>首页</span></span>
                </el-tooltip>
                <span class="item"><el-icon><Location /></el-icon><span>上海</span></span>
            </div>
            <div class="right">
                <span class="item" @click="undeveloped"><el-icon><PhoneFilled /></el-icon><span>客服服务</span></span>
            </div>
        </div>
    </header>
</template>

<script setup lang='ts'>
defineOptions({ name: 'Header' })
import { useRouter } from 'vue-router';
import { undeveloped } from '@/utils/undeveloped';

const router = useRouter()
</script>

<style scoped lang='scss'>
.myHeader{
    width: 100%;
    background-color: $type-area-background-color;

    .w{
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: $type-area-width;
        height: 100%;
        margin: 0 auto;
        font-size: 14px;
        padding: .4em 1em .4em 1em;
        color: #232121;
        .left{
            display: flex;
            .item{
                display: flex;
                align-items: center;
                padding-right: .5em;
                cursor: pointer;
                span{
                    padding-left: .2em;
                }
            }
        }
        .right{
            display: flex;
            .item{
                display: flex;
                align-items: center;
                padding-left: .5em;
                cursor: pointer;
                span{
                    padding-left: .2em;
                }
            }
        }
    }
}
</style>