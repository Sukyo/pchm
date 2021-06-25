<template>
  <section class="layout">
    <Header @changeCollapse="changeCollapse" v-model:isCollapse="isCollapse" v-model:userInfo="userInfo" />
    <section class="container">
      <Aside v-model:isCollapse="isCollapse" />
      <Main class="main" />
    </section>
  </section>
</template>

<script lang="ts">
import { defineComponent, defineAsyncComponent, reactive, ref } from 'vue'
import { getLocal } from '@/utils/local'
import { getUserInfo, UserInfo } from '@/api/user'

const useInitData = async () => {
  const fetchUserInfo = async () => {
    const res = await getUserInfo()
    const userInfo = reactive<UserInfo>(res.data)
    return userInfo
  }
  const userInfo = await fetchUserInfo()
  // 菜单折叠状态
  const isCollapse = ref<boolean>(false)
  const changeCollapse = () => (isCollapse.value = !isCollapse.value)
  return {
    userInfo,
    isCollapse,
    changeCollapse,
  }
}
export default defineComponent({
  name: 'Layout',
  components: {
    Header: defineAsyncComponent({
      loader: () => import('@/pages/layout/components/layout/Header.vue'),
    }),
    Main: defineAsyncComponent({
      loader: () => import('@/pages/layout/components/layout/Main.vue'),
    }),
    Aside: defineAsyncComponent({
      loader: () => import('@/pages/layout/components/layout/Aside.vue'),
    }),
  },
  beforeRouteEnter(to: any, from: any, next: any) {
    // 没有登录就去登录页,登录了就放行
    if (!getLocal('token')) {
      return next('/login')
    }
    return next()
  },
  async setup() {
    const initData = await useInitData()
    return {
      ...initData,
    }
  },
})
</script>

<style lang="scss" scoped>
.layout {
  display: flex;
  flex-direction: column;
  height: 100%;
  .container {
    display: flex;
    height: calc(100% - 60px);
  }
}
</style>