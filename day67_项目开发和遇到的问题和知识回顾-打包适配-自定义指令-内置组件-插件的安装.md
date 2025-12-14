# 一.详情页补充

### 1.1. 详情页滚动匹配TabControl

- 常用算法 --- 音乐播放器也是这个算法

  ```javascript
  let newIndex = ArrValues.length - 1 --newVal比ArrValue全都大
  ArrValues = [100,300,700,1010,3390,4440]
  for(let i = 0; i < ArrValues.length; i++) {
  if(newVal < ArrValues[i] - 50 ) {
    newIndex = i > 0 ? i - 1 : 0
    break
  }
  } 
  ```

- 步骤

  - 监听滚动，按上面的算法调用用组件（tab-control）里面的方法（itemClick）

    - 问题1：滚动时因为调用用组件（tab-control）里面的方法（itemClick),导致this.$emit也会触发，进而引发点击tab-control这个组件跳转对应位置也触发，从而无限循环调用导致bug

      ```
          itemClick(index) {
            this.currentIndex = index
      
            // 触发itemClick事件，并携带参数
            this.$emit('itemClick', index)
          },
      ```

      - 解决： 调用tab-control里面的其他方法,因为你的目的就是让this.currentIdex=index，从而切换tab-control的item.acitve

        ```javascript
          methods: {
            itemClick(index) {
              this.currentIndex = index
        
              // 触发itemClick事件，并携带参数
              this.$emit('itemClick', index)
            },
            innerItemClick(index) {
              this.currentIndex = index
            }
          },
        
        ```

        

        

    - 问题2： 点击tab-control这个组件跳转对应位置 会触发 监听滚动 这个方法

      - 解决

        - 步骤： 设置滚动锁 和 通过判断滚动 还是 点击来判断是否解开滚动锁

          ```javascript
          let itemClickScroll = false  ----------- 滚动锁
          const tabControlRef = ref(null)
          let sectionOffsetTop = -1
          // 点击跳转对应位置
          const outItemClick = (index) => {
            // console.log('activity',itemClickScroll)
            const name = names.value[index]
            const swiperElement = sectionRefs.value[name].$el
            sectionOffsetTop = swiperElement.offsetTop
            itemClickScroll = true  -------------  点击则锁上
            detailRef.value.scrollTo({
              top: swiperElement.offsetTop - 38,
              behavior: 'smooth'
            })
            currentIndex.value = index
          }
          
          
          
          // 滚动时匹配tabControl的name： 监听滚动
          watch(scrollTop, (newVal) => {
            // 证明是滚动而不是点击滑动就可以   
            if(newVal === sectionOffsetTop - 38) { ------  这个判断是因为 如果是点击不同标签则这两个一定不同， 但滚动刚开始这两个一定相同，于是达到可以证明是滚动而不是点击滑动就
              itemClickScroll = false 
             }
            
            if(itemClickScroll) return
          
             // 常用算法
            const values = Object.keys(sectionRefs.value)
            if (!sectionRefs.value || Object.keys(sectionRefs.value).length === 0) return
            const ArrValues = values.map(name => sectionRefs.value[name].$el.offsetTop)
            if(!ArrValues.length) {return}
            // console.log(ArrValues)
          
            let newIndex = ArrValues.length - 1
            for(let i = 0; i < ArrValues.length; i++) {
              if(newVal < ArrValues[i] - 50 ) {
                newIndex = i > 0 ? i - 1 : 0
                break
              }
            } 
              
           if (newIndex !== currentIndex.value) {  -- 这个作用： 解决 当连续点击了两次标签，则又会导致和之前的问题（因为点击两次那个滚动锁就解开了）
              tabControlRef.value?.innerItemClick(newIndex)
              currentIndex.value = newIndex
            }
          })
          ```

  

#### 1.1.2. 通过ref 获取 和 调用 组件内的方法

