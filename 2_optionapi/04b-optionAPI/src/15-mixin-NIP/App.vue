<template>
  <div class="app">
    <about/>
    <Category/>
  </div>
</template>

<script>
import About from './view/About.vue'
import Category from './view/Category.vue';
export default {
  components: {
    About,
    Category
  },
}
</script>

<style scoped>

</style>

