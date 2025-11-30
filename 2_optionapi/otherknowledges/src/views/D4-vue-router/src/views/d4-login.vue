<script setup>
import {useRouter} from 'vue-router'
const router = useRouter()
const onLoginTap = () => {
  localStorage.setItem('token','passwortd')
  router.push('/login/son')
}
</script>

<template>
  <div class="app">
    <hr>
    <button @click="onLoginTap">登录</button>
  </div>
  <!-- 
    问题与解答：
    1,循环:当你在beforeEach()里面用其跳转时(next()/router.push(xxx)),同时和你再组件里的router.push(xxx)重叠,就会导致循环

    2,由于你设了:
        {
      path: '/',
      redirect: '/login'
    }这导致你一开始就使用了路由守卫

    3,同时有两个登录按钮,是因为2中/login在router-view中有一个,然后你组件引入又一个,把组件那个删了就行

  
   -->
</template>

<style></style>