```javascript
<tab-control  ref="tabControlRef"  />

tabControlRef.value?.innerItemClick(newIndex)
```





# 基础知识：  用let和const都可以，因为ref，所以调用时是xx.value里面改



### 1.2. 获取ref时的报错

1. 报错，浏览器会控制台会告诉你哪里错了

2.  ```javascript
    const getSectionRefs = (ref) => {
      // if判断为了防止组件销毁时，ref为null，然后getAttribute报错
      if(ref) {
        //获取name属性
        const name = ref.$el.getAttribute('name')
        sectionRefs.value[name] = ref
      }
    ```





### 1.3. 顶部导航栏消失

- 不要使用position：sticky，这不会脱离标准流，所以让其消失则会出现碰撞感
- 解决
  - 使用可以脱离标准流就行， 如 fixed，absolute





# 二. 项目细节补充

### 2.1. 页面的滚动(window -> 页面滚动)

- 因为你的代码作用是 滚动到底部就发送网络请求

  ```javascript
  watch(isReachBottom, () => {
    homeStore.fetchHomeHouselist().then(() => {
      console.log('执行了')
      isReachBottom.value = false
    })
  })
  ```

  - 出现的问题： 导致要是切换到其他组件，可能会触发，因为要是其他组件的高度比较低，无论你是否在滚动方法里面取消了监听，依旧会触发
  - 解决
    - 设置为页面滚动就行



### 2.2. 首页的keep-alive

- 作用：从其他组件切换回来则不会重新渲染该组件，也不会发送新的网络请求

```javascript
<router-view v-slot="{ Component }">
  <keep-alive include="home">
    <component :is="Component"></component>
  </keep-alive>
</router-view>
```

- 解释这段代码

  1. **`v-slot="{ Component }"`**:

     - `<router-view>` 确定了当前 URL 应该显示哪个组件（比如 `Home.vue`）。
     - 但它不直接显示，而是通过 `v-slot` 把这个组件作为一个名为 `Component` 的变量暴露出来。这里的 `{ Component }` 是 ES6 的解构语法。

  2. **`<keep-alive include="Home">`**:

     - 这是 Vue 的一个内置组件，用于缓存组件实例。

     - `include="Home"` 的意思是：只有当 `Component` 的 `name` 选项是 "Home" 时，才缓存它

     - 设置Component的name

       - optionApi

         ```javascript
         <script>
         	export default {
         		name : home
         	}
         ```

       - 组合式函数
         - 在 3.2.34 或以上的版本中，使用 `<script setup>` 的单文件组件会自动根据文件名生成对应的 `name` 选项，即使是在配合 `<KeepAlive>` 使用时也无需再手动声明
         - 故目标文件是什么就是什么， 比如home.vue  则< keep-alive include="home" > 必须是小写home，大写Home这个不行

       

  3. **`<component :is="Component"></component>`**:
     - 这是一个动态组件。
     - `:is` 指令会渲染 `Component` 变量所代表的那个组件







### 2.3. 记录首页滚动的位置 

- 因为对home设置了keep-alive, 故这里面可以使用 onActivatied 与onDeactivated()这两个方法

  ```javascript
  home.vue
  onActivated(() => {
    homeRef?.value.scrollTo({
      top: scrollTop.value
    })
  })
  ```

  





### 2.4. 消息页面切换(v-show)

```javascript
    <tab-bar v-show="!route.meta.isShowTabBar"></tab-bar>
```

- 使用v-if的问题：要是从这个页面去其他页面，则个组件销毁，若再从其他个页面返回，则因为v-if被销毁不会恢复导致出现问题
- 解决： 使用 v-show



### 2.5. 移动端适配

- meta -> viewport

  ```html
  <!DOCTYPE html>
  <html lang="">
    <head>
      <meta charset="UTF-8">
      <link rel="icon" href="/favicon.ico">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
  ```

  

