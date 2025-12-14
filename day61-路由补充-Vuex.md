# 一.vue-route

### 1. view文件内容

```vue
App.vue
<template>
  <div class="app">
    <h3>app router</h3>
    <div class="nav">
      <router-link to="/about" replace router-link-active="active">about</router-link>|
      <router-link to="/user/123">user123</router-link> |
      <router-link to="/user/321">user321</router-link> |
      <router-link to="/login">login</router-link>
      <hr>
      <!-- 4,页面的前进和后退 -->
      <button @click="jumpPage">页面前进和后退</button>
    </div>
    <router-view></router-view>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
function homeClick() {
  // 3.2,传入的是字符串(不是replace)(compositionapi写法)
  // router.push('/home')

  // 3.3,传入的是对象,为了有query
  router.push({ 
    path: '/home',
    query: {//home?name=mj&age=18
      name: 'mj',
      age: 18
    }
  })
  }
    //页面的前进和后退(go方法)
    function jumpPage() {
      router.go(-1)//back()
 }	
</script>

--------------------------
About.vue
<script setup>
</script>
<template>
  <div class="about">
      <h1>About</h1>
      <div class="nav">
        <router-link to="/about/family">家人生日</router-link> |
        <router-link to="/about/ranking">音乐排名</router-link>
      </div>
      <router-view></router-view>    
--------------------------------
/about/family
<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
function exitClick() {
  localStorage.removeItem("token");
  router.push('/login')
}
</script>
<template>
  <div class="app">
    <button @click="exitClick">退出</button>
    <h3>family's birthday</h3>
    <h4>mother - 1973.9.8</h4>
    <h4>father - 1972.12.10</h4>
    <h4>qiao - 1996.7.8</h4>
    <h4>wei - 1998.4.25</h4>
  </div>
--------------------------------------
/about/ranking
<script setup>
</script>
<template>
  <div class="app">
    <h3>音乐排名</h3>
    <ul>
      <li>heavy is the crown</li>
      <li>朵</li>
      <li>谁伴我闯荡</li>
      <li>理想</li>
    </ul>

```



-   通过a来跳转路由

  - <a href="baidu.com" @click.prevent="goSport">运动< /a> 

    - href='javascript:;'作用:这种做法通常用于创建一个看起来像是链接的元素，但实际上不希望它有任何跳转行为 
    - prevent:可以阻止跳转

    ```vue
    //通过a来跳转路由
    // const goRead = () => {
    // router.push({
    //     path:'/read'
    // })
    // }
    // const goSport = () => {router.push({path:'/sport'})}
    // const goBack = () => {router.go(-1)}
    ```

    

  

- tip提示:optionApi不需要import { useRouter } from 'vue-router'

  - ```vue
    <script> --- 通过按钮点击是实现跳转
      export default {
        methods: {
          homeClick() {
            //3.2,传入的是字符串(optionapi写法)
            // this.$router.push('/home')
            
            //3.3,传入的是对象,为了有query
            this.$router.push({
              path: '/home',
              query: {
                name: 'mj',
                age: 18
              }
            })
          }
        }
      }
    ```







### 2. 路由懒加载和魔法注释

- 路由懒加载(推荐):当打包构建应用时,javascript包会变得非常大,影响页面加载,可以分包
- 魔法注释(找到打包好的包),chunk块

```JavaScript
router/index.js
普通方法
// import Home from '../views/Home.vue'
// import About from '../views/About.vue'

路由懒加载和魔法注释
//异步组件:() => import('文件路径')
const About = () => import(/* webpackChunkName: 'About' */'../views/About.vue')
```







### 3. 动态管理路由

- 根据条件判断,如果满足条件则注册路由,否则不注册

- 需求场景:每个用户进入一个url网址,可能是pc端,h5端,小程序端,移动端等,组件就会不同*

  -  *方案一:*
    - *不同角色的进入有不同的组件,同时组件提前注册*
    - 缺点:用户可以通过输入url/后面的值得到相应的组件,暴露信息)

  -  *方案二:*(利用动态管理路由)
    - *根据不同角色有不同组件,但是组件不提前注册(即动态注册)即通过条件判断和路由方法:addRoute方法*

