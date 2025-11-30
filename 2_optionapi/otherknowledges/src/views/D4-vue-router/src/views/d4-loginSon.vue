<script setup>
import {useRouter} from 'vue-router'
const router = useRouter()
const existTap = () => {
  router.push('/login')
  localStorage.removeItem('token')
}
</script>

<template>
  <div class="app">
    <h2>登录成功</h2>
    <button @click="existTap">退出</button>
  </div>
</template>

<style></style>