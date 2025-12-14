# 一. Vuex核心知识 - vue2 使用

### 1.1. Actions的使用

- mutations的重要原则是mutations必须是同步函数:因为devtools需要捕捉到mutaion的日志，如果异步代码执行的话devtools无法感知到mutation。
  而actions就有此而生(网络请求是异步的)

#### 1.1.1. actions的基本使用

- 定义action

  ```javascript
  actions: {
        //actions作用1.1,可以异步操作(即可以不按顺序执行)
        //1.2,要提交mutation,才能变更状态
        //1.3,参数context 和store拥有相同的属性和方法,故actions可以拿到getters,state和commit,而其叫context而不是store	
  
        //2.1,一个参数
        addAction(context) {
          //console.log(context.commit)//提交mutation
          //console.log(context.getters)//getters
          //console.log(context.state)//state
          context.commit('add')
        },
        
        //2.2,多个参数
        changeNameAction(context, payload) {
          context.commit('changeName', payload)
  
        },
  
        //2.3,对象形式
        changeUsersAction(context, payload) {
          context.commit(EMIT_OBJ, payload)
        },
  ```

  

- dispatch派发action -- 基本使用

  ```javascript
  <script>
  export default {
    methods: {
      add() {
        this.$store.dispatch('addAction')
      },
      changeName() {
        //传递参数
        this.$store.dispatch('changeNameAction', 'action的Name')
      },
  
      //参数是对象
      // emitObj() {
      //   this.$store.dispatch('changeUsersAction', {
      //     name: 'action对象的name',
      //     age: 19989
      //   })
      // },
  
      //其他风格传递
      emitObj() {
        this.$store.dispatch({
          type: 'changeUsersAction',
          name: 'action对象的name',
          age: 19989
        }
  
  
  <button @click="add">发起action修改count</button>
  <button @click="changeName">发起action修改name</button>
  <button @click="emitObj">发起action修改对象</button>
  ```

  





#### 1.1.2. actions的辅助函数  -- mapAction

- optionapi 

  ```javascript
  import { mapActions } from 'vuex'
  export default {
    methods: {
      //1,数组写法(则@click要与数组中的方法名一一对应) 这里不能给别名,下面的对象语法可以
      // ...mapActions(['addAction','changeNameAction', 'changeUsersAction'])
  	
      //2,对象写法
      ...mapActions({
        add: 'addAction',
        changeName: 'changeNameAction',
        emitObj: 'changeUsersAction'
      })
    }
  }
  
  // 和上面基本使用 不同
  <button @click="add">发起action修改count</button>
  <button @click="changeName('mapActions对象语法')">发起action修改name</button>
  <button @click="emitObj({name:'mapAction对象',age:929})">发起action以象参数修改的对象语法</button>
  ```

- setup -- 使用了useStore

  ```javascript
  import { useStore } from 'vuex';
  //1,使用mapActions
  const actionsObj = mapActions(['addAction', 'changeNameAction', 'changeUsersAction'])
  const newObj = {}
  const store = useStore()
  Object.keys(actionsObj).forEach(key => {
    newObj[key] = actionsObj[key].bind({ $store: store})
  })
  const { addAction, changeNameAction, changeUsersAction } = newObj
  
  //2,不使用
  // const store = useStore();
  // function add() {
  //   store.dispatch('addAction');
  // }
  
  
  <button @click="add">发起action修改count</button>
  <button @click="changeName('mapActions对象语法')">发起action修改name</button>
  <button @click="emitObj({name:'mapAction对象',age:929})">发起action以象参数修改的对象语法</button>
  ```

  



#### 1.1.3. actions的异步操作

- 注意

  1. return res.json() 

     json() 先把拿到的数据json化,否则undefined

  2.  要是直接commit具体值的话,注意有两个data

     context.commit('changeZidingyi', data.data.banner.list) 

     

