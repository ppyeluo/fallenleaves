<template>
    <NavTitle title="我的收藏" />
    <section class="collect_container">
        <section v-if="collectList.length === 0">
            <el-empty description="您的收藏为空" :image-size="300"/>
        </section>
        <el-card v-else shadow="never" style="margin-bottom: 10px;">
            <div class="content">
                <div class="item" @click="router.push(`/detail?id=${item.commodityId}`)" v-for="item in collectList" :key="item.userId+item.commodityId">
                    <div class="photo">
                        <img :src="item.picture" :alt="item.name" width="100%" height="100%">
                    </div>
                    <div class="info">
                        <div class="name">{{ item.name }}</div>
                        <div class="flowerLanguage"><el-text line-clamp="4"> {{ item.flowerLanguage }}</el-text></div>
                    </div>
                    <div class="operate">
                        <el-tooltip
                            effect="light"
                            content="从我的收藏中移除"
                            placement="top-end"
                        >  
                            <el-icon style="margin-top: 10px;" @click="removeCollect(item.commodityId)"><Delete /></el-icon>
                        </el-tooltip>
                    </div>
                </div>
            </div>
        </el-card>
    </section>
</template>

<script setup lang='ts'>
defineOptions({ name: 'Collect' })
import { reqCollect, reqRemoveCollect } from '@/api/collect';
import { CollectItem, Result } from '@/api/collect/type'
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()

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
    
    .content{
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 10px;

        .item{
            position: relative;
            display: flex;
            margin-top: 15px;
            cursor: pointer;

            .photo{
                width: 180px;
                height: 180px;
                border-radius: 10px;
                overflow: hidden;
                flex-shrink: 0;
            }
            .info{
                padding-left: 10px;

                .name{
                    padding: 6px 0 10px 0;
                    font-size: 16px;
                }
            }
            .operate{
                position: absolute;
                right: 20px;
                bottom: 20px;
                transition: 1s;
                cursor: pointer;
            }
            .operate:hover{
                color: red;
            }
        }
    }
}
</style>