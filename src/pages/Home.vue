<template>
  <section class="home">
      <div>我是首页</div>
      <router-link to="/user/login"><el-button type="primary">登录</el-button></router-link>
      <router-link to="/user/register"><el-button type="primary">注册</el-button></router-link>
  </section>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
    name: 'Home'
})
</script>

<style type="scss">
  .home {
    height: 100vh;
    background-color: #ccc;
  }
</style>