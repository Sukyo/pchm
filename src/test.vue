<template>
  <div @click="onClickTest">{{ msg }}</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'test',
  props: {
    msg: {
      type: Number,
    },
  },
  methods: {
    onClickTest() {
      this.$emit('update:msg', 100)
    },
  },
})
</script>

<style>
</style>
