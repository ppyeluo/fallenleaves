<template>
  <div class="container">
    <MyHeader />
    <div class="w">
      <div class="drop_tag">
          <div class="line left"></div>
          <div class="line right"></div>
          <div class="sign">肥肠抱歉，你要找的页面不见了！</div>
      </div>
      <div class="gohome">
        <router-link to="/">回到首页</router-link>
      </div>
      <div style="position: absolute; top: 300px;margin: 0 auto;width: 100%;padding: 50px;">
        <div style="width: 100%;height: 10px;border-top: 2px dashed #000;"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang='ts'>

</script>

<style scoped lang='scss'>
.container{
  display: grid;
  grid-template-rows: auto 1fr; /* 第一行自适应高度，第二行占满剩余空间 */
  width: 100vw;
  height: 100vh;
  background: $background;
  .w{
    position: relative;
    width: $type-area-width;
    margin: 0 auto;
    background-color: rgba(57, 243, 209, .3);
    backdrop-filter: blur(1px);
    
    .drop_tag{
      position: absolute;
      top: 0;
      left: 50%;
      transform: translateX(-50%);
      width: 300px;
      height: 200px;
      .line {
          position: absolute;
          top: 0;
          width: 5px;
          height: 80px;
          background-color: $main-color;
          border-radius: 2.5px 2.5px 0 0;
          z-index: 1;

          &.left{
            height: 92px;
            left: 30px;
          }
          &.right{
            height: 73px;
            right: 30px;
          }
      }
      .sign{
        position: absolute;
        top: 80px;
        border: 5px solid $main-color;
        border-radius: 10px;
        padding: .7em .4em;
        font-size: 18px;
        color: $main-color;
        transform: rotate(-5deg); /* 向左上倾斜 */
        z-index: 2;
      }
    }
    .gohome{
      position: absolute;
      top: 180px;
      left: 50%;
      transform: translateX(-50%);
      a{
        display: inline-block;
        background-color: $main-color;
        color: white;
        padding: .8em 1em;
        border-radius: 10px;
        text-decoration: none;
        cursor: pointer;
        transition: .3s;
      }
      a:hover{
        background-color: #ff6b6b;
        color: rgb(230, 204, 204);
        transform: translate(-3px, -2px);
      }
    }
  }
}
</style>