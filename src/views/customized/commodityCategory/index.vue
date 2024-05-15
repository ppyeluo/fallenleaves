<template>
    <div ref="commodityCategoryPieChart" style="width: 400px;height: 400px;"></div>
</template>

<script setup lang='ts'>
defineOptions({ name: 'CommodityCategoryPieChart' })
import { ref,onMounted, reactive, watchEffect } from 'vue'
import * as echarts from 'echarts'
import { CommodityCategory, Result } from '@/api/customized/type';
import { reqCommodityCategory } from '@/api/customized';


const commodityCategoryPieChart = ref()
let option = reactive({
  title: {  // 标题
    text: '花束类别分布图',
  },
  tooltip: {  // 提示框
    trigger: 'item'
  },
  legend: { // 图例
    type: 'scroll',
    right: 0,
    bottom: 10,
  },
  series: [
    {
      type: 'pie',
      radius: '50%',
      data:  [] as { value: number; name: string }[],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }
  ]
})
const initChart = async () => {
  let myChart = echarts.init(commodityCategoryPieChart.value) // 初始化echarts实例
  // 得到数据
  let result: Result<CommodityCategory[]> = await reqCommodityCategory()
  if(result.code === 200){
    option.series[0].data = result.data.map(item => ( { value: item.count, name: item.typeName }))
  }
  myChart.setOption(option)   // 使用指定的配置项和数据显示图表
  window.addEventListener('resize',() => { myChart.resize() })    // 图表响应式
  watchEffect(() => { // 监听数据变化，当数据发生变化时重新设置图表的配置项和数据
    myChart.setOption(option)
  })
}
onMounted(initChart)
</script>

<style scoped lang='scss'>

</style>