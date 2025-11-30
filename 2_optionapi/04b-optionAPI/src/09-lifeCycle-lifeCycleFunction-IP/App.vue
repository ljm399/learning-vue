<template>
  <div class="app">
    <h1>{{ message }}</h1>
    <h1>{{ counter }}</h1>
    <button @click="message = '极限' ">translate</button>
    <button @click="counter++">timer</button>

    <hr>
    <!-- tip提示:@click='不能只是!show' -->
    <button @click="isShow = !isShow">isshow</button>
    <text-mount v-if="isShow"></text-mount>
  </div>
</template>

<script>
import textMount from './textMount'
export default {
  components : { textMount },
  data: function() {
    return {
      message: 'utmost',
      counter: 0,
      isShow: false
    }
  },

  //lifecycle生命周期

  //1,组件创建之前
  beforeCreate() {
    console.log('一,beforCreate')
  },

  //2,组件创建完成
  created() {
    console.log('二,created')
    console.log('1,发送网络请求')
    console.log('2,监听eventBus事件')
    console.log('3,监听watch数据')
  },

  //3,template编译后准备挂载
  beforeMount() {
    console.log('三,beforeMount')
  },

  //4,组件template挂载完成
  mounted() {
    console.log('四,mounted')
    console.log('获取dom')
    console.log('使用dom')
  },

  //5,数据变化时
  //5.1,准备更新dom
  beforeUpdate() {
    console.log('五.1,beforeUpdate')
  },

  //5.2,更新dom
  updated() {
    console.log('五.2,Updated')
  },

  //6,卸载VNode -> DOM元素
  //6.1,卸载之前
  beforeUnmount() {
    console.log('六.1,beforeUnmount')
  },

  //6.2,Dom元素卸载完成
  unmounted() {
    console.log('六.2,unmounted')
  },
  
 }
</script>

<style scoped>

</style>

