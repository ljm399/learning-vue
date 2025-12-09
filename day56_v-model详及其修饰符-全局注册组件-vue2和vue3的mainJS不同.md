# 一. 阶段案例

### 1.1. 购物车



### 1.2. 列表的选择(点击一项,变成选中状态)

- currentIndex记录点击
  - 凡是点击显示都用到currentIndex

#### 样式

```javascript
<table>
      <thead>
        <tr>
          <td></td>
          <td>书籍名称</td>
          <td>出版日期</td>
          <td>价格</td>
          <td>购物数量</td>
          <td>操作</td>
        </tr>
      </thead>
      <tbody>
        <tr :class="{'active': currentIndex === index}" @click="triggle(index)" v-for="(item,index) of cartData">
          <td>{{ item.id }}</td>
          <td>{{ item.name }}</td>
          <td>{{ item.date }}</td>
          <td>{{ formatPrice(item.price) }}</td>
          <td>
            <button v-bind:disabled="item.purchase < 2 " @click="btnSub(index)">-</button>
            {{ item.purchase }}
            <button @click="btnAdd(index)">+</button>
          </td>
          <td>
            <button @click="removeTr(index)">{{ item.status }}</button>
          </td>
        </tr>
      </tbody>
    </table>
--------------------------------------------------------------
// 列表的选择(点击一项,变成选中状态)
data: function () {
    return {
      //引入data方法一
      // cartData

      //引入data方法二
      cartData: cartData,
      Isactive: true,
      currentIndex: 0
}
    
methods: {
    triggle(index) {
          this.currentIndex = index
    }
}
```



-    <tr :class="{'active': currentIndex === index}" @click="triggle(index)" v-for="(item,index) of cartData">
  - 注意看 :class 和 {里面放逻辑}







# 二. v-model双向绑定

### 2.1. v-model基本使用

- input手动双向绑定
- v-model
- 原理

```javascript
    <input type="text" v-model="message">

    // 以下是上面的原理
    <!-- 声明式原理：不是底层，你这不知道:value(让dom知vue数据变化)怎么绑定vue,@imput同理(让vue知dom数据变化) -->
    <input type="text" :value="message" @input="inputChange">
    <h2>{{ message }}</h2>

-----------------------------------------------------
     data: function () {
        return {
          message: 'vibrate'
        }
      },
      methods: {
        inputChange() {
          // 参数不用加event，因为vue会自动传入event
          //event会有target（事件）
         // 原理
          this.message = event.target.value
        }
      }
```





### 2.2. v-model其他类型

- textarea

  ```javascript
  <textarea  cols="30" rows="10" v-model="message"></textarea>    
  <h5>{{ message }}</h5>
  
  -------------------------------------
  data: function () {
  return {
    message: 'vibrate'
  }
  },
  ```

  

- checkbox
  - 单选

    ```javascript
    <label for="agree">
      <!-- v-model返回的是个布尔类型,所以无论message有无值,点后都是true/false -->
      <!-- 单选框value不影响,返回的是布尔类型 -->
      <input type="checkbox" id="agree" v-model="message">同意协议
      <h3>{{ message }}</h3>
    </label>
    ----------------------
    data: function() {
        return {
            message: 'a' -> message的值什么都可以,所以你就当a是默认值,但一定要v-model绑定data中的message,才有响应式
        }
    }
    ```

    

  - 多选

    ```javascript
    <div id="hobbies">
      <h3>清选择你的爱好</h3>
      <label for="sing1">
        <input type="checkbox" id="sing1" v-model="hobbies" value="sing">唱
      </label>
      <label for="dance1">
        <input type="checkbox" id="dance1" v-model="hobbies" value="dance">跳
      </label>  
      <label for="rap1">
        <input type="checkbox" id="rap1" v-model="hobbies" value="rap">rap
      </label>
      <label for="basketball1">
        <input type="checkbox" id="basketball1" v-model="hobbies" value="basketball">篮球
      </label>
      <h3>{{ hobbies }}</h3> // 里面是value的值如basketball,而不是篮球
    </div>
    
    ----------------------------------
    data: function () {
        return {
          message: 'vibrate',
          hobbies:[],//必须要加[],否则hobbies的值是undefined 
        } => 没有其他逻辑,因为v-model后台以及完成了
        
    --------------------------------------------------------
    当数据是服务器放回
    <template v-for="item in data" v-key="item.value">
      <label :for="item.name">
        <input type="checkbox" :id="item.name" v-model="hobbies2" :value="item.name">{{ item.name }}
      </label>
    </template>
    <h3>{{ hobbies2 }}</h3>
    ```

    

