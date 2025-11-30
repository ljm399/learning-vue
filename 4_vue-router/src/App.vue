<template>
  <div class="app">
    <h3>app router</h3>
    <div class="nav">
      <!-- router-link里面的属性/router-link属性: -->

      <!-- 1.1,to可以是字符串 -->
      <!-- <router-link to="/home" router-link-active="active">home</router-link> | -->
      <!-- 1.1.2,to可以是对象(少) -->
      <!-- <router-link :to="{ path: '/home' }">home</router-link>  -->

      <!-- 1.2,replace属性:作用不能返回
      原理调用router.replace(),而不是router.push() -->
      <router-link to="/about" replace router-link-active="active">about</router-link>|

      <!-- 1.2.2,默认:router-link-active,点击的router-link才有,可添加class,也可以自定义 -->

      <!-- 1.2.3,router-link-exact-active,当连接精准激活是,用于精准渲染a的class,也可以赋值(后面讲)作用和3一样 -->



      <!-- 2,动态路由基本匹配 -->
      <!-- 详细看view文件夹中的User.vue -->
      <router-link to="/user/123">user123</router-link> |
      <router-link to="/user/321">user321</router-link> |
      <router-link to="/login">login</router-link>
      <hr>


      
      <!-- 3,通过普通元素来跳转到home组件 -->
      <button @click="homeClick">Home</button>

      <hr>
      <!-- 4,页面的前进和后退 -->
      <button @click="jumpPage">页面前进和后退</button>


      <!-- 5,通过a来跳转路由 -->
        <!-- href='javascript:;'作用:这种做法通常用于创建一个看起来像是链接的元素，但实际上不希望它有任何跳转行为 -->
        <!-- prevent:可以阻止调转 -->
        <a href="baidu.com" @click.prevent="goSport">运动</a> ||
    </div>
    <router-view></router-view>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
function homeClick() {
  // 3.2,传入的是字符串(不是replace)(compositionapi写法)
  // router.push('/home')

  // 3.3,传入的是对象,为了有query
  router.push({ 
    path: '/home',
    query: {//home?name=mj&age=18
      name: 'mj',
      age: 18
    }
  })

  //3.3.2要是不是push,而是replace则不能返回,而是替换:即随机导航到一个新路由,而不会想push有历史记录
  // router.replace({ 
  //   path: '/home',
  //   query: {//home?name=mj&age=18
  //     name: 'mj',
  //     age: 18
  //   }
  // })
  
    //3.4,在home组件中获取query的值(不在app.vue中)
    // <!-- 获取query的值 -->
    //     <h3>Home--{{ $route.query }}</h3>
  }

    //4,页面的前进和后退(go方法)
    function jumpPage() {
      // router.back()
      // router.forward()

      //router.go(1)//forward()
      router.go(-1)//back()

      // router.go(-20)
    }

    //5,通过a来跳转路由
    // const goRead = () => {
    // router.push({
    //     path:'/read'
    // })
    // }
    // const goSport = () => {router.push({path:'/sport'})}
    // const goBack = () => {router.go(-1)}

</script>

<!-- <script>
  tip提示:optionApi不需要import { useRouter } from 'vue-router'
  export default {
    methods: {
      homeClick() {
        //3.2,传入的是字符串(optionapi写法)
        // this.$router.push('/home')
        
        //3.3,传入的是对象,为了有query
        this.$router.push({
          path: '/home',
          query: {
            name: 'mj',
            age: 18
          }
        })
      }
    }
  }
</script> -->

<style scoped>
  .router-link-active {
    color: red;
    font-weight: bold;
  }
  .active {
    color: red;
    font-weight: bold;
  }
</style>