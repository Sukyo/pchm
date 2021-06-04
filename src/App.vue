<template>
  <section class="app">
    <router-view />
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'App',
})
</script>

<style>
.app {
  height: 100%;
}
</style>
