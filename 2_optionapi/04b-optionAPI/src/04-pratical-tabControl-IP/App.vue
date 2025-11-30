<template>
  <!-- 一,renderingScope渲染作用域,即同一个页面的{{ title }}不会去子组件的data或props里面找,只会在本页面props(properties) -->
  <div class="app">
    <!-- 二,ScopeSlot作用域插槽 -->
  </div>
  <showInfo :title="['intergret', '回归', '团体']" @itemClick="itemClick"/>
  <h2>{{ pages[currentIndex] }}</h2>
</template>

<script>
import showInfo from './showInfo.vue'
export default {
  components: {
    showInfo
  },
  data() {
    return {
      pages: ['首页', '分类', '购物车'],
      currentIndex: 0
    }
  },

  methods: {
    itemClick(index) {
      this.currentIndex = index
    }
  }  
}
</script>

<style scoped>

</style>

