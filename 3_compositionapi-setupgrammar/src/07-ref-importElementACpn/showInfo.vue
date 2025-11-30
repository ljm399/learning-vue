<template>
  <div class="app">
    appvue
  </div>
</template>

<script>
export default {
  //方式一
  // methods: {
  //   showInfo() {
  //     console.log("i am method");

  //  }}
  setup() {
    //方法二(在setup里面)
    function showInfo() {
      console.log('i am method')
    }
    return {
      showInfo
    }
  }
}
</script>

<style scoped>

</style>

