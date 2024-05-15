<template>
    <div class="dragPopWidget_container">
        <div class="widget">
            <div class="branch"></div>     
            <el-tooltip effect="light" placement="right">
                <div class="flower"><SvgIcon name="sunflower" width="50px" height="50px" /></div>
                <template #content>
                    账号：15028801092<br>
                    密码：zt3184182513
                </template>
            </el-tooltip>
        </div>
    </div>
</template>

<script setup lang='ts'>

</script>

<style scoped lang='scss'>
.dragPopWidget_container{
    position: absolute;
    top: 0;
    left: 260px;
    width: 100px;
    height: 100%;
    z-index: 99;

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