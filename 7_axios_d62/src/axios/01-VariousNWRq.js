import { createApp } from 'vue'
import App from './App.vue'
import axios from 'axios'

createApp(App).mount('#app')

//1,发送request请求(method:get/post(即兼容get/post))
//1.1 get
axios.request({
  url: 'http://localhost:3000/About?id=3',
  method: 'get',
}).then(res => {
  // console.log(res)//res对象包含了服务器返回的所有信息(组件那些也有),你要的数据在res.data中
  console.log('get',res.data)
})

//1.2 post(这里是把data对象(不能改为其他名)存入服务器中)
axios.request({
  url: 'http://localhost:3000/About',
  method: 'post',
  data: {
    name: '我我我是是是是张三',
    age: 200000000000000000,
  },
}).then(res => {
  console.log('post',res.data)//在终端可以看见
})


//2,发送get请求
//2.1 方式一
axios.get("http://localhost:3000/About?id=2").then(res => {
  console.log('get请求方式一',res.data)//一样要res.data
})

//2.2 方式二
axios.get('http://localhost:3000/About', {
  params: {
    id: 5
  }
}).then(res => {
  console.log('get请求方式二',res.data)
})

//3,发送post请求
axios.post('http://localhost:3000/About', {
  name: '张三',
  age: 20,
}).then(res => {
  //返回的是你发送的数据,让你知道发送成功
  console.log('post请求',res.data)
})
