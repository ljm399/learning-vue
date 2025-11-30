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
    // 服务器数据
    data: []

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
      console.log(state.name + 'index.js的Mutations的changeName')
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
    changeZidingyi(state, payload) {
      // console.log(payload)
      state.data = payload
    },
    
    

    //方式二
    changeData(state, payload) {
      state.data = payload
      // console.log('df', state.data)
    }
  },

  actions: {
      //actions作用1.1,可以异步操作(即可以不按顺序执行)
      //1.2,要提交mutation,才能变更状态
      //1.3,参数context和store拥有相同的属性和方法,故actions可以拿到getters,state和commit,而其叫context而不是store

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

      //2.4,发送网络请求(异步操作)
      async networkRequest(context) {
        //方式一
        //fetch()返回的是一个promise对象,可以使用promise的then方法
        // fetch('http://123.207.32.32:8000/home/multidata').then(res => {
        //   //res.json()返回也是一个promise对象同时这是对res进行json格式化
        //   res.json().then(data => {
        //     console.log(data)
        //     //把数据提交到mutation
        //     context.commit('changeZidingyi', data)
        //   })
        // })
        

      //方式二,Promise链式调用(使用 Promise：通过 Promise 可以将异步操作串联起来，减少嵌套层级，使代码更清晰。:方式一一样)
      // fetch('http://123.207.32.32:8000/home/multidata').then(res => {
      //   return res.json()
      // }).then(data => {
      //   context.commit('changeZidingyi', data)
      // })
      

      //方式三,async/await(推荐),要在networkRequest函数前面加上async关键字
      // await关键字只能用在async函数中,使用它可以避免回调地狱,他会是等待fetch()执行完毕后再向下执行
      // const res = await fetch('http://123.207.32.32:8000/home/multidata')
      // const data = await res.json()
      // context.commit('changeZidingyi', data)
      

      //方式四,async/await同时返回promise对象给对应组件
      //不要在 Promise 的执行函数（executor）中使用 async，因为它可能导致不必要的复杂性和混淆
      return new Promise((resolve, reject) => {
          fetch('http://123.207.32.32:8000/home/multidata').then(res => {
            return res.json()
          }).then(data => {
            console.log(data)
            context.commit('changeZidingyi', data.data.banner.list)
            resolve('网络请求成功')
          })
          .catch(err => {
            reject('网络请求失败')
          })
        })

      }
  },
  
    //modules属性
  modules: {    
    //写法一
    /* 
      nwRq: {
        把networkRq的代码复制粘贴   
      }
    */
    
    //写法二  
    nwRq : networkRq,

    //namespaced: false：模块是“公共”的，里面的东西大家都可以直接用，但容易造成混乱。
    //namespaced: true：模块是“私有”的，形成自己的小地盘，用里面的东西需要先“指明是哪个地盘”，这样更安全、更有序

    // namespace: false, 这里设无效,要在具体文件如counter.js中设置

    // counter作用
    counter: counterModule,

    
  }
})

//导出不能少
export default store;