- 推荐做法

  ```JavaScript
  state: () => ({
      data: []
  })
  Mutations: {
  	changeZidingyi(state, payload) {
          state.data = payload.data.banner.list
      },
  }
  actions: {
    async networkRequest(context) {
    return new Promise((resolve, reject) => {
        fetch('http://123.207.32.32:8000/home/multidata').then(res => {
          return res.json()
        }).then(data => {
          context.commit('changeZidingyi', data)
          resolve('网络请求成功')
        })
        .catch(err => {
          reject('网络请求失败')
        })
  })
  
  ------------------------------
  vue文件中
  <script setup>
  import { useStore } from 'vuex';
  const store = useStore();
  //1,方式一:
  // store.dispatch('NetworkRequest');
        
  //2,方式二:由于方式一只发送,就不管结果是否拿到:而promise函数可以解决
  //条件: index.js里面Action要返回一个promise对象
  //		Promise 构造函数的参数是一个执行器函数（executor），它接受两个参数：resolve 和 reject，用于处理异步操作的成功和失败。
  store.dispatch('networkRequest').then((res) => {
    console.log('网络请求回到成功,返回值是',res); -- res是 resolve 或 reject里面的值
  });
  </script>
  
  <template>
    <div class="app">
      <h3>{{ $store.state.data }}</h3>
      <template v-for="item in $store.state.data" :key="item.index">
        <div>{{ item.title }}</div>
      </template>
    </div>
  </template>
  ```

- action其他网络请求方式

  1. async/await (也推荐)

     注意: networkRequest函数前面加上async关键字

      优点:

     1. await关键字只能用在async函数中,使用它可以避免回调地狱,他会是等待fetch()执行完毕后再向下执行
     2. 简短

     相对于上面推荐方式的缺点: 	

     	-  不要在 Promise 的执行函数中使用 async，因为它可能导致不必要的复杂性和混淆,
     	-  但上面的太长了
  
  ```javascript
  async networkRequest(context) {
      const res = await fetch('http://123.207.32.32:8000/home/multidata')
      const data = await res.json()
      return "成功了"
      context.commit('changeZidingyi', data)
  ```



   2. fetch

      优点:   fetch()返回的是一个promise对象,可以使用promise的then方法

      ```JavaScript
      fetch('http://123.207.32.32:8000/home/multidata').then(res => {
            //res.json()返回也是一个promise对象同时这是对res进行json格式化
            res.json().then(data => {
              console.log(data)
              //把数据提交到mutation
              context.commit('changeZidingyi', data)
            })
      })
      ```

      

   3. 改进方式2 --- 链式调用  

```javascript
fetch('http://123.207.32.32:8000/home/multidata').then(res => {
    return res.json()
  }).then(data => {
    context.commit('changeZidingyi', data)
  })
```









### 1.2. Module的使用

-   vuex是单一状态树,即只有一个store,所以需要modules把store分割管理,让每个模块拥有自己的state、mutation、action、getters等,甚至是嵌套子模块

#### 1.2.1. module的基本使用

- 抽取到对象(如下面案例的newworkRq):
  - state
  - mutations
  - getters
  - actions
- modules: { home: 对象 }
- state.home.xxx
- getters.xxx
- commit
- dispatch



如网络请求

```javascript
vuex中
const store = createStore({
      modules: {    
    //写法一
    /* 
      nwRq: {
        把networkRq的代码复制粘贴   
      }
    */
    //写法二  
    nwRq : networkRq,
  }
})

--------------------------------------------
networkPq.js中
const newworkRq = {
  namespaced: true,
  state: () => ({
    // 服务器数据
    data: []
  }),
  mutations: {
    //网络请求
    changeData(state, data) {
      console.log(data)
      state.data = data
    }
  },
  actions: {
    networkRequest(context) {
      return new Promise((resolve, reject) => {
          fetch('http://123.207.32.32:8000/home/multidata').then(res => {
            return res.json()
          }).then(data => {
            console.log('测试')
            context.commit('changeData', data.data.banner.list)
            resolve('网络请求成功')
          })
          .catch(err => {
            reject('网络请求失败')
          })
        })

      }
  }
}
export default newworkRq

---------------------------------------------
vue文件
<script setup>
import { useStore } from 'vuex';
const store = useStore();
//注意dispatch是('nwRq/networkRequest')
store.dispatch('networkRequest').then((res) => {
  console.log('网络请求回到成功,返回值是',res);
  console.log(store.state.data,'1dd')//有值,因为数据更新了,而在外面的console.log是无值
});
console.log(store.state.data,'2dd')//1. 这里是同步,所以比上面先调用, 2. 拿到一个里面没值的代理对象,因为第一个次请求

</script>

<template>
  <div class="app">
    <!-- 获取数据,有$store.state.zidingyi改为$store.state.nwRq.zidingyi,上面dispatch不变 -->
    <template v-for="item in $store.state.data" :key="item.index">
      <div>{{ item.title }}</div>
    </template>
  </div>
</template>

```







