<script setup>
const vBg = (el, bindings) => {
    el.style.background = bindings.value
}
</script>

<template>
  <div class="app">
    <h3 v-bg="'green'" v-color="'red'">local dr global</h3>
  </div>
</template>

<style scoped> 
</style>