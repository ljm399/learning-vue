<script setup>

</script>

<template>
  <div class="about">
      <h1>About</h1>
      <div class="nav">
        <router-link to="/about/family">家人生日</router-link> |
        <router-link to="/about/ranking">音乐排名</router-link>
      </div>
      <router-view></router-view>    
  </div>
</template>


<style scoped>

</style>