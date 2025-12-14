# 一. 之前知识补充

### 1.1. jsconfig文件的作用

-  jsconfig.json文件:给vscode提示,以来用户友好提示
  里面:

  1.  'target':打成es5还是es6的包
  2. 'module':打印成什么样的模版
  3. 'baseUrl':相对路径

  4. 'paths':路径配置(方便用户设路径)
     方法一:推荐在这(jsconfig.json),因为这里配置的会覆盖vue.config.js的alias,同时有代码提示)

​				方法二(不推荐):在vue.config.js的configuraWebpack对象加入resolve: {alias: {'@': resolve('src')}}

​			5,'lib':友好提示用户的库



### 1.2. vue不同版本的作用

- runtime: 运行时
- runtime + complie: 运行 + 编译



- 理解上面,首先要知道

  - Vue 是如何把我们写的模板（template）变成最终显示在浏览器上的真实 DOM 元素的。这个过程分为两步：

    1. 编译 (Compile): 把我们写的 template 字符串（比如 <div id="app">{{ message }}</div>）转换成一个 JavaScript 函数，这个函数叫做渲染函数 (Render Function)。

    2. 运行 (Runtime): 执行这个渲染函数，它会生成一个虚拟 DOM 树，然后 Vue 的运行时系统会根据这个虚拟 DOM 树，高效地创建和更新页面上的真实 DOM 元素。



- #### runtime (仅运行时版本)

  - 包含什么：只包含负责第 2 步的代码。它知道如何执行渲染函数、创建虚拟 DOM、更新真实 DOM、处理响应式数据等。

  - 不包含什么：不包含编译器。也就是说，你不能给它一个 template 字符串让它去工作。你必须提前把 template 编译好，直接给它渲染函数。

  - **谁来编译**:
    -  在工程化项目中（使用 Vite 或 Vue CLI），构建工具 (Webpack/Vite) 在**打包**时就已经通过 vue-loader 或相关插件，把所有 .vue 文件里的 <template> 提前编译成了渲染函数。
  -  这是默认和推荐的版本，几乎所有通过脚手架创建的 Vue 项目都在使用它。这也是为什么 import { createApp } from 'vue' 默认引入的是这个版本。



#### runtime + compiler (完整版 / 运行时 + 编译器版本)

- 包含什么：同时包含了第 1 步（编译器）和第 2 步（运行时）的代码。

- 它能做什么？：你既可以给它一个提前编译好的渲染函数，也可以直接给它一个 template 字符串。如果给的是 template，它会先在浏览器里实时地把它编译成渲染函数，然后再执行。

- 什么时候用？：

1. 当你在 HTML 中通过 <script src="..."> 引入 Vue 时，用的是这个版本。

1. 当你在 main.js 中不使用 .vue 文件，而是直接在 createApp 的参数里写 template 选项时，就必须手动引入这个版本 (import { createApp } from 'vue/dist/vue.esm-bundler.js')。

- 缺点：

- 体积更大：包含了编译器的代码。

- 性能稍差：需要在浏览器中进行一次编译操作。



- 理解了上面也就懂下面的案例

```html
main.js中
一,vue编译文件方法:(在src文件夹中)(最常用)
方法一,app.vue,sfc(single file component)单文件组件,然后impont导入组件(在src文件夹中) 
  即import App from './App.vue'

  
方法二,或者自己在main.js定义个对象:template/data/methods等,但与1不同的是
  1.这里不需要使用.vue文件,直接在main.js中定义组件选项
  2.import {createApp} from 'vue'的'vue'变为'vue/dist/vue.esm-bundler.js'即下面

    function concept() {

        const App = {
         template: `
           <div>hello world</div>
         `
    }
    报错,要 Configure your bundler to alias "vue" to "vue/dist/vue.esm-bundler.js". 

因为
默认vue版本是routine+vue-loader,而vue/dist/vue.esm-bundler.js版本是routine+compiler


再详细详细解释:
    首先知道vue的相关原理 :
		vue解析到浏览器的原理(即vue原理):
			vue.vue文件里的template/script/style默认会被vue-loader解析为createVNode,然后在变为虚拟node组为虚拟dom在到真实dom,最后渲染到浏览器
   	所以直接import {createApp} from 'vue',这个没有vue没有compiler,所以不能解析template/script/style,因此要在main.js中import {createApp} from 'vue/dist/vue.esm-bundler.js',给文件中添加compiler
}
*/
```





