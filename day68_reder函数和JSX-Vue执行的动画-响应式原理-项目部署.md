# 一.render函数和JSX

### 1.1. render函数和h函数原理

- **渲染的正常流程**：我们平时写的 `<template>` 模板，Vue在背后会先把它编译成一个叫做 `render` 的函数。然后执行这个 `render` 函数，生成一个描述页面结构的JavaScript对象（这就是**虚拟DOM**，Virtual DOM）。最后，Vue根据这个虚拟DOM去创建和更新真实的页面DOM。
- **跳过编译**：如果我们不写 `<template>`，而是直接手写 `render` 函数，就等于我们帮Vue做了第一步的编译工作

> `render` 函数的核心任务就是**“画出”页面的蓝图（虚拟DOM）**。

- 它用什么“笔”来画呢？就是用 `h` 函数。`h` 函数是 `createVNode` 的别名（`h` 来自于 `hyperscript`，意为“生成HTML结构的脚本”）。
- 所以流程是：Vue调用 `render()` -> `render()` 内部调用 `h()` -> `h()` 返回一个虚拟DOM对象。

- h函数: h函数接收三个参数: 1,标签类型(字符串) 2,属性对象(可选),可为null 3,子元素(可选)



###  1.2. 解释optionapi和组合式使用h函数的不同

