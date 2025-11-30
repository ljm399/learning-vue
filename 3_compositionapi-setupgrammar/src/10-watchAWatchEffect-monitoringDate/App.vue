<template>
  <div class="app">
    {{ count }}- {{ lap }}- {{ laptop }}
    <button @click="printLap">打印</button>

    <h3>watch监听复杂数据</h3>
    <h3>{{ words }}- {{ words.counter }}</h3> 
    <button @click="words.proportion = '部分'">翻译</button>
    <button @click="words.counter++">增加</button>

    <h3>watchEffech</h3>
    <!-- <WatchEff></WatchEff> -->
  </div>
</template>

<script>
// import WatchEff from './watchEffectData.vue'
import { ref, watch, reactive } from "vue";
export default {
  // components: { WatchEff },
  //watch监听/watchEffect监听
  setup() {

    //tip提示:不同与optionApi,setup的数据要是想要有响应式必须考虑ref和没有,optionApi中数据默认就是响应式的
    const count = ref(0)
    let lap = '膝'
    const laptop = '笔记本电脑'  
    //模仿请求数据的延迟
    setTimeout(() => {
      count.value = 99
    },1000)

    //1,监听普通数据变化:(只能监听响应式数据,且依赖改变才会触发)
    watch(count, (newVal, oldVal) => {
      console.log("第一个watch", newVal, oldVal)
    })

    //1.2,warning报错:watch只能监听响应式数据,lap=手不行
    // function printLap() {
    //   lap = '手'
    //   console.log(lap)
    // }
    // watch(lap, (newVal, oldVal) => {
    //   console.log("watch", newVal, oldVal)
    // })

    //2,监听复杂数据变化,返回的是普通对象
    const words = reactive({
      proportion: '比例',
      portion: '部分,责任',
      counter: 0
    })
    //2.2返回的是代理对象
   const stopWatch = watch(words, (newVal, oldVal) => {
      console.log("第二个watch", newVal, oldVal,words.counter)


      //2.23,停止监听
      if(words.counter >4) {
        stopWatch()
      }
    },{
      // deep:true加不加都一样,因为返回的是对象,里面看得到
      immediate:true
    })

    //2.3,返回的是普通对象
    watch(()=> ({...words}), (newVal, oldVal) => {
      console.log("第三个watch", newVal, oldVal)
    })

    return {
      count,
      watch,
      lap,
      laptop,
      words
    }
  }
}
</script>

<style scoped>

</style>

