<template>
  <div class="app">
    appvue
  </div>
  <!-- tip提示:属性名,要是前面不加:统一默认是string -->
  <!-- 给numb加:即v-bind绑定属性,使其变为js让js知道是数字,数组还是对象,同时也可让值就有赋值(a = b),三元表达式,有返回值的表达式 -->

  <!-- props属性 -->
  <!-- vue2-3当传递的数据加了冒号值才是自变量(即js),否则值就是字符串,同时加冒号的值可以在双引号里面加个单引号使其成为字符串如:surplus = "'剩余'" -->
  <show-info surplus="剩余"  :numb="30" Iran="伊朗" show-message="杠写法" />
  
  <show-info showMessage="驼峰写法"/>

  <!-- $attrs属性 -->
  <Attrs crocodile="鳄鱼" emit="发送" doWhat="youWant" />
</template>

<script>
import showInfo from "./showInfo"
import Attrs from "./classIs$attrs-NO$emitAProps"
export default {
  components: {
    showInfo,
    Attrs
  }
}
</script>

<style scoped>

</style>

