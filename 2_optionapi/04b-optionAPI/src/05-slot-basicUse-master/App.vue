<template>
  <div class="app">
    <!-- slot插槽 -->
    
    <slotUse>
      <!-- 1,基本使用 -->
      <!-- <h3>我不是默认值</h3> -->

      <!-- 2,具名slot:v-slot插槽 ,和缩写#  -->
      <!-- tip提示slot:值不需要加引号以及v-slot的缩写不用加冒号即#left -->
      <!--  NamedSlot具名插槽,必须包裹在template-->
      <template #left>
        <span>我是左边</span>
      </template>
      <template v-slot:mid>
        <span>我是中间</span>
      </template>
      <template v-slot:right>
        <span>我是右边</span>
      </template>
    </slotUse>

    <slotUse>
        <!-- 2.2v-slot的练习(利用值是自变量) -->
        <!-- tip提示:值不支持动态插槽即{{  }},但可以是[]使其成为动态表达式即动态插槽名 -->
      <template v-slot:[position]>
          <span>我在这</span>
      </template>
    </slotUse>

    <hr>

    <!-- tip提示@click值的使用:既然可以直接是counter++,也可以直接是表达式(赋值),三元表达式等等 -->
    <button @click="position = 'left'">left</button>
    <button @click="position = 'mid'">mid</button>
    <button @click="position = 'right'">right</button>
  </div>
</template>

<script>
import slotUse from './slotUse'
export default {
  components: {
    slotUse
  },
  data() {
    return{
      position:'left'
    }
  },
}
</script>

<style scoped>

</style>

