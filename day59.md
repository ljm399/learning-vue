# 一. Composition API (一)

### 1.1. 使用reactive定义响应式数据

- 复杂类型

- reactive响应式数据/reactive函数:定义复杂数据(数组和对象),用途本地数据和数据之间有关的数据(如input的密码和账号)

  - 本质:reactive函数处理的数据,会收集依赖,数据改变时,会通知依赖更新,optionapi的data原理就是reactive,但reactive可以分开写

  ```vue
  <template>
    <div class="app">
      <h1>reactive</h1>
      <div>{{ gun }}</div>
      <div>{{ gunRat }}- {{ gunRat2.mankind }} - {{ gunRat2.ignore }}</div>
      <button @click="changeMsg">translate</button>
      <div></div>
      <input v-model="inputData.name" />
      <input v-model="inputData.password" />
    </div>
  </template>
  
  <script>
  //Reactive响应式数据
  import {  reactive } from "vue";
  export default {
    setup() {
      //defineDate定义数据/reactive定义响应式数据/ref定义响应式数据
  
      //1,非响应式 -- 修改也界面也改不了
      let gun = '肠道'
  
      //2.1,数组
      const gunRat = reactive(['肠道', '决心', '意志', '本能'])
  
      //2.2,对象
      const gunRat2 = reactive({
        mankind : 'mankind',
        ignore : 'ignore'
      })
  
      function changeMsg() {
        gun = 'other',
        console.log(gun),
        gunRat2.mankind = '人类',
        // tip提示逗号,函数里面的最后一行代码加逗号会报错
        gunRat2.ignore = '忽略'
      }
  
      //2.3,用于本地数据
      const inputData = reactive({
        name : 'mjl',
        password : '123456'
      })
  
  
      return {
        gun,
        gunRat,
        gunRat2,
        inputData,
        changeMsg
      }
  ```

  



### 1.2. 使用ref定义响应式数据

本质:引用响应式并维护内部的数据即value,故ref(reference):ref处理的数据返回的是ref对象

- 基本类型

- 复杂类型

- 在template自动解包: 浅层解包
  - info = { ref: xxx }
  
    

```vue
    <!-- unpacking解包:不需要解包,ref方法返回的值是个ref对象(依旧是ref引用
      ),在setup要加.value,而template里底层已经帮你做了,所有不用加.value -->
    <h3>2,{{ wordMean.glimpse }}- {{ wordMean.frontier }}</h3>
    <button @click="translate">translate</button>

    <!-- 浅层UNpacking解包(bug), 测试用,可不看 -->
    <h3>没加value直接使用:{{ warp.glance }}</h3>
    <button @click="warp.glance = 'unpacking'">修改数据但无value</button>
    <button @click="warp.glance.value = 'unpacking'">修其有value</button>

  </div>
</template>

<script>
//ref响应式数据
import { ref,onMounted } from "vue";
export default {
  setup() {
    //1,处理简单数据也可以复杂类型(reactive不可以输入简单数据Number,String,Boolean)
    const glance = ref('glance')
  
    //2,处理复制数据
    const wordMean = ref({
      glimpse : 'glimpse',
      frontier : 'frontier'
    })

    function translate() {
      wordMean.value.glimpse = '瞥',
      wordMean.value.frontier = '前沿'
    }

    //2.2,浅层解包(bug)
    //tip提示快速写法:这里的glance已经定义过,所以可以直接glance而不需要值
    const warp = {
      glance
    }
      
    //3,用途:本地简单数据/网络请求的数据
    const word = ref([])
    // const words = reactive([])
    onMounted(() => {
      const words = ['sundae', 'eel', 'sandine']
      //用reactive很难把words复制给reactive里面的[],而ref只是引用有value
      
      //用ref
      word.value = words
    })

    return {
      glance,
      wordMean,
      word,
      translate,
      warp
```







### 1.3. 开发中选择reactive/ref



### 1.4. readonly的使用

#### 1.4.1. 单项数据流

- Vue/React





#### 1.4.2.readonly

