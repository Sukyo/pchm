<template>
  <section class="login">
    <div class="left">
      <div class="title">
        <img src="@/assets/logo_title.png" alt="" />
        <h2 class="t1">刷题宝典</h2>
        <div class="t2"></div>
        <h2 class="t3">用户登录</h2>
      </div>
      <el-form ref="formRef" class="form" :model="form" :rules="rules">
        <el-form-item prop="phone">
          <el-input v-model="form.phone" placeholder="请输入手机号" prefix-icon="el-icon-user"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="form.password" placeholder="请输入密码" prefix-icon="el-icon-lock"></el-input>
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
          <el-button type="primary" class="w100" @click="login">登录</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="w100">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="right">
      <img src="@/assets/login_banner_ele.png" alt="banner" />
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, reactive, getCurrentInstance, ref, onMounted } from 'vue'

export default defineComponent({
  name: 'Login',
  setup() {
    const form = reactive({
      verifyCodeUrl: `${import.meta.env.VITE_API_URL}/captcha?type=login`,
      agree: false,
      phone: '',
      password: '',
      code: '',
    })
    // 获取全局规则对象
    const { $rules } = getCurrentInstance()?.proxy as any
    const rules = ref({
      phone: $rules.phone,
      password: $rules.requiredBlur('密码'),
      code: $rules.requiredBlur('验证码'),
      agree: $rules.requiredChange('用户协议和隐私条款'),
    })
    const changeCodeUrl = () => {
      form.verifyCodeUrl = `${import.meta.env.VITE_API_URL}/captcha?type=login?t=${Date.now()}`
    }
    let formRef = ref(null)
    const login = () => {
      console.log(formRef)
    }
    return {
      form,
      rules,
      changeCodeUrl,
      login,
    }
  },
})
</script>

<style lang="scss" scoped src="./Login.scss">
</style>