#### 1.2.2. module的命令空间

注意写在目标文件中

- namespaced: true

  - 作用: 模块是“私有”的，形成自己的小地盘，用里面的东西需要先“指明是哪个地盘”，这样更安全、更有序

  - vuex主文件引入

    ```javascript
    vuex中
    import counterModule from './modules/counter'
    //counter导出的是counter, 然后赋值给counterModule
    
    const store = createStore({
        counter: counterModule, ---> 给counterModule其别名
        //注意 namespaced: true 写在目标文件中(即counter.js)
      }
    })
    ```

  - 编写counter文件

    ```javascript
    const counter = {
      namespaced:true, --> 写在这
      
      state: () => ({
        counters: 1,
        payLoad : ''
      }),
      getters: {
        douleCounters(state,getters,rootState) {
          return state.counters * 2 + rootState.count
        },
      },
      mutations: {
        increament(state, payload) {
          state.counters++,
          state.payLoad = payload,
          console.log(state.payLoad + 'counter.js的Mutations的increament')
        }
      },
      actions: {
        increamentAction(context,payload) {
          context.commit('increament',payload)
        },
        //action的六个参数
        sixArgAction({commit,state,getters,rootState,dispatch,rootGetters}) {
          //当使用这个参数,则不用context.commit
          commit('increament','counter.js/actions/sixArgAction来commit给  ')
          commit('changeName', 'counter.js/actions/sixArgAction来commit给  ', {root:true})
    
          console.log('模块的state',state.counters)
          console.log('root的state',rootState.count)
          console.log('模块的getters',getters.douleCounters)
          console.log('root的getters',rootGetters.doubleCount)
    
          //当使用这个参数,则不用context.dispatch
          dispatch('increamentAction','counter.js/actions/sixArgAction来dispatch给  ')
          //dispatch给root的action传值
          dispatch('changeNameAction','counter.js/actions/sixArgAction来dispatch给  ',{root:true})
    
    
        }
      }  
    }
    export default counter
    ```

  - vue文件中

    - 模板的state的数据获取不变, getters变为加['xx/xx'] 

    ```vue
    <script setup>
      //在模板中设namespace是为了防止命名冲突,当把其设为true时,可以视为有全局变局部,获取数据的方式就改变了
      import { useStore } from "vuex";
      const store = useStore();
      function increament() {
        store.commit('counter/increament')
      }
      function increamentAction() {
        store.dispatch('counter/increamentAction')
      }
      function changeBySixArg() {
        store.dispatch('counter/sixArgAction')
      }
    </script>
    <template>
      <div class="app">
          
        <!--  $store.state.counter.counters即模板的state的数据获取不变,其他变为加['xx/xx'] -->
        <h3>state:{{ $store.state.counter.counters }}</h3>
        <h3>getters的counters和root的count:{{ $store.getters['counter/doubleCounters'] }}</h3>
          
          
        <button @click="increament">mutation</button>
        <button @click="increamentAction">increament的Action</button>
        <button @click="changeBySixArg">action的6个参数</button>
      </div>
    </template>
    <style scoped>
    </style>
    ```

    