- readonly只读属性:防止子组件修改父组件的属性,阅读性差
  原理:readonly(info)返回一个代理对象,该对象对setter方法进行了劫持
  单项数据流:违背直接报错,和纯函数意思相同:即不修改数据,只读取数据d

```vue
父
<template>
  <div class="app">
    <h2>{{ info }}</h2>
  </div>
  <show-info :info="info" @translateGut="translateGut"></show-info>
</template>
<script>
import showInfo from './showInfo'
import { reactive, readonly } from 'vue'
export default {
  components: {
    showInfo
  },
  setup() {
    const info = reactive({
      gut : 'gut',
      glimpse : 'glimpse'
    })
    const mean = readonly(info)
    
    -- 子把父传给它的数据再传给父来修改,然后再在子展示
    function translateGut(payload) {
      info.gut = payload
    }
    return {
      info,
      translateGut,
      mean
      
--------------------------------------------
子
<template>
  <div class="app">
    <h1>{{ info.gut }}-{{ info.glimpse }}</h1>
    <!-- 以下违背了单项数据流,会直接报错 -->
    <!-- <button @click="info.gut = '肠道'">翻译</button> -->
    <!-- 报错有两个原因:1,父组件传过来的数据是readonly只读属性,2,违背了单项数据流 -->
    <!-- 正确做法 -->
    <button @click="translate">翻译</button>
  </div>
</template>

<script>
export default {
  props: {
    info : {
      type: Object,
      default() {
        return {};
      }
    }
  },
  emits: ['translate'],
  //提示:用context,参数必须带上props和context,否则会报错
  setup( props,context ) {
    function translate() {
      context.emit('translateGut', '肠道')
    }
    return {
      translate
    }
```









### 1.5. reactive函数补充

- isProxy
  - 检查是否reactive/readonly创建的代理对象, 不包括ref

- isRactive
  - 检查是否reactive创建的响应式对象

- isReadonly
  - 当reactive包裹一个readonly创建的对象会返回true

- shallowReactive
  - 创建响应式对象,但是不深度代理

- shallowReadonly
- ...

```vue
import { reactive, onMounted, ref, isProxy, isReactive, readonly, isReadonly, toRaw, shallowReactive } from "vue";
export default {
  setup() {
    //reactive属性判断的其他api

    //1,isProxy属性:检查是否reactive/readonly创建的代理对象
    const aviation = reactive({ a: 1 });
    const exhibit = ref({ b: 1 });
    onMounted(() => {
      console.log("isProxy", isProxy(aviation), isProxy(exhibit))//isProxy true false
    })

    //2,isReactive属性:检查是否reactive创建的响应式对象
    const wrapRef = readonly(exhibit);
    onMounted(() => {
      console.log("isReactive", isReactive(aviation), isReactive(exhibit), isReactive(wrapRef))//isReactive true false false
    })

    //2.2,当reactive包裹一个readonly创建的对象会返回true
    const warpRat = reactive(exhibit.value);
    const readValue = readonly({a : 2});
    const warpRat2 = reactive(readValue);
    
    onMounted(() => {
      console.log("isReactive", isReactive(warpRat), isReactive(warpRat2))//isReactive true true
      console.log(isReactive(warpRat2))//因为readonly的值是不变的,自然没了响应式的功能,所有false
      //但ref返回的对象在被reactive包裹依旧是响应式所以返回true
     })

    //3,readonly属性:创建只读的代理对象
    onMounted(() => {
      console.log("isReadonly",isReadonly(aviation) ,isReadonly(wrapRef))//isReadonly false true
      //理由:和上面解释同理
    })

    //4,toRaw属性:获取原始对象
    onMounted(() => {
      console.log("toRaw", toRaw(aviation), toRaw(wrapRef))//toRaw {a: 1} {b: 1}
    })

    //5,shallowReactive属性:创建响应式对象,但是不深度代理
    const shallow = shallowReactive({ 
      a: 1,
      b: { c: 2 }
     });
     onMounted(() => {
     console.log(shallow)//shallow是代理的,但shallow.b不是

```







### 1.6. ref函数补充

