# 一.模版语法

### 1.1. 事件绑定 v-on 用法

#### 1.1.1. v-on各种写法

- v-on:click="counter++"

- v-on:click

  - 语法糖 @click

- 别的事件

  - ```
        <div class="box" @mousemove="divMousemove">4,cornerstone</div>
    ```

    

- v-on="{click: xxx}"

  - ```javascript
    <!-- 5,元素绑定多种事件:推荐第一种 -->
    <div class="box" @click="divClick" @mousemove="divMousemove">5.1,stadium</div>
    <div class="box" @="{click: divClick, mousemove: divMousemove}">5.2,scale</div>
    ```

    

- 修饰符stop





#### 1.1.2. 各种参数方式

```javascript
<!-- 默认传递:event-->
<button @click="btnClick">{{ message }}</button>

<!-- 参数传递,这是属性要加(),不能传递自变量否则为undefined -->
<button @click="btnClick2('rot', age)">rot</button>

<!-- 参数传递同时加上evnt,event前要加$否则undefined -->
<button @click="btnClick3('rat', age, $event)">stale</button>


---------------------------------------------
  methods: {
btnClick() {
  console.log('click1',event)//默认都是event无论(有无event),但推荐加,阅读性强
},

btnClick2(name, age) { 
  console.log('click2',name, age)
},

btnClick3(name, age, event) {
  console.log('click3', name, age, event)

}}
```







#### 1.1.3. 修饰符stop

```
  <!-- 阻止事件冒泡(写法一) -->
  <!-- 其他修饰符:once,left,right可以写在一起 -->
  <button @click.stop.right.once="btnClick">modifiers</button>

  <!-- prevent阻止默认事件,遇到再说 -->
  <!-- 这是事件绑定,你不能绑定属性如href,绑这个用v-bind -->
  <!-- <a @click.prevent="" href="baidu.com">百度一下</a> -->
```





### 1.2.各种渲染

### 1.2.1. v-if/else/else-if



- 案例一

```javascript
<div v-if=" Object.keys(obj).length ">
  <h2>{{ message }}</h2>
  <h2>{{ obj.name }}</h2>
  <h2>{{ obj.age }}</h2>
</div>
<div v-else>
  <h2>obj里没有数据</h2>
</div>
```



- 案例二 ---- 留意input 以及 绑定value这个属性名,使得属性名的值可以改变

  ```javascript
  <input  v-on:input="inputChange" :value="score">
  <h2 v-if="score > 90">优秀</h2>
  <h2 v-else-if="score >80">良好</h2>
  <h2 v-else-if="score >60">及格</h2>
  <h2 v-else>滚</h2>
  ------------------------------------------------------
  
    methods: {
      inputChange: function (event) {
        this.score = event.target.value
      }
    }
  ```

  



### 1.2.2. template元素

- v-if

  - template仅仅是个标识符,但不占用位置

    ```
    <!-- 就v-if,v-else,v-else-if,v-show -->
    <!-- 除v-show其他都是惰性,既不出现就不渲染,那div就多渲染影响性能 -->
    <!-- 故有block般的template,v-show不能使用他 -->
    ```

    

- v-for







### 1.2.3. v-show

```javascript
<!-- v-show不能用template -->
<!-- <template v-show="isShow">
      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBx3CD2JrJ-CWLAPzKcabyExOZJ2s5NF5eGw&s" alt="">
    </template> -->

   <button @click="changeImg">改变图片</button>
	<div v-show="isShow">
      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBx3CD2JrJ-CWLAPzKcabyExOZJ2s5NF5eGw&s" alt="">
	</div>


methods: {
    changeImg() {
      this.isShow = !this.isShow
    }
  }
```



- if用法区别:

  - v-show不能和template结合
  - v-else不能结合

- if的本质区别

  - v-if为false会销毁/不存在
  - v-show为false元素的display none

- 选择

  - 切换非常频繁使用v-show

  - 不频繁则v-if

    

    

# 二. 列表渲染

### 1.1. v-for的基本使用

- item in 数组

- (item, index) in 数组

- (item,key, index) of 数组

- 遍历复制数据(一个数组里面多个数组)

  - ```javascript
    <div v-for="(item,index) in words">
      <!-- <h3 >{{ item.pole}}={{ item.snippets }}</h3>
      <h4>{{ item.elbow }}=={{ item.alley }}</h4> -->
      <!-- words有两个对象故循环两次,第一次循环的第一个对象由于没有elbow和alley故understandhuo显示不出来,第二次循环的第二个对象同理 -->
      <!-- 改正一:数组的对象的键都是相同的!你这不同 -->
    
      <!-- 改正二:改正 -->
      <h3 v-if="index===0">{{ item.pole}}={{ item.snippets }}</h3>
      <h4 v-else>{{ item.elbow }}=={{ item.alley }}</h4>
    </div>
    
       words: [
                {pole: '杆子', snippets: '片段'},
                {elbow: '肘', alley: '巷道'}
              ],
    ```

    



### 1.2. v-for其他的类型

- 对象

  - (value, key, index) in obj

- 数字

  - item in 10

- 可迭代对象(字符串)

  - ```javascript
    <div v-for="item in 'traversal'"> -- 记得带上''
      {{ item }}
    </div>
    ```

    





### 1.3. v-for绑定key属性

#### 1.3.1. VNode/虚拟DOM

- template元素 => VNode
- 虚拟DOM作用之一
  - 跨平台



### 1.3.2. key的作用 -- 优化性能

- 有key的操作
  - 根据key找到之前的VNode进行复用
  - 没有VNode可以复用, 再创建新的VNode
