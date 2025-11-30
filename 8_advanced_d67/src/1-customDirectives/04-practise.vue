<script setup>
const timestamp = 1648270539;
</script>

<template>
  <div class="app">
    <!-- 练习一:给钱加上¥ -->
    <!-- 没加ref,也可以修改template,上面有解释 -->
    <!-- 注意:value必须加引号如'¥',不然他会把它当变量而非字符串导致报错 -->
    <h4 v-unit="'$'">44</h4>

    <!-- 练习二:时间戳格式化 -->
    <!-- 知识:10位即单位是秒,13位单位毫秒 -->
    <!-- 注意:1,不能是xxxx/xx/xx,2,必须加引号不然自变量 -->
    <h2 v-ftime="'YYYY/MM/DD'">{{ timestamp }}</h2>
    <h2 v-ftime>{{ 1232314321657 }}</h2>
  </div>
</template>


<style scoped>

</style>