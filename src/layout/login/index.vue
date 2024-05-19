<template>
    <el-dialog v-model="userStore.loginDialogVisible" width="30%" @close="closeDialog" z-index="10">
        <div v-if="state === 'login'" class="login_container">
            <div class="title"><span class="active">登录</span>&nbsp;&frasl;&nbsp;<span @click="state = 'register'">注册</span></div>
            <div class="bg_image"></div>
            <div class="content" @keyup.enter="login">
                <el-form>
                    <el-form-item>
                        <el-input v-model="loginForm.phone" prefix-icon="User" placeholder="请输入您的手机号"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-input v-model="loginForm.password" prefix-icon="Lock" type="password" show-password placeholder="请输入您的密码"></el-input>
                    </el-form-item>
                </el-form>
                <div class="login_btn"><el-button @click="login" type="primary" style="width: 100%;">登录</el-button></div>
            </div>
        </div>
        <div v-else-if="state === 'register'" class="login_container">
            <div class="title"><span @click="state = 'login'">登录</span>&nbsp;&frasl;&nbsp;<span class="active">注册</span></div>
            <div class="bg_image"></div>
            <div class="content" @keyup.enter="register">
                <el-form>
                    <el-form-item>
                        <el-input v-model="registerForm.phone" disabled prefix-icon="User" placeholder="请输入您的手机号"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-input v-model="registerForm.password" disabled prefix-icon="Lock" type="password" show-password placeholder="请输入您的密码"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-input v-model="registerForm.code" disabled prefix-icon="Promotion" placeholder="请输入您的验证码">
                            <template #append><span>发送验证码</span></template>
                        </el-input>
                    </el-form-item>
                </el-form>
                <div class="login_btn"><el-button disabled @click="register" type="primary" style="width: 100%;">暂不支持注册</el-button></div>
            </div>
        </div>
    </el-dialog>
    <DragPopWidget v-if="route.meta.dragPopWidget" />
</template>

<script setup lang='ts'>
defineOptions({ name: 'Login' })
import useUserStore from '@/store/modules/user'
import DragPopWidget from '@/layout/dragPopWidget/index.vue'
import { reactive, ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const userStore = useUserStore()
// 声明当前用户是在进行登录状态还是注册状态，默认登录状态
let state = ref<'login' | 'register'>('login')
// 登录表单
let loginForm = reactive({
    phone: '',
    password: ''
})
// 注册表单
let registerForm = reactive({
    phone: '',
    password: '',
    code: ''
})
const login = async () => {
    await userStore.userLogin(loginForm)
}
const register = () => {
    let result: any = userStore.userRegister(registerForm)
    if(result.code === 200){
        console.log('注册成功')
    }
}
// 关闭登录框时，清空表单数据，设置默认打开为login
const closeDialog = () => {
    state.value = 'login'
    Object.assign(loginForm, { phone: '', password: '' })
    Object.assign(registerForm, { phone: '', password: '', code: '' })
}
</script>

<style scoped lang='scss'>
.login_container{
  position: relative;
  width: 100%;
  height: 350px;
  margin: 0 auto;

  .title{
    position: absolute;
    top: 0;
    right: 0;
    width: 40%;
    height: 30%;
    display: flex;
    align-items: baseline;
    margin-top: 10%;
    margin-left: 10%;
    span{
        cursor: pointer;
    }

    .active{
        color: $main-color;
        font-size: 1.1em;
    }
  }
  .bg_image{
    position: absolute;
    top: 0;
    left: 0;
    width: 60%;
    height: 40%;
    background-image: url('@/assets/images/login_bg.png');
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
  }
  .content{
    position: absolute;
    right: 0;
    bottom: 0;
    width: 70%;
    height: 60%;
    margin-right: 15%;
  }
}
</style>