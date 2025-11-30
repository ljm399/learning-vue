<script setup>
//4,定义props属性(defineProps函数/defineProps方法)
//定义个props变量,接收父组件传递过来的title属性
// vue3不能用数组写法,只能对象写法如props: ["surplus", "Iran", "drone", "applicant"]报错,vue2可以即optionApi可以
defineProps({
  title: {
    type: String,
    default: 'Hello World'
  },
  cupboard: {
    type: String,
    default: 'Cupboard'
  }
})

//5,emits函数/emits方法(defineEmits函数/defineEmits方法):传递事件给父组件
//tip提示(使用emits函数):你使用这个时先想要不要传给父组件,比如这里你是想修改title的值,只是组件内的交互,和外部无关系所有不用
const emits = defineEmits(['add3'])
function add(num) {
  emits('add3', num)
}

//6,获得组件实例(要先暴露即defineExpose函数)
function foo() {
  console.log('i am 组件实例ref')
}
defineExpose({ foo })
</script>

<template>
  <div class="app">
    <h3>{{ title }}---{{ cupboard }}</h3>
    <button @click="add(3)">count增加3倍</button>
  </div>
</template>


<style scoped>

</style>