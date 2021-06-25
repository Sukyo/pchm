<template>
  <section class="NotFound"></section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'NotFound',
})
</script>

<style lang="scss" scoped>
.NotFound {
  height: 100%;
  background: url(@/assets/404.png) center no-repeat;
  background-size: cover;
}
</style>