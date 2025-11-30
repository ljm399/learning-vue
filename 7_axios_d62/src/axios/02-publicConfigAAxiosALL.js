import { createApp } from 'vue'
import App from './App.vue'
import axios from 'axios'

createApp(App).mount('#app')

const baseURL = 'http://localhost:3000'

//一,给axios添加公共配置
axios.defaults.baseURL = baseURL
axios.defaults.timeout = 6000
axios.defaults.headers = {}

axios.get('/home/4').then(res => {
  console.log('添加公共配置的get请求成功',res.data)
})


//二,axios发送多个网络请求
axios.all([
  axios.get('/About',{
    params:{
      id:2
    }
  }),
  axios.post('/About',{
    name:'张三',
    age:20
  })
]).then(res => {
  //放回的res是一个数组,不用res.data
  console.log('axios发送多个网络请求成功',res)
})