<template>
  <!-- problem问题for循环不是写在ul上 -->

  <!-- tip提示emits:使不使用emits或者props看父组件和子组件传数据不,这里因为切换tab,和父组件没关系所以不用 -->
  <div class="app">
    <div class="item" 
      v-for="(item, index) in title"
      :key="item"
      @click="itemClick(index)"
      :class="currentIndex === index ? 'active' : ''"
    >
    {{ item }}
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

