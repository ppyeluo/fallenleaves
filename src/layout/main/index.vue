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
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>