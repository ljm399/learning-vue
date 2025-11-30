<script>
export default {
  computed: {
    countCp() {
      return this.$store.state.count
    }
  },
  methods: {
    add() {
      this.$store.commit('add')
    }
  }
}
</script>

<script setup>
//tip提示:有vuex是配合vue2即optionApi使用,不是给vue3的CompositionApi使用(其使用专门为其生的pinia),所有在setup使用非常困难
import { useStore } from "vuex"
import { toRefs } from "vue"
const store = useStore()

//tip提示:
// const count = store.state不行,store.state是对象,需要解构
//1,state是响应式的(),但从state拿出来的count不是响应式的而是个普通值,所以需要toRefs()

//2,同时不是toref(没有s)是因为其是对象不是字符串
  // toRef() 用于单个属性：toRef(store.state, 'count')
  // toRefs() 用于整个对象的所有属性：toRefs(store.state)
  // 这里使用 toRefs() 是因为要处理整个 store.state 对象
  
const { count } = toRefs(store.state)

//只能通过store.commit('add')才能修改store.state
function add() {
  //可以但不能这样,违反规定
  // count.value++//toRefs本质是ref,要value

  //正确写法
  store.commit("add")
}
</script>

<template>
  <div class="app">
    <h3>01页面获取单个状态</h3>
    <h3>template中使用state:{{ $store.state.count }}</h3>
    <h3>optionApi的computed计数:{{ countCp }}</h3>
    <h3>setup的计数:{{count }}</h3>
    <button @click="add">add</button>
  </div>
</template>


<style scoped>

</style>