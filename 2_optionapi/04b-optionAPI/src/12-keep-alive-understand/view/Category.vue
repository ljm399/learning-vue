<template>
  <div class="app">
    <h1>category</h1>
    <h3>{{ counter }}</h3>
    <button @click="counter++">timer</button>
  </div>
</template>

<script>
export default {
  data: () => ({ counter: 0 }),
  name: "Category",
  created() {
    console.log("category created");
},

mounted() {
    console.log("category mounted");
 },

 unmounted() {
    console.log("category unmounted");
  },

  //activate属性,deactivate属性:缓存生命周期
  activated() {
     console.log("category activated");
  },
  deactivated() {
     console.log("category deactivated");
  },

}

</script>

<style scoped>

</style>

