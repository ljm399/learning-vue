<script setup>
import { ref } from 'vue'
const isshow = ref(true)
</script>

<template>
  <div class="app">
    <div class="wrap">
      <button @click="isshow = !isshow">切换</button>
    </div>
    <!-- mode属性 -->
    <!-- out-in:当前元素先过渡,完后才新元素(默认) -->
    <!-- in-out:相反 -->

    <!-- appear属性:首次渲染就有动画 -->
    <transition name="mj" mode="in-out" appear>
      <h2 v-if="isshow">哈哈哈哈哈</h2>
      <h2 v-else>hahahha</h2>
    </transition>
  </div>
</template>

<style scoped>
.mj-enter-from,
.mj-leave-to {
  opacity: 0;
}

.mj-enter-to,
.mj-leave-from {
  opacity: 1;
}

.mj-enter-active,
.mj-leave-active {
  transition: all 2s ease;
}
</style>