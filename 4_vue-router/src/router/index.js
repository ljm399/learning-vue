import { createRouter,  createWebHashHistory } from "vue-router";

//3,路由懒加载(推荐):当打包构建应用时,javascript包会变得非常大,影响页面加载,可以分包
// import Home from '../views/Home.vue'
// import About from '../views/About.vue'

//3.1,方式一和魔法注释(找到打包好的包),chunk块
//异步组件:() => import('文件路径')
const About = () => import(/* webpackChunkName: 'About' */'../views/About.vue')



//创建一个路由:映射关系
const router = createRouter({
  //1,指定路由模式(默认hash模式)或者history模式
  //1.1,hash模式(http://localhost:8080/#/home)(推荐)
  history: createWebHashHistory(),

  //1.2,history模式(即使http://localhost:8080/home没有#),要引入createWebHistory
  // history: createWebHistory(),
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

  //不能在route数组里面,因为在里面就是注册了就是方案一的缺点
    let isAdmin = true;
    //输入正确的路径才能看到
    if (isAdmin) {
      // 一级路由,一个参数(即对象)
      router.addRoute({
        name: 'admin',
        path: '/admin',
        component: () => import('../views/Admin.vue')
      })

      // 二级路由,第一个参数是父组件的name不能是path,第二个参数是对象
     router.addRoute('admin', {
        name: 'vip',
        path: 'vip',
        component: () => import('../views/sonOfAdmin.vue')
      })
      
   } 

//8.3,router.hasRoute方法:判断路由是否存在
console.log(router.hasRoute('admin'))//true

//8.4,router.getRoutes方法:获取所有注册的路由
console.log(router.getRoutes())//包括子组件

router.beforeEach((to, from) => {
  const token = localStorage.getItem('token')
  if (!token && to.path !== '/login') {
    //9.2.2,返回值可以是字符串,也可以是对象(包括name,path等)
    return '/login'

  }


})

export default router