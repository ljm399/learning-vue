<template>
  <div class="app">
    <!-- 已经解包了,再加value会报错 -->
    <h1>{{ refInfo.a.b }} - {{ b.bb.c }}</h1>
    <button @click="refInfo.a.b++">b</button>
    <button @click="b.bb.c++">c</button>
    <!-- trggerRef让c变为响应式 -->
    <button @click="changeReact">triggerRef</button>
  </div>
</template>

<script>
import { unref,ref, isRef, shallowRef, triggerRef } from "vue"
export default {
  setup() {
    //1,unref属性:是val = isRef(val) ? val.value : val的语法糖
    const a = ref(10)
    console.log(a)//ref对象
    console.log(unref(a))//10


    //2,isRef属性:判断val是否是ref对象
    console.log(isRef(a))//true


    //3,shallowRef属性:创建一个浅层响应式ref对象
    // 修改shallowRef的c,没有响应式变化,但ref会有,ref默认是深度响应式
    const refInfo = ref({
      a: {
        b : 10
      }
    })
    const b = shallowRef({
      bb: {
        c: 10
      }
    })
    refInfo.value.a.b = 20
    b.value.bb.c = 20
    // 虽然c被修改了,但c不是响应式的,和普通的c一样,比如给b.value.bb.c++,没有响应式变化
    //proxy代理: 这就是代理对象和普通对象的区别:代理模式可以响应式变化(即js修改后模板的数据自动变化而不需要其他操作),而普通对象只能js里变化但模板不变化(因为没代理)

   
    //4,triggerRef属性:触发ref对象的响应式
    // 修改triggerRef的c,会响应式变化
    function changeReact() {
      // 点击一次,则c已经在js中变化的值,会应用到模板中:你点了c++5次但c模板没变,点一次triggerRef,c模板就变了
      triggerRef(b)
    }

    return {
      refInfo,
      b,
      changeReact
    }
  }

}
</script>

<style scoped>

</style>

