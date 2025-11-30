<template>
  <div class="app">
  </div>
  <AsynCpn />
</template>

<script>
//async异步组件(组件内)
import { defineAsyncComponent } from 'vue';
// import AsynCpn from './asynCpn.vue'
const AsynCpn = defineAsyncComponent( () => import('./asynCpn.vue'))
export default {
  components: { AsynCpn },
}
</script>

<style scoped>

</style>

