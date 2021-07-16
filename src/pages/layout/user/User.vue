<template>
  <section class="user">
    <el-table :row-class-name="rowBgc" :data="tableData" style="width: 100%">
      <el-table-column prop="dt" label="日期"> </el-table-column>
      <el-table-column prop="name" label="实验分组"> </el-table-column>
      <el-table-column prop="indicator" label="实验指标"> </el-table-column>
    </el-table>
    <el-pagination
      :page-size="5"
      :current-page="1"
      @current-change="currentChange"
      layout="prev, pager, next"
      :total="data.length"
    >
    </el-pagination>
    <el-button @click="showLoading">打开loading</el-button>
    <el-button style="position: fixed;z-index: 99999" @click="closeLoading">关闭loading</el-button>
  </section>
</template>

<script lang="ts">
import { ComponentInternalInstance, ComponentPublicInstance, defineComponent, getCurrentInstance, ref } from 'vue'
export default defineComponent({
  name: 'User',
  setup() {
    const showLoading = () => {
      window.app!.$loading.show()
    }
    const closeLoading = () => {
     window.app!.$loading.hide()
    }
    const data: any = [
      {
        dt: '20160501',
        name: '2258599',
        indicator: '28912',
      },
      {
        dt: '20160501',
        name: '2258600',
        indicator: '28912',
      },
      {
        dt: '20160501',
        name: '差值',
        indicator: '28912',
      },
      {
        dt: '20160501',
        name: 'P值',
        indicator: '28912',
      },
      {
        dt: '20160502',
        name: '2258599',
        indicator: '28912',
      },
      {
        dt: '20160502',
        name: '2258600',
        indicator: '28912',
      },
      {
        dt: '20160502',
        name: '差值',
        indicator: '28912',
      },
      {
        dt: '20160502',
        name: 'P值',
        indicator: '28912',
      },
      {
        dt: '20160503',
        name: '2258599',
        indicator: '28912',
      },
      {
        dt: '20160503',
        name: '2258600',
        indicator: '28912',
      },
      {
        dt: '20160503',
        name: '差值',
        indicator: '28912',
      },
      {
        dt: '20160503',
        name: 'P值',
        indicator: '28912',
      },
      {
        dt: '20160504',
        name: '2258599',
        indicator: '28912',
      },
      {
        dt: '20160504',
        name: '2258600',
        indicator: '28912',
      },
      {
        dt: '20160504',
        name: '差值',
        indicator: '28912',
      },
      {
        dt: '20160504',
        name: 'P值',
        indicator: '28912',
      },
      {
        dt: '20160505',
        name: '2258599',
        indicator: '28912',
      },
      {
        dt: '20160505',
        name: '2258600',
        indicator: '28912',
      },
      {
        dt: '20160505',
        name: '差值',
        indicator: '28912',
      },
      {
        dt: '20160505',
        name: 'P值',
        indicator: '28912',
      },
    ]

    let _data: any = ref([
      ...Object.values(
        data.reduce((prev: any, curr: any) => {
          prev[curr.dt] = prev[curr.dt] || []
          prev[curr.dt].push(curr)
          return prev
        }, {})
      ),
    ])
    for (let i = 0; i < _data.value.length; i++) {
      const e: any = _data.value[i]
      for (let j = 0; j < e.length; j++) {
        const ele = e[j]
        if (i % 2 !== 0) {
          ele.bgColor = 'gray'
        }
      }
    }
    _data = ref(_data.value.flat(1))
    console.log(_data.value[0])
    // console.log('_data:',_data.value[0])
    const rowBgc = ({ row, rowIndex }: { row: any; rowIndex: any }) => {
      // return _data[rowIndex].bgColor
      return row.bgColor
    }
    let tableData = ref(_data.value.slice(0, 5))
    const currentChange = (currPage: number) => {
      tableData.value = _data.value.slice((currPage - 1) * 5, (currPage - 1) * 5 + 5)
    }
    return {
      rowBgc,
      currentChange,
      tableData,
      data,
      showLoading,
      closeLoading,
    }
  },
})
</script>

<style lang="scss" scoped>
::v-deep(.gray) {
  background-color: rgb(245, 245, 245);
}
// ::v-deep(.el-table__header) {
//   .cell {
//     color: #597191;
//   }
// }
</style>