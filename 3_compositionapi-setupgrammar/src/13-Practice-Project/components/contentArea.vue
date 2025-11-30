<script setup>
import { computed } from 'vue';
const props = defineProps({
  Data: {
    type: Object,
    default() {
      return {};
    },
  },
});

//look看:计算属性computed,返回的是一个对象
//defineProps 的返回值直接是 props，不需要加上 value,但外面调用computed需要加上value(除了template内)
//fontSize先别加px,因为其可能会默认加
const cptData = computed(() => {
  return {
    //look看,要是加||,则要是前面的值为空,则返回后面的值
    comment : props.Data.comment.join('') || 'i am defalut',
    color : props.Data.bottom.color || '#000',
    fontSize : props.Data.bottom.fontSize || '14px',
  }
})
</script>

<template>
  <div class="app">
    <div class="info" >
      <div class="item" v-for="item in Data.info" :key="item.id">
        <div class="cover">
          <!-- look看:src展示不了/img图片/图片展示 -->
          <!-- 通过这方法打印看对不 -->
          <!-- <div>{{ item.pic }}</div> -->
          <!-- solve -->
          <!-- 1,把静态文件如图片放在public文件夹中,才可以./ -->
          <!-- 2,否则,就require("@/data/assets/pic/Snipaste_2024-04-18_20-01-58.png")同时(./是src/下的即src/assets),assets自残 -->
          <img :src="item.pic" alt="">
        </div>
        <div class="title">
          {{ item.title }}
        </div>
        <div class="content">
          {{ item.content }}
        </div>
        <div class="price">
          {{ item.price }}
        </div>
        <!-- look看:绑定样式,对象绑定 -->
        <div class="comment" :style="{ fontSize : cptData.fontSize, color : cptData.color }">
          {{ cptData.comment }}
        </div>
      </div>
    </div>
  </div>
</template>


<style scoped lang="less">
  .info {
      display: flex;
      justify-content: space-between;
      .item {
        width: 33%;
        img {
          height: 100px;
          width:100%
        }
      }
    }
</style>