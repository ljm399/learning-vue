<script setup>
import useGetters from '../stores/02useGetters'
import { storeToRefs } from 'pinia';
const gettersArrs = useGetters();
const { GAge, friendsObj } = storeToRefs(gettersArrs)

function add() {
  GAge.value++,
  friendsObj.value[1].num++,
  friendsObj.value[2].num++
}
</script>

<template>
  <div class="app">
    <h3>getters属性:相当于Store的计算属性</h3>
    <h3>GAge:{{ GAge }}</h3>

    <!-- 1,getter基本使用 -->
    <h3>doubleGAge:{{ gettersArrs.doubleGAge }}</h3>

    <!-- 2,使用其他getters -->
    <h3>doubleGAgeAddTen:{{ gettersArrs.doubleGAgeAddTen }}</h3>

    <!-- 3,getters可以返回一个函数(括号是传参数) -->
    <h3>通过id获得朋友对象:{{ gettersArrs.getFriendId(103) }}-num:{{ gettersArrs.getFriendId(103).num }}</h3>
    <h3>通过id获得朋友对象:{{ gettersArrs.getFriendId(102) }}-num:{{ gettersArrs.getFriendId(102).num }}</h3>

    <!-- 4,获取其他store的数据 -->
    <h3>其他store的数据:{{ gettersArrs.message }}</h3>
    <button @click="add">add</button>
  </div>
</template>


<style scoped>

</style>