# 一. 案例阶段练习

### 1.1. 基本知识点练习

图片高度不一

- 方法一: 父元素同一宽高
- 方法二: 自己设好宽高



```
父
  import Data from '../../data/data'
  import TitleArea from './titleArea.vue'
  import ContentArea from './contentArea.vue'
  import { ref } from 'vue'

  //ref里面必须是对象,不然报错,因为这会导致 ContentArea 组件在最初渲染时收到一个空字符串，进而导致类型检查失败。
  const RData = ref({})
  //模拟网络请求
  setTimeout(() => {
  
  	// 拿到导入的数据, 因为data.js文件中是export default data,所以不用{data} from...
    RData.value = Data
  }, 1000);
</script>

<template>
  <div class="app">
    <TitleArea :title="RData.title" :subtitle="RData.subtitle" />
    <ContentArea :Data="RData"/>
  </div>
  
---------------------------------------
子
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
        
         问题:当src显示不了图片
          <!-- :src展示不了/img图片/图片展示 -->
          <!-- 通过这方法打印看对不 -->
          <!-- <div>{{ item.pic }}</div> -->
          <!-- solve -->
          <!-- data.js的图片的src的值写为require("@/data/assets/pic/Snipaste_2024-04-18_20-01-58.png")同时(./是src/下的即src/assets),assets自残 -->
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
        
        
        <!--绑定样式,对象绑定 -->
        <div class="comment" :style="{ fontSize : cptData.fontSize, color : cptData.color }">
          {{ cptData.comment }}
        </div>
      </div>
    </div>
  </div>
</template>
```





### 1.2. 组件化抽取的思想(重要)

- room-area
  - area-header
  - room-item





### 1.3. 对于复制数据使用computed



### 1.4. 模拟网络请求





# 二. Vue-Router

*目前前端三大主流框架:React,Vue,Angular都有对应路由(了解)*

*1,React:react-router*

*2,Vue:vue-router*

3,Angular:angular-router



### 2.1. 前端路由发展历程(了解)

- rounter路由概念

  router路由器:接受个公网ip,分配局域ip给其他电脑,在交换机上每个ip对应一个mac地址,路由器维护ip对应个mac这样的映射表

- 后端路由

  - *一个网站对应一个url,返回给服务器,后端服务器根据url返回对应的资源*

    *即url地址在后端服务器中对应后端资源如首页.html,这即是个映射表*

  - 好处:

    1. 有利于seo

    2. 服务器渲染好了页面,不需要再加载js和css

  - 缺点:

    1. 全有后端人员负责*

    2. 前端人员想要负责,则需要通过PHP,Java等语言编写页码程序,且需要服务器支持*

    3. 逻辑和页面耦合,不利于维护*

  

- 前后端分离

  - 核心:改变url地址,不向服务器发送请求,即不刷新页面

    - 随着Adjx的引入,前端通过Adjx获取资源,并通过JavaScript渲染页面,不再需要后端

  - 前端渲染:从后端服务器获取到的资源(包括html,css,js等),后端只是复制api接口

  - *好处:*

    1. 后端专注数据,前端交互和可视化

    2. 单页面富应用:SPA(Single Page Application):即给前后端分离的基础上加了一层前端路由即前端来维护映射表

    3. 映射表即通过url的hash值或html5的history来映射到对应的页面/组件

  - 缺点:不利于seo

    

- 单页面富应用
  - SPA : single page web application
  - 作用: 单页面富应用:SPA(Single Page Application):即给前后端分离的基础上加了一层前端路由即前端来维护映射表





### 2.2. 改变URL.页面不刷新的两种模式

- history模式
  -   history: createWebHistory(),

- hash模式
  -  history: createWebHashHistory()








### 2.3. Vue-Router的使用过程

- 安装
  - npm install vue-router
  
