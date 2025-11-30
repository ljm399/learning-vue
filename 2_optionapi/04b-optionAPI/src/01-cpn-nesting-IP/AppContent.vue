<template>
  <div class="app">
    <div>banner</div>
    <List></List>
  </div>
</template>

<script>
import List from "./AppConentList.vue";
export default {
  components: {
     List,
  },
}
</script>

<style scoped>
  .app{
    height: 200px;
    background-color: aqua;
  }
</style>

