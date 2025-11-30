<template>
  <div class="app">
    i am textMount
  </div>
</template>

<script>
export default {
  beforeMount() {
    console.log('i am textMount的beforeMount')
  },
  mounted() {
    console.log('i am textMount的mounted')
   }

}
</script>

<style scoped>

</style>