- radio

  ```javascript
    <label for="male">
      <input type="radio" id="gender" name="gender" value="male" v-model="message">男
    </label>
    <label for="female">
      <input type="radio" id="gender" name="gender" value="female" v-model="message">女
    </label>
  
  -------------------------------------------
  data: function () {
      return {
        message: '男' -> 默认值是男,当点击后再male和female之间切换,和checkbox单选一样
      }
    },
  ```

  

- select
  - 单选

    ```javascript
    <select v-model="fruits">
      <option value="apple">苹果</option>
      <option value="banana">香蕉</option>
      <option value="orange">橙子</option>
    </select>
    <h3>{{ fruits }}</h3>
    ```

    

  - 多选

    ```javascript
    <select v-model="fruits" multiple>
      <option value="apple">苹果</option>
      <option value="banana">香蕉</option>
      <option value="orange">橙子</option>
    </select>
    
    <hr>
    <!-- 3,valueBind值绑定-处理服务器的数据 -->
    <!-- v-for在option里面 -->
    <select v-model="fruits"  multiple>
      <option :value="item.value" v-for="item in data" v-key="item.id">{{ item.name }}</option>
    </select>
    ```

    



### 2.3. v-mode值绑定





### 2.4. v-model修饰符

- lazy
  - 等input失去焦点才执行

- number
- trim

```javascript
    <!-- 1,lazy不是:是. -->
    <!-- 把v-on绑定的事件改为了change事件 -->
    <input type="text" v-model.lazy="message">
    <h3>{{ message }}</h3>


    <!-- 2,trim:删除多余空格 -->
    <!-- 由于html解析默认把空格合并,故要用到watch监听(事件监听)属性 -->

    <input type="text" v-model.trim="trimMsg">
    <h3>{{ trimMsg }}</h3>


    <!-- 3,number: -->
    <!-- 默认使你再次输入的值为string -->
    <input type="text" v-model="num">
    <h3>{{ num }}-{{ typeof num }}</h3>

    <!-- 方法一:加上number强制为number类型 -->
    <input type="text" v-model.number="num">
    <h3>{{ num }}-{{ typeof num }}</h3>

    <!-- 方法二 ,type为number-->
    <!-- 只能给你输入数字,其他不行 -->
    <input type="number" v-model="num">
    <h3>{{ num }}-{{ typeof num }}</h3>
```







# 三.组件化的基础

### 3.1. 组件化的思想

-   组件开发-把一个大问题拆分小问题 

    根组件-几个大组件-再拆分几个小组件 



### 3.2. 注册全局组件

```javascript
//1,组件:App组件(根组件)
const App = {}


//2, 创建 app
const app = Vue.createApp(App)

//3,注册其他全局属性(NI)
app.component("WordMean",{
  template: "#word",
  data() {
    return{
    word: "architecture"
    }
  },
  methods:{
    changeWord() {
      this.word = "建筑学"
    }
  }
})

app.component("product-item", {
  template: "#item"
})
```

### vue2和vue3里面的main.js不一样

**不一样，区别非常大！**

这是一个非常经典的误区。虽然它们都是入口文件，作用都是“启动应用”，但 **代码写法** 和 **底层逻辑** 发生了彻底的改变。

一句话总结核心区别：
*   **Vue 2** 是 **“修改全局对象”**（所有 Vue 实例共用一套配置）。
*   **Vue 3** 是 **“创建独立实例”**（每个 App 都有自己的配置，互不干扰）。

我把两者的代码放在一起对比，你一眼就能看出不同。

---

####  代码直观对比

#### 1. Vue 2 的 `main.js` (旧时代)

我们在 Vue 2 里，是直接导入一个叫 `Vue` 的大对象（构造函数），然后往它身上挂东西。

```javascript
// --- Vue 2 ---
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 1. 全局注册插件 (直接修改了 Vue 这个大对象)
Vue.use(router) 
Vue.prototype.$http = axios // 挂载全局属性

// 2. 实例化
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app') // 3. 挂载到 HTML
```

#### 2. Vue 3 的 `main.js` (新时代)

