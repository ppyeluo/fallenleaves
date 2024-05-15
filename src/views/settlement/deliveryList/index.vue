<template>
    <div class="deliveryList_container">
        <el-row>
            <el-col :span="10"><Delivery /></el-col>
            <el-col :span="14"><Commodity /></el-col>
        </el-row>
    </div>
</template>

<script setup lang='ts'>
defineOptions({ name: 'DeliveryList' })
import Delivery from './delivery/index.vue'
import Commodity from './commodity/index.vue'
</script>

<style scoped lang='scss'>

</style>