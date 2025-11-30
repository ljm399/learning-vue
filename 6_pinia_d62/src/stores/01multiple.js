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