<template>
  <Suspense>
    <router-view />
  </Suspense>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'App',
})
</script>

<style>
@import url(@/styles/main.scss);
.app {
  height: 100%;
}
#nprogress div.spinner {
  display: none;
}
</style>
