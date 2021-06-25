<template>
  <section class="registerDialog">
    <el-dialog width="600px" :model-value="visible" @close="close" :show-close="false" :close-on-click-modal="false">
      <template #title>
        <div class="title">用户注册</div>
      </template>
      <el-form ref="formRef" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="头像" prop="avatar">
          <el-progress v-if="uploading" type="circle" :percentage="percentage"></el-progress>
          <el-upload
            v-else
            class="avatar-uploader"
            :action="uploadUrl"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            :on-progress="handleUploading"
            :data="data"
          >
            <img v-if="form.avatar" :src="`${API_URL}/${form.avatar}`" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="昵称" prop="username">
          <el-input v-model="form.username" />
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="form.email" />
        </el-form-item>
        <el-form-item label="手机" prop="phone">
          <el-input v-model="form.phone" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input :type="passwordType" v-model="form.password">
            <template #suffix>
              <i class="el-icon-view" @click="viewPassword" :class="{ active: activeView }"></i>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item label="图形码" prop="code">
          <el-row :gutter="20">
            <el-col :span="16">
              <el-input v-model="form.code" />
            </el-col>
            <el-col :span="8">
              <el-image class="image-code" @click="changeImageCode" :src="imageCodeUrl"></el-image>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="验证码" prop="rcode">
          <el-row :gutter="20">
            <el-col :span="16">
              <el-input v-model="form.rcode" />
            </el-col>
            <el-col :span="8">
              <el-button v-if="count === 6" @click="getRcode">获取用户验证码</el-button>
              <el-button v-else :disabled="count !== 6">{{ count }}秒后再次获取</el-button>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="close">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </template>
    </el-dialog>
  </section>
</template>

