<template>
  <div class="app">
    {{ fullname }}
    <button @click="changeFullname">修改computed值</button>
    {{ scoreJudge }}
  </div>
</template>

<script>
import { reactive, computed } from "vue"
export default {
  //setup中computed计算属性

  // computed: {
  //   fullname() {
  //     return this.names.alley + " " + this.names.barn
  //   }

  // },
  
  setup() {
    //1,拼接数据
    const names =  reactive({
      alley: "alley",
      barn: '小巷'
    })

    // computed属性和外面的computed用法一样,传入函数只是语法糖(省略setter):弊端:不能修改数据
    // const fullname = computed(() => {
    //   return names.alley + " " + names.barn
    // })

    //tip提示要不要加逗号,函数里面不用,对象要
    //利用computed属性中的setter和computed,而不用语法糖(这样可以修改传来的数据,语法糖不行)
    //computed返回的是ref对象,本质利用了ref(),所有修改要加.value
    //修改时对computed结果的修改,而不是对传入computed的值修改
    const fullname = computed({
      get() {
        return names.alley + " " + names.barn
      },
      set(value) {
        const arr = value.split(" ")//固定写法
        names.alley = arr[0]
        names.barn = arr[1]
      }

    })
    // 修改fullname的值
    function changeFullname() {
      fullname.value = "barn 谷仓"
    }


    //2, computed的其他常见用法
    const score = 60
    const scoreJudge = computed((function() {
      return score >= 60 ? "及格" : "不及格"

    }))

    return {
      fullname,
      changeFullname,
      scoreJudge
    }
  }
}
</script>

<style scoped>

</style>

