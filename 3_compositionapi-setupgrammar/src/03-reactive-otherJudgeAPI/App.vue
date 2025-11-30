<template>
  <div class="app">
    appvue
  </div>
</template>

<script>
import { reactive, onMounted, ref, isProxy, isReactive, readonly, isReadonly, toRaw, shallowReactive } from "vue";
export default {
  setup() {
    //reactive属性判断的其他api

    //1,isProxy属性:检查是否reactive/readonly创建的代理对象
    const aviation = reactive({ a: 1 });
    const exhibit = ref({ b: 1 });
    onMounted(() => {
      console.log("isProxy", isProxy(aviation), isProxy(exhibit))//isProxy true false
    })

    //2,isReactive属性:检查是否reactive创建的响应式对象
    const wrapRef = readonly(exhibit);
    onMounted(() => {
      console.log("isReactive", isReactive(aviation), isReactive(exhibit), isReactive(wrapRef))//isReactive true false false
    })

    //2.2,当reactive包裹一个readonly创建的对象会返回true
    const warpRat = reactive(exhibit.value);
    const readValue = readonly({a : 2});
    const warpRat2 = reactive(readValue);
    
    onMounted(() => {
      console.log("isReactive", isReactive(warpRat), isReactive(warpRat2))//isReactive true true
      console.log(isReactive(warpRat2))//因为readonly的值是不变的,自然没了响应式的功能,所有false
      //但ref返回的对象在被reactive包裹依旧是响应式所以返回true
     })

    //3,readonly属性:创建只读的代理对象
    onMounted(() => {
      console.log("isReadonly",isReadonly(aviation) ,isReadonly(wrapRef))//isReadonly false true
      //理由:和上面解释同理
    })

    //4,toRaw属性:获取原始对象
    onMounted(() => {
      console.log("toRaw", toRaw(aviation), toRaw(wrapRef))//toRaw {a: 1} {b: 1}
    })

    //5,shallowReactive属性:创建响应式对象,但是不深度代理
    const shallow = shallowReactive({ 
      a: 1,
      b: { c: 2 }
     });
     onMounted(() => {
      console.log(shallow)//shallow是代理的,但shallow.b不是
     })
  }
}
</script>

<style scoped>

</style>

