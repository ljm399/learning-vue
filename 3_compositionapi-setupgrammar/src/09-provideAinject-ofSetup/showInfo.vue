<template>
  <div class="app">
    <!-- tip提示:无论那种引入方式,都不用加.value,因为底层已经做了 -->
    {{ barn }} - {{ gallery }}
    <button @click = "gallery = '画廊'">翻译</button>
  </div>
</template>

<script>
import { inject } from "vue";
export default {
  // inject: ['barn', 'gallery']//ref包裹的值,不用加.value

  setup() {
    const barn = inject("barn");
    const gallery = inject("gallery");
    return { barn, gallery };
  }
}
</script>

<style scoped>

</style>

