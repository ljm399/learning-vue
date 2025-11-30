<script setup>
// 异步组件
import { defineAsyncComponent } from 'vue';
const N1 = defineAsyncComponent(() => import('./01-teleport.vue'));
</script>

<template>
  <!-- suspense组件(测试,随时会被移除) -->
  <!-- 作用: 异步数据/异步组件(不按执行顺序)可能无法显示-->

  <!-- 该组件有两个插槽:因为template组件有两个属性 -->
  <!-- 1,#default:如果default可以显示就显示 -->
  <!-- 2,#fallback:若default不行,则显示fallback -->
  <div class="app">
    <Suspense>
      <template #default>
        <!-- 显示组件 -->
        <N1 />
      </template>
      <template #fallback>
        <h3>404,请刷新重试</h3>
      </template>
    </Suspense>
  </div>
</template>


<style scoped>

</style>