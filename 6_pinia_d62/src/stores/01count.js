//定义一个关于count的store
import { defineStore } from 'pinia'

//count是id,是必须设的,pinia用它连接到devtools
const useCount = defineStore('count',{
  state: () => ({
    count : 1
  })
})

export default useCount