# 一.非父子组件的通信

### 1.1. Provide/Inject

- 基本使用
- 函数写法
- 数据的响应式
  - computed



```vue
父
<template>
  <div class="app">
    <h2>{{ message }}</h2>
    <Son></Son>
    <!-- tip提示v-on的值可以赋值(表达式) -->
    <button @click=" message = '编译' ">translate</button>
  </div>
</template>

data() {
return {
  message: 'complied'
}
},

//provide属性/inject属性:父组件可以给子孙传递数据

//provide是个函数,返回一个对象,这个对象的属性值可以是函数,也可以是任意数据类型
provide() {
//tip提示this指向的是当前组件这个实例对象
return {
  name : 'cao',
  age : 22,



  // message  : this.message不行
  message : computed( ()=> {
    return this.message

  //computed函数不是computed属性(这里要导入computed函数:import { computed } from 'vue'):作用处理响应式数据
  // 因为provide里的值传递给子元素的值不是响应式数据,所以子孙组件的数据在template中不被修改,在js中修改了
  //故使用computed函数,
  //tip提示,要是this.message值若有双引号(即"complied"),这要xx.value,因为computed用到了ref对象
  //ref作用:可以将普通数据类型的数据转换成响应式数据,有双引号可能没解包,加value就行了
  })


----------------------------------
子
son:{{ message }}
<script>
import Grandson from './grandson.vue'
export default {
  components: {
    Grandson
  },
  inject: ['message']

--------------------------
孙
<p>{{ name }}-{{ age }}-{{ message }}</p>
export default {
  inject: ['name', 'age', 'message']
}
```





### 1.2. 事件总线hy-event-store

- 在event-bus.js中创建eventBus对象
  - 自己封装相关组件

- 监听事件:
  - eventBus.on()

- 发出事件:
  - eventBus.emit()



```vue
//创建函数时,拿到数据
created() {
    //eventBus事件总线
    //接受
    eventBus.on('PassingEvent',

    //  (age, name) => {
    //   console.log(age, name)
    // } //EventBus.on方法的第二个参数是个函数的话,要是销毁这个函数必须要有其他名,所以不能使用() => {}

    passingEvent
     )
},

  //destroy function销毁函数一般叫destroy instance销毁实例(当页面销毁时一定要养成销毁函数的习惯):作用,为了避免内存泄漏,销毁函数
    
  //1,先命名,然后把(age,name) => {console.log(age, name)}变为passingEvent
  methods: {
     passingEvent(age, name) {
       console.log(age, name)
     }
  },
    
  //2,销毁函数或destroyEvent销毁事件
  unmounted() {
    eventBus.off('PassingEvent', passingEvent)
  }
}


----------------------------------
任意组件
<template>
  <div class="app">
    <button @click="btnPassingData"></button>
  </div>
</template>
<script>
import eventBus from './utils/event-bus'
export default {
  methods: {
    btnPassingData() {

      //eventBus事件总线
      //发送
      console.log('btnPassingData')
      eventBus.emit('PassingEvent', 18, 'cao')//第一个参数是事件名用来其他组件来识别拿那个数据，后面的是要传递的参数
    }
  }
}

```







# 二. 额外知识补充

### 2.1. 生命周期函数

- created
- mounted
- unmounted



```vue
  //lifecycle生命周期
  //1,组件创建之前
  beforeCreate() {
    console.log('一,beforCreate')
  },

  //2,组件创建完成
  created() {
    console.log('二,created')
    console.log('1,发送网络请求')
    console.log('2,监听eventBus事件')
    console.log('3,监听watch数据')
  },

  //3,template编译后准备挂载
  beforeMount() {
    console.log('三,beforeMount')
  },

  //4,组件template挂载完成
  mounted() {
    console.log('四,mounted')
    console.log('获取dom')
    console.log('使用dom')
  },

  //5,数据变化时
  //5.1,准备更新dom
  beforeUpdate() {
    console.log('五.1,beforeUpdate')
  },

  //5.2,更新dom
  updated() {
    console.log('五.2,Updated')
  },

  //6,卸载VNode -> DOM元素
  //6.1,卸载之前
  beforeUnmount() {
    console.log('六.1,beforeUnmount')
  },

  //6.2,Dom元素卸载完成
  unmounted() {
    console.log('六.2,unmounted')
  },
  
 }
```



### 2.2. refs引入元素/组件

- 不要随便获取dom并修改dom,必须要的话用ref属性

- 在元素/组件中添加ref属性
- this.$refs属性



