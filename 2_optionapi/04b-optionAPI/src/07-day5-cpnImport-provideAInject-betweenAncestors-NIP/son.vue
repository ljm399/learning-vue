<template>
  <div class="app">
    <grandson></grandson>
    <h3>
      son:{{ message }}
    </h3>
  </div>

</template>

<script>
import Grandson from './grandson.vue'
export default {
  components: {
    Grandson
  },
  inject: ['message']

}
</script>

<style scoped>

</style>