-  optionApi使用render是  return h("div", { className: "app" },)

    	   composition中的  return () => h('div', { className : 'app'} 而不直接return h(...)

- 原因

  ```javascript
  类比
  onClick={ this.count++ }：这会在渲染时就立刻执行 this.count++，而不是在点击时。这会导致无限循环（因为改变状态会触发重新渲染，重新渲染又会执行 ++）。
  onClick={ () => this.count++ }：这是正确的写法。你传递的是一个函数定义。这个函数只会在点击事件发生时才被执行。
  
  同理：
  return h(...) 就像 this.count++，在渲染时就执行了，是静态的。
  return () => h(...) 就像 () => this.count++，你提供了一个“待执行”的函数，Vue会在需要的时候（每次渲染时）去调用它，从而实现了动态和响应式。
  
  而optionapi可以因为
  在Options API中，render() 本身就是组件的一个方法。Vue的内部机制已经设定好了，在每次需要更新时，会自动去调用这个 render 方法。所以你不需要再用一个箭头函数去包裹它，直接在方法内部 return h(...) 即可
  ```

  





- h函数

  -  optionapi

    - 注意: 

    -   return createVNode("div", { class: "red" }, "hello world")缩写即h函数

        class可能会有错(因为类命名也是class这个关键字),所以用className代替

    ```vue
    <script>
    import { createVNode } from "vue"
    import { h } from "vue";
    import Rb from './dontlook.vue' --> 引入Rb组件
    export default {
      render() {
        return h("div", { className: "app" }, [
          h('h2', null, `当前计数为:${this.count}`),
          //1,触发事件方法一:箭头函数
          h('button', { onClick: () => this.count++ }, "点我+1"),
    
          //2,注意事项
            //1, 一定是onClick,不是onclick或其他
            //2,要加this无论使用methods还是data
    
          //3,触发事件方法二:普通函数
          h('button', { onClick: this.sub }, "点我-1"),
    
          //3,组件
          h(Rb) 
        ])
      },
      data() {
        return {
          count : 0
        }
      },
      methods: {
        sub() {
          this.count--
        }
      }
    }
    </script>
    <style scoped>
    </style>
    ```

  - Compositionapi

    - 使用setup语法糖,则要加template

    ```vue
    <script setup>
    //setup语法糖中使用h函数和render函数(setup只能一个,无论语法糖即下面的setup必须注释,但script可以多个)
    import { h,ref } from 'vue'
    import Rubbish from './dontLook.vue' 
    const count = ref(0)
    
    //注意只要是在script里面使用的,则调用ref函数必须使用value
    const render =() => h('div', { className : 'app'}, [
      h('h3', null, `当前计数为:${count.value}`),
      h('button', { onClick: () => count.value++ }, '+1'),
      h('button', { onClick: sub }, '-1'),
      h('p','下面是组件'),
      h(Rubbish)
    ])
    
    function sub() {
      count.value--
    }
    
    </script>
    
    <template>
      <!-- 使用语法糖setup则需要template,非语法糖setup不用template -->
      <render/>
    </template>
    
    
    ```

    - 不使用setup语法糖

    ```vue
    <script>
      //setup非语法糖中使用h函数和render函数
    import { h,ref } from 'vue'
    import Rubbish from './dontLook.vue' 
    export default {
      setup() {
        const count = ref(0)
        //注意只要是在script里面使用的,则调用ref函数必须使用value
        return () => h('div', { className : 'app'}, [
          h('h3', null, `当前计数为:${count.value}`),
          h('button', { onClick: () => count.value++ }, '+1'),
          h('button', { onClick: sub }, '-1'),
          h('p','下面是组件'),
          h(Rubbish)
        ])
    
        function sub() {
          count.value--
        }
    
      }
    }
    </script>
    
    没有template
    ```

    

    



### 1.3. JSX语法

- jsx语法,因为你使用render函数和h函数来创建虚拟DOM太麻烦

-  解决
  - jsx有配置babel插件来解析jsx语法,使其转化为h函数调用

-  babel其他作用:

  1. 将es6代码转化为es5

  2. 将jsx语法转化为h函数调用

  3. 将ts语法转化为js

- 注意

  - 前面所学的template直接使用,是vue-loader解析的,不是babel

  

- 使用条件:

#### 	1.先了解 webpack的cli 和 vite 区别

- **`@vue/cli`** 是 Vue.js 官方的脚手架工具，它内部集成了 `webpack`。所以，当您使用 `@vue/cli` 创建和管理项目时，实际上是在使用一个基于 `webpack` 的工作流。它帮助开发者快速搭建一个配置完备的、基于 `webpack` 的 Vue 项目。
- **`Vite`** 则是一个更新、更快的构建工具。它本身就自带了脚手架功能。您不需要一个像 `@vue/cli` 那样的独立工具来创建 `Vite` 项目。



2. 安转相关插件

   - webpack 和 cli: 
     - npm i @vue/babel-plugin-jsx -D
     - 同时到babel.config.js 配置
       - plugins:['@vue/babel-plugin-jsx']

   - vite则  

     - npm i @vitejs/plugin-vue-jsx -D

     - 到vite.config.js

       -   import vueJsx from '@vitejs/plugin-vue-jsx'

           export default defineConfig({

            plugins: [vueJsx()],

           })

3. 使用

   - optionapi

     ```vue
     <script lang="jsx">
     // 使用jsx语法:script标签中,加lang="jsx",告诉这不是普通的js语法
     import Rb from './dontlook.vue'
     
     //一在optionAPI中,使用jsx语法
     export default {
       render() {
         //return后面有括号原因
         /* 
         单行内容：如果你只返回一行的 JSX 代码，确实可以省略括号，像上面的例子一样。
     
         多行内容：如果返回的内容是多行的，使用括号是个好习惯，因为它可以避免一些潜在的语法问题，并提高可读性,
         
         即无论单或多行(下面是多行)可以不加扩号
         */
         return ( 
           <div class='app'>
             <h1>{this.count}</h1>
             {/* <button onClick={  this.count++ }>+1</button>  会报错 */}
             <button onClick={ () => this.count++ }>+1</button>
             <button onClick={ this.sub }>+1</button>
             <p>下面是组件</p>
             <Rb></Rb>
           </div>
         )
       },
       data() {
         return {
           count : 0
         }
       },
       methods: {
         sub() {
           this.count--
         }
       }
     }
     ```

   - Compositionapi

     - 使用setup语法糖

     ```vue
     <script setup lang="jsx">
     //setup语法糖中使用jsx语法(setup只能一个,无论语法糖即下面的setup必须注释,但script可以多个)
     import Rubbish from './dontlook.vue'
     const count = ref(0)
     //注意只要是在script里面使用的,则调用ref函数必须使用value
     const jsx =() => (
          <div class='app'>
             <h1>{this.count}</h1>
             <button onClick={ () => count.value-- }>-1</button>
             <button onClick={ this.sub }>+1</button>
             <p>下面是组件</p>
             <Rb></Rb>
           </div>
     )
     
     function sub() {
       count.value--
     }
     </script>
     
     <template>
       <div class="app">
         <jsx />
       </div>
     </template>
     ```

     - 不使用语法糖

       ```vue
       <script lang="jsx">
        //setup非语法糖中使用h函数和render函数
       import Rubbish from './dontlook.vue'
       export default {
         setup() {
           const count = ref(0)
       
           //注意只要是在script里面使用的,则调用ref函数必须使用value
           // 加不加括号optionAPi文件中有解释
           return () =>  (
             <div class='app'>
               <h1>{this.count}</h1>
               {/* 可能不行 */}
               <button onClick={ () => count.value++ }>+1</button>
               <button onClick={ sub }>-1</button>
               <p>下面是组件</p>
               <Rubbish></Rubbish>
             </div>
             )
       
          const sub = () => {
           count.value--
           }
         }
       }
       </script>
       
       依旧没用template
       ```

       



# 二. Vue执行动画

- 有vue提供相关组件: 如transition

- React中实现动画效果需要引入第三方库(react-transition-group)

### 2.1. 基本实现(原理)

-  transition组件启动条件

  1. 条件渲染:v-if/v-show

  2. 动态组件:component

  3. 组件根节点

- 原理:即vue怎么给添加的元素添加动画效果

  1. 自动嗅探是否应用了css过渡或动画

  2. 如果transition组件提供了钩子函数,则该钩子函数会在恰当的时机被调用

  3. 如果未检测到css过渡或动画和钩子函数,则会执行添加/删除DOM元素

- 实现过程

  - 在合适的时机自动添加/删除的class

  - 动画还是要自己编写

    -   enter-from:元素进入开始状态
        enter-to:元素进入结束状态
        记得加enter-active

        leave-from:元素离开开始状态
        leave-to:元素离开结束状态
        记得加leave-active

  ```vue
  <script setup>
  import { ref } from 'vue'
  const isshow = ref(true)
  </script>
  
  <template>
    <div class="app">
      <div class="wrap">
        <!-- @click ='!isshow'没效果,当你是字符串 -->
        <!-- @clck={ !isshow }会报错,对象语法不能直接写表达式-->
        <button @click="isshow = !isshow">切换</button>
      </div>
  
      <!-- name属性:没设默认是v-,这是mj- -->
      <transition name="mj">
        <h2 v-if="isshow">哈哈哈哈哈</h2>
      </transition>
    </div>
  </template>
  
  <style scoped>
  .mj-enter-from,
  .mj-leave-to {
    opacity: 0;
    transform: scale(0.4);
  }
  
  .mj-enter-to,
  .mj-leave-from {
    opacity: 1;
    transform: scale(1);
  }
  
  .mj-enter-active,
  .mj-leave-active {
    transition: all 2s ease;
  }
  </style>
  ```

  - 使用animation,则只有上面特定属性只有xx-enter-active和.xx-leave-active就可以

    ```vue
    <script setup>
    import { ref } from 'vue'
    const isshow = ref(true)
    </script>
    
    <template>
      <div class="app">
        <div class="wrap">
          <button @click="isshow = !isshow">转换</button>
        </div>
        <!-- name属性:没设默认是v-,这是mj- -->
        <Transition name="mj">
          <h2 v-if="isshow">
            儿子想使母亲骄傲..............
          </h2>
        </Transition>
      </div>
    </template>
    
    <style scoped>
    .mj-enter-active {
      animation: mjEnterAnim 2s ease;
        
      使用reverse属性
      /* 记得和.mj-leave-active的动画名相同 */
      /* animation: mjLeaveAnim 2s reverse; */
    }
    .mj-leave-active {
      animation: mjLeaveAnim 2s ease;
    }
    
    @keyframes mjEnterAnim {
      0% {
        transform: scale(0);
      100% ....
    }
    
    @keyframes mjLeaveAnim {
      0% {
        transform: translateX(0);
      ......
    </style>
    ```

    



### 2.2. 属性补充

- type

  - 当animation和transition同时使用,设置的时间不同会影响效果, 
    - 所以可以设type为transition/animation,制定听谁的

- duration

  - 自定义展示时间,有两个值:1,duration='1000' 2,object:则duration前要加:即:duration='{

       enter:1000,

       leave:2000

      }' 自定义进入和离开时间

  ```vue
  <template>
    <div class="app">
      <div class="wrap">
        <button @click="isshow = !isshow">转换</button>
      </div>
      <Transition 
              name="mj" 
              type="animation" 
              :duration="{enter:5000,leave:5000}">
        <h2 v-if="isshow">
   		.....
        </h2>
      </Transition>
    </div>
  </template>
  <style scoped>
  .mj-enter-from,
  .mj-leave-to {
    opacity: 0;
    transform: scale(0.4);
  }
  
  .mj-enter-to,
  .mj-leave-from {
    opacity: 1;
    transform: scale(1);
  }
  
  .mj-enter-active {
    animation: mjEnterAnim 20s ease;
    transition: all 1s ease;
  }
  .mj-leave-active {
    animation: mjLeaveAnim 20s ease;
    transition: all 1s ease;
  
  }
  @keyframes mjEnterAnim {
    0% {
     ....
  @keyframes mjLeaveAnim {
    0% {
     .........
  </style>
  ```

  



