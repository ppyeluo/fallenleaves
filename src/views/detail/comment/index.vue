<template>
    <div class="comment_container">
        <div class="title">
            <h3>商品评论</h3>
            <div class="menu">
                <span style="color: red;">全部评价(100+)</span>
                <span>视频晒单(100+)</span>
                <span>好评(10+)</span>
                <span>中评(10+)</span>
                <span>差评(5+)</span>
                <span>追评(5+)</span>
            </div>
        </div>
        <div class="content">
            <div class="item" v-for="i in commentList">
                <div class="personal">
                    <div class="baseInfo">
                        <el-avatar :size="50" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
                        <span class="username">云深不知处</span>
                    </div>
                    <div class="memberTag"><el-tag type="success">Plus会员</el-tag></div>
                </div>
                <div class="comment">
                    <div class="rate"><el-rate v-model="i.rating" /></div>
                    <div class="text">
                        {{ i.content }}
                    </div>
                    <div class="images"></div>
                    <div class="footer">
                        <el-row>
                            <el-col :span="6">{{ i.commodityName }}</el-col>
                            <el-col :span="6">2024-04-16 {{ i.ipAddress }}</el-col>
                            <el-col :span="6"></el-col>
                            <el-col :span="6">
                                <span>举报</span>
                                <span>点赞({{ i.likesCount }})</span>
                                <span>回复({{ i.repliesCount }})</span>
                            </el-col>
                        </el-row>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang='ts'>
import { reqCommodityComments } from '@/api/commodity'
import { CommodityComment } from '@/api/commodity/type';
import { Result } from '@/api/user/type';
import { ref, onMounted } from 'vue';

let commentList = ref<CommodityComment[]>([])
const getComments = async () => {
    let result: Result<CommodityComment[]> = await reqCommodityComments('10570')
    if(result.code === 200){
        commentList.value = result.data
    }
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
            }
        }
    }
    .content{

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

                .text{
                    padding: 5px 0;
                    font-size: 14px;
                }
                .footer{
                    margin-top: 10px;
                    font-size: 12px;
                }
            }
        }
    }
    .item:last-child{
        border: none;
    }
}
</style>