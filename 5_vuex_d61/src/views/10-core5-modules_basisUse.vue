<script setup>
import { useStore } from 'vuex';
const store = useStore();
//注意dispatch是('nwRq/networkRequest')
store.dispatch('networkRequest').then((res) => {
  console.log('网络请求回到成功,返回值是',res);
  console.log(store.state.data,'1dd')//有值,因为数据更新了,而在外面的console.log是undefined,因为其数据不是响应式的,所有是undefined
});
console.log(store.state.data,'2dd')//undefined

</script>

<template>
  <div class="app">
    <h5>
      vuex是单一状态树,即只有一个store,所以需要modules把store分割管理,让每个模块拥有自己的state、mutation、action、getters等,甚至是嵌套子模块
    </h5>
    <h3>网络请求模块</h3>
    <!-- 获取数据,有$store.state.zidingyi改为$store.state.nwRq.zidingyi,上面dispatch不变 -->
    <template v-for="item in $store.state.data" :key="item.index">
      <div>{{ item.title }}</div>
    </template>
  </div>
</template>


<style scoped>

</style>