- namespaced: false

  - 作用: 模块是“公共”的，里面的东西大家都可以直接用，但容易造成混乱。

  - vuex主文件不变 (即和上面一样)

  - 编写counter文件

    - 只有namespaced: false, 其他不变

  - vue文件中

    - 即store.commit里面的值 和 获取counter.js文件的getters变了

    ````javascript
    <script setup>
      import { useStore } from "vuex";
      const store = useStore();
      function increament() {
        store.commit('increament', 'increament的mutation')
      }
      function increamentAction() {
        store.dispatch('increamentAction', 'increamentAction的action')
      }
      function changeBySixArg() {
        store.dispatch('sixArgAction')
      }
    </script>
    <template>
      <div class="app">
    
        <h3>state:{{ $store.state.counter.counters }}</h3>
        <h3>getters的counters和root的count:{{ $store.getters.douleCounters }}</h3>
    
    
        <button @click="increament">mutation</button>
        <button @click="increamentAction">increament的Action</button>
        <button @click="changeBySixArg">action的6个参数</button>
      </div>
    </template>
    <style scoped>
    </style>
    ````

    

  





# 二. Pinia的使用(只有三个核心) -- vue3

### 2.1. Pinia介绍和Vuex的区别(面试)

pinia是vuex团队想升级的vuex4.0

#### Pinia的优点

1. 更少仪式,更灵活,提供和compositionApi风格的API

2. 更好的TypeScript支持(vuex和其搭配太弱)

3. 不再有mutations,modules,命名空间(即没了namespace:true那个)

4. 因为没了modules,其代替modules的方法是其可以有多个store,即多个store.js文件
   - 所以 pinia只有三个核心:store,state,action

#### 

 



### 2.2. Pinia的安装和基本使用

- 先npm i pinia

- 定义store

- ```javascript
  ./stores/index.js
  import { createPinia } from 'pinia'
  const pinia = createPinia()
  export default pinia
  ```



- createPinia 和 app.use

  ```javascript
  main.js中
  import { createApp } from 'vue'
  import App from './App.vue'
  import pinia from './stores/index'
  createApp(App).use(pinia).mount('#app')
  ```

  

  

### 2.3. Pinia核心state

- 模版中不能直接引用state值,需要在setup中导入先

- 规范:Pinia返回的函数统一用usexx

- 修改state方式, 这里可以直接修改,不用commint给Mutations了
  - 方式一: store.$reset
  - 方式二: store.$patch

  - 方式三: store.$state = {}  -- 少用,因为效果和Store.$patch一样



- let { count } =countStore  -- count直接没了响应式

- 而 let { count } = toRefs(countStore) -- 这里解构出来的count依旧具有响应式, 原因( 即toRefs原理 )
  1. countStore 是 Pinia 创建的一个响应式对象。你可以把它看作一个由 reactive() 包裹的对象。
  2. toRefs 函数会接收一个响应式对象（比如 countStore），然后把它内部的每一个属性都转换成一个 ref 对象。 所以，toRefs(countStore) 执行后，返回的不再是 countStore 本身，而是一个新的普通对象，但这个对象里的每个属性值都是一个 ref。
     - 比如  count: ref(0), // 这里的 ref 指向原始 store 里的 count, 你解构的只是属性名,又不是值
         同时 ... store 里的其他 state 属性也会被转成 ref



- Pinia的StoreToRefs的原理和toRefs一样

  

-  const oldState = mtpStores.$state
    mtpStores.$state = {
      name: '迈克',
      level: 999,
    } 修改了state的值,但 oldState === mtpStores.$state 还是为true ( ( 即mtpStores.$state原理))
  - 原因
    -  Pinia 实际上不会替换内部的 $state 对象，而是会遍历新对象，并将其属性(即name和level)合并到当前的 $state 对象中。这是为了保持响应性系统的一致性，因为直接替换 $state 对象可能会导致失去对先前状态的响应性跟踪

