<script setup>
//导入,模版才能用
import useCount from '../stores/01count'
//规范:放回的函数统一用usexx
import useMtpStates from '../stores/01multiple'
import { toRefs } from 'vue'
import { storeToRefs } from 'pinia';

//1,模板中使用
let countStore = useCount()
const mtpStores = useMtpStates();

//1.3便捷使用
let { count } = toRefs(countStore)
// let { count } = countStore


//2.{count}则count非响应式,用refs或pinia专属的storeToRefs
// const { age, name } = toRefs(mtpStores)
const { age, name,level } = storeToRefs(mtpStores)


//3,修改state
function changeStates() {
  //3.1,方式一:一个个修改
  // count.value++
  age.value++ //无论storeToRefs还是toRefs,都要value

  //3.2,方式二,一次修改多个($patch)
  mtpStores.$patch({
    name: '迈克',
    level: 999
  })

  //3.3,方式三:整体修改(但还是mtpStores.$state这个对象,只是属性变了)(少用)
  // const oldState = mtpStores.$state
  // mtpStores.$state = {
  //   name: '迈克',
  //   level: 999,
  //   // mj : 'jjjl'
  // }
  // console.log(oldState === mtpStores.$state)//true,说明修改了里面的值后还是同一个对象,理由在下面
  //#region true原因
  /* 
    Pinia 实际上不会替换内部的 $state 对象，而是会遍历新对象，并将其属性(即name和level)合并到当前的 $state 对象中。这是为了保持响应性系统的一致性，因为直接替换 $state 对象可能会导致失去对先前状态的响应性跟踪
  */
  //#endregion
}

//3.4,重置
function reset() {
  mtpStores.$reset()
}
</script>

<template>
  <div class="app">
    <h3>模版中不能直接引用state值,需要在setup中导入先</h3>
    <h3>countStore.count:{{ countStore.count }}</h3>
    <h3>便捷使用:count:{{ count }}</h3>
    <h3>mtpStates的age:{{ age }}</h3>
    <h3>mtpStates的name:{{ name }}</h3>
    <h3>level:{{ level }}</h3>
    <button @click="changeStates">changeStates</button>
    <button @click="reset">重置</button>
  </div>
</template>


<style scoped>

</style>