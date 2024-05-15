<template>
  <div class="pop_message_container">
    <div class="pop_message" :class="`message_${t}`" v-if="visible">
      <div class="svg">
        <SvgIcon name="halfSurroundFlower" width="10em" height="50px" />
      </div>
      <span class="text">Hello World!</span>
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'MyMessage' })
import { ref } from 'vue'

// 控制消息是否可见
const visible = ref(true)
let t = 'success'
</script>

<style scoped lang="scss">
.pop_message_container {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;

  .pop_message {
    position: relative;
    margin-top: 2em;
    padding: 1em 1.5em;
    border-radius: 0.3em;
    animation: move 0.38s linear forwards;
    z-index: 9999;

    &.message_success{
      color: #67C23A;
      background-color: rgb(240, 249, 235);
      border-color: rgb(225, 243, 216);

      .svg{
        position: absolute;
        top: 0;
        left: 0;
      }
    }
    &.message_warning{
      color: #E6A23C;
      background-color: rgb(253, 246, 236);
      border-color: rgb(250, 236, 216);
    }
    &.message_error{
      color: #F56C6C;
      background-color: rgb(254, 240, 240);
      border-color: rgb(253, 226, 226);
    }

    @keyframes move {
      0% {
        transform: translate3d(0, -75px, 0);
        opacity: 0.16;
      }
      50% {
        opacity: 0.68;
      }
      100% {
        transform: none;
        opacity: 1;
      }
    }
  }
}
</style>