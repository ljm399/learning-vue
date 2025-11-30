<template>
  <div class="app">
    <p>{{ aviation }}- {{ aircraft }}</p>
    <button @click="translate">translate</button>
  </div>
</template>

<script>

import {  reactive,toRef } from "vue";
export default {
  //setup中toRefs属性/toRef属性
  setup() {
    const info = reactive({
      aviation : 'aviation',
      aircraft : 'aircraft'
    })

    //问题:解构则数据无法响应式更新
    // const {aviation, aircraft} = info
    //解决
    //1,利用toRef
    const aviation = toRef(info, 'aviation')
    const aircraft = toRef(info, 'aircraft')
    //2,利用toRefs
    // const {aviation, aircraft} = toRefs(info)

    function translate() {
      info.aviation = '航空',
      info.aircraft = '飞机'
      console.log(info.aviation, info.aircraft)//clg可以判断数据是否响应式,当无利用toRefs,这里改为飞机但template不变
    }
    return {
      aviation,
      aircraft,
      translate
    }

  }
}
</script>

<style scoped>

</style>

