# 一. 项目的搭建

### 1.1. 项目创建

- 方式一: Vue CLI (这里使用)

  - 命令: npm init vue@latest
  - 这个创建基于 vite  ------  优势: 相对于webpack,其可以按需打包 
    - 缺点: 本地服务看代码效果的热更新没webpack好

- 方式二: create-vue

  - 命令: vue create  
  - 基于webpack 

- 引入jsconfig.json --> 作用打代码时有友好提示

  ```json
  {
    "compilerOptions": {
      "target": "es5",
      "module": "esnext",
      "baseUrl": "./",
      "moduleResolution": "node",
      "paths": {
        "@/*": [
          "src/*"
        ]
      },
      "jsx": "preserve",
      "lib": [
        "esnext",
        "dom",
        "dom.iterable",
        "scripthost"
      ]
    }
  }
  ```

  - 里面不要配置experimentalDisableTemplateSupport:'true' , 因为配置就没有代码提示了

- 配置项目的icon  和 标题 ----- 都在 index.html里面配好

  - icon放在public文件夹中





### 1.2. 目录结构

- assets 文件
  - img/css/font/video 等静态文件 -- css也是静态的
  - components: 组件
    - 里面再创建个 base-ui 或者 common  用来放存放 多个项目都会公用的组件
    - content文件: 当前项目多个页面公用的组件
  - hooks
    - 多个组件用到的公共方法
  - mock
    - 服务器还没写好, 但 放 你要模拟的代码
  - router
  - service
  - store
  - utils
    - 单个组件用的方法
  - views/pages
    - 里面导航到components对应的组件中



### 1.3. CSS样式的重置

- npm install normalize.css

  - 导入 在 main.js

    ```
    import 'normalize.css'
    ```

- 在assets/css中

  - reset.css

    ```
    body, h1, h2, h3, h4, ul, li {
      padding: 0;
      margin: 0;
    }
    
    ul, li {
      list-style: none;
    }
    
    a {
      text-decoration: none;
      color: #333;
    }
    
    img {
      vertical-align: top;
    }
    ```

  - common.css

    - 放全局字体和样式

  - 通过index.css导出

    ```javascript
    @import "./reset.css";
    @import "./common.css"; -- 前面有个@, 这个css导入其他css的语法
    ```

    - main.js导入

      ```
      import './assets/css/index.css'
      ```

  - 在style 中使用 less语法
  
    - 先 npm install -D less



### 1.4. 配置路由

- npm install vue-router

- 在views中放好切换的组件 然后 在rouer配置

  - router/index

    ```
    import { createRouter, createWebHashHistroy } from 'vue-router'
    const router = createRoute({
    	history: createWebHashHistory(),
    	routes: [
    	]
    })
    ```

    

- 配置用户代码 - 占位符  -- 官网: https://snippet-generator.app

  - ${1:home} 可以vue创建的模板时,焦点聚焦到那个地方
  - $(2:home) 按tab其他聚焦

  

- pinia

  - npm install pinia

  - main.js

    ```
    createApp(App).use(router).use(pinia).mount('#app')
    ```

  - store/module
    - 放个组件需要管理的数据
  - store/index
    - 导入module里面的内容





# 二. 开发项目

### 2.1. 开放思维

1. 先把简单的任务完成 ( 如动态页面当个静态页面开发 ) -- 获取对应的成就感先

2. 完成后 再 去想怎么 抽取,优化代码 
3. 再去想 其是否可复用性/可维护性/可扩展性



### 2.2. 动态导入本地图片 vite 和webpack的区别

- 动态 指的是 <img ;src ='url'  的 url 是可变化的

- 本地图片指的是图片url是本地一个文件夹存储, 而不是来自服务器

- webpack

  ```javascript
  <img :src='require(url)'
  ```

- vite

  ```javascript
  getAssetURL = (image) => {
  	// 第一个参数: 相对路径
  	// 第二个参数: 当地路径的URL
  	return new URL(`../..assets/img/${image}`, import.meta.url).href
  }
  
  <img :src='getAssetURL(item.image)' alt=''>
  ```

  - 因为本地项目多处要用, 提取到utils , 不是hooks  -- 问ai现在有无更新

    ```javascript
    getAssetURL = (image) => {
    	// 第一个参数: 相对路径
    	// 第二个参数: 当地路径的URL
    	return new URL(`../assets/img/${image}`, import.meta.url).href 
        // 注意第一个参数路径要改
    }
    ```
    
  - 要是上面方法不行

    ```javascript
    const tabBarData = [
      {
        text: '首页',
        image: '/src/assets/img/tabbar/tab_home.png',
        active: '/src/assets/img/tabbar/tab_home_active.png',
        path: '/home'
      }, -- 本地文件改为/src/... 这样的绝对路径
    ```

    ##### 1. /src/assets/img/tabbar/tab_home.png ✅ 可以

    - 这是**绝对路径**，从项目根目录开始
    - Vite 开发服务器会直接处理以 `/src/` 开头的静态资源路径
    - 浏览器会发起 `http://localhost:5173/src/assets/img/tabbar/tab_home.png` 请求

    ###### 2. `../../assets/img/tabbar/tab_favor.png` ❌ 不工作

    - 这是**相对路径**，相对于当前 HTML 页面的位置
    - 在 SPA 应用中，页面 URL 可能是 `/home`、`/favor` 等路由路径
    - 浏览器会基于当前路由计算相对路径，导致路径错误
    - 例如在 `/favor` 路由下，`../../` 会解析为根目录的上两级，路径就错了

    ##### 3. `@/assets/img/tabbar/tab_order.png` ❌ 不工作

    - `@` 是 **Vite 的别名**，只在 JavaScript/TypeScript 模块导入时有效
    - 在 HTML 模板的字符串中，`@` 不会被 Vite 处理，浏览器不认识这个符号
    - 浏览器会尝试请求 `http://localhost:5173/@/assets/img/...`，这是无效路径



