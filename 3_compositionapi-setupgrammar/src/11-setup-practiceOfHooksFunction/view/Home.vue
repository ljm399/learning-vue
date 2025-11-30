<template>
  <div class="app">
    <h2>
      Home:{{ counter }}
    </h2>
    <button @click="add">add</button>
  </div>
</template>

<script>
import Add from '../Hooks/add'
import useTitle from '../Hooks/useTittle.js'
export default {
  setup(){
    //解构赋值:
    //这里是调用函数后对函数返回的对象进行解构,必须要和结构的值相同,即返回值是add,要add去接受,这是js识别赋值功能,否则可能结构后赋值不了
    // 如你把这的add改为add1,那么解构后可能赋值不了
    const { add, counter } = Add()

    useTitle('首页')

    return {
      add,
      counter
    }
  }

}
</script>

<style scoped>

</style>

