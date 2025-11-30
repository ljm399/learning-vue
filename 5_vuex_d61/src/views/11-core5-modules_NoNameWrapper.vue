<script setup>
  import { useStore } from "vuex";
  const store = useStore();
  function increament() {
    store.commit('increament', 'increament的mutation')
  }
  function increamentAction() {
    store.dispatch('increamentAction', 'increamentAction的action')
  }
  function changeBySixArg() {
    store.dispatch('sixArgAction')
  }

  //重要提醒:看效果前先把namespace: 'counter' 注释
</script>

<template>
  <div class="app">
    <h3>应用模版中的数据</h3>
    <h3>state:{{ $store.state.counter.counters }}</h3>
    <h3>getters的counters和root的count:{{ $store.getters.douleCounters }}</h3>
    <button @click="increament">mutation</button>
    <button @click="increamentAction">increament的Action</button>
    <button @click="changeBySixArg">action的6个参数</button>
  </div>
</template>


<style scoped>

</style>