<template>
  <section class="aside">
    <el-menu
      text-color="#686a6e"
      active-text-color="#1a8aff"
      router
      :default-active="$route.path"
      :collapse="isCollapse"
    >
      <el-menu-item v-for="item in menuList" :index="item.path" :key="item.id">
        <i :class="[item.icon]" />
        <template #title>
          <span>{{ item.title }}</span>
        </template>
      </el-menu-item>
    </el-menu>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
const useInitData = () => {
  const menuList = [
    {
      id: 1,
      title: '数据预览',
      icon: 'el-icon-pie-chart',
      path: '/layout/chart',
    },
    {
      id: 2,
      title: '用户列表',
      icon: 'el-icon-user',
      path: '/layout/user',
    },
    {
      id: 3,
      title: '题库列表',
      icon: 'el-icon-edit-outline',
      path: '/layout/question',
    },
    {
      id: 4,
      title: '企业列表',
      icon: 'el-icon-office-building',
      path: '/layout/business',
    },
    {
      id: 5,
      title: '学科列表',
      icon: 'el-icon-notebook-2',
      path: '/layout/subject',
    },
  ]
  // const defaultActive = ref<string>('/layout/chart')
  return {
    menuList,
    // defaultActive,
  }
}
export default defineComponent({
  name: 'Aside',
  props: ['isCollapse'],
  setup() {
    const initData = useInitData()
    return {
      ...initData,
    }
  },
})
</script>

<style lang="scss" scoped>
.aside {
  .el-menu {
    // 展开时的动画
    transition: width 0.2s;
    border-right: none;
    .el-menu-item {
      width: 200px;
      &:focus {
        background-color: #fff;
      }
    }
  }
}
</style>
