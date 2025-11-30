import { createApp } from 'vue'
import App from './App.vue'
import axios from 'axios'

createApp(App).mount('#app')

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
