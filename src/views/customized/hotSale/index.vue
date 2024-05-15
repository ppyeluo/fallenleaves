<template>
    <el-table :data="tableData" style="width: 90%;margin-left: 5%;margin-top: 1em;" stripe border
        :header-cell-style="{ backgroundColor: '#ffaa94', color: '#ffffff' }"
        :cell-style="{ backgroundColor: '#ffaa54', color: '#fff' }"
        >
        <el-table-column type="index" label="排名" align="center" />
        <el-table-column prop="name" label="商品名称" align="center" />
        <el-table-column prop="dealTotal" label="交易额（万元）" align="center" />
        <el-table-column prop="sold" label="订单量" align="center" />
    </el-table>
</template>

<script setup lang='ts'>
defineOptions({ name: 'HotSold' })
import { reqHotSaleCommodity } from '@/api/customized';
import { HotSaleCommodity, Result } from '@/api/customized/type';
import { onMounted, ref } from 'vue';

let tableData = ref<HotSaleCommodity[]>([])
const getData = async () => {
    let result: Result<HotSaleCommodity[]> = await reqHotSaleCommodity()
    if(result.code === 200){
        tableData.value = result.data
    }
}
onMounted(getData)
</script>

<style scoped lang='scss'>
</style>