### 1.3. css的scoped作用域

```vue
<template>
  <div>
    i am text scoped
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
  div{
    color: green;
  }
</style>
```

- 将样式私有化，使其只应用于当前组件内的元素，而不会“泄露”出去影响到其他组件。



### 1.4. npm init vue@latest创建项目

- vite打包



### 1.5. 全局导入vue组件和局部导入vue组件文件

- 局部导入

  - ```
    <template>  
      <l-or-g></l-or-g>
      <Causal></Causal>
    </template>
    
    <script>
    //localimport局部导入
    //必须加./可能缓存问题,但本来可以,要是报错就从新加载(即ctrl+c和运行)
    import lOrG from "./Components/import-local.vue";
    export default {
      components: {
        "lOrG": lOrG
      }
    }
    ```

- 全局导入

  - ```
    //importglobal全局导入组件(全局引入组件),必须加./
    import A  from './Components/import-Global'
    import App from './App.vue'
    
    const app = createApp(App)
    app.component('Causal', A)// 第一个参数是组件名,第二个参数是组件
    // 一旦注册，你就可以在项目中的任何其他组件的模板里直接使用 <Causal></Causal>，而不需要在每个使用它的地方都单独 import。
    app.mount('#app') 
    ```

- 导入组件名写法

  - 写法以及注意点

    ```
    <template>
      <div>
        appvue
      </div>
      <!-- tap标签的第一种写法 -->
      <lOrG/>
      <!-- 第二种写法 -->
      <l-or-g></l-or-g>
      <!-- 第三种写法 -->
      <lOrG></lOrG>
    </template>
    
    <script>
    //起vue文件名时不要使用 单个单词.vue 否则触发vue/multi-word-component-name
    //理由:该规则强制组件使用多词名称。此规则旨在防止与现有和未来的 HTML 元素（通常是单词标识符）发生潜在冲突
    
    import ggg from 'Components/import-local.vue' -- ggg尽量要大写,不然容易报错,理由和上面一样
    export default {
      components: {
        // lOrG,或
        "lOrG" : ggg//键是组件名(别名),值是组件,都是自定义如lll,以及键可以改为dsfjalf,也可以直接写lOrG
        
      }
    }
    ```

    - 当组件名缩写时即当Header:Header 用 Header 

      则import的Header和组件开头要大写,不然就别用缩写  

      

      



# 二. 组件间的通信



### 2.1. 组件的嵌套关系(nesting)

```vue
APP.vue(父)
<template>
  <bas/>
</template>

<script>
import content from "./AppContent"
export default {
  components: {
    'bas': content,
  }
}
</script>
<style scoped>
</style>

------------------------- 
子 ./AppContent.vue
<template>
  <div class="app">
    <List></List>
  </div>
</template>

<script>
import List from "./AppConentList.vue";
export default {
  components: {
     List,
  },
}
</script>

<style scoped>
  .app{
    height: 200px;
    background-color: aqua;
  }
</style>

----------------------------------------
孙
<template>
  <div class="app">
    <ul>
      <li>missile1</li>
      <li>surplus</li>
      <li>thesis</li>
    </ul>
  </div>
</template>
<script>
export default {
}
</script>
<style scoped>
</style>





```





### 2.2. 父传子 - prop(重要)

- 注意当一个父组件有多个子组件,则必须设个根组件

