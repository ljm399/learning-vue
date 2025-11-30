<template>
  <div class="app">
    <h2 ref="barn">i am h2/barn</h2>
    <button @click="getElement">vibrate</button>
    <showInfo ref="showInfo"/>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import showInfo from './showInfo.vue'

export default {
  components: { showInfo },
  //ref属性/ref属性:引入组件/元素
  setup() {
    //过程:定义个ref对象,让其绑定在有ref属性的元素上
    const barn = ref(null)
    const showInfo = ref(null)

    function getElement() {
      console.log(barn.value)
    }

    //加.value,因为ref属性返回的是一个对象,而这本质利用showInfo里面的值
    onMounted(() => {
      //调用组件的方法
      showInfo.value.showInfo()
    })

    return {
      barn,
      getElement,
      showInfo,
    }

  }
}
</script>

<style scoped>

</style>

