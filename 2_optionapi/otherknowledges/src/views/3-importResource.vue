<script setup>
import Pic from '@/assets/v2-5fb13110e1de13d4c11e6e7f5b8026da_r.jpg'
</script>

<template>
  <div class="app">
    <p>动态public里面的资源(import导入)</p>
    <img :src="Pic" alt="">

    <p> 引用assets的图片</p>
    <img src="/0034034892281415_b.jpg" alt="">

  </div>
</template>

<style scoped> 
img {
    height: 100px;
}
</style>