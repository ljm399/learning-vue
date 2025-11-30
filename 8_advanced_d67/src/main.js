import { createApp } from 'vue'
// import App from './1-customDirectives/App.vue'
// import App from './2-built-in_component/App.vue'
// import App from './3-vue_plugin/App.vue' 
// import App from './4-hFuntion_renderFuntion/App.vue'
// import App from './5-jsx-grammer/App.vue'
import App from './6-transitionAnimation-built-in_component/App.vue'

//看效果则把注释删除
//#region 使用全局指令方法一到三
  //方法一focus
  // const app = createApp(App)
  // app.directive('focusa', {
  //   mounted(el) {
  //     el.focus()
  // }
  // })
  // app.mount('#app')


  //方法二:导入函数
  //看导入的路径)
  // import directiveFocus from './1-customDirectives/globalDirectives/focus'
  // import dierctiveFtime from './1-customDirectives/globalDirectives/ftime'
  // const app = createApp(App)
  // app.use(directiveFocus).use(dierctiveFtime).mount('#app')


  //方法三:方法二和方法一的问题相同,其他指令还有要在这里导入然后app.use(directiveFocus).use(dierctiveFtime).mount('#app')
  //解决:找一个文件,专门管理各种指令即方法三在1/globlDirectives/index.js
  //方法三:使用vue-plugin插件
  // import directive from './1-customDirectives/globalDirectives'
  // createApp(App).use(directive).mount('#app')

//#endregion




//vue_plugin的操作,看效果则把注释删除
//#region 
/* 
  const app = createApp(App)
  //1,插入的是对象(必须有install函数/install函数)
    app.use({
      install:function(app,options) {
        // 第一个参数是app,可不写,但可以使用
        // 第二个参数是options,你传入的参数,可不写
        console.log('传入的普通对象的install函数被执行了',app,options)
      }
    })

  //原理:详细在vue_plugin文件中,大概是
  //  function use(obj) {
  //  obj.install(app)
  //  }


  //2,插入的是函数
  app.use(function() {
    console.log('传入的普通函数被执行了',app)
  })

  app.use(directive).mount('#app')
*/
//#endregion


createApp(App).mount('#app')