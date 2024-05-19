<template>
  <div class="home_container">
    <Banner />
    <section style="padding: 0 15px;">
      <el-row :gutter="30" >
        <el-col :span="16"><newLanuch /></el-col>
        <el-col :span="8"><HotBuy /></el-col>
      </el-row>
    </section>
    <section style="padding: 0 15px;">
      <HotRecommend />
    </section>
  </div>
</template>

<script setup lang='ts'>
defineOptions({ name: 'Home' })
import Banner from './banner/index.vue'
import NewLanuch from './newLanuch/index.vue'
import HotBuy from './hotBuy/index.vue'
import HotRecommend from './hotRecommend/index.vue'
</script>

<style scoped lang="scss">
</style>