```vue
import {  reactive,toRef } from "vue";
export default {
  //setup中toRefs属性/toRef属性
  setup() {
    const info = reactive({
      aviation : 'aviation',
      aircraft : 'aircraft'
    })

    //问题:解构则数据无法响应式更新
    // const {aviation, aircraft} = info
    //解决
    //1,利用toRef
    const aviation = toRef(info, 'aviation')
    const aircraft = toRef(info, 'aircraft')
    //2,利用toRefs
    // const {aviation, aircraft} = toRefs(info)

    function translate() {
      info.aviation = '航空',
      info.aircraft = '飞机'
      console.log(info.aviation, info.aircraft)//clg可以判断数据是否响应式,当无利用toRefs,这里改为飞机但template不变
    }
    return {
      aviation,
      aircraft,
      translate

```





- toRefs
- toRef
- unref
- toRaw
- ...



```vue
<!-- 已经解包了,再加value会报错 -->
<h1>{{ refInfo.a.b }} - {{ b.bb.c }}</h1>
  
<script>
import { unref,ref, isRef, shallowRef, triggerRef } from "vue"
export default {
  setup() {
    //1,unref属性:是val = isRef(val) ? val.value : val的语法糖
    const a = ref(10)
    console.log(a)//ref对象
    console.log(unref(a))//10


    //2,isRef属性:判断val是否是ref对象
    console.log(isRef(a))//true


    //3,shallowRef属性:创建一个浅层响应式ref对象
    // 修改shallowRef的c,没有响应式变化,但ref会有,ref默认是深度响应式
    const refInfo = ref({
      a: {
        b : 10
      }
    })
    const b = shallowRef({
      bb: {
        c: 10
      }
    })
    refInfo.value.a.b = 20
    b.value.bb.c = 20
    // 虽然c被修改了,但c不是响应式的,和普通的c一样,比如给b.value.bb.c++,没有响应式变化,refInfo.value.a.b++会变
    //proxy代理: 这就是代理对象和普通对象的区别:代理模式可以响应式变化(即js修改后模板的数据自动变化而不需要其他操作),而普通对象只能js里变化但模板不变化(因为没代理)
 
    //4,triggerRef属性:触发ref对象的响应式
    // 修改triggerRef的c,会响应式变化
    function changeReact() {
      // 点击一次,则c已经在js中变化的值,会应用到模板中:你点了c++5次但c模板没变,点一次triggerRef,c模板就变了
      triggerRef(b)
    }

    return {
      refInfo,
      b,
      changeReact
```









### 1.7. setup中不能使用this





# 二. Composition API(二)

### 2.1. computed计算属性(重要)

- tip提示要不要加逗号,函数里面不用,对象要
- computed属性和外面的computed用法一样,传入函数只是语法糖(省略setter):弊端:不能修改数据
  - 所以修改要使用computed属性中的setter和computed

```vue
<script>
import { reactive, computed } from "vue"
export default {
  //setup中computed计算属性
  // computed: {
  //   fullname() {
  //     return this.names.alley + " " + this.names.barn
  //   }

  // },
  
  setup() {
    //1,拼接数据
    const names =  reactive({
      alley: "alley",
      barn: '小巷'
    })

    // computed属性和外面的computed用法一样,传入函数只是语法糖(省略setter):弊端:不能修改数据
    // const fullname = computed(() => {
    //   return names.alley + " " + names.barn
    // })

    //利用computed属性中的setter和computed,而不用语法糖(这样可以修改传来的数据,语法糖不行)
    //computed返回的是ref对象,本质利用了ref(),所有修改要加.value
    //修改时对computed结果的修改,而不是对传入computed的值修改
    const fullname = computed({
      get() {
        return names.alley + " " + names.barn
      },
      set(value) {
        const arr = value.split(" ")//固定写法
        names.alley = arr[0]
        names.barn = arr[1]
      }

    })
    // 修改fullname的值
    function changeFullname() {
      fullname.value = "barn 谷仓"
    }


    //2, computed的其他常见用法
    const score = 60
    const scoreJudge = computed((function() {
      return score >= 60 ? "及格" : "不及格"

    }))

    return {
      fullname,
      changeFullname,
      scoreJudge

```





