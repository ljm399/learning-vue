<script setup>
//2,在setup中获取动态路由值
import { useRoute, onBeforeRouteUpdate } from 'vue-router'

//引入的方法或函数要在顶层使用,否则会报错 
// import { watch } from 'vue'

const route = useRoute()
console.log('setup',route.params.id);


// 4,需求或practice练习:点击那个link就打印那个id(1,2,3的几个方法不行因为页面不会再刷新,所以需要用watch)
//4.2,方式一
// watch(() => route.params.id, (newId) => {
//   console.log('watch', newId);
// });

//4.3,方式二,路由使用全过程每个过程触发的回调函数(和周期函数类似)(params参数)
onBeforeRouteUpdate((to, from) => {
  console.log('from', from.params.id)
  console.log('to', to.params.id)
})

</script>

<script>
  //tip提示:一个页面只能一个setup即compositionApi但也可以有个optionApi


  //3,在optionApi中获取动态路由值
  //由于optionApi不是函数式编程,不能直接调用,要create函数(周期函数)才行
  export default {
    created() {
      console.log('optionApi',this.$route.params)
    }

    //2.2,在setup的第二种获取动态路由值
    // setup() {
    //   const route = useRoute()
    //   console.log('setup',route.params.id);
    // },
  };
</script>

<template>
  <div class="User">
    <!-- 获取动态路由值 -->
    <!-- 1,在模板中获取 -->
    <!-- tip提示:是route没有r -->
    <h3>User:{{ $route.params.id }}</h3>
  </div>
</template>




<style scoped>

</style>