- 使用
  - 创建路由需要映射的组件
    - createRouter创建路由对象
      - 传入对应模式history: createWebHashHistory()
      
      - routes: 组件映射关系
      
        ```vue
        index.js
        import { createRouter,  createWebHashHistory } from "vue-router";
        //创建一个路由:映射关系
        const router = createRouter({
          history: createWebHashHistory(),
        
          routes: [
            
            //2,进入页面默认映射:
            //2.1方法一
            // { path: '/', component: Home},
        
            //2.2方式二
            { path: '/', redirect: '/home'},
        
            //3.2,方式二路由懒加载
            { 
        
             //4,routers数组的对象里面的属性
             //4.1,name属性:路由命名,唯一的不能重复
             name: 'home',
             path: '/home',
             component: () => import(/* webpackChunkName: 'home' */'../views/Home.vue'),
             //4.2,需要传值通过meta属性
             meta: {
               title: '首页'
             }
            },
            {
             path: '/about',
             component: About,
            //7.路由嵌套  
             children: [
              {
                // path的值是'',指的是about后面的值,所有不能加别的,比如没有/about/,所有不能是'/'
                path: '',
                redirect: '/about/family'
              },
              {
                path: '/about/family',
                component: () => import('../views/AboutFamily.vue')
              },
              {
                path: '/about/ranking',
                component: () => import('../views/AboutRanking.vue')
              }
             ]
            },
        
            //5,动态路由的基本匹配:多个用户可能访问同一个(user)组件,只是路径(id)不同
            //可以通过路径参数(:id)实现动态字段效果(如/user/1,/user/2)
            // 详细看User.vue
            {
             path: '/user/:id',
             component: () => import('../views/User.vue')
            },
            
        
            //6,没有对应的路径,调转到NotFound.vue
            //别在/user/后面输入,因为都会跳转到user.vue,选择其他路径如home
        
            //当你要对不存在的路径进行操作时可以在'/:pathMatch(.*)'后面添加*,则以数组方式呈现
            {
              // path: '/:pathMatch(.*)',
              path: '/:pathMatch(.*)*',
              component: () => import('../views/NotFound.vue')
            },
        
            //9
            {
              path: '/login',
              component: () => import('../views/login.vue') 
            }
          ]
        })
        ```
      
        
    
  - app.use(router) 来 注册路由
  
    - ```javascript
      import { createApp } from 'vue'
      import App from './App.vue'
      import router from './router'
      
      createApp(App).use(router).mount('#app')
      
      ```
  
      
  
  - 使用方法
    - < router-view > < /router-view > 
    - 与 < router-link > < /router-link >
      - 编程时导航



### 2.4. Vue-Router知识点补充

#### 2.4.1. 默认路径

- path -> redirect







#### 2.4.2. history 模式

- createWebHistory()





#### 2.4.3. router-link其他属性

- to
- replace
- active-class
- exact-active-class



```vue
<template>
  <div class="app">
    <h3>app router</h3>
    <div class="nav">
      <!-- 1.1,to的值是字符串 -->
      <!-- <router-link to="/home" router-link-active="active">home</router-link> | -->
      <!-- 1.1.2,to的值是对象(少) -->
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
    </div>
    <router-view></router-view>
  </div>
</template>

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
```





#### 2.4.4. 路由懒加载- 分包处理

```JavaScript
import { createRouter,  createWebHashHistory } from "vue-router";

//3,路由懒加载(推荐):当打包构建应用时,javascript包会变得非常大,影响页面加载,可以分包
// import Home from '../views/Home.vue'
// import About from '../views/About.vue'

//3.1,方式一和魔法注释(找到打包好的包),chunk块
//异步组件:() => import('文件路径')
const About = () => import(/* webpackChunkName: 'About' */'../views/About.vue')

const router = createRouter({
  history: createWebHashHistory(),

  //1.2,history模式(即使http://localhost:8080/home没有#),要引入createWebHistory
  // history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/home'},

    //3.2,方式二路由懒加载
    { 

     //4,routers数组的对象里面的属性
     //4.1,name属性:路由命名,唯一的不能重复
     name: 'home',
     path: '/home',
    
    // 懒加载分包快捷方式
     component: () => import(/* webpackChunkName: 'home' */'../views/Home.vue'),
     //4.2,需要传值通过meta属性
     meta: {
       title: '首页'
     }
    },
    {
     path: '/about',
     component: About,
    // 路由嵌套
     children: [
      {
        path: '',
        redirect: '/about/family'
      },
 
```





#### 2.4.5. 其他属性

- name
  - meta
  - router.meta


