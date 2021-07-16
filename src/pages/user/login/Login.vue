<template>
  <section class="login">
    <div class="left">
      <div class="title">
        <img src="@/assets/logo_title.png" alt="" />
        <h2 class="t1">刷题宝典</h2>
        <div class="t2"></div>
        <h2 class="t3">用户登录</h2>
      </div>
      <el-form ref="formRef" id="ref2" class="form" :model="form" :rules="rules">
        <el-form-item prop="phone">
          <el-input v-model="form.phone" placeholder="请输入手机号" prefix-icon="el-icon-user"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" v-model="form.password" placeholder="请输入密码" prefix-icon="el-icon-lock">
          </el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-row>
            <el-col :span="16">
              <el-input v-model="form.code" placeholder="请输入验证码" prefix-icon="el-icon-key"></el-input>
            </el-col>
            <el-col :span="8">
              <el-image class="checkCode-img" @click="changeCodeUrl" :src="form.verifyCodeUrl"></el-image>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item prop="agree">
          <el-checkbox class="agree-text" v-model="form.agree"
            >我已阅读并同意<el-link type="primary" href="https://www.baidu.com/">用户协议</el-link>和<el-link
              type="primary"
              href="https://www.sina.com.cn/"
              >隐私条款</el-link
            ></el-checkbox
          >
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="w100" @click="submitLogin">登录</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="w100" @click="showRegisterDialog">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="right">
      <img src="@/assets/login_banner_ele.png" alt="banner" />
    </div>
    <RegisterDialog v-model:visible="registerVisible" />
  </section>
</template>

<script lang="ts">
import {
  defineComponent,
  ComponentPublicInstance,
  reactive,
  getCurrentInstance,
  ref,
  onMounted,
  unref,
  Ref,
  defineAsyncComponent,
} from 'vue'
import { login } from '@/api/user'
import { Rules, Validator } from '@/types/elementuiPlus'
import { saveLocal, getLocal } from '@/utils/local'
import { ElMessage as Message } from 'element-plus'
import router from '@/router'
interface ComponentInstance extends ComponentPublicInstance {
  $rules?: Rules
}
export default defineComponent({
  name: 'Login',
  components: {
    RegisterDialog: defineAsyncComponent({
      loader: () => import('@/pages/user/components/register/RegisterDialog.vue'),
    }),
  },
  beforeRouteEnter(to: any, from: any, next: any) {
    // 已经登录就去首页,没登陆就放行
    if (getLocal('token')) {
      return next('/layout')
    }
    return next()
  },
  setup() {
    onMounted(()=>{
      changeCodeUrl();
    })
    // 获取全局规则对象
    const $rules: Rules = (getCurrentInstance()!.proxy as ComponentInstance).$rules!
    const { requiredBlur, requiredPhone, requiredCode } = $rules
    // 校验规则
    const rules = reactive({
      phone: requiredPhone,
      password: requiredBlur && requiredBlur({ fieldLabel: '密码' }),
      code: requiredCode && requiredCode(),
      agree: [{ validator: validateIsAgree }],
    })
    const showRegisterDialog = () => (registerVisible.value = true)
    return {
      form,
      rules,
      changeCodeUrl,
      submitLogin,
      formRef, // ref获取的dom一定要return出去
      registerVisible,
      showRegisterDialog,
    }
  },
})

// 表单数据
const form = reactive({
  verifyCodeUrl: `${import.meta.env.VITE_API_URL}/captcha?type=login`,
  agree: false,
  phone: '17673460246',
  password: '123',
  code: '1111',
})
// 注册框
const registerVisible: Ref<boolean> = ref<boolean>(false)
// 更改验证码
const changeCodeUrl = () => {
  form.verifyCodeUrl = `${import.meta.env.VITE_API_URL}/captcha?type=login&t=${Date.now()}`
}

const formRef: Ref = ref(null)
// 登录
const submitLogin = () => {
  // 校验表单
  unref(formRef).validate((valid: boolean) => {
    if (!valid) return
    login({
      phone: form.phone,
      password: form.password,
      code: form.code,
    }).then((res: any) => {
      if (res.code === 200) {
        Message({
          type: 'success',
          message: '登录成功',
          duration: 2000,
        })
        saveLocal({
          key: 'token',
          value: res.data.token,
        })
        router.push('/layout')
      } else {
        Message({
          type: 'error',
          message: res.message,
          duration: 2000,
        })
        changeCodeUrl()
      }
    })
  })
}
// 校验用户条款是否勾选
const validateIsAgree: Validator = (rule: any, value: any, callback: any): any => {
  if (!value) return callback(new Error('请勾选用户协议和隐私条款'))
  return callback()
}
</script>

<style lang="scss" scoped src="./Login.scss">
</style>