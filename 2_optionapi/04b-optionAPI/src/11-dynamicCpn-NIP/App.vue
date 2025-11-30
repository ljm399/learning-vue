<template>
  <div class="app">
    <template v-for="(item,index) of cpn" :key="item">
      <button @click="currentItem = cpn[index]">{{ item }}</button>
    </template>

    <!-- dynamicCpn动态组件 -->
    <!-- 方法一 -->
    <!-- <template v-if="currentItem === 'About'">
      <About></About>
    </template>
    <template v-else-if="currentItem === 'Home'">
      <Home></Home>
    </template>
    <template v-else-if="currentItem === 'Category'">
      <Category></Category>
    </template> -->

    <!-- 方法二 -->
    <!-- Component动态组件 -->
    <!-- is的值可以来自1,局部组件,2,全局组件 -->
    <component :is="currentItem" :eel="'鳗鱼'" sundae="'圣代甜品'" @translate="translate"></component>
  </div>
</template>

<script>
import About from './view/About.vue'
import Home from './view/Home.vue'
import Category from './view/Category.vue'

export default {
  components:{
    About, Home, Category
  },
  data() {
    return {
      cpn : ['About', 'Home', 'Category'],
      currentItem: 'About'
    }
  },
  methods: {
    translate(msg) {
      console.log('翻译', msg);
    }
   }

}
</script>

<style scoped>

</style>

