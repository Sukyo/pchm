<template>
  <header class="header">
    <i @click="$emit('changeCollapse')" :class="isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'" />
    <img class="img_logo" src="@/assets/logo_main.png" />
    <h1 class="title">刷题宝典</h1>
    <el-avatar class="avatar" shape="circle" :size="43" :src="API_URL + '/' + userInfo.avatar" />
    <div class="username">{{ userInfo.username }}, 你好</div>
    <el-button type="primary" class="logout-btn" @click="handleLogoutClick"> 退出 </el-button>
  </header>
</template>

<script>
import { defineComponent } from 'vue'
import { ElMessageBox as MessageBox, ElMessage as Message } from 'element-plus'
import router from '@/router'
import { removeLocal } from '@/utils/local'
import { logout } from '@/api/user'
const useInitData = (props) => {
  /**
   * 注销登录
   */
  const handleLogoutClick = () => {
    MessageBox.confirm('确认退出登录吗?', {
      confirmButtonText: '确认',
      cancelButtonText: '点错了',
      type: 'warning',
    })
      .then(() => {
        Message({
          type: 'success',
          message: '退出登录成功',
        })
        // 删除远程token
        logout().then(() => {
          // 删除本地token
          removeLocal('token')
          // 跳转到登录页
          router.push('/login')
        })
      })
      .catch(() => {})
  }
  const API_URL = import.meta.env.VITE_API_URL
  return {
    handleLogoutClick,
    API_URL,
  }
}
export default defineComponent({
  name: 'Header',
  props: ['userInfo', 'isCollapse'],
  setup(props) {
    const initData = useInitData(props)
    return {
      ...initData,
    }
  },
})
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  align-items: center;
  height: 60px;
  padding: 0 20px;
  i {
    padding: 0 20px 0 0;
    font-size: 24px;
    cursor: pointer;
  }
  .title {
    margin: 0 auto 0 10px;
  }
  .img_logo {
    width: 33px;
    height: 28px;
  }
  h1 {
    font-size: 22px;
    color: #49a1ff;
  }
  .avatar {
    border: 2px solid #66b1ff;
  }
  .username {
    margin: 0 38px 0 9px;
    font-size: 14px;
    font-weight: 700;
    color: #636363;
  }
  .logout-btn {
    padding: 0;
    width: 57px;
    min-height: 28px;
    font-weight: 700;
  }
}
</style>