### 2.2.ref获取元素/组件(半个重要)

```vue
<template>
  <div class="app">
    <h2 ref="barn">i am h2/barn</h2>
    <button @click="getElement">vibrate</button>
    <showInfo ref="showInfo"/>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import showInfo from './showInfo.vue'

export default {
  components: { showInfo },
  //ref属性/ref属性:引入组件/元素
  setup() {
    //过程:定义个ref对象,让其绑定在有ref属性的元素上
    const showInfo = ref(null)
    //加.value,因为ref属性返回的是一个对象,而这本质利用showInfo里面的值
    onMounted(() => {
      //调用组件的方法
      showInfo.value.showInfo()
    })

    return {
      barn,
      getElement,
      showInfo,
        
------------------------------------
  子
<script>
export default {
  //方式一
  // methods: {
  //   showInfo() {
  //     console.log("i am method");

  //  }}
  setup() {
    //方法二(在setup里面)
    function showInfo() {
      console.log('i am method')
    }
    return {
      showInfo

```





### 2.3. 生命周期注册函数(重要)

- beforeCreate/Created => setup
- onMounted
- create这个回调函数(看最下面): 直接执行了,而不用放在create函数里面再回调

```vue
<template>
  <div class="app">
    appvue
  </div>
</template>
<script>
import { onMounted } from "vue";
export default {
  //setup里面的 lifecycle生命周期:
  //除了beforeCreate和create之外(因为取消了,可以直接在setup里面用,可以用onMounted代替)其它生命周期均需要加上on才能使用
  setup() {
    //onMounted不是什么周期函数,传入里面的回调函数才是
    //onMounted等函数可以多次注册
    onMounted(() => {
      console.log("mounted");
    });
    onMounted(() => {
      console.log("mounted");
    });
    onMounted(() => {
      console.log("mounted");
    });
 
    //这里直接用(就是相当于create和beforecreate的功能了),如这create比mounted先执行
    console.log('created')//直接执行了,而不用放在create函数里面再回调
  }
```







### 2.4. provide/inject

```vue
父
import ShowInfo from './showInfo.vue'
import { ref, provide } from "vue";
export default {
components: { ShowInfo },
//setup中的provide属性/inject属性
setup() {
  //要是想要数据有响应式,给provide加ref,而不是inject,因为是父传子孙
  const gallery = ref("galley");

  //tip提示:报错没在父组件中用就不用定义,直接在provide中定义就行
  // const barn = '谷仓'

  //optionApi中是return返回一个对象(里面有键和值)
  provide("gallery", gallery);//第一个参数是key,第二个参数是值
  provide("barn", '谷仓');
  // provide({
  //   barn: '谷仓',
  //   gallery: gallery
  // })//warning报错:不可以这样,provide通过键值对返回给子组件,而不是对象

  //因为我在父组件只用gallery,所以不用返回barn
  return { gallery };

--------------------------------------
子
<template>
  <div class="app">
    <!-- tip提示:无论那种引入方式,都不用加.value,因为底层已经做了 -->
    {{ barn }} - {{ gallery }}
    <button @click = "gallery = '画廊'">翻译</button>
  </div>
</template>
<script>
import { inject } from "vue";
export default {
  // inject: ['barn', 'gallery']//ref包裹的值,不用加.value

  setup() {
    const barn = inject("barn");
    const gallery = inject("gallery");
    return { barn, gallery };
```





### 2.5. watch/watchEffect(半个重要)

- watch/watchEffect区别:
  1. watch必须制定数据源, watchEffect自动收集依赖
     - 要是watch拿不到更新前的值,试试制定的监听源改为()=>({...data})(下面案例有)
  2. watch监听到改变,可以拿到改变前后value
  3. watchEffect默认直接执行一次,watch在不设置immediate第一次是不执行的
- tip提示:不同与optionApi,setup的数据要是想要有响应式必须考虑ref和reactive,optionApi中数据默认就是响应式的

