<template>
  <div class="temp_container">
    <el-button type="primary" @click="MyMessage({ type: 'success', message: 'hello' })">message</el-button>
    <el-button type="primary" @click="MyMessage({ type: 'warning', message: 'warning' })">warning</el-button>
    <el-button type="primary" @click="MyMessage({ type: 'info', message: 'hello' })">info</el-button>
    <el-button type="primary" @click="MyMessage({ type: 'error', message: 'hello' })">error</el-button>

    <div class="demo">Hello World!</div>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'Temp' })
import MyMessage from '@/utils/myMessage';
</script>

<style scoped lang="scss">
.demo {
  position: relative;
  overflow: hidden;
  background: linear-gradient(45deg, #D2EEF9, #f6eef0, #FFD1DE, #ff6b6b, #f39eb3);
  background-size: 400% 400%;
  animation: flow 15s ease infinite;
}

@keyframes flow {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

</style>