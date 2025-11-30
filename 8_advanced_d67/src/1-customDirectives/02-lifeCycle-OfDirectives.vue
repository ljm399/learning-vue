<script setup>
//自定义指令的生命周期
import { ref } from "vue";
const count = ref(0);
const showTitle = ref(true);
const vCao = {
  created() {
    console.log("created:绑定的元素的属性或事件监听器应用之前执行");
  },
 beforeMount() {
    console.log("beforeMount:组件挂载之前执行");
  },
  mounted() {
    console.log("mounted:组件挂载之后执行");
  },
  beforeUpdate() {
    console.log("beforeUpdate:组件更新之前执行");
  },
  updated() {
    console.log("updated:组件更新之后执行");
  },
  beforeUnmount() {
    console.log("beforeUnmount:组件卸载之前执行");
  },
  unmounted() {
    console.log("unmounted:组件卸载之后执行");
  }
}

function change() {
  showTitle.value = !showTitle.value;
}
</script>

<template>
  <div class="app">
    <button @click="count++">+1</button>
    <button @click="change">显示与隐藏</button>
    <h2 v-if="showTitle" v-cao>{{ count }}</h2>
  </div>
</template>


<style scoped>

</style>