```javascript
import { createRouter,  createWebHashHistory } from "vue-router";
const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { 

     //4,routers数组的对象里面的属性
     //4.1,name属性:路由命名,唯一的不能重复
     name: 'home',
     path: '/home',
     component: () => import(/* webpackChunkName: 'home' */'../views/Home.vue'),
     //4.2,需要传值通过meta属性
     meta: {
       title: '首页'
     }
    
    
```





### 2.5. 动态路由使用

- path: /user/:id

```JavaScript
const router = createRouter({
  history: createWebHashHistory()
  routes: [
    //5,动态路由的基本匹配:多个用户可能访问同一个(user)组件,只是路径(id)不同
    //可以通过路径参数(:id)实现动态字段效果(如/user/1,/user/2)
    // 详细看User.vue
    {
     path: '/user/:id',
     component: () => import('../views/User.vue')
    },
  
```







### 2.6. NotFound页面匹配

- path: /: pathMatch(.*)

```javascript
    //没有对应的路径,调转到NotFound.vue
    //别在/user/后面输入,因为都会跳转到user.vue,选择其他路径如home

    //当你要对不存在的路径进行操作时可以在'/:pathMatch(.*)'后面添加*,则以数组方式呈现
    {
      // path: '/:pathMatch(.*)',
      path: '/:pathMatch(.*)*',
      component: () => import('../views/NotFound.vue')
    },
```





### 2.7. 路由的嵌套使用

1. 在一层路由中添加children属性: 
   1. {path: "recommend", component: () => import("../views/homeRecommend.vue")}
2. 在App.veu组件中添加 < router-view>
3. App.vue中设置路径跳转 < router-link>



```JavaScript
index.js
routes: [
    {
     path: '/about',
     component: About,
    //7.路由嵌套  
     children: [
      {
        // path的值是'',指的是about后面的值,所有不能加别的,比如没有/about/,所有不能是'/'
        path: '',
        redirect: '/about/family'
      },
      {
        path: '/about/family',
        component: () => import('../views/AboutFamily.vue')
      },
      {
        path: '/about/ranking',
        component: () => import('../views/AboutRanking.vue')
      }
     ]

-------------------------------------------------
App.vue
<template>
  <div class="app">
    <h3>app router</h3>
    <div class="nav">
      <router-link to="/about" replace router-link-active="active">about</router-link>|
      <!-- 通过普通元素来跳转到home组件 -->
      <button @click="homeClick">Home</button>
      <!-- 通过a来跳转路由 -->
        <!-- href='javascript:;'作用:这种做法通常用于创建一个看起来像是链接的元素，但实际上不希望它有任何跳转行为 -->
        <!-- prevent:可以阻止调转 -->
        <a href="baidu.com" @click.prevent="goSport">运动</a> ||
    </div>
    <router-view></router-view>
  </div>
</template>
```







### 2.8. 编程式导航

#### 2.8.1. 跳转的方式 -- 通过按钮

- push(路径)
- push({ path/query })
- replace()

```javascript
<button @click="homeClick">Home</button>

function homeClick() {
  // 传入的是字符串(不是replace)(compositionapi写法)
  // router.push('/home')

  // 传入的是对象,为了有query
  router.push({ 
    path: '/home',
    query: {//home?name=mj&age=18
      name: 'mj',
      age: 18
    }
  })

  // replace则不能返回,而是替换:即随机导航到一个新路由,而不会想push有历史记录
  // router.replace({ 
  //   path: '/home',
  //   query: {//home?name=mj&age=18
  //     name: 'mj',
  //     age: 18
  //   }
  // })
  
    // 在home组件中获取query的值(不在app.vue中)
    // <!-- 获取query的值 -->
    //     <h3>Home--{{ $route.query }}</h3>
  }
```





#### 2.8.2. 路径的切换

- back()
- forward()
- go(number)

```javascript
<button @click="jumpPage">页面前进和后退</button>

function jumpPage() {
  // router.back()
  // router.forward()

  //router.go(1)//forward()
  router.go(-1)//back()

  // router.go(-20)
}
```





### 2.9. 开放文件夹介绍

*views文件:存放页面组件,即单页面富应用中页面的组件*

*components文件:存放公共组件,即单页面富应用中不常改变的组件*