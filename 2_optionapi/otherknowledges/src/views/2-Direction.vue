<script setup>
import { ref } from 'vue'
// 记住：v-fs的值不能是0这些为false的，否则不显示
const fss = ref('1')
const vFs = (el, bindings) => {
    el.style.fontSize = bindings.value
    // console.log(el,bindings);
}
</script>

<template>
  <div class="app">
    <p v-fs="fss">字符大小</p>
    <button @click="fss = '32px'">change</button>
  </div>
</template>

<style scoped> 
</style>