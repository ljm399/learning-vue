<script setup>
import { ref } from 'vue'
const isshow = ref(true)
</script>

<template>
  <div class="app">
    <div class="wrap">
      <button @click="isshow = !isshow">转换</button>
    </div>

    <!-- transition属性(一般都不用,用只用一个,没有绝对的优先级) -->
    <!-- 1,name属性:没设默认是v-,这是mj- -->
    <!-- 2,type属性:当animation和transition同时使用,设置的时间不同可能影响效果,可以设type为transition/animation,制定听谁的 -->
    <!-- 3,duration属性:自定义展示时间,有两个值:1,duration='1000' 2,object:则duration前要加:即:duration='{
      enter:1000,
      leave:2000
    }'自定义进入和离开时间 -->
    <Transition name="mj" type="animation" :duration="{enter:5000,leave:5000}">
      <h2 v-if="isshow">
        儿子想使母亲骄傲，这心情毕竟是太真实了，以致使“想出名”这一声名狼藉的念头也多少改变了一点形象。这是个复杂的问题，且不去管它了罢。随着小说获奖的激动逐日暗淡，我开始相信，至少有一点我是想错了：我用纸笔在报刊上碰撞开的一条路，并不就是母亲盼望我找到的那条路。年年月月我都到这园子里来，年年月月我都要想，母亲盼望我找到的那条路到底是什么。母亲生前没给我留下过什么隽永的哲言，或要我恪守的教诲，只是在她去世之后，她艰难的命运，坚忍的意志和毫不张扬的爱，随光阴流转，在我的印象中愈加鲜明深刻
      </h2>
    </Transition>
  </div>
</template>

<style scoped>
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

.mj-enter-active {
  animation: mjEnterAnim 20s ease;
  transition: all 1s ease;
}
.mj-leave-active {
  animation: mjLeaveAnim 20s ease;
  transition: all 1s ease;

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