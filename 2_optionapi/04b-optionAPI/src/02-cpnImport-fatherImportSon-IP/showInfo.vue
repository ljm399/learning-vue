<template>
  <div class="app">
    <ul>
      <li>{{ surplus }}</li>
      <li>{{ Iran }}</li>
      <li>{{ drone }}</li>
      <li>{{ applicant }}</li>
      <li>{{  numb }}</li>
      <li>{{ showMessage }}</li>

      <!-- 非emit属性:非emit和props的属性 -->
      
    </ul>
  </div>
</template>

<script>
export default {
  // 1,props数组语法(这个是vue2,vue3不支持了,vue3用props对象语法)
  // props: ["surplus", "Iran", "drone", "applicant"]
  //弊端:1,没有类型检测,2,没有默认值

  // 2,props对象语法(用最多)
  props:{
    surplus:String,

    numb:{
      // 属性一,二:类型(Number,String,Boolean,Array,Object,Date,Function),default:默认值
      type:Number,
      default:10
    },

    // 属性三:require:true,则必须传值,不用设默认值
    Iran: {
      type: String,
      // required: true,
    },

    //注意一:类型是Array或Object时,default必须是一个函数,以函数返回值作为默认值
    drone: {
      type: Array,
      default() {
        return ["无人机", "无人机"]
      }
    },

    //写法二
    applicant:{
      type:Object,
      //tip提示对象:返回值是对像是的箭头函数必须用()小括号括起来
      default:()=>({name:"张三",age:18})
      
    },

    //props名的写法:大写对应-或
    showMessage:String
  }
}
</script>

<style scoped>

</style>


