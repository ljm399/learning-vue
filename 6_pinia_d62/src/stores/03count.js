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