```vue
watch
<script>
import { ref, watch, reactive } from "vue";
export default {
  setup() {
    const count = ref(0)
    let lap = '膝'
    const laptop = '笔记本电脑'  
    //模仿请求数据的延迟
    setTimeout(() => {
      count.value = 99
    },1000)

    //1,监听普通数据变化:(只能监听响应式数据,且依赖改变才会触发)
    watch(count, (newVal, oldVal) => {
      console.log("watch", newVal, oldVal)
    })
    //1.2,warning报错:watch只能监听响应式数据,lap=手不行

      
    //2,监听复杂数据变化,返回的是普通对象
    const words = reactive({
      proportion: '比例',
      portion: '部分,责任',
      counter: 0
    })
    //2.2返回的是代理对像 (Proxy)
   const stopWatch = watch(words, (newVal, oldVal) => {
      console.log("watch", newVal, oldVal,words.counter)
      //2.23,停止监听
      if(words.counter >4) {
        stopWatch()
      }
    },{
      immediate:true
    })

    //2.3,返回的是普通对象
    watch(()=> ({...words}), (newVal, oldVal) => {
      console.log("watch", newVal, oldVal)
    })

    return {
      count,
      watch,
      lap,
      laptop,
      words

```



- watchEffect

  ```vue
  <script>
  import { watchEffect, reactive } from 'vue';
  export default {
    setup() {
      console.log('======i am watchEffect============')
      const words = reactive({
        proportion: '比例',
        portion: '部分',
        counter: 0
      })
  
      const stopWatch = watchEffect(() => {
        console.log('watchEffect', words.portion, words.proportion, words.counter)
        //终止监听
        if (words.counter > 6) {
          stopWatch()
        }
      })
      function counter() {
        words.proportion = '部分'
        words.counter++
      }
      return { words, counter }
  ```

  



### 2.6. 自定义Hook的练习(思想)

- tip提示:函数要放在setup函数里面,相当于用了created生命周期函数

#### 2.6.1. useCouter

```javascript
add.js

import { ref } from 'vue'
export default function  add() {
  const counter = ref(0)
  function add() {
    counter.value++
  }
  //tip提示:函数要放在setup函数里面,相当于用了created生命周期函数
  setTimeout(() => {
    counter.value =999
  }, 1000);
  return {
    counter,
    add
   }
}

-----------------------
 vue中
<h2>
  About:{{ counter }}
</h2>
<button @click="add">add</button>
import Add from '../Hooks/add.js'
export default {
  setup() {
    //既然是函数式编程(函数是对象),则里面的代码可以像对象一样提取和复用,所以放在Add函数里面
    // const counter = ref(0)
    // function add() {
    //   counter.value++
    // }
  
 // 只要setup函数中,就默认在created这个生命周期函数中
    return {
      ...Add(),
    }
  }
}

```







#### 2.6.2. useTitle

```javascript
import { ref, watch } from 'vue'
export default function useTitle( titelValue ) {
  //1,函数非optionApi里面是默认响应式(要考虑是不是响应式),其他都要想变响应式才能更改template中的数据(比如标题就是template里面)
  const titleValue = ref( titelValue )
  
  //2,watch监听titleValue,一旦变化就更新document.title,否则useTitle就执行一次,导致docment.title不更新
  // 所以document.title = titelValue没效果
  watch( titleValue, ( newValue ) => {
    document.title = newValue
  } )

  return titleValue
}

------------------------------------------
vue
<div>需求:点击标题改变</div>
<button @click="changeMusic">关于-音乐</button>
<button @click="changeProfit">关于-个人</button>
<button @click="changeGame">关于-游戏</button>

import useTitle from '../Hooks/useTittle';
export default {
  setup() {
    //1,一直调用useTitle不符合编程思想
    // useTitle('关于')
    // function changeMusic() {
    //   useTitle('关于-音乐')
    // }
    // function changeProfit() {
    //   useTitle('关于-个人')
    // }
    // function changeGame() {
    //   useTitle('关于-游戏')
    // }

    //1,2优化
    //外层若只用返回值,则函数只在调用才执行其他不行,所有函数里面要用watch监听变化
    const title = useTitle('关于')//先接受返回值,等调用函数改变了数据,usetitle里面的函数watch就会回调
    function changeMusic() {
      title.value = '关于-音乐'
    }
    function changeProfit() {
      title.value = '关于-个人'
    }
    function changeGame() {
      title.value = '关于-游戏'
    }

    //return返回值用法2
    return {
      changeMusic,
      changeProfit,
      changeGame
    }
  }
}
```