- px -> vw
  -  postcss-px-to-viewport
  
    - 安装 
  
      - npm install  postcss-px-to-viewport -D 
  
      - `-D` 是 `--save-dev` 的简写
  
        - `-S`（默认）  `--save`  dependencies  运行时依赖（上线时也需要）
        - `-D`  `--save-dev`  devDependencies  开发时依赖（打包、构建、测试等）
  
        
  
    - 配置对应文件 -- 具体去 官网： https://github.com/evrone/postcss-px-to-viewport
  
      ```javascript
      postcss.config.cjs中
      module.exports = {
        plugins: {
          'postcss-px-to-viewport': {
            viewportWidth: 375,
          },
        },
      };
      
      ```
  
      





### 2.6.项目打包和预览





# 三. 高级语法补充

### 3.1. 自定义指令

- 局部/全局

  - 局部自定义指令

    ```javascript
    vue文件中
    <script setup>
    //方法一
    // import { onMounted, ref} from 'vue';
    // // 获取组件实例
    // const inputRef = ref()
    // onMounted(() => {
    //   inputRef.value.focus()
    //   console.log("inputRef",inputRef)
    // })
    
    -----------------------------------------
    //方法二:导入对应方法
    // import useInput from './hooks/index.js'
    // const inputRef  = useInput()
        
    在./hooks/index.js中
    import { onMounted, ref} from 'vue';
    export default function useInput() {
      const inputRef = ref()
      onMounted(() => {
        inputRef.value.focus()
      })
      return inputRef 
    }
        
    ---------------------------------
    //方法三:自定义指令(局部)
    //注意:v开头f要大写
    // const vFocus = {
    //   //mounted是指令的生命周期函数,与setup,compositionAPi什么无关
    //   mounted(el) {
    //     el.focus()
    //   }
    // }
    </script>
    
    <script>
    //方法四:局部自定义指令(optionApi)
    // export default {
    //   directives: {
    //     focus: {
    //       //mounted是指令的生命周期函数,与setup,compositionAPi什么无关
    //       mounted(el) {
    //         el?.focus()
    //         // console.log(el)
    //       }
    //     }
    //   }
    // }
    </script>
    
    <template>
      <div class="app">
        <!-- ref="inputRef"的作用: 为了让js中通过const inputRef = ref()找到ref="inputRef"的input,然后在onMounted中使用 -->
        <input type="text" ref="inputRef">
    
        <h3>自定义指令(焦点获取只能一个,记得注释其他)</h3>
        <input type="text" v-focusa>
      </div>
    </template>
    <style scoped>
    </style>
    ```

  - 全局自定义指令

    - 挂载App的js文件中

      ```JavaScript
      import { createApp } from 'vue'
      import App from './1-customDirectives/App.vue'  
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
        import directive from './1-customDirectives/globalDirectives'
        createApp(App).use(directive).mount('#app')
      
      -------------------------------------------
      方法三中的directive
      作用也是思想:先把所有自定义组件引入到一个文件,再统一返回
      import directiveFocus from "./focus";
      import directiveUnit from "./unit";
      import directiveFtime from "./ftime";
      export default function directive(app) {
        directiveFocus(app);
        directiveUnit(app);
        directiveFtime(app);
      }
      ```

  - 全局自定义指令运用的思想:先把所有自定义组件引入到一个文件,再统一返回

    

    

