import { createApp } from 'vue'
import App from './App.vue'
import axios from 'axios'

createApp(App).mount('#app')

//创建其他实例发送网络请求(当不同axios配置不同时)

const instance1 = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 5000,
  headers: {}
})

instance1.get('/About?id=1').then(res => {
  console.log('创建不同实例之实例一',res.data)
})

const instance2 = axios.create({
  baseURL: 'http://localhost:3000/home',
  timeout: 5000,
  headers: {}
})

instance2.get('/4').then(res => {
  console.log('创建不同实例之实例二',res.data)
})