<script lang="ts">
import {
  defineComponent,
  ComponentPublicInstance,
  getCurrentInstance,
  onMounted,
  reactive,
  Ref,
  ref,
  toRefs,
  unref,
} from 'vue'
import { ElMessage as Message } from 'element-plus'
import { Rules } from '@/types/elementuiPlus'
import { register, sendSms } from '@/api/user'
interface UploadSuccessResponse {
  code: number
  data: { file_path: string }
  message: string
}
interface ComponentInstance extends ComponentPublicInstance {
  $rules?: Rules
}
export default defineComponent({
  name: 'RegisterDialog',
  props: {
    visible: {
      type: Boolean,
      required: true,
      default: (): boolean => false,
    },
  },
  setup(props, ctx) {
    const state = reactive({
      API_URL: import.meta.env.VITE_API_URL,
      uploadUrl: `${import.meta.env.VITE_API_URL}/uploads`, // 头像上传地址
      imageCodeUrl: `${import.meta.env.VITE_API_URL}/captcha?type=sendsms`, // 图形码url
      form: {
        avatar: '', // 头像地址
        username: '', // 昵称
        email: '', // 邮箱
        phone: '', // 手机
        password: '', // 密码
        code: '', // 图形码
        rcode: '', // 验证码
      },
      // 上传时的附带参数
      data: {
        image: {},
      },
      uploading: false, // 是否展示进度
      percentage: 0, // 进度
      activeView: false, // 查看密码active样式
      passwordType: 'password', // 密码框类型
      count: 6, // 倒计时
    })
    // 制定表单校验规则
    const $rules: Rules = (getCurrentInstance()!.proxy as ComponentInstance).$rules!
    const { requiredChange, requiredBlur, requiredEmail, requiredPhone, requiredCode } = $rules
    const rules = reactive({
      avatar: requiredChange && requiredChange({ fieldLabel: '头像' }),
      username: requiredBlur && requiredBlur({ fieldLabel: '昵称' }),
      password: requiredBlur && requiredBlur({ fieldLabel: '密码' }),
      email: requiredEmail && requiredEmail,
      phone: requiredPhone && requiredPhone,
      code: requiredCode && requiredCode({ fieldLabel: '图形码' }),
      rcode: requiredCode && requiredCode(),
    })
    // 获取表单ref
    const formRef: Ref = ref(null)
    // 表单提交
    const submit = () => {
      unref(formRef).validate((valid: boolean) => {
        if (!valid) return
        register(state.form)
          .then((res: any): void => {
            Message({
              type: 'success',
              message: '注册成功',
              duration: 2000,
            })
            close()
          })
          .catch((res: any) => {
            Message({
              type: 'error',
              message: res.data.message,
              duration: 2000,
            })
          })
      })
    }
    // 获取用户验证码
    const getRcode = () => {
      let errorCount = 0
      unref(formRef).validateField(['phone', 'code'], (errorMsg: string) => {
        // 记录没有错误信息的字段个数
        if (Object.is('', errorMsg)) {
          errorCount += 1
        }
      })
      // 如果两个都没有,就获取验证码
      if (errorCount === 2) {
        // 先倒计时一秒禁用按钮防止连续点击
        state.count -= 1
        sendSms({
          phone: state.form.phone,
          code: state.form.code,
        })
          .then((res: any) => {
            if (res.code === 200) {
              Message({
                type: 'success',
                message: String(res.data.captcha),
              })
            } else {
              Message({
                type: 'error',
                message: res.message,
              })
            }
          })
          .finally(() => {
            // 重置验证码
            changeImageCode()
            // 进入倒计时
            const timer = setInterval(() => {
              if (state.count === 1) {
                state.count = 6
                clearInterval(timer)
                return
              }
              state.count -= 1
            }, 1000)
          })
      }
    }
    // 更换图形码
    const changeImageCode = () => {
      state.imageCodeUrl = `${import.meta.env.VITE_API_URL}/captcha?type=sendsms&t=${Date.now()}`
    }
    // 上传中的回调
    const handleUploading = (progress: ProgressEvent & { percent: number }) => {
      // 赋值进度
      state.percentage = ~~progress.percent
      // 显示进度圈
      state.uploading = true
    }
    // 密码的查看和隐藏
    const viewPassword = () => {
      state.activeView = !state.activeView
      if (state.activeView) {
        state.passwordType = 'text'
      } else {
        state.passwordType = 'password'
      }
    }
    // 上传成功的回调
    const handleAvatarSuccess = (response: UploadSuccessResponse) => {
      if (response.code === 200) {
        // 隐藏进度
        state.uploading = false
        state.form.avatar = `${response.data.file_path}`
        Message({
          type: 'success',
          message: '上传成功',
          duration: 2000,
        })
      }
    }
    // 上传前的回调
    const beforeAvatarUpload = (file: File) => {
      const { size, type } = file
      // 校验文件格式
      const typeIsValid = ['image/gif', 'image/png', 'image/jpeg'].includes(type)
      if (!typeIsValid) {
        Message({
          type: 'warning',
          message: '上传的文件类型只能是图片!',
          duration: 2000,
        })
        return typeIsValid
      }
      // 校验文件大小
      const sizeIsValid = ~~(size / 1024 / 1024) < 2
      if (!sizeIsValid) {
        Message({
          type: 'warning',
          message: '头像大小不能超过2M!',
          duration: 2000,
        })
        return sizeIsValid
      }
      // 文件校验通过后给上附加参数:要上传的文件对象
      if (sizeIsValid && typeIsValid) {
        state.data.image = file
        return sizeIsValid && typeIsValid
      }
    }
    const close = () => {
      unref(formRef).resetFields()
      ctx.emit('update:visible', false)
    }
    return {
      ...toRefs(state),
      rules,
      close,
      handleAvatarSuccess,
      beforeAvatarUpload,
      handleUploading,
      viewPassword,
      changeImageCode,
      submit,
      formRef,
      getRcode,
    }
  },
})
</script>

<style lang="scss" scoped src="./RegisterDialog.scss">
</style>