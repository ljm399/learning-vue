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


    //使调用时可以使用.then,同是调用时不用再写res.data
    //方法一:
    //使用拦截器取代上面,拦截器返回的也是个promise(但推荐上面的方法)
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
    //request本身可以使用get,post
    //...config对request的config的参数解构,然后加入method: 'get',最后存放到一个新的对象里,然后这个新对象就是request的参数即config,下面的post一样
    return this.request({...config, method: 'get'})
  }

  post(config) {
    return this.request({...config, method: 'post'})
  }
}

//可以多个使用(记得导出export以及new创建新的实例即new HYRequest())
export const HYRequest1 = new HYRequest('http://localhost:3000/Home');
export const HYRequest2 = new HYRequest('http://localhost:3000/About');

//传出去的是实例,而不是类,所以可以直接使用
//#region 关于为什么给url直接是constructor的参数,而不是其他方法如request
/* 
  constructor 是类的构造函数名称，创建实例时会自动调用。
  construct 是一个普通的方法，除非显式调用，否则不会执行 
  构造函数：当你调用 new HYRequest('http://localhost:3000/About') 时，'http://localhost:3000/About' 被传递给 constructor 的 baseURL 参数。这是用于配置 Axios 实例的基本 URL
  */
//#endregion
export default new HYRequest('http://localhost:3000/About')