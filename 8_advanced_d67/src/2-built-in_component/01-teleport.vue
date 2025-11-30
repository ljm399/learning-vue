<script setup>
//teleport组件(teleport运输):翻译为"传送"
//作用:将teleport组件中的部分内容移动到指定的位置:比如:将teleport组件中的部分内容移动到当前template的app之外(脱离dom树)

//属性:
//1,to:指定移动到的位置
//2,disabled:是否禁用teleport组件
</script>

<template>
  <!-- teleport组件 -->
  <div class="app">
    <h3>
      <div>i am app的h3里面的</div>
      <Teleport to="#abc">
        <div>我不再app的h3里面</div>
      </Teleport>
      <h4>
        <div>i am app的h3里面的h4</div>
        <!-- 多个teleport,不会覆盖(在html文件中) -->
        <Teleport to="#abc">
          <div>我不在h4的里面</div>
        </Teleport>
      </h4>
    </h3>
  </div>
</template>


<style scoped>

</style>