- 生命周期函数

  ```javascript
  <script setup>
  //自定义指令的生命周期
  import { ref } from "vue";
  const count = ref(0);
  const showTitle = ref(true);
  const vCao = {
    created() {
      console.log("created:绑定的元素的属性或事件监听器应用之前执行");
    },
   beforeMount() {
      console.log("beforeMount:组件挂载之前执行");
    },
    mounted() {
      console.log("mounted:组件挂载之后执行");
    },
    beforeUpdate() {
      console.log("beforeUpdate:组件更新之前执行");
    },
    updated() {
      console.log("updated:组件更新之后执行");
    },
    beforeUnmount() {
      console.log("beforeUnmount:组件卸载之前执行");
    },
    unmounted() {
      console.log("unmounted:组件卸载之后执行");
    }
  }
  
  function change() { 
    showTitle.value = !showTitle.value; 
  }
  </script>
  
  <template>
    <div class="app">
      <button @click="count++">+1</button>
  	-- 点击调用了beforeUpdate 和 updated
  
  
      <button @click="change">显示与卸载</button>
      <h2 v-if="showTitle" v-cao>{{ count }}</h2>
  	-->点击若卸载 : 调用了 beforeUnmount 和 unmounted
  	--> 点击若显示: 调用了 created, beforeMount 和 mounted
    </div>
  </template>
  <style scoped>
  </style>
  ```

  

- 参数 - 修饰符- 值

  ```javascript
  //el即element的缩写
  const message = "指令的参数和修饰符"
  const vCao = {
    mounted(el, bindings) {
      // console.log('el',el) // 当前指令作用的dom元素
      console.log('bindings.arg',bindings.arg)//argmmmmm
      console.log('bindings.value',bindings.value)//即值message
      console.log('bindings.modifiers',bindings.modifiers)//即对象包含着修饰符
     
     // 修改不是响应式数据的message
     // 能修改成功原因: 指令内部并没有依赖Vue的响应式机制去更新视图。而是通过原生的JavaScript代码，在组件挂载时，一次性地、强制地把 message 的值写进了对应的HTML标签里
      setTimeout(() => {
        el.textContent = bindings.value 
      },2000)
    },
      
    // message修改后这个updated没有调用原因也是 指令内部并没有依赖Vue的响应式机制去更新视图
    updated() {
      console.log('updated')
    }
  }
  </script>
  <template>
    <div class="app">
      <h3>指令的参数和修饰符</h3>
      <!-- argm是参数--mj和abc是修饰符--message是值(三者可以只留一个或两个) -->
      <!-- message的值不能是0,false,null那些,否则h4不显示 -->
      <h4 v-cao:argmmmmm.mj.abc="message">我是参数</h4>
    </div>
  
  ```

  

- 案例练习

  - ​    注意: 自定义指令的值必须加引号如v-unit="'$'" , 不然他会把它当变量而非字符串导致报错 

  - 人民币符号

    ```javascript
    <template>
      <div class="app">
        <!-- 练习一:给钱加上¥ -->
        <!-- 没加ref,也可以修改template,上面有解释 -->
        <!-- 注意:value必须加引号如'¥',不然他会把它当变量而非字符串导致报错 -->
        <h4 v-unit="'$'">44</h4>
      </div>
    </template>
    <style scoped>
    </style>
    
    ---------------------------
    js文件中
    export default function directiveUnit(app) {
      app.directive('unit', {
        //el即element的缩写
        mounted(el, bindings) {
          const price = el.textContent
          let unit = bindings.value
          if(!unit) {
            unit = '¥'
          }
          console.log(bindings.value)
          el.textContent = unit + price
        } 
      })
    }
    ```

    

  - 时间格式化

    - 知识:10位即单位是秒,13位单位毫秒 

    ```javascript
    <script setup>
    const timestamp = 1648270539;
    </script>
    <template>
      <div class="app">
        <!-- 练习二:时间戳格式化 -->
        <!-- 知识:10位即单位是秒,13位单位毫秒 -->
        <!-- 注意:1,不能是xxxx/xx/xx,2,必须加引号不然自变量 -->
        <h2 v-ftime="'YYYY/MM/DD'">{{ timestamp }}</h2>
        <h2 v-ftime>{{ 1232314321657 }}</h2>
      </div>
    </template>
    
    --------------------------------
    js文件
    //要先npm i dayjs 
    import dayjs from 'dayjs';
    export default function directiveFtime(app) {
      app.directive('ftime', {
        mounted(el, bindings) {
          //1,获取组件的时间
          let timestamp = el.textContent
          if(timestamp.length === 10) {
            timestamp = timestamp * 1000
          }
          //2,获取传入的参数(即用户想要的格式是xx-xx-xx还是xx/xx/xx)
          let value = bindings.value
          if(!value) {
            value = 'YYYY-MM-DD HH:mm:ss'
          }
          //3,格式化时间
          console.log('timestamp', timestamp)//day.js可以是时间戳也可以是时间格式(如:2018-09-05)
          const formatTime = dayjs(timestamp).format(value)
          el.textContent = formatTime
        }
      })
    }
    ```

    




