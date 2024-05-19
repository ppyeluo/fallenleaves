<template>
    <div ref="sold_ranking_container" style="width: 300px; height: 200px;"></div>
</template>

<script setup lang="ts">
defineOptions({ name: 'SoldRanking' })
import { reqHotSearchKeywords } from "@/api/customized";
import { HotSearchKeywords, Result } from "@/api/customized/type";
import * as echarts from "echarts"
import 'echarts-wordcloud'
import { ref,onMounted, reactive, watchEffect} from "vue"

const sold_ranking_container = ref()
let option = reactive({
    title: {
        text: '实时搜索热度',
        textStyle: {
            color: '#4a00e0'
        }
    },
    series: [{
        type: 'wordCloud',
        gridSize: 8, // 控制词云图的网格大小，值越大词语之间的间距越大
        sizeRange: [10, 30], // 控制词语的大小范围
        rotationRange: [0, 0], // 控制词语的旋转角度范围
        rotationStep: 45, // 控制词语旋转的步长
        shape: 'circle', // 控制词云图的形状，可选值为 'circle', 'cardioid', 'diamond', 'triangle-forward', 'triangle', 'pentagon', 'star'
        drawOutOfBound: false, // 控制词云图是否允许词语超出绘制区域
        // 布局的时候是否有动画
        layoutAnimation: true,
        // 图的位置
        // left: 'center',
        // top: 'center',
        textStyle: {
                fontFamily: 'sans-serif',
                // fontWeight: 'bold',
                color: function () {
                    return 'rgb(' + [
                        Math.round(Math.random() * 160),
                        Math.round(Math.random() * 160),
                        Math.round(Math.random() * 160)
                    ].join(',') + ')';
                }

        },  
        data:  [] as { value: number; name: string }[],
    }]
})
async function initCharts(){
    const myChart = echarts.init(sold_ranking_container.value)
    // 得到数据
    let result: Result<HotSearchKeywords[]> = await reqHotSearchKeywords()
    if(result.code === 200){
    option.series[0].data = result.data.map(item => ( { value: item.count, name: item.keyword }))
    }
    myChart.setOption(option)   // 使用指定的配置项和数据显示图表
    window.addEventListener('resize',() => { myChart.resize() })    // 图表响应式
    watchEffect(() => { // 监听数据变化，当数据发生变化时重新设置图表的配置项和数据
        myChart.setOption(option)
    })
}
onMounted(initCharts)
</script>
<style scoped lang="scss">
</style>