```vue
父
<show-info surplus="剩余"  :numb="30" Iran="伊朗" show-message="杠写法" />
<script>
import showInfo from "./showInfo"
import Attrs from "./classIs$attrs-NO$emitAProps"
export default {
  components: {
    showInfo,
    Attrs
  }
}
</script>

-------------------------------------
子
<template>
  <div class="app">
    <ul>
      <li>{{ surplus }}</li>
      <li>{{ Iran }}</li>
      <li>{{ drone }}</li>
      <li>{{ applicant }}</li>
      <li>{{  numb }}</li>
      <li>{{ showMessage }}</li>

      <!-- 非emit属性:非emit和props的属性 -->
    </ul>
  </div>
</template>
<script>
export default {
  // 1,props数组语法(这个是vue2,vue3不支持了,vue3用props对象语法)
  // props: ["surplus", "Iran", "drone", "applicant"]
  //弊端:1,没有类型检测,2,没有默认值

  // 2,props对象语法(用最多)
  props:{
    surplus:String,

    numb:{
      // 属性一:类型(Number,String,Boolean,Array,Object,Date,Function),default:默认值
      type:Number,
      default:10
    },

    // 属性二:require:true,则必须传值,不用设默认值
    Iran: {
      type: String,
      // required: true,
    },

    //注意一:类型是Array或Object时,default必须是一个函数,以函数返回值作为默认值
    drone: {
      type: Array,
      default() {
        return ["无人机", "无人机"]
      }
    },

    //写法二
    applicant:{
      type:Object,
      //tip提示对象:返回值是对像是的箭头函数必须用()小括号括起来
      default:()=>({name:"张三",age:18})
      
    },

    //props名的写法:大写对应-或
    showMessage:String
  }
}
</script>
<style scoped>
</style>



  
```





### 2.3. 非prop的attribute( inheritAttrs: false 和 $attrs)

- 父组件传递到数据,但子组件props只拿了一部分,那其他那些在哪里

- 默认情况下，inheritAttrs 的值是 true

  - 父组件传递的所有没有被子组件 props 接收的属性，都会被自动“透传”并应用到子组件的根元素上。

- #### inheritAttrs: false

  - 父组件传递的非 prop 属性将不会自动应用到子组件的根元素上,你可以通过 this.$attrs获取

```vue
父
<Attrs crocodile="鳄鱼" emit="发送" doWhat="youWant" />

----------------------------------------
子
<template>
    <!-- $attrs属性:非emit和props的其他属性(props里面没有使用) -->
    <!-- 默认加到根节点即是ul的属性上,也可以inheritAttrs:fales来不加 -->
    <!-- 主动获取的方式::class="$attrs.xxx" -->
    <ul class="word">
      <li >{{ crocodile }}</li>
      <li>{{ emit }}</li>
    </ul>
    <!-- 当有多根节点同时你为把inheritAttrs设为false,则必须绑定其中一个根节点,否则报错 -->
    <!-- 根组件是template的下一级如这时是ul和div -->
    <div class="root2" v-bind="$attrs">
      <div class="son" ></div>
    </div>
</template>

<script>
export default {
  // inheritAttrs: false,
  props: { -- props里面没有定义父组件传来的属性,则为非prop的attribute
    crocodile: {
      type: String,
      default: "crocodile"
    },
    emit: {
      type: String,
      default: "emit"
    }
  }
}
</script>
<style scoped>
</style>
```







### 2.4. 子传父 - $emit(重要)

