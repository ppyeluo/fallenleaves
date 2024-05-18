<template>
    <div class="dragPopWidget_container" v-if="!userStore.token" >
        <div class="widget">
            <div class="poptip_container">
              <div class="poptip_item">点我获取测试账号！😊</div>
            </div>
            <div class="branch"></div>     
            <el-tooltip effect="light" placement="right">
                <div class="flower"><SvgIcon name="sunflower" width="50px" height="50px" /></div>
                <template #content>
                  <el-tooltip
                      effect="light"
                      content="点击复制账号"
                      placement="right"
                    ><span class="tip">
                      <span class="key">账号：</span>
                      <span class="value" @click="toCopy(setting.account)">{{ setting.account }}</span>
                      <el-icon @click="toCopy(setting.account)"><CopyDocument /></el-icon>
                  </span></el-tooltip>
                  <el-tooltip
                      effect="light"
                      content="点击复制密码"
                      placement="right"
                    ><span class="tip">
                      <span class="key">密码：</span>
                      <span class="value" @click="toCopy(setting.password)">{{ setting.password }}</span>
                      <el-icon @click="toCopy(setting.password)"><CopyDocument /></el-icon>
                  </span></el-tooltip>
                </template>
            </el-tooltip>
        </div>
    </div>
</template>
<script setup lang='ts'>
import useClipboard from 'vue-clipboard3'
import setting from '@/setting'
import { ElMessage } from 'element-plus';
import { onMounted, ref } from 'vue';
import useUserStore from '@/store/modules/user'
const userStore = useUserStore()
const { toClipboard } = useClipboard()
// 页面挂载前提示框可见
const visiblePoptip = ref<boolean>(true)
onMounted(() => {
  // 3秒后，提示框消失
  setTimeout(() => {
    visiblePoptip.value = false
  }, 3000);
})
const toCopy = async (text:string) => {
  await toClipboard(text)
  ElMessage({
    message: '已复制',
    type: 'success',
  })
}
</script>

<style scoped lang='scss'>
.tip{
  display: flex;
  justify-content: space-between;
  align-items: center;

  .value{
    position: relative;
    padding-right: .3em;
    cursor: pointer;
  }
  .value:hover:after {
    content: "";
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 1px;
    background-image: linear-gradient(to right, transparent, #000, transparent);
    animation: dash 1s linear infinite;
  }
  @keyframes dash {
    0% {
      background-size: 0 1px;
    }
    100% {
      background-size: 8px 1px;
    }
  }
}
.dragPopWidget_container{
    position: absolute;
    top: 0;
    left: 260px;
    width: 100px;
    height: 100%;
    z-index: 10;

    .widget{
        .poptip_container{
          position: absolute;
          top: 40px;
          left: 70px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          opacity: 1;
          animation: fade-out 3s;
          animation-iteration-count: 1;/* 动画执行1次 */
          animation-fill-mode: forwards; /* 动画结束后保持最后一帧状态 */
          animation-delay: 0s; /* 动画立即开始 */
          .poptip_item{
            background: $background;
            border-radius: 20px;
            padding: 12px 16px;
            position: relative;
            white-space: nowrap;
            box-shadow: 0 0 20px rgba(255, 105, 180, 0.7),
                        0 0 40px rgba(255, 105, 180, 0.5),
                        0 0 60px rgba(255, 105, 180, 0.3);
            animation: glowing 1s ease-in-out infinite;
          }
          @keyframes glowing {
            0% {
              box-shadow: 0 0 20px rgba(255, 105, 180, 0.7),
                          0 0 40px rgba(255, 105, 180, 0.5),
                          0 0 60px rgba(255, 105, 180, 0.3);
            }
            50% {
              box-shadow: 0 0 30px rgba(255, 105, 180, 1),
                          0 0 50px rgba(255, 105, 180, 0.8),
                          0 0 70px rgba(255, 105, 180, 0.5);
            }
            100% {
              box-shadow: 0 0 20px rgba(255, 105, 180, 0.7),
                          0 0 40px rgba(255, 105, 180, 0.5),
                          0 0 60px rgba(255, 105, 180, 0.3);
            }
          }
          .poptip_item:before{
            content: "";
            position: absolute;
            border-top: 10px solid transparent;
            border-right: 20px solid #D2EEF9;
            border-bottom: 10px solid transparent;
            left: -15px;
            top: 50%;
            transform: translateY(-50%);
          }
          @keyframes fade-out {
            0% {
              opacity: 1; /* 初始透明度为1 */
            }
            50% {
              opacity: .7;
            }
            100% {
              opacity: 0; /* 结束透明度为0 */
              display: none;
            }
          }
        }
        .poptip::before{
          content: "";
          position: absolute;
          top: 5px;
          left: -10px;
          width:25px;
          height: 25px;
          background-color: rgb(232, 200, 204);
          transform: rotate(45deg);
        }
        .branch{
            position: absolute;
            top: -20px;
            left: 22.5px;
            width: 5px;
            height: 80px;
            background-color: brown;
            border-left: 1px solid rgb(151, 52, 52); /* 左侧透明 */
            border-right: 1px solid rgb(146, 56, 56); /* 右侧透明 */
        }
        .flower{
            position: absolute;
            left: 0;
            top: 35px;
            cursor: pointer;
            animation: swing 5s linear infinite; /* 定义动画 */
        }
    }
}

@keyframes swing {
  0% {
    transform: rotate(0deg);
  }
  25% {
    transform: rotate(90deg);
  }
  50% {
    transform: rotate(180deg);
  }
  75% {
    transform: rotate(270deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>