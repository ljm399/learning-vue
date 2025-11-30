<script setup>
  import Data from '../../data/data'
  import TitleArea from './titleArea.vue'
  import ContentArea from './contentArea.vue'
  import { ref } from 'vue'

  //look看:ref里面必须是对象,不能报错,因为这会导致 ContentArea 组件在最初渲染时收到一个空字符串，进而导致类型检查失败。
  const RData = ref({})
  //look看:模拟网络请求
  setTimeout(() => {
    RData.value = Data
  }, 1000);
</script>

<template>
  <div class="app">
    <TitleArea :title="RData.title" :subtitle="RData.subtitle" />
    <ContentArea :Data="RData"/>
  </div>
</template>


<style scoped lang="less">
  .app {
    width: 1032px;
    margin: 0 auto;
    
  }
</style>