Vue 3 引入了 **工厂模式**。不再有全局的 `Vue` 对象了，取而代之的是 `createApp` 函数。

```javascript
// --- Vue 3 ---
import { createApp } from 'vue' // 注意：是按需引入，不是 import Vue
import App from './App.vue'
import router from './router'
import store from './store'

// 1. 创建应用实例 (app)
const app = createApp(App)

// 2. 注册插件 (挂载在 app 实例上，而不是全局)
app.use(router)
app.use(store)

// 3. 挂载全局属性 (变了！不再是 prototype)
app.config.globalProperties.$http = axios 

// 4. 挂载到 HTML
app.mount('#app') // 注意：没有 $ 符号了
```

---

####  核心区别解析 (面试必考)

如果你面试时被问到这个，请回答以下 3 点：

#### 1. 创建方式变了 (`new Vue` vs `createApp`)
*   **Vue 2**: 使用 `new Vue()`。这意味着 Vue 是一个**类**。
*   **Vue 3**: 使用 `createApp()`。这意味着 Vue 变成了一个**函数式**的工厂。
*   **为什么改？** 为了支持 **Tree Shaking**（摇树优化）。Vue 3 没用到的功能打包时会自动删掉，体积更小。

#### 2. 全局 API 变了 (避免全局污染)
*   **Vue 2**: `Vue.component`, `Vue.use`, `Vue.directive`。
    *   *缺点：* 如果你在页面上同时启动了两个 Vue app，你给 App A 注册的组件，App B 居然也能用！这叫**全局污染**。
*   **Vue 3**: `app.component`, `app.use`, `app.directive`。
    *   *优点：* 所有的配置都只属于 `app` 这个变量。如果你再 `createApp` 一个 `app2`，它俩是完全隔离的。

#### 3. 挂载方法的微调 (`$mount` vs `mount`)
*   **Vue 2**: `.$mount('#app')`
*   **Vue 3**: `.mount('#app')` (去掉了 `$`)

#### 总结

面试时不用背代码，记住这句话：
**“Vue 3 去掉了全局的 Vue 构造函数，改为使用 `createApp` 创建独立的 App 实例。这样做是为了避免全局污染，并且对 Tree Shaking 更友好。”**

#### 原型链和作用域去理解

"从**原型链**的角度来看，**Vue 2** 的设计是基于**构造函数**的。所有的全局配置（如插件、全局属性）都直接修改了 Vue.prototype。由于 JS 原型链的特性，所有实例共享同一个原型，这就导致了无法在同一页面隔离多个应用，产生**全局污染**。

而 **Vue 3** 采用了**工厂模式**（createApp）。它不再修改公共的原型，而是创建独立的 app 对象，将配置保存在这个**对象实例的内部作用域**中。这样，不同实例的配置完全解耦。



### 其他问题

#### 1. Vue 2 (对象挂载 -> 难以消除)

在 Vue 2 里，所有 API（如 nextTick, set, delete）都作为属性挂在 Vue 这个大对象上。

```
import Vue from 'vue';
Vue.nextTick(() => {});
```

**Webpack 很难优化：** 即使你只用了 nextTick，但因为你引入了整个 Vue 对象，打包工具无法确定 Vue 上的其他属性（如 Vue.set）将来会不会被用到（因为 JS 是动态语言，对象属性太容易被动态访问了）。为了安全，只能把整个 Vue 对象全打进去。

#### 2. Vue 3 (函数导出 -> 精准消除)

在 Vue 3 里，API 变成了独立的 **导出函数 (Export Functions)**。

```
import { nextTick } from 'vue'; // 按需引入
nextTick(() => {});
```

**Webpack 很容易优化：** 这就是纯粹的 **ES Module 静态分析**。打包工具一看：你只 import 了 nextTick，没 import reactive？好，那我直接把 reactive 的代码扔掉。

- 从**模块作用域**的角度看，Vue 2 将 API 挂载在 Vue 对象上，阻碍了静态分析；Vue 3 改为独立的**函数导出**，配合 ES Module，让打包工具能精准识别未使用的代码，从而实现了 **Tree Shaking**。"



### Vue 2 的源码逻辑其实是这样的（ES5 写法）：

