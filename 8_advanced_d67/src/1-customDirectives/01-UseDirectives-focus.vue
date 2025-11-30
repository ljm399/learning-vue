<script setup>
//使input获取焦点
//方法一
// import { onMounted, ref} from 'vue';
// // 获取组件实例
// const inputRef = ref()

// onMounted(() => {
//   inputRef.value.focus()
//   console.log("inputRef",inputRef)

// })

//方法二:导入对应方法
// import useInput from './hooks/index.js'
// const inputRef  = useInput()

//方法三:自定义指令(局部)
//注意:v开头f要大写
// const vFocus = {
//   //mounted是指令的生命周期函数,与setup,compositionAPi什么无关
//   mounted(el) {
//     el.focus()
//   }
// }
</script>

<script>
//方法四:局部自定义指令(optionApi)
// export default {
//   directives: {
//     focus: {
//       //mounted是指令的生命周期函数,与setup,compositionAPi什么无关
//       mounted(el) {
//         el?.focus()
//         // console.log(el)
//       }
//     }
//   }
// }
</script>

<template>
  <div class="app">
    <h3>非指令</h3>

    <!-- ref="inputRef"的作用: 为了让js中通过const inputRef = ref()获取input元素,然后在onMounted中使用 -->
    <input type="text" ref="inputRef">

    <h3>自定义指令(焦点获取只能一个,记得注释其他)</h3>
    <input type="text" v-focusa>
  </div>
</template>


<style scoped>

</style>