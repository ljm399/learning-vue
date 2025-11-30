<template>
  <div class="app">
    <h2>{{ info }}</h2>
  </div>
  <show-info :info="info" @translateGut="translateGut"></show-info>
</template>

<script>
//readonly只读属性:防止子组件修改父组件的属性,阅读性差
//原理:readonly(info)返回一个代理对象,该对象对setter方法进行了劫持
// 单项数据流:违背直接报错,和纯函数意思相同:即不修改数据,只读取数据d


import showInfo from './showInfo'
import { reactive, readonly } from 'vue'
export default {
  components: {
    showInfo
  },
  setup() {
    const info = reactive({
      gut : 'gut',
      glimpse : 'glimpse'
    })

    const mean = readonly(info)

    function translateGut(payload) {
      info.gut = payload
    }

    return {
      info,
      translateGut,
      mean
    }

  }
  

}
</script>

<style scoped>

</style>

