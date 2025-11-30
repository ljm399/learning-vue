//操作在main.js中

//vue-plugin插件
/* 
  concept概念
  插入的模式有两种(即app.use(这里面)):
  1,对象类型:一个对象,里面包含install方法
  2,函数类型:一个函数,直接调用,不用有install方法

  作用
  1,可以添加全局方法或property
  2,可以添加全局资源:指令(如:main.js中app.use(directives)/过滤器等
  3,可通过mixin混入一些组件选项
  4,放个库,自己提供api,同时提供上面所说1,2,3的功能如app.use(router)


  //看源码(这里演示router)
  方法一:
  直接去github上搜vue-router,找到它的源码
  方法二(推荐):
  去vue-router官网,从官网进入github,一般在github的根目录下有src文件夹,里面就是源码(具体一点在index.js中或你想要的比如router.js中) 

  router原理:
  当你app.use(router)时, 则你会使用到Router对象里面的install方法(默认给你app),下面解释
  源码:
  const router: Router = (router被赋值一个Router对象)
  {.......
  install(app: App) {
      const router = this
      app.component('RouterLink', RouterLink)//你可以使用<router-link>原因,它注册了全局组件RouterLink
      app.component('RouterView', RouterView)//<router-view>组件,原因同理
  }}


*/