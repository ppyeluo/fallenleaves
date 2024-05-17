<template>
    <div class="dilivery_container">
        <h3>配送方式</h3>
        <div class="way">
            <div class="way_item" @click="changeWay('顺丰快递')" :class="{ 'active': wayStatus == '顺丰快递'}">顺丰快递</div>
            <div class="way_item" @click="changeWay('闪送')" :class="{ 'active': wayStatus == '闪送'}" style="display: flex;align-items: center;"><el-icon><Bicycle /></el-icon><span style="padding-left: 0.2em;">闪送</span></div>
            <div class="way_item" @click="changeWay('上门自提')" :class="{ 'active': wayStatus == '上门自提'}">上门自提</div>
        </div>
        <div class="expected">
            预计 {{ getThreeHoursLater() }} 送达
        </div>
        <div class="weight">
            <div class="w_key">总重量：</div>
            <div class="w_value">3.360kg</div>
        </div>
    </div>
</template>

<script setup lang='ts'>
import { ref } from 'vue';

type str = '顺丰快递' | '闪送' | '上门自提'
const wayStatus = ref<str>('顺丰快递')
const changeWay = (str:str) => {
    wayStatus.value = str
}
// 模拟送达时间
function getThreeHoursLater(): string {
  const currentDate = new Date()
  const threeHoursLater = new Date(currentDate.getTime() + (3 * 60 * 60 * 1000))

  const year = threeHoursLater.getFullYear()
  const month = String(threeHoursLater.getMonth() + 1).padStart(2, '0')
  const day = String(threeHoursLater.getDate()).padStart(2, '0')
  const startHours = String(threeHoursLater.getHours()).padStart(2, '0')
  const endHours = String(threeHoursLater.getHours() + 1).padStart(2, '0')

  const weekdays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
  const weekday = weekdays[threeHoursLater.getDay()]

  return `${year}年${month}月${day}日[${weekday}] ${startHours}:00-${endHours}:00`
}
</script>

<style scoped lang='scss'>
.dilivery_container{
    background-color: #f7f7f7;
    padding: 1em;

    h3{
        font-size: 13px;
    }

    .way{
        display: flex;
        flex-wrap: wrap;

        .way_item{
            width: 11em;
            padding: 0.3em 3em;
            border: 1px solid #d4d4d4;
            font-size: 13px;
            text-align: center;
            margin-right: 2em;
            margin-top: 1em;
            cursor: pointer;

            &.active{
                border: 1px solid red;
            }
        }
    }
    .expected{
        font-size: 13px;
        padding: .6em 0;
        color: #97bcbc;
    }
    .weight{
        display: flex;
        font-size: 13px;

        .w_key{
            font-weight: 900;
        }
        .w_value{
            color: #d4d4d4
        }
    }
}
</style>