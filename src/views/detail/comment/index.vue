<template>
    <div class="comment_container">
        <div class="title">
            <h3>商品评论</h3>
            <div class="menu">
                <span @click="switchList(commentList, 1)" :class="{'active': activeDisplay === 1}">全部评价({{ commentList.length }})</span>
                <span @click="switchList(topList, 2)" :class="{'active': activeDisplay === 2}">好评({{ topList.length }})</span>
                <span @click="switchList(middleList, 3)" :class="{'active': activeDisplay === 3}">中评({{ middleList.length }})</span>
                <span @click="switchList(bottomList, 4)" :class="{'active': activeDisplay === 4}">差评({{ bottomList.length }})</span>
            </div>
        </div>
        <section v-if="displayList.length === 0">
            <el-empty description="评论为空" :image-size="200"/>
        </section>
        <div v-else class="content">
            <div class="itemSet">
                <div class="item" v-for="i in displayList">
                    <div class="personal">
                        <div class="baseInfo">
                            <el-avatar :size="50" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
                            <span class="username">云深不知处</span>
                        </div>
                        <div class="memberTag"><el-tag type="success">Plus会员</el-tag></div>
                    </div>
                    <div class="comment">
                        <div class="rate">
                            <el-rate v-model="i.rating" 
                            disabled
                            allow-half
                            />
                            <span>{{ i.rating }}分</span>
                        </div>
                        <div class="text">
                            {{ i.content }}
                        </div>
                        <div class="images"></div>
                        <div class="footer">
                            <el-row>
                                <el-col :span="6">{{ i.commodityName }}</el-col>
                                <el-col :span="6">2024-04-16 {{ i.ipAddress }}</el-col>
                                <el-col :span="6"></el-col>
                                <el-col :span="6" style="display: flex;justify-content: space-around;cursor: pointer;">
                                    <span class="jubao" @click="undeveloped">举报</span>
                                    <span class="dianzan" @click="undeveloped">点赞({{ i.likesCount }})</span>
                                    <span class="huifu" @click="undeveloped">回复({{ i.repliesCount }})</span>
                                </el-col>
                            </el-row>
                        </div>
                    </div>
                </div>
            </div>
            <div class="fenye">
                <el-pagination layout="prev, pager, next" :total="displayList.length" />
            </div>
        </div>
    </div>
</template>

<script setup lang='ts'>
import { reqCommodityComments } from '@/api/commodity'
import { CommodityComment } from '@/api/commodity/type';
import { Result } from '@/api/user/type';
import { ref, onMounted, computed } from 'vue';
import { undeveloped } from '@/utils/undeveloped.ts'

// 全部评论
let commentList = ref<CommodityComment[]>([])
// 当前展示的评论
let displayList = ref<CommodityComment[]>([])
// 当前展示评论（控制样式）
let activeDisplay = ref<number>(1)
// 好评
let topList = computed(() => commentList.value.filter(i => i.rating > 4))
// 中评
let middleList = computed(() => commentList.value.filter(i => (i.rating <= 4) && (i.rating > 3)))
// 差评
let bottomList = computed(() => commentList.value.filter(i => i.rating <= 3))
// 得到全部评论
const getComments = async () => {
    let result: Result<CommodityComment[]> = await reqCommodityComments('10570')
    if(result.code === 200){
        commentList.value = result.data
        displayList.value = commentList.value
    }
}
// 切换评论展示
function switchList(list: CommodityComment[], active:number){
    displayList.value = list
    activeDisplay.value = active
}
onMounted(getComments)
</script>

<style scoped lang='scss'>
.comment_container{
    margin-top: 1em;
    .title{

        h3{
            font-size: 20px;
            margin-bottom: 10px;
        }
        .menu{
            font-size: 14px;
            span{
                display: inline-block;
                padding-right: 10px;
                cursor: pointer;
            }
            .active{
                color: red;
            }
        }
    }
    .content{
        position: relative;

        .item{
            display: flex;
            padding: 10px 0;
            border-bottom: 1px solid cyan;

            .personal{
                font-size: 14px;

                .baseInfo{
                    display: flex;
                    align-items: center;

                    .username{
                        width: 100px;
                        padding-left: 7px;
                    }
                }
                .memberTag{
                    margin: 6px 0 0 10px;
                }
            }
            .comment{
                width: 100%;

                .rate{
                    display: flex;
                    align-items: center;
                    font-size: 12px;
                    color: rgb(205, 153, 34);
                }
                .text{
                    padding: 5px 0;
                    font-size: 14px;
                }
                .footer{
                    margin-top: 10px;
                    font-size: 12px;
                    
                    .jubao:hover{
                        color: red;
                    }
                    .dianzan:hover{
                        color: skyblue;
                    }
                    .huifu:hover{
                        color: green;
                    }
                }
            }
        }
        .fenye{
            position: absolute;
            bottom: -60px;
            right: 0;
        }
    }
    .item:last-child{
        border-bottom: none;
    }
}
</style>