```javascript
Pinia中
//定义一个关于count的store
import { defineStore } from 'pinia'
//count是id,是必须设的,pinia用它连接到devtools(浏览器那个工具)
//规范:返回的函数统一用usexx
const useMtpStates = defineStore('mtpStates',{
  state: () => ({
    age: 22,
    name: 'mj',
    level: 100
  })
})
export default useMtpStates

---------------------------------
vue文件
<script setup>
//导入,模版才能用
import useCount from '../stores/01count'
//规范:放回的函数统一用usexx
import useMtpStates from '../stores/01multiple'
import { toRefs } from 'vue'
import { storeToRefs } from 'pinia';

//1,模板中使用
let countStore = useCount()
const mtpStores = useMtpStates();

//1.2.原理
let { count } = toRefs(countStore)


//2.{count}则count非响应式,用refs或pinia专属的storeToRefs
// const { age, name } = toRefs(mtpStores)
const { age, name,level } = storeToRefs(mtpStores)


//3,修改state, 这里可以直接修改,不用commint给Mutations了
function changeStates() {
  //3.1,方式一:一个个修改
  count.value++
  age.value++ //无论storeToRefs还是toRefs,都要value

  //3.2,方式二,一次修改多个($patch)
   mtpStores.$patch({
     name: '迈克',
     level: 999
   })

  //3.3,方式三:整体修改(但还是mtpStores.$state这个对象,只是属性变了)(少用) -- 因为效果和$patch一样
  // mtpStores.$state = {
    //name: '迈克',
    //level: 999,
    // mj : 'jjjl'
  //}
}

//3.4,重置
function reset() {
  mtpStores.$reset()
}
</script>

<template>
  <div class="app">
    <h3>模版中不能直接引用state值,需要在setup中导入先</h3>
    <h3>countStore.count:{{ countStore.count }}</h3>
    <h3>便捷使用:count:{{ count }}</h3>
    <h3>mtpStates的age:{{ age }}</h3>
    <h3>mtpStates的name:{{ name }}</h3>
    <h3>level:{{ level }}</h3>

    <button @click="changeStates">changeStates</button>
    <button @click="reset">重置</button>
  </div>
</template>
<style scoped>
</style>
```

​	



### 2.4. Pinia核心getters

- 基本使用

```javascript
vue文件中

import useGetters from '../stores/02useGetters'
import { storeToRefs } from 'pinia';
const gettersArrs = useGetters();
const { GAge, friendsObj } = storeToRefs(gettersArrs)
function add() {
  GAge.value++,  --> 都有加value
  friendsObj.value[1].num++,
  friendsObj.value[2].num++
}
</script>

    // 1.使用方式一
<h3>GAge:{{ GAge }}</h3>

<!-- 2,.1使用方式二: getter基本使用 --> 即前面要gettersArrs,因为没使用storeToRefs来解构
<h3>doubleGAge:{{ gettersArrs.doubleGAge }}</h3>
<!-- 2.2,使用其他getters -->
<h3>doubleGAgeAddTen:{{ gettersArrs.doubleGAgeAddTen }}</h3>

<!-- 2.3,getters可以返回一个函数(括号是传参数) -->
<h3>通过id获得朋友对象:{{ gettersArrs.getFriendId(103) }}-num:{{ gettersArrs.getFriendId(103).num }}</h3>
<h3>通过id获得朋友对象:{{ gettersArrs.getFriendId(102) }}-num:{{ gettersArrs.getFriendId(102).num }}</h3>
```





- 引入其他的getters
- getters返回函数
- getters引入其他store数据

