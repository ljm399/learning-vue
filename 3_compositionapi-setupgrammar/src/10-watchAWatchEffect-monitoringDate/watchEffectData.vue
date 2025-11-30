<template>
  <div class="app">
    <h3>{{ words.proportion }}- {{ words.counter }} - {{ words.portion }}</h3>
    <button @click="counter">其他</button>
  </div>
</template>

<script>
import { watchEffect, reactive } from 'vue';

//watch监听和watchEffect监听的区别:
//1,watchEffect不需要指定监听的data,他会自动收集依赖,只要依赖变化就会执行回调
//2,watchEffect自动开始监听,不需要immediate:true
//3,watch可以拿到更新的值和之前的值,watchEffect不能拿到更新前的值
//要是watch拿不到更新前的值,试试制定的监听源改为()=>({...data})

export default {
  setup() {
    console.log('======i am watchEffect============')
    const words = reactive({
      proportion: '比例',
      portion: '部分',
      counter: 0
    })

    const stopWatch = watchEffect(() => {
      console.log('watchEffect', words.portion, words.proportion, words.counter)



      //终止监听
      if (words.counter > 6) {
        stopWatch()
      }
    })

    function counter() {
      words.proportion = '部分'
      words.counter++
    }

    return { words, counter }
  }
}
</script>

<style scoped>

</style>

