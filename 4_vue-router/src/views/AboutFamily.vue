<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
function exitClick() {
  localStorage.removeItem("token");
  router.push('/login')
}
</script>

<template>
  <div class="app">
    <button @click="exitClick">退出</button>
    <h3>family's birthday</h3>
    <h4>mother - 1973.9.8</h4>
    <h4>father - 1972.12.10</h4>
    <h4>qiao - 1996.7.8</h4>
    <h4>wei - 1998.4.25</h4>
  </div>
</template>


<style scoped>

</style>