```javascript
import { defineStore } from 'pinia'
//引入其他stores
import useMtpStates from './01multiple'
//count是id,是必须设的,pinia用它连接到devtools(浏览器那个工具)
//规范:放回的函数统一用usexx
const useGetters = defineStore('getters',{
  state: () => ({
    GAge: 22,
    Gname: 'mj',
    friendsObj: [
      { id: 101, name: 'james1', num:1},
      { id: 102, name: 'vick2', num:2},
      { id: 103, name: 'nick3', num:3},
      { id: 104, name: 'mike4', num:4},
      { id: 105, name: 'Tom5', num:5}
    ] 
  }),
  //getters:相当于computed属性
  getters: {
    //1,基本使用
    doubleGAge(state) {
      return state.GAge * 2
    },

    //2,使用其他getters
    doubleGAgeAddTen() {
      //this是store实例
      return this.doubleGAge + 10
    },

    //3,getters也可以返回一个函数(可以带参数)
    getFriendId(state) {
      return function(id) {
        for(let i = 0; i < state.friendsObj.length; i++) {
          if ( state.friendsObj[i].id === id) {
            return state.friendsObj[i]
          }
      }
      }
    },

    //4,getters获取其他store中的数据
    message() {
      //4.1,获取其他store中的数据
      const mtpStates = useMtpStates()

      //4.2,拼接信息
      return `其他store:name:${mtpStates.name} is ${mtpStates.age} years old}`
    }
  }
})

export default useGetters

-----------------
./01multiple
import { defineStore } from 'pinia'
const useMtpStates = defineStore('mtpStates',{
  state: () => ({
    age: 22,
    name: 'mj',
    level: 100
  })
})
export default useMtpStates
```





### 2.5. Pinia核心Actions

- 基本使用

  -  const countStores = useCount();
  -  countStores.add() 来调用Pinia里面action的方法, 
    - 而前面(如state,getters) 像countStores.xx这种方式来使用的都是在template模板中,这里是setup中

  - 有this,表示所在Pinia的实例

  ```javascript
  vue文件中
  <script setup>
  import useCount from '../stores/03count';
  import { storeToRefs } from 'pinia';
  import useNWData from '../stores/03nwRq';
  
  const countStores = useCount();
  const { counter, subCount } = storeToRefs(countStores);
  
  //actions属性
  //1,基本使用
  function changeCounter() {
    countStores.add()
    //传递参数
    countStores.sub(10)
  }
  
  <button @click="changeCounter">add++/sub10</button>
  
  --------------------------------
  Pinia文件中
  //定义一个关于count的store
  import { defineStore } from 'pinia'
  //count是id,是必须设的,pinia用它连接到devtools
  const useCount = defineStore('Actionscount',{
    state: () => ({
      counter : 1,
      subCount : 1000
    }),
  //actions属性
    actions: {
      add() {
        //this指的是当前实例
        this.counter++
      },
      sub(num) {
        this.subCount -= num
      }
    }
  })
  export default useCount
  ```

  

- 发送异步请求

  - 返回Promise回调

  ```JavaScript
  vue文件中
  
  //网络请求(setTimeout模仿网络延迟)
  const nwStore = useNWData();
  //可以用then,因为 fetchNWData 方法是一个 async 函数。所有的 async 函数都会返回一个 Promise
  //要是请求失败.then不会执行,res只是成功时返回
  setTimeout(() => {
    nwStore.fetchNWData().then(res => {
      console.log(`请求${res},展示有无到更新为:`,nwStore.data)
    })
  },1000)
  ```

  - 样式问题

    ```JavaScript
    <ul style="display: flex; flex-wrap: wrap; list-style: none;">
      <template v-for="item in nwStore.data" :key="item.index">
        <li style="display: flex; flex-direction: column;">
          <img :src="item.image" alt="">
          <span>{{ item.title }}</span>
        </li>
      </template>
    </ul>
    
    <li>中没有style="display: flex; flex-direction: column; 则图片和文字是分开的,因为默认是flow
    ```

    - Pinia文件

      ```javascript
      //定义一个关于count的store
      import { defineStore } from 'pinia'
      
      //count是id,是必须设的,pinia用它连接到devtools
      const useNWData = defineStore('nwData',{
        state: () => ({
          data: []
        }),
        actions: {
          //方式一:
          //#region 推荐
          // async fetchNWData() {
          //   const res = await fetch('http://123.207.32.32:8000/home/multidata')
          //   //这个res.json与express文件里面的res.json()
          //   const data = await res.json()
          //   this.data = data.data.banner.list
          //   return '成功啦'
          //   // resolve('成功啦')会报错,要是想用且可以返回请求失败的结果可以和try catch结合使用(即方式三)
          // }
          //#endregion
          
          //方式二
          //#region 
          fetchNWData() {
            return new Promise((resolve, reject) => {
              fetch('http://123.207.32.32:8000/home/multidata').then(res => {
                return res.json()
              }).then( data => {
                this.data = data.data.banner.list
                resolve('成功啦')
              }).catch(err =>{
                reject('失败啦')
              })
            }) 
          }
          //#endregion
      
          //方式三
          // async fetchNWData() {
          //   try {
          //     const res = await fetch('http://123.207.32.32:8000/home/multidata')
          //     if(!res.ok) {
          //       //由于你这是直接断网,不会执行try于是err.message是undefined
          //       throw new Error('我是res.ok:请求失败')
          //     }
          //     const data = await res.json()
          //     this.data = data.data.banner.list
          //     console.log(this.data)
          //     return '成功啦'
          //   }
          //   catch(err){
          //     throw new Error('请求失败',err.message)
          //   }
          // }
        }
      })
      
      export default useNWData
      ```

      - ​    res.ok 是一个布尔值，表示响应是否成功。成功的状态码通常是 200 到 299 之间的数字。如果响应状态码在这个范围之外（例如 404、500 等），res.ok 会为 false。