```javascript
// 1. 定义构造函数
function Vue() {
  // 这里面啥都没写，或者只做初始化的事
}

// 2. 【关键】直接在 Vue 这个函数对象上挂载属性
// 这叫“静态方法”
Vue.nextTick = function() {
  console.log('我是静态方法，不用 new 就能用');
};

// --- 怎么用？---

// ✅ 直接通过类名调用
Vue.nextTick(); 

// ❌ 实例上反倒没有（除非也在 prototype 上挂了一份）
const app = new Vue();
app.nextTick(); // 报错：app.nextTick is not a function
```

- 而不是 ,这是一种是一种**极其浪费内存**的写法

  ```javascript
  function Vue() {
    // 这里的 this 指向的是 new 出来的那个对象 (app)
    this.nextTick = function() {
      console.log('我是实例方法');
    }
  }
  
  const app = new Vue();
  
  // ✅ 实例上有
  app.nextTick(); 
  
  // ❌ 构造函数（类）本身没有！
  Vue.nextTick(); // 报错：Vue.nextTick is not a function
  ```

#### 在 Vue 3 中，nextTick 既不在 app 实例上，也不在构造函数上。它变成了一个**独立的函数**。

- 这样导入 export {想要那个方法直接导入} from “vue”

- 比如：这就叫“函数式编程”的味道：

  ```javascript
  vue文件中
  function nextTick（）{ xxxxx}
  其他方法
  
  -----------------------------
  import { nextTick } from 'vue'; 
  
  // 2. 直接调用函数
  nextTick(() => {
    console.log('DOM 更新了');
  });
  ```

  



### vue2和vue3注册全局组件

```javascript
vue2
import Vue from 'vue'
import App from './App.vue'
// 1. 引入组件
import MyHeader from './components/MyHeader.vue'

// 2. 全局注册
// 语法：Vue.component('组件名', 组件对象)
Vue.component('MyHeader', MyHeader)

new Vue({
  render: h => h(App)
}).$mount('#app')


---------------------------
vue3
import { createApp } from 'vue'
import App from './App.vue'
// 1. 引入组件
import MyHeader from './components/MyHeader.vue'

// 2. 创建应用实例
const app = createApp(App)

// 3. 全局注册 (必须在 mount 之前)
// 语法：app.component('组件名', 组件对象)
app.component('MyHeader', MyHeader)

// 支持链式调用 (可以一直点下去)
// app.component('CompA', A).component('CompB', B)

// 4. 挂载
app.mount('#app')

```







### 3.3. 注册局部组件

```javascript
    const word = {
      template: "#word",
      data() {
        return{
        word: "architecture"
        }
      },
      methods:{
        changeWord() {
          this.word = "建筑学"
        }
      },
      //局部组件带其他组件,这里不行
      // components:{
      //   ProductItem
      // }
    }

    
    const app = Vue.createApp({
      //对象,组件名是键,内容是值
      components: {
        word,
        ProductItem: {
          template:`
          <div class="products">
               <h2>----i am product-item-----</h2>
               <h2>words: architecture integer raw</h2>
               <word></word>
               <h2>----product item end-------</h2>
           </div>
          `,
          //局部注册其他组件
          components:{
            word
          }
        }
      }
    })
    //4,挂载app
    app.mount('#app')
```



-  html中

  ```html
  <template id="word">
  	<div>----------i am word start=====</div>
  	<h3>{{ word }}</h3>
  	<button @click="changeWord">翻译</button>
  	<!-- <product-item></product-item> -->
  	<div>------------word end---------</div>
  </template>
  ```

  

# 四. Vue脚手架(day57更详细)

### 4.1. Vue的开发模式(看day57)

- html
- .vue文件





### 4.2. Vue Cli安装和使用





### 4.3. Vue项目目录结构

```
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


5,'lib':友好提示用户的库


//三,vite工具的打包是vite,cli工具的打包是webpack
```





### 4.4. browserslistrc文件作用(了解)

browserlistic文件:浏览器兼容配置文件(如>1%的浏览器才行)





### 4.5. 从main.js入口开始,如何一步步创建自己的组件

- App.vue
- ProductItem.vue

```javascript
import A  from './Components/import-Global'
import App from './App.vue'

const app = createApp(App)
app.component('Causal', A)// 第一个参数是组件名,第二个参数是组件
// 一旦注册，你就可以在项目中的任何其他组件的模板里直接使用 <Causal></Causal>，而不需要在每个使用它的地方都单独 import。

app.mount('#app') 

```