- tip:  不能在route数组里面,因为在里面就是注册了就会有方案一的缺点

````JavaScript
const router = createRouter({....})
let isAdmin = true; -- 为ture则才能注册成功
if (isAdmin) {
  // 一级路由,一个参数(即对象)
  router.addRoute({
    name: 'admin',
    path: '/admin',
    component: () => import('../views/Admin.vue')
  })

  // 二级路由,第一个参数是父组件的name不能是path,第二个参数是对象
 router.addRoute('admin', {
    name: 'vip',
    path: 'vip',
    component: () => import('../views/sonOfAdmin.vue')
  })

} 
````



- 8.2,动态路由其他方法

  - 删除路由

    - 方法一:添加一个name相同的路由*

      ```
         router.addRoute({
          name: 'vip',
          path: 'vip',
          component: () => import('../views/sonOfAdmin.vue')
         })
      
      ```

      

  

  ​			方法二:removeRoute方法

  ​					router.removeRoute('vip')//admin是name

  ​			方法三:通过addRoute方法的返回值回调

  ```javascript
    /*  const removeRoute =router.addRoute('admin', {
          name: 'vip',
          path: 'vip',
          component: () => import('../views/sonOfAdmin.vue')
        })
      removeRoute() */
  ```

  

  - router.hasRoute方法:判断路由是否存在

    ​	console.log(router.hasRoute('admin'))*//true*

    

  - router.getRoutes方法:获取所有注册的路由*

    ​	console.log(router.getRoutes())*//包括子组件*







### 4.路由导航守卫

- 在跳转前进行判断,如果满足条件则跳转,否则不跳转(即动态管理路由是不能跳转的)

- 需求场景:用户登录,未登录不能进入某些页面,密码正确才能跳转

    方案: 进行任何路由跳转前(前提已注册), 会回调传入相对应方法(如beforeEach)的函数

- router.beforeEach(重点.了解这一个就行)

  ```JavaScript
  router.beforeEach((to, from) => {
    const token = localStorage.getItem('token')
    if (!token && to.path !== '/login') {
      return '/login'
    }
  }) -------- 
  export default router
  
  ------- 
  login.vue
  <script setup>
  import { useRouter } from 'vue-router'
  const router = useRouter()
  function loginClick() {
    localStorage.setItem('token', 'birthday')
    router.push('/about/family')
  }
  </script>
  <template>
    <div class="app">
      <button @click="loginClick">登录</button>
    </div>
  ```

  - 实现效果: 进入home之前跳转到login页面,在未点击登录前不会点击跳转其他页面的按钮都失效(原理: 会重定向跳回login页面)



- if(!token && to.path !== "login")逻辑

  -  是使你所有不符合规定的操作跳回到login页面, 这也是路由守卫的作用, 而不是为了跳转到登录后的页面

  

- 其他方法和参数(了解)

  ```javascript
  router.beforeEach((to, from) => {
    const token = localStorage.getItem('token')
    if (!token && to.path !== '/login') {
      //返回值可以是字符串,也可以是对象(包括name,path等)
      return '/login'
  
      //没有返回值或是undefined,则默认跳转,返回值是true/false一样跳转(false可能不会)
      // return undefined
    }
  
    //第三个参数next(了解):不用就别把next加入beforEach的参数,否则报错
    //
    /* 
    const token = localStorage.getItem('token')
    if (!token && to.path !== '/login') {
      next('/login')//不能是next(),否则会进入死循环(允许进入,不会挂着导航)
    }else {
      next()//不能是next('/login'),否则会进入死循环
      //next()意思是继续导航,不跳转,不断的进入login
    }
    
  
    //其他导航守卫(类似生命周期):完整的导航解析过程(注意看在哪里执行如在组件还是index.js)
    /* 
      相关网站:https://router.vuejs.org/zh/guide
      1,beforeRouterLeave:
      组件A导航到组件B,则你要是在组件A中设了beforeRouteLeave守卫,则组件A的beforeRouteLeave守卫会执行
  
      2,beforeEach
      调用全局的beforeEach守卫(即在createRouter方法中添加)(重点且只掌握这一个就行)
  
      3,beforeRouteUpdate:
      /user/123 -> /user/456,在重用的组件中调用beforeRouteUpdate守卫
  
      4,beforeEnter
      调用路由配置中的beforeEnter,即router:[{path:'/user/:id',component:User,beforeEnter:()=>{}}}]
  
      5,解析异步组件
      即() => import('../views/User.vue')
  
      6,beforeRouteEnter:
      调用组件A(即被激活的组件)的beforeRouteEnter守卫
      需求:beforeRouteEnter调用this,但组件实例还未创建,所以this为undefined
      可以beforeRouteEnter(next) {next(Instance)=>{等最后一步会传入组件实例,这是这里可以用this})}
  
      7,beforeResolve:(异步组件被解析之后,跳转之前)
      调用全局的beforeResolve守卫
  
      8,进行导航(即跳转)
  
      9,afterEach
      调用全局的afterEach守卫
  
      10,触发DOM更新
      如组件B更新完可以看到
  
      11,调用beforeRouteEnter守卫即6中传给next的回调函数
  
    */
    //#endregion
  })
  ```

  

