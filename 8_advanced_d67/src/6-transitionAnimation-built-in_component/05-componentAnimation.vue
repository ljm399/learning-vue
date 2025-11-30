<script setup>
import H from './views/Home.vue'
import A from './views/About.vue'
import { ref } from 'vue'
let isshow = ref(true)
</script>

<template>
  <div class="app">
    <div class="wrap">
      <!-- 不可以写错@click='!isshow' -->
      <button @click="isshow = !isshow">切换</button>
    </div>

    <!-- component组件切换动画 -->
    <transition name="mj">
      <component :is="isshow ? 'h' : 'a'"></component>
    </transition>
  </div>
</template>

<script>
//弥补Vue3切换组件不能使用字符串的缺陷(即isshow='H',H必须是组件名,不能写成字符串'H'或'h),因为setup可以与optionsApi混用
export default {
  components: {
    H,
    A,
  }
}
</script>

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