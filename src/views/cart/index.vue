<template>
    <div class="cart_container">
        <NavTitle title="我的购物车" />
        <section v-if="cartList.length === 0">
            <el-empty description="您的购物车为空" :image-size="300"/>
        </section>
        <section v-else>
            <el-table ref="Etable" :data="cartList" @selection-change="handleSelectionChange" @select-all="selectAll">
                <el-table-column type="selection" width="50"></el-table-column>
                <el-table-column label="商品信息"  width="500">
                    <template #='{ row }'>
                        <div class="info" @click="router.push(`/detail?id=${row.commodityId}`)">
                            <div class="img"><img :src="row.picture" :alt="row.name" width="100%" height="100%"></div>
                            <div class="word">
                                <div class="name">{{ row.name }}</div>
                                <div class="flowerLanguage">{{ row.flowerLanguage }}</div>
                            </div>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="单价">
                    <template #='{ row }'>
                        <div class="price">&yen;{{ row.price }}</div>
                    </template>
                </el-table-column>
                <el-table-column label="数量">
                    <template #='{ row }'>
                        <div class="count"><el-input-number @change="(currentV:number, oldV:number) => updateCart(currentV, oldV, row.commodityId)" v-model="row.count" size="small" :min="1" :max="row.bank"/></div>
                    </template>
                </el-table-column>
                <el-table-column label="总价">
                    <template #='{ row }'>
                        <div class="totalPrice">&yen;{{ (row.price*row.count).toFixed(2) }}</div>
                    </template>
                </el-table-column>
                <el-table-column>
                    <template #header>
                        <el-button :disabled="hasSelected" @click="batchRemoveCart">删除</el-button>
                    </template>
                    <template #='{ row }'>
                        <div class="operate">
                            <el-button @click="goBuy(row.commodityId, row.count)">购买</el-button>
                            <el-button @click="deleteCartItem(row.commodityId, row.count)">删除</el-button>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
            <el-card style="margin-top: .6em;" shadow="never">
                <div class="footer">
                    <div class="footer_left">
                        <el-checkbox @click="Etable?.toggleAllSelection" v-model="isAllSelected">全选</el-checkbox>
                        <span @click="batchRemoveCart" style="margin-left: .6em;font-size: 14px;color: aqua;cursor: pointer;">删除选中商品</span>
                    </div>
                    <div class="footer_right">
                        <span class="yixuan">已选<span class="yixuan_v">{{ selectedArr.length }}</span>件商品</span>
                        <span class="zongjia">总价：<span class="zongjia_v"><span style="padding-right: 0.2em;">&yen;</span>{{ selectedPrice.toFixed(2) }}</span></span>
                        <span class="goumai"><el-button type="primary" :disabled="hasSelected" @click="batchBuy">去结算</el-button></span>
                    </div>
                </div>
            </el-card>
        </section>
    </div>
</template>

<script setup lang='ts'>
defineOptions({ name: 'Cart' })
import { reqAddCart, reqBatchRemoveCart, reqCart, reqRemoveCart } from '@/api/cart';
import { cartItem } from '@/api/cart/type';
import { Result } from '@/api/user/type';
import { ElTable } from 'element-plus';
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router';
import MyMessage from '@/utils/myMessage'

const router = useRouter()
// 购物车列表
let cartList = ref<cartItem[]>([])
// 获取el-table组件(因为要用该组件暴露的方法'getSelectionRows'返回当前选中行以便后续批量操作)
const Etable = ref<InstanceType<typeof ElTable>  | null>(null)
// 是否有选中的商品(没有的话值为true，批量删除按钮禁用)
const hasSelected = ref<boolean>(true)
// 选中商品组成的数组
let selectedArr = ref<any[]>([])
// 选中商品的总价钱
let selectedPrice = ref<number>(0.00)
// 是否全选
const isAllSelected = ref<boolean>(false)
// 获取用户购物车信息方法，组件挂载完成后调用一次
const getCart = async () => {
    let result: Result<cartItem[]> = await reqCart()
    if(result.code === 200){
        cartList.value = result.data
    }
}
onMounted(getCart)
// 点击数字选择框的加减号更新购物车
const updateCart = async (currentV:number, oldV:number, id:string) => {
    if(currentV > oldV){   // 添加
        let result: Result<any> = await reqAddCart({ id, count: currentV-oldV })
        if(result.code === 200){
            MyMessage({
                type:'success',
                message: '添加成功！'
            })
        }
    }else{  // 减少
        let result: Result<any> = await reqRemoveCart({ id, count: oldV-currentV })
        if(result.code === 200){
            MyMessage({
                type:'info',
                message: '删除成功！'
            })
        }
    }
}
// 点击每条购物车后的删除按钮
const deleteCartItem = async (id:string,count:number) => {  // 减少
    let result: Result<any> = await reqRemoveCart({ id, count })
    if(result.code === 200){
        getCart()
        MyMessage({
            type:'info',
            message: '删除成功！'
        })
    }
}
// 点击批量删除按钮
const batchRemoveCart = async () => {
    if(!hasSelected.value){     
        let numberList = selectedArr.value.map((item:any) => item.commodityId)
        
        let result: Result<any> = await reqBatchRemoveCart({numberList})
        if(result.code === 200){
            MyMessage({
                type:'info',
                message: '删除成功！'
            })
            getCart()
        }
    }
}
// 当用户更新复选框选中状态，调用该方法
const handleSelectionChange = () => {
    selectedArr.value = Etable.value?.getSelectionRows()  // 更新存储选中商品的数组
    if(selectedArr.value.length === 0){
        selectedPrice.value = 0
    }else{
        selectedPrice.value = selectedArr.value.reduce((accumulator, currentValue) => {
            return accumulator + currentValue.count * currentValue.price
        }, 0)
    }
    hasSelected.value = selectedArr.value.length > 0 ? false:true // 更新是否有选中商品
}
// 点击表格全选按钮
const selectAll = (selection:any[]) => {
    isAllSelected.value = selection.length > 0
}
// 单条商品购买
const goBuy = (id:string, count:number) => {
    const data = [
        {
            id,
            count
        }
    ]
    router.push({path:'/settelment', query:{ data: JSON.stringify(data) }})
}
// 批量购买
const batchBuy = () => {
    const data = selectedArr.value.map(i => {
        return {
            id: i.commodityId,
            count: i.count
        }
    })
    router.push({path:'/settelment', query:{ data: JSON.stringify(data) }})
}
</script>

<style scoped lang="scss">
.cart_container{
    .info{
        display: flex;
        cursor: pointer;

        img{
            width: 80px;
            height: 80px;
            border-radius: 10px;
            overflow: hidden;
        }
        .word{
            padding-left: 10px;

            .name{
                padding: 2px 0;
                color: black;
                font-size: 15px;
            }
            .flowerLanguage{
                font-size: 12px;
            }
        }
    }
    .footer{
        display: flex;
        justify-content: space-between;
        font-size: 15px;

        .footer_right{
            display: flex;
            align-items: flex-end;

            .yixuan, .zongjia{
                padding-right: 1em;
            }
            .yixuan_v{
                color: red;
                font-size: 1.1em;
                padding: 0 0.3em;
            }
            .zongjia_v{
                color: red;
                font-size: 1.3em;
            }
        }
    }
}
</style>