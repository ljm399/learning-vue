<script setup>
  defineProps({
    title: {
      type: String,
      default: '我是默认值',
    },
    subtitle: {
      type: String,
      default: '我是默认值',
    }
  })
</script>

<template>
  <div class="app">
    <div class="titleArea">
      <h2>{{ title }}</h2>
      <h3>{{ subtitle }}</h3>
    </div>  
  </div>
</template>


<style scoped lang="less">
  titleArea {
    h2 {
      color: #000;
    }
    h3 {
      color:#333
    }
  }
</style>