- mode

  -   out-in:当前元素先过渡,完后才新元素(默认) 

      in-out:相反 

- appear

  - ​	首次渲染就有动画

  ```vue
  <script setup>
  import { ref } from 'vue'
  const isshow = ref(true)
  </script>
  <template>
    <div class="app">
      <div class="wrap">
        <button @click="isshow = !isshow">切换</button>
      </div>
      <transition 
              name="mj" 
              mode="in-out" 
              appear>
        <h2 v-if="isshow">哈哈哈哈哈</h2>
        <h2 v-else>hahahha</h2>
      </transition>
    </div>
  </template>
  
  <style scoped>
  .......
  </style>
  ```

  

### 2.3.组件切换的动画

```vue
<script setup>
......
</script>
<template>
  <div class="app">
    <div class="wrap">
      <!-- 不可以写错@click='!isshow' -->
      <button @click="isshow = !isshow">切换</button>
    </div>

    <!-- component组件切换动画 -->
    <transition name="mj">
      <component :is="isshow ? 'h' : 'a'"></component>
    </transition>
  </div>
</template>

<script>
//弥补Vue3切换组件不能使用字符串的缺陷(即isshow='H',H必须是组件名,不能写成字符串'H'或'h),因为setup可以与optionsApi混用
export default {
  components: {
    H,
    A,
  }
}
</script>

<style scoped>
.mj-enter-from,
.mj-leave-to {
  ...........
</style>
```





