<template>
    <el-popover v-if="userStore.token" 
        placement="bottom"
        :width="200"
        trigger="hover"
    >
        <template #reference>
            <el-avatar style="margin-left: 30px;" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
        </template>
        <div class="infoCard">
            <div class="info"> 
                <div class="username">用户名：{{ user.username }}</div>
                <div class="label"><el-tag type="danger">资深小白</el-tag></div>
                <div class="show">
                    <div class="memberPoints">
                        <span>100</span>
                        <span>会员积分</span>
                    </div>
                    <div class="coupon">
                        <span>10</span>
                        <span>优惠券</span>
                    </div>
                </div>
                <div class="operate">
                    <div class="edit" @click="editDialogVisible = true">编辑信息</div>
                    <div class="logout" @click="logout">退出登录</div>
                </div>
            </div>
        </div>
        <el-dialog
            v-model="editDialogVisible"
            title="编辑个人信息"
        >
            <el-card>
                <div class="edit_item">
                    <div class="avatar_key">头像</div>：
                    <div class="avatar_value">
                        <el-avatar icon="UserFilled" />
                    </div>
                </div>
                <div class="edit_item">
                    <div class="username_key">用户名</div>：
                    <div class="username_value"><el-input v-model="user.username" disabled /></div>
                    <div class="username_operate">更改</div>
                </div>
                <div class="edit_item">
                    <div class="phone_key">手机号</div>：
                    <div class="phone_value"><el-input v-model="user.username" disabled /></div>
                    <div class="phone_operate">更改</div>
                </div>
                <div class="edit_item">
                    <div class="email_key">邮箱</div>：
                    <div class="email_value"><el-input v-model="user.username" disabled /></div>
                    <div class="email_operate">更改</div>
                </div>
                <div class="edit_item">
                    <div class="password_key">密码</div>：
                    <div class="password_value"><el-input v-model="user.username" disabled /></div>
                    <div class="password_operate">更改</div>
                </div>
            </el-card>
            <template #footer>
                <div class="dialog-footer">
                    <el-button @click="editDialogVisible = false">Cancel</el-button>
                    <el-button type="primary" @click="editDialogVisible = false">Confirm</el-button>
                </div>
            </template>
        </el-dialog>
    </el-popover>
    <template v-else>
      <el-tooltip
        effect="light"
        content="点我去登录"
        placement="bottom-end"
        show-after="300"
      >
        <el-avatar @click="userStore.loginDialogVisible = true" style="margin-left: 30px;" icon="UserFilled" />
      </el-tooltip>
    </template>
</template>

<script setup lang='ts'>
defineOptions({ name: 'UserCard' })
import { reqUserInfo } from '@/api/user';
import type { Result, userInfo } from '@/api/user/type';
import useUserStore from '@/store/modules/user';
import { onMounted, ref, watch } from 'vue';


const userStore = useUserStore()
let user = ref<userInfo>({} as userInfo)
const getUser = async () => {
    if(userStore.token){
        let res:Result<userInfo> = await reqUserInfo()
        if(res.code === 200){
            user.value = res.data
        }
    }else{
        user.value = {} as userInfo
    }
}
watch(() => userStore.token, getUser)
const logout = () => {
    userStore.userLogout()
}
onMounted(getUser)
let editDialogVisible = ref(false)
</script>

<style scoped lang='scss'>
.infoCard{

    .info{

        .username{
            padding: 0.4em 0;
        }

        .show{
            padding: 0.5em 0;
            display: flex;
            justify-content: space-around;
            align-items: center;

            .memberPoints, .coupon{
                display: flex;
                flex-direction: column;
                align-items: center;
            }
        }
        .operate{
            .edit, .logout{
                padding: .5em .3em;
            }
        }
    }
}
.edit_item{
    display: flex;
    align-items: center;
    padding: .7em 0;
    

    [class*="key"] {
        width: 4em;
        text-align-last: justify;
    }   
    [class*="value"] {
        width: 18em;
    }   
    [class*="operate"] {
        padding-left: 1em;
        width: 4em;
    }
}
</style>