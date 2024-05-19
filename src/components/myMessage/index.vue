<template>
<div class="pop_message_container" v-if="visible">
    <!-- 成功 -->
    <div class="pop_message" :class="`message_${type}`">
      <div class="flower-container">
          <div class="flower">
              <div class="petal petal1"></div>
              <div class="petal petal2"></div>
              <div class="petal petal3"></div>
              <div class="petal petal4"></div>
              <div class="petal petal5"></div>
              <div class="petal petal6"></div>
              <div class="petal petal7"></div>
              <div class="petal petal8"></div>
              <div class="petal petal9"></div>
              <div class="big"></div>
              <div class="center"></div>
          </div>
      </div>
      <span class="text">{{ message }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'MyMessage' })
import { onMounted, ref } from 'vue'

// 控制消息是否可见
const visible = ref(false)

// 'success' | 'warning' | 'info' | 'error'
defineProps({
  type:{
    type: String,
    default: 'info'
  },
  message:{
    type: String,
    default: 'this is a message'
  },
})
onMounted(() => {
    visible.value = true
})
</script>

<style scoped lang="scss">
.pop_message_container {  
  position: fixed;
  top: 20px; // 距离页面顶部 20px
  left: 50%; // 水平居中
  transform: translateX(-50%);
  max-height: 30vh; // 最大高度为视口高度的 30%
  z-index: 9999; // 确保 MyMessage 在最上层
  opacity: 0;
  animation: appear 2s forwards, disappear 2s 2s forwards;

  .pop_message {
    padding: 16px 25px 16px 30px;
    border-radius: 8px;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);

    @keyframes appear {
      0% {
        opacity: 0;
        transform: translateX(-50%) scale(0.5);
      }
      50% {
        opacity: 1;
        transform: translateX(-50%) scale(1.1);
      }
      100% {
        opacity: 1;
        transform: translateX(-50%) scale(1);
      }
    }

    @keyframes disappear {
      0% {
        opacity: 1;
        transform: translateX(-50%) scale(1);
      }
      50% {
        opacity: 1;
        transform: translateX(-50%) scale(1.1);
      }
      100% {
        opacity: 0;
        transform: translateX(-50%) scale(0.5);
      }
    }
  }
}
.flower-container {
  position: absolute;
  top: -30px;
  left: -30px;
  width: 80px;
  height: 80px;
  animation: flower-sway 3s infinite linear;

  .flower {
    width: 100%;
    height: 100%;
    position: relative;
    .center {
      width: 10px;
      height: 10px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      border-radius: 50%;
      box-shadow: 0 0 6px rgba(0, 0, 0, 0.2);
    }
    .big{
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      border-radius: 40% 60% 55% 45% / 40% 45% 55% 60%;
      width: 25px;
      height: 25px;
      backdrop-filter: blur(1px);
      border-radius: 40% 60% 55% 45% / 40% 45% 55% 60%;
    }

    @keyframes flower-sway {
      0% { transform: rotate(-10deg); }
      50% { transform: rotate(10deg); }
      100% { transform: rotate(-10deg); }
    }
    .petal {
      width: 13px;
      height: 40px;
      position: absolute;
      border-radius: 50% 50% 0 50%;
      transform-origin: center center;
      box-shadow: inset 0 0 7px rgba(0, 0, 0, 0.2);
    }
    .petal:before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-image: linear-gradient(
        to bottom,
        rgba(255, 255, 255, 0.3),
        rgba(255, 255, 255, 0)
      );
      border-radius: inherit;
    }

    .petal1 {
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) rotate(0deg);
    }

    .petal2 {
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) rotate(72deg);
    }

    .petal3 {
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) rotate(144deg);
    }

    .petal4 {
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) rotate(216deg);
    }

    .petal5 {
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) rotate(288deg);
    }

    .petal6 {
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) rotate(36deg);
    }

    .petal7 {
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) rotate(108deg);
    }

    .petal8 {
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) rotate(180deg);
    }

    .petal9 {
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) rotate(252deg);
    }
  }
}
.message_success{
  background-color: #e6fffa;
  border-color: #0bc5ea;
  color: #0bc5ea;
  .big{
    background-color: rgba(179, 236, 255, 0.6);
  }
  .center{
    background-color: #0bc5ea;
  }
  .petal{
    background-color: #b3ecff;
    background: radial-gradient(
      ellipse at center,
      #b3ecff 0%,
      #8be3ff 50%,
      #43d3ff 100%
    );
  }
}
.message_warning{
  background-color: #fffbeb;
  border-color: #f59e0b;
  color: #f59e0b;
  .big {
    background-color: rgba(255, 211, 140, 0.6);
  }
  .center {
    background-color: #f59e0b;
  }
  .petal {
    background-color: #fff4d4;
    background: radial-gradient(
      ellipse at center,
      #fff4d4 0%,
      #ffdea0 50%,
      #ffcb6b 100%
    );
  }
}
.message_info{     
  background-color: #f0f9ff;
  border-color: #3b82f6;
  color: #3b82f6;
  .big {
    background-color: rgba(191, 219, 254, 0.6);
  }
  .center {
    background-color: #3b82f6;
  }
  .petal {
    background-color: #e1edff;
    background: radial-gradient(
      ellipse at center,
      #e1edff 0%,
      #c5deff 50%,
      #a7d1ff 100%
    );
  }
}
.message_error{
  color: #F56C6C;
  background-color: rgb(254, 240, 240);
  border-color: rgb(253, 226, 226);
  .big {
    background-color: rgba(255, 205, 205, 0.6);
  }
  .center {
    background-color: #F56C6C;
  }
  .petal {
    background-color: #fde2e2;
    background: radial-gradient(
      ellipse at center,
      #fde2e2 0%,
      #fbc4c4 50%,
      #f9a5a5 100%
    );
  }
}
</style>