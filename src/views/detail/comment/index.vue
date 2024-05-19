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
                            <el-avatar :size="50" :src="i.avatar" />
                            <span class="username">{{ i.username }}</span>
                        </div>
                        <div class="memberTag" :class="memberTag(i.tag)">{{ i.tag }}</div>
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
                                <el-col :span="6">2024-04-16 <span style="color:#808080">{{ i.ipAddress }}</span></el-col>
                                <el-col :span="6"></el-col>
                                <el-col :span="6" style="display: flex;justify-content: space-around;cursor: pointer;">
                                    <span class="jubao" @click="undeveloped">举报</span>
                                    <span class="dianzan" @click="likeComment(i.id)">点赞({{ i.likesCount }})</span>
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
import { reqCommodityComments, reqLikeComment } from '@/api/commodity'
import { CommodityComment } from '@/api/commodity/type';
import { Result } from '@/api/user/type';
import { ref, onMounted, computed } from 'vue';
import { undeveloped } from '@/utils/undeveloped.ts'
import { useRoute } from 'vue-router';
import MyMessage from '@/utils/myMessage'

const route = useRoute()
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
    let result: Result<CommodityComment[]> = await reqCommodityComments(route.query.id as string)
    if(result.code === 200){
        commentList.value = result.data
        displayList.value = commentList.value
    }
}
// 给评论点赞
let flag = false
const likeComment = async (id:number) => {
    if(flag){
        MyMessage({
            type: 'warning',
            message: '您已经点过赞了！'
        })
        return
    }
    let res:Result<any> = await reqLikeComment(id)
    if(res.code == 200){
        MyMessage({
            type: 'success',
            message: '点赞成功！'
        })
        getComments()
        flag = true
    }
}
// 切换评论展示
function switchList(list: CommodityComment[], active:number){
    displayList.value = list
    activeDisplay.value = active
}
onMounted(getComments)
// 返回标签类名
const memberTag = (tag:string) => {
    if(tag == '钻石会员'){
        return 'diamond'
    } else if(tag == '黄金会员'){
        return 'gold'
    } else if(tag == '白银会员'){
        return 'silver'
    } else {
        return 'normal'
    }
}
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
                    white-space: nowrap;
                    width: fit-content;
                    border: 1px solid #000;
                    font-size: .9em;
                    padding: .2em .3em;
                    margin: 6px 0 0 10px;
                    border-radius: 5px;
                    &.normal {
                        /* 普通会员框的样式 */
                        color: white;
                        border-color: #cd7f32; /* 青铜色边框 */
                        background-color: #76828e; /* 淡蓝色背景 */
                    }

                    &.silver {
                        /* 白银会员框的样式 */
                        border-color: silver; /* 银色边框 */
                        background-color: #eaeaea; /* 淡灰色背景 */
                    }

                    &.gold {
                        /* 黄金会员框的样式 */
                        border-color: gold; /* 金色边框 */
                        background-color: #fffacd; /* 浅黄色背景 */
                    }

                    &.diamond {
                        position: relative;
                        border: 1px solid transparent; /* 无边框 */
                        background-color: #e0f7fa; /* 淡蓝色背景 */
                        overflow: hidden;
                        box-shadow: 0 0 5px rgba(0, 0, 255, 0.5), 0 0 10px rgba(0, 0, 255, 0.5), 0 0 15px rgba(0, 0, 255, 0.5);
                    }

                    &.diamond::before {
                        content: '';
                        position: absolute;
                        top: -50%;
                        left: -50%;
                        width: 200%;
                        height: 200%;
                        background: radial-gradient(circle, rgba(255,255,255,0) 20%, rgba(255,255,255,0.5) 50%, rgba(255,255,255,0) 80%);
                        animation: shine 3s linear infinite;
                    }

                    @keyframes shine {
                        0% {
                            transform: rotate(0deg);
                            opacity: 0.7;
                        }
                        50% {
                            transform: rotate(180deg);
                            opacity: 1;
                        }
                        100% {
                            transform: rotate(360deg);
                            opacity: 0.7;
                        }
                    }
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