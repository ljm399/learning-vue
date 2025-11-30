<template>
  <div class="app">
    <template v-for="(item,index) of cpn" :key="item">
      <button @click="currentItem = cpn[index]">{{ item }}</button>
    </template>


    <!-- keep-alive属性(让组件活跃):本质缓存 -->
    <!-- include的值要想在组件中name -->
    <!-- 注意:组件之间不能有空格 -->
    <!-- include属性 -->
    <KeepAlive include="About,Home,Category">
      <component :is="currentItem" :eel="'鳗鱼'" sundae="'圣代甜品'" @translate="translate"></component>
    </KeepAlive>

    <!-- exclude属性:除了xx其他都有 -->
    <!-- <KeepAlive exclude="Category">
      <component :is="currentItem" :eel="'鳗鱼'" sundae="'圣代甜品'" @translate="translate"></component>
    </KeepAlive> -->

    <!-- max:优化,当达到3个时,会把第一个点的组件缓存去掉即没有keep-alive -->
    <!-- <KeepAlive max="2">
      <component :is="currentItem" :eel="'鳗鱼'" sundae="'圣代甜品'" @translate="translate"></component>
    </KeepAlive> -->

    <!-- 当你想要判断是否切换组件:用activate方法和deactivate方法:专门为keep-alive而生 -->
    <!-- activate方法,deactivate方法:缓存生命周期 -->
    <!-- 在category组件中 -->
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

