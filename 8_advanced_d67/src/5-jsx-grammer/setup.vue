<!-- <script setup lang="jsx">
//setup语法糖中使用jsx语法(setup只能一个,无论语法糖即下面的setup必须注释,但script可以多个)
import Rubbish from './dontlook.vue'
const count = ref(0)

//注意只要是在script里面使用的,则调用ref函数必须使用value
const jsx =() => (
     <div class='app'>
        <h1>{this.count}</h1>
        <button onClick={ () => count.value-- }>-1</button>
        <button onClick={ this.sub }>+1</button>
        <p>下面是组件</p>
        <Rb></Rb>
      </div>
)

function sub() {
  count.value--
}
</script>

<template>
  <div class="app">
    <jsx />
  </div>
</template> -->

<script lang="jsx">
 //setup非语法糖中使用h函数和render函数
import Rubbish from './dontlook.vue'
export default {
  setup() {
    const count = ref(0)

    //注意只要是在script里面使用的,则调用ref函数必须使用value
    // 加不加括号optionAPi文件中有解释
    return () =>  (
      <div class='app'>
        <h1>{this.count}</h1>
        {/* 可能不行 */}
        <button onClick={ () => count.value++ }>+1</button>
        <button onClick={ sub }>-1</button>
        <p>下面是组件</p>
        <Rubbish></Rubbish>
      </div>
      )

   const sub = () => {
    count.value--
    }
  }
}
</script>

<style scoped>

</style>