```vue
父
  <!-- v-on绑定方法,@绑定方法 -->
    <div>当前计数:{{ counter }}</div>
    <add-click @add="addClick"></add-click>
    <sub-click @sub="subClick"></sub-click>

<script>
import addClick from "./addCounter"
import subClick from "./subCounter"
export default {
  components: { addClick, subClick },
  data() {
    return {
      counter: 0
    }
  },
  // $emit属性:可以把子组件的事件,数据通过参数传给父组件,父组件通过@/v-on接受
  methods: {
    addClick(num) {
      this.counter += num
    },
    subClick(num) {
      this.counter -= num
    }
  }
}
    
-----------------------
子
<button @click="btnClick(1)">-1</button>
<button @click="btnClick(2)">-2</button>
<button @click="btnClick(3)">-3</button>

export default {
  //emit属性:一,数组语法,集体开发时,同事可以轻易看见传出的事件(最多)
  // emits: ["sub"],
  //属性二,对象语法,限制传出的值
  emits: {
    sub: function(num) {
      if( num > 10 ) {
        return false//即是报错
      }else
      return num
    }
  },

  methods: {
    btnClick(num) {
      this.$emit('sub', num)
    }
  }
}
```







### 2.5. 阶段案例练习 - TabControl的封装

```vue
父
<template>
  <!-- 一,renderingScope渲染作用域,即同一个页面的{{ title }}不会去子组件的data或props里面找,只会在本页面props(properties) -->
  <div class="app">
    <!-- 二,ScopeSlot作用域插槽 -->
  </div>
  <showInfo :title="['intergret', '回归', '团体']" @itemClick="itemClick"/>
  <h2>{{ pages[currentIndex] }}</h2>
</template>

data() {
return {
  pages: ['首页', '分类', '购物车'],
  currentIndex: 0
}
},
methods: {
itemClick(index) {
  this.currentIndex = index
}
}  

--------------------------------
子
<template>
  <!-- problem问题for循环不是写在ul上 -->

  <!-- tip提示emits:使不使用emits或者props看父组件和子组件传数据不,这里因为切换tab,和父组件没关系所以不用 -->
  <div class="app">
    <div class="item" 
      v-for="(item, index) in title"
      :key="item"
      @click="itemClick(index)"
      :class="currentIndex === index ? 'active' : ''"
    >
    {{ item }}
  </div>
  </div>
</template>

data() {
//tip提示return,你错了很多次了
return {
  currentIndex : 0
}
},

methods: {
itemClick(index) {
  this.currentIndex = index
  this.$emit('itemClick', index)
}
},
```





# 三. 组件的插槽Slot

### 3.1. 认识Slot的作用





### 3.2. Slot的基本使用和默认值(重要)

```vue
<template>
  <div class="app">
    <slotUse>
      <!-- 1,基本使用 -->
      <h3>我不是默认值</h3>
    </slotUse>
</template>

<script>
import slotUse from './slotUse'
export default {
  components: {
    slotUse
  }
```





### 3.3. Slot的具名插槽(重要)

renderingScope渲染作用域,即同一个页面的{{ title }}不会去子组件的data或props里面找,只会在本页面props(properties) 

```vue
父
<template>
  <div class="app">
    <slotUse>
      <!-- 具名slot:v-slot插槽 ,和缩写#  -->
      <!-- tip提示当v-slot的值不需要加引号以及v-slot的缩写不用加冒号即#left -->
      <!--  NamedSlot具名插槽,必须包裹在template-->
      
      <template #left>
        <span>我是左边</span>
      </template>
      <template v-slot:mid>
        <span>我是中间</span>
      </template>
      <template v-slot:right>
        <span>我是右边</span>
      </template>
    </slotUse>
  </div>
</template>

-----------------------------------------
子
<template>
  <div class="app">
    <!-- slot插槽 -->
    <!-- 1,基本使用和默认值 -->
    <slot>
      <p>i am default</p>
    </slot>

    <!-- 2,具名函数 -->
    <div class="nav-bar">
      <div class="left">
        <slot name="left">
          <button>left</button>
        </slot>
      </div>

      <div class="mid">
        <slot name="mid">
          <button>mid</button>
        </slot>
      </div>      

      <div class="right">
        <slot name="right">
          <button>right</button>
        </slot>
      </div>
    </div>    

  </div>
</template>
```





