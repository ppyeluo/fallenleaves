<template>
    <NavTitle title="我的收藏" />
    <section class="collect_container">
        <el-card shadow="never">
            <div class="content">
                <div class="item" v-for="item in collectList" :key="item.userId+item.commodityId">
                    <div class="photo">
                        <img :src="item.picture" :alt="item.name" width="100%" height="100%">
                    </div>
                    <div class="info">
                        <div class="name">{{ item.name }}</div>
                        <div class="flowerLanguage"><el-text line-clamp="2"> {{ item.flowerLanguage }}</el-text></div>
                    </div>
                    <div class="operate">
                        <el-icon style="margin-top: 10px;" @click="removeCollect(item.commodityId)"><Delete /></el-icon>
                    </div>
                </div>
            </div>
        </el-card>
    </section>
</template>

<script setup lang='ts'>
import { reqCollect, reqRemoveCollect } from '@/api/collect';
import { CollectItem, Result } from '@/api/collect/type'
import { onMounted, ref } from 'vue';

defineOptions({ name: 'Collect' })

let collectList = ref<CollectItem[]>([])

const getCollect = async () => {
    let result: Result<CollectItem[]> = await reqCollect()
    if(result.code === 200){
        collectList.value = result.data
        console.log(collectList.value);
        
    }
}
const removeCollect = async (id:string) => {
    let result: Result<any> = await reqRemoveCollect(id)
    if(result.code === 200){
        console.log('删除成功')
        getCollect()
    }
}
onMounted(getCollect)
</script>

<style scoped lang="scss">
.collect_container{
    min-height: calc(100vh - $base-footer-height - $base-header-height - $nav-title-height);
    
    .content{
        display: flex;
        justify-content: space-around;
        flex-wrap: wrap;

        .item{
            display: flex;
            width: 45%;
            padding-right: 5%;
            margin-top: 15px;

            .photo{
                flex: 3;
                border-radius: 10px;
                overflow: hidden;
            }
            .info{
                flex:10;
                padding-left: 10px;

                .name{
                    padding: 6px 0 10px 0;
                    font-size: 16px;
                }
            }
            .operate{
                flex:2;
                margin-top: 20px;
            }
        }
    }
}
</style>