# 三.axios库

-  axios库--网络请求库(名字可能是ajax,i/o system的缩写)

### 3.1. 为什么选择axios

- 安装: npm install axios

- 相比原生的如fetch,优点:

  1. 可以node发送http请求 与 浏览器发送XMLHttpRequests请求
     - 即两个都可以请求,而原生只能http请求或者XMLHttpRequests请求

  2. 支持Promise API

  		3.拦截请求和响应(原生没有)

  		4.转换请求和响应数据





### 3.2. axios发送请求

- get/post/request
- config传入

```javascript
import { createApp } from 'vue'
import App from './App.vue'
import axios from 'axios'

createApp(App).mount('#app')
//方式一: 通过发送request请求(method:get/post(即兼容get/post))
//1.1 get
axios.request({
  url: 'http://localhost:3000/About?id=3',
  method: 'get',
}).then(res => {
  // console.log(res)//res对象包含了服务器返回的所有信息(组件那些也有),你要的数据在res.data中
  console.log('get',res.data)
})

//1.2 post(这里是把data对象(不能改为其他名)存入服务器中)
axios.request({
  url: 'http://localhost:3000/About',
  method: 'post',
  data: {
    name: '我我我是是是是张三',
    age: 200000000000000000,
  },
}).then(res => {
  console.log('post',res.data)//在终端可以看见
})


//方式二: 
//2.1 方式一
axios.get("http://localhost:3000/About?id=2").then(res => {
  console.log('get请求方式一',res.data)//一样要res.data
})

//2.2 方式二
axios.get('http://localhost:3000/About', {
  params: {
    id: 5
  }
}).then(res => {
  console.log('get请求方式二',res.data)
})

//3,发送post请求
axios.post('http://localhost:3000/About', {
  name: '张三',
  age: 20,
}).then(res => {
  //返回的是你发送的数据,让你知道发送成功
  console.log('post请求',res.data)
})

```





### 3.3. axios额外补充

- axios.defaults.baseURL
- axios.defaults.timeout/headers
- axios.all -> Promise.all

```javascript
import { createApp } from 'vue'
import App from './App.vue'
import axios from 'axios'
createApp(App).mount('#app') --> 在这里挂载App文件
const baseURL = 'http://localhost:3000'

//一,给axios添加公共配置
axios.defaults.baseURL = baseURL
axios.defaults.timeout = 6000
axios.defaults.headers = {}

axios.get('/home/4').then(res => {
  console.log('添加公共配置的get请求成功',res.data)
})


//二,axios发送多个网络请求
axios.all([
  axios.get('/About',{
    params:{
      id:2
    }
  }),
  axios.post('/About',{
    name:'张三',
    age:20
  })
]).then(res => {
  //放回的res是一个数组,不用res.data
  console.log('axios发送多个网络请求成功',res)
})
```





