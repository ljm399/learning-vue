<script setup>
import { ref } from 'vue'
const isshow = ref(true)
</script>

<template>
  <div class="app">
    <div class="wrap">
      <!-- @click ='!isshow'没效果,当你是字符串 -->
      <!-- @clck={ !isshow }会报错,对象语法不能直接写表达式,前面有说过,搜索对象语法可以了解 -->
      <button @click="isshow = !isshow">切换</button>
    </div>

    <!-- name属性:没设默认是v-,这是mj- -->
    <transition name="mj">
      <h2 v-if="isshow">哈哈哈哈哈</h2>
    </transition>
  </div>
</template>

<style scoped>
/* 解释
  enter-from:元素进入开始状态
  enter-to:元素进入结束状态
  记得加enter-active

  leave-from:元素离开开始状态
  leave-to:元素离开结束状态
  记得加leave-active
*/
.mj-enter-from,
.mj-leave-to {
  opacity: 0;
  transform: scale(0.4);
}

.mj-enter-to,
.mj-leave-from {
  opacity: 1;
  transform: scale(1);
}

.mj-enter-active,
.mj-leave-active {
  transition: all 2s ease;
}
</style>