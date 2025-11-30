<template>
    <!-- $attrs属性:非emit和props的属性 -->
    <!-- 默认加到根节点即是ul的属性上,也可以inheritAttrs:fales来不加 -->
    <!-- 主动获取的方式::class="$attrs.xxx" -->
    <ul class="word">
      <li >{{ crocodile }}</li>
      <li>{{ emit }}</li>
    </ul>
    <!-- 当有多根节点同时你为把inheritAttrs设为false,则必须绑定其中一个根节点,否则报错 -->
    <!-- 根组件是template的下一级如这时是ul和div -->
    <div class="root2" v-bind="$attrs">
      <div class="son" ></div>
    </div>
</template>

<script>
export default {
  // inheritAttrs: false,
  props: {
    crocodile: {
      type: String,
      default: "crocodile"
    },

    emit: {
      type: String,
      default: "emit"
    }
  }
}
</script>

<style scoped>

</style>

