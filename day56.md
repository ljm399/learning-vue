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

```
import A  from './Components/import-Global'
import App from './App.vue'

const app = createApp(App)
app.component('Causal', A)// 第一个参数是组件名,第二个参数是组件
// 一旦注册，你就可以在项目中的任何其他组件的模板里直接使用 <Causal></Causal>，而不需要在每个使用它的地方都单独 import。

app.mount('#app') 

```

