<script setup>
//#region listAnimation列表动画/listTransition列表过渡存在意义
 /* 
  前几个只是对单个节点或者组件,又或者同一时间渲染多个节点中一个
  若想渲染多个如列表
  则用<transition-group>组件
 */
//#endregion
import { reactive, ref } from 'vue'
import { shuffle } from 'underscore'

let nums = ref([1, 2, 3, 4, 5, 6, 7])

// 随机打乱顺序(洗牌)
const shuffleNums = () => {
  // 不能使用reactive()方法,因为shuffle()返回一个非响应式数据
  // nums = shuffle(nums)

  //一:solveway,使用原来数据nums
  //nums.slice()对nums数组浅拷贝
  console.log(nums.value.slice())
  nums.value.splice(0, nums.value.length, ...shuffle(nums.value.slice())) 

  //二,推荐:使用ref()方法
  // nums.value = shuffle(nums.value)
}

const randomIndex = () => {
  //提示:nums.value.length也要加value
  return Math.floor(Math.random()*nums.value.length)
}
const addNum = () => {
  // randomIndex()是调用函数,只不过这个函数是箭头函数
  nums.value.splice(randomIndex(), 0, nums.value.length)
}

const removeNum = () => {
  nums.value.splice(randomIndex(), 1)
}
</script>

<template>
  <div class="app">
    <button @click="addNum">添加</button>
    <button @click="removeNum">删除</button>
    <button @click="shuffleNums">洗牌</button>

    <!-- listTransition列表过渡/动画 -->
    <!-- transition-group组件属性:除mode属性其他大部分都有 -->
    <!--  一,tag属性:给其指定一个元素div或p(tag标签,tap敲)-->

    <!-- 二,style中的mj-move类,可以定义其他节点动画 -->
    <transition-group name="mj" tag="div">
      <template v-for="item in nums" :key="item">
        <!-- 关于执行remove使唯一标识符删除,但:key='item'不报错原因:
          1,标识符没了,但其他元素的标识符还在,所以不报错
          2,你的标识符没了,说明你被删除了,所有不渲染(本身删除就是不渲染),也不报错
        -->
        <span>{{ item }}</span>
      </template>
    </transition-group>
  </div>
</template>

<style scoped>
span {
  display: inline-block;
  margin: 5px;
  font-size: 32px;
}
/* .mj-enter-from,
.mj-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.mj-enter-to,
.mj-leave-from {
  opacity: 1;
  transform: translateY(0);
} */

  .mj-enter-active,
  .mj-leave-active {
    transition: all 3s ease;
  }


.mj-leave-active {
  position: absolute;
}

.mj-move {
  transition: all 3s ease;
}
</style>