- 没有key的操作:
  - diff算法, 后续VNode复用性就不强





### 1.3.3. key绑定ID

```javascript
<template v-for=" item in message" :key="item">
  {{ item }}
</template>
```







# 三. Options API

### 3.1. 计算属性 computed

#### 3.1.1. 复杂数据的处理方式

- mustache差值语法自己写逻辑

- methods完成逻辑 和computed区别

  ```
  <!-- 负责数据处理: computed -->
  <!-- 官方说:复杂的data交给computed -->
  
  <!-- 不用插值语法 -->
  <!-- 1,因为其本身为简单运算而设计,2,大量重复代码不利于维护(抽取思想),3,模板过重 -->
  
  <!-- 不用method,虽然利用了抽取思想,可以把逻辑抽取出去,便于维护 -->
  <!-- 但这个过程全是函数调用,影响直观 -->
  ```

  







#### 3.1.2. 计算属性用法

- computed: { fullname(){} }

  - 用computed

    ```javascript
    <h2>{{ formatData }}</h2>
    ----------
    computed:{
            formatData:function(){
              return this.firstName + " " + this.lastName;
            },
    ```

  - methods

    ```javascript
    <h2>{{ formatData() }}</h2>
    -----------------------
      methods: {
        formatData() {
          return this.firstName + " " + this.lastName
        },
    ```

    



### 3.1.3. computed和methods区别

1. computed底层会缓存, 性能更高

2. computed 属性是基于它们的响应式依赖进行缓存的。只有在相关响应式依赖发生改变时，它们才会重新求值。*

3. methods 方法每次触发重新渲染时，调用总会再次执行函数。*

  *结论：对于任何复杂逻辑，都应当使用计算属性。*

 *-->*



#### 3.1.4. computed的完整写法

- set
- get

```javascript
computed: {

//   //语法糖的
//   computedName: function () {
//     console.log("computed")//只调用一次
//     return this.firstName + ' ' + this.lastName
// }

//完整写法:一般是有get则可以用语法糖,当用set则用完整写法(了解)
    computedName: {
    get: function () {
      console.log("computed")
      return this.firstName + ' ' + this.lastName
    },
    set: function (newValue) {
      console.log("set")
      const names = newValue.split(' ')
      this.firstName = names[0]
      this.lastName = names[1]
    }
}
    
<p>{{computedName}}</p>
```





### 3.2. 侦听器watch

#### 3.2.1. 基本侦听watch

- watch: { message(newValue, oldValue) {}}
- 注意: 对象类型
  - Proxy对象 -> vue.toRaw(newValue)

```javascript
<button @click="changeMsg">{{ message }}</button>

data: function () {
    return {
      message: 'vibrate',
      obj2: { name: 'justThinkMe', age: 22} 
    }
  },
methods: {
    changeMsg() {
      this.message = 'quiet',
      this.obj = { name: 'justThinkMe'},
      this.obj2.age = 23

    }
  },
  
watch: {
    //1,默认有两个参数,先是新值,然后是旧值
    message(newValue, oldValue) {
      console.log("message被侦听",newValue, oldValue)
    },
        
    //2,如果监听的是对象,则获得的是代理对象(有proxy)
    obj(newValue, oldValue) { 
      console.log("obj被侦听",newValue, oldValue)

      //3,获得代理对象的原始值,而不是原始对象的原始值
      console.log("原始值",Vue.toRaw(newValue), Vue.toRaw(oldValue))
    },
        
        
    //4,pro:原始值不可以监听只修改属性的对像即不可以深度监听
    obj2(newValue, oldValue) {

      // console.log("obj2被侦听",newValue, oldValue)//获取不到

      console.log("原始值",Vue.toRaw(newValue), Vue.toRaw(oldValue))//获取不到
    }

```





### 3.2.2. 侦听的选项 -- 开启深度监听

- deep
- immediate

```javascript
  methods: {
    changeMsg() {
      this.obj.age = 23
    }
  },
  watch: {
    //开启深度监听,handler是固定
    obj: {
      handler(newValue, oldValue) {
        console.log("obj2被侦听", newValue, oldValue);
      },
      deep: true, // 开启深度监听,获取的是代理

      //immediate开启立即侦听,即第一次渲染就执行一次handler
      immediate: true
    },

    //3,也可以侦听对象里面的值,从而不用开启深度监听
    // 'obj.age'(newValue, oldValue) {
    //   console.log("obj.age被侦听", newValue, oldValue);
    // }

    //写法二
    "obj.age": function (newValue, oldValue) { 
      console.log("obj.age被侦听", newValue, oldValue);
    }
  }
    })
    // 挂载应用
    app.mount('#app')
  </script>
</body>
</html>
```





#### 3.2.3. 深度监听的其他的写法

- "info.name"

- 别的写法

- create => this.$watch()

  ```javascript
  const app = Vue.createApp({
    data: function () {
      return {
        obj: { name: 'justThinkMe', age: 22}
      }
    },
    methods: {
      changeMsg() {
        this.obj.age = 23
      }
    },
  
    //生命周期回调函数(之后会学),使得默认函数自动执行
    //在该类函数会进行网络请求
    created() { 
      //ajax/fetch/axios网络请求(先了解)
  
      //自动执行
      console.log('created')
  
      //侦听属性(三个参数,第一个参数是监听的对象,第二个参数是回调函数,第三个参数是配置对象)
      this.$watch('obj',(newVal,oldVal) => {
        console.log('watch',newVal,oldVal)
      },{deep:true})
    }
  })
  ```

  







