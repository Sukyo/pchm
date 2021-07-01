<template>
  <section class="aside">
    <el-menu
      text-color="#686a6e"
      active-text-color="#1a8aff"
      router
      :default-active="$route.path"
      :collapse="isCollapse"
    >
      <MenuList v-model:menuList="menuList" />
    </el-menu>
  </section>
</template>

<script lang="ts">
import { defineAsyncComponent, defineComponent, ref } from 'vue'
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
  components: {
    MenuList: defineAsyncComponent({
      loader: () => import('@/pages/layout/components/layout/components/MenuList.vue'),
    }),
  },
})
</script>

<style lang="scss" scoped>
.aside {
  .el-menu {
    // 展开时的动画
    transition: width 0.2s;
    border-right: none;
    min-width: 200px;
    .el-menu-item {
      &:focus {
        background-color: #fff;
      }
    }
  }
}
</style>
