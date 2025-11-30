<template>
  <div class="app">
    <button @click="btnClick(1)">-1</button>
    <button @click="btnClick(2)">-2</button>
    <button @click="btnClick(3)">-3</button>
  </div>
</template>

<script>
export default {
  //emit属性:一,数组语法,集体开发时,同事可以轻易看见传出的事件(最多)
  // emits: ["sub"],

  //属性二,对象语法,限制传出的值
  emits: {
    sub: function(num) {
      if( num > 10 ) {
        return false//即是报错
      }else
      return num
    }
  },


  methods: {
    btnClick(num) {
      this.$emit('sub', num)
    }
  }
}
</script>

<style scoped>

</style>


