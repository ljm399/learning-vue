<script setup>
const print = row => {
  console.log(row)
}
</script>

<template>
  <div class="app">
    <!-- 打印组件可能的参数(非指令) -->
    <input type="text">
    <button @click="print">print</button>
  </div>
</template>


<style scoped>

</style>