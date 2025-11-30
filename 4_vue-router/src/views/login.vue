<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
function loginClick() {

  localStorage.setItem('token', 'birthday')
  
  router.push('/about/family')

}
</script>

<template>
  <div class="app">
    <button @click="loginClick">登录</button>
  </div>
</template>


<style scoped>

</style>