# 一. 邂逅vue.js开发

### 1.1. vue介绍

- vue的介绍
- Vue在前端的地位
  - react
  - angular





### 1.2.Vue下载和使用

- CDN引入
- 下载引入
- 初体验一下Vue开发





### 1.3.Vue的三个案例

### 1.3.1. 动态数据展示





### 1.3.2. 动态展示列表

- v-for





### 1.3.3. 计数器案例

- counter
- increment
- decrement



### 1.4. 命令式和声明式编程的区别

- 原生实现计时器





### 1.5. MVC和MVVM的模型区别

-   mvvm-model(script),view(tample),viewmodel(核心,作用于view和model之间),mvc-model,view,control(与viewmodel作用一样)



### 1.6.options api的data详解

- data必须是一个函数,函数会放回 同一个对象
- data返回的对象,会被vue进行劫持(放到响应式系统中),所以data的数据发生改变时,界面会重新渲染





### 1.7. options api的methods详解

- 对象 -> 很多函数

- 里面函数不能是箭头函数:

  - this

  - 理由:

  - ​    *//箭头函数没有自己的`this`,它的`this`会捕获其所在上下文的`this`值。*

    ​    *//在这里,`methods`对象是`createApp`的参数,其上下文是全局作用域(window),所以箭头函数内的`this`指向`window`*

    ​    *//而Vue组件的方法需要`this`指向组件实例来访问`data`和`methods`,所以使用箭头函数会导致找不到`this.message`*

    ​    *//所以箭头函数写法不能用*





# 二. 基础 - 模版语法

### 2.1. 添加代码片段

-  option还有很多属性如props,watch之后会学 

   到snippet-generator.app网站 

   文件 -> 首选 -> 设置 -> 用户代码片段 -> 选择html.json 



### 2.2. mustache语法(插值语法)

- 表达式

- ```
      <!-- 1.1,插值语法:基本使用 -->
      <h2>{{ message }}</h2>
      <!-- 1.2,表达式 -->
      <h2>{{ count*2 }}</h2>
      <h2>{{ word.split() }}</h2>
  
      <!-- 1.3,三元表达式 -->
      <h2>{{ vibrate > 20 ? 'yes' : "no" }}</h2>
  
      <!-- 1.4,调用函数 -->
      <h2>{{ printWord() }}</h2>
  
      <!-- 注意:只能是表达式(既有结果的)不能是语句,否则报错 -->
      <!-- <h2>{{ const a = 2 }}</h2> -->
      <!-- <h2>{{ if( count>10){'yes'}else{'no'} }}</h2> -->
  ```

  



### 2.3. 不算常见的指令

- v-once

  - 只渲染一次

  - ```
      <h2 v-once>{{ message }}</h2>
    ```

    

- v-text

  - ```
        <h3 v-text="'message' ">{{ text }}</h3> // 显示mesage
    ```

  - message会覆盖text

  

- v-html

  - ```
        <!-- <h2>{{ <h1>i am h1</h1> }}</h2>无法编译,有时数据有标签:用v-html -->
        <h2 v-html="content"></h2>
    ```



- v-pre

  - ```
        <h2 v-pre>{{ message }}</h2> // 显示 {{message}} 而不是具体值
    ```

    

- v-cloak

  - 作用是解决在浏览器加载页面时，因为Vue还未渲染完成而导致用户短暂看到原始 “Mustache” 插值表达式（例如 {{ message }}）的问题

  - ```
    [v-cloak] {
          display: block;
        }
    
      </style>
    </head>
    <body>
      <!-- v-cloak渲染会等js渲染才展示 -->
      <div id="app">
        <h2 v-cloak>{{ message }}</h2>
      </div>
    ```





### 2.4. 新的指令 v-memo

```
    <div v-memo="[dent]">
      <div>第一:{{ message }}</div>
      <div>第二:{{ dent }}</div> 
      <div>第三:{{ cart }}</div>
    </div>
    <button @click="changeMsg">change</button> // 只有修改了dent,其他如message才能渲染
  </div>
```





### 2.5. v-bind绑定属性

```
    <!-- 1,基本绑定class,属性里面不能加{{ }}和小程序不同 --> 即classes不用加{{}}
    <h2 :class="classes">limb</h2>
```





### 2.5.1. v-bind绑定基本属性

- src	

  - ```
       <img v-bind:src="showImg" alt="">
        <div>
          <butto
    ```



- href

​		:href

#### 语法糖 

v-bind:src  ->  : src



### 2.5.2. v-bind绑定class

- 基本绑定
- 对象语法
  - {"className": Blooean}
  -   <button :class="{ active: isActive }" @click="changeClass">对象语法</button>
- 数组语法





### 2.5.3. v-bind绑定style

- 对象语法:
  - {cssname: cssvalue}
- 数组语法:
  - [obj1, obj2]





### 2.6. 动态绑定属性名

```
:[name] = ''
如<h2 :[name]="'aaa'">{{ message }}</h2> -- aa必须是""嵌套'',不然aa是变量而不是常量
```



### 2.7. v-bind绑定对象

- 将对象中所有key/value, 作为属性绑定到元素(组件)上



