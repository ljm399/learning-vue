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
    //#region 方式三代码解释
    /* 
      1,res.ok:
      res.ok 是一个布尔值，表示响应是否成功。成功的状态码通常是 200 到 299 之间的数字。如果响应状态码在这个范围之外（例如 404、500 等），res.ok 会为 false。


      2,throw new Error('网络请求失败')
      如果 res.ok 为 false,将控制权转移到调用者的 catch 块中，以便处理这个错误

      3,err.message包含res.ok为false时抛出的错误信息即我是res.ok:请求失败

      4,组件里面的.then,只有网络请求成功才会有res,失败则没有res会交给catch处理
    */
    //#endregion
  }
})

export default useNWData