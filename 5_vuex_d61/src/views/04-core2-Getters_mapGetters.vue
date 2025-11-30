<script>
//optionApi的computed的mapGetters映射(为什么是计算属性而不是methods方法？前面说了)
// import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters([ 'message', 'getUserId'])
  },
  methods: {
    add() {
      this.$store.commit('add')
    }
  }
}

</script>

<script setup>
//mapGetters在上面已经引入,再引入就报错
import { mapGetters } from 'vuex'

import { useStore } from 'vuex';
import { computed, toRefs } from 'vue';
import useGetters from '@/hooks/useGetters'
//compositionApi的computed的mapGetters映射,(实现步骤和mapState一样)
//1,一步一步实现使this.$store从无绑定到有
const store = useStore();
// const { doubleCount, totalAge } = mapGetters(['doubleCount', 'totalAge']);
// const cdoubleCount = computed(doubleCount.bind({ $store: store}))
// const ctotalAge = computed(totalAge.bind({ $store: store}))

//2,使用封装函数
const { doubleCount, totalAge } = useGetters(['doubleCount', 'totalAge']);

//2.2,使用别名
const { doubleCount2, totalAge2 } = useGetters({
  doubleCount2: 'doubleCount',
  totalAge2: 'totalAge'
})

//3,不使用mapGetters,直接解构(推荐)
// const { doubleCount, totalAge } = toRefs(store.getters)//store.getters返回的是一个对象,解构后值不是响应式
//toRefs(store.getters)会报错,
//3.1,解决办法1:
//const { doubleCount, totalAge } = computed(() => ({ ...store.getters }))会报错
const obj = computed(() => ({ ...store.getters }))//因为computed需要传入一个函数所有用箭头函数,

//#region 解释两个报错
/* 
  problem1:关于toRefs(store.getters)报错原因
  但const { name, count, avatarUrl } = toRefs(store.state)可以
  因为store.getters是个普通对象(其数据不是响应式的),而store.state的数据都是响应式的
  解释:store.statate是个响应式对象,而store.getters只是引用里面的数据,虽然其数据是响应式的,但其本事是个普通函数,而toRefs需要的是一个响应式对象,所有报错,可以用computed(其不限制这些)

  problem2:const { doubleCount, totalAge } = computed(() => ({ ...store.getters }))
  因为computed返回的一个ref新对象,这个对象对store.getters进行拷贝,而不是原始响应式对象,
  但其在是ref里面依旧是响应式,
  但你用{}解构使其值破坏其响应式故报错,
  sloveway:
  不解构即可(3.1和3.2一样的解决办法)
  而const {} = toRefs(store.state)可以因为它并不会创建一个新的对象，而是将 store.state 的每个属性都包裹在 ref 中,
*/
//#endregion

  //3.2,解决办法二:
  const doubleCount3 = computed(() => store.getters.doubleCount)
  const totalAge3 = computed(() => store.getters.totalAge)//同理:没使用{}对computed返回的ref对象解构,没破坏其响应式结构

</script>

<template>
  <div class="app">
    <h3>在optionApi和compositionApi的mapGetters映射(mapGetters属性)</h3>
    <h3>optionApi中:{{ message }}</h3>
    <h3>optionApi中:{{ getUserId(2) }}</h3>
    <h3>optionApi中:{{ getUserId(3) }}</h3>

    <hr>
    <!-- setup中使用mapGetters -->
    <!-- 1,一步步实现this.$store -->
    <!-- <h3>compositionApi中:{{ cdoubleCount }}</h3>
    <h3>compositionApi中:{{ ctotalAge }}</h3> -->

    <!-- 2,封装函数 -->
    <h3>compositionApi中封装函数:{{ doubleCount }}</h3>
    <h3>compositionApi中封装函数:{{ totalAge }}</h3>

    <!-- 2.2使用别名 -->
    <h3>compositionApi中使用别名:{{ doubleCount2 }}</h3>
    <h3>compositionApi中使用别名:{{ totalAge2 }}</h3>

    <!-- 3,setup中不使用mapGetters,直接解构 -->
    <!-- 3.1 -->
    <h3>setup中不使用mapGetters,直接解构(解决办法一):{{ obj.doubleCount }}</h3>
    <h3>setup中不使用mapGetters,直接解构:{{ obj.totalAge }}</h3>

    <!-- 3.2 -->
    <h3>解决办法二</h3>
    <h3>doubleCount3:{{ doubleCount3 }}</h3>
    <h3>totalAge3:{{ totalAge3 }}</h3>
    <button @click="add">add</button>
  </div>
</template>


<style scoped>

</style>