<template>  
  <l-or-g></l-or-g>
  <Causal></Causal>
</template>

<script>
//localimport局部导入
//必须加./可能缓存问题,但本来可以,要是报错就从新加载(即ctrl+c和运行)
import lOrG from "./Components/import-local.vue";
export default {
  components: {
    "lOrG": lOrG
  }
}

</script>

<style>

</style>
