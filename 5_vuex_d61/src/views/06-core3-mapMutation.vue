<script>
//mapMutations辅助函数
import { CHANGE_AGE,EMIT_OBJ } from '@/store/mutation_types' 
import { mapMutations } from 'vuex';
export default {
  methods: {
    //在optionApi中使用mutations辅助函数和不使用的不同点
    //1,参数在template中传递
    ...mapMutations(['add', 'changeName']),

    //2,使用常量类型
    ...mapMutations({
      emitObj: EMIT_OBJ
    })
  }

}

</script>

<script setup>
//setup中使用mapMutations
import { useStore } from 'vuex';

//和mapGetters一样的使用过程
//1,一步一步实现
const mutationsObj = mapMutations({ changeAge: CHANGE_AGE, changeName2: 'changeName', add2: "add2" })
const newObj = {}
const store = useStore();
Object.keys(mutationsObj).forEach(key => {
  newObj[key] = mutationsObj[key].bind({ $store: store })
})
const { changeAge, changeName2, add2 } = newObj

//2,直接解构不用mapMutations
// const store = useStore();
// console.log(store.mutation)不存在,不同于store.state和store.getters这里解构也不行只能解构和一步步实现

//3,默认写法
// function changeAge({ type, age }) {
//   store.commit(type, age)
// }
// </script>

<template>
  <div class="app">
    <h3>$store.state.users[1].age:{{ $store.state.users[1].age }}</h3>
    <h3>{{ $store.state.name }}</h3>
    <h3>{{ $store.state.count }}</h3>
    <button @click="add">add</button>
    <button @click="changeName('mapMutations')">改名</button>
    <button @click="emitObj({name: 'mapMuatations2', age: 8888})">传对象参数</button>

    <h3>setup中的mapMutations</h3>
    <!-- setup中以其他风格传参数 -->
    <button @click="changeAge({type: CHANGE_AGE, age: 999})">其他风格</button>
    <button @click="changeName2('setup的mapMutations')">setup中</button>
    <button @click="add2($store.getters.doubleCount)">mutation拿到getters值</button> 
  </div>
</template>


<style scoped>

</style>