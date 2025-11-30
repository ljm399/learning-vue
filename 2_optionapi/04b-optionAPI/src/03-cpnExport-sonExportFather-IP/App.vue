<template>
  <!-- v-on绑定方法,@绑定方法 -->
  <div class="app">
    <div>当前计数:{{ counter }}</div>
    <add-click @add="addClick"></add-click>
    <sub-click @sub="subClick"></sub-click>
  </div>
</template>

<script>
import addClick from "./addCounter"
import subClick from "./subCounter"
export default {
  
  components: { addClick, subClick },
  data() {
    return {
      counter: 0
    }
  },

  // $emit属性:可以把子组件的事件,数据通过参数传给父组件,父组件通过@/v-on接受
  methods: {
    addClick(num) {
      this.counter += num
    },
    subClick(num) {
      this.counter -= num
    }
  }
}
</script>

<style scoped>

</style>

