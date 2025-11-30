<script setup>
import useCount from '../stores/03count';
import { storeToRefs } from 'pinia';
import useNWData from '../stores/03nwRq';

const countStores = useCount();
const { counter, subCount } = storeToRefs(countStores);

//actions属性
//1,基本使用
function changeCounter() {
  countStores.add()
  //传递参数
  countStores.sub(10)
}

//2,网络请求(setTimeout模仿网络延迟)
const nwStore = useNWData();
//2.2,可以用then,因为 fetchNWData 方法是一个 async 函数。所有的 async 函数都会返回一个 Promise
//2.3,要是请求失败.then不会执行,res只是成功时返回
setTimeout(() => {
  nwStore.fetchNWData().then(res => {
    console.log(`请求${res},展示有无到更新为:`,nwStore.data)
  })
},1000)

</script>

<template>
  <div class="app">
    <h3>actions属性</h3>
    <h4>数字Add++:  {{ counter }} -----------数字sub10:{{ subCount }}</h4>
    <button @click="changeCounter">add++/sub10</button>

    <h3>展示网络请求的数据</h3>
    <!-- <div>{{ nwStore.data }}</div> -->
    <ul style="display: flex; flex-wrap: wrap; list-style: none;">
      <template v-for="item in nwStore.data" :key="item.index">
        <li style="display: flex; flex-direction: column;">
          <img :src="item.image" alt="">
          <span>{{ item.title }}</span>
        </li>
      </template>
    </ul>
  </div>
</template>


<style scoped>

</style>