<template>
  <div class="app">
    <h2>
      About:{{ counter }}
    </h2>
    <button @click="add">add</button>

    <div>需求:点击标题改变</div>
     <button @click="changeMusic">关于-音乐</button>
    <button @click="changeProfit">关于-个人</button>
    <button @click="changeGame">关于-游戏</button> 

  </div>
</template>

<script>
// import { ref } from 'vue'
import Add from '../Hooks/add.js'
import useTitle from '../Hooks/useTittle';
export default {
  setup() {
    //既然是函数式编程(函数是对象),则里面的代码可以像对象一样提取和复用
    // const counter = ref(0)
    // function add() {
    //   counter.value++
    // }

    //1,一直调用不符合编程思想
    // useTitle('关于')
    // function changeMusic() {
    //   useTitle('关于-音乐')
    // }
    // function changeProfit() {
    //   useTitle('关于-个人')
    // }
    // function changeGame() {
    //   useTitle('关于-游戏')
    // }

    //1,2优化

    //外层若只用返回值,则函数只在调用才执行其他不行,所有函数里面要用watch监听变化
    const title = useTitle('关于')//接受返回值
    // console.log('i am title',title)
    function changeMusic() {
      title.value = '关于-音乐'
    }
    function changeProfit() {
      title.value = '关于-个人'
    }
    function changeGame() {
      title.value = '关于-游戏'
    }

    //return返回值用法2
    return {
      ...Add(),
      changeMusic,
      changeProfit,
      changeGame
    }
  }
}
</script>

<style scoped>

</style>

