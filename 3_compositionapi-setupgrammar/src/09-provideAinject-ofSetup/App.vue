<template>
  <div class="app">
    {{ gallery }}
    <ShowInfo/>
  </div>
</template>

<script>
  import ShowInfo from './showInfo.vue'
  import { ref, provide } from "vue";
  export default {
    components: { ShowInfo },
    //setup中的provide属性/inject属性
    setup() {
      //要是想要数据有响应式,给provide加ref,而不是inject,因为是父传子孙
      const gallery = ref("galley");
      
      //tip提示:报错没在父组件中用就不用定义,直接在provide中定义就行
      // const barn = '谷仓'

      //optionApi中是return返回一个对象(里面有键和值)
      provide("gallery", gallery);//第一个参数是key,第二个参数是值
      provide("barn", '谷仓');
      // provide({
      //   barn: '谷仓',
      //   gallery: gallery
      // })//warning报错:不可以这样,provide通过键值对返回给子组件,而不是对象

      //因为我在父组件只用gallery,所以不用返回barn
      return { gallery };

    }
  }
</script>

<style scoped>

</style>

