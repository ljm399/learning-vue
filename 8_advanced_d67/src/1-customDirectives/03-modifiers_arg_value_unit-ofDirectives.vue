<script setup>

//el即element的缩写
const message = "指令的参数和修饰符"
const vCao = {
  mounted(el, bindings) {
    // console.log('el',el) // 当前指令作用的dom元素
    console.log('bindings.arg',bindings.arg)//argmmmmm
    console.log('bindings.value',bindings.value)//即值message
    console.log('bindings.modifiers',bindings.modifiers)//即对象包含着修饰符
    setTimeout(() => {
      //#region 解释:没加ref也可以使其的template内容修改
         /* 
        自定义指令 v-cao 中的逻辑实际上绕过了 Vue 的响应式系统，因为它直接通过 JavaScript 操作 DOM 元素的内容
        message 不需要是响应式的，因为更新动作是由 setTimeout 和 mounted 钩子来控制的，而不是依赖 Vue 的响应式数据更新
        通过 v-cao 自定义指令，我们直接在 mounted 钩子中用 el.textContent = bindings.value 手动设置了元素的内容。
        这次更新是一次性、静态的，只在指令被挂载时触发一次，因此并不依赖 Vue 的响应式系统
          */
      //#endregion
      el.textContent = bindings.value
    },2000)
  },
  updated() {
    console.log('updated')
  }
}
</script>

<template>
  <div class="app">
    <h3>指令的参数和修饰符</h3>
    <!-- argm是参数--mj和abc是修饰符--message是值(三者可以只留一个或两个) -->
    <!-- message的值不能是0,false,null那些,否则h4不显示 -->
    <h4 v-cao:argmmmmm.mj.abc="message">我是参数</h4>
  </div>
</template>


<style scoped>

</style>