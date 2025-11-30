<template>
  <div class="app">
    <h2>{{ message }}</h2>
    <Son></Son>
    <!-- tip提示v-on的值可以赋值(表达式) -->
    <button @click=" message = '编译' ">translate</button>
  </div>
</template>

<script>
import Son from './son.vue'
import { computed } from 'vue'
export default {
  components: { Son },
  data() {
    return {
      message: 'complied'
    }
  },
  
  //provide属性/inject属性:父组件给子孙不一定是子组件传递数据

  //provide是个函数,返回一个对象,这个对象的属性值可以是函数,也可以是任意数据类型
  provide() {
    //tip提示this指向的是当前组件这个实例对象

    return {
      name : 'cao',
      age : 22,

      
      //computed函数不是computed属性(这里要导入computed函数:import { computed } from 'vue'):作用处理响应式数据
      // 因为provide里的值传递给子元素的值不是响应式数据,所以子孙组件的数据在template中不被修改,在js中修改了
      //故使用computed函数,
      //tip提示,要是this.message有双引号,这要xx.value,因为computed用到了ref对象
      //ref作用:可以将普通数据类型的数据转换成响应式数据,有双引号可能没解包,加value就行了
      
      // message  : this.message不行
      message : computed( ()=> {
        return this.message
      })
     
    }
  }
  
  
}
</script>

<style scoped>

</style>