# 	二. Vuex相关知识 -- day62还有

- tip提示:
  - vuex是配合vue2即optionApi使用,
  - 不是给vue3的CompositionApi使用(其使用专门为其生的pinia), 所以在setup使用非常困难
  - 注意: 要是组合式和可选择式同时存在一个vue文件中,则组合式函数里面的代码优先


### 1. 这里是最终的Vuex样子,所有使用的Vuex数据的案例来这看

<a name="myanchor">详细内容</a>

```javascript
store/modules/index.js
import { createStore } from "vuex";
import { CHANGE_AGE, EMIT_OBJ } from "./mutation_types";
import { reject } from "core-js/stable/promise";
import networkRq from './modules/networkRq'
import counterModule from './modules/counter'
//只有state是传入个函数,其他是对象,同时state别用其他名如store
const store = createStore({
  state: () => ({
    count : 1 ,
    name : '369',
    avatarUrl: 'https://avatars.githubusercontent.com/u/31562079?v=4',
    users: [
      { id: 1, name: "张三" , age: 18 },
      { id: 2, name: "李四" , age: 19 },
      { id: 3, name: "王五" , age: 20 }
    ],

  }),
  getters: {
    //getters属性:作用是用来对state中的数据进行加工处理后返回一个新的数据
    //1,getters属性的基本使用
    doubleCount(state) {
      return state.count * 2
    },
    totalAge(state) {
      //reduce方法:数组中所有元素相加,并返回相加后的结果
      return state.users.reduce((pre, cur) => {
        return pre + cur.age
      },0)
    },

    //2,getters中获取其他getters
    message(state, getters) {
      return `当前count为:${state.count}，doubleCount为:${getters.doubleCount}`
    },

    //3,getters可以放回一个函数,这个函数可以有传入参数(了解)
    getUserId(state) {
      return function(id) {
        //find方法:根据条件查找数组中符合条件的第一个元素
        return state.users.find(item => item.id === id)
      }
    },

    //

  },
  //mutations属性:更改vuex中的state,只能通过mutation更改
  mutations: {
    //1,基本使用
    add(state) {
      state.count++
    },

    //2,mutation可以携带参数:传递参数与 6,setup中使用
    changeName(state, payload) {
      state.name = payload,
      console.log(state.name,'我接到了')
    },

    //3,参数是对象形式
    [EMIT_OBJ](state, payload) {
      state.name = payload.name,
      state.users[1].age = payload.age
    },

    //4,其他风格传来,5,Mutation常量类型:为了防止组件和store中mutation的名称重复或写错
    [CHANGE_AGE](state, payload) {
      state.users[1].age = payload.age
    },

    //mutations不能直接拿到gettersd值,可以把其作为参数传入
    add2(state, payload) {
      state.count += payload
    },
  },


```





### 2.多个方法获取store中的count 与 实现计时器功能

- tip: 如optionsAPI和CompositionAPI公用一个add方法,但CompositionAPI优先(即optionAPI里面的add方法失效)
- 实现计时器

