<script>
import { CHANGE_AGE,EMIT_OBJ } from '@/store/mutation_types' 
export default {
  methods: {
    add() {
      this.$store.commit("add")
    },
    changeName() {
      this.$store.commit("changeName", "张三")
    },
    // emitObj() {
    //   this.$store.commit("emitObj", { name: "张三2", age: 189 })
    // },

    //其他风格来this.$store.commit(了解)与mutation常量类型
    emitObj() {
      this.$store.commit({
        //常量类型不用加引号
        type: EMIT_OBJ,
        name: "张三2",
        age: 189
      })
    },
    changeAge() {
      this.$store.commit({
        type: CHANGE_AGE,
        age: 9999
      })
    },
    //mutation拿到getters值
    add2() {
      this.$store.commit("add2", this.$store.getters.doubleCount)
    }
  }

}

</script>

<script setup>
import { useStore } from 'vuex';
const store = useStore();
function changeName2() {
  store.commit("changeName", "setup中改名为vital")
}
</script>

<template>
  <div class="app">
    <h3>$store.state.users[1].age:{{ $store.state.users[1].age }}</h3>
    <h3>{{ $store.state.name }}</h3>
    <h3>{{ $store.state.count }}</h3>
    <button @click="add">add</button>
    <button @click="changeName">改名</button>
    <button @click="emitObj">改以对象</button>
    <button @click="changeAge">其他风格</button>
    <button @click="changeName2">setup中</button>
    <button @click="add2">mutation拿到getters值</button>
  </div>
</template>


<style scoped>

</style>