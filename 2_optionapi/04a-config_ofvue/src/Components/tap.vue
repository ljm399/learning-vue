<template>
  <div>
    appvue
  </div>
  <!-- tap标签的第一种写法 -->
  <lOrG/>
  <!-- 第二种写法 -->
  <l-or-g></l-or-g>
  <!-- 第三种写法 -->
  <lOrG></lOrG>
</template>

<script>
//不要使用tap.vue否则触发vue/multi-word-component-name
//理由:该规则强制组件使用多词名称。此规则旨在防止与现有和未来的 HTML 元素（通常是单词标识符）发生潜在冲突
import ggg from 'Components/import-local.vue'
export default {
  components: {
    // lOrG,或
    "lOrG" : ggg//键是组件名,值是组件,都是自定义如lll,以及键可以改为dsfjalf,也可以直接写lOrG
    
  }
}
</script>

<style>

</style>
