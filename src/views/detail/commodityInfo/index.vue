<template>
    <el-row>
      <el-col :span="8"><Picture /></el-col>
      <el-col :span="16"><Info /></el-col>
    </el-row>
</template>

<script setup lang='ts'>
import Picture from './picture/index.vue'
import Info from './info/index.vue'
</script>

<style scoped lang='scss'>

</style>