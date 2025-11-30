<script setup>
//setup语法糖:当使用SFC(单文件组件)和Composition API时,推荐用该语法
//理由:1,性能高(底层script的代码和template在一个作用域),2,代码简洁
//而顶层的绑定会暴露给模板(如变量,函数):
//顶层绑定就是顶层作用域(即最外层作用域)的绑定,以前在<script>/script>里在setup函数里面编译,不是最外层作用域
//SFC单文件组件中<script setup>只能有一个,普通的<script>也只能有一个
//template也是一个,但style标签可以有多个

//1,所有编写在顶层代码都是默认暴露给模板的
import { ref, onMounted } from 'vue'
import ShowInfo from './showInfo.vue'

//2,定义响应式数据
const count = ref(0)
console.log(count.value)

//3,定义绑定的函数
function add() {
  count.value++
}

//5,传递接受emits的函数
function addFunction(num){
  count.value += num
}

//6,获得组件实例
const showCpn = ref()
onMounted(() => {
  showCpn.value.foo()
})
</script>


<template>
  <div class="app">
    <h3>{{ count }}</h3>
    <button @click="add">add</button>
    <ShowInfo 
       title="翻译"
       cupboard="橱柜"
       @add3="addFunction"
       ref="showCpn"
     ></ShowInfo>
  </div>
</template>


<style scoped>

</style>

