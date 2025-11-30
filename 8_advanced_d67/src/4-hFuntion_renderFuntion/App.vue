<script setup>
//#region 一认识h函数和render函数(使用可以把template删了)
  /* 
    1,渲染过程:
    template -> render函数 -> 虚拟dom -> dom
    使用这两个函数相当于直接跳过template -> render函数的过程

    2,render函数 -> 虚拟dom这个过程通过h函数(即createVNode函数的缩写)实现
    具体过程:创造DOM元素节点,先调用render函数,render函数中调用h函数,h函数返回虚拟dom

    3,h函数:
    h函数接收三个参数:
    1,标签类型(字符串)
    2,属性对象(可选),可为null
    3,子元素(可选)
  */
//#endregion

//#region 关于compositionAPI和optionAPI的使用render函数不同解释
  /* 
    optionApi使用render是  return h("div", { className: "app" },)
    而composition中的  return () => h('div', { className : 'app'}要返回值


    compositionApi中使用原因
    1,首先组合 API 的核心思想是基于响应式数据来组织组件逻辑

    2,箭头函数是一个渲染函数,为什么,是因为他返回vNode函数
    直接返回 VNode 是静态的，没有响应式，而返回渲染函数则允许 Vue 动态生成 VNode有
    同时直接返回VNode 是静态的，Vue 只会在初次渲染时使用它,而渲染函数是在组件的生命周期中由 Vue 调用的,即渲染函数则在每次需要渲染时运行

    3,这里的第二点和下面的{ ()=>this.count++ }只有在事件发生时，才会执行其内部的逻辑如同
     click: function() {
       this.count++
     }当调用click时才会执行this.count++,而不是()=>this.count++会自动执行
     只不过() => h(...)这个是渲染函数,这个函数在组件的生命周期内会被 Vue 自动调用
     而click是点击是才会调用,返回的this.count++/vNode是响应式的

    optionApi中使用原因
    render 函数在组件的生命周期内会被 Vue 自动调用,即可以多次触发和composition一样
    同时你可以直接使用 this 来访问组件的状态和方法


    和对象语法是{ this.count++ }报错原因相同
    原因:
     1,直接写表达式会导致渲染时立即执行，而不是在事件触发时执行,
     不符合component代码理念:组合 API 的核心思想是基于响应式数据来组织组件逻辑(重点响应式数据,你这直接执行就不是了)

     2,{ ()=>this.count++ }只有在事件发生时，才会执行其内部的逻辑如同
     click: function() {
       this.count++
     }当调用click时才会执行this.count++,而不是()=>this.count++会自动执行
  */
//#endregion
import Op from './optionApi.vue'
import Cp from './setup.vue'
</script>

<template>
  <div class="app">
    optionAPI中使用
    <Op />
    <hr>
    compositionAPI中使用
    <Cp />
  </div>
</template>


<style scoped>

</style>