### 3.4. axios创建实例

- 为什么需要创建实例
- axios.create()

```javascript
const instance1 = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 5000,
  headers: {}
})

instance1.get('/About?id=1').then(res => {
  console.log('创建不同实例之实例一',res.data)
})

const instance2 = axios.create({
  baseURL: 'http://localhost:3000/home',
  timeout: 5000,
  headers: {}
})

instance2.get('/4').then(res => {
  console.log('创建不同实例之实例二',res.data)
})

```





### 3.5. axios的拦截器

- axios.interceptors.request/response.use

```javascript
//实例配置之网络拦截器

//请求拦截器
axios.interceptors.request.use(config => {
  //在这作用:
  //1,开始loading的动画

  //2,对原来的配置进行修改:
    //2.1,修改请求头
    //2.2,认知登录(token/cookie)
    //2.3,请求参数进行某些转化
  console.log('请求拦截成功')
  return config
}, (err) => {
  console.log('请求拦截失败')
  return err
}
)


//响应拦截器
axios.interceptors.response.use(res => {
  //在这作用:
  //1,关闭loading的动画
  //2,对响应数据进行某些转化
  console.log('响应拦截成功')
  return res
}, (err) => {
  console.log('响应拦截失败')
  return err
})


//发送网络请求
axios.get('http://localhost:3000/About',{
  params:{
    id:1,
  }
}).then(res => {
  console.log('拦截器',res.data)
}).catch(err => {
  console.log('网络请求失败',err)
})

```





### 3.6. axios的简洁封装

```javascript
import axios from 'axios'

//创造类
//HY是指创作者自己定义的前缀,通常是自己名字/项目的缩写(你可以改为CAORequest)
class HYRequest {
  
  //给这个axios实例添加配置
  constructor(baseURL, timeout=9000) {
    //创造axios实例并存储在this.instance实例中,然后给其配置
    this.instance = axios.create({
      baseURL,
      timeout
    })


    //拦截器作用: 调用时不用再写res.data
    //方法一:
    //使用拦截器取代上面,拦截器返回的也是个promise
    //注意:代码无法直接写在类定义中。拦截器的定义需要放在 constructor 中，因为它属于实例的初始化配置
    this.instance.interceptors.response.use(res => {
      console.log('响应拦截成功')
      return res.data
    }, (err) => {
      console.log('响应拦截失败')
      return err
    })
  }

  //方法二:(推荐)
  //当你只用一次实例,则可以把this.instace改为axios
  // request(config) {
  //   return new Promise((resolve, reject) => {
  //     this.instance(config).then(res => {
  //       //res.data是axios返回的数据,但你使用时不用写res.data直接写res即可
  //       resolve(res.data)
  //     }).catch(err => {
  //       reject(err)
  //     })
  //   })
  // }

  request(config) {
    return this.instance(config)
  }

  get(config) {
    //因为 request本身可以使用get,post
    //...config对request的config的参数解构,然后加入method: 'get',最后存放到一个新的对象里,然后这个新对象就是request的参数即config,下面的post一样
    return this.request({...config, method: 'get'})
  }

  post(config) {
    return this.request({...config, method: 'post'})
  }
}

export const HYRequest1 = new HYRequest('http://localhost:3000/Home');
export const HYRequest2 = new HYRequest('http://localhost:3000/About');

export default new HYRequest('http://localhost:3000/About')


--------------------------
接受的文件
//HYRquest可以自己定义,但{HYRequest1}不能,因为HYRquest是默认导出
import HyRequest from './service/index' --> 接受的是默认调用,即export default ...
import { HYRequest1 } from './service/index' --> 非默认掉,要具体的值 即export const HYRequest1 =..的HYRquest1

HyRequest.get({'url': '?id=3'}).then(res => {
  console.log('导入封装axios,HYRequest',res)
})

HYRequest1.get({'url': '/1'}).then(res => {
  console.log('导入封装axios,HyRequest1',res)
})
```







