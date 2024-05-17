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
                <div class="username">用户名：{{ userIn.username }}</div>
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
                    <div class="edit" @click="editDialogVisible = true"><el-icon><EditPen /></el-icon><span class="main">编辑信息</span></div>
                    <div class="logout" @click="logout"><el-icon><Failed /></el-icon><span class="main">退出登录</span></div>
                </div>
            </div>
        </div>
        <el-dialog
            v-model="editDialogVisible"
            title="编辑个人信息"
            :close-on-click-modal="false" 
            :close-on-press-escape="false"
            @close="closeDialog"
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
                    <div class="username_value"><el-input v-model="editUserInfo.username" :disabled="disabledStatus.username" /></div>
                    <div class="username_operate" @click="changeDisabled('username')">更改</div>
                </div>
                <div class="edit_item">
                    <div class="phone_key">手机号</div>：
                    <div class="phone_value"><el-input v-model="editUserInfo.phone" :disabled="disabledStatus.phone" /></div>
                    <div class="phone_operate" @click="changeDisabled('phone')">更改</div>
                </div>
                <div class="edit_item">
                    <div class="email_key">邮箱</div>：
                    <div class="email_value"><el-input v-model="editUserInfo.email" :disabled="disabledStatus.email" /></div>
                    <div class="email_operate" @click="changeDisabled('email')">更改</div>
                </div>
                <div class="edit_item">
                    <div class="password_key">密码</div>：
                    <div class="password_value"><el-input v-model="editUserInfo.password" show-password type="password" :disabled="disabledStatus.password" /></div>
                    <div class="password_operate" @click="changeDisabled('password')">更改</div>
                </div>
            </el-card>
            <template #footer>
                <div class="dialog-footer">
                    <el-button @click="editDialogVisible = false">取消</el-button>
                    <el-button type="primary" @click="editDialogVisible = false">保存更改</el-button>
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
// 编辑弹窗中各个“更改”按钮的禁用状态
interface disabledStatusInterface {
  username: boolean;
  phone: boolean;
  email: boolean;
  password: boolean;
}
const disabledStatus = ref<disabledStatusInterface>({
    username: true,
    phone: true,
    email: true,
    password: true
})
// 编辑框的用户信息
const editUserInfo = ref({
    username: '',
    phone: '',
    email: '',
    password: ''
})
// 切换禁用状态
const changeDisabled = (r: 'username' | 'phone' | 'email' | 'password') => {
    console.log(r,'未知bug，暂时搁置')
    // disabledStatus.value[r] = !disabledStatus.value[r]
}
// 编辑框关闭回调
const closeDialog = () => {
    editUserInfo.value = userIn.value
    disabledStatus.value = {
        username: true,
        phone: true,
        email: true,
        password: true
    }
}
// 用户信息
let userIn = ref<userInfo>({} as userInfo)
// 得到用户信息
const getUser = async () => {
    if(userStore.token){
        let res:Result<userInfo> = await reqUserInfo()
        if(res.code === 200){
            userIn.value = res.data
            editUserInfo.value = res.data
        }
    }else{
        userIn.value = {} as userInfo
    }
}
watch(() => userStore.token, getUser)
const logout = () => {
    userStore.userLogout()
}
onMounted(getUser)
// 编辑弹窗显示与否
let editDialogVisible = ref(false)
</script>

<style scoped lang='scss'>
.infoCard{

    .info{

        .username{
            padding: 0.6em 0;
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
                display: flex;
                align-items: center;
                padding: .5em .3em;
                transition: .4s;
                cursor: pointer;
                .main{
                    padding-left: .4em;
                }
            }
            .edit:hover{
                color: #0077B6;
            }
            .logout:hover{
                color: #B22222;
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
        cursor: pointer;
    }
}
</style>