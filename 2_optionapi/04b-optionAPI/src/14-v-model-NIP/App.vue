<template>
  <div class="app">
    <!-- v-model双向绑定/v-model绑定(进阶) -->

    <!-- 1,input -->
    <input type="text" v-model="oak">
    <p>oak:{{ oak }}</p> 
    <!-- 原理 -->
    <!--$event写法:这里的$event就是传递的参数:event要加$(固定写法) -->
    <!-- <input :value="oak" @input="oak = $event.target.value">  -->
     <!-- :是v-bind的简写 -->
    <hr>

    <!-- 2,组件的v-model:默认modelValue(model-value) -->
    <!-- 和平时区别,一个在data里面,一个不在data而是props实现响应式 -->
    <VMd v-model="oak"></VMd>
    <!-- 语法糖 -->
    <!-- 本质 -->
     <!-- <v-md :model-value="oak" @update:model-value="oak = $event"></v-md> -->

     <hr>
     <!-- 3,自定义名称(即不是modelValue),和其带来的其他作用:可以绑定多个属性 -->
    <!-- <v-md v-model:plateau="plateau" v-model="oak"></v-md> -->
    <!-- $event写法上面有解释:是种特殊写法 -->
    <!-- <v-md :plateau="plateau" @update:plateau="plateau = $event"  :MV="oak" @update:MV="oak = $event"></v-md> -->
    <!-- 语法糖 -->
    <v-md v-model:plateau="plateau" v-model:MV="oak"></v-md>

    <hr>
    <!-- 组件的input -->
    <!-- <my-input v-model="inputMsg"></my-input> -->
    <!-- <my-input v-model="inputMsg" :msg="msg2" @update:msg="msg2 = $event"></my-input> -->
    <my-input v-model:msg="msg2" v-model:inputMsg="inputMsg"></my-input>
    
  </div>
</template>

<script>
//tip提示import,引入(import)若带{}则是引入函数
import VMd from './vModel1034.vue'
import MyInput from './myInput1034.vue'
export default {  
  components: { VMd, MyInput },
  data() {
    return {
      oak : 'oak',
      plateau: 'plateau',
      inputMsg: 'inputMsg',
      msg2: 'msg2'
    }
  }
}
</script>

<style scoped>

</style>

