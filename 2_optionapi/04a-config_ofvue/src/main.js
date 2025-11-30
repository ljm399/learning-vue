// import { createApp } from ''vue/dist/vue.esm-bundler.js'
import { createApp } from 'vue'
import './a/b/c/index'

//configuration配置文件,vue概念
/* 一,vue编译文件方法:(在src文件夹中)
  方法一,app.vue,sfc(single file component)单文件组件,然后impont导入组件(在src文件夹中) 
  即import App from './App.vue'
*/
  

/*
  方法二,或者自己在main.js定义个对象:template/data/methods等,但与1不同的是
  1.这里不需要使用.vue文件,直接在main.js中定义组件选项
  2.import {createApp} from 'vue'的'vue'变为'vue/dist/vue.esm-bundler.js'即下面 
  折叠代码为其原理(了解)
*/
// #region 折叠的代码
/*
function concept() {

   const App = {
     template: `
       <div>hello world</div>
     `
   }
   报错,要 Configure your bundler to alias "vue" to "vue/dist/vue.esm-bundler.js". 

   因为
   默认vue版本是routine+vue-loader,而vue/dist/vue.esm-bundler.js版本是routine+compiler

   详细解释:
   vue解析到浏览器的原理(即vue原理)
   vue.vue文件里的template/script/style默认会被vue-loader解析为createVNode,然后在变为虚拟node组为虚拟dom在到真实dom,最后渲染到浏览器
   而直接import {createApp} from 'vue',这个没有vue没有compiler,所以不能解析template/script/style,因此要在main.js中import {createApp} from 'vue/dist/vue.esm-bundler.js',给文件中添加compiler
}
*/
// #endregion


//二,configuration配置文件
//#region 折叠的代码
/*  (1) browserlistic文件:浏览器兼容配置文件(如>1%的浏览器才行)

(2)jsconfig.json文件:给vscode提示,以来用户友好提示
里面:1,'target':打成es5还是es6的包
2,'module':打印成什么样的模版
3,'baseUrl':相对路径

4,'paths':路径配置(方便用户设路径)
方法一:推荐在这(jsconfig.json),因为这里配置的会覆盖vue.config.js的alias,同时有代码提示)

  方法二(不推荐):在vue.config.js的configuraWebpack对象加入resolve: {alias: {'@': resolve('src')}}


  5,'lib':友好提示用户的库 */
  //#endregion

//三,vite工具的打包是vite,cli工具的打包是webpack
   

//importglobal全局导入组件(全局引入组件),必须加./
import A  from './Components/import-Global'
import App from './App.vue'

const app = createApp(App)
app.component('Causal', A)// 第一个参数是组件名,第二个参数是组件
// 一旦注册，你就可以在项目中的任何其他组件的模板里直接使用 <Causal></Causal>，而不需要在每个使用它的地方都单独 import。
app.mount('#app') 


  