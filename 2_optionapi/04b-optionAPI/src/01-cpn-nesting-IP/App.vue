<template>
  <div class="app">
  </div>
  <!-- problem问题-register -->
  <!-- 1,注册完要使用不然会报错 -->
  <Header/>
  <!-- 2,当你对组件名缩写时即Header:Header,import的Header和组件开头要大写,不然就别用缩写 -->
  <bas/>
  <Footer/>
</template>

<script>
import content from "./AppContent"
import Header from "./AppHeader"
import Footer from "./AppFooter.vue"
export default {
  components: {
    Header,
    'bas': content,
    Footer
  }
}
</script>

<style scoped>

</style>

