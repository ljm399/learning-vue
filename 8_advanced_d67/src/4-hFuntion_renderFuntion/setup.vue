<script setup>
//setup语法糖中使用h函数和render函数(setup只能一个,无论语法糖即下面的setup必须注释,但script可以多个)
import { h,ref } from 'vue'
import Rubbish from './dontLook.vue' 
const count = ref(0)

//注意只要是在script里面使用的,则调用ref函数必须使用value
const render =() => h('div', { className : 'app'}, [
  h('h3', null, `当前计数为:${count.value}`),
  h('button', { onClick: () => count.value++ }, '+1'),
  h('button', { onClick: sub }, '-1'),
  h('p','下面是组件'),
  h(Rubbish)
])

function sub() {
  count.value--
}

</script>

<template>
  <!-- 使用语法糖setup则需要template,非语法糖setup不用template -->
  <render/>
</template>

<!-- <script>

  //setup非语法糖中使用h函数和render函数

import { h,ref } from 'vue'
import Rubbish from './dontLook.vue' 
export default {
  setup() {
    const count = ref(0)

    //注意只要是在script里面使用的,则调用ref函数必须使用value
    return () => h('div', { className : 'app'}, [
      h('h3', null, `当前计数为:${count.value}`),
      h('button', { onClick: () => count.value++ }, '+1'),
      h('button', { onClick: sub }, '-1'),
      h('p','下面是组件'),
      h(Rubbish)
    ])

    function sub() {
      count.value--
    }

  }
}
</script> -->

<style scoped>

</style>