### 2.4. 动画组(列表执行)

- listAnimation列表动画/listTransition列表过渡

  - 作用

    - 前几个只是对单个节点或者组件,又或者同一时间渲染多个节点中一个

    - 若想渲染多个如列表, 则用<transition-group>组件

  - 相关属性

    - listTransition列表过渡/动画
    - transition-group组件属性:除mode属性其他大部分都有
    - tag属性: 给包裹的元素指定一个标签来报错,如下面的是 div
    - style中的 mj-move 可以一次性使列表多个元素有动画(除那些除非了xx-leave-active和xx-leave-active的外)
      - 下面有解释

```vue
<template>
  <div class="app">
    <button @click="addNum">添加</button>
    <button @click="removeNum">删除</button>
    <button @click="shuffleNums">洗牌</button>

    <transition-group name="mj" tag="div">
      <template v-for="item in nums" :key="item">
        关于执行remove使item删除,但:key='item'不报错原因:
          1,标识符没了,但其他元素的标识符还在,所以不报错
          2,你的标识符没了,说明你被删除了,所有不渲染(本身删除就是不渲染),也不报错
        <span>{{ item }}</span>
      </template>
    </transition-group>
  </div>
</template>

------------------------------------
<script setup>
import { reactive, ref } from 'vue'
// shuffe 作用 打乱数字/洗牌
import { shuffle } from 'underscore'
let nums = ref([1, 2, 3, 4, 5, 6, 7])

// 随机打乱顺序(洗牌)
const shuffleNums = () => {
  // 不能使用reactive()方法,因为shuffle()返回一个非响应式数据
  // nums = shuffle(nums)

  //方式一,使用原来数据nums
  //nums.slice()对nums数组浅拷贝
  console.log(nums.value.slice())
  nums.value.splice(0, nums.value.length, ...shuffle(nums.value.slice())) 

  //方式二 :使用ref()方法
  // nums.value = shuffle(nums.value)
}

设置个随机数
const randomIndex = () => {
  //提示:nums.value.length也要加value
  return Math.floor(Math.random()*nums.value.length)
}

添加随机数字
const addNum = () => {
  // randomIndex()是调用函数,只不过这个函数是箭头函数
  nums.value.splice(randomIndex(), 0, nums.value.length)
}

删除随机数
const removeNum = () => {
  nums.value.splice(randomIndex(), 1)
}
</script>

----------------------------------------------------------
<style scoped>
.mj-enter-from,
.mj-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.mj-enter-to,
.mj-leave-from {
  opacity: 1;
  /* transform不是transfrom,form形状 */
  transform: translateY(0);
  
}
.mj-leave-active {
  position: absolute;
}

// 只有删除或添加那一个有这个效果,其他没有动画,所以插入或移出时动画不好看
// 解决: 使用mj-move
.mj-enter-active,
.mj-leave-active {
transition: all 3s ease;
}

// 使得所有没有删除和添加的多个元素,其类中会添加上.mj-move这个类
.mj-move {
 // 使元素移动时有3s的ease移动的效果,无论前面有无 transform: translateY(0)等这些,它只要有移动(默认的)就有这个效果
  transition: all 3s ease;
}
</style>
```





