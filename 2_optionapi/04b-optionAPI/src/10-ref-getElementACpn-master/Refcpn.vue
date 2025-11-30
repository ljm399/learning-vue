<template>
  <div class="app">
    <h3>{{ counter }}</h3>
  </div>
  <div></div>
</template>

<script>
export default {
  data() {
    return {
      counter: 0,
    }
  },

  methods: {
    add() {
      this.counter++
    },
  },
}
</script>

<style scoped>

</style>

