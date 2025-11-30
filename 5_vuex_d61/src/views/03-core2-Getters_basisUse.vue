<script setup>
</script>

<template>
  <div class="app">
    <h3>getters的在template中的使用</h3>
    <h3>doubleCount:{{ $store.getters.doubleCount }}</h3>
    <h3>计算年龄总数:{{ $store.getters.totalAge }}</h3>

    <!-- 可知$store.getters.message是响应式的 -->
    <h3>getters获取其他getters:{{ $store.getters.message }}</h3>

    <!-- 根据id获取一个users中具体的user(了解) -->
    <h3>getters可以返回函数,函数可以传参数如id为3:{{ $store.getters.getUserId(3) }}</h3>
    <h3>getters可以返回函数,函数可以传参数如id为2:{{ $store.getters.getUserId(2) }}</h3>

    <button @click="add">add</button>
  </div>
</template>

<script>
export default {
  methods: {
    add() {
      this.$store.commit("add");//可以看出getters的值是响应式的，当state的值变化时，getters的值也会随之改变
    }
  }
}
</script>

<style scoped>

</style>