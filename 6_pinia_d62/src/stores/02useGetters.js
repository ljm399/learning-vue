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