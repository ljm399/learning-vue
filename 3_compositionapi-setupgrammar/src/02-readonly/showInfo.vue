<template>
  <div class="app">
    <h1>{{ info.gut }}-{{ info.glimpse }}</h1>
    <!-- 以下违背了单项数据流,会直接报错 -->
    <!-- <button @click="info.gut = '肠道'">翻译</button> -->
    <!-- 报错有两个原因:1,父组件传过来的数据是readonly只读属性,2,违背了单项数据流 -->
    <!-- <button @click="info.gut = '肠道'">翻译</button> -->
    <!-- 正确做法 -->
    <!-- 原因:包裹info的readonly不可以改,但去父组件给info就行了 -->
    <button @click="translate">翻译</button>

  </div>
</template>

<script>
export default {
  props: {
    info : {
      type: Object,
      default() {
        return {};
      }
    }
  },
  emits: ['translate'],
  //提示:用context,参数必须带上props和context,否则会报错
  setup( props,context ) {
    function translate() {
      context.emit('translateGut', '肠道')
    }
    return {
      translate
    }
  }
}
</script>

<style scoped>

</style>

