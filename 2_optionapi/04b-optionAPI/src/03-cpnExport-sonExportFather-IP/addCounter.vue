<template>
  <div class="app">
    <button @click="btnClick(1)">+1</button>
    <button @click="btnClick(2)">+2</button>
    <button @click="btnClick(3)">+3</button>
  </div>
</template>

<script>
export default {
  methods: {
    btnClick(num) {
      this.$emit('add', num)
    }
  }
}
</script>

<style scoped>

</style>