```vue
<template>
  <div class="app">
    <h2 ref="h2">{{ message }}</h2>
    <button ref="btn" @click="changeMsg">改变数据</button>
    <refCpn ref="cpn"></refCpn>
  </div>
</template>
<script>
  import refCpn from './Refcpn.vue'
export default {
  components: { refCpn },
  data() {
    return {
      message : 'summit'
    }
  },
//ref获取组件/ref获取元素/ref获取实例
// $refs属性获取元素/实例/组件(组件/元素先有ref名称)
  methods: {
    changeMsg() {
      this.message = '峰'
      //1,不要随便获取dom并修改dom,必须要的话用ref属性

      //2,获取元素
      console.log(this.$refs.btn)
      console.log(this.$refs.h2)

      //3,获取组件(组件实例)
      //组件不是对象,因为你调用组件是可以多个指向一个组件同时组件里面又有不同的数据,所以组件不是对象,而是一个实例(以类去理解)
      console.log(this.$refs.cpn)

      //3.1 在父组件中可以直接调用子组件的方法
      this.$refs.cpn.add()

      //3.2 获取组件中的元素
      // console.log(this.$refs.cpn.$el)

      //3.3 若组件中有多个根节点,则获取的是第一个根节点
      console.log(this.$refs.cpn.$el)//#text(因为子组件的第一个节点是<>后面的空格即为文本节点)
      console.log(this.$refs.cpn.$el.nextElementSibling)//nextElementSibling获取该节点下一个元素即<div class="app">

      //4,组件实例还有俩个属性$root属性和$parent属性(了解),$children属性在Vue3中已废弃
      console.log(this.$parent)
      console.log(this.$root)//目前实例即App(里面有个changeMsg方法可以提示是本节点的方法)
     // this.$root.changeMsg()//不要调用,否则无限循环导致报错
```







### 2.3. 动态组件的使用

```vue
<template>
  <div class="app">
    <template v-for="(item,index) of cpn" :key="item">
      <button @click="currentItem = cpn[index]">{{ item }}</button>
    </template>
    <!-- dynamicCpn动态组件 -->
    <!-- 方法一 -->
    <!-- <template v-if="currentItem === 'About'">
      <About></About>
    </template>
    <template v-else-if="currentItem === 'Home'">
      <Home></Home>
    </template>
    <template v-else-if="currentItem === 'Category'">
      <Category></Category>
    </template> -->

    <!-- 方法二 -->
    <!-- Component动态组件 -->
    <!-- is的值可以来自1,局部组件,2,全局组件 -->
    <component :is="currentItem" :eel="'鳗鱼'" sundae="'圣代甜品'" @translate="translate"></component>
  </div>
</template>

<script>
import About from './view/About.vue'
import Home from './view/Home.vue'
import Category from './view/Category.vue'

export default {
  components:{
    About, Home, Category
  },
  data() {
    return {
      cpn : ['About', 'Home', 'Category'],
      currentItem: 'About'
    }
  }
```





### 2.4. keep-alive

- 让组件缓存起来,存活下来
- include/exclude/max
- 存活生命周期函数
  - activated
  - deactivated

```vue
<template>
  <div class="app">
    <template v-for="(item,index) of cpn" :key="item">
      <button @click="currentItem = cpn[index]">{{ item }}</button>
    </template>

    <!-- keep-alive属性(让组件活跃):本质缓存 -->
    <!-- include的值要想在组件中name -->
    <!-- 注意:组件之间不能有空格 -->
    <!-- include属性 -->
    <KeepAlive include="About,Home,Category">
      <component :is="currentItem" :eel="'鳗鱼'" sundae="'圣代甜品'" @translate="translate"></component>
    </KeepAlive>

    <!-- exclude属性:除了xx其他都有 -->
    <!-- <KeepAlive exclude="Category">
      <component :is="currentItem" :eel="'鳗鱼'" sundae="'圣代甜品'" @translate="translate"></component>
    </KeepAlive> -->

    <!-- max:优化,当达到3个时,会把第一个点的组件缓存去掉即没有keep-alive -->
    <!-- <KeepAlive max="2">
      <component :is="currentItem" :eel="'鳗鱼'" sundae="'圣代甜品'" @translate="translate"></component>
    </KeepAlive> -->

    <!-- 当你想要判断是否切换组件:用activate方法和deactivate方法:专门为keep-alive而生 -->
    <!-- activate方法,deactivate方法:缓存生命周期 -->
    <!-- 在category组件中 -->
  </div>
</template>

<script>
import About from './view/About.vue'
import Home from './view/Home.vue'
import Category from './view/Category.vue'

export default {
  components:{
    About, Home, Category
  },
  data() {
    return {
      cpn : ['About', 'Home', 'Category'],
      currentItem: 'About'

-------------------------------
子: <!-- 当你想要判断是否切换组件:用activate方法和deactivate方法:专门为keep-alive而生 -->
        
<template>
  <div class="app">
    <h1>category</h1>
    <h3>{{ counter }}</h3>
    <button @click="counter++">timer</button>
  </div>
</template>

<script>
export default {
  data: () => ({ counter: 0 }),
  name: "Category",
  created() {
    console.log("category created");
  },
  //activate属性,deactivate属性:缓存生命周期
  activated() {
     console.log("category activated");
  },
  deactivated() {
     console.log("category deactivated");
  },

```









