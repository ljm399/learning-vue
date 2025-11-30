<template>
<!-- tip提示:template不能用v-for循环,因为他不会渲染为dom元素,或者说他不是元素 -->
  <div class="app">
    <div class="item" 
      v-for="(item, index) in title"
      :key="item"
      @click="itemClick(index)"
      :class="currentIndex === index ? 'active' : ''"
    >
    <!-- 传递数据给父组件 -->
    <!-- 想把item绑定给slot,然后外部先通过#default='aa',在aa.item -->

    <!-- 默认插槽(非具名) -->
    <slot :item="item">
      {{ item }}
    </slot>

    <!-- 具名插槽 -->
    <slot :item="item" name="showName">
      {{ item }}
    </slot>
  </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    //tip提示return,你错了很多次了
    return {
      currentIndex : 0
    }
  },

  methods: {
    itemClick(index) {
      this.currentIndex = index
      this.$emit('itemClick', index)
    }
  },


}
</script>

<style scoped>
  .app {
    width: 300px;
    background-color: #ccc;
    display: flex;
    justify-content: center;
  }
  .item {
    flex: 1;
    text-align: center;
    height: 60px;
    line-height: 60px
  }
  .active {
    border-bottom: 2px solid red
  }
  span{
    padding: 0 10px;

  }
</style>

