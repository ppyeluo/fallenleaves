<template>
    <div class="consignee_container">
        <div class="addressInfo">
            <div class="info">
                <el-badge value="√" class="item" badge-style="width:1em;height:1em;">
                    <div class="summarize active">张涛 河北</div>
                </el-badge>
                <div class="detail" style="padding-right: 2em;">张涛 河北 衡水市 阜城县 古城镇 马赵村289号 150****1092</div>
                <el-tag type="info">默认地址</el-tag>
            </div>
            <div class="operate">
                <span>设为默认地址</span>
                <span>编辑</span>
            </div>
        </div>
        <template v-if="isExpand">
            <div class="addressInfo" v-for="_i in 3">
                <div class="info">
                    <div class="summarize">张涛 河北</div>
                    <div class="detail">张涛 河北 衡水市 阜城县 古城镇 马赵村289号 150****1092</div>
                </div>
                <div class="operate">
                    <span>设为默认地址</span>
                    <span>编辑</span>
                    <span>删除</span>
                </div>
            </div>
        </template>
        <div class="expand">
            <span v-if="isExpand" @click="isExpand = !isExpand">收起地址<el-icon style="padding-left: 0.3em;"><ArrowUp /></el-icon></span>
            <span v-else @click="isExpand = !isExpand">更多地址<el-icon style="padding-left: 0.3em;"><ArrowDown /></el-icon></span>
        </div>
    </div>
</template>

<script setup lang='ts'>
import { ref } from 'vue';

defineOptions({ name: 'Consignee' })

let isExpand = ref<boolean>(false)
</script>

<style scoped lang='scss'>
.consignee_container{
    padding-left: 2em;
    .addressInfo{
        display: flex;
        justify-content: space-between;
        margin-bottom: 0.8em;
        font-size: 12px;

        .info{
            display: flex;

            .summarize{
                position: relative;
                padding: 0.3em 2em;
                border: 1px solid rgb(221, 221, 221);

                &.active{
                    border: 1px solid #ff4614;
                }
            }
            
            .detail{
                padding: 0.3em 0;
                padding-left: 1em;
            }
        }
        .operate{
            display: none;
            padding: 0.3em 0;
            
            span{
                padding-right: 0.5em;
                
                color: rgb(66, 176, 235);
            }
        }

        &:hover{
            background-color: cyan;
            .summarize{
                background-color: #fff;
                border: 1px solid #ff4614;
            }

            .operate{
                display: block;
            }
        }
    }
    .expand{
        font-size: 14px;
        padding-top: 0.6em;
        
        span{
            display: flex;
            align-items: center;
        }
    }
}
</style>