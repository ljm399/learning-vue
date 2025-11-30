<template>
  <div class="app" @click="handleClick">
    {{ msg }}
  </div>
</template>

<script>
import MixinMsg from './utils/mixinMsg.js'
export default {
  mixins: [MixinMsg],  
  methods: {
    handleClick() {
      console.log(MixinMsg.data())
    }
  }
}
</script>

<style scoped>

</style>