### 2.5. 异步组件的使用

- asyn异步组件

  打包(npm run build)然后部署到服务器,最后展示给用户

  由于包里面先展示html,然后js再去修饰,但js若不异步组件而形成的包,那用户要等很久才能看到页面

  所以使用异步组件,打出要先修饰html小包,其他展示不需要展示的排后面加载,提高渲染速度

  

#### 2.5.1. webpack分包处理

- import()

#### 2.5.2. 异步组件

```vue
<AsynCpn />

<script>
//async异步组件(组件内)
import { defineAsyncComponent } from 'vue';
// import AsynCpn from './asynCpn.vue'
const AsynCpn = defineAsyncComponent( () => import('./asynCpn.vue')) -- 这个 import() 语法同样适用于大型的 .js 模块，不仅仅是 .vue 组件的专利。
export default {
  components: { AsynCpn },
}
```





#### 2.6. v-model组件上

- v-bind:当前data的数据或者子组件props的数据实现响应式, v-on绑定当前界面的methods或者子组件传来的方法 

  从而实现v-model的功能

```javascript
<template>
  <div class="app">
    <!-- v-model双向绑定/v-model绑定(进阶) -->
      
    普通标签  
    <!-- 1,input -->
    <input type="text" v-model="oak">
    <p>oak:{{ oak }}</p> 
    <!-- 原理 -->
    <!--$event写法:这里的$event就是传递的参数:event要加$(固定写法) -->
    <!-- <input :value="oak" @input="oak = $event.target.value">  -->
     <!-- :是v-bind的简写 -->
    <hr>

    组件
    <!-- 和上面的区别,一个在data里面,一个不在当前data而是子组件的props实现响应式 -->
    <VMd v-model="oak"></VMd>
    <!-- 语法糖 -->
    <!-- 本质 -->
     <!-- <v-md :model-value="oak" @update:model-value="oak = $event"></v-md> -->

     <hr>
     <!-- 3,自定义名称(即不是modelValue),和其带来的其他作用:可以绑定多个属性 -->
    <!-- <v-md :plateau="plateau" @update:plateau="plateau = $event"  :MV="oak" @update:MV="oak = $event"></v-md> -->
    @update:plateau中的update是为了让你识别出来,你可以直接写为@a="a = $event",记得子组件的$emit也改为a
    <!-- 简写 -->
    <v-md v-model:plateau="plateau" v-model:MV="oak"></v-md>

  </div>
</template>

<script>
//tip提示import引入若带{}则是引入函数
import VMd from './vModel1034.vue'
import MyInput from './myInput1034.vue'
export default {  
  components: { VMd, MyInput },
  data() {
    return {
      oak : 'oak',
      plateau: 'plateau',
      inputMsg: 'inputMsg',
      msg2: 'msg2'
        
        
----------------------------------
子
<template>
  <div class="app">
    <h2>
      {{ MV }}-{{ plateau }}
    </h2>
    <button @click="change">translate</button>
  </div>
</template>

<script>
export default {
  //tip提示String:string是大写String不然报错
  props:{
    MV:{
      type:String,
      default:''
    },
    plateau:{
      type:String,
      default:''
    }
  },
  // update是为了你识别,你可以自定义别的
  emits: ['update:MV', 'update:plateau'],
  methods: {
    change() {
      this.$emit('update:MV', '橡胶'),
      this.$emit('update:plateau', '高原')
    }
  }  
}
</script>

<style scoped>

</style>




```





### 2.7. 混入Mixin

- 在组件通过mixins:[]

  ```vue
  <template>
    <div class="app" @click="handleClick">
      {{ msg }}
    </div>
  </template>
  
  <script>
  import MixinMsg from './utils/mixinMsg.js'
  export default {
    mixins: [MixinMsg],
    methods: {
      handleClick() {
        console.log(MixinMsg.data())
      }
  -----------------------------
  ./utils/mixinMsg.js
  //mixins混合/mixin混合(了解):有局部和全局
  //若data,methods,created组件有,会混合,若相同则组件的优先
  export default {
    data() {
      return {
        msg: "hello"
      }
    },
    created() {
      console.log('i am local Mixin')
    }
  }
  ```

  

- 全局混入: app.mixin({})

  - ```vue
    const app = createApp(App)
    app.mixin({
      created() {
        console.log('i am global mixin')
      }
    })
    ```



# 三. Composition API