- < style lang='less' scoped >< / style> 使用了less语法
- 注意拿到的数据不同,则v-for="(这里面的值就不太)"
  - 要是拿到的是 数组 ,则 v-for= "(item, index)"
  - 对象 ,v-for= '(value, key, index)'





### 2.3.tab-bar的多种方案实现

1. 不使用第三方库

   样式: 

   ```javascript
   <div .box >
       <div></div>
       <div></div>
       <div></div>
       <div></div>
   </div>
   
   .box {
       display:felx
       
       div {
           flex: 1 --> 就可以实现布局了,而不用在.box里面加 justify-content: center这些
       }
   }
   ```

   

   

2. 使用

# 三. 使用UI组件库开发

- 先安装( 官网: https://vant-ui.github.io/vant/#/zh-CN  适合vue3 )
  - 在对应的官网上配置好 vue.config.json (vue 和 webpack 配置都有介绍)
    - 它会更加你使用的组件,自动为你导入相关组件代码
    - 不要选择其他的导入方式




- 先看官网有没有对应的样式,没有在自己修改第三方UI组件库的样式

  - 官网给的属性一般放在父组件标签中, 不行在放子组价 如

    ```javascript
        <van-tabbar v-model="currentIndex" active-color="yellow" inactive-color="#000"> --> 父组件中放属性,而不是<van-tabbar-itme>子组件中
            <van-tabbar-item>  
            </van-tabbar-item>
        </van-tabbar>
    ```

    - 是不是官网有说 Tabbar Props 则是父组件 , TabbarItem Props子组件

    

- 修改第三方UI组件库的样式的统一方法:可以应用到你react第三方库的修改当中  
  - 不是你自定义的标签(如img,span)
    - 一般组件会通过 用插槽 的方式让你 自定义元素
    - 你通过 .img {里面直接修改样式就行}
  - 方式一:  全局定义一个变量, 覆盖它默认变量 即在 common.css中  .root {里面修改}
    - 操作:
      1.  浏览器选中对应组件,
      2. 点击其css中的值 (值不是属性名), 然后进入浏览器中.root{里面}
      3. 复制粘贴到你common.css的style,修改样式
    - 缺点: 全局修改
  
  - 方式二: 在自己的作用域( 即< style scope >这里面< style >) 定义一个变量, 覆盖它默认变量的值  -- 推荐
    - 操作
      - 方法一的步骤2 复制粘贴到本地的style中 ,而不是common.css中
    - 优点: 布局修改
  
  - 方式三: 直接查找对应的子组件选择器, 进行修改
  
    - 在自己的作用 ( 即< style scoped >这里面< style >) 通过 :deep(子组件中元素的选择器) {修改样式}  -- 方法二不行就方法三
      - 操作:
        1. 浏览器选中对应组件,
        2. 复制属性名 (不是点击值了)
        3. 在本地的style中  :deep(.van-tabbar-item_icon) {里面修改样式}
  
    - 这里不能在浏览器找到对应类, 然后赋值粘贴到本地 <  style></ style> 里面直接修改 
      - 因为有scoped来表示这个组件是局部的, 而你引入第三库里面的组件的css也有scoped
      - 而 :deep(第三库的组件名) {} , deep 可以穿透到子组件的样式中,并覆盖和应用 ( :deep的原理 )





### 四. 开发整个项目

### 4.1. home

- 标题封装
  - view/home/cpns
    - 封装组件(.vue), 然后 导入到home.vue中 
    - 这样home.vue 非常整洁
  - 引入 common.css 的  :root {--primary-color: #ff9854;)
    - text { var(--primary-color )}

### 4.2. banner图 

- 样式

  ```javascript
  img {
    width: 100%;
  }
  ```



### 4.3. 三个行内元素,左右一个,右边其中一个是图标

- 样式

  ```javascript
  .box> span*3
  
  .box {
  	display: flex
  	第一个div {
  		felx:1 
  	}
      
      跳转第二个图标的上下位置, 通过relative跳转
      .icon {
          position: relative; 
          top: 3px;
        } 
      }
      
  }
  ```

  