# 三. 响应式原理

可以看自己写的案例, 因为是.js后缀,所以不用安装什么

### 3.1.Objecct.defineProperty(vue2实现响应式原理重要方法)

- Object.defineProperty() 的作用是定义或修改对象属性，并允许通过 get 和 set 方法来控制属性的访问和修改行为，这正是 Vue 2 实现数据响应式的底层核

- 它**直接修改原对象**。调用 `Object.defineProperty(obj, ...)` 后，`obj` 对象本身就被改变了

- 它是对**对象的单个属性**进行拦截。

  - 所以你必须遍历对象的所有现有属性通过下来方式

    ```
    Object.keys(obj).forEach(...)
    ```

    ），并为每一个属性单独调用

    ```
    Object.defineProperty
    ```

    来设置 get 和 set

  

  - 缺点(即使通过了foreach遍历依旧存在)

    1. 无法监听新增属性

       -  如果你给对象添加一个新属性（例如 obj.address = '...', address属性之前位置原对象里面），这个新属性不是响应式的，因为它没有经过 Object.defineProperty的处理。

       - 解决

         Vue 2 必须使用Vue.set(或 this.$set ) 这个特殊的 API 来解决。

    2. **无法监听删除属性**: 

       当执行 delete obj.name

       - obj.name属性会被删除，但watchFn不会重新执行来反映这个变化。

       - 因为`Object.defineProperty` 没有提供拦截删除操作的能力。

    3. **无法直接监听数组索引和 `length` 属性**: Vue 2 对数组进行了特殊处理（重写了数组的 `push`, `pop`, `splice` 等方法）来绕过这个限制，但通过索引直接修改数组元素（如 `arr[0] = ...`）同样不是响应式的。

       - 如

         ```
         const arr = [1, 2, 3];
         arr[0] = 100;
         ```

         - arr[0] 的值会变成 100

           ，但 watchFn 不会执行

         - 因为`Object.defineProperty` 无法有效监听通过索引对数组进行的修改

       - 解决
         - 需要 `Vue.delete` (或 `this.$delete`)。

  

### 3.2. new Proxy(vue3实现响应式原理的重要方法)

- 它**不修改原对象**，而是返回一个全新的**代理对象**。所有的操作都应该在这个代理对象上进行，原对象 (`obj`) 保持不变

- **`Proxy`**: 它是对**整个对象**进行代理，而不是单个属性。

  

  - 工作方式 : 你只需要创建一次 new Proxy(obj, handler) 之后，对这个代理对象objProxy的任何操作都会被handler中的方法（如 get, set）拦截。

  - 优点

    - 天然支持监听新增/删除属性

      : 当你向代理对象添加或删除属性时，set或deleteProperty处理器会自然地被触发，无需任何特殊 API。

      

    - **天然支持数组**: 对数组的任何操作，包括通过索引修改 (`arr[0] = ...`) 或修改 `length`，都能被 `Proxy` 完美拦截。

    - 功能更强大 :Proxy提供了多达 13 种拦截操作(如get,set,deleteProperty....)

    - 性能小: 它的初始化开销非常小，因为只创建了一个代理对象，并没有对原对象的属性做任何操作