### 3.1. 认识组合API -- setup函数里

- options API => Composition API
- optionAPI:弊端与后者的优势
  1. 没有compositionAPI可以把某个功能聚集起来(比如,数据只能在data,而和data功能相同的CptAPI的react可以分散)
  2.  逐渐由面向式编程转为函数式编程:比如setup里面的数据可以直接复制粘贴的到js(useCounter.js),然后再导入组件,在return中返回 
  3. js文件里面不能用optionAPI,但可以函数式编程
- Composition API
  - compositionAPI不能使用this
  - 因为this的功能被content和props替代
  - compositionAPI的setup函数有几个参数:(重要的就context,props)
    -   props参数里面有父组件的数据
        context参数有三个属性:attrs,emit,slots
        attrs:所有非props属性
        emit:发送事件
        slots:父组件传递过来的插槽




### 3.2 proxy代理对象-- proxy对象是vue实现响应式的核心所在 

- 原理:把A复制一份,然后js和template都看B,若A变B收到就变,template也变
- proxy对象,普通对象,原始对象区别
- 作用:
  - 原始对象,即拿到的数据,不要修改
  - 普通对象在ref,Reactive函数下变成proxy对象 








### 3.3. 多种语言实现计数器案例

#### Composition API实现

```vue
<template>
  <div class="app">
    <h1>{{ counter }}</h1>
    <button @click="add">+</button>
    <button @click="sub">-</button>
  </div>
</template>

<script>
// import { ref } from 'vue'
import UseCounter from './utils/useCounter.js'
export default {
  setup() {
    // const counter = ref(0)
    // function add() {
    //   counter.value++

    //   //当数据不是响应式数据时,测试用clg,因为js里面的数据变化了
    //   console.log('counter')
    // }

    // function sub() {
    //   counter.value--
    // }

    //return几种用法
    //第一种返回上面的代码
    // return {
    //   counter,
    //   add,
    //   sub,
    // }

    //第二种处理引入的js数据
      // const { counter, add, sub } = UseCounter()//加括号因为要调用引入的函数,要是UseCounter只是定义为,则不用加括号
      // return {
      //   counter,
      //   add,
      //   sub
      // }

      //第三种
      return {
        ...UseCounter()
      }

  }
}
</script>
<style scoped>
</style>

---------------------------------------------
useCounter.js
import { ref } from "vue";
export default function useCounter() {
  const counter = ref(0)
  function add() {
    counter.value++
    //当数据不是响应式数据时,测试用clg,因为js里面的数据变化了
    console.log('counter')
  }

  function sub() {
    counter.value--
  }
  return {
    counter,
    add,
    sub,
  }
}
```



#### optionAPI实现

```vue
<template>
  <div>
    <h1>{{ counter }}</h1>
    <button @click="add">+</button>
    <button @click="sub">-</button>
  </div>
</template>

<script>
export default {
  // 1. 在 data 中定义所有需要响应式的数据
  data() {
    return {
      counter: 0
    }
  },
  // 2. 在 methods 中定义所有处理业务逻辑的方法
  methods: {
    add() {
      this.counter++;
    },
    sub() {
      this.counter--;
    }
  }
}
</script>
```



#### 原生

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Native JS Counter</title>
</head>
<body>
  <h1 id="counter-display">0</h1>
  <button id="add-btn">+</button>
  <button id="sub-btn">-</button>
  <script>
    // 1. 先获取到页面上的元素
    const counterDisplay = document.getElementById('counter-display');
    const addBtn = document.getElementById('add-btn');
    const subBtn = document.getElementById('sub-btn');

    // 2. 定义一个普通变量来存储数据
    let counter = 0;

    // 3. 监听按钮的点击事件
    addBtn.addEventListener('click', () => {
      counter++;
      // 4. 手动更新页面的内容
      counterDisplay.textContent = counter;
    });

    subBtn.addEventListener('click', () => {
      counter--;
      // 4. 手动更新页面的内容
      counterDisplay.textContent = counter;
    });
  </script>

</body>
</html>
```



#### React

```react
import React, { useState } from 'react';

function CounterReact() {
  // 1. 使用 useState Hook 来定义一个状态变量
  //    它返回一个数组：[当前的状态值, 更新这个状态的函数]
  const [counter, setCounter] = useState(0);

  // 2. 定义方法来处理逻辑
  function add() {
    // 3. 调用更新函数来改变状态，React 会自动重新渲染组件
    setCounter(counter + 1);
  }

  function sub() {
    setCounter(counter - 1);
  }

  // 4. 返回 JSX 来描述 UI
  return (
    <div>
      <h1>{counter}</h1>
      <button onClick={add}>+</button>
      <button onClick={sub}>-</button>
    </div>
  );
}

export default CounterReact;
```



