<script setup>
// component组件(vue3)引入方式:
//一:composition组件引入

// import L from './dem4-1.vue'
// import R from './dem4-2.vue'

// const show = shallowRef(L)
//#region 用shallowRef而不是ref原因
  /* 
    shallowRef只会对引用本身(即show),而不会对L这个组件进行响应式处理
    而ref则会对L这个组件进行响应式处理,影响性能
  */
//#endregion

// const toLeft = () => {
//     show.value = L
// }
// const toRight = () => {
//     show.value = R
// }
</script>

<template>
  <div class="app">
    <button @click="toLeft">左</button>
    <button @click="toRight">右</button>
    <div class="cpn">
        <!--p5: 为什么is=L不行,要加: -->
        <component :is="show"></component>
    </div>
  </div>
</template>

<script>
//二,optionapi组件(vue2)引入

//#region 注意点与易错点
  /* 
    2.1,当结合component组件使用时想切换组件时,is要加冒号即:is='show'
    若不切换即值不是自变量,则可以大小写(vue3中不可以)即is='r',不能加冒号否则会报错

    2.2,vue2的data函数,本身返回的就是响应式数据,如在引用ref或者shallowRef时(即return {show: ref(l)})会报错
    所有ref和shallowRef不适用切换组件的show
    替代方案即下面所示,重点是要在components中注册组件,内部会默认只把show注册为响应式数据,而非组件L,R
    
  */
//#endregion

import L from './1-1.vue'
import R from './1-2.vue'
export default {
  data() {
    return {
      show: 'L'
    }
  },
  methods: {
    toLeft() {
      this.show = "L"
    },
    toRight() {
      this.show = 'R'

  }
  },
  components: {
    L,
    R
    
  }

}
</script>

<style scoped> 
</style>