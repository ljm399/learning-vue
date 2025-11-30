<template>
  <div class="app">
    appvue
  </div>
</template>

<script>
import { onMounted } from "vue";
export default {
  //setup里面的 lifecycle生命周期:
  //除了beforeCreate和create之外(因为取消了,可以直接在setup里面用,可以用onMounted代替)其它生命周期均需要加上on才能使用
  //更加细致,后续老师会带看源码,而不是口头语
  setup() {
    //onMounted不是什么周期函数,传入里面的回调函数才是
    //onMounted等函数可以多次注册
    onMounted(() => {
      console.log("mounted");
    });
    onMounted(() => {
      console.log("mounted");
    });
    onMounted(() => {
      console.log("mounted");
    });


    
    //这里直接用(就是相当于create和beforecreate的功能了),如这create比mounted先执行
    //更加细致:后续老师会带看源码,而不是口头语
    console.log('created')
  }
}
</script>

<style scoped>

</style>

