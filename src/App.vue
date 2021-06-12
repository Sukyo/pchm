<template>
  <section class="app">
    <router-view />
    <div>{{ count }}</div>
    <Test v-model:msg="count"></Test>
  </section>
</template>
<script lang="ts">
import { ref, defineComponent } from 'vue'
import Test from './test.vue'
export default defineComponent({
  name: 'App',
  components: {
    Test,
  },
  setup(props) {
    const count = ref(0)
    return {
      count,
    }
  },
})
</script>

<style>
.app {
  height: 100%;
}
</style>