```javascript
下面所有内容都在一个vue文件
<h3>template中使用state:{{ $store.state.count }}</h3>
<h3>optionApi的computed计数:{{ countCp }}</h3>
<h3>setup的计数:{{count }}</h3>
<button @click="add">add</button>

---------------------------------
setup中逻辑
<script setup> --> Composition API 语法糖
import { useStore } from "vuex"
import { toRefs } from "vue"
const store = useStore()

//问题解释
    // const count = store.state不行,store.state是对象,需要解构
    //1,state是响应式的(),但从state拿出来的count不是响应式的而是个普通值,所以需要toRefs()
    //2,同时不是toref(没有s)是因为其是对象不是字符串
      // toRef() 用于单个属性：toRef(store.state, 'count')
      // toRefs() 用于整个对象的所有属性：toRefs(store.state)
      // 这里使用 toRefs() 是因为要处理整个 store.state 对象
// 所以
const { count } = toRefs(store.state)

//setup中只能通过store.commit('add')才能修改store.state
function add() {
  //可以但不能这样,违反规定
  // count.value++//toRefs本质是ref,要value

  //正确写法
  store.commit("add") // 提交给 store/index.js文件中的mutations
}
</script>


-----------------------------------
optionsAPI(十分方便)
<script>
export default {
  computed: {
    countCp() {
      return this.$store.state.count
    }
  }
  methods: {
    add() {
      this.$store.commit('add')
    }
  }
}
</script>

```

- 上面案例 template(中文翻译:模板) 也可以直接使用(template中使用state:{{ $store.state.count }})

  - 因为Vuex的store导入到全局里面了(即main.js)

    ```JavaScript
    main.js
    import { createApp } from 'vue'
    import App from './App.vue'
    import store from './store'
    
    createApp(App).use(store).mount('#app')
    ```

    

    



### 3.vuex状态管理库的概念 

-  安装:npm install vuex --save

-  vuex->pinia难度降低,但vue2->vue3,难度升高
   -  所有新的技术都是为了解决旧技术的缺点(了解)

####  不叫数据而是状态,理由:

1. 数据是变化的,状态是不变的(如data=[1,2]显示了的1是状态,而2,未显示是数据)

2. 二者都可以称呼,但状态更合适

3. ,状态管理:即把使用了的数据管理起来,如vuex(了解)

   - 总线和vuex作用相同,但vuex更强大

   - vuex可以处理复杂的状态,如服务器返回的数据,缓存数据,用户产生的数据等

   

#### vuex思想以及pinai思想:(了解)

- 为了解决的problem:一个状态的变化引起多个状态的变化,难以控制和追踪

- vuex思想:把多个状态放在一个对象里面,强制性的规则来维护视图和状态之间的独立性



#### vuex的操作步骤

-  stata的数据->各组件->action(异步操作)->mutation(同步操作)->影响state的数据



- vuex和全局对象区别:

  - vuex里存储的数据是响应式的

  - 不能直接修改store的数据,唯一的路径是提交(commit)mutation

  

#### vuex使用的是单一状态树

- 单一状态树:即用一个对象就包含了全部的应用层级状态(了解),

- 采用的ssot(single source of truth)翻译为单一源文件,但这与module模块不冲突

- 每个vuex只有一个store(可以但不符合规定,要多个就用pinia),store储存着state(状态)

- 优势:方便管理和维护

 

#### 除state是函数(箭头),其他都是对象

- 由于getters是对state的数据进行修改,本质也是拿到数据,所有使用时是在computed因为返回的是函数

- 而actions和mutations操作,所以是methoeds



#### 页面数据的两种设计方案

1. 放在对应组件里面(第一种)

2. 从服务器拿到数据放在vuex里面(推荐)(第二种)



### 4.mapState

- 作用:为了想解构数据一样,更好地使用数据,否则就像下面一样

  ```vue
  <!-- 1,template中使用多个状态 -->
  <h3>模板中:{{ $store.state.count }}</h3>
  <h3>模板中:{{ $store.state.avatarUrl }}</h3>
  ```

  

