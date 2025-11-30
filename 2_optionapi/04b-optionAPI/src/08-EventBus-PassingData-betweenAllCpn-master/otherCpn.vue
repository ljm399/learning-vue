<template>
  <div class="app">
    <button @click="btnPassingData"></button>
  </div>
</template>

<script>
import eventBus from './utils/event-bus'
export default {
  methods: {
    btnPassingData() {

      //eventBus事件总线
      //发送
      console.log('btnPassingData')
      eventBus.emit('PassingEvent', 18, 'cao')//第一个参数是事件名用来其他组件来识别拿那个数据，后面的是要传递的参数
    }
  }
}
</script>

<style scoped>

</style>

