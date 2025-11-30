<script setup>
import { useStore } from 'vuex';
const store = useStore();

//1,方式一:
// store.dispatch('NetworkRequest');

//2,方式二:由于方式一只发送,就不管结果是否拿到:而promise函数可以解决
//Promise 构造函数的参数是一个执行器函数（executor），它接受两个参数：resolve 和 reject，用于处理异步操作的成功和失败。
//但条件是index.js里面Action要返回一个promise对象
store.dispatch('networkRequest').then((res) => {
  console.log('网络请求回到成功,返回值是',res);
});
</script>

<template>
  <div class="app">
    <h3>{{ $store.state.data }}</h3>
    <template v-for="item in $store.state.data" :key="item.index">
      <div>{{ item.title }}</div>
    </template>
  </div>
</template>


<style scoped>

</style>