### 3.5. 动态插槽名

```vue
父
<slotUse>
    <!-- 2.2v-slot的练习(利用值是自变量) -->
    <!-- tip提示:值不支持动态插槽即{{  }},但可以是[]使其成为动态表达式即动态插槽名 -->
  <template v-slot:[position]>
      <span>我在这</span>
  </template>
</slotUse>

<hr>

<!-- tip提示@click值的使用:既然可以直接是counter++,也可以直接是表达式(赋值),三元表达式等等 -->
<button @click="position = 'left'">left</button>
<button @click="position = 'mid'">mid</button>
<button @click="position = 'right'">right</button>

import slotUse from './slotUse'
export default {
  components: {
    slotUse
  },
  data() {
    return{
      position:'left'
    }
  },
}

---------------------------------------
子
<template>
    <div class="app">
      <div class="nav-bar">
        <div class="left">
          <slot name="left">
            <button>left</button>
          </slot>
        </div>
        <div class="mid">
          <slot name="mid">
            <button>mid</button>
          </slot>
        </div>      
        <div class="right">
          <slot name="right">
            <button>right</button>
          </slot>
        </div>
      </div>    
    </div>
</template>
 <script>
  export default {
    props:{
      name:String
    }
  }
<style scoped>
    .nav-bar{
      display: flex;
      width: 200px;
      justify-content: space-between;
    }
    .left,.mid,.right{
      flex: 1;
      text-align: center;
      height: 50px;
      line-height: 50px;
    }
    .left{
      background-color: red;
    }
    .mid{
      background-color: green;
    }
    .right{
      background-color: blue;
    }
  </style>
```





### 3.6. 作用域插槽使用

- 核心: 将子组件中的数据传递给父组件的插槽来使用

  - 先在子组件中把item绑定给slot,然后外部先通过#default='aa',再aa.item
    - 匿名插槽

  ```vue
  父
  <template>
      <!--匿名插槽:独占默认插槽:直接把v-slot:default='xxx'缩写#='xxx',不是独占或有具名插槽就不行 -->
  <showInfo :title="['intergret', '回归', '团体']" @itemClick="itemClick" #="props">  里面#即v-slot
        <button>{props.itme}</button> 可以访问子插槽的传过来的数据
    </showInfo>
  </template>
  
  <script>
  import showInfo from './showInfo.vue'
  export default {
    components: {
      showInfo
    }
    
  -----------------------------------
  子
  <div class="item" 
    v-for="(item, index) in title"
    :key="item"
    @click="itemClick(index)"
    :class="currentIndex === index ? 'active' : ''"
  >
  <!-- 插槽里想把传递数据给父组件 -->
  <!-- 想把item绑定给slot,然后外部先通过#default='aa',在aa.item -->
  
      <!-- 默认插槽(非具名) -->
      <slot :item="item"> --绑定的item传给了父组件
        {{ item }}
      </slot>
  ```
  
  
  
  - 具名插槽实现
  
    ```vue
    父
    <!-- 2,具名插槽: -->
    <!-- 2.1,具名插槽(即有name的Slot)必须包裹在template,同时这组件名包裹-->
    <!-- 2.2,v-slot:xx='xx'必须写全 -->
    
    <showInfo :title="['compile', '编译', '又进步了']" >
        <template v-slot:showName="aa">
          <button>按钮{{ aa.item }}</button>
        </template>
    </showInfo>
    
    -------------------------------------------
    子
    <template>
      <div class="app">
        <div class="item" 
          v-for="(item, index) in title"
          :key="item"
          @click="itemClick(index)"
          :class="currentIndex === index ? 'active' : ''"
        >
        <!-- 具名插槽(有name属性) -->
          <slot :item="item" name="showName"> 
          {{ item }}
        </slot>
      </div>
      </div>
    
    
    ```
    
  

