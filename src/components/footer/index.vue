<template>
    <footer class="footer" ref="footer">
        <div class="directLink">
            <ul v-for="(item, index) in directLink" :key="index">
                <h4>{{ item.name }}</h4>
                <li v-for="i in item.children" :key="i">{{ i }}</li>
            </ul>
        </div>
        <ul class="bottomList">
            <li v-for="item in bottomList" :key="item.name">{{ item.name }}</li>
        </ul>
    </footer>
</template>

<script setup lang='ts'>
import { ref } from 'vue'

let footer = ref()
const directLink = ref([
    {
        name: '购物指南',
        children: ['购物流程','会员介绍','常见问题','联系客服']
    },
    {
        name: '配送方式',
        children: ['到店自提','211限时达','配送服务查询','配送费收取标准']
    },
    {
        name: '支付方式',
        children: ['货到付款','在线支付','分期付款','公司转账']
    },
    {
        name: '售后服务',
        children: ['售后政策','价格保护','退款说明','取消订单']
    },
    {
        name: '特色服务',
        children: ['花束定制']
    },
])
const bottomList = ref([
    {
        name: '关于我们',
    },
    {
        name: '联系我们',
    },
    {
        name: '联系客服',
    },
    {
        name: '合作招商',
    },
    {
        name: '商家帮助',
    },
    {
        name: '营销中心',
    },
    {
        name: '社区',
    },
    {
        name: '质量公告',
    },
    {
        name: '隐私政策',
    },
    {
        name: '社会公益',
    }
])
</script>

<style scoped lang='scss'>
.footer{
    height: $base-footer-height;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 30px 0 10px 0;
    background-color: rgba(0, 0, 0, .1);

    .directLink{
        width: 90%;
        position: relative;
        display: flex;
        justify-content: space-around;

        h4{
            font-size: 18px;
            margin-bottom: 10px;
            color: var(--color-text-main);
        }
        li{
            font-size: 14px;
            margin-bottom: 5px;
            color: #909090;
        }
        &::after{
            position: absolute;
            content: "";
            left: 0;
            bottom: -10px;
            width: 100%;
            height: 1px;
            background-color: var(--color-text-height);
        }
    }
    .bottomList{
        display: flex;
        margin-top: 20px;

        li{
            padding: 0 10px;
            font-size: 12px;
            line-height: 12px;
            border-right: 1px solid #000;
        }
        li:last-child{
            border: none;
        }
    }
}
</style>