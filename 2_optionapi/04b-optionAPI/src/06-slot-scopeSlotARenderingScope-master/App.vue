<template>
  <!-- 一,renderingScope渲染作用域,即同一个页面的{{ title }}不会去子组件的data或props里面找,只会在本页面props(properties) -->


  <!-- 二,ScopeSlot作用域插槽 -->
    <!-- 使用过程: -->
    <!-- 先在子组件中把item绑定给slot,然后外部先通过#default='aa',再aa.item -->

    <!--1,匿名插槽:独占默认插槽:直接把v-slot:default='xxx'缩写#='xxx',不是独占或有具名插槽就不行 -->
  <showInfo :title="['intergret', '回归', '团体']" @itemClick="itemClick" #="props"> 

    <!-- 需求: -->
    <!-- 我想要button内容展示title里面的内容 -->
    <!-- 方法一,作用域插槽如props.xx -->
    <!-- 方法二,emits传值过来 -->
      <button>{{ props.item }}</button>
  </showInfo>


  <!-- 2,具名插槽: -->
  <!-- 2.1,具名插槽(即有name的Slot)必须包裹在template,同时这组件名包裹-->
  <!-- 2.2,v-slot:xx='xx'必须写全 -->

  <showInfo :title="['compile', '编译', '又进步了']" >
    <template v-slot:showName="aa">
      <button>按钮{{ aa.item }}</button>
    </template>
  </showInfo>
</template>

<script>
import showInfo from './showInfo.vue'
export default {
  components: {
    showInfo
  },
  data() {
    return {
      currentIndex: 0
    }
  },

  methods: {
    itemClick(index) {
      this.currentIndex = index
    }
  }  
}
</script>

<style scoped>

</style>