- optionApi中使用

  ```vue
  <script>
    //optionApi中映射状态(在computed属性中)
    import { mapState } from "vuex";
    export default {
      //computed里面传入的是函数(模板中拿到的是返回值),而store.state.count传过来的也是函数(拿到的是返回值)
      computed: {
        //mapState映射状态:数组语法
        ...mapState(['coun0', 'name', 'avatarUrl']),
        //本质:无论compositionApi还是optionApi,其本质都是$store.state.xx因为展示在页面上的就是$store.state.xx
        avatarUrl() {
          return this.$store.state.avatarUrl
        },
  
        //mapState映射状态:对象语法(当想要修改状态名时)
        ...mapState({
          count2: state => state.count,
          name2: state => state.name
        })
      }
    };
  </script>
  
  
  <template>
    <div class="app">
      <!-- 2,计算属性:mapState映射状态:数组语法 -->
      <h3>optionApi的计算属性中</h3>
      <h3>数组语法</h3>
      <h3>{{ count0 }}</h3>
      <h3>{{ name }}</h3>
      <h3>{{ avatarUrl }}</h3>
      <h3>本质{{ avatarUrl }}</h3>
      <!-- 3,计算属性:对象语法 -->
      <h3>对象语法</h3>
      <h3>{{ count2 }}</h3>
      <h3>{{ name2 }}</h3>
  
  ```

- CompositionAPI中使用

  - 注意: mapState映射辅助的是optionApi(而不是compositionApi),所有这里用mapState难

    - 因为mapState 生成的函数内部依赖 this.$store 来访问 Vuex 的 store。但在 < script setup > 环境中，不存在 this 这个组件实例，所以 this.$store 是 undefined，直接调用会报错

  - 强行使用,利用bind来替代this

    ```javascript
    const { name, count, avatarUrl } = mapState(["count", "name", "avatarUrl"]);//解构的name是函数,因为没有$store
    //注意: mapState(["count", "name"]) 返回的对象是 { count: function, name: function },所以你的const {name,count,avatarUrl}必须和返回的对象名字一样,不能改为name3这些
    
    console.log("name",name,"count",count,"avatarUrl",avatarUrl);//函数,函数,函数
    
    // 解决
    // const cname = computed(() => name.bind({ $store: store }));//里面不能是箭头函数,因为computed有其返回值即this.$store.state.count了
    const cname = computed( name.bind({ $store: store}));
    const cavatarUrl = computed(avatarUrl.bind({ $store: store }));
    const ccount = computed( count.bind({ $store: store}))
    
    <template>
        <h3>compositionApi</h3>
        <h3>compositionApi中:{{ ccount }}</h3>
        <h3>compositionApi中:{{ cname }}</h3>
        <h3>compositionApi中:{{ cavatarUrl }}</h3>
    ```

  - 封装函数

    ```JavaScript
    useState.js  -- 不是useStore
    import { computed } from "vue";
    import { useStore, mapState } from "vuex";
    
    export default function useState(mapper) {
      const store = useStore()
      const stateObj = mapState(mapper)
      const newState = {}
      Object.keys(stateObj).forEach(key => {
        newState[key] = computed( stateObj[key].bind({ $store: store }))
      })
      return newState
    }
    
    -----------------
    02-core1_mapState
    // 数组: 键必须和返回的对象相同, 可以起别名如name4
    const { name: name4, count, avatarUrl } = useState(["count", "name", "avatarUrl"]) 
    //2.2,对象语法
    const { name3, count3, avatarUrl3 } = useState({
      count3: 'count',
      name3: 'name',
      avatarUrl3: 'avatarUrl'
    })
    ```

  - tip: 解构的名字(如name)必须和返回的对象里面的名字相同, 可以起别名如name4
    const { name: name4, count, avatarUrl } = useState(["count", "name", "avatarUrl"]) 

  

  - 不使用mapState, 缺点拿到的数据不具有响应式

  ```javascript
  //直接对store.state对象解构
  const store = useStore(); --> 这里不是useState
  const { name, count, avatarUrl } = store.state;//但解构出来的不是响应式
  ```

  - 解决办法,使用toRefs

  ```javascript
  import { computed, toRefs } from "vue";
  const { name, count, avatarUrl } = toRefs(store.state)
  ```



### 5.getters和mapGetters

