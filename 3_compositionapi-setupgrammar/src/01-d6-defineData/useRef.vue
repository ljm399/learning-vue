<template>
  <div class="app">
    <h1>ref</h1>
    <h3>1,{{ glance }}</h3>

    <!-- unpacking解包:不需要解包,ref方法返回的值是个ref对象(依旧是ref引用
      ),在setup要加.value,而template里底层已经帮你做了,所有不用加.value -->
    <h3>2,{{ wordMean.glimpse }}- {{ wordMean.frontier }}</h3>
    <button @click="translate">translate</button>

    <!-- 浅层UNpacking解包(bug) -->
    <h3>没加value直接使用:{{ warp.glance }}</h3>
    <button @click="warp.glance = 'unpacking'">修改数据但无value</button>
    <button @click="warp.glance.value = 'unpacking'">修其有value</button>

  </div>
</template>

<script>
//ref响应式数据
import { ref,onMounted } from "vue";
export default {
  setup() {
    //ref api/ref引用响应式数据/ref响应式数据 本质:引用响应式并维护内部的数据即value,故ref(reference):ref处理的数据返回的是ref对象
    //1,处理简单数据也可以复杂类型(reactive不可以输入简单数据Number,String,Boolean)
    const glance = ref('glance')
  
    //2,处理复制数据
    const wordMean = ref({
      glimpse : 'glimpse',
      frontier : 'frontier'
    })

    function translate() {
      wordMean.value.glimpse = '瞥',
      wordMean.value.frontier = '前沿'
    }

    //2.2,浅层解包(bug)
    //tip提示快速写法:这里的glance已经定义过,所以可以直接glance而不需要值
    const warp = {
      glance
    }
      

    //3,用途:本地简单数据/网络请求的数据
    const word = ref([])
    // const words = reactive([])
    onMounted(() => {
      const words = ['sundae', 'eel', 'sandine']
      //用reactive很难把words复制给reactive里面的[],而ref只是引用有value
      
      //用ref
      word.value = words
    })

    return {
      glance,
      wordMean,
      word,
      translate,
      warp
    }
  }

  
}
</script>

<style scoped>

</style>

