<template>
    <div class="consignee_container">
        <div class="addressInfo">
            <div class="info" v-if="defultAddress">
                <div class="summarize active">{{ defultAddress.receiver }} {{ defultAddress.province }}</div>
                <div class="detail" style="padding-right: 2em;">{{ defultAddress.receiver }} {{ converAddress(defultAddress) }} {{ maskPhone(defultAddress.phone) }}</div>
                <el-tag type="info">默认地址</el-tag>
            </div>
            <div class="operate">
                <span @click="undeveloped">编辑</span>
            </div>
        </div>
        <template v-if="isExpand">
            <div class="addressInfo" v-for="i in foldAddress">
                <div class="info">
                    <div class="summarize">{{ i.receiver }} {{ i.province }}</div>
                    <div class="detail">{{ i.receiver }} {{ converAddress(i) }} {{ maskPhone(i.phone) }}</div>
                </div>
                <div class="operate">
                    <span @click="undeveloped">设为默认地址</span>
                    <span @click="undeveloped">编辑</span>
                    <span @click="undeveloped">删除</span>
                </div>
            </div>
        </template>
        <div class="expand">
            <span v-if="isExpand" @click="isExpand = !isExpand">收起地址<el-icon style="padding-left: 0.3em;"><ArrowUp /></el-icon></span>
            <span v-else @click="isExpand = !isExpand">更多地址<el-icon style="padding-left: 0.3em;"><ArrowDown /></el-icon></span>
        </div>
    </div>
</template>

<script setup lang='ts'>
defineOptions({ name: 'Consignee' })
import { Address, Result } from '@/api/user/type';
import { getAddress } from '@/api/user';
import { computed, onMounted, ref } from 'vue';
import { undeveloped } from '@/utils/undeveloped';
// 是否展开地址显示
let isExpand = ref<boolean>(false)
// 地址列表
const addressList = ref<Address[]>([])
// 得到默认地址
const defultAddress = computed(() => addressList.value.find(i => i.default == 1)!)
// 折叠地址（除去默认地址）
const foldAddress = computed(() => addressList.value.filter(i => i.default != 1)!)
// 根据地址信息拼接出详细地址
const converAddress = (addressItem: Address) => {
    return `${addressItem.province} ${addressItem.city} ${addressItem.town} ${addressItem.detail}`
}
// 得到用户地址
const getAddressList = async () => {
    const result: Result<Address[]> = await getAddress()
    if(result.code == 200){
        addressList.value = result.data
    }
}
// 加密手机号
function maskPhone(phoneNumber: string): string {
  if (typeof phoneNumber !== 'string' || phoneNumber.length !== 11) {
    // throw new Error('Invalid phone number format')
    return '*****'
  }
  return `${phoneNumber.slice(0, 3)}****${phoneNumber.slice(7)}`
}

onMounted(getAddressList)
</script>

<style scoped lang='scss'>
.consignee_container{
    padding-left: 2em;
    .addressInfo{
        display: flex;
        justify-content: space-between;
        margin-bottom: 0.8em;
        font-size: 12px;

        .info{
            display: flex;
            cursor: pointer;

            .summarize{
                position: relative;
                padding: 0.3em 2em;
                border: 1px solid rgb(221, 221, 221);

                &.active{
                    border: 1px solid #ff4614;
                }
            }
            
            .detail{
                padding: 0.3em 0;
                padding-left: 1em;
            }
        }
        .operate{
            display: none;
            padding: 0.3em 0;
            
            span{
                padding-right: 0.5em;
                cursor: pointer;
                color: rgb(66, 176, 235);
            }
        }

        &:hover{
            background-color: cyan;
            .summarize{
                background-color: #fff;
                border: 1px solid #ff4614;
            }

            .operate{
                display: block;
            }
        }
    }
    .expand{
        font-size: 14px;
        padding-top: 0.6em;
        
        span{
            display: flex;
            align-items: center;
        }
    }
}
</style>