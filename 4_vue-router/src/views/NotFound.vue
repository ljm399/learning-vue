<script setup>

</script>

<template>
  <div class="not-found">
    <h3>NotFound:你访问的路径 {{ $route.params.pathMatch }} 不存在,请重新输入</h3>
  </div>
</template>


<style scoped>
  .not-found {
    color: red;
  }
</style>