- 作用是用来对state中的数据进行加工处理后返回一个新的数据

- 在template直接使用,且都是响应式

  - 以下是vuex的部分内容, 详细点击 [ctrl+点](#myanchor) 查看

  ```javascript
  <template>
    <div class="app">
      <h3>getters的在template中的使用</h3>
      <h3>doubleCount:{{ $store.getters.doubleCount }}</h3>
      <h3>计算年龄总数:{{ $store.getters.totalAge }}</h3>
  
  
      <h3>getters获取其他getters:{{ $store.getters.message }}</h3>
  
      <!-- 根据id获取一个users中具体的user(了解) -->
      <h3>getters可以返回函数,函数可以传参数如id为3:{{ $store.getters.getUserId(3) }}</h3>
      <h3>getters可以返回函数,函数可以传参数如id为2:{{ $store.getters.getUserId(2) }}</h3>
  
      <button @click="add">add</button>
    </div>
  </template>
  
  -------------
  vuex中 store/index.js的getter对象中  ---> 除state是函数(箭头),其他都是对象
  
  getters: {
      //getters属性:作用是用来对state中的数据进行加工处理后返回一个新的数据
      //1,getters属性的基本使用
      doubleCount(state) {
        return state.count * 2
      },
      totalAge(state) {
        //reduce方法:数组中所有元素相加,并返回相加后的结果
        return state.users.reduce((pre, cur) => {
          return pre + cur.age
        },0)
      },
  
      //2,getters中获取其他getters
      message(state, getters) {
        return `当前count为:${state.count}，doubleCount为:${getters.doubleCount}`
      },
  
      //3,getters可以放回一个函数,这个函数可以有传入参数(了解)
      getUserId(state) {
        return function(id) {
          //find方法:根据条件查找数组中符合条件的第一个元素
          return state.users.find(item => item.id === id)
        }
  }
  ```

- optionapi中

  - mapGetters作用和mapState一样,也不适合在setup中使用,因为setup里面没有this

  ```javascript
  <script>
  import { mapGetters } from 'vuex'
  export default {
    computed: {
      ...mapGetters([ 'message', 'getUserId'])
    },
    methods: {
      add() {
        this.$store.commit('add')
      }
    }
  }
  
  </script>
  
  <h3>在optionApi和compositionApi的mapGetters映射(mapGetters属性)</h3>
  <h3>optionApi中:{{ message }}</h3>
  <h3>optionApi中:{{ getUserId(2) }}</h3> --> 为什么有参考看vuex的getters对象就知道了
  <h3>optionApi中:{{ getUserId(3) }}</h3>
  ```



- Compositionapi中使用mapGetters

  - import { mapGetters } from 'vuex' 要是optionapi的script中导入了, 则其他的script就不用导入

  ```JavaScript
  //import { mapGetters } from 'vuex'
  //compositionApi的computed的mapGetters映射,(实现步骤和mapState一样)
  const store = useStore();
  const { doubleCount, totalAge } = mapGetters(['doubleCount', 'totalAge']);
  const cdoubleCount = computed(doubleCount.bind({ $store: store}))
  const ctotalAge = computed(totalAge.bind({ $store: store}))
  
  <h3>compositionApi中:{{ cdoubleCount }}</h3>
  <h3>compositionApi中:{{ ctotalAge }}</h3>
  ```

  

  - 封装使用 -- 原理和useState一样

    ```javascript
    useGetters
    import { mapGetters, useStore } from 'vuex'
    import { computed } from 'vue'
    export default function useGetters(mapper) {//mapper翻译为映射器
      const store = useStore()
      const gettersObj = mapGetters(mapper)
      const newObj = {}
      Object.keys(gettersObj).forEach(key => {
        newObj[key] = computed( gettersObj[key].bind({ $store: store}))
      })
      return newObj
    }
    
    --------
    // 数组
    const { doubleCount, totalAge } = useGetters(['doubleCount', 'totalAge']);
    
    // 对象
    const { doubleCount2, totalAge2 } = useGetters({
      doubleCount2: 'doubleCount',
      totalAge2: 'totalAge'
    })
    ```

  - 不使用mapGetters,直接解构(推荐)

    - 这里相对于mapState有两个问题

      - problem1:关于toRefs(store.getters)报错原因, 但const { name, count, avatarUrl } = toRefs(store.state)可以

        -  因为store.getters是个普通对象(其数据不是响应式的),而store.state的数据都是响应式的

        -  store.statate是个响应式对象,而store.getters只是引用里面的数据,虽然其数据是响应式的,但其本事是个普通函数,而toRefs需要的是一个响应式对象,所有报错,可以用computed(其不限制这些)
           - 就是store.getters这个壳不是响应式数据,但里面的数据是
           - 而toRef里面需要响应式对象

      - problem2: const { doubleCount, totalAge } = computed(() => ({ ...store.getters }))不行

        - 因为computed返回的一个ref新对象,这个对象对store.getters进行拷贝,而不是原始响应式对象,
          - 注意computed返回的是一个ref新对象

        - 但其在是ref里面依旧是响应式,

        - 但你用{}解构使其值破坏其响应式故报错,

     解决代码一

    ```JavaScript
    const obj = computed(() => ({ ...store.getters }))
    <h3>{{ obj.doubleCount }}</h3>
    <h3>{{ obj.totalAge }}</h3>
    ```

    解决代码二

    ```JavaScript
      const doubleCount3 = computed(() => store.getters.doubleCount)
      const totalAge3 = computed(() => store.getters.totalAge)//同理:没使用{}对computed返回的ref对象解构,没破坏其响应式结构
     
        <h3>doubleCount3:{{ doubleCount3 }}</h3>
        <h3>totalAge3:{{ totalAge3 }}</h3> 
    ```

    

    

​		







### 6. 为什么optionapi使用mapState和mapGetters是计算属性而不是methods方法

1. 官方说:复杂的data交给computed

2. 不用method,因为利用了抽取思想,可以把逻辑抽取出去,便于维护

3. computed使用更方便

4. computed返回的是一个ref新对象

   ```javascript
   <emplate>
       <h2>{{ arrReserve() }}</h2> --> methods
   
       <h2>{{ arrReserve }}</h2> --> computed
   
   methods: {
         arrReserve() { 
         return this.sentence.split(" ").reverse().join(" ")//join和split的""要加空格才能展示
       }
   }
   computed:{
      arrReserve: function () {
         return this.sentence.split(" ").reverse().join(" ");
       }
   }
   ```



### 7.mutations(翻译 突变) 

- 作用: 只能通过mutation更改vuex中的state

#### 7.1.基本使用

- vuex中的mutations ,详细点击 [Ctrl+点](#myanchor) 查看

```JavaScript
mutations: {
    //1,基本使用
    add(state) {
      state.count++
    },

    //2,mutation可以携带参数:传递参数与 6,setup中使用
    changeName(state, payload) {
      state.name = payload,
      console.log(state.name,'我接到了')
    },

    //3,参数是对象形式
    [EMIT_OBJ](state, payload) {
      state.name = payload.name,
      state.users[1].age = payload.age
    },

    //4,其他风格传来,5,Mutation常量类型:为了防止组件和store中mutation的名称重复或写错
    [CHANGE_AGE](state, payload) {
      state.users[1].age = payload.age
    },

    //mutations不能直接拿到gettersd值,可以把其作为参数传入
    add2(state, payload) {
      state.count += payload
    },

    // //网络请求
    //方式一
    /*     changeZidingyi(state, payload) {
        // console.log(payload)
        // state.content.push(payload)
      },
      changeCustom(state, payload) {
        // state.price.push(payload)
    } 
    */

    //方式二
    changeData(state, payload) {
      state.data = payload
      // console.log('df', state.data)
    }
  },
```

- optionapi的使用 -- 通过方法改变,因为简单运算用methods方法

  

  - mutations拿到getters值

    ```JavaScript
    //vue文件中
    add2() {
      this.$store.commit("add2", this.$store.getters.doubleCount)
    }
    
    
    // vuex的中
    //mutations不能直接拿到gettersd值,可以把其作为参数传入
    add2(state, payload) {
      state.count += payload
    },
    ```

  - 修改提交的变量名

    - 作用: 防止起的变量名字冲突

    ````JavaScript
    mutations_types.js
    export const CHANGE_AGE = 'change_age', EMIT_OBJ = 'emit_obj';
    
    
    vue文件
    emitObj() {
      this.$store.commit({
        //常量类型不用加引号
        type: EMIT_OBJ,
        name: "张三2",
        age: 189
      })
    },
    changeAge() {
      this.$store.commit({
        type: CHANGE_AGE,
        age: 9999
      })
    }
    
    vuex中
    [EMIT_OBJ](state, payload) {
      state.name = payload.name,
      state.users[1].age = payload.age
    },
    
    //4,其他风格传来,5,Mutation常量类型:为了防止组件和store中mutation的名称重复或写错
    [CHANGE_AGE](state, payload) {
      state.users[1].age = payload.age
    },
    ````

  - optionapi使用mutation 完整详细底代码

    ```javascript
    import { CHANGE_AGE,EMIT_OBJ } from '@/store/mutation_types' 
    export default {
      methods: {
        add() {
          this.$store.commit("add")
        },
        changeName() {
          this.$store.commit("changeName", "张三")
        },
        // emitObj() {
        //   this.$store.commit("emitObj", { name: "张三2", age: 189 })
        // },
    
        //其他风格来this.$store.commit(了解)与mutation常量类型
        emitObj() {
          this.$store.commit({
            //常量类型不用加引号
            type: EMIT_OBJ,
            name: "张三2",
            age: 189
          })
        },
        changeAge() {
          this.$store.commit({
            type: CHANGE_AGE,
            age: 9999
          })
        },      
    //mutation拿到getters值
        add2() {
          this.$store.commit("add2", this.$store.getters.doubleCount)
        }
      }
    }
    
    
    <button @click="add">add</button>
    <button @click="changeName">改名</button>
    <button @click="emitObj">改以对象</button>
    <button @click="changeAge">其他风格</button>
    <button @click="changeName2">setup中</button>
    <button @click="add2">mutation拿到getters值</button>
    ```

  - setup中 -- 主要有个useStore类记得引入

    <a name="Mutations">普通使用</a>

    ```JavaScript
    import { useStore } from 'vuex';
    const store = useStore();
    function changeName2() {
      store.commit("changeName", "setup中改名为vital")
    }
    ```

    

#### 7.2. 使用mapMutations 辅助使用mutations

- 和上面一样,主要给opntionapi使用, 原因和导致的问题都和上面一样(即setup没有this)

- optionapi

  ```javascript
  //mapMutations辅助函数
  import { CHANGE_AGE,EMIT_OBJ } from '@/store/mutation_types' 
  import { mapMutations } from 'vuex';
  export default {
    methods: {
      //1,参数在template中传递
      ...mapMutations(['add', 'changeName']),
  
      //2,使用常量类型
      ...mapMutations({
        emitObj: EMIT_OBJ
      })
    }
  
  }
  
  <h3>$store.state.users[1].age:{{ $store.state.users[1].age }}</h3>
  <button @click="add">add</button>
  <button @click="changeName('mapMutations')">改名</button>
  <button @click="emitObj({name: 'mapMuatations2', age: 8888})
  ```

- setup中

  -  方式一: 使用mapMutations

  ```JavaScript
  import { useStore } from 'vuex';
  // 不解构,为了不破坏响应式
  const mutationsObj = mapMutations({ changeAge: CHANGE_AGE, changeName2: 'changeName', add2: "add2" })
  
  const newObj = {}
  const store = useStore();
  Object.keys(mutationsObj).forEach(key => {
    newObj[key] = mutationsObj[key].bind({ $store: store })
  })
  // 这里可以使用解构, 因为解构的是键,而有作用的是其newobj这个对象的值
  const { changeAge, changeName2, add2 } = newObj
  
  
  <button @click="changeAge({type: CHANGE_AGE, age: 999})">其他风格</button>
  <button @click="changeName2('setup的mapMutations')">setup中</button>
  <button @click="add2($store.getters.doubleCount)">mutation拿到getters值</button> 
  ```

  - 方式二: 不使用mapMutations,则就是普通方法,[点击查看](#Mutations) 
