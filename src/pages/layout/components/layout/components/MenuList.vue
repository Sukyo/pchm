<template>
  <section class="menuList">
    <template v-for="item in menuList" :key="item.id">
      <el-submenu :index="item.path" v-if="item.children">
        <template #title>
          <i :class="[item.icon]" />
          <span>{{ item.title }}</span>
        </template>
        <MenuList v-model:menuList="item.children" />
      </el-submenu>
      <el-menu-item v-else :index="item.path">
        <template #title>
          <i :class="[item.icon]" />
          <span>{{ item.title }}</span>
        </template>
      </el-menu-item>
    </template>
  </section>
</template>

<script>
/**
 * 递归生成菜单组件
 */
import { defineAsyncComponent } from 'vue'
export default {
  name: 'MenuList',
  props: ['menuList'],
  components: {
    MenuList: defineAsyncComponent({
      loader: () => import('@/pages/layout/components/layout/components/MenuList.vue'),
    }),
  },
}
</script>

<style lang="scss" scoped>
.menuList {
}
</style>