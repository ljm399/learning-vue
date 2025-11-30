<template>
  <div class="app">
    <p>{{ name }}-{{ age }}-{{ message }}</p>
  </div>
</template>

<script>
export default {
  inject: ['name', 'age', 'message']
}
</script>

<style scoped>

</style>

