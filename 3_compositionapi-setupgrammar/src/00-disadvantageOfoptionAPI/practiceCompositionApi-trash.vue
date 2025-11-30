<template>
  <div class="app">
    <h1>{{ counter }}</h1>
    <button @click="add">+</button>
    <button @click="sub">-</button>
  </div>
</template>

<script>
// import { ref } from 'vue'
import UseCounter from './utils/useCounter.js'
export default {
  setup() {
    // const counter = ref(0)
    // function add() {
    //   counter.value++

    //   //当数据不是响应式数据时,测试用clg,因为js里面的数据变化了
    //   console.log('counter')
    // }

    // function sub() {
    //   counter.value--
    // }

    //return几种用法
    //第一种返回上面的代码
    // return {
    //   counter,
    //   add,
    //   sub,
    // }

    //第二种处理引入的js数据
      // const { counter, add, sub } = UseCounter()//加括号因为要调用引入的函数,要是UseCounter只是定义为,则不用加括号
      // return {
      //   counter,
      //   add,
      //   sub
      // }

      //第三种
      return {
        ...UseCounter()
      }

  }
}
</script>

<style scoped>

</style>

