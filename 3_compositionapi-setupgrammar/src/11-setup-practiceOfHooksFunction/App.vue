<template>
  <div class="app">
    <!-- 需求:函数封装(在setup中调用),复用 -->
    <div>一,需求:增加(add)</div>
    <!-- <about/>
    <hr>
    <home/> -->
    <hr>
    <div>二,需求:点击切换标题(模仿:前端路由)</div>
    <component :is="currentPage"></component>
    <!-- warning报错:值要带''双引号 -->
    <button @click="currentPage = 'About'">about</button>
    <button @click="currentPage = 'Home'">home</button>
  </div>
  <hr>
  <div>三,需求:监听数据滚动并实现响应式</div>
     <h2>x: {{ scrollPosition.x }}</h2>
     <h2>y: {{ scrollPosition.y }}</h2>
</template>

<script>
//引入自定义滚动方法
import scrollWatch from "./Hooks/scrollWatch"
import About from "./view/About.vue"
import Home from "./view/Home.vue"
// import useTitle from './Hooks/useTittle'
import { ref } from "vue"
export default {
  components:{
    About,
    Home
  },
  setup() {
    //concept概念:函数式编程并不是完全有面向式编程装换过来,比如修改标题要使用原生(标题在public中,在package.jason的name)
    // document.title = '哈哈'

    const currentPage = ref("About")
    
    //warning报错:不能用解构赋值,因为返回的是个ref而不是对象,解构赋值会变成undefined,直接赋值或用Reactive(大概有解包(value)影响)
    const  scrollPosition = scrollWatch()
    //调用函数过程:1,scrollWatch()调用函数,2,用scrollPosition接收返回值
    //解构赋值意义:当返回值有多个值时,用解构赋值可以很方便的获取值如const{a,b} = scrollWatch(),可以一次性提取多个返回值(a,b尽量和返回值属性名一致)
    console.log(scrollPosition.value)

    return {
      currentPage,
      scrollPosition
    }
  }
}
</script>

<style scoped>

</style>

