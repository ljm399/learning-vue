import { createApp } from 'vue'
import App from './App.vue'
// 不用加index.js，会自动找到
import store from './store'
// import 'core-js/features/promise';


//use函数
createApp(App).use(store).mount('#app')