### 3.3. 实现两种方式实现响应式相关代码

#### 3.3.1. 两种方式都有的代码

- 为什么用 Set 而不是数组？
  - 唯一性：Set 会自动去重，避免同一个响应函数被重复收集，防止一次变更时重复执行多次。
  - 性能更好：`add/has/delete` 的时间复杂度接近 O(1)，比数组查重更高效。

```javascript
类
class Depend {
  constructor() {
   // new set作用: 可以将传入这个数组(new set创建一个数组)里面相同的元素去掉(即去重)
      则当foo函数里面有两个obj.name,则foo()不会被执行两次, 因为里面就一个obj.name
    this.reactiveFns = new Set()
  }
  addDepend(fn) {

    if(fn) {
      this.reactiveFns.add(fn)
    }
  }
  depend() {
    if(reactiveFn) {
      this.reactiveFns.add(reactiveFn)
    }

  }
  //执行依赖
  notify() {
    this.reactiveFns.forEach(fn => {
      fn()
    })
  }
}
```



- 代码实现下面图片的过程

```javascript
//自动收集依赖
//实现过程:封装个函数,可以通过obj的key获取对应的dep
const objMap = new WeakMap()
function getDepend(obj, key) {
  //1,根据obj获取map
  let map = objMap.get(obj)
  if(!map) {
    map = new Map()//不能用weekMap,因为其key必须是对象,而map的key是字符串
    objMap.set(obj, map)
  }

  //2,根据obj的key获取dep
  let dep = map.get(key)
  if(!dep) {
    dep = new Depend()
    map.set(key, dep)
  }

  return dep
}
```



![实现单个属性就监听](D:\Desktop\JavaScript\07vue\原理.png)

#### 3.3.2.单独有的代码

- vue2中实现更加对象中某个属性变化来做出响应式变化的重要步骤

  ```javascript
  function reactive(obj) {
    Object.keys(obj).forEach(key => {
      let value = obj[key]
      Object.defineProperty(obj, key, {
        //能实现自动收集依赖,主要是get可以收集依赖(即监听那个地方有调用依赖,如foo函数的obj.name则get可以获取obj和key)
        get() {
          const dep = getDepend(obj, key)
  
          //优化,不用自己传参数,在类里面搞定
          // dep.addDepend(reactiveFn)
          dep.depend()
  
          return value
        },
        set(newValue) {
          const dep = getDepend(obj, key)
          value = newValue
          dep.notify()
    
        }  
      })
    })
    return obj//则const obj=reactive(...的obj可以使用,然后才有foo函数里面obj.name
  ```

- vue3实现响应式的重要步骤

  ```javascript
  vue3实现响应式的重要步骤
  function reactive(obj) {
    const objProxy = new Proxy(obj, {
      set: function(target, key, newvalue, receiver) {
        Reflect.set(target, key, newvalue, receiver)
        const dep = getDepend(obj, key)
        dep.notify()
      },
      get: function(target, key, receiver) {
        const dep = getDepend(target, key)
        dep.depend()
        return Reflect.get(target, key, receiver)
        
      }
    })
    return objProxy
  }
  ```







# 四.项目部署

### 4.1. DevOps的理解

- 传统的开发模式

  - 开放人员和测试,运维人员是分开的,即开发人员开发,则其他人要等待

- DevOps开发模式

  - 是Development和opertations两个词的结合,即将开发和运维结合起来\

  - 和DevOps一起出现的两个词

    - CI : Continuous Integration (持续集成)

      1. 开发人员把代码提交仓库
      2. 服务器通过Jenkins 对仓库监听, 只要仓库改变,则服务器自动 打包,测试和重构

    - CD有两个翻译: Continuous Delivery(持续交付) 或Continuous Development(持续部署)

      1. 开发人员把代码提交仓库

      2. 服务器通过Jenkins 对仓库监听, 只要仓库改变,则服务器自动 打包,测试和重构

         第一二步和上面一样

      3. 测试和运维人员拿到服务器最新的代码进行测试与部署, 要是有问题就发给开发人员





### 4.2. 购买云服务器的过程





### 4.3.Nginx安装和使用\手动部署