### 3.2. 内置组件补充

- teleport

  - 属性:
    1. to:指定移动到的位置
    2. disabled:是否禁用teleport组件
  - 作用:
    - 将teleport组件中的部分内容移动到指定的位置:比如:将teleport组件中的部分内容移动到当前template的app之外(脱离dom树


  ```vue
  vue文件中
  <template>
    <!-- teleport组件 -->
    <div class="app">
      <h3>
        <div>i am app的h3里面的</div>
        <Teleport to="#abc">
          <div>我不再app的h3里面</div>
        </Teleport>
        <h4>
          <div>i am app的h3里面的h4</div>
          <!-- 多个teleport,不会覆盖(在html文件中) -->
          <Teleport to="#abc">
            <div>我不在h4的里面</div>
          </Teleport>
        </h4>
      </h3>
    </div>
  </template>
  ```

  - index.html (总文件中)

    ```html
    <!doctype html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <link rel="icon" type="image/svg+xml" href="/vite.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Vite + Vue</title>
      </head>
      <body>
        <div id="app"></div>
        <div id="abc"></div> --> 传送到这里
        <script type="module" src="/src/main.js"></script>
      </body>
    </html>
    
    ```

    

- suspense

  -   suspense组件(测试,随时会被移除) 
       作用: 当异步数据/异步组件(不按执行顺序)可能无法显示,则会显示你自定义报错内容
  -    两个属性
    1. #default:如果default可以显示就显示   
    2. #fallback:若default不行,则显示fallback 

  ```vue
  <script setup>
  // 异步组件
  import { defineAsyncComponent } from 'vue';
  const N1 = defineAsyncComponent(() => import('./01-teleport.vue'));
  </script>
  
  <template>
    <div class="app">
      <Suspense>
        <template #default>
          <!-- 显示组件 -->
          <N1 />
        </template>
        <template #fallback>
          <h3>404,请刷新重试</h3>
        </template>
      </Suspense>
    </div>
  ```

  





### 3.3. 插件的安装

-  插入的模式有两种:

  1. 对象类型:一个对象,里面包含install方法

  2. 函数类型:一个函数,直接调用,不用有install方法

- 作用

  1. 可以添加全局方法或property

  2. 可以添加全局资源:指令(如:main.js中app.use(directives)/过滤器等

  3. 可通过mixin混入一些组件选项

  4. 放个库,自己提供api,同时提供上面所说1,2,3的功能如app.use(router)

- 对象类型
  - install -> app

- 函数类型
  - app

- 使用

  ```javascript
    const app = createApp(App)
    //1,插入的是对象, 则必须有install函数/install函数
      app.use({
        install:function(app,options) {
          // 第一个参数是app,可不写,但可以使用
          // 第二个参数是options,你传入的参数,可不写
          console.log('传入的普通对象的install函数被执行了',app,options)
        }
      })
  
    //2,插入的是函数
    app.use(function() {
      console.log('传入的普通函数被执行了',app)
    })
  ```

- 看vue-router源码,了解其如何使用插件

  ```javascript
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
  ```

  



#### 看源码方法

- 方法一:

 直接去github上搜vue-router,找到它的源码

- 方法二(推荐):

 去vue-router官网,从官网进入github,一般在github的根目录下有src文件夹,里面就是源码(具体一点在index.js中或你想要的比如router.js中) 

