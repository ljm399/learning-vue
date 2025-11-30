import { createApp } from 'vue'
import App from './App.vue'
import axios from 'axios'

createApp(App).mount('#app')

import HyRequest from './service/index'
import { HYRequest1 } from './service/index'

HyRequest.get({'url': '?id=3'}).then(res => {
  console.log('导入封装axios,HYRequest',res)
})

HYRequest1.get({'url': '/1'}).then(res => {
  console.log('导入封装axios,HyRequest1',res)
})