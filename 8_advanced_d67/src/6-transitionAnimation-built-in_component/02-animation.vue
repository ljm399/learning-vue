<script setup>
import { ref } from 'vue'
const isshow = ref(true)
</script>

<template>
  <div class="app">
    <div class="wrap">
      <button @click="isshow = !isshow">转换</button>
    </div>

    <!-- name属性:没设默认是v-,这是mj- -->
    <Transition name="mj">
      <h2 v-if="isshow">
        儿子想使母亲骄傲，这心情毕竟是太真实了，以致使“想出名”这一声名狼藉的念头也多少改变了一点形象。这是个复杂的问题，且不去管它了罢。随着小说获奖的激动逐日暗淡，我开始相信，至少有一点我是想错了：我用纸笔在报刊上碰撞开的一条路，并不就是母亲盼望我找到的那条路。年年月月我都到这园子里来，年年月月我都要想，母亲盼望我找到的那条路到底是什么。母亲生前没给我留下过什么隽永的哲言，或要我恪守的教诲，只是在她去世之后，她艰难的命运，坚忍的意志和毫不张扬的爱，随光阴流转，在我的印象中愈加鲜明深刻
      </h2>
    </Transition>
  </div>
</template>

<style scoped>
.mj-enter-active {
  /* animation: mjEnterAnim 2s ease; */
  /* 使用reverses记得和只留一个keyframes(即用mjLeaveAnim而不是mjEnterAnim) */
  animation: mjLeaveAnim 2s reverse;
}
.mj-leave-active {
  animation: mjLeaveAnim 2s ease;
}

@keyframes mjEnterAnim {
  0% {
    transform: scale(0);
    opacity: 0;
  }

  50% {
    transform: scale(1.7);
    opacity: 0.5;
  }

  100% {
    transform: scale(1);
    opacity: 1;
   }
}

@keyframes mjLeaveAnim {
  0% {
    transform: translateX(0);
    opacity: 1;
  }
  100% {
    transform: translateX(-500px);
    opacity: 0;
  }
}
</style>