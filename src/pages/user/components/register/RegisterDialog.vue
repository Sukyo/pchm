<template>
  <section class="registerDialog">
    <el-dialog v-model="visible" @close="close" :show-close="false" :close-on-click-modal="false">
      <template #title>
        <div class="title">用户登录</div>
      </template>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="close">取 消</el-button>
          <el-button type="primary" @click="close">确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </section>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'

export default defineComponent({
  name: 'RegisterDialog',
  props: {
    visible: {
      type: Boolean,
      // required: true,
      // default: (): boolean => false,
    },
  },
  setup(props, ctx) {
    const state = reactive({})
    // const close = () => ctx.emit('update:visible', false)
    return {
      // close,
    }
  },
  methods: {
    close() {
      this.$emit('update:visible', false)
    },
  },
})
</script>

<style lang="scss" scoped src="./RegisterDialog.scss">
</style>