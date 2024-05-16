<template>
    <div class="dragPopWidget_container">
        <div class="widget">
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
                      <span class="value" @click="toCopy(setting.account)">15028801092</span>
                      <el-icon @click="toCopy(setting.account)"><CopyDocument /></el-icon>
                  </span></el-tooltip>
                  <el-tooltip
                      effect="light"
                      content="点击复制密码"
                      placement="right"
                    ><span class="tip">
                      <span class="key">密码：</span>
                      <span class="value" @click="toCopy(setting.password)">zt3184182513</span>
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
const { toClipboard } = useClipboard()
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
    z-index: 999;

    .widget{

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