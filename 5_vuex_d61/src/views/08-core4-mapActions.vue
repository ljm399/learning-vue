<script>
//actions的辅助函数:mapActions映射/mapActions辅助函数
import { mapActions } from 'vuex'
export default {
  methods: {
    //1,数组写法(则@click要与数组中的方法名一一对应)
    // ...mapActions(['addAction','changeNameAction', 'changeUsersAction'])

    //2,对象写法
    ...mapActions({
      add: 'addAction',
      changeName: 'changeNameAction',
      emitObj: 'changeUsersAction'
    })
  }
}

</script>

<script setup>
import { useStore } from 'vuex';
//1,一步步实现
const actionsObj = mapActions(['addAction', 'changeNameAction', 'changeUsersAction'])
const newObj = {}
const store = useStore()
Object.keys(actionsObj).forEach(key => {
  newObj[key] = actionsObj[key].bind({ $store: store})
})
const { addAction, changeNameAction, changeUsersAction } = newObj

//2,默认写法(推荐)
// const store = useStore();
// function add() {
//   store.dispatch('addAction');
// }
</script>

<template>
  <div class="app">
    <h3>Actions属性/Actions核心/action属性</h3>
    <h3>当前技数:{{ $store.state.count }}</h3>
    <h3>name:{{ $store.state.name }}</h3>
    <h3>$store.state.users[1].age:{{ $store.state.users[1].age }}</h3>

    <h3>optionAPi或setup的对象写法</h3>
    <button @click="add">发起action修改count</button>
    <button @click="changeName('mapActions对象语法')">发起action修改name</button>
    <button @click="emitObj({name:'mapAction对象',age:929})">发起action以象参数修改的对象语法</button>
  </div>
</template>


<style scoped>

</style>