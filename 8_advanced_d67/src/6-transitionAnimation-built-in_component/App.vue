<script setup>
//#region 认识transition组件
  /* 
  transition组件启动条件
  1,条件渲染:v-if/v-show
  2,动态组件:component
  3,组件根节点
  
  该组件由vue提供
  React中实现动画效果需要引入第三方库(react-transition-group)

  原理:即vue怎么给添加的元素添加动画效果
  1,自动嗅探是否应用了css过渡或动画
  2,如果transition组件提供了钩子函数,则该钩子函数会在恰当的时机被调用
  3,如果未检测到css过渡或动画和钩子函数,则会执行添加/删除DOM元素
  */
//#endregion
import Tst from './01-transition.vue'
import Anim from './02-animation.vue'
import TstAAnim from './03-combineWith_transitionAAnimati-AAttribute1.vue'
import Attr2 from './04-Attribute2-mode.vue'
import Cpn from './05-componentAnimation.vue'
import ListAnim from './06-listAnimation.vue'
</script>

<template>
  <div class="app">
    <p>transition</p>
    <Tst />
    <hr>
    <p>animation</p>
    <Anim />
    <hr>
    <p>transition和animation一起使用以及属性1</p>
    <TstAAnim />

    <hr>
    <p>属性二:mode</p>
    <Attr2 />

    <hr>
    <p>组件切换动画</p>
    <Cpn />

    <hr>
    <p>列表过渡/列表动画</p>
    <ListAnim></ListAnim>
  </div>
</template>


<style scoped>

</style>