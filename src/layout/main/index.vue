<template>
  <div class="main">
    <router-view v-slot="{ Component }">
      <transition name="fade">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<script setup lang='ts'>

</script>

<style scoped lang='scss'>
.main{
  padding-left: 1em;
  padding-bottom: 0;
  min-height: calc(100vh - $base-footer-height - $base-header-height);
}
.fade-enter-from {
  opacity: 0;
  transform: scale(0);
}
.fade-enter-active {
  transition: all 1s;
}

.fade-enter-to {
  opacity: 1;
  transform: scale(1);
}
</style>