### 2.6.3. useScrollPosition

- ​    解构赋值意义:当返回值有多个值时,用解构赋值可以很方便的获取值如const{a,b} = scrollWatch(),可以一次性提取多个返回值(a,b尽量和返回值属性名一致)

```javascript
import { ref } from "vue";
export default function scrollWatch() {
  const scrollPosition = ref({
    x : 0,
    y : 0
  })

  // 监听窗口滚动事件。
  // 由于窗口滚动是浏览器 DOM 事件，并非 Vue 的内置响应式数据源，
  // 因此我们使用 addEventListener 来捕获滚动行为。
  // 然后将滚动位置 (scrollX, scrollY) 保存到一个 ref 对象中，
  // 这样它就变成了响应式数据，可以在组件中被安全地使用和监听。
  addEventListener("scroll", () => {
    scrollPosition.value.x = window.scrollX;
    scrollPosition.value.y = window.scrollY;
  });
  
  return scrollPosition
}
---------------------------
 vue文件中
<template>
  <div class="app">
  <div>监听数据滚动并实现响应式</div>
     <h2>x: {{ scrollPosition.x }}</h2>
     <h2>y: {{ scrollPosition.y }}</h2>
</template>

<script>
//引入自定义滚动方法
import scrollWatch from "./Hooks/scrollWatch"
import { ref } from "vue"
export default {
  setup() {
    //concept概念:函数式编程并不是完全有面向式编程装换过来,比如修改标题要使用原生(标题在public中,在package.jason的name)
    // document.title = '哈哈'

    const  scrollPosition = scrollWatch()
    return {
      scrollPosition
```





### 2.7. script setup语法糖(重要)

- setup语法糖即不要自己写 setup(){}了

  - setup语法糖:当使用SFC(单文件组件)和Composition API时,推荐用该语法
    - 理由:1,性能高(底层script的代码和template在一个作用域),2,代码简洁
      而顶层的绑定会暴露给模板(如变量,函数):
      顶层绑定就是顶层作用域(即最外层作用域)的绑定,以前在<script>/script>里在setup函数里面编译,不是最外层作用域
      - SFC单文件组件中<script setup>只能有一个,普通的<script>也只能有一个
        - template也是一个,但style标签可以有多个

  ```vue
  父
  <script setup> ----是script这个标签的属性
  //1,所有编写在顶层代码都是默认暴露给模板的
  import { ref, onMounted } from 'vue'
  import ShowInfo from './showInfo.vue'
  
  //2,定义响应式数据
  const count = ref(0)
  console.log(count.value)
  
  //3,定义绑定的函数
  function add() {
    count.value++
  }
  
  //5,传递接受emits的函数
  function addFunction(num){
    count.value += num
  }
  
  //6,获得组件实例
  const showCpn = ref()
  onMounted(() => {
    showCpn.value.foo()
  })
  </script>
  ```

  

- difineProps

- difineEmits

- difineExpose


```vue
子
<script setup>
//4,定义props属性(defineProps函数/defineProps方法)
//定义个props变量,接收父组件传递过来的title属性
defineProps({
  title: {
    type: String,
    default: 'Hello World'
  },
  cupboard: {
    type: String,
    default: 'Cupboard'
  }
})

//5,emits函数/emits方法(defineEmits函数/defineEmits方法):传递事件给父组件
//tip提示(使用emits函数):你使用这个时先想要不要传给父组件,比如这里你是想修改title的值,只是组件内的交互,和外部无关系所有不用
const emits = defineEmits(['add3'])
function add(num) {
  emits('add3', num)
}

//6,获得组件实例(要先暴露即defineExpose函数)
function foo() {
  console.log('i am 组件实例ref')
}
defineExpose({ foo })
```









