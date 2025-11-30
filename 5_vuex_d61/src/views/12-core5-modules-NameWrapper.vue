<script setup>
  //在模板中设namespace是为了防止命名冲突,当把其设为true时,可以视为有全局变局部,获取数据的方式就改变了

  import { useStore } from "vuex";
  const store = useStore();
  function increament() {
    store.commit('counter/increament')
  }
  function increamentAction() {
    store.dispatch('counter/increamentAction')
  }
  function changeBySixArg() {
    store.dispatch('counter/sixArgAction')
  }

  //重要提醒:看效果前先把namespace: 'counter' 的注释去掉
</script>

<template>
  <div class="app">
    <h3>应用模版中的数据</h3>
    <!--  $store.state.counter.counters即模板的state的数据获取不变,其他在前面加个couter/,模板中加[] -->
    <h3>state:{{ $store.state.counter.counters }}</h3>
    <h3>getters的counters和root的count:{{ $store.getters['counter/doubleCounters'] }}</h3>
    <button @click="increament">mutation</button>
    <button @click="increamentAction">increament的Action</button>
    <button @click="changeBySixArg">action的6个参数</button>
  </div>
</template>


<style scoped>

</style>