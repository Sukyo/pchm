<template>
  <section class="main">
    <router-view />
  </section>
</template>

<script>
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'Main',
})
</script>

<style lang="scss" scoped>
.main {
  flex: 1;
  padding: 20px;
  background-color: #e8e9ec;
  box-shadow: 5px 5px 5px #dadbdd inset;
}
</style>