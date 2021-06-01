<template>
  <section class="NotFound">
      <h1>{{msg}}</h1>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    name: 'NotFound',
    setup() {
        return {
            msg: '您要的页面不见了~'
        }
    },
})
</script>

<style>

</style>