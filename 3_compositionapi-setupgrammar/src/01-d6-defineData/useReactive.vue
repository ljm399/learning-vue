<template>
  <div class="app">
    <h1>reactive</h1>
    <div>{{ gun }}</div>
    <div>{{ gunRat }}- {{ gunRat2.mankind }} - {{ gunRat2.ignore }}</div>
    <button @click="changeMsg">translate</button>
    <div></div>
    <input v-model="inputData.name" />
    <input v-model="inputData.password" />
  </div>
</template>

<script>
//Reactive响应式数据
import {  reactive } from "vue";
export default {
  setup() {
    //defineDate定义数据/reactive定义响应式数据/ref定义响应式数据

    //1,非响应式
    let gun = '肠道'

    //2,reactive响应式数据/reactive函数:定义复杂数据(数组和对象),用途本地数据和数据之间有关的数据(如input的密码和账号)
    //本质:reactive函数处理的数据,会收集依赖,数据改变时,会通知依赖更新,optionapi的data原理就是reactive,但reactive可以分开写

    //2.1,数组
    const gunRat = reactive(['肠道', '决心', '意志', '本能'])

    //2.2,对象
    const gunRat2 = reactive({
      mankind : 'mankind',
      ignore : 'ignore'
    })

    function changeMsg() {
      gun = 'other',
      console.log(gun),
      gunRat2.mankind = '人类',
      // tip提示逗号,函数里面的最后一行代码加逗号会报错
      gunRat2.ignore = '忽略'
    }

    //2.3,用于本地数据
    const inputData = reactive({
      name : 'mjl',
      password : '123456'
    })


    return {
      gun,
      gunRat,
      gunRat2,
      inputData,
      changeMsg
    }
  }
}
</script>

<style scoped>

</style>
